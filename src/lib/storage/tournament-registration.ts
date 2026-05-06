import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

// ── Types ──────────────────────────────────────────────────────────

export type Division = "youth" | "adult";
export type PaymentMethod = "pay_later" | "upperhand";
export type PaymentStatus = "pending" | "paid" | "waived";

export interface RosterPlayer {
  name: string;
  age?: number;
  email?: string;
  phone?: string;
  isCaptain?: boolean;
}

export interface VolleyballRegistration {
  id: string;
  tournament: "smash-cup-jun-2026";
  teamName: string;
  division: Division;
  captain: {
    name: string;
    email: string;
    phone: string;
  };
  pinHash: string;
  pinSalt: string;
  players: RosterPlayer[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

/** Subset returned to a captain after lookup — never includes the PIN hash. */
export type SafeRegistration = Omit<VolleyballRegistration, "pinHash" | "pinSalt">;

// ── Redis key helpers ──────────────────────────────────────────────

const NAMESPACE = "tournament:smash-cup";

export const KEYS = {
  reg: (id: string) => `${NAMESPACE}:reg:${id}`,
  list: `${NAMESPACE}:registrations`,
  lookup: (emailLower: string) => `${NAMESPACE}:lookup:${emailLower}`,
  rateLimit: (ip: string) => `${NAMESPACE}:rl:${ip}`,
} as const;

// ── ID generation ──────────────────────────────────────────────────

/** Short, friendly registration ID — e.g. "SC-A3F9X". */
export function generateRegistrationId(): string {
  // Crockford-ish alphabet, no ambiguous chars
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(5);
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return `SC-${id}`;
}

// ── PIN hashing (scrypt — slow KDF, resistant to brute force) ──────

/** scrypt with N=16384 — ~50ms, good balance for serverless. */
const SCRYPT_N = 16384;
const SCRYPT_KEYLEN = 32;

export function hashPin(pin: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pin, salt, SCRYPT_KEYLEN, { N: SCRYPT_N }).toString("hex");
  return { hash, salt };
}

export function verifyPin(pin: string, hash: string, salt: string): boolean {
  try {
    const computed = scryptSync(pin, salt, SCRYPT_KEYLEN, { N: SCRYPT_N });
    const stored = Buffer.from(hash, "hex");
    if (computed.length !== stored.length) return false;
    return timingSafeEqual(computed, stored);
  } catch {
    return false;
  }
}

// ── Sanitization ───────────────────────────────────────────────────

/** Strip PIN hash/salt before sending registration to the client. */
export function toSafeRegistration(reg: VolleyballRegistration): SafeRegistration {
  const { pinHash: _h, pinSalt: _s, ...safe } = reg;
  void _h;
  void _s;
  return safe;
}

/** Normalize email for lookup keying — lowercased, trimmed. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Stable hash of email for log lines (avoid logging raw emails). */
export function emailFingerprint(email: string): string {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 8);
}

// ── Validation ─────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+().]{7,}$/;

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

export interface RegistrationInput {
  teamName: string;
  division: Division;
  captain: { name: string; email: string; phone: string };
  pin: string;
  players: RosterPlayer[];
  emergencyContact: { name: string; phone: string };
  notes?: string;
  paymentMethod: PaymentMethod;
}

