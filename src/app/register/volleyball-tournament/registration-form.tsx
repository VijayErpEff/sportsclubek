"use client";

import { useState, useMemo, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Copy, Check, ArrowRight } from "lucide-react";

import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants/app";

import {
  RosterFields,
  emptyPlayer,
  MIN_PLAYERS,
  MAX_PLAYERS,
  MIN_AGE,
  teamTotal,
  playerInputsToApi,
  type PlayerInput,
} from "./roster-fields";

type PaymentMethod = "pay_later" | "pay_online";

interface SuccessState {
  /** The reference the captain quotes at the desk, e.g. LU-123. */
  id: string;
  paymentChoice: "card" | "later" | "free";
  email: string;
  amountDue: number;
  teamName: string;
}

export function RegistrationForm() {
  // ── Form state ─────────────────────────────────────────────
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [players, setPlayers] = useState<PlayerInput[]>(() =>
    Array.from({ length: MIN_PLAYERS }, () => emptyPlayer())
  );
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pay_later");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // ── UI state ───────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  // ── Validation (client-side mirror of server) ──────────────
  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!teamName.trim() || teamName.trim().length < 2) errs.teamName = "Team name required.";
    if (!captainName.trim()) errs["captain.name"] = "Captain name required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail.trim()))
      errs["captain.email"] = "Valid email required.";
    if (!captainPhone.trim() || captainPhone.trim().length < 7)
      errs["captain.phone"] = "Valid phone required.";

    if (players.length < MIN_PLAYERS) errs.players = `At least ${MIN_PLAYERS} players required.`;
    if (teamTotal(players) > MAX_PLAYERS)
      errs.players = `Up to ${MAX_PLAYERS} on a team including the captain — tick "This is me, the captain" on your own row, or remove one.`;
    players.forEach((p, idx) => {
      if (!p.name.trim()) errs[`players.${idx}.name`] = "Player name required.";
      const age = Number(p.age);
      if (!p.age.trim() || isNaN(age) || age < MIN_AGE) {
        errs[`players.${idx}.age`] = `Players must be ${MIN_AGE} or older.`;
      }
    });

    if (!emergencyName.trim()) errs["emergencyContact.name"] = "Emergency contact required.";
    if (!emergencyPhone.trim() || emergencyPhone.trim().length < 7)
      errs["emergencyContact.phone"] = "Valid phone required.";
    if (!acceptedTerms) errs.terms = "Please accept the waiver and tournament terms to continue.";
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      setTimeout(() => {
        const first = document.querySelector("[aria-invalid='true']");
        if (first) (first as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/tournaments/smash-cup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: teamName.trim(),
          division: "open",
          captain: {
            name: captainName.trim(),
            email: captainEmail.trim(),
            phone: captainPhone.trim(),
          },
          waiverAccepted: acceptedTerms,
          players: playerInputsToApi(players),
          emergencyContact: {
            name: emergencyName.trim(),
            phone: emergencyPhone.trim(),
          },
          notes: notes.trim() || undefined,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setSubmitError(data.error || "Registration failed. Please review and try again.");
        return;
      }
      // A card payment goes straight to Stripe's hosted page; the team is already held in the app,
      // so closing the tab loses nothing — the confirmation email carries the same link.
      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }
      setSuccess({
        id: data.id,
        paymentChoice: data.paymentChoice ?? "later",
        email: data.captainEmail ?? captainEmail.trim().toLowerCase(),
        amountDue: typeof data.amountDue === "number" ? data.amountDue : 250,
        teamName: data.teamName ?? teamName.trim(),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <SuccessScreen success={success} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 md:space-y-6">
      {/* ── Section 1: Team ─────────────────── */}
      <FormSection
        step={1}
        title="Your Team"
        description="One open division — co-ed, ages 16+. Pick a team name your crew will answer to."
      >
        <FloatingInput
          label="Team name"
          name="teamName"
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          error={errors.teamName}
          maxLength={60}
          autoComplete="off"
        />
      </FormSection>

      {/* ── Section 2: Captain & PIN ─────────────────── */}
      <FormSection
        step={2}
        title="Team Captain"
        description="Main point of contact. Your email becomes your LevelUP app login — that's where you manage the roster and see the schedule."
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <FloatingInput
            label="Captain full name"
            name="captainName"
            required
            value={captainName}
            onChange={(e) => setCaptainName(e.target.value)}
            error={errors["captain.name"]}
            autoComplete="name"
          />
          <FloatingInput
            label="Captain email"
            name="captainEmail"
            type="email"
            required
            value={captainEmail}
            onChange={(e) => setCaptainEmail(e.target.value)}
            error={errors["captain.email"]}
            autoComplete="email"
          />
          <FloatingInput
            label="Captain phone"
            name="captainPhone"
            type="tel"
            required
            value={captainPhone}
            onChange={(e) => setCaptainPhone(e.target.value)}
            error={errors["captain.phone"]}
            autoComplete="tel"
          />
        </div>
        <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
          First time with us? We&apos;ll email you a link to set your app password. Already have the
          app? Your team lands on the account that uses this email.
        </p>
      </FormSection>

      {/* ── Section 3: Roster ─────────────────── */}
      <FormSection
        step={3}
        title="Team Roster"
        description={`At least ${MIN_PLAYERS} players to register, up to ${MAX_PLAYERS} on the team including the captain. All players must be ${MIN_AGE}+. Add more anytime before the tournament.`}
      >
        <RosterFields
          players={players}
          errors={errors}
          onChange={setPlayers}
        />
      </FormSection>

      {/* ── Section 4: Emergency Contact + Notes ─────────────────── */}
      <FormSection
        step={4}
        title="Emergency Contact"
        description="Required for safety. Notes are optional."
      >
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <FloatingInput
            label="Emergency contact name"
            name="emergencyName"
            required
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
            error={errors["emergencyContact.name"]}
            autoComplete="off"
          />
          <FloatingInput
            label="Emergency contact phone"
            name="emergencyPhone"
            type="tel"
            required
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
            error={errors["emergencyContact.phone"]}
            autoComplete="off"
          />
        </div>
        <FloatingTextarea
          label="Notes for the tournament director (optional)"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
        />
      </FormSection>

      {/* ── Section 5: Payment + Terms ─────────────────── */}
      <FormSection
        step={5}
        title="Payment"
        description="$250 per team. Pay by card now, or register first and pay at the desk."
      >
        <fieldset className="mb-3">
          <legend className="text-xs font-semibold text-neutral-700 mb-1.5">
            How will you pay? <span className="text-error">*</span>
          </legend>
          <div className="grid sm:grid-cols-2 gap-2">
            <PaymentRadio
              checked={paymentMethod === "pay_later"}
              onChange={() => setPaymentMethod("pay_later")}
              title="Register now, pay at the desk"
              hint="Cash, Venmo, Zelle or card at LevelUP before registration closes. Your spot is held."
            />
            <PaymentRadio
              checked={paymentMethod === "pay_online"}
              onChange={() => setPaymentMethod("pay_online")}
              title="Pay $250 by card now"
              hint="Secure checkout on the next screen — locks your spot the moment it clears."
            />
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 rounded border-neutral-300 text-accent focus:ring-accent/30"
            aria-invalid={!!errors.terms}
          />
          <span>
            As captain I accept the tournament waiver and the{" "}
            <Link
              href="/terms"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              tournament terms
            </Link>{" "}
            for my team. Players I list with an email will be asked to sign their own waiver in the
            app; everyone else signs at check-in.
          </span>
        </label>
        {errors.terms && (
          <p className="text-sm text-error mt-2" role="alert">
            {errors.terms}
          </p>
        )}
      </FormSection>

      {/* ── Submit ─────────────────── */}
      {submitError && (
        <div
          role="alert"
          className="rounded-xl bg-error/5 border border-error/20 px-4 py-3 flex items-start gap-3 text-error"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{submitError}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button
          type="submit"
          size="xl"
          isLoading={submitting}
          className="w-full sm:w-auto"
        >
          Submit Registration
        </Button>
        <p className="text-xs text-neutral-500 text-center sm:text-left">
          By submitting, your team is reserved. Payment confirms your spot.
        </p>
      </div>
    </form>
  );
}

// ─── Helper subcomponents ──────────────────────────────────────────

function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`section-${step}-title`}
      className="bg-white rounded-xl border border-neutral-200 p-4 md:p-6 shadow-sm"
    >
      <div className="flex items-start gap-3 mb-4">
        <span
          aria-hidden="true"
          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-bold"
        >
          {step}
        </span>
        <div className="min-w-0 flex-1">
          <h2
            id={`section-${step}-title`}
            className="font-display text-base md:text-lg font-bold text-neutral-900 leading-tight"
          >
            {title}
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function PaymentRadio({
  checked,
  onChange,
  title,
  hint,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  hint: string;
}) {
  return (
    <label
      className={`relative flex flex-col gap-0.5 rounded-lg border-2 p-3 cursor-pointer transition-all ${
        checked
          ? "border-accent bg-accent/5"
          : "border-neutral-200 bg-white hover:border-neutral-300"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-display font-semibold text-sm text-neutral-900 leading-tight">
        {title}
      </span>
      <span className="text-[11px] text-neutral-500 leading-snug">{hint}</span>
    </label>
  );
}

// ─── Success screen ────────────────────────────────────────────────

function SuccessScreen({ success }: { success: SuccessState }) {
  return (
    <div className="bg-white rounded-2xl border border-secondary/30 p-6 md:p-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
        <CheckCircle2 className="h-7 w-7 text-secondary" aria-hidden="true" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 mb-3 text-balance">
        You&apos;re registered for the Fall Smash Cup!
      </h2>
      <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
        We&apos;ve saved your team. Use the registration ID below if you contact us about your
        registration.
      </p>

      <RegistrationIdBox id={success.id} />

      {success.paymentChoice === "later" && (
        <PayNowBox reference={success.id} email={success.email} amountDue={success.amountDue} />
      )}

      <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-left max-w-lg mx-auto">
        <h3 className="font-semibold text-neutral-900 mb-2">What&apos;s next?</h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">1.</span>
            <span>
              A confirmation is on its way to{" "}
              <span className="font-mono text-neutral-900">{success.email}</span>
              {success.paymentChoice === "later" ? (
                <> with your reference. Pay ${success.amountDue.toFixed(0)} at the desk (cash, Venmo, Zelle or card) before registration closes, or use the card button above.</>
              ) : (
                <>. Your spot is confirmed.</>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">2.</span>
            <span>
              Manage your roster in the LevelUP app. First time? Look for the &quot;set your password&quot;
              email, then sign in at{" "}
              <a href={`${APP.web}/tournaments`} className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2">
                app.levelupsports.us
              </a>
              . Players you listed with an email have been invited to sign their waiver.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">3.</span>
            <span>
              Pool seedings and your check-in time go out the week of October 24. On game day,
              scores and the bracket are live at{" "}
              <Link
                href="/smash-cup/live"
                className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
              >
                levelupsports.us/smash-cup/live
              </Link>
              .
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="outline">
          <Link href="/events/volleyball-tournament">Back to tournament page</Link>
        </Button>
        <Button asChild variant="outline">
          <a href={`${APP.web}/tournaments`}>Open the LevelUP app</a>
        </Button>
      </div>
    </div>
  );
}

/** A held team paying by card after all: the same hosted Checkout, re-issued for this registration. */
function PayNowBox({ reference, email, amountDue }: { reference: string; email: string; amountDue: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const payNow = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/tournaments/smash-cup/checkout-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || "We couldn't start a card payment. Pay at the desk, or try again in a moment.");
        return;
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mt-6 bg-accent/5 border border-accent/30 rounded-xl p-5 text-left max-w-lg mx-auto">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-2">Changed your mind?</p>
      <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">Pay ${amountDue.toFixed(0)} by card now</h3>
      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
        Your team is held either way. Paying by card locks the spot the moment it clears.
      </p>
      <Button size="lg" className="w-full sm:w-auto" onClick={payNow} isLoading={busy}>
        Pay by card <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      {error && <p className="text-sm text-error mt-3" role="alert">{error}</p>}
    </div>
  );
}

function RegistrationIdBox({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const displayId = useMemo(() => id, [id]);

  return (
    <div className="inline-flex items-center gap-3 bg-primary text-white rounded-xl px-5 py-3 font-mono text-lg shadow-sm">
      <span className="tracking-wider">{displayId}</span>
      <button
        type="button"
        onClick={copy}
        className="text-white/70 hover:text-white transition-colors p-1 rounded"
        aria-label="Copy registration ID"
      >
        {copied ? <Check className="h-4 w-4 text-secondary" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
