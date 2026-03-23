"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ── Types ── */
interface CageItem {
  status: "available" | "in-use" | "reserved";
  sport: string | null;
  note: string;
}
interface SlotItem { state: string; note: string; }
interface CourtState {
  cages: { merges: [boolean, boolean, boolean]; items: CageItem[] };
  mp: { layout: string; slots: SlotItem[] };
  updated: number;
}

/* ── Constants ── */
const STORAGE_KEY = "levelup_court_v5";
const POLL_MS = 2000;
const ADMIN_PIN = "1234";
const EASE = [0.22, 1, 0.36, 1] as const;

const CAGE_STATES: { status: CageItem["status"]; sport: string | null }[] = [
  { status: "available", sport: null },
  { status: "in-use", sport: "Cricket" },
  { status: "in-use", sport: "Badminton" },
  { status: "in-use", sport: "Training" },
  { status: "reserved", sport: null },
];

const LAYOUTS: Record<string, { label: string; btnLabel: string; slots: number }> = {
  "courts-6":  { label: "Courts (6)",               btnLabel: "Courts",       slots: 6 },
  "vb-courts": { label: "Volleyball + 3 Courts",    btnLabel: "VB + Courts",  slots: 4 },
  "courts-vb": { label: "3 Courts + Volleyball",    btnLabel: "Courts + VB",  slots: 4 },
  "vb-2":      { label: "2 Volleyball",             btnLabel: "2 Volleyball", slots: 2 },
  "bc-1":      { label: "1 Box Cricket + 2 Courts", btnLabel: "BC + Courts",  slots: 3 },
  "bc-2":      { label: "2 Box Cricket",            btnLabel: "2 Box Cricket",slots: 2 },
  "bc-full":   { label: "Full Box Cricket",         btnLabel: "Full BC",      slots: 1 },
};

const LAYOUT_ORDER = ["courts-6", "vb-courts", "courts-vb", "vb-2", "bc-1", "bc-2", "bc-full"];
const COURT_CYCLE = ["available", "pickleball", "badminton", "reserved"];
const BIG_CYCLE = ["available", "in-use", "reserved"];

/* ── Helpers ── */
function makeSlot(): SlotItem { return { state: "available", note: "" }; }
function makeCage(): CageItem { return { status: "available", sport: null, note: "" }; }
function seq<T>(n: number, fn: () => T): T[] { return Array.from({ length: n }, fn); }

function defaultState(): CourtState {
  return {
    cages: { merges: [false, false, false], items: seq(4, makeCage) },
    mp: { layout: "courts-6", slots: seq(6, makeSlot) },
    updated: Date.now(),
  };
}

function loadState(): CourtState | null {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (!d) return null;
    const parsed = JSON.parse(d);
    if (Array.isArray(parsed.cages)) return null;
    return parsed as CourtState;
  } catch { return null; }
}

