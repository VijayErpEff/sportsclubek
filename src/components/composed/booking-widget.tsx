"use client";

import { useState, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Users,
  DollarSign,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { COURTS, generateTimeSlots, type Court, type TimeSlot } from "@/content/courts";
import { SPORTS } from "@/lib/constants/site";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STEPS = ["Sport", "Court", "Date & Time", "Confirm"] as const;

const SPORT_ICON_COLORS: Record<string, string> = {
  baseball: "bg-primary/10 text-primary border-primary/20",
  cricket: "bg-accent/10 text-accent border-accent/20",
  badminton: "bg-info/10 text-info border-info/20",
  pickleball: "bg-secondary/10 text-secondary border-secondary/20",
};

interface BookingForm {
  sport: string;
  courtId: string;
  date: Date | null;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
}

export function BookingWidget({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    sport: "",
    courtId: "",
    date: null,
    timeSlot: "",
    name: "",
    email: "",
    phone: "",
  });

  const selectedCourt = useMemo(
    () => COURTS.find((c) => c.id === form.courtId),
    [form.courtId]
  );

  const filteredCourts = useMemo(
    () => COURTS.filter((c) => c.sport === form.sport),
    [form.sport]
  );

  const next7Days = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  const timeSlots = useMemo(() => {
    if (!form.courtId || !form.date) return [];
    return generateTimeSlots(form.courtId, form.date);
  }, [form.courtId, form.date]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return form.sport !== "";
      case 1: return form.courtId !== "";
      case 2: return form.date !== null && form.timeSlot !== "";
      case 3: return form.name !== "" && form.email !== "" && form.phone !== "";
      default: return false;
    }
  }, [step, form]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: form.date?.toISOString(),
        }),
      }).catch(() => {
        // Silently handle in demo mode
      });
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
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

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-2xl bg-white shadow-card-elevated p-8 text-center",
          className
        )}
      >
        <motion.div
          initial={prefersReduced ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"
        >
          <Check className="h-8 w-8 text-accent" />
        </motion.div>
        <h3 className="font-display text-subsection text-neutral-900 mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-neutral-700 mb-1">
          {selectedCourt?.name} &mdash; {form.timeSlot}
        </p>
        <p className="text-neutral-500 text-sm mb-6">
          {form.date?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-neutral-500">
          A confirmation email has been sent to{" "}
          <span className="font-medium text-neutral-700">{form.email}</span>
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-card-elevated overflow-hidden",
        className
      )}
    >
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-6 pb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (i < step) {
                  setDirection(-1);
                  setStep(i);
                }
              }}
              disabled={i > step}
              aria-label={`Step ${i + 1}: ${label}`}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === step
                  ? "w-8 bg-accent"
                  : i < step
                  ? "w-2.5 bg-accent/40 cursor-pointer hover:bg-accent/60"
                  : "w-2.5 bg-neutral-200"
              )}
            />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-neutral-500 mb-4">
        Step {step + 1} of {STEPS.length} &mdash; {STEPS[step]}
      </p>

      {/* Step content */}
      <div className="px-6 pb-6 min-h-[320px]">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.div key="step-0" {...motionProps}>
              <h3 className="font-display text-card-title text-neutral-900 mb-4">
                Choose a Sport
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.slug}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        sport: sport.slug,
                        courtId: "",
                        timeSlot: "",
                      }))
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-5 transition-all duration-200 min-h-[100px]",
                      form.sport === sport.slug
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.sport === sport.slug}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold",
                        SPORT_ICON_COLORS[sport.slug] ?? "bg-neutral-100 text-neutral-700"
                      )}
                    >
                      {sport.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-sm text-neutral-900">
                      {sport.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step-1" {...motionProps}>
              <h3 className="font-display text-card-title text-neutral-900 mb-4">
                Select a{" "}
                {filteredCourts[0]?.type === "cage"
                  ? "Cage"
                  : filteredCourts[0]?.type === "net"
                  ? "Net"
                  : "Court"}
              </h3>
              <div className="space-y-3">
                {filteredCourts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() =>
                      setForm((f) => ({ ...f, courtId: court.id, timeSlot: "" }))
                    }
                    className={cn(
                      "w-full text-left rounded-xl border-2 p-4 transition-all duration-200",
                      form.courtId === court.id
                        ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                    aria-pressed={form.courtId === court.id}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-neutral-900">
                        {court.name}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-mono font-semibold text-accent">
                        <DollarSign className="h-3.5 w-3.5" />
                        {court.pricePerHour}/hr
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {court.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Users className="h-3 w-3" />
                      Up to {court.capacity} players
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-2" {...motionProps}>
              <h3 className="font-display text-card-title text-neutral-900 mb-4">
                Pick a Date & Time
              </h3>

              {/* Date pills */}
              <div className="flex items-center gap-1 mb-2">
                <Calendar className="h-4 w-4 text-neutral-500 mr-1 shrink-0" />
                <span className="text-sm font-medium text-neutral-700">Date</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
                {next7Days.map((d) => {
                  const isSelected =
                    form.date?.toDateString() === d.toDateString();
                  const isToday =
                    d.toDateString() === new Date().toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() =>
                        setForm((f) => ({ ...f, date: d, timeSlot: "" }))
                      }
                      className={cn(
                        "flex flex-col items-center rounded-lg px-3 py-2 text-center transition-all duration-200 shrink-0 min-w-[60px]",
                        isSelected
                          ? "bg-accent text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      )}
                      aria-pressed={isSelected}
                    >
                      <span className="text-[10px] uppercase font-semibold tracking-wider">
                        {isToday
                          ? "Today"
                          : d.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="text-lg font-bold">{d.getDate()}</span>
                      <span className="text-[10px]">
                        {d.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              {form.date && (
                <>
                  <div className="flex items-center gap-1 mb-2 mt-4">
                    <Clock className="h-4 w-4 text-neutral-500 mr-1 shrink-0" />
                    <span className="text-sm font-medium text-neutral-700">
                      Available Times
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => {
                          if (slot.available) {
                            setForm((f) => ({ ...f, timeSlot: slot.time }));
                          }
                        }}
                        disabled={!slot.available}
                        className={cn(
                          "rounded-lg px-2 py-2.5 text-sm font-medium transition-all duration-200 text-center",
                          !slot.available &&
                            "bg-neutral-50 text-neutral-400 line-through cursor-not-allowed",
                          slot.available &&
                            form.timeSlot !== slot.time &&
                            "bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10",
                          form.timeSlot === slot.time &&
                            "bg-accent text-white border border-accent"
                        )}
                        aria-pressed={form.timeSlot === slot.time}
                        aria-disabled={!slot.available}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step-3" {...motionProps}>
              <h3 className="font-display text-card-title text-neutral-900 mb-4">
                Your Details
              </h3>

              {/* Summary */}
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 mb-5">
                <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                  Booking Summary
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-neutral-900 font-medium">
                    {selectedCourt?.name}
                  </p>
                  <p className="text-neutral-600">
                    {form.date?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    {" at "}
                    {form.timeSlot}
                  </p>
                  <p className="text-accent font-mono font-semibold">
                    ${selectedCourt?.pricePerHour}/hour
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="booking-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="booking-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      id="booking-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="(443) 406-6494"
                      className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {step < 3 ? (
          <Button size="sm" onClick={goNext} disabled={!canProceed()}>
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!canProceed()}
            isLoading={isSubmitting}
          >
            <Check className="h-4 w-4 mr-1" />
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
}
