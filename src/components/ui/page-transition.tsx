"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /** Unique key for AnimatePresence to track mount/unmount. Typically the route path. */
  transitionKey?: string;
}

/**
 * Wrapper component that adds enter/exit animations to page content.
 * Wraps page content with a fade + slight slide animation using
 * framer-motion's AnimatePresence.
 *
 * - Enter: opacity 0 -> 1, y 8 -> 0 (0.4s, Apple ease)
 * - Exit: opacity 1 -> 0, y 0 -> -8 (0.2s)
 * - Respects prefers-reduced-motion (renders children without animation)
 */
export function PageTransition({
  children,
  className,
  transitionKey,
}: PageTransitionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: APPLE_EASE,
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          transition: {
            duration: 0.2,
            ease: APPLE_EASE,
          },
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
