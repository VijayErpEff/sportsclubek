"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { SPORTS } from "@/lib/constants/site";

const STORAGE_KEY = "lus_sport_pref";
const DISMISSED_KEY = "lus_sport_pref_dismissed";
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sportIcons: Record<string, string> = {
  baseball: "\u26be",
  cricket: "\ud83c\udfcf",
  badminton: "\ud83c\udff8",
  pickleball: "\ud83c\udfd3",
  volleyball: "\ud83c\udfd0",
  soccer: "\u26bd",
};

export function SportPreference() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't compete with initial page load
    const timer = setTimeout(() => {
      try {
        const existingPref = localStorage.getItem(STORAGE_KEY);
        const dismissed = localStorage.getItem(DISMISSED_KEY);
        if (!existingPref && !dismissed) {
          setVisible(true);
        }
      } catch {
        // localStorage unavailable
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSport = useCallback((slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const handleSave = useCallback(() => {
    try {
      if (selected.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
      }
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // localStorage unavailable
    }

    setConfirmed(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmed(false);
    }, 1200);
  }, [selected]);

  const handleDismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // localStorage unavailable
    }
    setVisible(false);
  }, []);

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: 0.4, ease: APPLE_EASE },
      };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          {/* Bottom sheet */}
          <motion.div
            role="dialog"
            aria-label="Sport preference selection"
            aria-modal="true"
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
            {...motionProps}
          >
            <div className="p-6 pb-8 max-w-lg mx-auto">
              {/* Handle bar */}
              <div
                className="w-10 h-1 rounded-full bg-neutral-200 mx-auto mb-6"
                aria-hidden="true"
              />

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {confirmed ? (
                /* Confirmation state */
                <div className="text-center py-8">
                  <motion.div
                    initial={prefersReduced ? undefined : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="h-8 w-8 text-accent" />
                  </motion.div>
                  <p className="font-display text-lg font-bold text-neutral-900">
                    Got it!
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    We&apos;ll personalize your experience.
                  </p>
                </div>
              ) : (
                /* Selection state */
                <>
                  <div className="text-center mb-6">
                    <h2 className="font-display text-subsection font-bold text-neutral-900">
                      What brings you to LevelUP?
                    </h2>
                    <p className="text-sm text-neutral-500 mt-2">
                      Select your sports to personalize your experience. Pick
                      one or more.
                    </p>
                  </div>

                  {/* Sport tiles */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {SPORTS.map((sport) => {
                      const isSelected = selected.includes(sport.slug);
                      return (
                        <button
                          key={sport.slug}
                          onClick={() => handleToggleSport(sport.slug)}
                          className={cn(
                            "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all min-h-[44px]",
                            isSelected
                              ? "border-accent bg-accent/5 shadow-sm"
                              : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                          )}
                          aria-pressed={isSelected}
                        >
                          <span
                            className="text-2xl"
                            role="img"
                            aria-hidden="true"
                          >
                            {sportIcons[sport.slug] ?? "\u26bd"}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              isSelected
                                ? "text-accent"
                                : "text-neutral-700"
                            )}
                          >
                            {sport.name}
                          </span>
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-accent" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Just browsing */}
                  <button
                    onClick={handleDismiss}
                    className="w-full text-center text-sm text-neutral-500 hover:text-neutral-700 py-2 transition-colors min-h-[44px]"
                  >
                    Just browsing
                  </button>

                  {/* Continue */}
                  <Button
                    onClick={handleSave}
                    className="w-full mt-3"
                    size="lg"
                    disabled={selected.length === 0}
                  >
                    Continue
                    {selected.length > 0 && (
                      <span className="ml-1 text-white/70">
                        ({selected.length}{" "}
                        {selected.length === 1 ? "sport" : "sports"})
                      </span>
                    )}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