function saveState(state: CourtState) {
  state.updated = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function computeGroups(merges: boolean[]): number[][] {
  const groups: number[][] = [[0]];
  for (let i = 0; i < 3; i++) {
    if (merges[i]) groups[groups.length - 1].push(i + 1);
    else groups.push([i + 1]);
  }
  return groups;
}

function groupLabel(indices: number[]): string {
  if (indices.length === 1) return `Cage ${indices[0] + 1}`;
  return `Cages ${indices[0] + 1}\u2013${indices[indices.length - 1] + 1}`;
}

function cageCssVariant(c: CageItem) {
  if (c.status === "available") return "available";
  if (c.status === "reserved") return "reserved";
  if (c.sport === "Badminton") return "badminton";
  if (c.sport === "Training") return "training";
  return "cricket";
}

function slotType(ly: string, i: number): string {
  if (ly === "courts-6") return "court";
  if (ly === "vb-courts") return i === 0 ? "volleyball" : "court";
  if (ly === "courts-vb") return i === 3 ? "volleyball" : "court";
  if (ly === "vb-2") return "volleyball";
  if (ly === "bc-1") return i === 0 ? "box-cricket" : "court";
  if (ly === "bc-2" || ly === "bc-full") return "box-cricket";
  return "court";
}

function slotName(ly: string, i: number): string {
  if (ly === "courts-6") return `Court ${i + 1}`;
  if (ly === "vb-courts") return i === 0 ? "Volleyball" : `Court ${i}`;
  if (ly === "courts-vb") return i < 3 ? `Court ${i + 1}` : "Volleyball";
  if (ly === "vb-2") return `Volleyball ${i + 1}`;
  if (ly === "bc-1") return i === 0 ? "Box Cricket" : `Court ${i}`;
  if (ly === "bc-2") return `Box Cricket ${i + 1}`;
  if (ly === "bc-full") return "Full Box Cricket";
  return `Court ${i + 1}`;
}

function slotSportLabel(ly: string, i: number, st: string): string {
  const t = slotType(ly, i);
  if (st === "available") return "Available";
  if (st === "reserved") return "Reserved";
  if (t === "court") return st === "pickleball" ? "Pickleball" : "Badminton";
  if (t === "box-cricket") return "Box Cricket";
  return "Volleyball";
}

function slotStatusLabel(st: string): string {
  if (st === "available") return "Open";
  if (st === "reserved") return "Reserved";
  return "In Use";
}

function slotVariant(ly: string, i: number, st: string): string {
  if (st === "available") return "available";
  if (st === "reserved") return "reserved";
  const t = slotType(ly, i);
  if (t === "court") return st;
  return t;
}

/* ── Variant styles ── */
const V: Record<string, { cell: string; glow: string; sport: string; status: string; dot: string }> = {
  available:     { cell: "border-accent/30",     glow: "shadow-[0_0_20px_-4px_rgba(27,125,58,0.15)]",  sport: "text-accent",     status: "text-accent/60",     dot: "bg-accent" },
  reserved:      { cell: "border-warning/35",    glow: "shadow-[0_0_20px_-4px_rgba(243,156,18,0.15)]", sport: "text-warning",    status: "text-warning/60",    dot: "bg-warning" },
  pickleball:    { cell: "border-orange-400/35", glow: "shadow-[0_0_20px_-4px_rgba(251,146,60,0.15)]", sport: "text-orange-600", status: "text-orange-500/60", dot: "bg-orange-400" },
  badminton:     { cell: "border-info/35",       glow: "shadow-[0_0_20px_-4px_rgba(52,152,219,0.15)]", sport: "text-info",       status: "text-info/60",       dot: "bg-info" },
  "box-cricket": { cell: "border-error/30",      glow: "shadow-[0_0_20px_-4px_rgba(231,76,60,0.15)]",  sport: "text-error",      status: "text-error/60",      dot: "bg-error" },
  volleyball:    { cell: "border-violet-400/35", glow: "shadow-[0_0_20px_-4px_rgba(167,139,250,0.15)]",sport: "text-violet-600", status: "text-violet-500/60", dot: "bg-violet-400" },
  cricket:       { cell: "border-error/30",      glow: "shadow-[0_0_20px_-4px_rgba(231,76,60,0.15)]",  sport: "text-error",      status: "text-error/60",      dot: "bg-error" },
  training:      { cell: "border-teal-400/35",   glow: "shadow-[0_0_20px_-4px_rgba(94,234,212,0.2)]",  sport: "text-teal-600",   status: "text-teal-500/60",   dot: "bg-teal-400" },
};

const LEGEND_ITEMS = [
  { key: "available",   label: "Available",   dot: V.available.dot },
  { key: "pickleball",  label: "Pickleball",  dot: V.pickleball.dot },
  { key: "badminton",   label: "Badminton",   dot: V.badminton.dot },
  { key: "box-cricket", label: "Box Cricket", dot: V["box-cricket"].dot },
  { key: "volleyball",  label: "Volleyball",  dot: V.volleyball.dot },
  { key: "training",    label: "Training",    dot: V.training.dot },
  { key: "reserved",    label: "Reserved",    dot: V.reserved.dot },
];

const GRID_CLASSES: Record<string, string> = {
  "courts-6": "grid-cols-3", "vb-courts": "grid-cols-3", "courts-vb": "grid-cols-3",
  "vb-2": "grid-cols-2", "bc-1": "grid-cols-3", "bc-2": "grid-cols-2", "bc-full": "grid-cols-1",
};

/* ── Animated Court Cell ── */
function CourtCell({
  variant, label, sportLabel, statusLabel, note,
  adminMode, onClick, onNoteClick, className, index, reduced,
}: {
  variant: string; label: string; sportLabel: string; statusLabel: string;
  note: string; adminMode: boolean; onClick: () => void; onNoteClick: () => void;
  className?: string; index: number; reduced: boolean;
}) {
  const vs = V[variant] || V.available;
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border-2 bg-white flex flex-col items-center justify-center p-4 select-none transition-shadow duration-300",
        vs.cell, vs.glow,
        adminMode && "cursor-pointer hover:shadow-card-hover hover:scale-[1.03]",
        !adminMode && "hover:shadow-card-hover",
        className
      )}
    >
      {adminMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onNoteClick(); }}
          className="absolute top-2 right-2 w-6 h-6 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center text-[0.7rem] text-neutral-400 hover:bg-white hover:shadow-card z-10 transition-all"
          title="Edit note"
        >
          &#9998;
        </button>
      )}
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-neutral-400">
        {label}
      </span>
      <motion.span
        key={sportLabel}
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className={cn("font-display text-xl font-extrabold leading-none mt-1.5 tracking-tight", vs.sport)}
      >
        {sportLabel}
      </motion.span>
      <span className={cn("text-[0.55rem] font-bold uppercase tracking-[0.15em] mt-1", vs.status)}>
        {statusLabel}
      </span>
      {note && (
        <span className="text-[0.65rem] text-neutral-400 mt-1.5 text-center truncate max-w-full leading-tight">
          {note}
        </span>
      )}
    </motion.div>
  );
}

