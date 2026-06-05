"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check, ArrowLeft, ArrowRight, Loader2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { POOLS } from "@/lib/constants/smash-cup-bracket";
import { captureLead } from "@/lib/leads";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DONE_KEY = "lus_smashcup_survey_done";

const TEAMS = [...POOLS.A, ...POOLS.B, "Spectator / Other"];

const RATING_OPTIONS = [
  { value: 1, emoji: "\u{1F61E}", label: "Poor" },
  { value: 2, emoji: "\u{1F615}", label: "Meh" },
  { value: 3, emoji: "\u{1F610}", label: "Okay" },
  { value: 4, emoji: "\u{1F60A}", label: "Great" },
  { value: 5, emoji: "\u{1F929}", label: "Amazing" },
];

const DETAILS = [
  { key: "competition", label: "Competition & matchups" },
  { key: "officiating", label: "Officiating / refereeing" },
  { key: "facility", label: "Courts & facility" },
  { key: "organization", label: "Organization & flow" },
] as const;

const BEST_OPTIONS = ["Competition", "Atmosphere", "Facility & courts", "Officiating", "Organization", "Prizes & awards"];
const IMPROVE_OPTIONS = ["More matches", "Scheduling & timing", "Officiating", "Facility / courts", "Food & drinks", "Communication"];

const PLAY_AGAIN = [
  { value: "promoter", label: "Definitely!", emoji: "\u{1F44D}", color: "border-green-300 bg-green-50 text-green-700" },
  { value: "passive", label: "Maybe", emoji: "\u{1F914}", color: "border-amber-300 bg-amber-50 text-amber-700" },
  { value: "detractor", label: "Probably not", emoji: "\u{1F44E}", color: "border-red-300 bg-red-50 text-red-700" },
];

type StepId = "team" | "overall" | "details" | "best" | "improve" | "play_again" | "shoutout";
const STEPS: StepId[] = ["team", "overall", "details", "best", "improve", "play_again", "shoutout"];
const STEP_LABELS: Record<StepId, string> = {
  team: "Your Team",
  overall: "Overall",
  details: "The Details",
  best: "Highlights",
  improve: "Improvements",
  play_again: "Next Time",
  shoutout: "Shout-out",
};

interface Form {
  team: string;
  overall: number;
  details: Record<string, number>;
  best: string[];
  improve: string[];
  feedback: string;
  playAgain: string;
  shoutout: string;
  name: string;
  email: string;
}

const EMPTY: Form = {
  team: "",
  overall: 0,
  details: {},
  best: [],
  improve: [],
  feedback: "",
  playAgain: "",
  shoutout: "",
  name: "",
  email: "",
};

