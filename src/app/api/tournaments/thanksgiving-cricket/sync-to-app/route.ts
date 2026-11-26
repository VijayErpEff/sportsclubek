import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import { SIGNUPS_KEY, parseSignup, pushSignupToApp, type Signup } from "@/lib/thanksgiving-signups";

// Staff-only: sends every sign-up the app hasn't confirmed yet to the app's player-signups
// endpoint, and records the app's answer on each. POST ?pin=ADMIN_PIN (add &all=1 to resend all).

const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

export async function POST(request: Request) {
  if (!redis) return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  const { searchParams } = new URL(request.url);
  if (searchParams.get("pin") !== ADMIN_PIN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = searchParams.get("all") === "1";

  const raw = (await redis.hgetall<Record<string, string | Signup>>(SIGNUPS_KEY)) ?? {};
  const results: Array<{ email: string; name: string; teamName: string; ok: boolean; status: number; ref?: string; error?: string }> = [];
  for (const [email, value] of Object.entries(raw)) {
    const s = parseSignup(value);
    if (!all && s.app?.ok) continue;
    s.app = await pushSignupToApp(s);
    await redis.hset(SIGNUPS_KEY, { [email]: JSON.stringify(s) });
    results.push({ email, name: s.name, teamName: s.teamName || "Solo", ...s.app });
  }
  return NextResponse.json(
    { attempted: results.length, synced: results.filter((r) => r.ok).length, results },
    { headers: { "Cache-Control": "no-store" } }
  );
}
