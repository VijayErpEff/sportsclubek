"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ChevronRight, ChevronDown, Clock, Filter, Plus, X, Pencil, Trash2, Check, Loader2, Phone } from "lucide-react";
import {
  WEEKLY_SCHEDULE,
  SPORT_COLORS,
  SPORT_LABELS,
  type SportType,
  type Session,
  type DaySchedule,
} from "@/content/schedule";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS, getBookingUrl } from "@/lib/constants/booking";
import { useAdmin } from "@/lib/context/admin-context";

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
  time: string; // stored in 24h "HH:MM" for <input type="time">
  endTime: string; // stored in 24h "HH:MM" for <input type="time">
  sport: SportType;
  level: string;
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

const ALL_SPORTS = Object.keys(SPORT_LABELS) as SportType[];
const DAYS = WEEKLY_SCHEDULE.map((d) => d.day);

// ---------------------------------------------------------------------------
// Time Helpers
// ---------------------------------------------------------------------------

/** "9:00 AM" → "09:00" */
function to24h(time12: string): string {
  const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/** "09:00" → "9:00 AM" */
function to12h(time24: string): string {
  const parts = time24.split(":");
  if (parts.length !== 2) return "";
  const h = parseInt(parts[0], 10);
  const m = parts[1];
  const period = h >= 12 ? "PM" : "AM";
  const hours = h % 12 || 12;
  return `${hours}:${m} ${period}`;
}

/** Get current Eastern time in minutes since midnight. */
function getEasternMinutes(): number {
  const now = new Date();
  const eastern = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(now);
  const [h, m] = eastern.split(":").map(Number);
  return h * 60 + m;
}

/** Get current Eastern day as index (0=Mon, 6=Sun). */
function getEasternDayIndex(): number {
  const estDay = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
  }).format(new Date());
  const map: Record<string, number> = {
    Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
  };
  return map[estDay] ?? 0;
}

/** Check if a session is happening right now in Eastern time. */
function isSessionNow(session: Session, dayIndex: number): boolean {
  if (dayIndex !== getEasternDayIndex()) return false;
  const now = getEasternMinutes();
  const start = parseTimeForSort(session.time);
  const end = parseTimeForSort(session.endTime);
  return now >= start && now < end;
}

function NowBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-[10px] font-bold uppercase tracking-wider text-green-600">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
      </span>
      Now
    </span>
  );
}

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

