"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* -------------------------------------------------------------------------- */
/*  ScrollProgressBar                                                         */
/* -------------------------------------------------------------------------- */

interface ScrollProgressBarProps {
  className?: string;
}

/**
 * Fixed progress bar at the top of the page that shows page scroll progress.
 * Thin (3px) accent-colored bar that fills from left to right as the user
 * scrolls down the page.
 *
 * Uses framer-motion useScroll() and useTransform to map scroll progress
 * to scaleX for optimal performance (GPU-accelerated transform).
 */
export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (prefersReduced) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-accent",
        className
      )}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  ProgressBar                                                               */
/* -------------------------------------------------------------------------- */

interface ProgressBarProps {
  /** Current value (0-100 by default, or 0-max if max is provided) */
  value: number;
  /** Maximum value. Default 100 */
  max?: number;
  /** Accessible label for the progress bar */
  label?: string;
  /** Tailwind color class for the fill. Default "bg-accent" */
  color?: string;
  className?: string;
}

/**
 * Inline progress bar with animated fill. Supports a label, custom max value,
 * and different colors. The fill animates smoothly when the value changes.
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  color = "bg-accent",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-caption">
          <span className="font-medium text-neutral-700">{label}</span>
          <span className="tabular-nums text-neutral-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progress"}
      >
        <motion.div
          className={cn("absolute inset-y-0 left-0 rounded-full", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
