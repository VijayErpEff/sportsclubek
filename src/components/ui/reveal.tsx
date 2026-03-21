"use client";

import { type ReactNode, useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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

function getVariants(
  variant: RevealVariant,
  duration: number,
  delay: number
): Variants {
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

  return {
    hidden,
    visible: {
      ...visible,
      transition: { duration, delay, ease: APPLE_EASE },
    },
  };
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure hydration is complete before enabling animations
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // SSR + before hydration + reduced motion: render children fully visible
  if (!ready || prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      variants={getVariants(variant, duration, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
