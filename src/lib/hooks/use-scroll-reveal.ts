"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, {
    amount: options?.threshold ?? 0.15,
    once: options?.once ?? true,
    margin: (options?.margin ?? "-60px") as `${number}px ${number}px ${number}px ${number}px`,
  });

  return {
    ref,
    isInView: prefersReduced ? true : isInView,
    prefersReduced: !!prefersReduced,
  };
}
