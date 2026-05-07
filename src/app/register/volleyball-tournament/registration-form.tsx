"use client";

import { useState, useMemo, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Copy, Check, ArrowRight } from "lucide-react";

import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";

import {
  RosterFields,
  emptyPlayer,
  MIN_PLAYERS,
  playerInputsToApi,
  type PlayerInput,
} from "./roster-fields";

type Division = "youth" | "adult";
type PaymentMethod = "pay_later" | "upperhand";

interface SuccessState {
  id: string;
  paymentMethod: PaymentMethod;
  email: string;
}

export function RegistrationForm() {
  // ── Form state ─────────────────────────────────────────────
  const [teamName, setTeamName] = useState("");
  const [division, setDivision] = useState<Division>("adult");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
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
    if (division !== "youth" && division !== "adult") errs.division = "Pick a division.";
    if (!captainName.trim()) errs["captain.name"] = "Captain name required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail.trim()))
      errs["captain.email"] = "Valid email required.";
    if (!captainPhone.trim() || captainPhone.trim().length < 7)
      errs["captain.phone"] = "Valid phone required.";
    if (!/^\d{4}$/.test(pin)) errs.pin = "PIN must be exactly 4 digits.";
    if (pin && pinConfirm !== pin) errs.pinConfirm = "PINs don't match.";

    if (players.length < MIN_PLAYERS) errs.players = `At least ${MIN_PLAYERS} players required.`;
    players.forEach((p, idx) => {
      if (!p.name.trim()) errs[`players.${idx}.name`] = "Player name required.";
      if (division === "youth") {
        const age = Number(p.age);
        if (!p.age.trim() || isNaN(age) || age < 12 || age > 17) {
          errs[`players.${idx}.age`] = "Youth players must be 12–17.";
        }
      } else if (p.age.trim()) {
        const age = Number(p.age);
        if (!isNaN(age) && age < 18) {
          errs[`players.${idx}.age`] = "Adult players must be 18 or older.";
        }
      }
    });

    if (!emergencyName.trim()) errs["emergencyContact.name"] = "Emergency contact required.";
    if (!emergencyPhone.trim() || emergencyPhone.trim().length < 7)
      errs["emergencyContact.phone"] = "Valid phone required.";
    if (!acceptedTerms) errs.terms = "Please accept the tournament terms to continue.";
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
          division,
          captain: {
            name: captainName.trim(),
            email: captainEmail.trim(),
            phone: captainPhone.trim(),
          },
          pin,
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
      setSuccess({ id: data.id, paymentMethod, email: captainEmail.trim().toLowerCase() });
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
      {/* ── Section 1: Team & Division ─────────────────── */}
      <FormSection
        step={1}
        title="Team & Division"
        description="Pick your team name and division. Both divisions are co-ed."
      >
        <div className="space-y-3">
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
          <fieldset>
            <legend className="text-xs font-semibold text-neutral-700 mb-1.5">
              Division <span className="text-error">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              <DivisionRadio
                value="youth"
                checked={division === "youth"}
                onChange={() => setDivision("youth")}
                badge="12–17"
                title="Youth"
                hint="Co-ed"
              />
              <DivisionRadio
                value="adult"
                checked={division === "adult"}
                onChange={() => setDivision("adult")}
                badge="18+"
                title="Adult"
                hint="Co-ed"
              />
            </div>
          </fieldset>
        </div>
      </FormSection>

      {/* ── Section 2: Captain & PIN ─────────────────── */}
      <FormSection
        step={2}
        title="Team Captain"
        description="Main point of contact. Pick a 4-digit PIN — you'll use email + PIN to edit your roster later."
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
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <FloatingInput
            label="4-digit PIN"
            name="pin"
            type="password"
            inputMode="numeric"
            required
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            error={errors.pin}
            autoComplete="new-password"
          />
          <FloatingInput
            label="Confirm PIN"
            name="pinConfirm"
            type="password"
            inputMode="numeric"
            required
            maxLength={4}
            value={pinConfirm}
            onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
            error={errors.pinConfirm}
            autoComplete="new-password"
          />
        </div>
        <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
          Save your email + PIN — you&apos;ll need both to edit your roster later.
        </p>
      </FormSection>

      {/* ── Section 3: Roster ─────────────────── */}
      <FormSection
        step={3}
        title="Team Roster"
        description={`At least ${MIN_PLAYERS} players to register, up to 10. ${division === "youth" ? "Youth ages 12–17." : "Adults 18+."} Add more anytime before the tournament.`}
      >
        <RosterFields
          division={division}
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
        description="$200 per team. Pay now via Upper Hand or register first and we'll follow up."
      >
        <fieldset className="mb-3">
          <legend className="text-xs font-semibold text-neutral-700 mb-1.5">
            How will you pay? <span className="text-error">*</span>
          </legend>
          <div className="grid sm:grid-cols-2 gap-2">
            <PaymentRadio
              checked={paymentMethod === "pay_later"}
              onChange={() => setPaymentMethod("pay_later")}
              title="Register now, pay later"
              hint="We'll follow up with payment options (cash, Venmo, Zelle, card)."
            />
            <PaymentRadio
              checked={paymentMethod === "upperhand"}
              onChange={() => setPaymentMethod("upperhand")}
              title="Pay via Upper Hand"
              hint="Pay $200 by card on the next screen — locks your spot instantly."
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
            I confirm all rostered players will sign the standard liability waiver at check-in,
            and I accept the{" "}
            <Link
              href="/terms"
              className="text-accent hover:text-accent-hover underline underline-offset-2"
            >
              tournament terms
            </Link>
            .
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

function DivisionRadio({
  value,
  checked,
  onChange,
  badge,
  title,
  hint,
}: {
  value: string;
  checked: boolean;
  onChange: () => void;
  badge: string;
  title: string;
  hint: string;
}) {
  return (
    <label
      className={`relative flex items-center gap-2.5 rounded-lg border-2 p-2.5 cursor-pointer transition-all ${
        checked
          ? "border-accent bg-accent/5"
          : "border-neutral-200 bg-white hover:border-neutral-300"
      }`}
    >
      <input
        type="radio"
        name="division"
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`shrink-0 inline-flex items-center justify-center min-w-[2.5rem] px-1.5 h-8 rounded-md font-mono font-bold text-xs ${
          checked ? "bg-accent text-white" : "bg-neutral-100 text-neutral-600"
        }`}
      >
        {badge}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display font-semibold text-sm text-neutral-900 leading-tight">
          {title}
        </span>
        <span className="block text-[11px] text-neutral-500">{hint}</span>
      </span>
    </label>
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
        You&apos;re registered for the Smash Cup!
      </h2>
      <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
        We&apos;ve saved your team. Use the registration ID below if you contact us about your
        registration.
      </p>

      <RegistrationIdBox id={success.id} />

      {success.paymentMethod === "upperhand" && (
        <div className="mt-6 bg-accent/5 border border-accent/30 rounded-xl p-5 text-left max-w-lg mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-2">
            Step 2 — Complete Payment
          </p>
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
            Pay $200 via Upper Hand to confirm your spot
          </h3>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
            Your team is held for 48 hours. Click below to finish checkout — your spot
            isn&apos;t locked until payment clears.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a
              href="/go/volleyball-tournament"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay on Upper Hand <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-left max-w-lg mx-auto">
        <h3 className="font-semibold text-neutral-900 mb-2">What&apos;s next?</h3>
        <ul className="space-y-2 text-sm text-neutral-600">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">1.</span>
            <span>
              {success.paymentMethod === "upperhand" ? (
                <>
                  Complete the Upper Hand payment above. A receipt will be sent to{" "}
                  <span className="font-mono text-neutral-900">{success.email}</span>.
                </>
              ) : (
                <>
                  We&apos;ll reach out to{" "}
                  <span className="font-mono text-neutral-900">{success.email}</span>{" "}
                  with payment instructions (Venmo, Zelle, cash, or card).
                </>
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">2.</span>
            <span>
              Need to update your roster?{" "}
              <Link
                href="/register/volleyball-tournament/manage"
                className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
              >
                Manage your registration
              </Link>{" "}
              with your captain email + PIN.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-0.5">3.</span>
            <span>Pool seedings and check-in times go out the week of the tournament.</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="outline">
          <Link href="/events/volleyball-tournament">Back to tournament page</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register/volleyball-tournament/manage">Manage registration</Link>
        </Button>
      </div>
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
