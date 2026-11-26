import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import { sendEmail, BUSINESS_INBOX, REPLY_TO_INBOX, isEmailConfigured } from "@/lib/email/acs";
import { notificationEmail, autoReplyEmail } from "@/lib/email/templates";
import { TOURNAMENTS } from "@/lib/constants/tournaments";
import { SIGNUPS_KEY, parseSignup, pushSignupToApp, type Signup } from "@/lib/thanksgiving-signups";

// Thanksgiving cricket quick sign-up: name, email and phone only, everyone pays at the desk.
// Each player goes straight to the LevelUP app (player-signups). The site also keeps a copy
// in Redis (keyed by email, so a resubmit updates rather than duplicates) with the app's
// answer, so nothing is lost if the app is down; failures re-sync via ../sync-to-app.
// Staff list: GET ?pin=ADMIN_PIN (add &format=csv for a spreadsheet).

const T = TOURNAMENTS["thanksgiving-cricket"];
const LEADS_KEY = "leads";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Sign-up is not available right now. Please call (443) 406-6494." }, { status: 503 });
  }

  let body: { name?: unknown; email?: unknown; phone?: unknown; teamName?: unknown; waiverAccepted?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Answer as if it worked.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true });

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const teamName = typeof body.teamName === "string" ? body.teamName.trim().slice(0, 60) : "";

  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "Please enter your name.";
  if (!EMAIL_REGEX.test(email)) fields.email = "Please enter a valid email.";
  if (phone.replace(/\D/g, "").length < 10) fields.phone = "Please enter a valid phone number.";
  if (body.waiverAccepted !== true) fields.waiver = "Please accept the waiver to sign up.";
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }

  const signup: Signup = { name, email, phone, teamName, waiverAccepted: true, timestamp: new Date().toISOString() };
  signup.app = await pushSignupToApp(signup);
  if (!signup.app.ok) console.error("[thanksgiving-cricket] app sign-up failed:", signup.app.status, signup.app.error);
  try {
    const isNew = (await redis.hset(SIGNUPS_KEY, { [email]: JSON.stringify(signup) })) === 1;
    if (isNew) {
      await redis.lpush(
        LEADS_KEY,
        JSON.stringify({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          email,
          name,
          phone,
          source: "thanksgiving_cricket",
          context: `Thanksgiving cricket sign-up — ${teamName ? `team: ${teamName}` : "solo"}`,
          timestamp: signup.timestamp,
        })
      );
    }
  } catch (err) {
    console.error("[thanksgiving-cricket] save failed:", err);
    return NextResponse.json({ error: "We couldn't save your sign-up. Please try again or call (443) 406-6494." }, { status: 500 });
  }

  // Emails are a courtesy: the sign-up is already saved, so a mail failure never fails the request.
  if (isEmailConfigured()) {
    const entry = teamName ? `with ${teamName}` : "as a solo player (we'll place you on a mix-and-match team)";
    const results = await Promise.allSettled([
      sendEmail({
        to: BUSINESS_INBOX,
        replyTo: email,
        subject: `[Thanksgiving Cricket] ${name} — ${teamName || "Solo"}`,
        html: notificationEmail({
          type: "Tournament Sign-up",
          subject: "Thanksgiving Cricket",
          fromName: name,
          fromEmail: email,
          phone,
          message: `${name} signed up ${teamName ? `with team "${teamName}"` : "solo — needs a mix-and-match team"}. Pays $${T.fee} at the desk.`,
          extra: [{ label: "Team", value: teamName || "Solo" }],
        }),
      }),
      sendEmail({
        to: email,
        replyTo: REPLY_TO_INBOX,
        subject: "You're in — Thanksgiving Indoor Cricket Tournament",
        html: autoReplyEmail({
          subject: "You're signed up for Thanksgiving cricket",
          name,
          message: `You're on the list for the Thanksgiving Indoor Cricket Tournament ${entry}. Round robin is Thursday, November 26 from 11 AM; semi-finals and finals are Friday.`,
          nextSteps: [
            `Pay $${T.fee} at the front desk when you check in: cash, Venmo, Zelle or card.`,
            "We'll email the match schedule and team line-ups before Thursday.",
            "Bringing friends? Each player can sign up with their own name, email and phone.",
          ],
          preheader: `You're on the list, ${name.split(" ")[0]}. Pay $${T.fee} at the desk on game day.`,
        }),
      }),
    ]);
    results.forEach((r, i) => {
      if (r.status === "rejected") console.error(`[thanksgiving-cricket] ${i === 0 ? "staff notice" : "confirmation"} failed:`, r.reason);
    });
  }

  return NextResponse.json({ success: true, name, email, phone, teamName });
}

export async function GET(request: Request) {
  if (!redis) return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  const { searchParams } = new URL(request.url);
  if (searchParams.get("pin") !== ADMIN_PIN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = (await redis.hgetall<Record<string, string | Signup>>(SIGNUPS_KEY)) ?? {};
  const signups = Object.values(raw)
    .map(parseSignup)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  if (searchParams.get("format") === "csv") {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const csv = ["Name,Email,Phone,Team,Signed up,In app", ...signups.map((s) => [s.name, s.email, s.phone ?? "", s.teamName || "Solo", s.timestamp, s.app?.ok ? "yes" : `no${s.app?.error ? ` (${s.app.error})` : ""}`].map(esc).join(","))].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="thanksgiving-cricket-signups.csv"',
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.json({ total: signups.length, solo: signups.filter((s) => !s.teamName).length, inApp: signups.filter((s) => s.app?.ok).length, signups }, { headers: { "Cache-Control": "no-store" } });
}
