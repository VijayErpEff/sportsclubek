import { NextResponse } from "next/server";
import { appConfigured, callApp } from "@/lib/levelup-app";
import { isTournamentSlug, TOURNAMENTS } from "@/lib/constants/tournaments";

// A fresh Stripe link for a team already registered: the reference from the email plus the
// captain's email. The app answers one generic "no match" for a wrong id or a wrong email.
export async function POST(request: Request, ctx: { params: Promise<{ tournament: string }> }) {
  const { tournament: slug } = await ctx.params;
  if (!isTournamentSlug(slug)) return NextResponse.json({ error: "Unknown tournament" }, { status: 404 });
  const t = TOURNAMENTS[slug];
  if (!appConfigured(slug)) return NextResponse.json({ error: "Payment links are not available right now." }, { status: 503 });
  let body: { reference?: string; email?: string };
  try { body = (await request.json()) as { reference?: string; email?: string }; } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const id = Number(String(body.reference ?? "").trim().replace(/^LU-/i, ""));
  const email = String(body.email ?? "").trim();
  if (!id || !email) return NextResponse.json({ error: "Enter your registration reference and the captain's email." }, { status: 400 });
  const origin = new URL(request.url).origin.replace(/^http:/, "https:");
  const result = await callApp<{ checkoutUrl: string | null; checkoutExpiresAt: string | null; amountDue: number; teamName: string }>(
    "POST", `/public/tournaments/registrations/${id}/checkout-link`, {
      captainEmail: email,
      successUrl: `${origin}${t.registerHref}/paid?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}${t.registerHref}/manage?cancelled=1`,
    });
  if (!result.ok || !result.data) return NextResponse.json({ error: result.error, code: result.code }, { status: result.status >= 500 ? 503 : 400 });
  return NextResponse.json(result.data);
}
