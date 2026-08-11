"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check, Loader2, User, Phone, Mail, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/lib/constants/site";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SIZE_OPTIONS = [
  { value: "YXS", label: "Youth XS" },
  { value: "YS", label: "Youth S" },
  { value: "YM", label: "Youth M" },
  { value: "YL", label: "Youth L" },
  { value: "AS", label: "Adult S" },
  { value: "AM", label: "Adult M" },
  { value: "AL", label: "Adult L" },
  { value: "AXL", label: "Adult XL" },
  { value: "A2XL", label: "Adult 2XL" },
];

interface UniformFormData {
  athleteName: string;
  sports: string[];
  jerseySize: string;
  trackPantsSize: string;
  notes: string;
  parentName: string;
  phone: string;
  email: string;
}

const EMPTY_FORM: UniformFormData = {
  athleteName: "",
  sports: [],
  jerseySize: "",
  trackPantsSize: "",
  notes: "",
  parentName: "",
  phone: "",
  email: "",
};

function SizePicker({
  legend, value, onChange, name,
}: {
  legend: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-neutral-700 mb-2">{legend}</legend>
      <div className="grid grid-cols-3 gap-2">
        {SIZE_OPTIONS.map((size) => (
          <button
            key={`${name}-${size.value}`}
            type="button"
            onClick={() => onChange(size.value)}
            className={cn(
              "min-h-[44px] rounded-xl border-2 px-2 py-2.5 text-sm font-semibold transition-all",
              value === size.value
                ? "border-accent bg-accent/5 text-accent ring-1 ring-accent/20"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
            )}
            aria-pressed={value === size.value}
          >
            {size.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function UniformForm() {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState<UniformFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleSport = useCallback((slug: string) => {
    setForm((f) => ({
      ...f,
      sports: f.sports.includes(slug) ? f.sports.filter((s) => s !== slug) : [...f.sports, slug],
    }));
  }, []);

  const canSubmit =
    form.athleteName.trim() !== "" &&
    form.sports.length > 0 &&
    form.jerseySize !== "" &&
    form.trackPantsSize !== "" &&
    form.parentName.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "";

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/uniforms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Submit failed");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, [form]);

  // Success state
  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white shadow-card-elevated p-8 text-center max-w-md mx-auto">
        <motion.div
          initial={prefersReduced ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"
        >
          <Check className="h-8 w-8 text-accent" />
        </motion.div>
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Sizes received!</h3>
        <p className="text-neutral-500 mb-4">
          {form.athleteName.trim()}&rsquo;s jersey and track pants are on the list.
          We&rsquo;ll reach out when the kit is ready for pickup.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setForm(EMPTY_FORM); setStatus("idle"); }}
        >
          Submit another athlete
        </Button>
      </div>
    );
  }

  const inputCn = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors placeholder:text-neutral-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-card-elevated overflow-hidden max-w-lg mx-auto"
    >
      <div className="px-5 pt-6 pb-5 space-y-6">
        {/* ── Athlete ───────────────────────────── */}
        <div>
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Shirt className="h-5 w-5 text-accent" />
            Athlete details
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="uniform-athlete-name" className="block text-sm font-medium text-neutral-700 mb-1">
                Athlete&rsquo;s name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  id="uniform-athlete-name" type="text" required
                  value={form.athleteName}
                  onChange={(e) => setForm((f) => ({ ...f, athleteName: e.target.value }))}
                  placeholder="Name as it should appear on our roster"
                  className={cn(inputCn, "pl-10")}
                />
              </div>
            </div>
            <fieldset>
              <legend className="block text-sm font-medium text-neutral-700 mb-2">Sports they train in</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.slug}
                    type="button"
                    onClick={() => toggleSport(sport.slug)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border-2 p-3 transition-all text-left min-h-[44px]",
                      form.sports.includes(sport.slug)
                        ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.sports.includes(sport.slug)}
                  >
                    {form.sports.includes(sport.slug) && <Check className="h-4 w-4 text-accent shrink-0" />}
                    <span className="text-sm font-semibold text-neutral-900">{sport.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* ── Sizes ─────────────────────────────── */}
        <div className="space-y-5 border-t border-neutral-100 pt-5">
          <SizePicker
            legend="Jersey size"
            name="jersey"
            value={form.jerseySize}
            onChange={(v) => setForm((f) => ({ ...f, jerseySize: v }))}
          />
          <SizePicker
            legend="Track pants size"
            name="pants"
            value={form.trackPantsSize}
            onChange={(v) => setForm((f) => ({ ...f, trackPantsSize: v }))}
          />
          <p className="text-xs text-neutral-400">
            Between sizes? Pick the larger one — kids grow fast.
          </p>
          <div>
            <label htmlFor="uniform-notes" className="block text-sm font-medium text-neutral-700 mb-1">
              Fit notes <span className="text-neutral-400 font-normal">(optional)</span>
            </label>
            <input
              id="uniform-notes" type="text"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value.slice(0, 300) }))}
              placeholder="e.g. tall for their age, prefers a loose fit"
              className={inputCn}
            />
          </div>
        </div>

        {/* ── Parent contact ────────────────────── */}
        <div className="space-y-4 border-t border-neutral-100 pt-5">
          <h3 className="font-display text-lg font-bold text-neutral-900">Parent contact</h3>
          <div>
            <label htmlFor="uniform-parent-name" className="block text-sm font-medium text-neutral-700 mb-1">Parent name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="uniform-parent-name" type="text" required
                value={form.parentName}
                onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                placeholder="Your name"
                className={cn(inputCn, "pl-10")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="uniform-phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="uniform-phone" type="tel" required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="(443) 000-0000"
                className={cn(inputCn, "pl-10")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="uniform-email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                id="uniform-email" type="email" required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className={cn(inputCn, "pl-10")}
              />
            </div>
          </div>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 text-center" role="alert">{errorMsg}</p>
        )}
      </div>

      {/* Submit */}
      <div className="border-t border-neutral-100 px-5 py-4">
        <Button type="submit" className="w-full" disabled={!canSubmit || status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Submit Sizes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
