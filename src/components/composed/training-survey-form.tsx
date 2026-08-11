"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check, ArrowLeft, ArrowRight, Loader2, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/lib/constants/site";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SURVEY_COMPLETED_KEY = "lus_training_survey_completed";

// Step IDs — used to build dynamic flows
type StepId =
  | "sports"
  | "duration"
  | "rating"
  | "progress"
  | "positives"
  | "improvements"
  | "nps"
  | "interests"
  | "contact";

const STEP_LABELS: Record<StepId, string> = {
  sports: "Sports",
  duration: "How Long",
  rating: "Rating",
  progress: "Progress",
  positives: "Highlights",
  improvements: "Improvements",
  nps: "Recommend",
  interests: "What's Next",
  contact: "Your Info",
};

const DURATION_OPTIONS = [
  { value: "under_1mo", label: "Just Started", sub: "Under a month", emoji: "\u{1F331}" },
  { value: "1_3mo", label: "1–3 Months", sub: "Settling in", emoji: "\u{1F3C3}" },
  { value: "3_6mo", label: "3–6 Months", sub: "In the groove", emoji: "\u{1F4AA}" },
  { value: "6mo_plus", label: "6+ Months", sub: "Part of the family", emoji: "\u{1F3C6}" },
];

const RATING_OPTIONS = [
  { value: 1, emoji: "\u{1F61E}", label: "Terrible" },
  { value: 2, emoji: "\u{1F615}", label: "Not Great" },
  { value: 3, emoji: "\u{1F610}", label: "Okay" },
  { value: 4, emoji: "\u{1F60A}", label: "Good" },
  { value: 5, emoji: "\u{1F929}", label: "Amazing" },
];

