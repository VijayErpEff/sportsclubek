// ============================================================
// TOURNAMENTS — one config per event the site takes registrations for.
// Client-safe: no secrets here. The app-side tournament id lives in
// lib/levelup-app.ts (server only). Add a tournament here, give it an
// event page + register pages, and the shared registration components
// and API routes pick it up by slug.
// ============================================================

export type TournamentSlug = "smash-cup" | "lpcl";

export interface TournamentConfig {
  slug: TournamentSlug;
  /** Full name used in copy and metadata. */
  name: string;
  /** Short name for breadcrumbs, badges, success screens. */
  shortName: string;
  sport: string;
  /** Human date label for badges, e.g. "Sat, Oct 24, 2026". */
  dateLabel: string;
  eventHref: string;
  registerHref: string;
  /** Base of the site API routes for this tournament, e.g. /api/tournaments/lpcl */
  apiBase: string;
  /** Team entry fee in USD, or null when the app sets it (shown at checkout). */
  fee: number | null;
  /** Roster rules. maxPlayers counts the captain, as the app does. */
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  /** One-line description of who can enter, shown on the form's first step. */
  eligibility: string;
}

export const TOURNAMENTS: Record<TournamentSlug, TournamentConfig> = {
  "smash-cup": {
    slug: "smash-cup",
    name: "LevelUP Smash Cup — Fall 2026 Volleyball Tournament",
    shortName: "Fall Smash Cup",
    sport: "Volleyball",
    dateLabel: "Sat, Oct 24, 2026",
    eventHref: "/events/volleyball-tournament",
    registerHref: "/register/volleyball-tournament",
    apiBase: "/api/tournaments/smash-cup",
    fee: 250,
    minPlayers: 4,
    maxPlayers: 8,
    minAge: 16,
    eligibility: "One open division — co-ed, ages 16+. Pick a team name your crew will answer to.",
  },
  lpcl: {
    slug: "lpcl",
    name: "LPCL Kick Off — LevelUP Premier Cricket League",
    shortName: "LPCL Kick Off",
    sport: "Cricket",
    dateLabel: "Fri, Nov 6, 2026",
    eventHref: "/events/cricket-league",
    registerHref: "/register/cricket-league",
    apiBase: "/api/tournaments/lpcl",
    fee: 850,
    minPlayers: 6,
    maxPlayers: 12,
    minAge: 16,
    eligibility: "Open to all cricket teams, ages 16+. Enter your club, office, or friends-and-family side.",
  },
};

export function isTournamentSlug(value: string): value is TournamentSlug {
  return value in TOURNAMENTS;
}

/** "$250" or "team fee" when the app decides the amount. */
export function feeLabel(t: TournamentConfig): string {
  return t.fee !== null ? `$${t.fee}` : "team fee";
}
