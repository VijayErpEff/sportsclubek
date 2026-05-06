import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import {
  KEYS,
  sanitizePlayers,
  validateUpdateInput,
  verifyPin,
  type UpdateInput,
  type VolleyballRegistration,
} from "@/lib/storage/tournament-registration";

const RATE_LIMIT_MAX = 12;
const RATE_LIMIT_WINDOW_S = 900;

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  const { id } = await params;
  if (!id || !/^SC-[A-Z0-9]{5}$/.test(id)) {
    return NextResponse.json({ error: "Invalid registration ID." }, { status: 400 });
  }

  // Rate limit edits by IP
  const ip = getClientIp(request);
  const rlKey = KEYS.rateLimit(ip);
  const attempts = await redis.incr(rlKey);
  if (attempts === 1) {
    await redis.expire(rlKey, RATE_LIMIT_WINDOW_S);
  }
  if (attempts > RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let body: { pin?: string } & UpdateInput;
  try {
    body = (await request.json()) as { pin?: string } & UpdateInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pin = body.pin?.trim();
  if (!pin) {
    return NextResponse.json({ error: "PIN required." }, { status: 401 });
  }

  const raw = await redis.get<string | object>(KEYS.reg(id));
  if (!raw) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  const reg: VolleyballRegistration =
    typeof raw === "string" ? JSON.parse(raw) : (raw as VolleyballRegistration);

  if (!verifyPin(pin, reg.pinHash, reg.pinSalt)) {
    return NextResponse.json({ error: "Invalid PIN." }, { status: 401 });
  }

  const update: UpdateInput = {
    teamName: body.teamName?.toString().trim(),
    captain: body.captain
      ? {
          name: body.captain.name?.toString().trim(),
          phone: body.captain.phone?.toString().trim(),
        }
      : undefined,
    players: Array.isArray(body.players) ? body.players : undefined,
    emergencyContact: body.emergencyContact
      ? {
          name: body.emergencyContact.name?.toString().trim(),
          phone: body.emergencyContact.phone?.toString().trim(),
        }
      : undefined,
    notes: body.notes?.toString().trim().slice(0, 500),
    paymentMethod: body.paymentMethod,
  };

  const validation = validateUpdateInput(update, reg.division);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Validation failed", fields: validation.errors },
      { status: 400 }
    );
  }

  // Whitelisted updates only — division, email, PIN cannot change here.
  const updated: VolleyballRegistration = {
    ...reg,
    teamName: update.teamName ?? reg.teamName,
    captain: {
      ...reg.captain,
      name: update.captain?.name ?? reg.captain.name,
      phone: update.captain?.phone ?? reg.captain.phone,
    },
    players: update.players ? sanitizePlayers(update.players) : reg.players,
    emergencyContact: {
      name: update.emergencyContact?.name ?? reg.emergencyContact.name,
      phone: update.emergencyContact?.phone ?? reg.emergencyContact.phone,
    },
    notes: update.notes ?? reg.notes,
    paymentMethod: update.paymentMethod ?? reg.paymentMethod,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(KEYS.reg(id), JSON.stringify(updated));

  return NextResponse.json({ success: true, message: "Registration updated." });
}
