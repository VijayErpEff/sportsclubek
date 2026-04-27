"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAdmin } from "@/lib/context/admin-context";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BannerMessage {
  text: string;
  linkText: string;
  linkUrl: string;
}

interface BannerConfig {
  enabled: boolean;
  /** Single-message form (legacy/simple). */
  text?: string;
  linkText?: string;
  linkUrl?: string;
  /** Multi-message form — rotates every `rotateMs` ms (default 6000). */
  messages?: BannerMessage[];
  /** Rotation interval in ms when `messages` is used. Default 6000. */
  rotateMs?: number;
  style: "gradient" | "solid" | "subtle";
  dismissible: boolean;
}

/** Coerce config into a non-empty list of messages. */
function getMessages(config: BannerConfig): BannerMessage[] {
  if (config.messages && config.messages.length > 0) return config.messages;
  if (config.text) {
    return [
      {
        text: config.text,
        linkText: config.linkText ?? "",
        linkUrl: config.linkUrl ?? "",
      },
    ];
  }
  return [];
}

const STORAGE_KEY = "levelup_banner_config";
const DISMISS_KEY = "levelup_banner_dismissed";
const DATA_URL = "/data/banner.json";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Simple deterministic hash for short strings (used for dismiss tracking). */
function hashText(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

/** Hash representing the full set of messages — used as the dismiss key. */
function hashMessages(messages: BannerMessage[]): string {
  return hashText(messages.map((m) => `${m.text}|${m.linkUrl}`).join("§"));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AnnouncementBanner() {
  const prefersReducedMotion = useReducedMotion();
  const admin = useAdmin();

  const [config, setConfig] = useState<BannerConfig | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState<BannerConfig | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);

  // Normalize config into a message list once per render.
  const messages = config ? getMessages(config) : [];

  // ── Load config ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    // 1. Try localStorage override first
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BannerConfig;
        if (!cancelled) {
          setConfig(parsed);
          return; // localStorage wins — skip fetch
        }
      }
    } catch {
      // ignore parse errors
    }

    // 2. Fetch from JSON fallback
    fetch(DATA_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: BannerConfig) => {
        if (!cancelled) setConfig(data);
      })
      .catch(() => {
        // No config available — banner stays hidden
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Dismiss check ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!config) return;
    const msgs = getMessages(config);
    if (msgs.length === 0) return;
    try {
      const saved = sessionStorage.getItem(DISMISS_KEY);
      if (saved === hashMessages(msgs)) {
        setDismissed(true);
      }
    } catch {
      // ignore
    }
  }, [config]);


  // ── Measure banner height via ResizeObserver → CSS custom property ──────
  const visible = config?.enabled && !dismissed;

  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.setProperty("--banner-height", "0px");
      return;
    }

    const el = bannerRef.current;
    if (!el) {
      root.style.setProperty("--banner-height", "0px");
      return;
    }

    const ro = new ResizeObserver(([entry]) => {
      const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      root.style.setProperty("--banner-height", `${h}px`);
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [visible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--banner-height");
    };
  }, []);

  // ── Dismiss handler ──────────────────────────────────────────────────────
  const handleDismiss = useCallback(() => {
    if (!config) return;
    const msgs = getMessages(config);
    if (msgs.length === 0) return;
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, hashMessages(msgs));
    } catch {
      // storage full — still dismiss in-memory
    }
  }, [config]);

  // ── Edit modal helpers ───────────────────────────────────────────────────
  const openEdit = useCallback(() => {
    if (config) setDraft({ ...config });
    setEditOpen(true);
  }, [config]);

  const saveEdit = useCallback(() => {
    if (!draft) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }
    setConfig(draft);
    setDismissed(false);
    try {
      sessionStorage.removeItem(DISMISS_KEY);
    } catch {
      // ignore
    }
    setEditOpen(false);
  }, [draft]);

  const resetToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(DISMISS_KEY);
    } catch {
      // ignore
    }
    setDismissed(false);
    setEditOpen(false);

    fetch(DATA_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: BannerConfig) => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  // ── Style map ────────────────────────────────────────────────────────────
  const styleMap: Record<
    BannerConfig["style"],
    { wrapper: string; link: string; dismiss: string }
  > = {
    gradient: {
      wrapper:
        "bg-gradient-to-r from-[#0F2440] via-[#1B3A5C] to-[#0F2440] text-white",
      link: "text-[#A8E6CF] hover:text-white",
      dismiss: "text-white/50 hover:text-white",
    },
    solid: {
      wrapper: "bg-[#0F2440] text-white",
      link: "text-[#2BA84A] hover:text-white",
      dismiss: "text-white/50 hover:text-white",
    },
    subtle: {
      wrapper:
        "bg-neutral-50 text-neutral-900 border-b border-neutral-200",
      link: "text-accent hover:text-accent-hover",
      dismiss: "text-neutral-400 hover:text-neutral-700",
    },
  };

  // ── Animation variants ───────────────────────────────────────────────────
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  // ── Render ───────────────────────────────────────────────────────────────
  const style = config ? styleMap[config.style] ?? styleMap.gradient : styleMap.gradient;

  return (
    <>
      <AnimatePresence>
        {visible && config && messages.length > 0 && (
          <motion.div
            key="announcement-banner"
            {...motionProps}
            className="fixed inset-x-0 top-0 z-[110] overflow-hidden"
          >
            <div
              ref={bannerRef}
              className={cn(
                "relative flex items-center justify-center min-h-[40px] py-2 pl-4 pr-10",
                style.wrapper
              )}
            >
              {/* Banner content — every message stacked, each its own clickable row */}
              <ul
                className={cn(
                  "w-full max-w-5xl mx-auto flex flex-col items-center text-center",
                  messages.length > 1
                    ? "divide-y divide-current/15"
                    : ""
                )}
              >
                {messages.map((msg, i) => (
                  <li
                    key={`${i}-${msg.linkUrl}`}
                    className={cn(
                      "w-full text-[13px] font-medium leading-snug",
                      messages.length > 1 ? "py-1.5" : "py-0"
                    )}
                  >
                    <span>{msg.text}</span>
                    {msg.linkText && msg.linkUrl && (
                      <>
                        {" "}
                        <Link
                          href={msg.linkUrl}
                          className={cn(
                            "inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors",
                            style.link
                          )}
                        >
                          {msg.linkText}
                          <span aria-hidden="true">&thinsp;&rarr;</span>
                        </Link>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* Admin pencil button */}
              {admin.adminMode && (
                <button
                  onClick={openEdit}
                  className={cn(
                    "absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded transition-colors",
                    config.style === "subtle"
                      ? "text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60"
                      : "text-white/40 hover:text-white hover:bg-white/10"
                  )}
                  aria-label="Edit announcement banner"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Dismiss button */}
              {config.dismissible && (
                <button
                  onClick={handleDismiss}
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full transition-colors",
                    style.dismiss
                  )}
                  aria-label="Dismiss announcement"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {editOpen && draft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 w-[90%] max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-5">
                Edit Announcement Banner
              </h3>

              <div className="space-y-4">
                {/* Text */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">
                    Text
                  </span>
                  <input
                    type="text"
                    value={draft.text ?? ""}
                    onChange={(e) =>
                      setDraft((d) => (d ? { ...d, text: e.target.value } : d))
                    }
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 outline-none focus:border-accent/50 transition-colors"
                  />
                </label>

                {/* Link Text */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">
                    Link Text
                  </span>
                  <input
                    type="text"
                    value={draft.linkText ?? ""}
                    onChange={(e) =>
                      setDraft((d) =>
                        d ? { ...d, linkText: e.target.value } : d
                      )
                    }
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 outline-none focus:border-accent/50 transition-colors"
                  />
                </label>

                {/* Link URL */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">
                    Link URL
                  </span>
                  <input
                    type="text"
                    value={draft.linkUrl ?? ""}
                    onChange={(e) =>
                      setDraft((d) =>
                        d ? { ...d, linkUrl: e.target.value } : d
                      )
                    }
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 outline-none focus:border-accent/50 transition-colors"
                  />
                </label>

                {/* Style */}
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">
                    Style
                  </span>
                  <select
                    value={draft.style}
                    onChange={(e) =>
                      setDraft((d) =>
                        d
                          ? {
                              ...d,
                              style: e.target.value as BannerConfig["style"],
                            }
                          : d
                      )
                    }
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 outline-none focus:border-accent/50 transition-colors"
                  >
                    <option value="gradient">Gradient</option>
                    <option value="solid">Solid</option>
                    <option value="subtle">Subtle</option>
                  </select>
                </label>

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={draft.dismissible}
                      onChange={(e) =>
                        setDraft((d) =>
                          d ? { ...d, dismissible: e.target.checked } : d
                        )
                      }
                      className="rounded border-neutral-300 text-accent focus:ring-accent/30"
                    />
                    Dismissible
                  </label>
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={draft.enabled}
                      onChange={(e) =>
                        setDraft((d) =>
                          d ? { ...d, enabled: e.target.checked } : d
                        )
                      }
                      className="rounded border-neutral-300 text-accent focus:ring-accent/30"
                    />
                    Enabled
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setEditOpen(false)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                >
                  Save
                </button>
              </div>
              <button
                onClick={resetToDefault}
                className="mt-3 w-full py-2 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                Reset to Default
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
