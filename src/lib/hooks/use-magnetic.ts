"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
  type RefObject,
} from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticStyle {
  transform: string;
  transition: string;
}

interface UseMagneticOptions {
  /** How strongly the element follows the cursor (0-1). Default 0.3 */
  strength?: number;
  /** Transition duration when springing back in seconds. Default 0.4 */
  springDuration?: number;
}

interface UseMagneticReturn {
  style: CSSProperties;
}

const IDENTITY: MagneticStyle = {
  transform: "translate3d(0px, 0px, 0)",
  transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
};

/**
 * Hook for magnetic button/element effect.
 * On mousemove within the element, applies a CSS transform that pulls
 * the element toward the cursor. On mouseleave, springs back smoothly.
 * Uses requestAnimationFrame for smooth updates.
 *
 * @param ref - Ref to the element to make magnetic
 * @param options - Configuration for strength and spring behavior
 * @returns Object with style to spread on the element
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  options: UseMagneticOptions = {}
): UseMagneticReturn {
  const { strength = 0.3, springDuration = 0.4 } = options;
  const prefersReduced = useReducedMotion();
  const [style, setStyle] = useState<MagneticStyle>(IDENTITY);
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || prefersReduced) return;

      // Cancel any pending frame to avoid stacking
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setStyle({
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0)`,
          transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
        });
      });
    },
    [ref, strength, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    setStyle({
      ...IDENTITY,
      transition: `transform ${springDuration}s cubic-bezier(0.22, 1, 0.36, 1)`,
    });
  }, [springDuration]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ref, handleMouseMove, handleMouseLeave, prefersReduced]);

  // When reduced motion is preferred, return identity (no movement)
  if (prefersReduced) {
    return { style: IDENTITY };
  }

  return { style };
}
