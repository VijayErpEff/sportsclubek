import "server-only";
import { appConfigured, appTournamentId, callApp } from "@/lib/levelup-app";

// Thanksgiving cricket single-player sign-ups. The LevelUP app is the record:
// each sign-up goes to POST /api/v1/public/tournaments/{id}/player-signups.
// The site keeps a copy in Redis (keyed by email) with the app's answer, so a
// sign-up is never lost if the app is down, and staff can re-sync failures.

export const SIGNUPS_KEY = "thanksgiving_cricket_2026:signups";

export interface AppSync {
  ok: boolean;
  at: string;
  status: number;
  /** Whatever id/reference the app returned, if any. */
  ref?: string;
  error?: string;
}

export interface Signup {
  name: string;
  email: string;
  /** Added Nov 25 evening; earlier sign-ups have none. */
  phone?: string;
  teamName: string;
  timestamp: string;
  app?: AppSync;
}

export function parseSignup(v: string | Signup): Signup {
  return typeof v === "string" ? (JSON.parse(v) as Signup) : v;
}

/** Sends one player to the app. Never throws; the result is stored on the sign-up. */
export async function pushSignupToApp(s: Signup): Promise<AppSync> {
  const at = new Date().toISOString();
  if (!appConfigured("thanksgiving-cricket")) {
    return { ok: false, at, status: 503, error: "App bridge not configured" };
  }
  const result = await callApp<Record<string, unknown>>(
    "POST",
    `/public/tournaments/${appTournamentId("thanksgiving-cricket")}/player-signups`,
    {
      name: s.name,
      email: s.email,
      phone: s.phone || null,
      teamName: s.teamName || null,
      paymentChoice: "later",
      source: "website",
    }
  );
  if (!result.ok) {
    return { ok: false, at, status: result.status, error: [result.code, result.error].filter(Boolean).join(": ") };
  }
  const d = result.data ?? {};
  const ref = ["reference", "signupId", "playerSignupId", "id", "registrationId"]
    .map((k) => d[k])
    .find((v) => typeof v === "string" || typeof v === "number");
  return { ok: true, at, status: result.status, ref: ref === undefined ? undefined : String(ref) };
}
