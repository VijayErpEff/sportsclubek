"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Phone, ChevronRight, Pencil } from "lucide-react";
import { useAdmin } from "@/lib/context/admin-context";
import { BOOKING_URLS } from "@/lib/constants/booking";

/* ── Types ── */
interface CageItem {
  status: "available" | "in-use" | "reserved";
  sport: string | null;
  note: string;
  bookingUrl?: string;
}
interface SlotItem { state: string; note: string; bookingUrl?: string; }
interface CourtState {
  cages: { merges: [boolean, boolean, boolean]; items: CageItem[] };
  mp: { layout: string; slots: SlotItem[] };
  updated: number;
}

/* ── Constants ── */
const POLL_MS = 5000;
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

async function fetchCourtState(): Promise<CourtState | null> {
  try {
    const res = await fetch("/api/court-status", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.cages || !data.mp) return null;
    return data as CourtState;
  } catch {
    return null;
  }
}

async function saveCourtState(state: CourtState, pin: string): Promise<boolean> {
  try {
    const res = await fetch("/api/court-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, pin }),
    });
    return res.ok;
  } catch {
    return false;
  }
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

/* ── Light theme status styles ── */
const STATUS: Record<string, {
  border: string; bg: string; badge: string; badgeText: string; dot: string; text: string;
}> = {
  available: {
    border: "border-green-200", bg: "bg-green-50/50", badge: "bg-green-100", badgeText: "text-green-700",
    dot: "bg-green-500", text: "text-green-700",
  },
  reserved: {
    border: "border-amber-200", bg: "bg-amber-50/50", badge: "bg-amber-100", badgeText: "text-amber-700",
    dot: "bg-amber-500", text: "text-amber-700",
  },
  pickleball: {
    border: "border-teal-200", bg: "bg-teal-50/50", badge: "bg-teal-100", badgeText: "text-teal-700",
    dot: "bg-teal-500", text: "text-teal-700",
  },
  badminton: {
    border: "border-blue-200", bg: "bg-blue-50/50", badge: "bg-blue-100", badgeText: "text-blue-700",
    dot: "bg-blue-500", text: "text-blue-700",
  },
  "box-cricket": {
    border: "border-red-200", bg: "bg-red-50/50", badge: "bg-red-100", badgeText: "text-red-700",
    dot: "bg-red-500", text: "text-red-700",
  },
  volleyball: {
    border: "border-violet-200", bg: "bg-violet-50/50", badge: "bg-violet-100", badgeText: "text-violet-700",
    dot: "bg-violet-500", text: "text-violet-700",
  },
  cricket: {
    border: "border-red-200", bg: "bg-red-50/50", badge: "bg-red-100", badgeText: "text-red-700",
    dot: "bg-red-500", text: "text-red-700",
  },
  training: {
    border: "border-cyan-200", bg: "bg-cyan-50/50", badge: "bg-cyan-100", badgeText: "text-cyan-700",
    dot: "bg-cyan-500", text: "text-cyan-700",
  },
};

const LEGEND = [
  { key: "available",   label: "Open",        dot: "bg-green-500" },
  { key: "pickleball",  label: "Pickleball",  dot: "bg-teal-500" },
  { key: "badminton",   label: "Badminton",   dot: "bg-blue-500" },
  { key: "cricket",     label: "Cricket",     dot: "bg-red-500" },
  { key: "volleyball",  label: "Volleyball",  dot: "bg-violet-500" },
  { key: "training",    label: "Training",    dot: "bg-cyan-500" },
  { key: "reserved",    label: "Reserved",    dot: "bg-amber-500" },
];

const GRID_CLASSES: Record<string, string> = {
  "courts-6": "grid-cols-3", "vb-courts": "grid-cols-3", "courts-vb": "grid-cols-3",
  "vb-2": "grid-cols-2", "bc-1": "grid-cols-3", "bc-2": "grid-cols-2", "bc-full": "grid-cols-1",
};

/* ── Cage Card (light) ── */
function CageCard({
  variant, label, sportLabel, statusLabel, note, isMerged,
  adminMode, onClick, onNoteClick, className, index, reduced, bookingUrl,
}: {
  variant: string; label: string; sportLabel: string; statusLabel: string;
  note: string; isMerged: boolean; adminMode: boolean; onClick: () => void;
  onNoteClick: () => void; className?: string; index: number; reduced: boolean; bookingUrl?: string;
}) {
  const s = STATUS[variant] || STATUS.available;
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-l-4 bg-white border border-neutral-100 p-4 transition-all duration-200",
        s.border,
        adminMode && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        !adminMode && "hover:shadow-sm",
        className
      )}
    >
      {adminMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onNoteClick(); }}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          title="Edit note"
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-neutral-900">{label}</span>
        <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", s.badge, s.badgeText)}>
          {statusLabel}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("w-2 h-2 rounded-full shrink-0", s.dot)} />
        <span className={cn("text-sm font-medium", s.text)}>
          {isMerged && sportLabel === "Available" ? "Combined — Open" : sportLabel}
        </span>
      </div>
      {note && (
        <p className="text-xs text-neutral-400 mt-1.5 truncate">{note}</p>
      )}
      {!adminMode && sportLabel === "Available" && (
        <a
          href={bookingUrl || BOOKING_URLS.offerings}
          onClick={(e) => e.stopPropagation()}
          className="inline-block mt-2 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          Book Now &rarr;
        </a>
      )}
    </motion.div>
  );
}

