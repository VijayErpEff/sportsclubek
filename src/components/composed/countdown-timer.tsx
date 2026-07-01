"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({
  value,
  label,
  animate,
}: {
  value: number;
  label: string;
  animate: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-primary text-white flex items-center justify-center overflow-hidden",
          animate && "transition-all duration-300"
        )}
      >
        <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>
      <span className="text-xs font-medium text-neutral-500 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  // Start null so the server render and the first client render match (no
  // Date.now() during render). The real countdown fills in after mount, which
  // avoids a hydration mismatch on the ticking values.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const update = () => setTimeLeft(calculateTimeLeft(targetDate));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const display: TimeLeft = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const isExpired =
    timeLeft !== null &&
    display.days === 0 &&
    display.hours === 0 &&
    display.minutes === 0 &&
    display.seconds === 0;

  if (isExpired) {
    return (
      <div className={cn("text-center", className)}>
        <p className="text-lg font-bold text-accent">The event has started!</p>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-3 sm:gap-4", className)}
      aria-label={`Countdown: ${display.days} days, ${display.hours} hours, ${display.minutes} minutes, ${display.seconds} seconds`}
      role="timer"
    >
      <TimeUnit value={display.days} label="Days" animate={!prefersReduced} />
      <span className="text-2xl font-bold text-neutral-300 -mt-6">:</span>
      <TimeUnit value={display.hours} label="Hours" animate={!prefersReduced} />
      <span className="text-2xl font-bold text-neutral-300 -mt-6">:</span>
      <TimeUnit value={display.minutes} label="Min" animate={!prefersReduced} />
      <span className="text-2xl font-bold text-neutral-300 -mt-6">:</span>
      <TimeUnit value={display.seconds} label="Sec" animate={!prefersReduced} />
    </div>
  );
}
