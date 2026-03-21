"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Command,
  FileText,
  Trophy,
  GraduationCap,
  Zap,
  X,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SearchItem {
  label: string;
  href: string;
  category: "Pages" | "Sports" | "Programs" | "Actions";
}

const SEARCH_ITEMS: SearchItem[] = [
  { label: "Home", href: "/", category: "Pages" },
  { label: "About", href: "/about", category: "Pages" },
  { label: "Facilities", href: "/facilities", category: "Pages" },
  { label: "Memberships", href: "/memberships", category: "Pages" },
  { label: "Schedule", href: "/schedule", category: "Pages" },
  { label: "Contact", href: "/contact", category: "Pages" },
  { label: "Blog", href: "/blog", category: "Pages" },
  { label: "Baseball", href: "/baseball", category: "Sports" },
  { label: "Cricket", href: "/cricket", category: "Sports" },
  { label: "Badminton", href: "/badminton", category: "Sports" },
  { label: "Pickleball", href: "/pickleball", category: "Sports" },
  { label: "Baseball Academy", href: "/baseball-academy", category: "Programs" },
  { label: "Cricket Academy", href: "/cricket-academy", category: "Programs" },
  { label: "Badminton Academy", href: "/badminton-academy", category: "Programs" },
  { label: "Kids Agility Training", href: "/kids-agility", category: "Programs" },
  { label: "Book a Session", href: "/schedule", category: "Actions" },
  { label: "View Memberships", href: "/memberships", category: "Actions" },
  { label: "Open House", href: "/open-house", category: "Actions" },
  { label: "Careers", href: "/careers", category: "Actions" },
  { label: "Free Trial", href: "/free-trial", category: "Actions" },
  { label: "Birthday Parties", href: "/birthday-parties", category: "Pages" },
  { label: "Summer Camps", href: "/summer-camps", category: "Programs" },
];

const CATEGORY_ICONS: Record<string, typeof FileText> = {
  Pages: FileText,
  Sports: Trophy,
  Programs: GraduationCap,
  Actions: Zap,
};

