// ============================================================
// SCHEDULE CONFIGURATION
// The live schedule is edited in admin mode on /schedule and stored in
// Redis (see api/schedule/route.ts). WEEKLY_SCHEDULE below is only the
// default: it shows until the first admin save and after "Reset Schedule".
// Each session needs: time, activity, sport (for color coding),
// and optionally a level and spotsLeft.
//
// Sport options: "baseball" | "cricket" | "badminton" | "pickleball" | "volleyball" | "soccer" | "agility" | "open"
// ============================================================

import { BOOKING_URLS } from "@/lib/constants/booking";

export type SportType =
  | "baseball"
  | "cricket"
  | "badminton"
  | "pickleball"
  | "volleyball"
  | "soccer"
  | "agility"
  | "open"
  | "rental";

export interface Session {
  time: string;
  endTime: string;
  activity: string;
  sport: SportType;
  level?: string;
  spotsLeft?: number;
  /** Optional booking/registration link (usually a /app smart link) */
  bookingUrl?: string;
}

export interface DaySchedule {
  day: string;
  shortDay: string;
  sessions: Session[];
}

export const SPORT_COLORS: Record<SportType, { bg: string; text: string; dot: string; border: string }> = {
  baseball:   { bg: "bg-primary/5",    text: "text-primary-dark",  dot: "bg-primary",     border: "border-primary/15" },
  cricket:    { bg: "bg-accent/5",     text: "text-accent-hover",  dot: "bg-accent",      border: "border-accent/15" },
  badminton:  { bg: "bg-info/5",       text: "text-primary-light", dot: "bg-info",        border: "border-info/15" },
  pickleball: { bg: "bg-teal-500/10",  text: "text-teal-700",       dot: "bg-teal-500",    border: "border-teal-500/20" },
  volleyball: { bg: "bg-amber-500/10", text: "text-amber-700",     dot: "bg-amber-500",   border: "border-amber-500/20" },
  soccer:     { bg: "bg-red-500/10",   text: "text-red-700",       dot: "bg-red-500",     border: "border-red-500/20" },
  agility:    { bg: "bg-warning/10",   text: "text-neutral-700",   dot: "bg-warning",     border: "border-warning/20" },
  open:       { bg: "bg-neutral-50",   text: "text-neutral-600",   dot: "bg-neutral-400", border: "border-neutral-200" },
  rental:     { bg: "bg-violet-500/10", text: "text-violet-700",   dot: "bg-violet-500",  border: "border-violet-500/20" },
};

export const SPORT_LABELS: Record<SportType, string> = {
  baseball: "Baseball",
  cricket: "Cricket",
  badminton: "Badminton",
  pickleball: "Pickleball",
  volleyball: "Volleyball",
  soccer: "Soccer",
  agility: "Kids Agility",
  open: "Open Play",
  rental: "Rental",
};

// ============================================================
// WEEKLY SCHEDULE DATA — Edit below to update the calendar
// ============================================================

