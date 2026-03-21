"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. Default 8 */
  tiltAmount?: number;
  /** Show glare/shine effect that follows the mouse. Default true */
  glare?: boolean;
  /** Scale on hover. Default 1.02 */
  scale?: number;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  isHovering: boolean;
}

const INITIAL_TILT: TiltState = {
  rotateX: 0,
  rotateY: 0,
  glareX: 50,
  glareY: 50,
  isHovering: false,
};

/**
 * 3D perspective tilt card component.
 * On mouse move, card tilts in the direction of the mouse with a subtle
 * 3D perspective effect (like Apple TV app icons). Includes a glare/shine
 * effect that follows the mouse.
 * Respects prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className,
  tiltAmount = 8,
  glare = true,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const rafId = useRef<number>(0);
  const [tilt, setTilt] = useState<TiltState>(INITIAL_TILT);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // rotateX is based on Y position (tilt up/down)
        // rotateY is based on X position (tilt left/right)
        const rotateX = (0.5 - y) * tiltAmount * 2;
        const rotateY = (x - 0.5) * tiltAmount * 2;

        setTilt({
          rotateX,
          rotateY,
          glareX: x * 100,
          glareY: y * 100,
          isHovering: true,
        });
      });
    },
    [tiltAmount, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setTilt(INITIAL_TILT);
  }, []);

  const perspectiveStyle: CSSProperties = {
    perspective: "1000px",
  };

  const cardStyle: CSSProperties = prefersReduced
    ? {}
    : {
        transform: tilt.isHovering
          ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.isHovering
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      };

  const glareStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    background: tilt.isHovering
      ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`
      : "none",
    opacity: tilt.isHovering ? 1 : 0,
    transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    zIndex: 1,
  };

  return (
    <div style={perspectiveStyle} className="inline-block">
      <div
        ref={cardRef}
        className={cn("relative overflow-hidden", className)}
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {glare && !prefersReduced && (
          <div style={glareStyle} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
