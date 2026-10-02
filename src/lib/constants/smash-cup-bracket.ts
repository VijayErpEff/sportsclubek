// ---------------------------------------------------------------------------
// LevelUP Smash Cup — tournament structure (single source of truth).
//
// Fall 2026 edition. Team names are not known until registration closes, so
// the pools are NOT hard-coded here: staff assign registered teams to Pool A /
// Pool B on game day (stored in Redis as `StandingsState.pools`). Everything
// below derives the round-robin schedule and the playoff bracket from those
// pools, for any pool size. Match SCORES are dynamic and stored alongside.
// ---------------------------------------------------------------------------

export const SMASH_CUP = {
  name: "LevelUP Smash Cup",
  edition: "Fall 2026",
  subtitle: "Indoor Volleyball Tournament",
  date: "October 24, 2026",
  /** First serve, 24-hour local time. Pool slots are laid out from here. */
  firstServe: { hour: 11, minute: 0 },
  /** Minutes per pool match slot (one set to 25, switch, next match). */
  poolSlotMinutes: 30,
  /** Minutes per bracket slot. */
  bracketSlotMinutes: 40,
} as const;

export type PoolId = "A" | "B";
export const POOL_IDS: PoolId[] = ["A", "B"];
export type Pools = Record<PoolId, string[]>;

export function emptyPools(): Pools {
  return { A: [], B: [] };
}

/** Top this many teams in each pool advance to the playoffs; the rest are out. */
export const ADVANCE_CUTOFF = 2;

const COURT_FOR_POOL: Record<PoolId, string> = { A: "Court 1", B: "Court 2" };

/** A single round-robin pool match. `i`/`j` are indices into pools[pool]. */
export interface PoolMatch {
  id: string;
  pool: PoolId;
  i: number;
  j: number;
  court: string;
  time: string;
}

/**
 * Where a bracket slot's team comes from: a pool seed (e.g. "A1"), or the
 * winner/loser of an earlier bracket match.
 */
export type Slot =
  | { seed: string }
  | { winnerOf: string }
  | { loserOf: string };

export type BracketRound = "SF" | "THIRD" | "FINAL";

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

// ── helpers ─────────────────────────────────────────────────────────

/** Stable, order-independent match id built from the two team names. */
export function poolMatchId(pool: PoolId, teamA: string, teamB: string): string {
  const [x, y] = [slug(teamA), slug(teamB)].sort();
  return `${pool}:${x}|${y}`;
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function clock(minutesFromMidnight: number): string {
  const h24 = Math.floor(minutesFromMidnight / 60) % 24;
  const m = minutesFromMidnight % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")}`;
}

const FIRST_SERVE_MIN = SMASH_CUP.firstServe.hour * 60 + SMASH_CUP.firstServe.minute;

/**
 * Round-robin pairings in "circle method" rounds, so a team never plays twice
 * in a row when the pool has an even count, and sits out at most one slot
 * when odd. Returns index pairs into the pool's team list.
 */
function roundRobinPairs(n: number): Array<[number, number]> {
  if (n < 2) return [];
  const ids = Array.from({ length: n }, (_, i) => i);
  if (n % 2 === 1) ids.push(-1); // bye
  const size = ids.length;
  const rounds = size - 1;
  const out: Array<[number, number]> = [];
  const rot = [...ids];
  for (let r = 0; r < rounds; r++) {
    for (let k = 0; k < size / 2; k++) {
      const a = rot[k];
      const b = rot[size - 1 - k];
      if (a !== -1 && b !== -1) out.push([Math.min(a, b), Math.max(a, b)]);
    }
    // rotate all but the first
    rot.splice(1, 0, rot.pop() as number);
  }
  return out;
}

/** Every pool match, with court and an estimated start time. */
export function buildPoolMatches(pools: Pools): PoolMatch[] {
  const out: PoolMatch[] = [];
  for (const pool of POOL_IDS) {
    const teams = pools[pool] ?? [];
    roundRobinPairs(teams.length).forEach(([i, j], idx) => {
      out.push({
        id: poolMatchId(pool, teams[i], teams[j]),
        pool,
        i,
        j,
        court: COURT_FOR_POOL[pool],
        time: clock(FIRST_SERVE_MIN + idx * SMASH_CUP.poolSlotMinutes),
      });
    });
  }
  return out;
}

/** Minutes from midnight when the last pool slot on any court ends. */
function poolPlayEndsAt(pools: Pools): number {
  const longest = Math.max(
    0,
    ...POOL_IDS.map((p) => roundRobinPairs((pools[p] ?? []).length).length)
  );
  return FIRST_SERVE_MIN + longest * SMASH_CUP.poolSlotMinutes;
}

/**
 * Playoff bracket derived from the pool layout:
 *  - two pools with 2+ teams each → cross-pool semis (A1·B2, A2·B1), 3rd, final
 *  - one pool with 4+ teams       → A1·A4, A2·A3 semis, 3rd, final
 *  - one pool with 2–3 teams      → straight final A1·A2
 *  - anything smaller             → no bracket yet
 */
export function buildBracket(pools: Pools): BracketMatch[] {
  const a = (pools.A ?? []).length;
  const b = (pools.B ?? []).length;
  const start = poolPlayEndsAt(pools) + 30; // half-hour break after pools
  const t = (slot: number) => clock(start + slot * SMASH_CUP.bracketSlotMinutes);

  const semis = (sf1: [Slot, Slot], sf2: [Slot, Slot]): BracketMatch[] => [
    { id: "SF1", round: "SF", label: "Semifinal 1", a: sf1[0], b: sf1[1], court: "Court 1", time: t(0), bestOf: 1 },
    { id: "SF2", round: "SF", label: "Semifinal 2", a: sf2[0], b: sf2[1], court: "Court 2", time: t(0), bestOf: 1 },
    { id: "THIRD", round: "THIRD", label: "3rd-Place Game", a: { loserOf: "SF1" }, b: { loserOf: "SF2" }, court: "Court 2", time: t(1), bestOf: 1 },
    { id: "FINAL", round: "FINAL", label: "Final", a: { winnerOf: "SF1" }, b: { winnerOf: "SF2" }, court: "Court 1", time: t(1), bestOf: 3 },
  ];

  if (a >= 2 && b >= 2) {
    return semis([{ seed: "A1" }, { seed: "B2" }], [{ seed: "A2" }, { seed: "B1" }]);
  }
  const only: PoolId | null = a >= 2 && b === 0 ? "A" : b >= 2 && a === 0 ? "B" : null;
  if (!only) return [];
  const n = only === "A" ? a : b;
  if (n >= 4) {
    return semis(
      [{ seed: `${only}1` }, { seed: `${only}4` }],
      [{ seed: `${only}2` }, { seed: `${only}3` }]
    );
  }
  return [
    { id: "FINAL", round: "FINAL", label: "Final", a: { seed: `${only}1` }, b: { seed: `${only}2` }, court: "Court 1", time: t(0), bestOf: 3 },
  ];
}
