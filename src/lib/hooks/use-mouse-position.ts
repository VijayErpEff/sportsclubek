"use client";

import { useRef, useState, useEffect, useCallback, type RefObject } from "react";

interface MousePosition {
  /** Normalized X position from -1 (left) to 1 (right) relative to element center */
  x: number;
  /** Normalized Y position from -1 (top) to 1 (bottom) relative to element center */
  y: number;
  /** Whether the mouse is currently inside the element */
  isInside: boolean;
}

const INITIAL_STATE: MousePosition = { x: 0, y: 0, isInside: false };

/**
 * Tracks mouse position relative to an element.
 * Returns normalized coordinates from -1 to 1 where (0,0) is center.
 *
 * @param externalRef - Optional external ref to use instead of creating one
 * @returns Object with ref to attach, and { x, y, isInside } values
 */
export function useMousePosition<T extends HTMLElement = HTMLDivElement>(
  externalRef?: RefObject<T | null>
) {
  const internalRef = useRef<T>(null);
  const ref = externalRef ?? internalRef;
  const [position, setPosition] = useState<MousePosition>(INITIAL_STATE);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = ((e.clientX - centerX) / (rect.width / 2));
      const y = ((e.clientY - centerY) / (rect.height / 2));

      setPosition({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
        isInside: true,
      });
    },
    [ref]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition(INITIAL_STATE);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return { ref, ...position };
}
