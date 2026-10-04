// ============================================================
// EVENTS — everything listed on /events. Add new events here; the page
// sorts them into Upcoming / Recurring / Past by date automatically.
// ============================================================

export type EventKind = "Tournament" | "League" | "Open House" | "Camp" | "Open Play";

export interface ClubEvent {
  slug: string;
  name: string;
  kind: EventKind;
  sport: string;
  /** Human date line, e.g. "Saturday, October 24, 2026 · 11 AM" */
  dateLabel: string;
  /** ISO start; drives upcoming/past sorting. Omit for recurring events. */
  startISO?: string;
  /** ISO end; the event stays "upcoming" until this passes. Defaults to startISO + 1 day. */
  endISO?: string;
  /** Recurring events never expire; shown in their own section. */
  recurring?: string;
  blurb: string;
  price?: string;
  prize?: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
  /** Where a past event's page now hosts something else, link here instead. */
  pastHref?: string;
  pastCta?: string;
}

export const EVENTS: ClubEvent[] = [
  {
    slug: "smash-cup-fall-2026",
    name: "LevelUP Smash Cup — Fall 2026",
    kind: "Tournament",
    sport: "Volleyball",
    dateLabel: "Saturday, October 24, 2026 · 11 AM onwards",
    startISO: "2026-10-24T11:00:00-04:00",
    endISO: "2026-10-24T22:00:00-04:00",
    blurb:
      "One-day 6v6 indoor volleyball tournament. Co-ed, ages 16+, up to 8 players per team. Pool play from 11 AM, single-elimination playoffs, cash prizes and trophies.",
    price: "$250 / team",
    prize: "Cash prizes",
    image: "/images/Content/volleyball-smash-cup-fall-2026.jpg",
    imageAlt: "LevelUP Volleyball Tournament flyer — Saturday, October 24, 2026",
    href: "/events/volleyball-tournament",
    cta: "Register your team",
    pastHref: "/smash-cup/live",
    pastCta: "Final standings",
  },
  {
    slug: "lpcl-kickoff-2026",
    name: "LPCL Kick Off — Premier Cricket League",
    kind: "League",
    sport: "Cricket",
    dateLabel: "Friday, November 6, 2026 · 5 PM onwards",
    startISO: "2026-11-06T17:00:00-05:00",
    endISO: "2026-11-06T23:00:00-05:00",
    blurb:
      "Opening night of the LevelUP Premier Cricket League. Indoor cricket under the lights, squads of 8–16, trophies for winners and runners-up.",
    price: "$850 / team",
    prize: "$1,000 winners · $500 runners-up",
    image: "/images/Content/lpcl-kickoff-flyer.jpg",
    imageAlt: "LPCL Kick Off flyer — LevelUP Premier Cricket League, Friday, November 6",
    href: "/events/cricket-league",
    cta: "Register your team",
  },
  {
    slug: "pickleball-tuesdays",
    name: "$5 Pickleball Tuesdays",
    kind: "Open Play",
    sport: "Pickleball",
    dateLabel: "Every Tuesday · 5–10 PM",
    recurring: "Weekly",
    blurb:
      "Indoor pickleball open play every Tuesday night for $5 per person. Paddles and balls provided. Bring your friends — everyone is welcome.",
    price: "$5 / person",
    image: "/images/offers/pickleball-tuesdays.jpg",
    imageAlt: "$5 Pickleball Tuesdays flyer — every Tuesday 5 to 10 PM",
    href: "/offers",
    cta: "See the offer",
  },
  {
    slug: "summer-camp-2026",
    name: "LevelUP × Code Ninjas Summer Camp",
    kind: "Camp",
    sport: "Multi-sport + Coding",
    dateLabel: "Weeks of July 13 & August 10, 2026",
    startISO: "2026-07-13T08:30:00-04:00",
    endISO: "2026-08-14T17:00:00-04:00",
    blurb:
      "Full-day and half-day camp weeks mixing sports rotations with coding and robotics, led by LevelUP coaches and Code Ninjas Senseis. Ages 5+.",
    price: "From $199 / week",
    image: "/images/sports/LevelUp/Summer Camp Code Ninjas.png",
    imageAlt: "LevelUP × Code Ninjas Summer Camp 2026 flyer",
    href: "/summer-camps",
    cta: "Camp details",
    pastCta: "See the camp recap",
  },
  {
    slug: "smash-cup-june-2026",
    name: "LevelUP Smash Cup — June 2026",
    kind: "Tournament",
    sport: "Volleyball",
    dateLabel: "June 6–7, 2026",
    startISO: "2026-06-06T09:00:00-04:00",
    endISO: "2026-06-07T19:00:00-04:00",
    blurb:
      "Our first indoor volleyball tournament: eight teams, two days of pool play and playoffs, youth and adult divisions.",
    image: "/images/Content/volleyball-smash-cup-flyer.jpg",
    imageAlt: "LevelUP Smash Cup June 2026 flyer",
    href: "/events/volleyball-tournament",
    cta: "Tournament page",
    pastHref: "/smash-cup/live",
    pastCta: "Final standings & bracket",
  },
  {
    slug: "badminton-tournament-2026",
    name: "LevelUP Badminton Tournament",
    kind: "Tournament",
    sport: "Badminton",
    dateLabel: "Saturday, May 30, 2026",
    startISO: "2026-05-30T10:00:00-04:00",
    blurb:
      "Round-robin groups into single-elimination playoffs across singles and doubles divisions.",
    image: "/images/Content/badminton-tournament-may-30.jpeg",
    imageAlt: "LevelUP Badminton Tournament flyer — May 30, 2026",
    href: "/events/badminton-tournament",
    cta: "Event page",
  },
  {
    slug: "soccer-open-house-2026",
    name: "Soccer Open House",
    kind: "Open House",
    sport: "Soccer",
    dateLabel: "Saturday, May 16, 2026",
    startISO: "2026-05-16T11:00:00-04:00",
    blurb: "Free indoor soccer sessions on our turf to launch the Soccer Academy.",
    image: "/images/sports/LevelUp/SoccerOpenHouse.jpeg",
    imageAlt: "LevelUP Soccer Open House flyer — May 16, 2026",
    href: "/events/soccer-open-house",
    cta: "Event page",
  },
  {
    slug: "badminton-open-house-2026",
    name: "Badminton Open House",
    kind: "Open House",
    sport: "Badminton",
    dateLabel: "Saturday, May 2, 2026",
    startISO: "2026-05-02T18:00:00-04:00",
    blurb: "A free evening on the courts with the Badminton Academy coaches.",
    image: "/images/Content/badminton-open-house-may-2.jpeg",
    imageAlt: "LevelUP Badminton Open House flyer — May 2, 2026",
    href: "/events/badminton-open-house",
    cta: "Event page",
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

function endOf(e: ClubEvent): number {
  if (e.endISO) return new Date(e.endISO).getTime();
  if (e.startISO) return new Date(e.startISO).getTime() + DAY_MS;
  return Number.POSITIVE_INFINITY;
}

export function splitEvents(now = Date.now()) {
  const dated = EVENTS.filter((e) => !e.recurring);
  const upcoming = dated
    .filter((e) => endOf(e) >= now)
    .sort((a, b) => new Date(a.startISO!).getTime() - new Date(b.startISO!).getTime());
  const past = dated
    .filter((e) => endOf(e) < now)
    .sort((a, b) => new Date(b.startISO!).getTime() - new Date(a.startISO!).getTime());
  const recurring = EVENTS.filter((e) => e.recurring);
  return { upcoming, recurring, past };
}
