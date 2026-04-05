"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useAdmin } from "@/lib/context/admin-context";

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

function groupNumber(indices: number[]): string {
  if (indices.length === 1) return `0${indices[0] + 1}`;
  return indices.map((i) => `0${i + 1}`).join(" + ");
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

function slotId(ly: string, i: number): string {
  const row = i < 3 ? "A" : "B";
  const col = (i % 3) + 1;
  if (ly === "courts-6") return `${row}${col}`;
  if (ly === "vb-2") return `V${i + 1}`;
  if (ly === "bc-2" || ly === "bc-full") return `BC${i + 1}`;
  return `${row}${col}`;
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

/* ── Brand dark theme variant styles ──
   Page bg:    #0F2440 (primary-dark)
   Card bg:    #1B3A5C (primary)
   Card hover: #2A5A8C (primary-light)
   Accent:     #2BA84A / #1B7D3A
   Info:       #3498DB
   Error:      #E74C3C
   Warning:    #F39C12
*/
const V: Record<string, {
  border: string; badge: string; badgeText: string;
  dot: string; sport: string; status: string; glow: string;
}> = {
  available: {
    border: "border-[#2BA84A]/35", badge: "bg-[#2BA84A]/15", badgeText: "text-[#2BA84A]",
    dot: "bg-[#2BA84A]", sport: "text-[#2BA84A]", status: "text-[#2BA84A]/70",
    glow: "shadow-[0_0_24px_-6px_rgba(43,168,74,0.2)]",
  },
  reserved: {
    border: "border-[#F39C12]/35", badge: "bg-[#F39C12]/15", badgeText: "text-[#F39C12]",
    dot: "bg-[#F39C12]", sport: "text-[#F39C12]", status: "text-[#F39C12]/70",
    glow: "shadow-[0_0_24px_-6px_rgba(243,156,18,0.2)]",
  },
  pickleball: {
    border: "border-orange-400/35", badge: "bg-orange-400/15", badgeText: "text-orange-400",
    dot: "bg-orange-400", sport: "text-orange-400", status: "text-orange-400/70",
    glow: "shadow-[0_0_24px_-6px_rgba(251,146,60,0.2)]",
  },
  badminton: {
    border: "border-[#3498DB]/35", badge: "bg-[#3498DB]/15", badgeText: "text-[#3498DB]",
    dot: "bg-[#3498DB]", sport: "text-[#3498DB]", status: "text-[#3498DB]/70",
    glow: "shadow-[0_0_24px_-6px_rgba(52,152,219,0.2)]",
  },
  "box-cricket": {
    border: "border-[#E74C3C]/30", badge: "bg-[#E74C3C]/15", badgeText: "text-[#E74C3C]",
    dot: "bg-[#E74C3C]", sport: "text-[#E74C3C]", status: "text-[#E74C3C]/70",
    glow: "shadow-[0_0_24px_-6px_rgba(231,76,60,0.2)]",
  },
  volleyball: {
    border: "border-violet-400/35", badge: "bg-violet-400/15", badgeText: "text-violet-400",
    dot: "bg-violet-400", sport: "text-violet-400", status: "text-violet-400/70",
    glow: "shadow-[0_0_24px_-6px_rgba(167,139,250,0.2)]",
  },
  cricket: {
    border: "border-[#E74C3C]/30", badge: "bg-[#E74C3C]/15", badgeText: "text-[#E74C3C]",
    dot: "bg-[#E74C3C]", sport: "text-[#E74C3C]", status: "text-[#E74C3C]/70",
    glow: "shadow-[0_0_24px_-6px_rgba(231,76,60,0.2)]",
  },
  training: {
    border: "border-teal-400/35", badge: "bg-teal-400/15", badgeText: "text-teal-400",
    dot: "bg-teal-400", sport: "text-teal-400", status: "text-teal-400/70",
    glow: "shadow-[0_0_24px_-6px_rgba(20,184,166,0.2)]",
  },
};

const SPORT_ICONS: Record<string, string> = {
  Cricket: "\uD83C\uDFCF", Badminton: "\uD83C\uDFF8", Training: "\uD83C\uDFCB\uFE0F",
  Pickleball: "\uD83C\uDFD3", "Box Cricket": "\uD83C\uDFCF", Volleyball: "\uD83C\uDFD0",
};

const LEGEND_ITEMS = [
  { key: "available",   label: "Open",        ...V.available },
  { key: "pickleball",  label: "Pickleball",  ...V.pickleball },
  { key: "badminton",   label: "Badminton",   ...V.badminton },
  { key: "box-cricket", label: "Box Cricket", ...V["box-cricket"] },
  { key: "volleyball",  label: "Volleyball",  ...V.volleyball },
  { key: "training",    label: "Training",    ...V.training },
  { key: "reserved",    label: "Reserved",    ...V.reserved },
];

const GRID_CLASSES: Record<string, string> = {
  "courts-6": "grid-cols-3", "vb-courts": "grid-cols-3", "courts-vb": "grid-cols-3",
  "vb-2": "grid-cols-2", "bc-1": "grid-cols-3", "bc-2": "grid-cols-2", "bc-full": "grid-cols-1",
};

/* ── Cage Card (dark) ── */
function CageCard({
  variant, number, sportLabel, statusLabel, note, isMerged,
  adminMode, onClick, onNoteClick, className, index, reduced,
}: {
  variant: string; number: string; sportLabel: string; statusLabel: string;
  note: string; isMerged: boolean; adminMode: boolean; onClick: () => void;
  onNoteClick: () => void; className?: string; index: number; reduced: boolean;
}) {
  const vs = V[variant] || V.available;
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border bg-primary flex flex-col justify-between p-4 select-none transition-all duration-300",
        vs.border, vs.glow,
        adminMode && "cursor-pointer hover:bg-primary-light hover:scale-[1.02]",
        !adminMode && "hover:bg-primary-light",
        className
      )}
    >
      {adminMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onNoteClick(); }}
          className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[0.65rem] text-white/30 hover:bg-white/10 hover:text-white/50 z-10 transition-all"
          title="Edit note"
        >
          &#9998;
        </button>
      )}
      {/* Top: number + badge */}
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-2xl font-bold text-white/80 tracking-tight leading-none">
          {number}
        </span>
        <span className={cn("text-[0.55rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", vs.badge, vs.badgeText)}>
          {statusLabel}
        </span>
      </div>
      {/* Bottom: icon + sport + note */}
      <div>
        {sportLabel !== "Available" && (
          <span className="text-lg mr-1.5">{SPORT_ICONS[sportLabel] || ""}</span>
        )}
        {sportLabel === "Available" && (
          <span className="text-lg mr-1.5 opacity-60">&#10003;</span>
        )}
        <motion.span
          key={sportLabel}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={cn("font-display text-base font-bold", sportLabel === "Available" ? "text-white" : vs.sport)}
        >
          {isMerged && sportLabel === "Available" ? "Combined Arena" : sportLabel}
        </motion.span>
        {note && (
          <p className="text-[0.65rem] text-white/30 mt-1 truncate">{note}</p>
        )}
        {isMerged && sportLabel === "Available" && !note && (
          <p className="text-[0.65rem] text-white/25 mt-1">Double space configured for team drills.</p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Court Card (dark) ── */
function CourtCard({
  variant, id, name, sportLabel, statusLabel, note,
  adminMode, onClick, onNoteClick, className, index, reduced,
}: {
  variant: string; id: string; name: string; sportLabel: string; statusLabel: string;
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
        "relative rounded-xl border bg-primary p-3.5 select-none transition-all duration-300",
        vs.border, vs.glow,
        adminMode && "cursor-pointer hover:bg-primary-light hover:scale-[1.03]",
        !adminMode && "hover:bg-primary-light",
        className
      )}
    >
      {adminMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onNoteClick(); }}
          className="absolute top-2 right-2 w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[0.6rem] text-white/30 hover:bg-white/10 hover:text-white/50 z-10 transition-all"
          title="Edit note"
        >
          &#9998;
        </button>
      )}
      <span className="text-[0.6rem] font-mono font-bold text-white/25 tracking-wider">{id}</span>
      <div className="flex items-center gap-1.5 mt-1.5">
        <span className={cn("w-2 h-2 rounded-full shrink-0", vs.dot)} />
        <motion.span
          key={sportLabel}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-display text-sm font-bold text-white truncate"
        >
          {name}
        </motion.span>
      </div>
      <span className={cn("text-[0.6rem] font-bold uppercase tracking-widest mt-0.5 block", vs.status)}>
        {sportLabel === "Available" ? "Open" : sportLabel}
      </span>
      {note && (
        <span className="text-[0.6rem] text-white/25 mt-1 block truncate">{note}</span>
      )}
    </motion.div>
  );
}

