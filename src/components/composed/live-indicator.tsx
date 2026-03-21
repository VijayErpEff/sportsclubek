"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { WEEKLY_SCHEDULE, SPORT_COLORS, SPORT_LABELS, type Session } from "@/content/schedule";

// --- LiveActivityBadge ---

function getBaseAthleteCount(hour: number): number {
  // Simulate varying activity throughout the day
  if (hour < 9) return 3;
  if (hour < 12) return 8;
  if (hour < 15) return 6;
  if (hour < 18) return 14;
  if (hour < 21) return 18;
  return 5;
}

export function LiveActivityBadge({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(() => {
    const now = new Date();
    return getBaseAthleteCount(now.getHours());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const base = getBaseAthleteCount(now.getHours());
      // Add a small random variation of +/- 2
      const variation = Math.floor(Math.random() * 5) - 2;
      setCount(Math.max(1, base + variation));
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 px-3 py-1.5 shadow-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`${count} athletes training now`}
    >
      {/* Pulse dot */}
      <span className="relative flex h-2.5 w-2.5">
        {!prefersReduced && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>

      <span className="text-sm text-neutral-700">
        <span className="font-semibold text-neutral-900">{count}</span>{" "}
        athletes training now
      </span>
    </div>
  );
}

// --- NextSessionCountdown ---

interface NextSessionInfo {
  session: Session;
  dayName: string;
  minutesUntil: number;
}

function findNextSession(): NextSessionInfo | null {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Map day index to WEEKLY_SCHEDULE index
  // WEEKLY_SCHEDULE: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  // JS Date: Sun=0, Mon=1, ... Sat=6
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // JS day index -> schedule index

  // Search through 7 days starting from today
  for (let offset = 0; offset < 7; offset++) {
    const checkDay = (currentDay + offset) % 7;
    const scheduleIndex = dayMap[checkDay];
    const daySchedule = WEEKLY_SCHEDULE[scheduleIndex];

    if (!daySchedule) continue;

    for (const session of daySchedule.sessions) {
      // Parse session start time
      const timeParts = session.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeParts) continue;

      let hours = parseInt(timeParts[1], 10);
      const minutes = parseInt(timeParts[2], 10);
      const period = timeParts[3].toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const sessionMinutes = hours * 60 + minutes;

      // If same day, session must be in the future
      if (offset === 0 && sessionMinutes <= currentMinutes) continue;

      // Skip "open" sessions for more interesting results
      if (session.sport === "open") continue;

      const minutesUntil =
        offset === 0
          ? sessionMinutes - currentMinutes
          : (offset - 1) * 24 * 60 + (24 * 60 - currentMinutes) + sessionMinutes;

      return {
        session,
        dayName: daySchedule.day,
        minutesUntil,
      };
    }
  }

  return null;
}

function formatCountdown(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function NextSessionCountdown({ className }: { className?: string }) {
  const [nextSession, setNextSession] = useState<NextSessionInfo | null>(null);

  useEffect(() => {
    setNextSession(findNextSession());
    const interval = setInterval(() => {
      setNextSession(findNextSession());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!nextSession) return null;

  const sportColor = SPORT_COLORS[nextSession.session.sport];
  const sportLabel = SPORT_LABELS[nextSession.session.sport];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 px-3 py-1.5 shadow-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Next session: ${nextSession.session.activity} in ${formatCountdown(nextSession.minutesUntil)}`}
    >
      <Clock className="h-3.5 w-3.5 text-neutral-500" />
      <span className="text-sm text-neutral-700">
        Next:{" "}
        <span className={cn("font-semibold", sportColor?.text ?? "text-neutral-900")}>
          {nextSession.session.activity}
        </span>{" "}
        in{" "}
        <span className="font-mono font-semibold text-neutral-900">
          {formatCountdown(nextSession.minutesUntil)}
        </span>
      </span>
      <span
        className={cn("h-2 w-2 rounded-full", sportColor?.dot ?? "bg-neutral-400")}
        aria-hidden="true"
      />
    </div>
  );
}
