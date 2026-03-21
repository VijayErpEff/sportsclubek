"use client";

import { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface TiltStyle {
  transform: string;
  transition: string;
}

const IDENTITY: TiltStyle = {
  transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
  transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
};

export function useTilt(maxDegrees = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [style, setStyle] = useState<TiltStyle>(IDENTITY);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxDegrees * 2;
      const rotateY = (x - 0.5) * maxDegrees * 2;
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxDegrees, prefersReduced]
  );

  const onMouseLeave = useCallback(() => {
    setStyle(IDENTITY);
  }, []);

  return {
    ref,
    style: prefersReduced ? IDENTITY : style,
    handlers: prefersReduced
      ? {}
      : { onMouseMove, onMouseLeave },
  };
}
