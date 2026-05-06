"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, LogIn } from "lucide-react";

import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";

import {
  RosterFields,
  emptyPlayer,
  MIN_PLAYERS,
  playerInputsToApi,
  type PlayerInput,
} from "../roster-fields";

type Division = "youth" | "adult";
type PaymentMethod = "pay_later" | "upperhand";

interface SafeRegistration {
  id: string;
  teamName: string;
  division: Division;
  captain: { name: string; email: string; phone: string };
  players: Array<{ name: string; age?: number; email?: string; phone?: string }>;
  emergencyContact: { name: string; phone: string };
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export function ManageClient() {
  const [phase, setPhase] = useState<"lookup" | "edit">("lookup");
  const [registration, setRegistration] = useState<SafeRegistration | null>(null);
  const [pin, setPin] = useState("");

  if (phase === "lookup") {
    return (
      <LookupForm
        onFound={(reg, pinValue) => {
          setRegistration(reg);
          setPin(pinValue);
          setPhase("edit");
        }}
      />
    );
  }

  if (registration) {
    return (
      <EditForm
        initial={registration}
        pin={pin}
        onUpdated={(reg) => setRegistration(reg)}
      />
    );
  }

  return null;
}

// ─── Lookup form ───────────────────────────────────────────────────

function LookupForm({
  onFound,
}: {
  onFound: (reg: SafeRegistration, pin: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !/^\d{4}$/.test(pin)) {
      setError("Enter your captain email and 4-digit PIN.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/tournaments/smash-cup/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), pin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't find that registration.");
        return;
      }
      onFound(data.registration as SafeRegistration, pin);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm space-y-5 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent">
          <LogIn className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="font-display text-xl font-bold text-neutral-900">Sign in to your registration</h2>
      </div>

      <FloatingInput
        label="Captain email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <FloatingInput
        label="4-digit PIN"
        name="pin"
        type="password"
        inputMode="numeric"
        required
        maxLength={4}
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
        autoComplete="current-password"
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl bg-error/5 border border-error/20 px-4 py-3 flex items-start gap-3 text-error"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{error}</p>
        </div>
      )}

      <Button type="submit" size="lg" isLoading={submitting} className="w-full">
        Sign In
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        Don&apos;t have a registration yet?{" "}
        <Link
          href="/register/volleyball-tournament"
          className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
        >
          Register your team
        </Link>
        .
      </p>
    </form>
  );
}

// ─── Edit form ─────────────────────────────────────────────────────

