// ============================================================
// SERVER-SIDE calls into the LevelUP app (app.levelupsports.us).
// Tournament registrations and payments live in the app; the website is the
// front door. These run inside Next API routes only — the site key must never
// reach the browser.
//
// Env (host → Environment variables):
//   LEVELUP_APP_API_BASE             e.g. https://app.levelupsports.us
//   LEVELUP_PUBLIC_SITE_KEY          the value of PublicSite:ApiKey on that server
//   LEVELUP_SMASH_CUP_TOURNAMENT_ID  the Smash Cup's id in the app
//   LEVELUP_LPCL_TOURNAMENT_ID       the LPCL Kick Off's id in the app (defaults to 2)
// ============================================================

import type { TournamentSlug } from "@/lib/constants/tournaments";

export interface AppCallResult<T> {
  ok: boolean;
  status: number;
  data: T | null;
  error?: string;
  code?: string;
}

function config() {
  const base = (process.env.LEVELUP_APP_API_BASE || "").replace(/\/+$/, "");
  const key = process.env.LEVELUP_PUBLIC_SITE_KEY || "";
  return { base, key, configured: !!base && !!key };
}

/** Env var that holds each tournament's id in the app, plus a default where one is known. */
const TOURNAMENT_ID_ENV: Record<TournamentSlug, { name: string; fallback?: string }> = {
  "smash-cup": { name: "LEVELUP_SMASH_CUP_TOURNAMENT_ID" },
  lpcl: { name: "LEVELUP_LPCL_TOURNAMENT_ID", fallback: "2" },
};

/** The tournament's id in the app, or 0 when unset. */
export function appTournamentId(slug: TournamentSlug): number {
  const { name, fallback } = TOURNAMENT_ID_ENV[slug];
  return Number(process.env[name] || fallback || 0);
}

export function appConfigured(slug: TournamentSlug): boolean {
  const { configured } = config();
  const id = appTournamentId(slug);
  const ok = configured && id > 0;
  if (!ok) {
    // Names only, never values: this line is what the function log shows when the bridge
    // answers "not open right now", so the missing variable can be named instead of guessed.
    const { name } = TOURNAMENT_ID_ENV[slug];
    const missing = [
      !process.env.LEVELUP_APP_API_BASE && "LEVELUP_APP_API_BASE",
      !process.env.LEVELUP_PUBLIC_SITE_KEY && "LEVELUP_PUBLIC_SITE_KEY",
      !(id > 0) && `${name} (read as "${process.env[name] ?? ""}")`,
    ].filter(Boolean);
    console.warn(`[levelup-app] registration bridge not configured for ${slug}; missing: ${missing.join(", ") || "nothing — check scopes"}`);
  }
  return ok;
}

export async function callApp<T>(
  method: "GET" | "POST",
  path: string,
  body?: unknown
): Promise<AppCallResult<T>> {
  const { base, key, configured } = config();
  if (!configured) return { ok: false, status: 503, data: null, error: "The registration service is not configured.", code: "NOT_CONFIGURED" };
  let res: Response;
  try {
    res = await fetch(`${base}/api/v1${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Public-Site-Key": key,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 502, data: null, error: "Could not reach the registration service.", code: "UNREACHABLE" };
  }
  const text = await res.text();
  let json: unknown = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = null; }
  if (!res.ok) {
    const err = (json ?? {}) as { message?: string; error?: string; code?: string; errors?: Record<string, string[]> };
    const firstValidation = err.errors ? Object.values(err.errors).flat()[0] : undefined;
    return {
      ok: false,
      status: res.status,
      data: null,
      error: err.message || err.error || firstValidation || `The registration service answered ${res.status}.`,
      code: err.code,
    };
  }
  return { ok: true, status: res.status, data: json as T };
}