async function fetchOverrides(): Promise<ScheduleOverride[]> {
  try {
    const res = await fetch("/api/schedule", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveOverrides(
  overrides: ScheduleOverride[],
  pin: string
): Promise<boolean> {
  try {
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ overrides, pin }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function applyOverrides(
  base: DaySchedule[],
  overrides: ScheduleOverride[]
): DaySchedule[] {
  return base.map((daySchedule) => {
    let sessions = [...daySchedule.sessions];

    // Apply removes (only affects base sessions)
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

    sessions.sort((a, b) => parseTimeForSort(a.time) - parseTimeForSort(b.time));

    return { ...daySchedule, sessions };
  });
}

// ---------------------------------------------------------------------------
// Session Card (non-admin)
// ---------------------------------------------------------------------------

function SessionCard({ session, isNow }: { session: Session; isNow: boolean }) {
  const colors = SPORT_COLORS[session.sport];
  const bookingUrl = getBookingUrl(session.sport);
  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block rounded-xl border p-3.5 transition-all hover:shadow-md group",
        colors.bg,
        colors.border,
        isNow && "ring-2 ring-green-500/30 shadow-[0_0_12px_-3px_rgba(34,197,94,0.2)]"
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className={cn("font-semibold text-sm leading-tight", colors.text)}>
              {session.activity}
            </p>
            {isNow && <NowBadge />}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            <span className="text-xs text-neutral-500">
              {session.time} – {session.endTime}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            {session.level ? (
              <span className="inline-block text-[11px] font-medium text-neutral-500 bg-white/70 px-2 py-0.5 rounded-full">
                {session.level}
              </span>
            ) : <span />}
            <span className="text-[11px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Book &rarr;
            </span>
          </div>
        </div>
      </div>
    </a>
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed p-3.5 transition-all hover:shadow-md relative group",
        colors.bg,
        colors.border
      )}
    >
      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {confirmDelete ? (
          <div className="flex items-center gap-1 bg-white rounded-lg shadow-md border border-red-200 px-2 py-1">
            <span className="text-[11px] text-red-600 font-medium mr-1">Delete?</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
                setConfirmDelete(false);
              }}
              className="w-6 h-6 rounded-md bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Confirm delete"
            >
              <Check className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(false);
              }}
              className="w-6 h-6 rounded-md bg-neutral-100 text-neutral-500 flex items-center justify-center hover:bg-neutral-200 transition-colors"
              aria-label="Cancel delete"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              aria-label={`Edit ${session.activity}`}
              className="w-7 h-7 rounded-lg bg-white/80 border border-neutral-200 text-neutral-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-primary hover:border-primary/30"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              aria-label={`Delete ${session.activity}`}
              className="w-7 h-7 rounded-lg bg-white/80 border border-neutral-200 text-neutral-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:text-red-500 hover:border-red-300"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
        <div className="min-w-0 flex-1 pr-16">
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
    "w-full px-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors";
  const selectCn =
    "w-full px-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-sm outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-colors";

  const isValid = form.activity.trim() !== "" && form.time !== "" && form.endTime !== "";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-6 w-full max-w-md bg-white border border-neutral-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-bold text-neutral-900">
              {form.mode === "add" ? "Add Session" : "Edit Session"}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Day */}
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
                autoFocus
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
                  type="time"
                  value={form.time}
                  onChange={(e) => onChange({ time: e.target.value })}
                  className={inputCn}
                />
              </div>
              <div>
                <label htmlFor="admin-endtime" className={labelCn}>
                  End Time
                </label>
                <input
                  id="admin-endtime"
                  type="time"
                  value={form.endTime}
                  onChange={(e) => onChange({ endTime: e.target.value })}
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
                  ? "bg-accent text-white border-accent hover:bg-accent-hover"
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
  const auth = useAdmin();

  // ---- Schedule state ----
  const [overrides, setOverrides] = useState<ScheduleOverride[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch overrides from server on mount
  useEffect(() => {
    setMounted(true);
    fetchOverrides().then((data) => {
      setOverrides(data);
      setLoading(false);
    });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const persistOverrides = useCallback(
    async (next: ScheduleOverride[]): Promise<boolean> => {
      setOverrides(next);
      setSaving(true);
      const ok = await saveOverrides(next, auth.adminPin);
      setSaving(false);
      if (!ok) {
        setToast("Failed to save — check connection");
      }
      return ok;
    },
    [auth.adminPin]
  );

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
        time: to24h(session.time),
        endTime: to24h(session.endTime),
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

  const handleSave = useCallback(async () => {
    const newSession: Session = {
      time: to12h(form.time),
      endTime: to12h(form.endTime),
      activity: form.activity.trim(),
      sport: form.sport,
      ...(form.level.trim() ? { level: form.level.trim() } : {}),
    };

    let next = [...overrides];

    if (form.mode === "edit" && form.originalKey && form.originalDay) {
      // Check if we're editing a session that was added via override
      const addIndex = next.findIndex(
        (o) =>
          o.type === "add" &&
          o.day === form.originalDay &&
          o.session &&
          sessionKey(o.session) === form.originalKey
      );

      if (addIndex !== -1) {
        // Update the existing add override
        next[addIndex] = { ...next[addIndex], day: form.day, session: newSession };
      } else {
        // Editing a base session — remove old, add new
        next.push({
          id: generateId(),
          type: "remove",
          day: form.originalDay,
          sessionKey: form.originalKey,
        });
        next.push({
          id: generateId(),
          type: "add",
          day: form.day,
          session: newSession,
        });
      }
    } else {
      // Adding new session
      next.push({
        id: generateId(),
        type: "add",
        day: form.day,
        session: newSession,
      });
    }

    const ok = await persistOverrides(next);
    closeForm();
    if (ok) {
      setToast(form.mode === "add" ? "Session added" : "Session updated");
    }
  }, [form, overrides, persistOverrides, closeForm]);

  const handleDelete = useCallback(
    async (day: string, session: Session) => {
      const key = sessionKey(session);

      // Check if this session was added via an override
      const addIndex = overrides.findIndex(
        (o) =>
          o.type === "add" &&
          o.day === day &&
          o.session &&
          sessionKey(o.session) === key
      );

      let next: ScheduleOverride[];
      if (addIndex !== -1) {
        // Remove the add override entirely
        next = overrides.filter((_, i) => i !== addIndex);
      } else {
        // Base session — add a remove override
        next = [
          ...overrides,
          {
            id: generateId(),
            type: "remove" as const,
            day,
            sessionKey: key,
          },
        ];
      }

      const ok = await persistOverrides(next);
      if (ok) setToast("Session removed");
    },
    [overrides, persistOverrides]
  );

  const handleReset = useCallback(async () => {
    const ok = await persistOverrides([]);
    if (ok) setToast("Schedule reset to default");
  }, [persistOverrides]);

  // ---- Derived schedule ----
  const mergedSchedule = mounted
    ? applyOverrides(WEEKLY_SCHEDULE, overrides)
    : WEEKLY_SCHEDULE;

  // ---- Day / sport filter state (always Eastern time for Elkton, MD) ----
  const [activeDay, setActiveDay] = useState(() => {
    try {
      return getEasternDayIndex();
    } catch {
      const today = new Date().getDay();
      return today === 0 ? 6 : today - 1;
    }
  });
  const [activeSport, setActiveSport] = useState<SportType | "all">("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

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
      {/* Toast / saving indicator */}
      <AnimatePresence>
        {(toast || saving) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[300] bg-neutral-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 text-green-400" />
                {toast}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-neutral-400 gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Loading schedule...</span>
        </div>
      )}

      {/* Sport Filter — collapsible on mobile, always visible on desktop */}
      <div className="mb-4 lg:mb-6">
        {/* Mobile: collapsible */}
        <div className="lg:hidden">
          <button
            onClick={() => setFiltersOpen((p) => !p)}
            className="flex items-center justify-between w-full py-2 text-sm"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-700">
                {activeSport === "all" ? "All Sports" : SPORT_LABELS[activeSport]}
              </span>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-neutral-400 transition-transform", filtersOpen && "rotate-180")} />
          </button>
          {filtersOpen && (
            <div className="flex flex-wrap gap-1.5 pt-2 pb-1">
              <button
                onClick={() => { setActiveSport("all"); setFiltersOpen(false); }}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  activeSport === "all"
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-600"
                )}
              >
                All
              </button>
              {ALL_SPORTS.map((sport) => {
                const colors = SPORT_COLORS[sport];
                return (
                  <button
                    key={sport}
                    onClick={() => { setActiveSport(sport); setFiltersOpen(false); }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1",
                      activeSport === sport
                        ? cn(colors.bg, colors.text, "ring-1", colors.border)
                        : "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                    {SPORT_LABELS[sport]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
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
      </div>

      {/* Day Tabs — fits all 7 days without scrolling */}
      <div className="grid grid-cols-7 gap-1 mb-4">
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
                "flex flex-col items-center py-2 rounded-lg text-xs font-medium transition-all",
                activeDay === index
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
            >
              <span className="font-bold text-sm">{day.shortDay}</span>
              <span
                className={cn(
                  "text-[9px] mt-0.5",
                  activeDay === index ? "text-white/70" : "text-neutral-400"
                )}
              >
                {sessionCount}
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
                  key={`${session.sport}-${session.time}-${session.activity}`}
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
                  key={`${session.sport}-${session.time}-${session.activity}`}
                  session={session}
                  isNow={isSessionNow(session, activeDay)}
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
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-400 hover:border-accent hover:text-accent transition-colors text-sm font-medium"
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
                          key={`${session.sport}-${session.time}-${session.activity}`}
                          className={cn(
                            "rounded-lg border-2 border-dashed p-2 text-xs transition-all hover:shadow-sm relative group",
                            colors.bg,
                            colors.border
                          )}
                        >
                          {/* Action buttons */}
                          <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEditForm(day.day, session)}
                              aria-label={`Edit ${session.activity}`}
                              className="w-5 h-5 rounded bg-white/90 border border-neutral-200 text-neutral-400 flex items-center justify-center hover:text-primary hover:border-primary/30 transition-colors"
                            >
                              <Pencil className="h-2.5 w-2.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(day.day, session)}
                              aria-label={`Delete ${session.activity}`}
                              className="w-5 h-5 rounded bg-white/90 border border-neutral-200 text-neutral-400 flex items-center justify-center hover:text-red-500 hover:border-red-300 transition-colors"
                            >
                              <Trash2 className="h-2.5 w-2.5" />
                            </button>
                          </div>

                          <p className={cn("font-semibold leading-tight pr-12", colors.text)}>
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

                    const nowActive = isSessionNow(session, dayIndex);
                    return (
                      <a
                        key={`${session.sport}-${session.time}-${session.activity}`}
                        href={getBookingUrl(session.sport)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "block rounded-lg border p-2 text-xs transition-all hover:shadow-sm group",
                          colors.bg,
                          colors.border,
                          nowActive && "ring-2 ring-green-500/30"
                        )}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <p className={cn("font-semibold leading-tight", colors.text)}>
                            {session.activity}
                          </p>
                          {nowActive && (
                            <span className="flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-green-500 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-500 mt-0.5">
                          {session.time}
                        </p>
                        {session.level && (
                          <span className="inline-block mt-1 text-[10px] text-neutral-400 bg-white/60 px-1.5 py-0.5 rounded">
                            {session.level}
                          </span>
                        )}
                        <span className="block mt-1 text-[10px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          Book &rarr;
                        </span>
                      </a>
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

      {/* Book CTA — desktop only (mobile uses sticky bar) */}
      <div className="hidden lg:block mt-8 text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6">
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

      {/* Mobile sticky Call to Book bar */}
      <div className="fixed bottom-14 inset-x-0 z-40 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-3 flex gap-2">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-bold text-sm rounded-xl shadow-lg shadow-accent/25"
          >
            <Phone className="h-4 w-4" />
            Call to Book
          </a>
          <a
            href={BOOKING_URLS.offerings}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
          >
            Book Online
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
