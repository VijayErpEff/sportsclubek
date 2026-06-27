"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check, ArrowLeft, ArrowRight, Loader2, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureLead } from "@/lib/leads";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SURVEY_COMPLETED_KEY = "lus_camp_survey_completed";

type StepId =
  | "program"
  | "rating"
  | "highlights"
  | "improvements"
  | "nps"
  | "interests"
  | "contact";

const STEP_LABELS: Record<StepId, string> = {
  program: "Program",
  rating: "Rating",
  highlights: "Highlights",
  improvements: "Improvements",
  nps: "Recommend",
  interests: "What's Next",
  contact: "Your Info",
};

const PROGRAM_OPTIONS = [
  { value: "full_day", label: "Full Day (Sports + Coding)", emoji: "\u{2600}️" },
  { value: "half_sports", label: "Half Day — Sports", emoji: "\u{26BD}" },
  { value: "half_coding", label: "Half Day — Coding", emoji: "\u{1F4BB}" },
  { value: "unsure", label: "Not Sure", emoji: "\u{1F914}" },
];

const RATING_OPTIONS = [
  { value: 1, emoji: "\u{1F61E}", label: "Terrible" },
  { value: 2, emoji: "\u{1F615}", label: "Not Great" },
  { value: 3, emoji: "\u{1F610}", label: "Okay" },
  { value: 4, emoji: "\u{1F60A}", label: "Good" },
  { value: 5, emoji: "\u{1F929}", label: "Amazing" },
];

const HIGHLIGHT_OPTIONS = [
  "Coaches & Instructors", "Sports Training", "Code Ninjas / STEM", "Made New Friends",
  "Daily Variety", "Updates & Photos", "Facility", "Fun & Energy",
];

const IMPROVEMENT_OPTIONS = [
  "More Sports Time", "More Coding Time", "Smaller Groups", "Communication",
  "Drop-off / Pickup", "Lunch & Snacks", "Pricing", "Scheduling",
];

const INTEREST_OPTIONS = [
  "Next Camp Session", "Weekend Academies", "After-School Programs",
  "Code Ninjas Ongoing", "Memberships", "Birthday Parties",
];