const PROGRESS_OPTIONS = [
  { value: "clear", label: "Yes, clear progress!", emoji: "\u{1F4C8}", color: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100", ring: "ring-green-300" },
  { value: "some", label: "Some progress", emoji: "\u{1F3AF}", color: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100", ring: "ring-amber-300" },
  { value: "not_yet", label: "Not yet", emoji: "\u{1F914}", color: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100", ring: "ring-red-300" },
];

const POSITIVE_OPTIONS = [
  "Quality of Coaching", "Coaches' Communication", "Well-Structured Sessions", "Skill Development",
  "Facility & Equipment", "Convenient Schedule", "Positive Environment", "Good Value",
];

const IMPROVEMENT_OPTIONS = [
  "More Individual Attention", "More Progress Updates", "Better Session Structure", "Smaller Group Sizes",
  "Better Equipment", "More Convenient Timings", "Coach Communication", "Better Value for Money",
];

const NPS_OPTIONS = [
  { value: "promoter", label: "Definitely!", emoji: "\u{1F44D}", color: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100" },
  { value: "passive", label: "Maybe", emoji: "\u{1F914}", color: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100" },
  { value: "detractor", label: "Probably Not", emoji: "\u{1F44E}", color: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100" },
];

const INTEREST_OPTIONS = [
  "More sessions per week", "1-on-1 private coaching", "Trying another sport", "Weekend training",
  "Competitive teams & tournaments", "Holiday & summer camps", "Membership plans", "Bringing a sibling or friend",
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrainingSurveyFormData {
  sports: string[];
  duration: string;
  rating: number;
  progress: string;
  positives: string[];
  improvements: string[];
  feedback: string;
  nps: string;
  interests: string[];
  athleteName: string;
  name: string;
  phone: string;
  email: string;
}

const EMPTY_FORM: TrainingSurveyFormData = {
  sports: [],
  duration: "",
  rating: 0,
  progress: "",
  positives: [],
  improvements: [],
  feedback: "",
  nps: "",
  interests: [],
  athleteName: "",
  name: "",
  phone: "",
  email: "",
};

// ---------------------------------------------------------------------------
// Dynamic step flow
// ---------------------------------------------------------------------------

function getSteps(form: TrainingSurveyFormData): StepId[] {
  const steps: StepId[] = ["sports", "duration", "rating", "progress"];
  if (form.rating >= 4) {
    steps.push("positives", "nps");
  } else if (form.rating >= 1) {
    steps.push("improvements");
  }
  steps.push("interests", "contact");
  return steps;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TrainingSurveyForm() {
  const prefersReduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<TrainingSurveyFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyDone, setAlreadyDone] = useState(false);

  const steps = useMemo(() => getSteps(form), [form]);
  const currentStep = steps[stepIndex] || "sports";
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
      case "sports": return true;
      case "duration": return form.duration !== "";
      case "rating": return form.rating > 0;
      case "progress": return form.progress !== "";
      case "positives": return true;
      case "improvements": return true;
      case "nps": return form.nps !== "";
      case "interests": return true;
      case "contact": return form.name.trim() !== "" && form.phone.trim() !== "" && form.email.trim() !== "";
      default: return false;
    }
  }, [currentStep, form]);

  const toggleArray = useCallback((field: "sports" | "positives" | "improvements" | "interests", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/training-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");

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
        <p className="text-neutral-500">
          Your feedback goes straight to our coaching team — it shapes how we run every
          session. We&rsquo;re proud to be part of your athlete&rsquo;s journey.
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
          {/* ── Sports ────────────────────────────── */}
          {currentStep === "sports" && (
            <motion.div key="sports" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Which sports does your athlete train in?</h3>
              <p className="text-sm text-neutral-400 mb-5">Select all that apply.</p>
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

          {/* ── Duration ──────────────────────────── */}
          {currentStep === "duration" && (
            <motion.div key="duration" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">How long have they been training with us?</h3>
              <p className="text-sm text-neutral-400 mb-5">This helps us read your feedback in context.</p>
              <div className="grid grid-cols-2 gap-3">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setForm((f) => ({ ...f, duration: opt.value }));
                      // Auto-advance after selection
                      setTimeout(() => { setDirection(1); setStepIndex((s) => s + 1); }, 200);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all",
                      form.duration === opt.value
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.duration === opt.value}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-semibold text-neutral-900 text-center leading-tight">{opt.label}</span>
                    <span className="text-[11px] text-neutral-400">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Rating ────────────────────────────── */}
          {currentStep === "rating" && (
            <motion.div key="rating" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">How&rsquo;s the training experience overall?</h3>
              <p className="text-sm text-neutral-400 mb-6">Coaching, sessions, facility — all of it. Tap to select.</p>
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

          {/* ── Progress ──────────────────────────── */}
          {currentStep === "progress" && (
            <motion.div key="progress" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Is your athlete making progress?</h3>
              <p className="text-sm text-neutral-400 mb-6">Skills, confidence, fitness — as you see it.</p>
              <div className="space-y-3">
                {PROGRESS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm((f) => ({ ...f, progress: opt.value }))}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl border-2 p-4 transition-all text-left",
                      form.progress === opt.value
                        ? cn(opt.color, "ring-2 ring-offset-1", opt.ring)
                        : "border-neutral-200 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.progress === opt.value}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-base font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Positives (high rating) ───────────── */}
          {currentStep === "positives" && (
            <motion.div key="positives" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                Love to hear it! What&rsquo;s working best?
              </h3>
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

          {/* ── Improvements (low/mid rating) ──────── */}
          {currentStep === "improvements" && (
            <motion.div key="improvements" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                {form.rating <= 2 ? "We're sorry. What should we fix first?" : "What would make training better?"}
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
            </motion.div>
          )}

          {/* ── NPS (high rating only) ────────────── */}
          {currentStep === "nps" && (
            <motion.div key="nps" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Would you recommend our training?</h3>
              <p className="text-sm text-neutral-400 mb-6">To another sports parent.</p>
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

          {/* ── Interests (growth) ─────────────────── */}
          {currentStep === "interests" && (
            <motion.div key="interests" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Anything you&rsquo;d like to see more of?</h3>
              <p className="text-sm text-neutral-400 mb-4">Select any that interest you, or skip.</p>
              <div className="flex flex-wrap gap-2 mb-5">
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
              <div>
                <label htmlFor="training-survey-feedback" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Anything else we should know? <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="training-survey-feedback"
                  value={form.feedback}
                  onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value.slice(0, 500) }))}
                  placeholder="Ideas, concerns, shout-outs for a coach — we read every word..."
                  rows={3}
                  className={cn(inputCn, "resize-none")}
                />
                <p className="text-right text-[11px] text-neutral-400 mt-1">{form.feedback.length}/500</p>
              </div>
            </motion.div>
          )}

          {/* ── Contact Info ──────────────────────── */}
          {currentStep === "contact" && (
            <motion.div key="contact" {...motionProps}>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Almost done!</h3>
              <p className="text-sm text-neutral-400 mb-5">
                So our coaches can follow up on your feedback personally.
              </p>
              <div className="space-y-3">
                <div>
                  <label htmlFor="training-survey-name" className="block text-sm font-medium text-neutral-700 mb-1">Parent name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="training-survey-name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="training-survey-athlete" className="block text-sm font-medium text-neutral-700 mb-1">
                    Athlete&rsquo;s first name <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="training-survey-athlete" type="text"
                      value={form.athleteName}
                      onChange={(e) => setForm((f) => ({ ...f, athleteName: e.target.value }))}
                      placeholder="Helps coaches act on your feedback"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="training-survey-phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="training-survey-phone" type="tel" required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="(443) 000-0000"
                      className={cn(inputCn, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="training-survey-email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="training-survey-email" type="email" required
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
        <Button variant="ghost" size="sm" onClick={goBack} disabled={stepIndex === 0} className={cn(stepIndex === 0 && "invisible")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {!isLastStep ? (
          <Button size="sm" onClick={goNext} disabled={!canProceed()}>
            {currentStep === "sports" && form.sports.length === 0 ? "Skip" :
             (currentStep === "positives" || currentStep === "improvements") && form[currentStep].length === 0 ? "Skip" :
             currentStep === "interests" && form.interests.length === 0 && !form.feedback.trim() ? "Skip" : "Next"}
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
