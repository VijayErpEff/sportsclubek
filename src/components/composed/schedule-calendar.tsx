"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ChevronRight, Clock, Filter } from "lucide-react";
import {
  WEEKLY_SCHEDULE,
  SPORT_COLORS,
  SPORT_LABELS,
  type SportType,
  type Session,
} from "@/content/schedule";

const ALL_SPORTS = Object.keys(SPORT_LABELS) as SportType[];

function SessionCard({ session }: { session: Session }) {
  const colors = SPORT_COLORS[session.sport];
  return (
    <div
      className={cn(
        "rounded-xl border p-3.5 transition-all hover:shadow-md cursor-default",
        colors.bg,
        colors.border
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1">
          <p className={cn("font-semibold text-sm leading-tight", colors.text)}>
            {session.activity}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            <span className="text-xs text-neutral-500">
              {session.time} – {session.endTime}
            </span>
          </div>
          {session.level && (
            <span className="inline-block mt-1.5 text-[11px] font-medium text-neutral-500 bg-white/70 px-2 py-0.5 rounded-full">
              {session.level}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScheduleCalendar() {
  const [activeDay, setActiveDay] = useState(() => {
    const today = new Date().getDay();
    // getDay: 0=Sun, 1=Mon... map to our array (0=Mon)
    const mapped = today === 0 ? 6 : today - 1;
    return mapped;
  });
  const [activeSport, setActiveSport] = useState<SportType | "all">("all");

  const filteredSchedule = WEEKLY_SCHEDULE.map((day) => ({
    ...day,
    sessions:
      activeSport === "all"
        ? day.sessions
        : day.sessions.filter((s) => s.sport === activeSport),
  }));

  return (
    <div>
      {/* Sport Filter Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-neutral-400" />
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Filter by Sport
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSport("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
              activeSport === "all"
                ? "bg-primary text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            All Programs
          </button>
          {ALL_SPORTS.map((sport) => {
            const colors = SPORT_COLORS[sport];
            return (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                  activeSport === sport
                    ? cn(colors.bg, colors.text, "ring-1", colors.border)
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", colors.dot)} />
                {SPORT_LABELS[sport]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Tabs — Mobile: horizontal scroll / Desktop: row */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 -mx-1 px-1 scrollbar-none">
        {WEEKLY_SCHEDULE.map((day, index) => {
          const sessionCount =
            activeSport === "all"
              ? day.sessions.length
              : day.sessions.filter((s) => s.sport === activeSport).length;
          return (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-w-[72px]",
                activeDay === index
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              <span className="font-bold">{day.shortDay}</span>
              <span
                className={cn(
                  "text-[10px] mt-0.5",
                  activeDay === index ? "text-white/70" : "text-neutral-400"
                )}
              >
                {sessionCount} {sessionCount === 1 ? "session" : "sessions"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile: Active Day Card View */}
      <div className="lg:hidden">
        <div className="space-y-2.5">
          {filteredSchedule[activeDay].sessions.length > 0 ? (
            filteredSchedule[activeDay].sessions.map((session, i) => (
              <SessionCard key={i} session={session} />
            ))
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <p className="font-medium">No sessions for this filter</p>
              <p className="text-sm mt-1">Try selecting a different sport or day</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Full Week Grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 gap-3">
          {filteredSchedule.map((day, dayIndex) => (
            <div
              key={day.day}
              className={cn(
                "rounded-2xl border transition-all min-h-[320px]",
                activeDay === dayIndex
                  ? "border-primary/30 bg-primary/[0.02] shadow-sm"
                  : "border-neutral-200 bg-white"
              )}
            >
              {/* Day Header */}
              <div
                className={cn(
                  "px-3 py-2.5 text-center border-b rounded-t-2xl",
                  activeDay === dayIndex
                    ? "bg-primary text-white"
                    : "bg-neutral-50 text-neutral-700"
                )}
              >
                <p className="font-bold text-sm">{day.shortDay}</p>
                <p
                  className={cn(
                    "text-[10px]",
                    activeDay === dayIndex ? "text-white/70" : "text-neutral-400"
                  )}
                >
                  {day.sessions.length} sessions
                </p>
              </div>

              {/* Sessions */}
              <div className="p-2 space-y-2">
                {day.sessions.length > 0 ? (
                  day.sessions.map((session, i) => {
                    const colors = SPORT_COLORS[session.sport];
                    return (
                      <div
                        key={i}
                        className={cn(
                          "rounded-lg border p-2 text-xs transition-all hover:shadow-sm",
                          colors.bg,
                          colors.border
                        )}
                      >
                        <p className={cn("font-semibold leading-tight", colors.text)}>
                          {session.activity}
                        </p>
                        <p className="text-neutral-500 mt-0.5">
                          {session.time}
                        </p>
                        {session.level && (
                          <span className="inline-block mt-1 text-[10px] text-neutral-400 bg-white/60 px-1.5 py-0.5 rounded">
                            {session.level}
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-20 text-neutral-300 text-xs">
                    No sessions
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {ALL_SPORTS.map((sport) => (
            <div key={sport} className="flex items-center gap-1.5">
              <span className={cn("w-2.5 h-2.5 rounded-full", SPORT_COLORS[sport].dot)} />
              <span className="text-xs text-neutral-500">{SPORT_LABELS[sport]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Book CTA */}
      <div className="mt-8 text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6">
        <p className="font-display font-bold text-neutral-900 mb-1">
          Want to reserve a spot?
        </p>
        <p className="text-sm text-neutral-500 mb-4">
          Contact us to book your session, cage, or court rental.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="tel:+14105550123"
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors text-sm"
          >
            Call to Book
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/memberships"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
          >
            View Memberships
          </Link>
        </div>
      </div>
    </div>
  );
}