// Source: facility schedule draft of Nov 14, 2026. "Open slot" and
// unconfirmed items (Golden Pass, Strike Zone cricket flex, private bookings)
// are intentionally left off. Court counts appear in the level line.

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: "Monday",
    shortDay: "Mon",
    sessions: [
      { time: "5:00 PM",  endTime: "9:00 PM",  activity: "Badminton Open Play",         sport: "badminton",  level: "3 courts", bookingUrl: BOOKING_URLS.badmintonOpenPlay },
      { time: "5:00 PM",  endTime: "9:00 PM",  activity: "Pickleball Open Play",        sport: "pickleball", level: "3 courts", bookingUrl: BOOKING_URLS.pickleballOpenPlay },
    ],
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    sessions: [
      { time: "5:00 PM",  endTime: "10:00 PM", activity: "Pickleball Tuesdays — Open Play", sport: "pickleball", level: "6 courts · $8/person", bookingUrl: BOOKING_URLS.pickleballOpenPlay },
      { time: "5:00 PM",  endTime: "10:00 PM", activity: "Badminton Open Play",         sport: "badminton",  level: "1 court", bookingUrl: BOOKING_URLS.badmintonOpenPlay },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Soccer Training",             sport: "soccer" },
    ],
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    sessions: [
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Cricket Training",            sport: "cricket",    level: "Youth" },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Badminton Training",          sport: "badminton",  level: "1 court" },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Pickleball Training",         sport: "pickleball", level: "1 court" },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Volleyball Training",         sport: "volleyball", level: "1 court", bookingUrl: BOOKING_URLS.volleyballClinic },
      { time: "7:30 PM",  endTime: "10:30 PM", activity: "Volleyball Open Play",        sport: "volleyball", level: "All Levels" },
    ],
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    sessions: [
      { time: "6:30 PM",  endTime: "7:30 PM",  activity: "Soccer Clinic",               sport: "soccer",     bookingUrl: BOOKING_URLS.soccerClinic },
    ],
  },
  {
    day: "Friday",
    shortDay: "Fri",
    sessions: [
      { time: "8:00 AM",  endTime: "12:00 PM", activity: "Pickleball Open Play",        sport: "pickleball", level: "6 courts · $5/person", bookingUrl: BOOKING_URLS.pickleballOpenPlay },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Cricket Training",            sport: "cricket",    level: "Youth" },
      { time: "8:00 PM",  endTime: "11:00 PM", activity: "Cricket Tournament",          sport: "cricket" },
    ],
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    sessions: [
      { time: "7:00 AM",  endTime: "10:00 AM", activity: "Pickleball Open Play",        sport: "pickleball", level: "3 courts", bookingUrl: BOOKING_URLS.pickleballOpenPlay },
      { time: "7:00 AM",  endTime: "10:00 AM", activity: "Badminton Open Play",         sport: "badminton",  level: "3 courts", bookingUrl: BOOKING_URLS.badmintonOpenPlay },
      { time: "11:00 AM", endTime: "12:30 PM", activity: "Volleyball Clinic",           sport: "volleyball", bookingUrl: BOOKING_URLS.volleyballSaturdays },
      { time: "1:00 PM",  endTime: "2:30 PM",  activity: "Volleyball Clinic",           sport: "volleyball", bookingUrl: BOOKING_URLS.volleyballSaturdays },
      { time: "3:00 PM",  endTime: "6:00 PM",  activity: "Volleyball",                  sport: "volleyball", level: "All courts" },
      { time: "8:00 PM",  endTime: "11:00 PM", activity: "Cricket Tournament",          sport: "cricket" },
    ],
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    sessions: [
      { time: "7:00 AM",  endTime: "10:00 AM", activity: "Pickleball Open Play",        sport: "pickleball", level: "3 courts", bookingUrl: BOOKING_URLS.pickleballOpenPlay },
      { time: "7:00 AM",  endTime: "10:00 AM", activity: "Badminton Open Play",         sport: "badminton",  level: "3 courts", bookingUrl: BOOKING_URLS.badmintonOpenPlay },
      { time: "11:00 AM", endTime: "12:30 PM", activity: "Volleyball Clinic",           sport: "volleyball", bookingUrl: BOOKING_URLS.volleyballClinic },
      { time: "3:00 PM",  endTime: "6:00 PM",  activity: "Cricket Tournament",          sport: "cricket" },
    ],
  },
];

// ============================================================
// Validation for schedules saved from admin mode
// ============================================================

const SPORTS = new Set<string>(Object.keys(SPORT_LABELS));
const TIME_RE = /^(1[0-2]|[1-9]):[0-5]\d (AM|PM)$/;
const MAX_TEXT = 200;

function isText(v: unknown, required: boolean): boolean {
  if (v === undefined) return !required;
  return typeof v === "string" && v.length <= MAX_TEXT && (!required || v.trim().length > 0);
}

function isSession(v: unknown): v is Session {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.time === "string" && TIME_RE.test(s.time) &&
    typeof s.endTime === "string" && TIME_RE.test(s.endTime) &&
    isText(s.activity, true) &&
    typeof s.sport === "string" && SPORTS.has(s.sport) &&
    isText(s.level, false) &&
    isText(s.bookingUrl, false) &&
    (s.spotsLeft === undefined || typeof s.spotsLeft === "number")
  );
}

/** True when `v` is a full Mon–Sun schedule in the same day order as WEEKLY_SCHEDULE. */
export function isValidSchedule(v: unknown): v is DaySchedule[] {
  return (
    Array.isArray(v) &&
    v.length === WEEKLY_SCHEDULE.length &&
    v.every(
      (d, i) =>
        d && typeof d === "object" &&
        d.day === WEEKLY_SCHEDULE[i].day &&
        d.shortDay === WEEKLY_SCHEDULE[i].shortDay &&
        Array.isArray(d.sessions) && d.sessions.length <= 50 &&
        d.sessions.every(isSession)
    )
  );
}
