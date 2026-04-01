"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { AdminAuth } from "@/lib/hooks/use-admin-auth";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PinModalProps {
  auth: AdminAuth;
  variant?: "dark" | "light";
}

export function PinModal({ auth, variant = "light" }: PinModalProps) {
  const dark = variant === "dark";

  return (
    <AnimatePresence>
      {auth.pinModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={auth.closePinModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={cn(
              "rounded-2xl p-8 w-[90%] max-w-sm text-center shadow-2xl border",
              dark
                ? "bg-[#1B3A5C] border-white/10"
                : "bg-white border-neutral-200"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className={cn(
                "font-display text-lg font-bold mb-5",
                dark ? "text-white" : "text-neutral-900"
              )}
            >
              Enter Admin PIN
            </h3>
            <input
              ref={auth.pinInputRef}
              type="password"
              maxLength={6}
              value={auth.pinValue}
              onChange={(e) => {
                auth.setPinValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") auth.submitPin();
                if (e.key === "Escape") auth.closePinModal();
              }}
              placeholder="PIN"
              className={cn(
                "w-full px-4 py-3 rounded-xl text-center font-mono text-lg tracking-[0.2em] outline-none transition-colors border",
                dark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#2BA84A]/50"
                  : "bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-300 focus:border-accent/50"
              )}
            />
            {auth.pinError && (
              <p className="text-red-500 text-sm mt-2">Incorrect PIN</p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={auth.closePinModal}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors border",
                  dark
                    ? "border-white/10 text-white/50 hover:bg-white/5"
                    : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                )}
              >
                Cancel
              </button>
              <button
                onClick={auth.submitPin}
                className={cn(
                  "flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors border",
                  dark
                    ? "bg-[#2BA84A]/20 border-[#2BA84A]/30 text-[#2BA84A] hover:bg-[#2BA84A]/30"
                    : "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
                )}
              >
                Enter
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
