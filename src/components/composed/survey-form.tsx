"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check, ArrowLeft, ArrowRight, Loader2, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/lib/constants/site";
import { captureLead } from "@/lib/leads";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STEPS = ["About You", "Sports", "Rating", "Positives", "Improvements", "Recommend", "Your Info"];
const SURVEY_COMPLETED_KEY = "lus_survey_completed";

const VISITOR_TYPES = [
  { value: "member", label: "Current Member", emoji: "🏅" },
  { value: "visited", label: "Visited / Free Trial", emoji: "👋" },
  { value: "not_visited", label: "Haven't Visited Yet", emoji: "🗺️" },
  { value: "exploring", label: "Just Exploring Online", emoji: "🔍" },
];

const RATING_OPTIONS = [
  { value: 1, emoji: "😞", label: "Terrible" },
  { value: 2, emoji: "😕", label: "Not Great" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Amazing" },
];

const POSITIVE_OPTIONS = [
  "Clean Facility", "Friendly Staff", "Great Coaching", "Good Value",
  "Convenient Location", "Variety of Sports", "Open Play Sessions", "Kids Programs",
];

const IMPROVEMENT_OPTIONS = [
  "More Open Play Times", "Lower Prices", "More Sports Offered", "Better Equipment",
  "Longer Hours", "More Parking", "Food & Drinks", "Website / Online Booking",
];

const NPS_OPTIONS = [
  { value: "promoter", label: "Definitely!", emoji: "👍", color: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100" },
  { value: "passive", label: "Maybe", emoji: "🤔", color: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100" },
  { value: "detractor", label: "Probably Not", emoji: "👎", color: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100" },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SurveyForm {
  visitorType: string;
  sports: string[];
  rating: number;
  positives: string[];
  improvements: string[];
  feedback: string;
  nps: string;
  name: string;
  phone: string;
  email: string;
}

const EMPTY_FORM: SurveyForm = {
  visitorType: "",
  sports: [],
  rating: 0,
  positives: [],
  improvements: [],
  feedback: "",
  nps: "",
  name: "",
  phone: "",
  email: "",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SurveyForm() {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<SurveyForm>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(SURVEY_COMPLETED_KEY)) {
      setAlreadyDone(true);
    }
  }, []);

  const goNext = useCallback(() => { setDirection(1); setStep((s) => Math.min(s + 1, 6)); }, []);
  const goBack = useCallback(() => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); }, []);

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return form.visitorType !== "";
      case 1: return true; // sports optional
      case 2: return form.rating > 0;
      case 3: return true; // positives optional
      case 4: return true; // improvements optional
      case 5: return form.nps !== "";
      case 6: return form.name.trim() !== "" && form.phone.trim() !== "" && form.email.trim() !== "";
      default: return false;
    }
  }, [step, form]);

  const toggleArray = useCallback((field: "sports" | "positives" | "improvements", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");

      // Also capture as lead client-side (redundant with server, but ensures it works)
      captureLead({
        email: form.email.trim(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        source: "survey",
        context: `Rating: ${form.rating}/5, NPS: ${form.nps}`,
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
        <p className="text-neutral-500 text-sm">You&rsquo;ve already submitted your response. We appreciate it!</p>
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
        <p className="text-neutral-500">Your feedback helps us improve. We&rsquo;re glad to have you in the LevelUP community.</p>
      </div>
    );
  }

  const inputCn = "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors placeholder:text-neutral-400";

  return (
    <div className="rounded-2xl bg-white shadow-card-elevated overflow-hidden max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => { if (i < step) { setDirection(-1); setStep(i); } }}
            disabled={i > step}
            aria-label={`Step ${i + 1}: ${label}`}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === step ? "w-7 bg-accent" : i < step ? "w-2 bg-accent/40 cursor-pointer hover:bg-accent/60" : "w-2 bg-neutral-200"
            )}
          />
        ))}
      </div>
      <p className="text-center text-xs text-neutral-400 mb-4">
        Step {step + 1} of {STEPS.length} &mdash; {STEPS[step]}
      </p>

      {/* Step content */}
      <div className="px-5 pb-5 min-h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          {/* Step 0: Visitor Type */}
          {step === 0 && (
            <motion.div key="s0" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">How do you know LevelUP?</h3>
              <p className="text-sm text-neutral-400 mb-5">This helps us understand your perspective.</p>
              <div className="grid grid-cols-2 gap-3">
                {VISITOR_TYPES.map((vt) => (
                  <button
                    key={vt.value}
                    onClick={() => setForm((f) => ({ ...f, visitorType: vt.value }))}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                      form.visitorType === vt.value
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.visitorType === vt.value}
                  >
                    <span className="text-2xl">{vt.emoji}</span>
                    <span className="text-sm font-semibold text-neutral-900 text-center leading-tight">{vt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Sports */}
          {step === 1 && (
            <motion.div key="s1" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Which sports interest you?</h3>
              <p className="text-sm text-neutral-400 mb-5">Select all that apply, or skip.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.slug}
                    onClick={() => toggleArray("sports", sport.slug)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border-2 p-3 transition-all text-left",
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
            </motion.div>
          )}

          {/* Step 2: Rating */}
          {step === 2 && (
            <motion.div key="s2" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Rate your overall experience</h3>
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

          {/* Step 3: Positives */}
          {step === 3 && (
            <motion.div key="s3" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">What do we do well?</h3>
              <p className="text-sm text-neutral-400 mb-5">Tap all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {POSITIVE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleArray("positives", opt)}
                    className={cn(
                      "px-3.5 py-2 rounded-full border text-sm font-medium transition-all",
                      form.positives.includes(opt)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.positives.includes(opt)}
                  >
                    {form.positives.includes(opt) && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Improvements + Feedback */}
          {step === 4 && (
            <motion.div key="s4" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">What could be better?</h3>
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
                <label htmlFor="survey-feedback" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Any feedback or suggestions for us? <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="survey-feedback"
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

          {/* Step 5: NPS */}
          {step === 5 && (
            <motion.div key="s5" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Would you recommend LevelUP?</h3>
              <p className="text-sm text-neutral-400 mb-6">To a friend or family member.</p>
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

          {/* Step 6: Contact Info + Submit */}
          {step === 6 && (
            <motion.div key="s6" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Almost done!</h3>
              <p className="text-sm text-neutral-400 mb-5">So we can follow up and keep you in the loop.</p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="survey-name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="survey-name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="survey-phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="survey-phone" type="tel" required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="(443) 000-0000"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="survey-email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="survey-email" type="email" required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={cn(inputCn, "pl-10")}
                    />
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
        <Button variant="ghost" size="sm" onClick={goBack} disabled={step === 0} className={cn(step === 0 && "invisible")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {step < 6 ? (
          <Button size="sm" onClick={goNext} disabled={!canProceed()}>
            {step === 1 && form.sports.length === 0 ? "Skip" : "Next"}
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
