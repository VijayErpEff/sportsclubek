"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Tailwind gradient from-color class. Default "from-primary" */
  from?: string;
  /** Tailwind gradient via-color class. Default "via-accent" */
  via?: string;
  /** Tailwind gradient to-color class. Default "to-secondary" */
  to?: string;
  /** Whether the gradient animates (shifts position). Default true */
  animate?: boolean;
}

/**
 * Animated gradient text component.
 * Text with a flowing gradient background that shifts colors slowly.
 * Uses background-clip: text for the gradient effect and CSS animation
 * for the shifting movement.
 *
 * Respects prefers-reduced-motion (static gradient when reduced).
 */
export function GradientText({
  children,
  className,
  from = "from-primary",
  via = "via-accent",
  to = "to-secondary",
  animate = true,
}: GradientTextProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        shouldAnimate && "animate-[gradient-shift_4s_ease-in-out_infinite] bg-[length:200%_auto]",
        !shouldAnimate && "bg-[length:100%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}
