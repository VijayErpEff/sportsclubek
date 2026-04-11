"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, MessageSquare } from "lucide-react";

const SURVEY_COMPLETED_KEY = "lus_survey_completed";
const SURVEY_DISMISSED_KEY = "lus_survey_dismissed";
const SURVEY_DISMISS_COUNT_KEY = "lus_survey_dismiss_count";
const HAS_VISITED_KEY = "lus_has_visited";
const SHOW_DELAY_MS = 4000;
const AUTO_HIDE_MS = 15000;
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Progressive backoff: 3 days → 7 days → 14 days → 30 days (cap)
const BACKOFF_DAYS = [3, 7, 14, 30];

function getCooldownMs(dismissCount: number): number {
  const idx = Math.min(dismissCount - 1, BACKOFF_DAYS.length - 1);
  return BACKOFF_DAYS[idx] * 24 * 60 * 60 * 1000;
}

function isInCooldown(): boolean {
  const dismissedAt = localStorage.getItem(SURVEY_DISMISSED_KEY);
  if (!dismissedAt) return false;
  const dismissCount = parseInt(localStorage.getItem(SURVEY_DISMISS_COUNT_KEY) || "1", 10);
  const elapsed = Date.now() - parseInt(dismissedAt, 10);
  return elapsed < getCooldownMs(dismissCount);
}

export function SurveyBanner() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if completed (permanent) or still in cooldown
    if (localStorage.getItem(SURVEY_COMPLETED_KEY)) return;
    if (isInCooldown()) return;

    // Mark as visited for future reference
    localStorage.setItem(HAS_VISITED_KEY, "true");

    // Show after a short delay
    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);

    // Auto-hide after a longer duration
    const hideTimer = setTimeout(() => setVisible(false), SHOW_DELAY_MS + AUTO_HIDE_MS);

    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const dismiss = () => {
    setVisible(false);
    const count = parseInt(localStorage.getItem(SURVEY_DISMISS_COUNT_KEY) || "0", 10) + 1;
    localStorage.setItem(SURVEY_DISMISS_COUNT_KEY, String(count));
    localStorage.setItem(SURVEY_DISMISSED_KEY, String(Date.now()));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: APPLE_EASE }}
          className="fixed left-3 right-3 md:left-auto md:right-6 md:max-w-sm z-[102]"
          style={{ top: "calc(var(--banner-height, 0px) + 4rem + 0.75rem)" }}
        >
          <div className="rounded-xl bg-gradient-to-r from-accent to-accent-hover shadow-lg shadow-accent/20 p-4 text-white relative">
            <button
              onClick={dismiss}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Dismiss survey prompt"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 shrink-0">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">
                  We&rsquo;d love your feedback!
                </p>
                <p className="text-xs text-white/80 mt-0.5">
                  Help us improve — takes less than a minute.
                </p>
                <Link
                  href="/survey"
                  onClick={() => setVisible(false)}
                  className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-white underline underline-offset-2 hover:text-white/90 transition-colors"
                >
                  Take the Survey &rarr;
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
