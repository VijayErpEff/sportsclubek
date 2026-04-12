"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getStyles(variant: RevealVariant) {
  const hidden: Record<string, number | string> = { opacity: 0 };
  const visible: Record<string, number | string> = { opacity: 1 };

  switch (variant) {
    case "fade-up":
      hidden.y = 16;
      visible.y = 0;
      break;
    case "fade-left":
      hidden.x = -16;
      visible.x = 0;
      break;
    case "fade-right":
      hidden.x = 16;
      visible.x = 0;
      break;
    case "scale-up":
      hidden.scale = 0.95;
      visible.scale = 1;
      break;
    case "blur-in":
      hidden.filter = "blur(8px)";
      visible.filter = "blur(0px)";
      break;
  }

  return { hidden, visible };
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.5,
  className,
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const { hidden, visible } = getStyles(variant);

  return (
    <motion.div
      ref={ref}
      animate={inView ? visible : hidden}
      initial={false}
      transition={{ duration, delay, ease: APPLE_EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