/* ── Main Component ── */
export function CourtStatusBoard() {
  const [state, setState] = useState<CourtState>(defaultState);
  const [adminMode, setAdminMode] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(false);
  const [noteModal, setNoteModal] = useState<{
    open: boolean; type: "cage" | "slot"; index: number; title: string; value: string;
  }>({ open: false, type: "cage", index: 0, title: "", value: "" });
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const searchParams = useSearchParams();
  const pinInputRef = useRef<HTMLInputElement>(null);
  const noteInputRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => { const saved = loadState(); if (saved) setState(saved); setMounted(true); }, []);

  useEffect(() => {
    if (mounted && searchParams.has("admin") && !adminMode) {
      setPinModalOpen(true); setPinValue(""); setPinError(false);
      setTimeout(() => pinInputRef.current?.focus(), 100);
    }
  }, [mounted, searchParams, adminMode]);

  useEffect(() => {
    const id = setInterval(() => {
      const saved = loadState();
      if (saved && saved.updated !== stateRef.current.updated) setState(saved);
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  const persist = useCallback((next: CourtState) => { setState(next); saveState(next); }, []);

  const handleAdminToggle = () => {
    if (adminMode) { setAdminMode(false); return; }
    setPinModalOpen(true); setPinValue(""); setPinError(false);
    setTimeout(() => pinInputRef.current?.focus(), 100);
  };

  const submitPin = () => {
    if (pinValue === ADMIN_PIN) { setAdminMode(true); setPinModalOpen(false); }
    else { setPinError(true); setPinValue(""); pinInputRef.current?.focus(); }
  };

  const toggleMerge = (idx: number) => {
    const next = structuredClone(state);
    next.cages.merges[idx] = !next.cages.merges[idx];
    next.cages.items = seq(4, makeCage);
    persist(next);
  };

  const clickCageGroup = (gi: number) => {
    if (!adminMode) return;
    const next = structuredClone(state);
    const groups = computeGroups(next.cages.merges);
    const g = groups[gi]; const c = next.cages.items[g[0]];
    const idx = CAGE_STATES.findIndex((x) => x.status === c.status && x.sport === c.sport);
    const ns = CAGE_STATES[(Math.max(idx, 0) + 1) % CAGE_STATES.length];
    c.status = ns.status; c.sport = ns.sport;
    persist(next);
  };

  const openCageNote = (gi: number) => {
    const groups = computeGroups(state.cages.merges); const g = groups[gi];
    setNoteModal({ open: true, type: "cage", index: g[0], title: groupLabel(g), value: state.cages.items[g[0]].note });
    setTimeout(() => noteInputRef.current?.focus(), 100);
  };

  const setLayout = (ly: string) => {
    if (state.mp.layout === ly) return;
    const next = structuredClone(state);
    next.mp.layout = ly; next.mp.slots = seq(LAYOUTS[ly].slots, makeSlot);
    persist(next);
  };

  const clickSlot = (i: number) => {
    if (!adminMode) return;
    const next = structuredClone(state); const s = next.mp.slots[i];
    const t = slotType(next.mp.layout, i);
    const cycle = t === "court" ? COURT_CYCLE : BIG_CYCLE;
    const idx = cycle.indexOf(s.state);
    s.state = cycle[(Math.max(idx, 0) + 1) % cycle.length];
    persist(next);
  };

  const openSlotNote = (i: number) => {
    setNoteModal({ open: true, type: "slot", index: i, title: slotName(state.mp.layout, i), value: state.mp.slots[i].note });
    setTimeout(() => noteInputRef.current?.focus(), 100);
  };

  const saveNote = () => {
    const next = structuredClone(state); const v = noteModal.value.trim();
    if (noteModal.type === "cage") next.cages.items[noteModal.index].note = v;
    else next.mp.slots[noteModal.index].note = v;
    persist(next); setNoteModal((m) => ({ ...m, open: false }));
  };

  const groups = computeGroups(state.cages.merges);
  const cageAvail = groups.filter((g) => state.cages.items[g[0]].status === "available").length;
  const ly = state.mp.layout;
  const cfg = LAYOUTS[ly];
  const mpAvail = state.mp.slots.filter((s) => s.state === "available").length;
  const updatedTime = mounted ? new Date(state.updated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  if (!mounted) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="animate-pulse text-neutral-300 text-lg font-medium">Loading&hellip;</div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 md:pt-24 pb-6">
      {/* Title row */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center justify-between mb-5 shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <h1 className="font-display text-section text-neutral-900">Court Status</h1>
          <span className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-widest text-accent bg-accent/8 px-2.5 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {LEGEND_ITEMS.map((item) => (
              <span key={item.key} className="flex items-center gap-1.5 text-[0.6rem] font-semibold text-neutral-400">
                <span className={cn("w-2 h-2 rounded-full", item.dot)} />
                {item.label}
              </span>
            ))}
          </div>
          <span className="text-[0.6rem] text-neutral-300 tabular-nums font-medium">{updatedTime}</span>
        </div>
      </motion.div>

      {/* Main grid — equal halves, fills viewport */}
      <div className="grid lg:grid-cols-2 gap-5 flex-1 min-h-0">
        {/* Cages */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-neutral-400">Batting Cages</h2>
            <span className="text-[0.65rem] font-bold text-accent">{cageAvail}/{groups.length} open</span>
          </div>

          {adminMode && (
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span className="text-[0.65rem] font-semibold text-neutral-500">Merge:</span>
              {[0, 1, 2].map((m) => (
                <button key={m} onClick={() => toggleMerge(m)}
                  className={cn("px-2 py-0.5 rounded text-[0.65rem] font-medium border transition-all",
                    state.cages.merges[m] ? "bg-primary text-white border-primary" : "bg-white border-neutral-200 text-neutral-600 hover:border-primary/40"
                  )}>{m + 1}+{m + 2}</button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 flex-1">
            {groups.map((g, gi) => {
              const c = state.cages.items[g[0]];
              const v = cageCssVariant(c);
              const label = c.sport || (c.status === "reserved" ? "Reserved" : "Available");
              return (
                <div key={gi} style={{ gridColumn: g.length > 1 ? "span 2" : undefined }}>
                  <CourtCell
                    variant={v} label={groupLabel(g)} sportLabel={label}
                    statusLabel={slotStatusLabel(c.status)} note={c.note}
                    adminMode={adminMode} onClick={() => clickCageGroup(gi)}
                    onNoteClick={() => openCageNote(gi)}
                    className="h-full" index={gi} reduced={reduced}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Courts */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-neutral-400">Courts</h2>
              <span className="text-[0.6rem] font-medium text-neutral-300">{cfg.label}</span>
            </div>
            <span className="text-[0.65rem] font-bold text-accent">{mpAvail}/{cfg.slots} open</span>
          </div>

          {adminMode && (
            <div className="flex gap-1 mb-2 flex-wrap">
              {LAYOUT_ORDER.map((key) => (
                <button key={key} onClick={() => setLayout(key)}
                  className={cn("px-2 py-0.5 rounded text-[0.65rem] font-medium border transition-all",
                    key === ly ? "bg-primary text-white border-primary" : "bg-white border-neutral-200 text-neutral-600 hover:border-primary/40"
                  )}>{LAYOUTS[key].btnLabel}</button>
              ))}
            </div>
          )}

          <div className={cn("grid gap-3 flex-1", GRID_CLASSES[ly])}>
            {state.mp.slots.map((s, i) => {
              const variant = slotVariant(ly, i, s.state);
              const isFullWidth =
                (ly === "vb-courts" && i === 0) || (ly === "courts-vb" && i === 3) || (ly === "bc-1" && i === 0);
              return (
                <CourtCell
                  key={i} variant={variant} label={slotName(ly, i)}
                  sportLabel={slotSportLabel(ly, i, s.state)} statusLabel={slotStatusLabel(s.state)}
                  note={s.note} adminMode={adminMode} onClick={() => clickSlot(i)}
                  onNoteClick={() => openSlotNote(i)} index={i + groups.length} reduced={reduced}
                  className={cn(
                    isFullWidth && ly === "bc-1" && "row-span-2",
                    isFullWidth && (ly === "vb-courts" || ly === "courts-vb") && "col-span-full",
                  )}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Mobile legend */}
      <div className="flex md:hidden gap-3 flex-wrap justify-center mt-4 shrink-0">
        {LEGEND_ITEMS.map((item) => (
          <span key={item.key} className="flex items-center gap-1 text-[0.6rem] font-semibold text-neutral-400">
            <span className={cn("w-2 h-2 rounded-full", item.dot)} />{item.label}
          </span>
        ))}
      </div>

      {/* Admin exit */}
      {adminMode && (
        <div className="flex justify-end mt-2 shrink-0">
          <button onClick={handleAdminToggle}
            className="text-[0.55rem] font-medium text-error hover:text-error/80 transition-colors">
            Exit Admin
          </button>
        </div>
      )}

      {/* PIN Modal */}
      <AnimatePresence>
        {pinModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/60 backdrop-blur-sm"
            onClick={() => setPinModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-card-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-card-title text-neutral-900 mb-5">Enter Admin PIN</h3>
              <input ref={pinInputRef} type="password" maxLength={6} value={pinValue}
                onChange={(e) => { setPinValue(e.target.value); setPinError(false); }}
                onKeyDown={(e) => { if (e.key === "Enter") submitPin(); if (e.key === "Escape") setPinModalOpen(false); }}
                placeholder="PIN"
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl text-center font-mono text-lg tracking-[0.2em] outline-none transition-colors focus:border-primary" />
              {pinError && <p className="text-error text-caption mt-2">Incorrect PIN</p>}
              <div className="flex gap-3 mt-5">
                <button onClick={() => setPinModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-caption hover:bg-neutral-50 transition-colors">Cancel</button>
                <button onClick={submitPin} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold text-caption hover:bg-primary-light transition-colors">Enter</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {noteModal.open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/60 backdrop-blur-sm"
            onClick={() => setNoteModal((m) => ({ ...m, open: false }))}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-card-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-card-title text-neutral-900 mb-5">{noteModal.title}</h3>
              <input ref={noteInputRef} type="text" maxLength={60} value={noteModal.value}
                onChange={(e) => setNoteModal((m) => ({ ...m, value: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") saveNote(); if (e.key === "Escape") setNoteModal((m) => ({ ...m, open: false })); }}
                placeholder="e.g., League game 4-6pm"
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl text-body outline-none transition-colors focus:border-primary" />
              <div className="flex gap-3 mt-5">
                <button onClick={() => setNoteModal((m) => ({ ...m, value: "" }))} className="flex-1 py-2.5 rounded-xl border border-error/40 bg-error/5 text-error font-semibold text-caption hover:bg-error/10 transition-colors">Clear</button>
                <button onClick={() => setNoteModal((m) => ({ ...m, open: false }))} className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-caption hover:bg-neutral-50 transition-colors">Cancel</button>
                <button onClick={saveNote} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-semibold text-caption hover:bg-primary-light transition-colors">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
