// ============================================================
// TRACKED REDIRECT LINKS
// Used by /go/[slug] to redirect flyer/QR traffic to its destination.
// GA4 captures the pageview + UTM params before redirecting.
//
// To add a new link:
//   1. Add an entry below with a slug, title, and destination URL
//   2. Use on flyers/emails as: levelupsports.us/go/your-slug
//   3. Add UTM params for tracking: ?utm_source=flyer&utm_medium=print&utm_campaign=your-campaign
// ============================================================

import { appLink } from "./app";

export interface RedirectEntry {
  /** Short slug used in the URL: /go/[slug] */
  slug: string;
  /** Human-readable title shown briefly during redirect */
  title: string;
  /** Full destination URL */
  destination: string;
}


export const REDIRECTS: RedirectEntry[] = [
  // ── Events & Tournaments ────────────────────────────────
  {
    slug: "badminton-open-house",
    title: "FREE Badminton Open House — May 2",
    destination: appLink("/", "badminton-open-house"),
  },
  {
    slug: "badminton-tournament",
    title: "LevelUP Badminton Tournament — May 30",
    destination: appLink("/", "badminton-tournament"),
  },
  {
    slug: "volleyball-tournament",
    title: "LevelUP Smash Cup — Volleyball Tournament Jun 6–7",
    destination: appLink("/", "volleyball-tournament"),
  },
  {
    slug: "soccer-open-house",
    title: "FREE Soccer Open House — May 16",
    destination: appLink("/", "soccer-open-house"),
  },
  {
    slug: "table-tennis-tournament",
    title: "Table Tennis Tournament",
    destination: appLink("/", "table-tennis-tournament"),
  },

  // ── Offerings & Programs ────────────────────────────────
  {
    slug: "offerings",
    title: "All Programs & Offerings",
    destination: appLink("/", "offerings"),
  },
  {
    // Printed flyers/QRs point here — lands on the camp page, which links
    // out to the four per-week camp sessions below.
    slug: "summer-camps",
    title: "LevelUP × Code Ninjas Summer Camp",
    destination: "/summer-camps",
  },
  {
    slug: "summer-camp-full-day-july",
    title: "Summer Camp Full Day — Jul 13–17",
    destination: appLink("/", "summer-camp-full-day-july"),
  },
  {
    slug: "summer-camp-half-day-july",
    title: "Summer Camp Half Day — Jul 13–17",
    destination: appLink("/", "summer-camp-half-day-july"),
  },
  {
    slug: "summer-camp-full-day-august",
    title: "Summer Camp Full Day — Aug 10–14",
    destination: appLink("/", "summer-camp-full-day-august"),
  },
  {
    slug: "summer-camp-half-day-august",
    title: "Summer Camp Half Day — Aug 10–14",
    destination: appLink("/", "summer-camp-half-day-august"),
  },
  {
    slug: "memberships",
    title: "Membership Plans",
    destination: appLink("/", "memberships"),
  },
  {
    slug: "spring-offer",
    title: "Spring Game Pass Offer",
    destination: appLink("/", "spring-offer"),
  },

  // ── Academies ───────────────────────────────────────────
  {
    slug: "kids-agility-academy",
    title: "Kids Agility Academy",
    destination: appLink("/", "kids-agility-academy"),
  },
  {
    slug: "volleyball-academy",
    title: "Volleyball Academy",
    destination: appLink("/", "volleyball-academy"),
  },
  {
    slug: "cricket-academy",
    title: "Cricket Academy",
    destination: appLink("/", "cricket-academy"),
  },
  {
    slug: "badminton-academy",
    title: "Badminton Academy",
    destination: appLink("/", "badminton-academy"),
  },

  // ── Drop-In & Rentals ──────────────────────────────────
  {
    slug: "cricket-cage-rentals",
    title: "Cricket Cage Rentals",
    destination: appLink("/", "cricket-cage-rentals"),
  },
  {
    slug: "pickleball-open-play",
    title: "Pickleball Open Play",
    destination: appLink("/", "pickleball-open-play"),
  },
  {
    slug: "badminton-open-play",
    title: "Badminton Open Play",
    destination: appLink("/", "badminton-open-play"),
  },
  {
    slug: "little-sluggers",
    title: "Little Sluggers Baseball",
    destination: appLink("/", "little-sluggers"),
  },
  {
    slug: "kids-agility",
    title: "Kids Agility Program",
    destination: appLink("/", "kids-agility"),
  },
  {
    slug: "pickleball-golden-hour",
    title: "Pickleball Golden Hour",
    destination: appLink("/", "pickleball-golden-hour"),
  },
];

/** Look up a redirect by slug. Returns undefined if not found. */
export function getRedirect(slug: string): RedirectEntry | undefined {
  return REDIRECTS.find((r) => r.slug === slug);
}