const RECENT_SEARCHES_KEY = "levelup-recent-searches";
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(href: string): void {
  if (typeof window === "undefined") return;
  try {
    const recent = getRecentSearches().filter((r) => r !== href);
    recent.unshift(href);
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify(recent.slice(0, MAX_RECENT))
    );
  } catch {
    // Silently fail
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  // Load recent searches on mount
  useEffect(() => {
    setRecentHrefs(getRecentSearches());
  }, []);

  // Global keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setRecentHrefs(getRecentSearches());
      // Focus input after animation
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q)
    );
  }, [query]);

  // Grouped results
  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of results) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [results]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    const flat: SearchItem[] = [];
    for (const category of ["Pages", "Sports", "Programs", "Actions"]) {
      if (grouped[category]) {
        flat.push(...grouped[category]);
      }
    }
    return flat;
  }, [grouped]);

  // Recent items for when there is no query
  const recentItems = useMemo(() => {
    if (query.trim()) return [];
    return recentHrefs
      .map((href) => SEARCH_ITEMS.find((item) => item.href === href))
      .filter(Boolean) as SearchItem[];
  }, [query, recentHrefs]);

  const navigableItems = query.trim() ? flatResults : recentItems;

  // Reset active index on results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (item: SearchItem) => {
      addRecentSearch(item.href);
      setOpen(false);
      router.push(item.href);
    },
    [router]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const max = navigableItems.length;
      if (max === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % max);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + max) % max);
          break;
        case "Enter":
          e.preventDefault();
          if (navigableItems[activeIndex]) {
            navigate(navigableItems[activeIndex]);
          }
          break;
      }
    },
    [navigableItems, activeIndex, navigate]
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${activeIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const motionOverlay = prefersReduced
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const motionContent = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96, y: -10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: -10 },
        transition: { duration: 0.2, ease: APPLE_EASE },
      };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="hidden sm:flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
          aria-label="Open search (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="mr-6">Search...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                {...motionOverlay}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              onOpenAutoFocus={(e) => e.preventDefault()}
              aria-label="Site search"
            >
              <motion.div
                className="fixed inset-x-4 top-[15vh] z-50 mx-auto max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden"
                {...motionContent}
                onKeyDown={handleKeyDown}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3">
                  <Search className="h-5 w-5 text-neutral-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search pages, sports, programs..."
                    className="flex-1 bg-transparent text-neutral-900 placeholder:text-neutral-400 text-base focus:outline-none"
                    aria-label="Search"
                    aria-activedescendant={
                      navigableItems.length > 0
                        ? `cmd-item-${activeIndex}`
                        : undefined
                    }
                    role="combobox"
                    aria-expanded={navigableItems.length > 0}
                    aria-controls="cmd-results"
                    aria-autocomplete="list"
                  />
                  <Dialog.Close asChild>
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:text-neutral-600 transition-colors"
                      aria-label="Close search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  id="cmd-results"
                  role="listbox"
                  className="max-h-[50vh] overflow-y-auto py-2"
                >
                  {/* No query: show recent searches */}
                  {!query.trim() && recentItems.length > 0 && (
                    <div>
                      <p className="px-4 py-1.5 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                        Recent
                      </p>
                      {recentItems.map((item, i) => {
                        const Icon = CATEGORY_ICONS[item.category] ?? FileText;
                        return (
                          <button
                            key={item.href}
                            id={`cmd-item-${i}`}
                            data-index={i}
                            role="option"
                            aria-selected={activeIndex === i}
                            onClick={() => navigate(item)}
                            onMouseEnter={() => setActiveIndex(i)}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                              activeIndex === i
                                ? "bg-accent/5 text-neutral-900"
                                : "text-neutral-700 hover:bg-neutral-50"
                            )}
                          >
                            <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                            <span className="flex-1 text-sm">{item.label}</span>
                            <Icon className="h-3.5 w-3.5 text-neutral-400" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* No query, no recent */}
                  {!query.trim() && recentItems.length === 0 && (
                    <p className="px-4 py-8 text-center text-sm text-neutral-400">
                      Start typing to search...
                    </p>
                  )}

                  {/* Query with results */}
                  {query.trim() && flatResults.length > 0 && (
                    <>
                      {(["Pages", "Sports", "Programs", "Actions"] as const).map(
                        (category) => {
                          const items = grouped[category];
                          if (!items?.length) return null;
                          const Icon = CATEGORY_ICONS[category] ?? FileText;
                          return (
                            <div key={category}>
                              <p className="px-4 py-1.5 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                                {category}
                              </p>
                              {items.map((item) => {
                                const globalIndex = flatResults.indexOf(item);
                                return (
                                  <button
                                    key={item.href + item.label}
                                    id={`cmd-item-${globalIndex}`}
                                    data-index={globalIndex}
                                    role="option"
                                    aria-selected={activeIndex === globalIndex}
                                    onClick={() => navigate(item)}
                                    onMouseEnter={() =>
                                      setActiveIndex(globalIndex)
                                    }
                                    className={cn(
                                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                                      activeIndex === globalIndex
                                        ? "bg-accent/5 text-neutral-900"
                                        : "text-neutral-700 hover:bg-neutral-50"
                                    )}
                                  >
                                    <Icon className="h-4 w-4 text-neutral-400 shrink-0" />
                                    <span className="flex-1 text-sm font-medium">
                                      {item.label}
                                    </span>
                                    {activeIndex === globalIndex && (
                                      <CornerDownLeft className="h-3.5 w-3.5 text-neutral-400" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          );
                        }
                      )}
                    </>
                  )}

                  {/* Query with no results */}
                  {query.trim() && flatResults.length === 0 && (
                    <p className="px-4 py-8 text-center text-sm text-neutral-400">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 border-t border-neutral-100 px-4 py-2.5 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    <ArrowDown className="h-3 w-3" />
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="h-3 w-3" />
                    Open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-neutral-200 px-1 text-[10px] font-mono">
                      Esc
                    </kbd>
                    Close
                  </span>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
