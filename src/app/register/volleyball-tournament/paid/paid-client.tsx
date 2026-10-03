"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants/app";

interface Status {
  registrationId: number;
  reference: string;
  teamName: string;
  tournamentName: string;
  status: string;
  paymentState: "Paid" | "Unpaid";
  amountDue: number;
  captainEmail: string;
}

/**
 * Stripe sends the captain back here. The app settles the team on the spot if the webhook has not
 * landed yet, so "Unpaid" is only ever a few seconds old — we ask again a handful of times before
 * telling the captain to check their email.
 */
export function PaidClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!sessionId) { setError("This page needs the link Stripe sent you back with."); return; }
    let cancelled = false;
    const look = async () => {
      try {
        const res = await fetch(`/api/tournaments/smash-cup/checkout-status?session_id=${encodeURIComponent(sessionId)}`, { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) { setError(data.error || "We couldn't find that payment."); return; }
        setStatus(data as Status);
        if (data.paymentState !== "Paid" && attempts < 6) setTimeout(() => setAttempts((a) => a + 1), 2500);
      } catch {
        if (!cancelled) setError("Couldn't reach the server. Your payment is safe — check your email for the confirmation.");
      }
    };
    look();
    return () => { cancelled = true; };
  }, [sessionId, attempts]);

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-error/20 p-6 md:p-10 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-error mb-4" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">Something went wrong</h1>
        <p className="text-neutral-600 mb-6">{error}</p>
        <Button asChild variant="outline"><Link href="/register/volleyball-tournament/manage">Manage registration</Link></Button>
      </div>
    );
  }
  if (!status) return <p className="text-neutral-500 text-center">Checking your payment…</p>;

  const paid = status.paymentState === "Paid";
  return (
    <div className="bg-white rounded-2xl border border-secondary/30 p-6 md:p-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
        {paid ? <CheckCircle2 className="h-7 w-7 text-secondary" aria-hidden="true" /> : <Clock className="h-7 w-7 text-secondary" aria-hidden="true" />}
      </div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3 text-balance">
        {paid ? `${status.teamName} is in!` : "Payment received — confirming your spot"}
      </h1>
      <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
        {paid
          ? `Your ${status.tournamentName} entry is paid and confirmed. A receipt and confirmation are on their way to ${status.captainEmail}.`
          : "Stripe has your payment. We are matching it to your team — this takes a few seconds. If this page does not update, your confirmation email will."}
      </p>
      <p className="inline-block bg-primary text-white rounded-xl px-5 py-3 font-mono text-lg mb-6">{status.reference}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild><a href={`${APP.web}/tournaments`}>Manage your team in the app</a></Button>
        <Button asChild variant="outline"><Link href="/events/volleyball-tournament">Back to tournament page</Link></Button>
      </div>
    </div>
  );
}
