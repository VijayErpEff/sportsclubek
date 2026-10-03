import { NextResponse } from "next/server";
import { appConfigured, callApp } from "@/lib/levelup-app";

// What the "paid" page shows when Stripe sends the captain back. The app settles on the spot when
// the page beats the webhook, so "Unpaid" here means Stripe has not confirmed yet — poll once more.
export async function GET(request: Request) {
  if (!appConfigured()) return NextResponse.json({ error: "Not configured." }, { status: 503 });
  const sessionId = new URL(request.url).searchParams.get("session_id")?.trim();
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
  const result = await callApp<unknown>("GET", `/public/tournaments/checkout/${encodeURIComponent(sessionId)}`);
  if (!result.ok) return NextResponse.json({ error: result.error, code: result.code }, { status: result.status === 404 ? 404 : 503 });
  return NextResponse.json(result.data, { headers: { "Cache-Control": "no-store" } });
}