export function validateRegistrationInput(input: RegistrationInput): ValidationResult {
  const errors: Record<string, string> = {};

  // Team
  if (!input.teamName?.trim() || input.teamName.trim().length < 2) {
    errors.teamName = "Team name must be at least 2 characters.";
  }
  if (input.teamName?.trim().length > 60) {
    errors.teamName = "Team name must be 60 characters or fewer.";
  }
  if (input.division !== "youth" && input.division !== "adult") {
    errors.division = "Pick a division.";
  }

  // Captain
  if (!input.captain?.name?.trim()) errors["captain.name"] = "Captain name required.";
  if (!input.captain?.email?.trim() || !EMAIL_REGEX.test(input.captain.email.trim())) {
    errors["captain.email"] = "Valid captain email required.";
  }
  if (!input.captain?.phone?.trim() || !PHONE_REGEX.test(input.captain.phone.trim())) {
    errors["captain.phone"] = "Valid captain phone required.";
  }

  // PIN — exactly 4 digits
  if (!/^\d{4}$/.test(input.pin || "")) {
    errors.pin = "PIN must be exactly 4 digits.";
  }

  // Roster — minimum 4 to register; teams can add more before the tournament.
  const players = Array.isArray(input.players) ? input.players : [];
  if (players.length < 4) {
    errors.players = "Roster must have at least 4 players.";
  } else if (players.length > 10) {
    errors.players = "Roster must have at most 10 players.";
  }
  players.forEach((p, idx) => {
    if (!p.name?.trim()) {
      errors[`players.${idx}.name`] = "Player name required.";
    }
    if (input.division === "youth") {
      if (typeof p.age !== "number" || p.age < 12 || p.age > 17) {
        errors[`players.${idx}.age`] = "Youth players must be 12–17.";
      }
    } else if (input.division === "adult") {
      if (typeof p.age === "number" && p.age < 18) {
        errors[`players.${idx}.age`] = "Adult players must be 18 or older.";
      }
    }
    if (p.email && !EMAIL_REGEX.test(p.email.trim())) {
      errors[`players.${idx}.email`] = "Invalid email.";
    }
    if (p.phone && !PHONE_REGEX.test(p.phone.trim())) {
      errors[`players.${idx}.phone`] = "Invalid phone.";
    }
  });

  // Emergency contact
  if (!input.emergencyContact?.name?.trim()) {
    errors["emergencyContact.name"] = "Emergency contact name required.";
  }
  if (
    !input.emergencyContact?.phone?.trim() ||
    !PHONE_REGEX.test(input.emergencyContact.phone.trim())
  ) {
    errors["emergencyContact.phone"] = "Valid emergency contact phone required.";
  }

  // Payment method
  if (input.paymentMethod !== "pay_later" && input.paymentMethod !== "upperhand") {
    errors.paymentMethod = "Pick a payment option.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

// ── Update validation (subset of fields, no PIN/email/division change) ──

export interface UpdateInput {
  teamName?: string;
  captain?: { name?: string; phone?: string }; // email locked
  players?: RosterPlayer[];
  emergencyContact?: { name?: string; phone?: string };
  notes?: string;
  paymentMethod?: PaymentMethod;
}

export function validateUpdateInput(
  input: UpdateInput,
  division: Division
): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.teamName !== undefined) {
    if (!input.teamName.trim() || input.teamName.trim().length < 2) {
      errors.teamName = "Team name must be at least 2 characters.";
    }
    if (input.teamName.trim().length > 60) {
      errors.teamName = "Team name must be 60 characters or fewer.";
    }
  }

  if (input.captain?.name !== undefined && !input.captain.name.trim()) {
    errors["captain.name"] = "Captain name required.";
  }
  if (
    input.captain?.phone !== undefined &&
    (!input.captain.phone.trim() || !PHONE_REGEX.test(input.captain.phone.trim()))
  ) {
    errors["captain.phone"] = "Valid captain phone required.";
  }

  if (input.players !== undefined) {
    if (input.players.length < 4) errors.players = "Roster must have at least 4 players.";
    else if (input.players.length > 10) errors.players = "Roster must have at most 10 players.";
    input.players.forEach((p, idx) => {
      if (!p.name?.trim()) errors[`players.${idx}.name`] = "Player name required.";
      if (division === "youth") {
        if (typeof p.age !== "number" || p.age < 12 || p.age > 17) {
          errors[`players.${idx}.age`] = "Youth players must be 12–17.";
        }
      } else if (typeof p.age === "number" && p.age < 18) {
        errors[`players.${idx}.age`] = "Adult players must be 18 or older.";
      }
      if (p.email && !EMAIL_REGEX.test(p.email.trim())) {
        errors[`players.${idx}.email`] = "Invalid email.";
      }
      if (p.phone && !PHONE_REGEX.test(p.phone.trim())) {
        errors[`players.${idx}.phone`] = "Invalid phone.";
      }
    });
  }

  if (
    input.emergencyContact?.phone !== undefined &&
    (!input.emergencyContact.phone.trim() ||
      !PHONE_REGEX.test(input.emergencyContact.phone.trim()))
  ) {
    errors["emergencyContact.phone"] = "Valid emergency contact phone required.";
  }

  if (
    input.paymentMethod !== undefined &&
    input.paymentMethod !== "pay_later" &&
    input.paymentMethod !== "upperhand"
  ) {
    errors.paymentMethod = "Invalid payment option.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

// ── Sanitization helpers (server) ──────────────────────────────────

export function sanitizePlayers(players: RosterPlayer[]): RosterPlayer[] {
  return players.map((p) => ({
    name: p.name.trim().slice(0, 80),
    age: typeof p.age === "number" ? p.age : undefined,
    email: p.email?.trim().toLowerCase().slice(0, 120) || undefined,
    phone: p.phone?.trim().slice(0, 30) || undefined,
    isCaptain: p.isCaptain === true ? true : undefined,
  }));
}
