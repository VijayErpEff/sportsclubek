"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, Calendar, ArrowRight, Bell, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SPORTS } from "@/lib/constants/site";
import { captureLead } from "@/lib/leads";

const VISIT_COUNT_KEY = "lus_visit_count";
const LAST_VISIT_KEY = "lus_last_visit";
const SPORT_PREF_KEY = "lus_sport_pref";
const BANNER_DISMISSED_KEY = "lus_welcome_dismissed";
const SUBSCRIBED_KEY = "lus_returning_subscribed";

const ONE_HOUR_MS = 60 * 60 * 1000;
const AUTO_HIDE_MS = 12000;
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getSportName(slug: string): string {
  const sport = SPORTS.find((s) => s.slug === slug);
  return sport?.name ?? slug;
}

export function ReturningVisitor() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [sportPrefs, setSportPrefs] = useState<string[]>([]);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [emailExpanded, setEmailExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    try {
      const now = Date.now();
      const lastVisitRaw = localStorage.getItem(LAST_VISIT_KEY);
      const countRaw = localStorage.getItem(VISIT_COUNT_KEY);
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
      const subscribed = localStorage.getItem(SUBSCRIBED_KEY);

      if (subscribed) setAlreadySubscribed(true);

      let count = countRaw ? parseInt(countRaw, 10) : 0;
      const lastVisit = lastVisitRaw ? parseInt(lastVisitRaw, 10) : 0;

      if (count === 0) {
        count = 1;
        localStorage.setItem(VISIT_COUNT_KEY, "1");
        localStorage.setItem(LAST_VISIT_KEY, String(now));
        return;
      }

      if (now - lastVisit > ONE_HOUR_MS) {
        count += 1;
        localStorage.setItem(VISIT_COUNT_KEY, String(count));
        localStorage.setItem(LAST_VISIT_KEY, String(now));
        localStorage.removeItem(BANNER_DISMISSED_KEY);
      }

      if (count >= 2 && !dismissed) {
        const prefRaw = localStorage.getItem(SPORT_PREF_KEY);
        if (prefRaw) {
          try {
            setSportPrefs(JSON.parse(prefRaw) as string[]);
          } catch {}
        }
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  // Auto-hide (paused when email is expanded)
  useEffect(() => {
    if (!visible || emailExpanded) return;
    const timer = setTimeout(() => handleDismiss(), AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [visible, emailExpanded]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(BANNER_DISMISSED_KEY, "true"); } catch {}
  }, []);

  const handleSubmitEmail = useCallback(async () => {
    if (!email.trim()) return;
    setSubmitStatus("loading");
    const sportNames = sportPrefs.map(getSportName);
    await captureLead({
      email: email.trim(),
      source: "returning_visitor",
      context: sportNames.length > 0 ? `Follows: ${sportNames.join(", ")}` : "General alerts",
    });
    try { localStorage.setItem(SUBSCRIBED_KEY, "true"); } catch {}
    setSubmitStatus("success");
    setTimeout(() => handleDismiss(), 2000);
  }, [email, sportPrefs, handleDismiss]);

  const primarySport = sportPrefs.length > 0 ? sportPrefs[0] : null;
  const primarySportName = primarySport ? getSportName(primarySport) : null;
  const alertLabel = primarySportName ? `Get ${primarySportName} Alerts` : "Get Alerts";

  const message = primarySportName
    ? `Welcome back! Ready for more ${primarySportName}?`
    : "Welcome back to LevelUP!";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          layout
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: APPLE_EASE }}
          className="fixed left-0 right-0 z-[101] bg-gradient-to-r from-primary to-primary-light text-white shadow-lg"
          style={{ top: "calc(var(--banner-height, 0px) + 4rem)" }}
        >
          <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3 py-3">
              <p className="text-sm font-medium truncate">{message}</p>

              <div className="flex items-center gap-2 shrink-0">
                {/* Email expanded state */}
                {emailExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-1.5"
                  >
                    {submitStatus === "success" ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                        <Check className="h-3.5 w-3.5" /> You&apos;re in!
                      </span>
                    ) : (
                      <>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleSubmitEmail(); }}
                          placeholder="Your email"
                          autoFocus
                          className="h-8 w-36 sm:w-44 px-3 rounded-full bg-white/15 border border-white/20 text-white text-xs placeholder:text-white/50 focus:outline-none focus:bg-white/20"
                        />
                        <button
                          onClick={handleSubmitEmail}
                          disabled={!email.trim() || submitStatus === "loading"}
                          className="h-8 px-3 rounded-full bg-white text-primary text-xs font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                        >
                          {submitStatus === "loading" ? <Loader2 className="h-3 w-3 animate-spin" /> : "Go"}
                        </button>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <>
                    {/* Alert CTA — only if not already subscribed */}
                    {!alreadySubscribed && (
                      <button
                        onClick={() => setEmailExpanded(true)}
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[36px]"
                      >
                        <Bell className="h-3 w-3" />
                        <span className="hidden sm:inline">{alertLabel}</span>
                        <span className="sm:hidden">Alerts</span>
                      </button>
                    )}

                    {primarySport && (
                      <Link
                        href={`/${primarySport}`}
                        onClick={handleDismiss}
                        className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[36px]"
                      >
                        Explore
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}

                    <Link
                      href="/schedule"
                      onClick={handleDismiss}
                      className="inline-flex items-center gap-1 rounded-full bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors min-h-[36px]"
                    >
                      <Calendar className="h-3 w-3" />
                      <span className="hidden sm:inline">Schedule</span>
                    </Link>
                  </>
                )}

                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar — paused when email expanded */}
          {!emailExpanded && (
            <motion.div
              className="h-0.5 bg-white/30 origin-left"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: AUTO_HIDE_MS / 1000, ease: "linear" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
