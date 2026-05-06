import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import {
  KEYS,
  generateRegistrationId,
  hashPin,
  normalizeEmail,
  sanitizePlayers,
  validateRegistrationInput,
  type RegistrationInput,
  type VolleyballRegistration,
} from "@/lib/storage/tournament-registration";

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  let body: Partial<RegistrationInput>;
  try {
    body = (await request.json()) as Partial<RegistrationInput>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input: RegistrationInput = {
    teamName: body.teamName?.trim() ?? "",
    division: body.division as RegistrationInput["division"],
    captain: {
      name: body.captain?.name?.trim() ?? "",
      email: body.captain?.email?.trim() ?? "",
      phone: body.captain?.phone?.trim() ?? "",
    },
    pin: body.pin ?? "",
    players: Array.isArray(body.players) ? body.players : [],
    emergencyContact: {
      name: body.emergencyContact?.name?.trim() ?? "",
      phone: body.emergencyContact?.phone?.trim() ?? "",
    },
    notes: body.notes?.toString().trim().slice(0, 500),
    paymentMethod: (body.paymentMethod as RegistrationInput["paymentMethod"]) ?? "pay_later",
  };

  const validation = validateRegistrationInput(input);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Validation failed", fields: validation.errors },
      { status: 400 }
    );
  }

  const emailKey = normalizeEmail(input.captain.email);

  // Reject duplicate captain-email registrations for this tournament.
  const existingId = await redis.get<string>(KEYS.lookup(emailKey));
  if (existingId) {
    return NextResponse.json(
      {
        error:
          "A team is already registered with this captain email. Use the Manage Registration page to edit it.",
      },
      { status: 409 }
    );
  }

  const { hash, salt } = hashPin(input.pin);
  const id = generateRegistrationId();
  const now = new Date().toISOString();

  const registration: VolleyballRegistration = {
    id,
    tournament: "smash-cup-jun-2026",
    teamName: input.teamName.trim(),
    division: input.division,
    captain: {
      name: input.captain.name.trim(),
      email: emailKey,
      phone: input.captain.phone.trim(),
    },
    pinHash: hash,
    pinSalt: salt,
    players: sanitizePlayers(input.players),
    emergencyContact: {
      name: input.emergencyContact.name.trim(),
      phone: input.emergencyContact.phone.trim(),
    },
    notes: input.notes,
    paymentMethod: input.paymentMethod,
    paymentStatus: "pending",
    createdAt: now,
    updatedAt: now,
  };

  // Write registration, lookup index, and enumeration list.
  // Upstash REST doesn't support MULTI; do them sequentially. Lookup is set
  // last so we don't leave a dangling lookup pointing to a missing record.
  await redis.set(KEYS.reg(id), JSON.stringify(registration));
  await redis.lpush(KEYS.list, id);
  await redis.set(KEYS.lookup(emailKey), id);

  return NextResponse.json(
    {
      success: true,
      id,
      message:
        input.paymentMethod === "upperhand"
          ? "Registration saved. Complete payment via the Upper Hand link to confirm your spot."
          : "Registration saved. We'll contact you with payment instructions.",
    },
    { status: 201 }
  );
}