const NPS_OPTIONS = [
  { value: "promoter", label: "Definitely!", emoji: "\u{1F44D}", color: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100" },
  { value: "passive", label: "Maybe", emoji: "\u{1F914}", color: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100" },
  { value: "detractor", label: "Probably Not", emoji: "\u{1F44E}", color: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100" },
];

const TESTIMONIAL_OPTIONS = [
  { value: "named", label: "Yes — with my first name" },
  { value: "anon", label: "Yes — anonymously" },
  { value: "no", label: "No thanks" },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CampSurveyForm {
  program: string;
  rating: number;
  highlights: string[];
  improvements: string[];
  feedback: string;
  nps: string;
  interests: string[];
  testimonial: string;
  name: string;
  phone: string;
  email: string;
}

const EMPTY_FORM: CampSurveyForm = {
  program: "",
  rating: 0,
  highlights: [],
  improvements: [],
  feedback: "",
  nps: "",
  interests: [],
  testimonial: "",
  name: "",
  phone: "",
  email: "",
};

// ---------------------------------------------------------------------------
// Dynamic step flow
// ---------------------------------------------------------------------------

function getSteps(form: CampSurveyForm): StepId[] {
  if (!form.program) return ["program"];

  const steps: StepId[] = ["program", "rating", "highlights"];
  if (form.rating >= 1 && form.rating <= 3) steps.push("improvements");
  if (form.rating >= 4) steps.push("nps");
  steps.push("interests", "contact");
  return steps;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CampSurveyForm() {
  const prefersReduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<CampSurveyForm>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyDone, setAlreadyDone] = useState(false);

  const steps = useMemo(() => getSteps(form), [form]);
  const currentStep = steps[stepIndex] || "program";
  const isLastStep = stepIndex === steps.length - 1;

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(SURVEY_COMPLETED_KEY)) {
      setAlreadyDone(true);
    }
  }, []);

  // Clamp stepIndex if steps array shrinks (e.g., rating changes path)
  useEffect(() => {
    if (stepIndex >= steps.length) {
      setStepIndex(steps.length - 1);
    }
  }, [steps.length, stepIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStepIndex((s) => Math.min(s + 1, steps.length - 1));
  }, [steps.length]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((s) => Math.max(s - 1, 0));
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case "program": return form.program !== "";
      case "rating": return form.rating > 0;
      case "highlights": return true;
      case "improvements": return true;
      case "nps": return form.nps !== "";
      case "interests": return true;
      case "contact": return form.name.trim() !== "" && form.phone.trim() !== "" && form.email.trim() !== "";
      default: return false;
    }
  }, [currentStep, form]);

  const toggleArray = useCallback((field: "highlights" | "improvements" | "interests", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/camp-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");

      captureLead({
        email: form.email.trim(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        source: "camp_survey",
        context: `Camp rating: ${form.rating}/5${form.nps ? `, NPS: ${form.nps}` : ""}`,
      });

      localStorage.setItem(SURVEY_COMPLETED_KEY, "true");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [form]);

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, x: direction * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -40 },
        transition: { duration: 0.3, ease: APPLE_EASE },
      };

  // Already completed
  if (alreadyDone) {
    return (
      <div className="rounded-2xl bg-white shadow-card-elevated p-8 text-center max-w-md mx-auto">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-7 w-7 text-accent" />
        </div>
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Thanks for your feedback!</h3>
        <p className="text-neutral-500 text-sm">You&rsquo;ve already shared your thoughts on camp. We appreciate it!</p>
      </div>
    );
  }

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
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">Thank you!</h3>
        <p className="text-neutral-500">
          Your feedback means the world to our coaches and crew. See you at the next LevelUP camp!
        </p>
      </div>
    );
  }

  const inputCn = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors placeholder:text-neutral-400";

  return (
    <div className="rounded-2xl bg-white shadow-card-elevated overflow-hidden max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
        {steps.map((id, i) => (
          <button
            key={id}
            onClick={() => { if (i < stepIndex) { setDirection(-1); setStepIndex(i); } }}
            disabled={i > stepIndex}
            aria-label={`Step ${i + 1}: ${STEP_LABELS[id]}`}
            aria-current={i === stepIndex ? "step" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === stepIndex ? "w-7 bg-accent" : i < stepIndex ? "w-2 bg-accent/40 cursor-pointer hover:bg-accent/60" : "w-2 bg-neutral-200"
            )}
          />
        ))}
      </div>
      <p className="text-center text-xs text-neutral-400 mb-4">
        Step {stepIndex + 1} of {steps.length} &mdash; {STEP_LABELS[currentStep]}
      </p>

      {/* Step content */}
      <div className="px-5 pb-5 min-h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          {/* ── Program ───────────────────────────── */}
          {currentStep === "program" && (
            <motion.div key="program" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Which program did your camper attend?</h3>
              <p className="text-sm text-neutral-400 mb-5">This helps us tailor the rest of the survey.</p>
              <div className="grid grid-cols-2 gap-3">
                {PROGRAM_OPTIONS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => {
                      setForm((f) => ({ ...f, program: p.value }));
                      setTimeout(() => { setDirection(1); setStepIndex(1); }, 200);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                      form.program === p.value
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.program === p.value}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="text-sm font-semibold text-neutral-900 text-center leading-tight">{p.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Rating ────────────────────────────── */}
          {currentStep === "rating" && (
            <motion.div key="rating" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">How was your camper&rsquo;s experience?</h3>
              <p className="text-sm text-neutral-400 mb-6">Tap to select.</p>
              <div className="flex items-center justify-center gap-3">
                {RATING_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setForm((f) => ({ ...f, rating: r.value }))}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all min-w-[56px]",
                      form.rating === r.value
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20 scale-110"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.rating === r.value}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <span className="text-[10px] font-medium text-neutral-500">{r.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Highlights ────────────────────────── */}
          {currentStep === "highlights" && (
            <motion.div key="highlights" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">What stood out this week?</h3>
              <p className="text-sm text-neutral-400 mb-5">Tap all that apply, or skip.</p>
              <div className="flex flex-wrap gap-2">
                {HIGHLIGHT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArray("highlights", opt)}
                    className={cn(
                      "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                      form.highlights.includes(opt)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.highlights.includes(opt)}
                  >
                    {form.highlights.includes(opt) && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Improvements (rating <= 3) ────────── */}
          {currentStep === "improvements" && (
            <motion.div key="improvements" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                {form.rating <= 2 ? "We're sorry. What could we fix?" : "What could we do better?"}
              </h3>
              <p className="text-sm text-neutral-400 mb-4">Tap all that apply.</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {IMPROVEMENT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArray("improvements", opt)}
                    className={cn(
                      "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                      form.improvements.includes(opt)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.improvements.includes(opt)}
                  >
                    {form.improvements.includes(opt) && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
                    {opt}
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="camp-feedback" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Anything else? <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="camp-feedback"
                  value={form.feedback}
                  onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value.slice(0, 500) }))}
                  placeholder="Tell us anything — we're listening..."
                  rows={3}
                  className={cn(inputCn, "resize-none")}
                />
                <p className="text-right text-[11px] text-neutral-400 mt-1">{form.feedback.length}/500</p>
              </div>
            </motion.div>
          )}

          {/* ── NPS (rating >= 4) ─────────────────── */}
          {currentStep === "nps" && (
            <motion.div key="nps" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Would you recommend our camp?</h3>
              <p className="text-sm text-neutral-400 mb-6">To another family.</p>
              <div className="space-y-3">
                {NPS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm((f) => ({ ...f, nps: opt.value }))}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl border-2 p-4 transition-all text-left",
                      form.nps === opt.value
                        ? cn(opt.color, "ring-2 ring-offset-1", opt.value === "promoter" ? "ring-green-300" : opt.value === "passive" ? "ring-amber-300" : "ring-red-300")
                        : "border-neutral-200 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.nps === opt.value}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-base font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Interests ─────────────────────────── */}
          {currentStep === "interests" && (
            <motion.div key="interests" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">What&rsquo;s next for your camper?</h3>
              <p className="text-sm text-neutral-400 mb-5">Tell us what you&rsquo;d like to hear about.</p>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArray("interests", opt)}
                    className={cn(
                      "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                      form.interests.includes(opt)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.interests.includes(opt)}
                  >
                    {form.interests.includes(opt) && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Contact ───────────────────────────── */}
          {currentStep === "contact" && (
            <motion.div key="contact" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Almost done!</h3>
              <p className="text-sm text-neutral-400 mb-5">So we can follow up and share what&rsquo;s coming next.</p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="camp-name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="camp-name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="camp-phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="camp-phone" type="tel" required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="(443) 000-0000"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="camp-email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="camp-email" type="email" required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium text-neutral-700 mb-1.5">
                    May we share your feedback as a testimonial? <span className="text-neutral-400 font-normal">(optional)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TESTIMONIAL_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, testimonial: f.testimonial === opt.value ? "" : opt.value }))}
                        className={cn(
                          "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                          form.testimonial === opt.value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                        )}
                        aria-pressed={form.testimonial === opt.value}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {status === "error" && (
                <p className="mt-3 text-sm text-red-600 text-center">Something went wrong. Please try again.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4">
        <Button variant="ghost" size="sm" onClick={goBack} disabled={stepIndex === 0} className={cn(stepIndex === 0 && "invisible")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {!isLastStep ? (
          <Button size="sm" onClick={goNext} disabled={!canProceed()}>
            {(currentStep === "highlights" || currentStep === "improvements" || currentStep === "interests") && !canProceed()
              ? "Skip"
              : "Next"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSubmit} disabled={!canProceed() || status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                Submit
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
