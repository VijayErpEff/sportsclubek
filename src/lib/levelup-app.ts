// ============================================================
// SERVER-SIDE calls into the LevelUP app (app.levelupsports.us).
// Tournament registrations and payments live in the app; the website is the
// front door. These run inside Next API routes only — the site key must never
// reach the browser.
//
// Env (Netlify → Site settings → Environment variables):
//   LEVELUP_APP_API_BASE   e.g. https://app.levelupsports.us
//   LEVELUP_PUBLIC_SITE_KEY  the value of PublicSite:ApiKey on that server
//   LEVELUP_SMASH_CUP_TOURNAMENT_ID  the tournament's id in the app
// ============================================================

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

export const SMASH_CUP_TOURNAMENT_ID = Number(process.env.LEVELUP_SMASH_CUP_TOURNAMENT_ID || 0);

export function appConfigured(): boolean {
  return config().configured && SMASH_CUP_TOURNAMENT_ID > 0;
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