export function VolleyballSurveyForm() {
  const reduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alreadyDone, setAlreadyDone] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(DONE_KEY)) {
      setAlreadyDone(true);
    }
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((s) => Math.max(s - 1, 0));
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case "team": return form.team !== "";
      case "overall": return form.overall > 0;
      case "play_again": return form.playAgain !== "";
      default: return true;
    }
  }, [currentStep, form]);

  const toggleArray = useCallback((field: "best" | "improve", value: string) => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value) ? f[field].filter((v) => v !== value) : [...f[field], value],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/tournaments/smash-cup/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");

      if (form.email.trim()) {
        captureLead({
          email: form.email.trim(),
          name: form.name.trim(),
          source: "survey",
          context: `Smash Cup survey — Team: ${form.team}, Overall: ${form.overall}/5`,
        });
      }

      localStorage.setItem(DONE_KEY, "true");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [form]);

  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, x: direction * 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -40 },
        transition: { duration: 0.3, ease: APPLE_EASE },
      };

  if (alreadyDone || status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-card-elevated">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <Trophy className="h-7 w-7 text-accent" />
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-neutral-900">Thanks for playing!</h3>
        <p className="text-sm text-neutral-500">
          Your feedback makes the next LevelUP Smash Cup even better. See you on the court! 🏐
        </p>
      </div>
    );
  }

  const inputCn =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors placeholder:text-neutral-400";

  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-2xl bg-white shadow-card-elevated">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 pb-2 pt-6">
        {STEPS.map((id, i) => (
          <button
            key={id}
            onClick={() => { if (i < stepIndex) { setDirection(-1); setStepIndex(i); } }}
            disabled={i > stepIndex}
            aria-label={`Step ${i + 1}: ${STEP_LABELS[id]}`}
            aria-current={i === stepIndex ? "step" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === stepIndex ? "w-7 bg-accent" : i < stepIndex ? "w-2 bg-accent/40 hover:bg-accent/60" : "w-2 bg-neutral-200"
            )}
          />
        ))}
      </div>
      <p className="mb-4 text-center text-xs text-neutral-400">
        Step {stepIndex + 1} of {STEPS.length} &mdash; {STEP_LABELS[currentStep]}
      </p>

      <div className="min-h-[320px] px-5 pb-5">
        <AnimatePresence mode="wait" initial={false}>
          {/* Team */}
          {currentStep === "team" && (
            <motion.div key="team" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">Who did you play for?</h3>
              <p className="mb-5 text-sm text-neutral-400">Pick your team (or spectator).</p>
              <div className="grid grid-cols-2 gap-2.5">
                {TEAMS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setForm((f) => ({ ...f, team: t }));
                      setTimeout(() => { setDirection(1); setStepIndex(1); }, 180);
                    }}
                    className={cn(
                      "rounded-xl border-2 p-3 text-left text-sm font-semibold text-neutral-900 transition-all",
                      form.team === t ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.team === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Overall */}
          {currentStep === "overall" && (
            <motion.div key="overall" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">How was the tournament overall?</h3>
              <p className="mb-6 text-sm text-neutral-400">Tap to rate.</p>
              <div className="flex items-center justify-center gap-3">
                {RATING_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setForm((f) => ({ ...f, overall: r.value }))}
                    className={cn(
                      "flex min-w-[56px] flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all",
                      form.overall === r.value ? "scale-110 border-accent bg-accent/5 ring-2 ring-accent/20" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.overall === r.value}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <span className="text-[10px] font-medium text-neutral-500">{r.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Details */}
          {currentStep === "details" && (
            <motion.div key="details" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">Rate the details</h3>
              <p className="mb-5 text-sm text-neutral-400">Optional — tap any that you have an opinion on.</p>
              <div className="space-y-4">
                {DETAILS.map((d) => (
                  <div key={d.key}>
                    <p className="mb-1.5 text-sm font-medium text-neutral-700">{d.label}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => setForm((f) => ({ ...f, details: { ...f.details, [d.key]: v } }))}
                          className={cn(
                            "h-9 flex-1 rounded-lg border text-sm font-semibold transition-all",
                            form.details[d.key] === v ? "border-accent bg-accent/10 text-accent" : "border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50"
                          )}
                          aria-pressed={form.details[d.key] === v}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Best */}
          {currentStep === "best" && (
            <motion.div key="best" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">What was the best part?</h3>
              <p className="mb-5 text-sm text-neutral-400">Tap all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {BEST_OPTIONS.map((opt) => (
                  <Chip key={opt} label={opt} active={form.best.includes(opt)} onClick={() => toggleArray("best", opt)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Improve */}
          {currentStep === "improve" && (
            <motion.div key="improve" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">What could we improve?</h3>
              <p className="mb-4 text-sm text-neutral-400">Tap all that apply.</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {IMPROVE_OPTIONS.map((opt) => (
                  <Chip key={opt} label={opt} active={form.improve.includes(opt)} onClick={() => toggleArray("improve", opt)} />
                ))}
              </div>
              <label htmlFor="vb-feedback" className="mb-1.5 block text-sm font-medium text-neutral-700">
                Anything else? <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                id="vb-feedback"
                value={form.feedback}
                onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value.slice(0, 500) }))}
                placeholder="Tell us anything — we're listening..."
                rows={3}
                className={cn(inputCn, "resize-none")}
              />
              <p className="mt-1 text-right text-[11px] text-neutral-400">{form.feedback.length}/500</p>
            </motion.div>
          )}

          {/* Play again */}
          {currentStep === "play_again" && (
            <motion.div key="play_again" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">Would you play in our next tournament?</h3>
              <p className="mb-6 text-sm text-neutral-400">Be honest!</p>
              <div className="space-y-3">
                {PLAY_AGAIN.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm((f) => ({ ...f, playAgain: opt.value }))}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                      form.playAgain === opt.value ? cn(opt.color, "ring-2 ring-offset-1") : "border-neutral-200 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.playAgain === opt.value}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-base font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Shoutout + optional contact */}
          {currentStep === "shoutout" && (
            <motion.div key="shoutout" {...motionProps}>
              <h3 className="mb-1 font-display text-lg font-bold text-neutral-900">Last one — any shout-outs?</h3>
              <p className="mb-5 text-sm text-neutral-400">MVP, best play, a team to praise — all optional.</p>
              <div className="space-y-3">
                <textarea
                  value={form.shoutout}
                  onChange={(e) => setForm((f) => ({ ...f, shoutout: e.target.value.slice(0, 300) }))}
                  placeholder="Shout-out an MVP or a great moment..."
                  rows={2}
                  className={cn(inputCn, "resize-none")}
                />
                <div className="rounded-xl bg-neutral-50 p-3">
                  <p className="mb-2 text-xs font-medium text-neutral-500">
                    Want updates on the next tournament? Leave your info (optional).
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Name"
                      className={inputCn}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="Email"
                      className={inputCn}
                    />
                  </div>
                </div>
              </div>
              {status === "error" && (
                <p className="mt-3 text-center text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4">
        <Button variant="ghost" size="sm" onClick={goBack} disabled={stepIndex === 0} className={cn(stepIndex === 0 && "invisible")}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        {!isLastStep ? (
          <Button size="sm" onClick={goNext} disabled={!canProceed()}>
            {(currentStep === "details" || currentStep === "best" || currentStep === "improve") && "Skip / "}
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSubmit} disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="mr-1 h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-2 text-sm font-medium transition-all",
        active ? "border-accent bg-accent/10 text-accent" : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
      )}
    >
      {active && <Check className="mr-1 -mt-0.5 inline h-3.5 w-3.5" />}
      {label}
    </button>
  );
}