function EditForm({
  initial,
  pin,
  onUpdated,
}: {
  initial: SafeRegistration;
  pin: string;
  onUpdated: (reg: SafeRegistration) => void;
}) {
  const [teamName, setTeamName] = useState(initial.teamName);
  const [captainName, setCaptainName] = useState(initial.captain.name);
  const [captainPhone, setCaptainPhone] = useState(initial.captain.phone);
  const [players, setPlayers] = useState<PlayerInput[]>(() =>
    initial.players.length
      ? initial.players.map((p) => ({
          name: p.name,
          age: typeof p.age === "number" ? String(p.age) : "",
          email: p.email ?? "",
          phone: p.phone ?? "",
        }))
      : Array.from({ length: MIN_PLAYERS }, () => emptyPlayer())
  );
  const [emergencyName, setEmergencyName] = useState(initial.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(initial.emergencyContact.phone);
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initial.paymentMethod);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setErrors({});

    // Lightweight client validation — server is authoritative
    const errs: Record<string, string> = {};
    if (!teamName.trim()) errs.teamName = "Team name required.";
    if (!captainName.trim()) errs["captain.name"] = "Captain name required.";
    if (!captainPhone.trim()) errs["captain.phone"] = "Captain phone required.";
    if (!emergencyName.trim()) errs["emergencyContact.name"] = "Emergency contact name required.";
    if (!emergencyPhone.trim()) errs["emergencyContact.phone"] = "Emergency contact phone required.";
    if (players.length < MIN_PLAYERS) errs.players = `At least ${MIN_PLAYERS} players required.`;
    players.forEach((p, idx) => {
      if (!p.name.trim()) errs[`players.${idx}.name`] = "Player name required.";
      if (initial.division === "youth") {
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/tournaments/smash-cup/registrations/${encodeURIComponent(initial.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pin,
            teamName: teamName.trim(),
            captain: { name: captainName.trim(), phone: captainPhone.trim() },
            players: playerInputsToApi(players),
            emergencyContact: { name: emergencyName.trim(), phone: emergencyPhone.trim() },
            notes: notes.trim() || undefined,
            paymentMethod,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setError(data.error || "Update failed.");
        return;
      }
      setSuccess("Registration updated.");
      onUpdated({
        ...initial,
        teamName: teamName.trim(),
        captain: { ...initial.captain, name: captainName.trim(), phone: captainPhone.trim() },
        players: playerInputsToApi(players),
        emergencyContact: { name: emergencyName.trim(), phone: emergencyPhone.trim() },
        notes: notes.trim() || undefined,
        paymentMethod,
        updatedAt: new Date().toISOString(),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <p className="text-sm text-neutral-700">
            <span className="font-semibold text-neutral-900">{initial.teamName}</span> ·{" "}
            <span className="capitalize">{initial.division}</span> Division ·{" "}
            <span className="font-mono text-xs text-neutral-500">{initial.id}</span>
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            Division and captain email can&apos;t be changed here — call us if you need to.
          </p>
        </div>
      </div>

      {success && (
        <div
          role="status"
          className="rounded-xl bg-secondary/5 border border-secondary/30 px-4 py-3 flex items-start gap-3 text-secondary"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{success}</p>
        </div>
      )}

      {/* Team */}
      <Card title="Team">
        <FloatingInput
          label="Team name"
          name="teamName"
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          error={errors.teamName}
          maxLength={60}
        />
      </Card>

      {/* Captain */}
      <Card title="Captain">
        <div className="grid md:grid-cols-2 gap-4">
          <FloatingInput
            label="Captain name"
            name="captainName"
            required
            value={captainName}
            onChange={(e) => setCaptainName(e.target.value)}
            error={errors["captain.name"]}
          />
          <FloatingInput
            label="Captain email (locked)"
            name="captainEmail"
            value={initial.captain.email}
            disabled
          />
          <FloatingInput
            label="Captain phone"
            name="captainPhone"
            type="tel"
            required
            value={captainPhone}
            onChange={(e) => setCaptainPhone(e.target.value)}
            error={errors["captain.phone"]}
          />
        </div>
      </Card>

      {/* Roster */}
      <Card
        title="Roster"
        description={`${initial.division === "youth" ? "Youth" : "Adult"} division — ${MIN_PLAYERS}–10 players.`}
      >
        <RosterFields
          division={initial.division}
          players={players}
          errors={errors}
          onChange={setPlayers}
        />
      </Card>

      {/* Emergency + Notes */}
      <Card title="Emergency Contact & Notes">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <FloatingInput
            label="Emergency contact name"
            name="emergencyName"
            required
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
            error={errors["emergencyContact.name"]}
          />
          <FloatingInput
            label="Emergency contact phone"
            name="emergencyPhone"
            type="tel"
            required
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value)}
            error={errors["emergencyContact.phone"]}
          />
        </div>
        <FloatingTextarea
          label="Notes (optional)"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
        />
      </Card>

      {/* Payment */}
      <Card title="Payment Option">
        <div className="grid sm:grid-cols-2 gap-3">
          <label
            className={`relative flex flex-col gap-1 rounded-xl border-2 p-4 cursor-pointer transition-all ${
              paymentMethod === "pay_later"
                ? "border-accent bg-accent/5"
                : "border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "pay_later"}
              onChange={() => setPaymentMethod("pay_later")}
              className="sr-only"
            />
            <span className="font-display font-semibold text-neutral-900">Register now, pay later</span>
            <span className="text-xs text-neutral-500 leading-relaxed">
              We&apos;ll contact you with payment options.
            </span>
          </label>
          <label
            className={`relative flex flex-col gap-1 rounded-xl border-2 p-4 cursor-pointer transition-all ${
              paymentMethod === "upperhand"
                ? "border-accent bg-accent/5"
                : "border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "upperhand"}
              onChange={() => setPaymentMethod("upperhand")}
              className="sr-only"
            />
            <span className="font-display font-semibold text-neutral-900">Pay via Upper Hand</span>
            <span className="text-xs text-neutral-500 leading-relaxed">
              We&apos;ll send the Upper Hand checkout link.
            </span>
          </label>
        </div>
      </Card>

      {error && (
        <div
          role="alert"
          className="rounded-xl bg-error/5 border border-error/20 px-4 py-3 flex items-start gap-3 text-error"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Button type="submit" size="xl" isLoading={submitting} className="w-full sm:w-auto">
          Save Changes
        </Button>
        <Button type="button" variant="ghost" asChild className="w-full sm:w-auto">
          <Link href="/events/volleyball-tournament">Back to tournament</Link>
        </Button>
      </div>
    </form>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold text-neutral-900">{title}</h2>
        {description && (
          <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
