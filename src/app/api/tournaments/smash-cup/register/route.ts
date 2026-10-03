import { NextResponse } from "next/server";
import {
  normalizePaymentMethod,
  sanitizePlayers,
  validateRegistrationInput,
  type RegistrationInput,
} from "@/lib/storage/tournament-registration";
import { appConfigured, callApp, SMASH_CUP_TOURNAMENT_ID } from "@/lib/levelup-app";

// The team is registered IN THE LEVELUP APP (the single record for registrations, rosters,
// payments and notifications). This route validates for the screen, then hands the team to the
// app's public door with the site key. A card payment comes back as a Stripe hosted Checkout link.

interface AppRegistration {
  registrationId: number;
  reference: string;
  teamName: string;
  status: string;
  amountDue: number;
  paymentChoice: "card" | "later" | "free";
  checkoutUrl: string | null;
  checkoutExpiresAt: string | null;
  captainEmail: string;
  playersInvited: number;
  playersListed: number;
}

export async function POST(request: Request) {
  if (!appConfigured()) {
    return NextResponse.json({ error: "Registration is not open right now. Please try again shortly." }, { status: 503 });
  }

  let body: Partial<RegistrationInput>;
  try {
    body = (await request.json()) as Partial<RegistrationInput>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input: RegistrationInput = {
    teamName: body.teamName?.trim() ?? "",
    division: "open",
    captain: {
      name: body.captain?.name?.trim() ?? "",
      email: body.captain?.email?.trim() ?? "",
      phone: body.captain?.phone?.trim() ?? "",
    },
    players: Array.isArray(body.players) ? body.players : [],
    emergencyContact: {
      name: body.emergencyContact?.name?.trim() ?? "",
      phone: body.emergencyContact?.phone?.trim() ?? "",
    },
    notes: body.notes?.toString().trim().slice(0, 500),
    paymentMethod: normalizePaymentMethod(body.paymentMethod),
    waiverAccepted: body.waiverAccepted === true,
  };

  const validation = validateRegistrationInput(input);
  if (!validation.ok) {
    return NextResponse.json({ error: "Validation failed", fields: validation.errors }, { status: 400 });
  }

  const origin = new URL(request.url).origin.replace(/^http:/, "https:");
  const players = sanitizePlayers(input.players);
  const result = await callApp<AppRegistration>("POST", `/public/tournaments/${SMASH_CUP_TOURNAMENT_ID}/team-registrations`, {
    teamName: input.teamName,
    captain: input.captain,
    players: players.map((p) => ({ name: p.name, age: p.age ?? null, email: p.email ?? null, phone: p.phone ?? null, isCaptain: p.isCaptain === true })),
    emergencyContact: input.emergencyContact,
    waiverAccepted: true,
    paymentChoice: input.paymentMethod === "pay_online" ? "card" : "later",
    notes: input.notes || null,
    successUrl: `${origin}/register/volleyball-tournament/paid?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/register/volleyball-tournament/manage?cancelled=1`,
  });

  if (!result.ok || !result.data) {
    const status = result.status === 503 || result.status === 502 ? 503 : 400;
    return NextResponse.json({ error: result.error, code: result.code }, { status });
  }
  const r = result.data;
  return NextResponse.json({
    id: r.reference,
    registrationId: r.registrationId,
    teamName: r.teamName,
    status: r.status,
    amountDue: r.amountDue,
    paymentChoice: r.paymentChoice,
    checkoutUrl: r.checkoutUrl,
    checkoutExpiresAt: r.checkoutExpiresAt,
    captainEmail: r.captainEmail,
    playersInvited: r.playersInvited,
    playersListed: r.playersListed,
  });
}
