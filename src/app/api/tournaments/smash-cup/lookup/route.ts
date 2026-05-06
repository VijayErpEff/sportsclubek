import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import {
  KEYS,
  normalizeEmail,
  toSafeRegistration,
  verifyPin,
  type VolleyballRegistration,
} from "@/lib/storage/tournament-registration";

const RATE_LIMIT_MAX = 8; // attempts per window
const RATE_LIMIT_WINDOW_S = 900; // 15 minutes

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  // Rate limit by IP
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

  let body: { email?: string; pin?: string };
  try {
    body = (await request.json()) as { email?: string; pin?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim();
  const pin = body.pin?.trim();

  if (!email || !pin) {
    return NextResponse.json({ error: "Email and PIN required." }, { status: 400 });
  }

  const emailKey = normalizeEmail(email);
  const id = await redis.get<string>(KEYS.lookup(emailKey));
  if (!id) {
    // Generic message — don't leak whether the email is registered.
    return NextResponse.json({ error: "No registration found for those credentials." }, { status: 401 });
  }

  const raw = await redis.get<string | object>(KEYS.reg(id));
  if (!raw) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  const registration: VolleyballRegistration =
    typeof raw === "string" ? JSON.parse(raw) : (raw as VolleyballRegistration);

  if (!verifyPin(pin, registration.pinHash, registration.pinSalt)) {
    return NextResponse.json({ error: "No registration found for those credentials." }, { status: 401 });
  }

  return NextResponse.json({ registration: toSafeRegistration(registration) });
}
