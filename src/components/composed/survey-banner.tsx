"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const SURVEY_COMPLETED_KEY = "lus_survey_completed";
const SURVEY_DISMISSED_KEY = "lus_survey_dismissed";
const PAGE_COUNT_KEY = "lus_survey_pages";
const SHOW_DELAY_MS = 4000;
const AUTO_HIDE_MS = 15000;
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SurveyBanner() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if completed or dismissed
    if (localStorage.getItem(SURVEY_COMPLETED_KEY)) return;
    if (localStorage.getItem(SURVEY_DISMISSED_KEY)) return;

    // Track page views in session — only show after 2+ pages
    const count = parseInt(sessionStorage.getItem(PAGE_COUNT_KEY) || "0", 10) + 1;
    sessionStorage.setItem(PAGE_COUNT_KEY, String(count));
    if (count < 2) return;

    // Show after a short delay
    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);

    // Auto-hide after a longer duration
    const hideTimer = setTimeout(() => setVisible(false), SHOW_DELAY_MS + AUTO_HIDE_MS);

    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(SURVEY_DISMISSED_KEY, "true");
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
                  onClick={dismiss}
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
