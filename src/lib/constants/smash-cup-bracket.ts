// ---------------------------------------------------------------------------
// LevelUP Smash Cup — fixed tournament structure (single source of truth).
// Team names live only in registrations, so the pools/seeding below are the
// canonical bracket. Match SCORES are dynamic and stored in Redis; this file
// holds only the things that never change during the tournament.
// ---------------------------------------------------------------------------

export const SMASH_CUP = {
  name: "LevelUP Smash Cup",
  subtitle: "Indoor Volleyball Tournament",
  date: "June 6–7, 2026",
} as const;

export type PoolId = "A" | "B";

/** Pool rosters, ordered as entered (seeding is computed from results). */
export const POOLS: Record<PoolId, string[]> = {
  A: ["Smack that ace", "Everest Nepal", "Chapulines", "Team Satish"],
  B: ["Big Balls No Calls", "Language Barrier", "BounceTown", "Team LevelUp"],
};

/** A single round-robin pool match. `i`/`j` are indices into POOLS[pool]. */
export interface PoolMatch {
  id: string;
  pool: PoolId;
  i: number;
  j: number;
  court: string;
  time: string;
}

/** Round-robin schedule (6 per pool) — mirrors the published time grid. */
export const POOL_MATCHES: PoolMatch[] = [
  // Court 1 — Pool A
  { id: "A-12", pool: "A", i: 0, j: 1, court: "Court 1", time: "9:30" },
  { id: "A-34", pool: "A", i: 2, j: 3, court: "Court 1", time: "10:00" },
  { id: "A-13", pool: "A", i: 0, j: 2, court: "Court 1", time: "10:30" },
  { id: "A-24", pool: "A", i: 1, j: 3, court: "Court 1", time: "11:00" },
  { id: "A-14", pool: "A", i: 0, j: 3, court: "Court 1", time: "11:30" },
  { id: "A-23", pool: "A", i: 1, j: 2, court: "Court 1", time: "12:00" },
  // Court 2 — Pool B
  { id: "B-12", pool: "B", i: 0, j: 1, court: "Court 2", time: "9:30" },
  { id: "B-34", pool: "B", i: 2, j: 3, court: "Court 2", time: "10:00" },
  { id: "B-13", pool: "B", i: 0, j: 2, court: "Court 2", time: "10:30" },
  { id: "B-24", pool: "B", i: 1, j: 3, court: "Court 2", time: "11:00" },
  { id: "B-14", pool: "B", i: 0, j: 3, court: "Court 2", time: "11:30" },
  { id: "B-23", pool: "B", i: 1, j: 2, court: "Court 2", time: "12:00" },
];

/**
 * Where a bracket slot's team comes from: a pool seed (e.g. "A1"), or the
 * winner/loser of an earlier bracket match.
 */
export type Slot =
  | { seed: string }
  | { winnerOf: string }
  | { loserOf: string };

export type BracketRound = "QF" | "SF" | "THIRD" | "FINAL";

export interface BracketMatch {
  id: string;
  round: BracketRound;
  label: string;
  a: Slot;
  b: Slot;
  court: string;
  time: string;
  bestOf: number;
}

/**
 * 8-team single elimination, seeded by pool finish. Cross-pool seeding keeps
 * the two pool winners (A1, B1) in opposite halves — they can only meet in
 * the final.
 */
export const BRACKET: BracketMatch[] = [
  { id: "QF1", round: "QF", label: "Quarterfinal 1", a: { seed: "A1" }, b: { seed: "B4" }, court: "Court 1", time: "1:00", bestOf: 1 },
  { id: "QF2", round: "QF", label: "Quarterfinal 2", a: { seed: "B2" }, b: { seed: "A3" }, court: "Court 2", time: "1:00", bestOf: 1 },
  { id: "QF3", round: "QF", label: "Quarterfinal 3", a: { seed: "B1" }, b: { seed: "A4" }, court: "Court 1", time: "1:30", bestOf: 1 },
  { id: "QF4", round: "QF", label: "Quarterfinal 4", a: { seed: "A2" }, b: { seed: "B3" }, court: "Court 2", time: "1:30", bestOf: 1 },
  { id: "SF1", round: "SF", label: "Semifinal 1", a: { winnerOf: "QF1" }, b: { winnerOf: "QF2" }, court: "Court 1", time: "2:00", bestOf: 1 },
  { id: "SF2", round: "SF", label: "Semifinal 2", a: { winnerOf: "QF3" }, b: { winnerOf: "QF4" }, court: "Court 2", time: "2:00", bestOf: 1 },
  { id: "THIRD", round: "THIRD", label: "3rd-Place Game", a: { loserOf: "SF1" }, b: { loserOf: "SF2" }, court: "Court 1", time: "2:30", bestOf: 1 },
  { id: "FINAL", round: "FINAL", label: "Final", a: { winnerOf: "SF1" }, b: { winnerOf: "SF2" }, court: "Court 1", time: "3:00", bestOf: 3 },
];
