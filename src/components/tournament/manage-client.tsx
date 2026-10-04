"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, KeyRound, LogIn } from "lucide-react";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants/app";
import { feeLabel, type TournamentConfig } from "@/lib/constants/tournaments";

/**
 * Registrations live in the LevelUP app now. Rosters, the schedule and waivers are managed there
 * on the captain's account (the email they registered with). What this page still does for a team
 * that chose to pay at the desk: hand out a fresh card link for the reference in their email.
 */
export function ManageClient({ tournament }: { tournament: TournamentConfig }) {
  const params = useSearchParams();
  const cancelled = params.get("cancelled") === "1";
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payNow = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!reference.trim() || !email.trim()) { setError("Enter your reference and the captain's email."); return; }
    setBusy(true);
    try {
      const res = await fetch(`${tournament.apiBase}/checkout-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) { setError(data.error || "We couldn't start a card payment. Pay at the desk, or try again in a moment."); return; }
      window.location.assign(data.checkoutUrl);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <LogIn className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-lg font-bold text-neutral-900">Your roster, schedule and waivers</h2>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          Everything about your team lives in the LevelUP app, on the account that uses your captain
          email. First time? Use the &quot;set your password&quot; email we sent when you registered — or
          request a new one below.
        </p>
        <div className="flex flex-col gap-2">
          <Button asChild><a href={`${APP.web}/tournaments`}>Open my team in the app <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline"><a href={`${APP.web}/auth/forgot-password`}><KeyRound className="mr-2 h-4 w-4" /> Set or reset my password</a></Button>
        </div>
      </div>

      <form onSubmit={payNow} noValidate className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="font-display text-lg font-bold text-neutral-900 mb-1">Pay your team fee by card</h2>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          {cancelled
            ? "No charge was made. Your team is still held — pay now, or at the desk before registration closes."
            : "Chose to pay at the desk and changed your mind? Enter the reference from your confirmation email."}
        </p>
        <div className="space-y-3">
          <FloatingInput label="Registration reference (e.g. LU-123)" name="reference" required value={reference} onChange={(e) => setReference(e.target.value)} autoComplete="off" />
          <FloatingInput label="Captain email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        {error && (
          <p className="text-sm text-error mt-3 flex items-start gap-2" role="alert"><AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />{error}</p>
        )}
        <Button type="submit" size="lg" className="mt-4 w-full sm:w-auto" isLoading={busy}>Pay {feeLabel(tournament)} by card</Button>
      </form>
    </div>
  );
}
