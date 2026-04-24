// ============================================================
// TRACKED REDIRECT LINKS
// Used by /go/[slug] to redirect to external URLs (e.g., Upper Hand events).
// GA4 captures the pageview + UTM params before redirecting.
//
// To add a new link:
//   1. Add an entry below with a slug, title, and destination URL
//   2. Use on flyers/emails as: levelupsports.us/go/your-slug
//   3. Add UTM params for tracking: ?utm_source=flyer&utm_medium=print&utm_campaign=your-campaign
// ============================================================

export interface RedirectEntry {
  /** Short slug used in the URL: /go/[slug] */
  slug: string;
  /** Human-readable title shown briefly during redirect */
  title: string;
  /** Full destination URL */
  destination: string;
}

const UH_BASE = "https://app.upperhand.io/customers/2578-levelup-sports-and-athletics-club";

export const REDIRECTS: RedirectEntry[] = [
  // ── Events & Tournaments ────────────────────────────────
  {
    slug: "table-tennis-tournament",
    title: "Table Tennis Tournament",
    destination: `${UH_BASE}/events/193175-table-tennis-tournament`,
  },

  // ── Offerings & Programs ────────────────────────────────
  {
    slug: "offerings",
    title: "All Programs & Offerings",
    destination: `${UH_BASE}/offerings`,
  },
  {
    slug: "summer-camps",
    title: "Summer Sports Camps",
    destination: `${UH_BASE}/offerings`,
  },
  {
    slug: "memberships",
    title: "Membership Plans",
    destination: `${UH_BASE}/memberships`,
  },
  {
    slug: "spring-offer",
    title: "Spring Game Pass Offer",
    destination: `${UH_BASE}/client-memberships/11431`,
  },

  // ── Academies ───────────────────────────────────────────
  {
    slug: "kids-agility-academy",
    title: "Kids Agility Academy",
    destination: `${UH_BASE}/client-memberships/11414`,
  },
  {
    slug: "volleyball-academy",
    title: "Volleyball Academy",
    destination: `${UH_BASE}/client-memberships/11415`,
  },
  {
    slug: "cricket-academy",
    title: "Cricket Academy",
    destination: `${UH_BASE}/client-memberships/11416`,
  },
  {
    slug: "badminton-academy",
    title: "Badminton Academy",
    destination: `${UH_BASE}/client-memberships/11417`,
  },

  // ── Drop-In & Rentals ──────────────────────────────────
  {
    slug: "cricket-cage-rentals",
    title: "Cricket Cage Rentals",
    destination: `${UH_BASE}/events/186578-cricket-cage-rentals`,
  },
  {
    slug: "pickleball-open-play",
    title: "Pickleball Open Play",
    destination: `${UH_BASE}/events/174223-pickle_ball-open_play-weekdays-9am-4pm`,
  },
  {
    slug: "badminton-open-play",
    title: "Badminton Open Play",
    destination: `${UH_BASE}/events/174234-badminton-member-open_play-every_day`,
  },
  {
    slug: "little-sluggers",
    title: "Little Sluggers Baseball",
    destination: `${UH_BASE}/events/181868-little-sluggers`,
  },
  {
    slug: "kids-agility",
    title: "Kids Agility Program",
    destination: `${UH_BASE}/events/187194-kids-agility-and-athleticism-program`,
  },
  {
    slug: "pickleball-golden-hour",
    title: "Pickleball Golden Hour",
    destination: `${UH_BASE}/client-memberships/11264`,
  },
];

/** Look up a redirect by slug. Returns undefined if not found. */
export function getRedirect(slug: string): RedirectEntry | undefined {
  return REDIRECTS.find((r) => r.slug === slug);
}
