// ============================================================
// BOOKING LINKS
// Everything bookable — sessions, rentals, academies, memberships,
// accounts — now runs in the LevelUP member app (see lib/constants/app.ts).
//
// Every entry below points at the internal /app smart link rather than a
// destination URL. That page opens the native app when the visitor has it
// and otherwise offers the store download or app.levelupsports.us in the
// browser, so a single funnel covers all three cases.
//
// The `c` label each link carries is GA4 attribution only. Once the app
// publishes per-program deep paths, pass them as the first argument to
// `appLink` here — no call site needs to change.
// ============================================================

import { appLink } from "./app";

export const BOOKING_URLS = {
  /** All offerings — default landing for general booking */
  offerings: appLink("/", "offerings"),

  /** Existing members signing in */
  login: appLink("/", "sign-in"),

  /** New-account registration */
  createAccount: appLink("/", "create-account"),

  /** Events / sessions schedule */
  schedule: appLink("/", "schedule"),

  /** Credit passes */
  creditPasses: appLink("/", "credit-passes"),

  /** All memberships overview */
  memberships: appLink("/", "memberships"),

  /** Spring Offer - Game Pass ($10/month, 3-month commitment, OpenPlay access) */
  springOffer: appLink("/", "spring-offer"),

  /** Pickleball Golden Hour package */
  pickleballGoldenHour: appLink("/", "pickleball-golden-hour"),

  // ── Academy Enrollments ──────────────────────────────────
  kidsAgilityAcademy: appLink("/", "kids-agility-academy"),
  volleyballAcademy: appLink("/", "volleyball-academy"),
  cricketAcademy: appLink("/", "cricket-academy"),
  badmintonAcademy: appLink("/", "badminton-academy"),
  soccerAcademy: appLink("/", "soccer-academy"),

  // ── Summer Camp 2026 (LevelUP × Code Ninjas) — per-week events ──
  summerCampFullDayJul: appLink("/", "summer-camp-full-day-july"),
  summerCampHalfDayJul: appLink("/", "summer-camp-half-day-july"),
  summerCampFullDayAug: appLink("/", "summer-camp-full-day-august"),
  summerCampHalfDayAug: appLink("/", "summer-camp-half-day-august"),

  // ── Events / Drop-In / Rentals ───────────────────────────
  cricketCageRentals: appLink("/", "cricket-cage-rentals"),
  pickleballOpenPlay: appLink("/", "pickleball-open-play"),
  badmintonOpenPlay: appLink("/", "badminton-open-play"),
  baseballLittleSluggersL: appLink("/", "little-sluggers"),
  kidsAgility: appLink("/", "kids-agility"),
} as const;

/** Map sport type → booking URL. Falls back to general offerings. */
export function getBookingUrl(sport: string): string {
  const map: Record<string, string> = {
    cricket: BOOKING_URLS.cricketCageRentals,
    pickleball: BOOKING_URLS.pickleballOpenPlay,
    badminton: BOOKING_URLS.badmintonOpenPlay,
    agility: BOOKING_URLS.kidsAgility,
    rental: BOOKING_URLS.schedule,
  };
  return map[sport] ?? BOOKING_URLS.offerings;
}
