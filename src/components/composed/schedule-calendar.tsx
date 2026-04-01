"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ChevronRight, Clock, Filter, Plus, X, Pencil } from "lucide-react";
import {
  WEEKLY_SCHEDULE,
  SPORT_COLORS,
  SPORT_LABELS,
  type SportType,
  type Session,
  type DaySchedule,
} from "@/content/schedule";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { useAdminAuth } from "@/lib/hooks/use-admin-auth";
import { PinModal } from "@/components/ui/pin-modal";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScheduleOverride {
  id: string;
  type: "add" | "remove";
  day: string;
  sessionKey?: string; // for remove: `${sport}-${time}`
  session?: Session; // for add: the full session data
}

interface FormState {
  open: boolean;
  mode: "add" | "edit";
  day: string;
  activity: string;
  time: string;
  endTime: string;
  sport: SportType;
  level: string;
  /** When editing, the key of the original session so we can remove it */
  originalKey?: string;
  originalDay?: string;
}

const EMPTY_FORM: FormState = {
  open: false,
  mode: "add",
  day: "Monday",
  activity: "",
  time: "",
  endTime: "",
  sport: "baseball",
  level: "",
};

const STORAGE_KEY = "levelup_schedule_overrides";
const ALL_SPORTS = Object.keys(SPORT_LABELS) as SportType[];
const DAYS = WEEKLY_SCHEDULE.map((d) => d.day);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sessionKey(session: Session): string {
  return `${session.sport}-${session.time}`;
}

/** Rough time parse so we can sort by start time. */
function parseTimeForSort(t: string): number {
  const match = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function loadOverrides(): ScheduleOverride[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ScheduleOverride[];
  } catch {
    return [];
  }
}

