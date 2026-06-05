// ---------------------------------------------------------------------------
// LevelUP Smash Cup — pure standings + bracket resolution.
// No I/O here: feed it the stored StandingsState and it returns everything the
// board needs to render. Kept side-effect-free so it's unit-testable.
// ---------------------------------------------------------------------------

import {
  POOLS,
  POOL_MATCHES,
  BRACKET,
  type PoolId,
  type Slot,
} from "@/lib/constants/smash-cup-bracket";

/** One match score. `done` flips a match from scheduled to final. */
export interface MatchScore {
  a: number;
  b: number;
  done: boolean;
}

/** Dynamic tournament state persisted in Redis. */
export interface StandingsState {
  pool: Record<string, MatchScore>; // keyed by POOL_MATCHES id
  bracket: Record<string, MatchScore>; // keyed by BRACKET id
  manualSeeds?: Partial<Record<PoolId, string[]>>; // staff override of pool order
  /** Admin override of who plays in a bracket match (overrides auto-seed). */
  manualBracket?: Record<string, { teamA?: string | null; teamB?: string | null }>;
  /** Ids of matches currently being played (up to one per court). */
  live?: string[];
  updated: number;
}

export function emptyState(): StandingsState {
  return { pool: {}, bracket: {}, updated: 0 };
}

export interface StandingRow {
  team: string;
  played: number;
  w: number;
  l: number;
  pf: number; // points for
  pa: number; // points against
  diff: number;
  rank: number; // 1-based seed within pool
}

/**
 * Rank a pool from its match results.
 * Tiebreakers, in order: wins → point differential → points for → head-to-head.
 */
export function computePoolStanding(
  pool: PoolId,
  state: StandingsState
): StandingRow[] {
  const teams = POOLS[pool];
  const rows = teams.map((team) => ({
    team,
    played: 0,
    w: 0,
    l: 0,
    pf: 0,
    pa: 0,
    diff: 0,
    rank: 0,
  }));

  const matches = POOL_MATCHES.filter((m) => m.pool === pool);
  // Track head-to-head winners: h2h[winnerIdx] holds the set of beaten idxs.
  const h2hWins: Record<number, Set<number>> = {};

  for (const m of matches) {
    const score = state.pool[m.id];
    if (!score || !score.done) continue;
    const ri = rows[m.i];
    const rj = rows[m.j];
    ri.played++;
    rj.played++;
    ri.pf += score.a;
    ri.pa += score.b;
    rj.pf += score.b;
    rj.pa += score.a;
    if (score.a >= score.b) {
      ri.w++;
      rj.l++;
      (h2hWins[m.i] ??= new Set()).add(m.j);
    } else {
      rj.w++;
      ri.l++;
      (h2hWins[m.j] ??= new Set()).add(m.i);
    }
  }

  for (const r of rows) r.diff = r.pf - r.pa;

  const indexOf = (team: string) => teams.indexOf(team);

  const ranked = [...rows].sort((x, y) => {
    if (y.w !== x.w) return y.w - x.w;
    if (y.diff !== x.diff) return y.diff - x.diff;
    if (y.pf !== x.pf) return y.pf - x.pf;
    // Head-to-head between exactly these two
    const xi = indexOf(x.team);
    const yi = indexOf(y.team);
    if (h2hWins[xi]?.has(yi)) return -1;
    if (h2hWins[yi]?.has(xi)) return 1;
    return 0;
  });

  // Manual override wins if present and complete.
  const override = state.manualSeeds?.[pool];
  if (override && override.length === teams.length) {
    const byTeam = new Map(rows.map((r) => [r.team, r]));
    const out = override
      .map((t) => byTeam.get(t))
      .filter((r): r is StandingRow => Boolean(r));
    if (out.length === teams.length) {
      out.forEach((r, idx) => (r.rank = idx + 1));
      return out;
    }
  }

  ranked.forEach((r, idx) => (r.rank = idx + 1));
  return ranked;
}

/** True once every pool match is final — seeds are then locked in. */
export function poolsComplete(state: StandingsState): boolean {
  return POOL_MATCHES.every((m) => state.pool[m.id]?.done);
}

/** Map of seed code ("A1".."B4") → team name, or null until pools finish. */
export function seedMap(state: StandingsState): Record<string, string | null> {
  const map: Record<string, string | null> = {};
  const ready = poolsComplete(state) || Boolean(state.manualSeeds);
  for (const pool of ["A", "B"] as PoolId[]) {
    const rows = computePoolStanding(pool, state);
    const complete = ready || Boolean(state.manualSeeds?.[pool]);
    rows.forEach((r) => {
      map[`${pool}${r.rank}`] = complete ? r.team : null;
    });
  }
  return map;
}

export interface ResolvedMatch {
  id: string;
  round: string;
  label: string;
  court: string;
  time: string;
  bestOf: number;
  teamA: string | null;
  teamB: string | null;
  scoreA: number;
  scoreB: number;
  started: boolean; // a score has been entered (may be in-progress)
  done: boolean;
  winner: string | null;
  loser: string | null;
}

/**
 * Resolve the full bracket: fill team names from seeds, then propagate
 * winners/losers through QF → SF → Final / 3rd-place as results come in.
 */
export function resolveBracket(state: StandingsState): ResolvedMatch[] {
  const seeds = seedMap(state);
  const resolved: Record<string, ResolvedMatch> = {};
  const out: ResolvedMatch[] = [];

  const slotTeam = (slot: Slot): string | null => {
    if ("seed" in slot) return seeds[slot.seed] ?? null;
    const src = resolved["winnerOf" in slot ? slot.winnerOf : slot.loserOf];
    if (!src) return null;
    return "winnerOf" in slot ? src.winner : src.loser;
  };

  for (const m of BRACKET) {
    const override = state.manualBracket?.[m.id];
    const teamA =
      override?.teamA !== undefined && override.teamA !== null
        ? override.teamA
        : slotTeam(m.a);
    const teamB =
      override?.teamB !== undefined && override.teamB !== null
        ? override.teamB
        : slotTeam(m.b);
    const score = state.bracket[m.id];
    const done = Boolean(score?.done) && teamA !== null && teamB !== null;
    let winner: string | null = null;
    let loser: string | null = null;
    if (done && score) {
      const aWon = score.a >= score.b;
      winner = aWon ? teamA : teamB;
      loser = aWon ? teamB : teamA;
    }
    const rm: ResolvedMatch = {
      id: m.id,
      round: m.round,
      label: m.label,
      court: m.court,
      time: m.time,
      bestOf: m.bestOf,
      teamA,
      teamB,
      scoreA: score?.a ?? 0,
      scoreB: score?.b ?? 0,
      started: Boolean(score),
      done,
      winner,
      loser,
    };
    resolved[m.id] = rm;
    out.push(rm);
  }

  return out;
}

/** The tournament champion, once the final is decided. */
export function champion(state: StandingsState): string | null {
  return resolveBracket(state).find((m) => m.id === "FINAL")?.winner ?? null;
}
