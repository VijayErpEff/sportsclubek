"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Trophy, Lock, X, Check } from "lucide-react";
import { useAdmin } from "@/lib/context/admin-context";
import {
  SMASH_CUP,
  POOL_MATCHES,
  POOLS,
  type PoolId,
} from "@/lib/constants/smash-cup-bracket";
import {
  computePoolStanding,
  resolveBracket,
  champion,
  emptyState,
  type StandingsState,
  type ResolvedMatch,
} from "@/lib/smash-cup-standings";

const POLL_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;
const POOL_IDS: PoolId[] = ["A", "B"];

/* ── Data access ── */
async function fetchStandings(): Promise<StandingsState | null> {
  try {
    const res = await fetch("/api/tournaments/smash-cup/standings", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || typeof data !== "object") return null;
    return { pool: {}, bracket: {}, updated: 0, ...data } as StandingsState;
  } catch {
    return null;
  }
}

async function saveStandings(state: StandingsState, pin: string): Promise<boolean> {
  try {
    const res = await fetch("/api/tournaments/smash-cup/standings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, pin }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ── Score-edit modal state ── */
interface EditTarget {
  open: boolean;
  kind: "pool" | "bracket";
  id: string;
  title: string;
  sub: string;
  nameA: string;
  nameB: string;
  a: number;
  b: number;
  done: boolean;
}

const ROUND_GROUPS: { round: ResolvedMatch["round"]; title: string }[] = [
  { round: "QF", title: "Quarterfinals" },
  { round: "SF", title: "Semifinals" },
  { round: "THIRD", title: "3rd Place" },
  { round: "FINAL", title: "Final" },
];

export function LiveBoard() {
  const admin = useAdmin();
  const adminMode = admin.adminMode;
  const reduced = useReducedMotion() ?? false;

  const [state, setState] = useState<StandingsState>(emptyState);
  const [mounted, setMounted] = useState(false);
  const [edit, setEdit] = useState<EditTarget | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Initial load
  useEffect(() => {
    fetchStandings().then((saved) => {
      if (saved) setState(saved);
      setMounted(true);
    });
  }, []);

  // Poll for live updates
  useEffect(() => {
    const id = setInterval(async () => {
      const saved = await fetchStandings();
      if (saved && saved.updated !== stateRef.current.updated) setState(saved);
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  const persist = useCallback(
    (next: StandingsState) => {
      next.updated = Date.now();
      setState({ ...next });
      saveStandings(next, admin.adminPin);
    },
    [admin.adminPin]
  );

  const openPoolEdit = useCallback(
    (matchId: string) => {
      const m = POOL_MATCHES.find((x) => x.id === matchId);
      if (!m) return;
      const score = state.pool[matchId];
      setEdit({
        open: true,
        kind: "pool",
        id: matchId,
        title: `Pool ${m.pool}`,
        sub: `${m.time} · ${m.court}`,
        nameA: POOLS[m.pool][m.i],
        nameB: POOLS[m.pool][m.j],
        a: score?.a ?? 0,
        b: score?.b ?? 0,
        done: score?.done ?? false,
      });
    },
    [state]
  );

  const openBracketEdit = useCallback(
    (rm: ResolvedMatch) => {
      if (!rm.teamA || !rm.teamB) return;
      setEdit({
        open: true,
        kind: "bracket",
        id: rm.id,
        title: rm.label,
        sub: `${rm.time} · ${rm.court}${rm.bestOf > 1 ? ` · Best of ${rm.bestOf}` : ""}`,
        nameA: rm.teamA,
        nameB: rm.teamB,
        a: rm.scoreA,
        b: rm.scoreB,
        done: rm.done,
      });
    },
    []
  );

  const saveEdit = useCallback(() => {
    if (!edit) return;
    const next: StandingsState = {
      ...state,
      pool: { ...state.pool },
      bracket: { ...state.bracket },
    };
    const score = { a: edit.a, b: edit.b, done: edit.done };
    if (edit.kind === "pool") next.pool[edit.id] = score;
    else next.bracket[edit.id] = score;
    persist(next);
    setEdit(null);
  }, [edit, state, persist]);

  const clearEdit = useCallback(() => {
    if (!edit) return;
    const next: StandingsState = {
      ...state,
      pool: { ...state.pool },
      bracket: { ...state.bracket },
    };
    if (edit.kind === "pool") delete next.pool[edit.id];
    else delete next.bracket[edit.id];
    persist(next);
    setEdit(null);
  }, [edit, state, persist]);

  const bracket = resolveBracket(state);
  const champ = champion(state);
  const updatedTime =
    mounted && state.updated
      ? new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(state.updated))
      : "—";

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-[#0F2440] text-white">
      <div className="mx-auto max-w-[1700px] px-[clamp(0.75rem,2.5vw,3rem)] py-[clamp(0.75rem,2vw,2rem)]">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-[clamp(0.75rem,1.5vw,1.5rem)]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display font-extrabold tracking-tight text-[clamp(1.75rem,4vw,3.5rem)] leading-none">
                {SMASH_CUP.name}
              </h1>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2BA84A]/40 bg-[#2BA84A]/15 px-3 py-1 text-[clamp(0.65rem,1vw,0.9rem)] font-bold uppercase tracking-widest text-[#A8E6CF]">
                <span className="relative flex h-2 w-2">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2BA84A] opacity-70" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2BA84A]" />
                </span>
                Live
              </span>
            </div>
            <p className="mt-1 text-[clamp(0.8rem,1.4vw,1.25rem)] text-white/60">
              {SMASH_CUP.subtitle} · {SMASH_CUP.date}
            </p>
          </div>
          <div className="text-right text-[clamp(0.7rem,1vw,1rem)] text-white/50">
            Updated {updatedTime} ET
            <div className="mt-1">
              {adminMode ? (
                <button
                  onClick={admin.exitAdmin}
                  className="rounded-lg border border-[#2BA84A]/40 bg-[#2BA84A]/15 px-3 py-1 font-semibold text-[#A8E6CF] hover:bg-[#2BA84A]/25"
                >
                  Exit Admin
                </button>
              ) : (
                <button
                  onClick={admin.openPinModal}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1 font-medium text-white/60 hover:bg-white/5"
                >
                  <Lock className="h-3.5 w-3.5" /> Score Entry
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Champion banner */}
        {champ && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-[clamp(0.75rem,1.5vw,1.5rem)] flex items-center justify-center gap-3 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 py-[clamp(0.5rem,1.2vw,1.25rem)]"
          >
            <Trophy className="h-[clamp(1.25rem,2.5vw,2.5rem)] w-[clamp(1.25rem,2.5vw,2.5rem)] text-amber-300" />
            <span className="font-display text-[clamp(1.1rem,2.6vw,2.5rem)] font-extrabold text-amber-200">
              {champ} — Champions!
            </span>
          </motion.div>
        )}

        {adminMode && (
          <div className="mt-3 rounded-xl border border-[#2BA84A]/30 bg-[#2BA84A]/10 px-4 py-2 text-[clamp(0.7rem,1vw,0.95rem)] font-medium text-[#A8E6CF]">
            Admin mode — tap any match to enter its score. Changes sync to every screen within 5 seconds.
          </div>
        )}

        {/* Pools */}
        <div className="mt-[clamp(0.75rem,2vw,2rem)] grid gap-[clamp(0.75rem,2vw,2rem)] lg:grid-cols-2">
          {POOL_IDS.map((pool) => (
            <PoolPanel
              key={pool}
              pool={pool}
              state={state}
              adminMode={adminMode}
              onEditMatch={openPoolEdit}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Bracket */}
        <section className="mt-[clamp(1rem,2.5vw,2.5rem)]">
          <h2 className="mb-[clamp(0.5rem,1.2vw,1.25rem)] font-display text-[clamp(1.1rem,2vw,1.75rem)] font-bold text-white/90">
            Playoff Bracket
            <span className="ml-2 text-[clamp(0.7rem,1vw,1rem)] font-normal text-white/40">
              Single elimination · seeded by pool finish
            </span>
          </h2>
          <div className="grid gap-[clamp(0.5rem,1.5vw,1.5rem)] md:grid-cols-2 xl:grid-cols-4">
            {ROUND_GROUPS.map((g) => (
              <div key={g.round}>
                <h3 className="mb-2 text-[clamp(0.65rem,0.9vw,0.85rem)] font-bold uppercase tracking-widest text-white/40">
                  {g.title}
                </h3>
                <div className="flex flex-col gap-[clamp(0.4rem,1vw,1rem)]">
                  {bracket
                    .filter((m) => m.round === g.round)
                    .map((m) => (
                      <BracketCard
                        key={m.id}
                        match={m}
                        adminMode={adminMode}
                        onEdit={openBracketEdit}
                        reduced={reduced}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-[clamp(1rem,2vw,2rem)] pb-6 text-center text-[clamp(0.6rem,0.85vw,0.8rem)] text-white/30">
          LevelUP Sports &amp; Athletics Club · Elkton, MD · levelupsports.us/smash-cup/live
        </footer>
      </div>

      {/* Score modal */}
      <AnimatePresence>
        {edit?.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[210] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setEdit(null)}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1B3A5C] p-6 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{edit.title}</h3>
                <button onClick={() => setEdit(null)} className="text-white/40 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-5 text-sm text-white/50">{edit.sub}</p>

              <div className="grid grid-cols-[1fr_auto] items-center gap-3">
                <span className="truncate text-sm font-semibold">{edit.nameA}</span>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={edit.a}
                  onChange={(e) => setEdit((p) => p && { ...p, a: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-20 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-center text-lg font-bold outline-none focus:border-[#2BA84A]/60 focus:ring-2 focus:ring-[#2BA84A]/30"
                />
                <span className="truncate text-sm font-semibold">{edit.nameB}</span>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={edit.b}
                  onChange={(e) => setEdit((p) => p && { ...p, b: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-20 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-center text-lg font-bold outline-none focus:border-[#2BA84A]/60 focus:ring-2 focus:ring-[#2BA84A]/30"
                />
              </div>

              <label className="mt-5 flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={edit.done}
                  onChange={(e) => setEdit((p) => p && { ...p, done: e.target.checked })}
                  className="h-4 w-4 accent-[#2BA84A]"
                />
                Mark as final (counts toward standings &amp; advances the bracket)
              </label>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={clearEdit}
                  className="flex-1 rounded-xl border border-red-400/30 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                >
                  Clear
                </button>
                <button
                  onClick={() => setEdit(null)}
                  className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1B7D3A] py-2.5 text-sm font-semibold text-white hover:bg-[#15662F]"
                >
                  <Check className="h-4 w-4" /> Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Pool panel: standings table + match list ── */
function PoolPanel({
  pool,
  state,
  adminMode,
  onEditMatch,
  reduced,
}: {
  pool: PoolId;
  state: StandingsState;
  adminMode: boolean;
  onEditMatch: (id: string) => void;
  reduced: boolean;
}) {
  const rows = computePoolStanding(pool, state);
  const matches = POOL_MATCHES.filter((m) => m.pool === pool);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-[clamp(0.75rem,1.5vw,1.5rem)]"
    >
      <h2 className="mb-3 font-display text-[clamp(1.1rem,2vw,1.75rem)] font-bold">
        Pool {pool}
      </h2>

      <table className="w-full border-collapse text-[clamp(0.8rem,1.3vw,1.15rem)]">
        <thead>
          <tr className="text-left text-[clamp(0.6rem,0.85vw,0.8rem)] uppercase tracking-wider text-white/40">
            <th className="py-1 pr-2 font-semibold">#</th>
            <th className="py-1 font-semibold">Team</th>
            <th className="py-1 px-2 text-center font-semibold">W</th>
            <th className="py-1 px-2 text-center font-semibold">L</th>
            <th className="py-1 pl-2 text-right font-semibold">Diff</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const seedSpot = r.rank <= 4; // all 4 advance, top finish = better seed
            return (
              <tr
                key={r.team}
                className={cn(
                  "border-t border-white/5",
                  r.rank === 1 && "bg-[#2BA84A]/10"
                )}
              >
                <td className="py-2 pr-2">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-md text-[clamp(0.65rem,1vw,0.9rem)] font-bold",
                      r.rank === 1
                        ? "bg-[#2BA84A] text-white"
                        : seedSpot
                          ? "bg-white/10 text-white/80"
                          : "text-white/50"
                    )}
                  >
                    {r.rank}
                  </span>
                </td>
                <td className="py-2 font-semibold">{r.team}</td>
                <td className="py-2 px-2 text-center tabular-nums">{r.w}</td>
                <td className="py-2 px-2 text-center tabular-nums text-white/60">{r.l}</td>
                <td
                  className={cn(
                    "py-2 pl-2 text-right tabular-nums font-medium",
                    r.diff > 0 ? "text-[#A8E6CF]" : r.diff < 0 ? "text-red-300" : "text-white/50"
                  )}
                >
                  {r.diff > 0 ? `+${r.diff}` : r.diff}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Match list */}
      <div className="mt-4 space-y-1.5">
        {matches.map((m) => {
          const s = state.pool[m.id];
          const teamA = POOLS[m.pool][m.i];
          const teamB = POOLS[m.pool][m.j];
          const aWon = s?.done && s.a >= s.b;
          const bWon = s?.done && s.b > s.a;
          return (
            <button
              key={m.id}
              onClick={() => adminMode && onEditMatch(m.id)}
              disabled={!adminMode}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[clamp(0.7rem,1.1vw,0.95rem)]",
                adminMode ? "cursor-pointer hover:bg-white/10" : "cursor-default",
                s?.done ? "bg-white/[0.03]" : "bg-transparent"
              )}
            >
              <span className="w-12 shrink-0 text-white/40">{m.time}</span>
              <span className={cn("flex-1 truncate", aWon && "font-bold text-[#A8E6CF]")}>{teamA}</span>
              <span className="shrink-0 tabular-nums text-white/80">
                {s?.done ? `${s.a}–${s.b}` : "vs"}
              </span>
              <span className={cn("flex-1 truncate text-right", bWon && "font-bold text-[#A8E6CF]")}>{teamB}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Bracket match card ── */
function BracketCard({
  match,
  adminMode,
  onEdit,
  reduced,
}: {
  match: ResolvedMatch;
  adminMode: boolean;
  onEdit: (m: ResolvedMatch) => void;
  reduced: boolean;
}) {
  const ready = Boolean(match.teamA && match.teamB);
  const tappable = adminMode && ready;

  const Side = ({ name, score, won }: { name: string | null; score: number; won: boolean }) => (
    <div
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-2 text-[clamp(0.75rem,1.1vw,1rem)]",
        won && "bg-[#2BA84A]/15"
      )}
    >
      <span className={cn("truncate", won ? "font-bold text-[#A8E6CF]" : name ? "text-white/90" : "italic text-white/35")}>
        {name ?? "TBD"}
      </span>
      {match.done && <span className="shrink-0 tabular-nums font-bold">{score}</span>}
    </div>
  );

  return (
    <motion.button
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      onClick={() => tappable && onEdit(match)}
      disabled={!tappable}
      className={cn(
        "w-full overflow-hidden rounded-xl border text-left",
        match.round === "FINAL" ? "border-amber-400/40 bg-amber-500/[0.06]" : "border-white/10 bg-white/[0.04]",
        tappable && "cursor-pointer hover:border-[#2BA84A]/50",
        !ready && "opacity-60"
      )}
    >
      <div className="flex items-center justify-between px-3 pt-1.5 text-[clamp(0.55rem,0.8vw,0.72rem)] uppercase tracking-wider text-white/40">
        <span>{match.label}</span>
        <span>{match.time}{match.bestOf > 1 ? ` · Bo${match.bestOf}` : ""}</span>
      </div>
      <div className="mt-1 divide-y divide-white/10">
        <Side name={match.teamA} score={match.scoreA} won={match.winner !== null && match.winner === match.teamA} />
        <Side name={match.teamB} score={match.scoreB} won={match.winner !== null && match.winner === match.teamB} />
      </div>
    </motion.button>
  );
}