function saveOverrides(overrides: ScheduleOverride[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function applyOverrides(
  base: DaySchedule[],
  overrides: ScheduleOverride[]
): DaySchedule[] {
  return base.map((daySchedule) => {
    // Start with original sessions for this day
    let sessions = [...daySchedule.sessions];

    // Apply removes
    const removes = overrides.filter(
      (o) => o.type === "remove" && o.day === daySchedule.day
    );
    for (const r of removes) {
      sessions = sessions.filter((s) => sessionKey(s) !== r.sessionKey);
    }

    // Apply adds
    const adds = overrides.filter(
      (o) => o.type === "add" && o.day === daySchedule.day && o.session
    );
    for (const a of adds) {
      if (a.session) {
        sessions.push(a.session);
      }
    }

    // Sort by time
    sessions.sort((a, b) => parseTimeForSort(a.time) - parseTimeForSort(b.time));

    return { ...daySchedule, sessions };
  });
}

// ---------------------------------------------------------------------------
// Session Card (non-admin)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Admin Session Card
// ---------------------------------------------------------------------------

function AdminSessionCard({
  session,
  onEdit,
  onDelete,
}: {
  session: Session;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const colors = SPORT_COLORS[session.sport];
  return (
    <div
      onClick={onEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onEdit();
        }
      }}
      className={cn(
        "rounded-xl border-2 border-dashed p-3.5 transition-all hover:shadow-md cursor-pointer relative group",
        colors.bg,
        colors.border
      )}
    >
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label={`Delete ${session.activity}`}
        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
      >
        <X className="h-3 w-3" />
      </button>

      <div className="flex items-start gap-2.5">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className={cn("font-semibold text-sm leading-tight", colors.text)}>
              {session.activity}
            </p>
            <Pencil className="h-3 w-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
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

// ---------------------------------------------------------------------------
// Admin Form Modal
// ---------------------------------------------------------------------------

function AdminFormModal({
  form,
  onClose,
  onSave,
  onChange,
}: {
  form: FormState;
  onClose: () => void;
  onSave: () => void;
  onChange: (patch: Partial<FormState>) => void;
}) {
  if (!form.open) return null;

  const labelCn = "block text-sm font-medium text-neutral-700 mb-1";
  const inputCn =
    "w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors";
  const selectCn =
    "w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors";

  const isValid = form.activity.trim() !== "" && form.time.trim() !== "" && form.endTime.trim() !== "";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-6 w-[92%] max-w-md bg-white border border-neutral-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-display text-lg font-bold text-neutral-900 mb-5">
            {form.mode === "add" ? "Add Session" : "Edit Session"}
          </h3>

          <div className="space-y-4">
            {/* Day (only for new sessions) */}
            {form.mode === "add" && (
              <div>
                <label htmlFor="admin-day" className={labelCn}>
                  Day
                </label>
                <select
                  id="admin-day"
                  value={form.day}
                  onChange={(e) => onChange({ day: e.target.value })}
                  className={selectCn}
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Activity */}
            <div>
              <label htmlFor="admin-activity" className={labelCn}>
                Activity
              </label>
              <input
                id="admin-activity"
                type="text"
                value={form.activity}
                onChange={(e) => onChange({ activity: e.target.value })}
                placeholder="e.g. Baseball Academy"
                className={inputCn}
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="admin-time" className={labelCn}>
                  Start Time
                </label>
                <input
                  id="admin-time"
                  type="text"
                  value={form.time}
                  onChange={(e) => onChange({ time: e.target.value })}
                  placeholder="9:00 AM"
                  className={inputCn}
                />
              </div>
              <div>
                <label htmlFor="admin-endtime" className={labelCn}>
                  End Time
                </label>
                <input
                  id="admin-endtime"
                  type="text"
                  value={form.endTime}
                  onChange={(e) => onChange({ endTime: e.target.value })}
                  placeholder="11:00 AM"
                  className={inputCn}
                />
              </div>
            </div>

            {/* Sport */}
            <div>
              <label htmlFor="admin-sport" className={labelCn}>
                Sport
              </label>
              <select
                id="admin-sport"
                value={form.sport}
                onChange={(e) => onChange({ sport: e.target.value as SportType })}
                className={selectCn}
              >
                {ALL_SPORTS.map((sport) => (
                  <option key={sport} value={sport}>
                    {SPORT_LABELS[sport]}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label htmlFor="admin-level" className={labelCn}>
                Level{" "}
                <span className="text-neutral-400 font-normal">(optional)</span>
              </label>
              <input
                id="admin-level"
                type="text"
                value={form.level}
                onChange={(e) => onChange({ level: e.target.value })}
                placeholder="e.g. Ages 8–12"
                className={inputCn}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!isValid}
              className={cn(
                "flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-colors",
                isValid
                  ? "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
                  : "bg-neutral-50 border-neutral-200 text-neutral-300 cursor-not-allowed"
              )}
            >
              {form.mode === "add" ? "Add Session" : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ScheduleCalendar() {
  const searchParams = useSearchParams();
  const auth = useAdminAuth();

  // ---- Schedule state ----
  const [overrides, setOverrides] = useState<ScheduleOverride[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOverrides(loadOverrides());
  }, []);

  const persistOverrides = useCallback((next: ScheduleOverride[]) => {
    setOverrides(next);
    saveOverrides(next);
  }, []);

  // ---- Form state ----
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const openAddForm = useCallback((day: string) => {
    setForm({ ...EMPTY_FORM, open: true, mode: "add", day });
  }, []);

  const openEditForm = useCallback(
    (day: string, session: Session) => {
      setForm({
        open: true,
        mode: "edit",
        day,
        activity: session.activity,
        time: session.time,
        endTime: session.endTime,
        sport: session.sport,
        level: session.level ?? "",
        originalKey: sessionKey(session),
        originalDay: day,
      });
    },
    []
  );

  const closeForm = useCallback(() => {
    setForm(EMPTY_FORM);
  }, []);

  const patchForm = useCallback((patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleSave = useCallback(() => {
    const newSession: Session = {
      time: form.time.trim(),
      endTime: form.endTime.trim(),
      activity: form.activity.trim(),
      sport: form.sport,
      ...(form.level.trim() ? { level: form.level.trim() } : {}),
    };

    let next = [...overrides];

    // If editing, remove the old session first
    if (form.mode === "edit" && form.originalKey && form.originalDay) {
      next.push({
        id: generateId(),
        type: "remove",
        day: form.originalDay,
        sessionKey: form.originalKey,
      });
    }

    // Add the new session
    const targetDay = form.mode === "edit" ? (form.originalDay ?? form.day) : form.day;
    next.push({
      id: generateId(),
      type: "add",
      day: targetDay,
      session: newSession,
    });

    persistOverrides(next);
    closeForm();
  }, [form, overrides, persistOverrides, closeForm]);

  const handleDelete = useCallback(
    (day: string, session: Session) => {
      const next = [
        ...overrides,
        {
          id: generateId(),
          type: "remove" as const,
          day,
          sessionKey: sessionKey(session),
        },
      ];
      persistOverrides(next);
    },
    [overrides, persistOverrides]
  );

  const handleReset = useCallback(() => {
    persistOverrides([]);
  }, [persistOverrides]);

  // ---- Derived schedule ----
  const mergedSchedule = mounted
    ? applyOverrides(WEEKLY_SCHEDULE, overrides)
    : WEEKLY_SCHEDULE;

  // ---- Day / sport filter state ----
  const [activeDay, setActiveDay] = useState(() => {
    const today = new Date().getDay();
    // getDay: 0=Sun, 1=Mon... map to our array (0=Mon)
    const mapped = today === 0 ? 6 : today - 1;
    return mapped;
  });
  const [activeSport, setActiveSport] = useState<SportType | "all">("all");

  const filteredSchedule = mergedSchedule.map((day) => ({
    ...day,
    sessions:
      activeSport === "all"
        ? day.sessions
        : day.sessions.filter((s) => s.sport === activeSport),
  }));

  const isAdmin = auth.adminMode;

  return (
    <div>
      {/* PIN Modal */}
      <PinModal auth={auth} variant="light" />

      {/* Admin Form Modal */}
      <AdminFormModal
        form={form}
        onClose={closeForm}
        onSave={handleSave}
        onChange={patchForm}
      />

      {/* Admin Mode Banner */}
      {isAdmin && (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Admin Mode
          </span>
          <button
            onClick={handleReset}
            className="text-xs font-medium text-neutral-500 hover:text-red-600 transition-colors underline underline-offset-2"
          >
            Reset Schedule
          </button>
          <button
            onClick={auth.exitAdmin}
            className="text-xs font-medium text-neutral-500 hover:text-primary transition-colors underline underline-offset-2"
          >
            Exit Admin
          </button>
        </div>
      )}

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
            aria-pressed={activeSport === "all"}
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
                aria-pressed={activeSport === sport}
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
        {mergedSchedule.map((day, index) => {
          const sessionCount =
            activeSport === "all"
              ? day.sessions.length
              : day.sessions.filter((s) => s.sport === activeSport).length;
          return (
            <button
              key={day.day}
              onClick={() => setActiveDay(index)}
              aria-pressed={activeDay === index}
              aria-label={`${day.day} — ${sessionCount} ${sessionCount === 1 ? "session" : "sessions"}`}
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
            filteredSchedule[activeDay].sessions.map((session) =>
              isAdmin ? (
                <AdminSessionCard
                  key={`${session.sport}-${session.time}`}
                  session={session}
                  onEdit={() =>
                    openEditForm(filteredSchedule[activeDay].day, session)
                  }
                  onDelete={() =>
                    handleDelete(filteredSchedule[activeDay].day, session)
                  }
                />
              ) : (
                <SessionCard
                  key={`${session.sport}-${session.time}`}
                  session={session}
                />
              )
            )
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <p className="font-medium">No sessions for this filter</p>
              <p className="text-sm mt-1">Try selecting a different sport or day</p>
            </div>
          )}

          {/* Admin: Add session button (mobile) */}
          {isAdmin && (
            <button
              onClick={() => openAddForm(filteredSchedule[activeDay].day)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-400 hover:border-accent hover:text-accent transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Session
            </button>
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
                  day.sessions.map((session) => {
                    const colors = SPORT_COLORS[session.sport];

                    if (isAdmin) {
                      return (
                        <div
                          key={`${session.sport}-${session.time}`}
                          role="button"
                          tabIndex={0}
                          onClick={() => openEditForm(day.day, session)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              openEditForm(day.day, session);
                            }
                          }}
                          className={cn(
                            "rounded-lg border-2 border-dashed p-2 text-xs transition-all hover:shadow-sm cursor-pointer relative group",
                            colors.bg,
                            colors.border
                          )}
                        >
                          {/* Delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(day.day, session);
                            }}
                            aria-label={`Delete ${session.activity}`}
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>

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
                    }

                    return (
                      <div
                        key={`${session.sport}-${session.time}`}
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

                {/* Admin: Add session button (desktop) */}
                {isAdmin && (
                  <button
                    onClick={() => openAddForm(day.day)}
                    aria-label={`Add session to ${day.day}`}
                    className="w-full flex items-center justify-center gap-1 py-2 rounded-lg border-2 border-dashed border-neutral-200 text-neutral-300 hover:border-accent hover:text-accent transition-colors text-xs font-medium"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
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
            href={`tel:${SITE_CONFIG.phone}`}
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors text-sm"
          >
            Call to Book
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href={BOOKING_URLS.memberships}
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
          >
            View Memberships
          </Link>
        </div>
      </div>
    </div>
  );
}
