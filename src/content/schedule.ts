// ============================================================
// SCHEDULE CONFIGURATION
// Edit this file to update the weekly schedule.
// Each session needs: time, activity, sport (for color coding),
// and optionally a level and spotsLeft.
//
// Sport options: "baseball" | "cricket" | "badminton" | "pickleball" | "agility" | "open"
// ============================================================

export type SportType =
  | "baseball"
  | "cricket"
  | "badminton"
  | "pickleball"
  | "agility"
  | "open";

export interface Session {
  time: string;
  endTime: string;
  activity: string;
  sport: SportType;
  level?: string;
  spotsLeft?: number;
}

export interface DaySchedule {
  day: string;
  shortDay: string;
  sessions: Session[];
}

export const SPORT_COLORS: Record<SportType, { bg: string; text: string; dot: string; border: string }> = {
  baseball:   { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500",    border: "border-blue-200" },
  cricket:    { bg: "bg-green-50",   text: "text-green-700",   dot: "bg-green-500",   border: "border-green-200" },
  badminton:  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-500",  border: "border-indigo-200" },
  pickleball: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  agility:    { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500",   border: "border-amber-200" },
  open:       { bg: "bg-neutral-50", text: "text-neutral-600", dot: "bg-neutral-400",  border: "border-neutral-200" },
};

export const SPORT_LABELS: Record<SportType, string> = {
  baseball: "Baseball",
  cricket: "Cricket",
  badminton: "Badminton",
  pickleball: "Pickleball",
  agility: "Kids Agility",
  open: "Open Play",
};

// ============================================================
// WEEKLY SCHEDULE DATA — Edit below to update the calendar
// ============================================================

export const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    day: "Monday",
    shortDay: "Mon",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "3:30 PM",  endTime: "5:00 PM",  activity: "Kids Agility",                sport: "agility",   level: "Ages 5–7" },
      { time: "5:00 PM",  endTime: "7:00 PM",  activity: "Baseball Academy",             sport: "baseball",  level: "Ages 8–12" },
      { time: "7:00 PM",  endTime: "9:00 PM",  activity: "Adult Cricket Nets",           sport: "cricket",   level: "All Levels" },
    ],
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "4:00 PM",  endTime: "5:30 PM",  activity: "Badminton Academy",            sport: "badminton", level: "Beginners" },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Baseball Academy",             sport: "baseball",  level: "Ages 13–15" },
      { time: "7:30 PM",  endTime: "9:30 PM",  activity: "Open Badminton Courts",        sport: "open" },
    ],
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "3:30 PM",  endTime: "5:00 PM",  activity: "Kids Agility",                sport: "agility",   level: "Ages 8–10" },
      { time: "5:00 PM",  endTime: "7:00 PM",  activity: "Cricket Academy",              sport: "cricket",   level: "Youth" },
      { time: "7:00 PM",  endTime: "9:00 PM",  activity: "Baseball Academy",             sport: "baseball",  level: "Ages 16–18" },
    ],
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "4:00 PM",  endTime: "5:30 PM",  activity: "Badminton Academy",            sport: "badminton", level: "Intermediate" },
      { time: "5:30 PM",  endTime: "7:30 PM",  activity: "Baseball Academy",             sport: "baseball",  level: "Ages 8–12" },
      { time: "7:30 PM",  endTime: "9:30 PM",  activity: "Adult Cricket Nets",           sport: "cricket",   level: "All Levels" },
    ],
  },
  {
    day: "Friday",
    shortDay: "Fri",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "3:30 PM",  endTime: "5:00 PM",  activity: "Kids Agility",                sport: "agility",   level: "Ages 11–12" },
      { time: "5:00 PM",  endTime: "7:00 PM",  activity: "Cricket Academy",              sport: "cricket",   level: "Adult" },
      { time: "7:00 PM",  endTime: "9:00 PM",  activity: "Open Pickleball Courts",       sport: "open" },
    ],
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    sessions: [
      { time: "8:00 AM",  endTime: "10:00 AM", activity: "Baseball Academy",             sport: "baseball",  level: "Ages 13–15" },
      { time: "10:00 AM", endTime: "12:00 PM", activity: "Cricket Academy",              sport: "cricket",   level: "Youth" },
      { time: "12:00 PM", endTime: "2:00 PM",  activity: "Pickleball Open Play",         sport: "pickleball", level: "All Levels" },
      { time: "2:00 PM",  endTime: "4:00 PM",  activity: "Badminton Academy",            sport: "badminton", level: "Tournament Prep" },
      { time: "4:00 PM",  endTime: "6:00 PM",  activity: "Open Play — All Sports",       sport: "open" },
    ],
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    sessions: [
      { time: "9:00 AM",  endTime: "11:00 AM", activity: "Open Batting Cages",          sport: "open" },
      { time: "11:00 AM", endTime: "1:00 PM",  activity: "Pickleball Open Play",         sport: "pickleball", level: "All Levels" },
      { time: "1:00 PM",  endTime: "3:00 PM",  activity: "Open Badminton Courts",        sport: "open" },
      { time: "3:00 PM",  endTime: "5:00 PM",  activity: "Open Play — All Sports",       sport: "open" },
    ],
  },
];
