"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SPORTS } from "@/lib/constants/site";

const VISIT_COUNT_KEY = "lus_visit_count";
const LAST_VISIT_KEY = "lus_last_visit";
const SPORT_PREF_KEY = "lus_sport_pref";
const BANNER_DISMISSED_KEY = "lus_welcome_dismissed";

const ONE_HOUR_MS = 60 * 60 * 1000;
const AUTO_HIDE_MS = 8000;
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getSportName(slug: string): string {
  const sport = SPORTS.find((s) => s.slug === slug);
  return sport?.name ?? slug;
}

export function ReturningVisitor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [sportPrefs, setSportPrefs] = useState<string[]>([]);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    try {
      const now = Date.now();
      const lastVisitRaw = localStorage.getItem(LAST_VISIT_KEY);
      const countRaw = localStorage.getItem(VISIT_COUNT_KEY);
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);

      let count = countRaw ? parseInt(countRaw, 10) : 0;
      const lastVisit = lastVisitRaw ? parseInt(lastVisitRaw, 10) : 0;

      if (count === 0) {
        // First visit ever
        count = 1;
        localStorage.setItem(VISIT_COUNT_KEY, "1");
        localStorage.setItem(LAST_VISIT_KEY, String(now));
        return;
      }

      // Only increment if more than 1 hour since last visit
      if (now - lastVisit > ONE_HOUR_MS) {
        count += 1;
        localStorage.setItem(VISIT_COUNT_KEY, String(count));
        localStorage.setItem(LAST_VISIT_KEY, String(now));
        // Clear the dismissed flag for the new session
        localStorage.removeItem(BANNER_DISMISSED_KEY);
      }

      setVisitCount(count);

      // Show banner for returning visitors (2+ visits) unless dismissed this session
      if (count >= 2 && !dismissed) {
        // Read sport preferences
        const prefRaw = localStorage.getItem(SPORT_PREF_KEY);
        if (prefRaw) {
          try {
            const prefs = JSON.parse(prefRaw) as string[];
            setSportPrefs(prefs);
          } catch {
            // Invalid JSON
          }
        }

        // Small delay so it appears after page settle
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Auto-hide after 8 seconds
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, AUTO_HIDE_MS);

    return () => clearTimeout(timer);
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(BANNER_DISMISSED_KEY, "true");
    } catch {
      // localStorage unavailable
    }
  }, []);

  const primarySport = sportPrefs.length > 0 ? sportPrefs[0] : null;
  const primarySportName = primarySport ? getSportName(primarySport) : null;

  const message =
    primarySportName
      ? `Welcome back! Ready for more ${primarySportName}?`
      : "Welcome back to LevelUP!";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={
            prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }
          }
          transition={{ duration: 0.35, ease: APPLE_EASE }}
          className={cn(
            "fixed left-0 right-0 z-[101]",
            "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg"
          )}
          style={{ top: "calc(var(--banner-height, 0px) + 4rem)" }}
        >
          <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-3">
              {/* Message */}
              <p className="text-sm font-medium truncate">
                {message}
              </p>

              {/* Quick actions */}
              <div className="flex items-center gap-2 shrink-0">
                {primarySport ? (
                  <>
                    <Link
                      href={`/${primarySport}`}
                      onClick={handleDismiss}
                      className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[44px]"
                    >
                      Explore {primarySportName}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/schedule"
                      onClick={handleDismiss}
                      className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[44px]"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">View </span>
                      Schedule
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/schedule"
                    onClick={handleDismiss}
                    className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[44px]"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    View Schedule
                  </Link>
                )}

                {/* Dismiss */}
                <button
                  onClick={handleDismiss}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Dismiss welcome banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar for auto-dismiss */}
          <motion.div
            className="h-0.5 bg-white/30 origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: AUTO_HIDE_MS / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
