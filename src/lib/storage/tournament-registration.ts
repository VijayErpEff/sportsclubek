import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

// ── Types ──────────────────────────────────────────────────────────

/**
 * Fall 2026 Smash Cup runs a single co-ed open division, ages 16+.
 * Kept as a union so a future edition can add divisions without a migration.
 */
export type Division = "open";
export const MIN_AGE = 16;
export const MIN_ROSTER = 4;
export const MAX_ROSTER = 8;
export type PaymentMethod = "pay_later" | "pay_online";

/**
 * Registrations taken before the move to the LevelUP app stored the old
 * booking platform's name as the payment method. Records already in Redis
 * still carry it, so accept it on the way in and normalize on the way out.
 */
const LEGACY_PAY_ONLINE = "upperhand";

/** Coerce a stored or submitted payment method to a current value. */
export function normalizePaymentMethod(value: unknown): PaymentMethod {
  return value === "pay_online" || value === LEGACY_PAY_ONLINE
    ? "pay_online"
    : "pay_later";
}

/** True for any accepted payment method, legacy values included. */
function isPaymentMethod(value: unknown): boolean {
  return (
    value === "pay_later" || value === "pay_online" || value === LEGACY_PAY_ONLINE
  );
}
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
  tournament: "smash-cup-oct-2026";
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

// Namespaced per edition so the June 2026 records stay untouched.
const NAMESPACE = "tournament:smash-cup-oct-2026";

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
  return { ...safe, paymentMethod: normalizePaymentMethod(safe.paymentMethod) };
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
  players: RosterPlayer[];
  emergencyContact: { name: string; phone: string };
  notes?: string;
  paymentMethod: PaymentMethod;
  /** The captain accepts the tournament waiver and terms for the team. Required by the app. */
  waiverAccepted: boolean;
}

export interface RosterRules {
  minPlayers: number;
  /** Counts the captain, as the app does. */
  maxPlayers: number;
  minAge: number;
}

const DEFAULT_RULES: RosterRules = { minPlayers: MIN_ROSTER, maxPlayers: MAX_ROSTER, minAge: MIN_AGE };

export function validateRegistrationInput(
  input: RegistrationInput,
  rules: RosterRules = DEFAULT_RULES
): ValidationResult {
  const errors: Record<string, string> = {};

  // Team
  if (!input.teamName?.trim() || input.teamName.trim().length < 2) {
    errors.teamName = "Team name must be at least 2 characters.";
  }
  if (input.teamName?.trim().length > 60) {
    errors.teamName = "Team name must be 60 characters or fewer.";
  }
  if (input.division !== "open") {
    errors.division = "Invalid division.";
  }

  // Captain
  if (!input.captain?.name?.trim()) errors["captain.name"] = "Captain name required.";
  if (!input.captain?.email?.trim() || !EMAIL_REGEX.test(input.captain.email.trim())) {
    errors["captain.email"] = "Valid captain email required.";
  }
  if (!input.captain?.phone?.trim() || !PHONE_REGEX.test(input.captain.phone.trim())) {
    errors["captain.phone"] = "Valid captain phone required.";
  }

  // Waiver — the app refuses a team whose captain has not accepted it
  if (input.waiverAccepted !== true) {
    errors.terms = "Please accept the waiver and tournament terms to continue.";
  }

  // Roster — minimum 4 to register; teams can add more before the tournament.
  const players = Array.isArray(input.players) ? input.players : [];
  // The app counts the captain in the team size, so a captain not on the list is one more.
  const teamSize = players.length + (players.some((p) => p.isCaptain) ? 0 : 1);
  if (players.length < rules.minPlayers) {
    errors.players = `Roster must have at least ${rules.minPlayers} players.`;
  } else if (teamSize > rules.maxPlayers) {
    errors.players = `Up to ${rules.maxPlayers} on a team including the captain.`;
  }
  players.forEach((p, idx) => {
    if (!p.name?.trim()) {
      errors[`players.${idx}.name`] = "Player name required.";
    }
    if (typeof p.age !== "number" || p.age < rules.minAge) {
      errors[`players.${idx}.age`] = `Players must be ${rules.minAge} or older.`;
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
  if (!isPaymentMethod(input.paymentMethod)) {
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

export function validateUpdateInput(input: UpdateInput): ValidationResult {
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
    if (input.players.length < MIN_ROSTER) {
      errors.players = `Roster must have at least ${MIN_ROSTER} players.`;
    } else if (input.players.length > MAX_ROSTER) {
      errors.players = `Roster must have at most ${MAX_ROSTER} players.`;
    }
    input.players.forEach((p, idx) => {
      if (!p.name?.trim()) errors[`players.${idx}.name`] = "Player name required.";
      if (typeof p.age !== "number" || p.age < MIN_AGE) {
        errors[`players.${idx}.age`] = `Players must be ${MIN_AGE} or older.`;
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

  if (input.paymentMethod !== undefined && !isPaymentMethod(input.paymentMethod)) {
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