/* ── Main Component ── */
export function CourtStatusBoard() {
  const [state, setState] = useState<CourtState>(defaultState);
  const admin = useAdmin();
  const adminMode = admin.adminMode;
  const [noteModal, setNoteModal] = useState<{
    open: boolean; type: "cage" | "slot"; index: number; title: string; value: string;
  }>({ open: false, type: "cage", index: 0, title: "", value: "" });
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const noteInputRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    async function init() {
      // 1. Try localStorage (admin edits)
      const saved = loadState();
      if (saved) { setState(saved); setMounted(true); return; }
      // 2. Try config file defaults
      try {
        const res = await fetch("/data/court-status.json");
        if (res.ok) {
          const data = await res.json();
          if (data && data.cages && data.mp) {
            data.updated = Date.now();
            setState(data);
            setMounted(true);
            return;
          }
        }
      } catch {}
      // 3. Fallback to hardcoded defaults
      setMounted(true);
    }
    init();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const saved = loadState();
      if (saved && saved.updated !== stateRef.current.updated) setState(saved);
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  const persist = useCallback((next: CourtState) => { setState(next); saveState(next); }, []);

  const handleAdminToggle = () => {
    if (adminMode) { admin.exitAdmin(); return; }
    admin.openPinModal();
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
    <div className="min-h-[calc(100vh-64px)] bg-primary-dark flex items-center justify-center">
      <div className="animate-pulse text-white/20 text-lg font-medium">Loading&hellip;</div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-primary-dark -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-6 flex flex-col">
      {/* Title row */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center justify-between mb-6 shrink-0 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">Court Status</h1>
          <span className="flex items-center gap-1.5 text-[0.55rem] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-accent/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
            </span>
            Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            {LEGEND_ITEMS.map((item) => (
              <span key={item.key} className="flex items-center gap-1.5 text-[0.55rem] font-semibold text-white/30">
                <span className={cn("w-1.5 h-1.5 rounded-full", item.dot)} />{item.label}
              </span>
            ))}
          </div>
          <span className="text-[0.6rem] text-white/20 tabular-nums font-mono">{updatedTime}</span>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-6 flex-1 min-h-0 max-w-7xl mx-auto w-full">
        {/* Cages */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-secondary/80">Zone Alpha</span>
              <h2 className="font-display text-lg font-bold text-white -mt-0.5">The Cages</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] font-bold text-white/30">{cageAvail}/{groups.length} open</span>
              {adminMode && (
                <div className="flex gap-1">
                  {[0, 1, 2].map((m) => (
                    <button key={m} onClick={() => toggleMerge(m)}
                      className={cn("w-7 h-7 rounded-lg text-[0.6rem] font-bold border transition-all flex items-center justify-center",
                        state.cages.merges[m]
                          ? "bg-accent/20 text-secondary border-accent/30"
                          : "bg-white/5 text-white/30 border-white/10 hover:border-white/20"
                      )}
                      title={`Merge ${m + 1}+${m + 2}`}
                    >{m + 1}{m + 2}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {groups.map((g, gi) => {
              const c = state.cages.items[g[0]];
              const v = cageCssVariant(c);
              const label = c.sport || (c.status === "reserved" ? "Private" : "Available");
              return (
                <div key={gi} style={{ gridColumn: g.length > 1 ? "span 2" : undefined }}>
                  <CageCard
                    variant={v} number={groupNumber(g)} sportLabel={label}
                    statusLabel={slotStatusLabel(c.status)} note={c.note}
                    isMerged={g.length > 1} adminMode={adminMode}
                    onClick={() => clickCageGroup(gi)} onNoteClick={() => openCageNote(gi)}
                    className="h-full" index={gi} reduced={reduced}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Courts */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-info/80">Zone Bravo</span>
              <h2 className="font-display text-lg font-bold text-white -mt-0.5">Multipurpose Floor</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[0.6rem] font-bold text-white/30">{mpAvail}/{cfg.slots} open</span>
              {adminMode && (
                <div className="flex gap-1 flex-wrap">
                  {LAYOUT_ORDER.map((key) => (
                    <button key={key} onClick={() => setLayout(key)}
                      className={cn("px-1.5 py-0.5 rounded text-[0.55rem] font-bold border transition-all",
                        key === ly
                          ? "bg-info/20 text-info border-info/30"
                          : "bg-white/5 text-white/30 border-white/10 hover:border-white/20"
                      )}>{LAYOUTS[key].btnLabel}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={cn("grid gap-3 flex-1", GRID_CLASSES[ly])}>
            {state.mp.slots.map((s, i) => {
              const variant = slotVariant(ly, i, s.state);
              const isFullWidth =
                (ly === "vb-courts" && i === 0) || (ly === "courts-vb" && i === 3) || (ly === "bc-1" && i === 0);
              return (
                <CourtCard
                  key={i} variant={variant} id={slotId(ly, i)} name={slotName(ly, i)}
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
      <div className="flex lg:hidden gap-3 flex-wrap justify-center mt-5 shrink-0">
        {LEGEND_ITEMS.map((item) => (
          <span key={item.key} className="flex items-center gap-1.5 text-[0.55rem] font-semibold text-white/30">
            <span className={cn("w-1.5 h-1.5 rounded-full", item.dot)} />{item.label}
          </span>
        ))}
      </div>

      {/* Admin controls */}
      {adminMode && (
        <div className="flex items-center justify-between mt-2 shrink-0 max-w-7xl mx-auto w-full">
          <span className="text-[0.5rem] text-white/20">Changes are local to this device</span>
          <div className="flex items-center gap-4">
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/data/court-status.json");
                  if (res.ok) {
                    const data = await res.json();
                    data.updated = Date.now();
                    setState(data);
                    saveState(data);
                  }
                } catch {}
              }}
              className="text-[0.55rem] font-medium text-info/60 hover:text-info transition-colors"
            >
              Reset to Defaults
            </button>
            <button onClick={handleAdminToggle}
              className="text-[0.55rem] font-medium text-error/60 hover:text-error transition-colors">
              Exit Admin
            </button>
          </div>
        </div>
      )}

      {/* Note Modal */}
      <AnimatePresence>
        {noteModal.open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setNoteModal((m) => ({ ...m, open: false }))}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.25, ease: EASE }}
              className="bg-primary border border-white/10 rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-white mb-5">{noteModal.title}</h3>
              <input ref={noteInputRef} type="text" maxLength={60} value={noteModal.value}
                onChange={(e) => setNoteModal((m) => ({ ...m, value: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") saveNote(); if (e.key === "Escape") setNoteModal((m) => ({ ...m, open: false })); }}
                placeholder="e.g., League game 4-6pm"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[0.9rem] outline-none transition-colors focus:border-info/50 placeholder:text-white/20" />
              <div className="flex gap-3 mt-5">
                <button onClick={() => setNoteModal((m) => ({ ...m, value: "" }))} className="flex-1 py-2.5 rounded-xl border border-error/30 bg-error/10 text-error font-semibold text-[0.8rem] hover:bg-error/20 transition-colors">Clear</button>
                <button onClick={() => setNoteModal((m) => ({ ...m, open: false }))} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 font-semibold text-[0.8rem] hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={saveNote} className="flex-1 py-2.5 rounded-xl bg-info/20 border border-info/30 text-info font-semibold text-[0.8rem] hover:bg-info/30 transition-colors">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
