"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { trackTournamentRegistration } from "@/lib/analytics";
import type { TournamentConfig } from "@/lib/constants/tournaments";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Name + email + phone sign-up for teams and solo players alike. No payment step: everyone pays at the desk. */
export function QuickSignupForm({ tournament, endpoint }: { tournament: TournamentConfig; endpoint: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamName, setTeamName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ name: string; email: string; teamName: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    if (!EMAIL_REGEX.test(email.trim())) errs.email = "Please enter a valid email.";
    if (phone.replace(/\D/g, "").length < 10) errs.phone = "Please enter a valid phone number.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), teamName: teamName.trim(), website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setSubmitError(data.error || "Sign-up failed. Please try again.");
        return;
      }
      trackTournamentRegistration(tournament.slug, tournament.fee);
      setDone({ name: name.trim(), email: email.trim().toLowerCase(), teamName: teamName.trim() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        role="status"
        className="bg-white rounded-2xl border border-secondary/30 p-6 md:p-10 text-center"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
          <CheckCircle2 className="h-7 w-7 text-secondary" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3 text-balance">
          You&apos;re in, {done.name.split(" ")[0]}!
        </h2>
        <p className="text-neutral-600 max-w-md mx-auto leading-relaxed">
          {done.teamName ? (
            <>You&apos;re signed up with <strong className="text-neutral-900">{done.teamName}</strong>.</>
          ) : (
            <>You&apos;re signed up solo. We&apos;ll put you on a mix-and-match team.</>
          )}{" "}
          Pay ${tournament.fee} at the front desk when you check in (cash, Venmo, Zelle or card). A
          confirmation is on its way to <span className="font-mono text-neutral-900">{done.email}</span>.
        </p>
        <p className="text-sm text-neutral-500 mt-4">
          Bringing teammates? Each player signs up with their own details, using the same team name.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setDone(null);
              setName("");
              setEmail("");
              setPhone("");
            }}
          >
            Sign up another player
          </Button>
          <Button asChild variant="outline">
            <Link href={tournament.eventHref}>Back to tournament page</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-neutral-200 p-5 md:p-8 shadow-sm space-y-4"
    >
      <div>
        <h2 className="font-display text-lg md:text-xl font-bold text-neutral-900 leading-tight">
          Sign up in 30 seconds
        </h2>
        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
          Teams and solo players use the same form. ${tournament.fee} per player, paid at the desk.
        </p>
      </div>

      <FloatingInput
        label="Your name"
        name="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        autoComplete="name"
        maxLength={100}
      />
      <FloatingInput
        label="Email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
        inputMode="email"
        maxLength={200}
      />
      <FloatingInput
        label="Phone"
        name="phone"
        type="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
        autoComplete="tel"
        inputMode="tel"
        maxLength={30}
      />
      <div>
        <FloatingInput
          label="Team name (optional)"
          name="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          autoComplete="off"
          maxLength={60}
          aria-describedby="team-name-hint"
        />
        <p id="team-name-hint" className="text-xs text-neutral-500 mt-1.5">
          Leave blank if you&apos;re coming solo. We&apos;ll place you on a team.
        </p>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-xl bg-error/5 border border-error/20 px-4 py-3 flex items-start gap-3 text-error"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{submitError}</p>
        </div>
      )}

      <Button type="submit" size="xl" isLoading={submitting} className="w-full">
        Sign me up
      </Button>
      <p className="text-xs text-neutral-500 text-center leading-relaxed">
        You&apos;ll sign the tournament waiver at check-in. See the{" "}
        <Link
          href="/terms#tournaments"
          className="text-accent hover:text-accent-hover underline underline-offset-2"
        >
          tournament terms
        </Link>
        .
      </p>
    </form>
  );
}
