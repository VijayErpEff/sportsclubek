// ============================================================
// TOURNAMENTS — one config per event the site takes registrations for.
// Client-safe: no secrets here. The app-side tournament id lives in
// lib/levelup-app.ts (server only). Add a tournament here, give it an
// event page + register pages, and the shared registration components
// and API routes pick it up by slug.
// ============================================================

export type TournamentSlug = "smash-cup" | "lpcl" | "thanksgiving-cricket";

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
  /** Entry fee in USD, or null when the app sets it (shown at checkout). */
  fee: number | null;
  /** What `fee` is charged per. Defaults to "team". */
  feePer?: "team" | "player";
  /** Roster rules. maxPlayers counts the captain, as the app does. minAge 0 = no age limit. */
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
    minPlayers: 8,
    maxPlayers: 16,
    minAge: 16,
    eligibility: "Open to all cricket teams, ages 16+. Enter your club, office, or friends-and-family side.",
  },
  "thanksgiving-cricket": {
    slug: "thanksgiving-cricket",
    name: "LevelUP Thanksgiving Indoor Cricket Tournament 2026",
    shortName: "Thanksgiving Cricket",
    sport: "Cricket",
    dateLabel: "Thu–Fri, Nov 26–27, 2026",
    eventHref: "/events/thanksgiving-cricket",
    registerHref: "/register/thanksgiving-cricket",
    apiBase: "/api/tournaments/thanksgiving-cricket",
    // Mirrors app tournament 3: $20 entry per player, teams of 8–10, no age limit.
    fee: 20,
    feePer: "player",
    minPlayers: 8,
    maxPlayers: 10,
    minAge: 0,
    eligibility: "Open to all players. Bring your own team of 8–10, or sign up solo and join a mix-and-match team.",
  },
};

export function isTournamentSlug(value: string): value is TournamentSlug {
  return value in TOURNAMENTS;
}

/** "$250", or "the team fee" when the app works out the total (per-player or app-set fees). */
export function feeLabel(t: TournamentConfig): string {
  return t.fee !== null && t.feePer !== "player" ? `$${t.fee}` : "the team fee";
}

/** One line on what entry costs, for the payment step. */
export function feeSummary(t: TournamentConfig): string {
  if (t.fee === null) return "The team fee is shown at checkout.";
  if (t.feePer === "player") return `$${t.fee} per player, so the team total depends on your roster (shown at checkout).`;
  return `$${t.fee} per team.`;
}