/* ── Court Card (light) ── */
function CourtCard({
  variant, name, sportLabel, statusLabel, note,
  adminMode, onClick, onNoteClick, className, index, reduced, bookingUrl,
}: {
  variant: string; name: string; sportLabel: string; statusLabel: string;
  note: string; adminMode: boolean; onClick: () => void; onNoteClick: () => void;
  className?: string; index: number; reduced: boolean; bookingUrl?: string;
}) {
  const s = STATUS[variant] || STATUS.available;
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: EASE }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-l-4 bg-white border border-neutral-100 p-3.5 transition-all duration-200",
        s.border,
        adminMode && "cursor-pointer hover:shadow-md hover:-translate-y-0.5",
        !adminMode && "hover:shadow-sm",
        className
      )}
    >
      {adminMode && (
        <button
          onClick={(e) => { e.stopPropagation(); onNoteClick(); }}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          title="Edit note"
        >
          <Pencil className="h-2.5 w-2.5" />
        </button>
      )}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-neutral-900">{name}</span>
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", s.badge, s.badgeText)}>
          {statusLabel}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
        <span className={cn("text-xs font-medium", s.text)}>
          {sportLabel === "Available" ? "Open" : sportLabel}
        </span>
      </div>
      {note && (
        <p className="text-[11px] text-neutral-400 mt-1 truncate">{note}</p>
      )}
      {!adminMode && sportLabel === "Available" && (
        <a
          href={bookingUrl || BOOKING_URLS.offerings}
          onClick={(e) => e.stopPropagation()}
          className="inline-block mt-1.5 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          Book &rarr;
        </a>
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
    open: boolean; type: "cage" | "slot"; index: number; title: string; value: string; urlValue: string;
  }>({ open: false, type: "cage", index: 0, title: "", value: "", urlValue: "" });
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const noteInputRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    async function init() {
      const saved = await fetchCourtState();
      if (saved) { setState(saved); setMounted(true); return; }
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
      setMounted(true);
    }
    init();
  }, []);

  useEffect(() => {
    const id = setInterval(async () => {
      const saved = await fetchCourtState();
      if (saved && saved.updated !== stateRef.current.updated) setState(saved);
    }, POLL_MS);
    return () => clearInterval(id);
  }, []);

  const persist = useCallback((next: CourtState) => {
    next.updated = Date.now();
    setState(next);
    saveCourtState(next, admin.adminPin);
  }, [admin.adminPin]);

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
    const c = state.cages.items[g[0]];
    setNoteModal({ open: true, type: "cage", index: g[0], title: groupLabel(g), value: c.note, urlValue: c.bookingUrl ?? "" });
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
    const s = state.mp.slots[i];
    setNoteModal({ open: true, type: "slot", index: i, title: slotName(state.mp.layout, i), value: s.note, urlValue: s.bookingUrl ?? "" });
    setTimeout(() => noteInputRef.current?.focus(), 100);
  };

  const saveNote = () => {
    const next = structuredClone(state);
    const v = noteModal.value.trim();
    const url = noteModal.urlValue.trim() || undefined;
    if (noteModal.type === "cage") {
      next.cages.items[noteModal.index].note = v;
      next.cages.items[noteModal.index].bookingUrl = url;
    } else {
      next.mp.slots[noteModal.index].note = v;
      next.mp.slots[noteModal.index].bookingUrl = url;
    }
    persist(next); setNoteModal((m) => ({ ...m, open: false }));
  };

  const groups = computeGroups(state.cages.merges);
  const cageAvail = groups.filter((g) => state.cages.items[g[0]].status === "available").length;
  const ly = state.mp.layout;
  const cfg = LAYOUTS[ly];
  const mpAvail = state.mp.slots.filter((s) => s.state === "available").length;
  const updatedTime = mounted
    ? new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(state.updated))
    : "";

  if (!mounted) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="animate-pulse text-neutral-300 text-lg font-medium">Loading&hellip;</div>
    </div>
  );

  return (
    <div className="pt-28 md:pt-32 pb-24 lg:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                  Court Status
                </h1>
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Live
                </span>
              </div>
              <p className="text-sm text-neutral-500">
                Real-time availability &middot; Updated {updatedTime} ET
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {LEGEND.map((item) => (
              <span key={item.key} className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className={cn("w-2 h-2 rounded-full", item.dot)} />
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Admin banner */}
        {adminMode && (
          <div className="mb-6 flex flex-wrap items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Admin Mode — tap cards to change status
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch("/data/court-status.json");
                    if (res.ok) {
                      const data = await res.json();
                      data.updated = Date.now();
                      setState(data);
                      saveCourtState(data, admin.adminPin);
                    }
                  } catch {}
                }}
                className="text-xs font-medium text-neutral-500 hover:text-red-600 transition-colors underline underline-offset-2"
              >
                Reset
              </button>
              <button onClick={handleAdminToggle}
                className="text-xs font-medium text-neutral-500 hover:text-primary transition-colors underline underline-offset-2">
                Exit Admin
              </button>
            </div>
          </div>
        )}

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Cages */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900">Batting Cages</h2>
                <p className="text-xs text-neutral-400 mt-0.5">{cageAvail} of {groups.length} available</p>
              </div>
              {adminMode && (
                <div className="flex gap-1">
                  {[0, 1, 2].map((m) => (
                    <button key={m} onClick={() => toggleMerge(m)}
                      className={cn("w-8 h-8 rounded-lg text-xs font-bold border transition-all flex items-center justify-center",
                        state.cages.merges[m]
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-neutral-50 text-neutral-400 border-neutral-200 hover:border-neutral-300"
                      )}
                      title={`Merge ${m + 1}+${m + 2}`}
                    >{m + 1}{m + 2}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {groups.map((g, gi) => {
                const c = state.cages.items[g[0]];
                const v = cageCssVariant(c);
                const sportLbl = c.sport || (c.status === "reserved" ? "Reserved" : "Available");
                return (
                  <div key={gi} style={{ gridColumn: g.length > 1 ? "span 2" : undefined }}>
                    <CageCard
                      variant={v} label={groupLabel(g)} sportLabel={sportLbl}
                      statusLabel={slotStatusLabel(c.status)} note={c.note}
                      isMerged={g.length > 1} adminMode={adminMode}
                      onClick={() => clickCageGroup(gi)} onNoteClick={() => openCageNote(gi)}
                      className="h-full" index={gi} reduced={reduced}
                      bookingUrl={c.bookingUrl}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Courts */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900">Multipurpose Courts</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {mpAvail} of {cfg.slots} available &middot; {LAYOUTS[ly].label}
                </p>
              </div>
              {adminMode && (
                <div className="flex gap-1 flex-wrap">
                  {LAYOUT_ORDER.map((key) => (
                    <button key={key} onClick={() => setLayout(key)}
                      className={cn("px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all",
                        key === ly
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-neutral-50 text-neutral-400 border-neutral-200 hover:border-neutral-300"
                      )}>{LAYOUTS[key].btnLabel}</button>
                  ))}
                </div>
              )}
            </div>

            <div className={cn("grid gap-3", GRID_CLASSES[ly])}>
              {state.mp.slots.map((slot, i) => {
                const variant = slotVariant(ly, i, slot.state);
                const isFullWidth =
                  (ly === "vb-courts" && i === 0) || (ly === "courts-vb" && i === 3) || (ly === "bc-1" && i === 0);
                return (
                  <CourtCard
                    key={i} variant={variant} name={slotName(ly, i)}
                    sportLabel={slotSportLabel(ly, i, slot.state)} statusLabel={slotStatusLabel(slot.state)}
                    note={slot.note} adminMode={adminMode} onClick={() => clickSlot(i)}
                    onNoteClick={() => openSlotNote(i)} index={i + groups.length} reduced={reduced}
                    bookingUrl={slot.bookingUrl}
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

        {/* Admin controls */}
        {adminMode && (
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-400">Changes sync across all devices</p>
          </div>
        )}
      </div>

      {/* Mobile sticky Call to Book bar */}
      {!adminMode && (
        <div className="fixed bottom-14 inset-x-0 z-40 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="mx-3 flex gap-2">
            <a
              href="tel:4434066494"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-bold text-sm rounded-xl shadow-lg shadow-accent/25"
            >
              <Phone className="h-4 w-4" />
              Call to Book
            </a>
            <a
              href={BOOKING_URLS.offerings}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
            >
              Book Online
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Note Modal */}
      <AnimatePresence>
        {noteModal.open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setNoteModal((m) => ({ ...m, open: false }))}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.25, ease: EASE }}
              className="bg-white border border-neutral-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-4">{noteModal.title}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Note</label>
                  <input ref={noteInputRef} type="text" maxLength={60} value={noteModal.value}
                    onChange={(e) => setNoteModal((m) => ({ ...m, value: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") saveNote(); if (e.key === "Escape") setNoteModal((m) => ({ ...m, open: false })); }}
                    placeholder="e.g., League game 4–6pm"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 placeholder:text-neutral-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Booking URL <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <input type="url" value={noteModal.urlValue}
                    onChange={(e) => setNoteModal((m) => ({ ...m, urlValue: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") saveNote(); if (e.key === "Escape") setNoteModal((m) => ({ ...m, open: false })); }}
                    placeholder="e.g., https://app.upperhand.io/..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 placeholder:text-neutral-400" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setNoteModal((m) => ({ ...m, value: "" }))} className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors">Clear</button>
                <button onClick={() => setNoteModal((m) => ({ ...m, open: false }))} className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-500 font-semibold text-sm hover:bg-neutral-50 transition-colors">Cancel</button>
                <button onClick={saveNote} className="flex-1 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
