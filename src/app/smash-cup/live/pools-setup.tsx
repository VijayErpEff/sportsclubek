"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { POOL_IDS, type PoolId, type Pools } from "@/lib/constants/smash-cup-bracket";

type Assignment = PoolId | "";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Staff modal: type the team names from the LevelUP app's tournament admin,
 * assign each to Pool A / Pool B (or leave it out), and save. Pool order =
 * entry order. Registrations themselves live in the app, not on this site.
 */
export function PoolsSetup({
  pools,
  reduced,
  onSave,
  onClose,
}: {
  pools: Pools;
  reduced: boolean;
  onSave: (next: Pools) => void;
  onClose: () => void;
}) {
  // Teams known to the board: anything already in a pool, plus registrations.
  const [teams, setTeams] = useState<string[]>(() => [...pools.A, ...pools.B]);
  const [assign, setAssign] = useState<Record<string, Assignment>>(() => {
    const init: Record<string, Assignment> = {};
    pools.A.forEach((t) => (init[t] = "A"));
    pools.B.forEach((t) => (init[t] = "B"));
    return init;
  });
  const [custom, setCustom] = useState("");

  const counts = useMemo(() => {
    const c: Record<PoolId, number> = { A: 0, B: 0 };
    for (const t of teams) {
      const a = assign[t];
      if (a) c[a]++;
    }
    return c;
  }, [teams, assign]);

  const addCustom = () => {
    const name = custom.trim();
    if (!name) return;
    if (teams.some((t) => t.toLowerCase() === name.toLowerCase())) {
      setCustom("");
      return;
    }
    setTeams((prev) => [...prev, name]);
    setCustom("");
  };

  const save = () => {
    const next: Pools = { A: [], B: [] };
    for (const t of teams) {
      const a = assign[t];
      if (a) next[a].push(t);
    }
    onSave(next);
  };

  const canSave = counts.A >= 2 || counts.B >= 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#1B3A5C] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="pools-setup-title"
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-3">
          <div>
            <h3 id="pools-setup-title" className="font-display text-lg font-bold">
              Teams &amp; Pools
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Add the checked-in teams from the LevelUP app, then assign each to Pool A (Court 1)
              or Pool B (Court 2). Pool order is the order below. Mark a no-show as Out.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-6 pb-3 text-xs">
          <span className="rounded-full bg-[#2BA84A]/15 px-2.5 py-1 font-bold text-[#A8E6CF]">
            Pool A · {counts.A}
          </span>
          <span className="rounded-full bg-sky-400/15 px-2.5 py-1 font-bold text-sky-200">
            Pool B · {counts.B}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          {teams.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-white/40">
              No teams yet. Add the first one below.
            </p>
          ) : (
            <ul className="divide-y divide-white/10">
              {teams.map((t) => (
                <li key={t} className="flex items-center gap-3 py-2">
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{t}</span>
                  <div className="flex gap-1" role="radiogroup" aria-label={`Pool for ${t}`}>
                    {(["", ...POOL_IDS] as Assignment[]).map((opt) => {
                      const active = (assign[t] ?? "") === opt;
                      return (
                        <button
                          key={opt || "none"}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setAssign((p) => ({ ...p, [t]: opt }))}
                          className={cn(
                            "min-h-[36px] min-w-[44px] rounded-lg border px-2.5 text-xs font-bold transition-colors",
                            active
                              ? opt === "A"
                                ? "border-[#2BA84A] bg-[#2BA84A]/20 text-[#A8E6CF]"
                                : opt === "B"
                                  ? "border-sky-400 bg-sky-400/20 text-sky-100"
                                  : "border-white/40 bg-white/10 text-white"
                              : "border-white/10 text-white/50 hover:bg-white/5"
                          )}
                        >
                          {opt === "" ? "Out" : `Pool ${opt}`}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCustom();
            }}
            className="mt-3 flex gap-2 pb-4"
          >
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Team name (as registered in the app)"
              maxLength={60}
              className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#0F2440] px-3 py-2 text-sm outline-none focus:border-[#2BA84A]/60"
            />
            <button
              type="submit"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/80 hover:bg-white/5"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </form>
        </div>

        <div className="flex gap-3 border-t border-white/10 p-6 pt-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!canSave}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1B7D3A] py-2.5 text-sm font-semibold text-white hover:bg-[#15662F] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check className="h-4 w-4" /> Save pools
          </button>
        </div>
        {!canSave && teams.length > 0 && (
          <p className="px-6 pb-4 -mt-3 text-xs text-white/40">
            Put at least two teams in a pool to save. Changing pools keeps scores for matchups
            that still exist.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
