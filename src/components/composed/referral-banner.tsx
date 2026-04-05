"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Gift, Copy, Check, X, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { trackReferralCopy } from "@/lib/analytics";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const REFERRAL_URL = "https://levelupsports.us/refer?code=FRIEND10";

export function ReferralBanner({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_URL);
    } catch {
      const input = document.createElement("input");
      input.value = REFERRAL_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    trackReferralCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (isDismissed) return null;

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReduced ? {} : { opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        className
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-primary" aria-hidden="true" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
        aria-label="Dismiss referral banner"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Content */}
      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                Share the Love, Earn Rewards
              </h3>
            </div>
            <p className="text-white/80 text-sm md:text-base max-w-lg mb-2">
              Refer a friend and you both get{" "}
              <span className="font-bold text-white">$10 off</span> your next month.
              It&apos;s that simple.
            </p>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Users className="h-3.5 w-3.5" />
              <span>47 families joined through referrals this month</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              {!showLink ? (
                <motion.div
                  key="button"
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReduced ? {} : { opacity: 0 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowLink(true)}
                    className="bg-white text-accent hover:bg-white/90 shadow-lg whitespace-nowrap"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Get Your Referral Link
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="link"
                  initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, ease: APPLE_EASE }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2">
                    <input
                      type="text"
                      value={REFERRAL_URL}
                      readOnly
                      className="flex-1 bg-transparent text-white text-sm font-mono focus:outline-none min-w-0"
                      aria-label="Referral link"
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md transition-colors shrink-0",
                        copied
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                      )}
                      aria-label={copied ? "Link copied" : "Copy referral link"}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <motion.p
                      initial={prefersReduced ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-white/80 text-center"
                      role="status"
                    >
                      Link copied to clipboard!
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
