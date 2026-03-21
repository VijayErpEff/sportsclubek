"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ScrollSectionProps {
  /**
   * Render prop that receives scroll progress (0-1).
   * Use this to transform child content based on scroll position.
   */
  children: (progress: number) => ReactNode;
  className?: string;
  /** Total scroll distance. Default "200vh" */
  height?: string;
  /** Top offset for sticky positioning. Default "0px" */
  stickyOffset?: string;
}

/**
 * Helper hook to subscribe to a MotionValue and return its current numeric value.
 * Re-renders the component whenever the value changes.
 */
function useMotionValueState(motionValue: MotionValue<number>): number {
  const [value, setValue] = useState<number>(motionValue.get());

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (v: number) => {
      setValue(v);
    });
    return unsubscribe;
  }, [motionValue]);

  return value;
}

/**
 * Inner component that subscribes to the MotionValue and re-renders
 * children with the current numeric progress.
 */
function ScrollSectionContent({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: (progress: number) => ReactNode;
}) {
  const currentProgress = useMotionValueState(progress);
  return <>{children(currentProgress)}</>;
}

/**
 * Scroll-pinned section component.
 * The section "sticks" at the top while internal content transforms
 * based on scroll progress. Provides a 0-1 progress value to children
 * via render prop pattern.
 *
 * Uses framer-motion useScroll with target ref and useTransform.
 * Respects prefers-reduced-motion (renders at progress 1 — fully revealed).
 */
export function ScrollSection({
  children,
  className,
  height = "200vh",
  stickyOffset = "0px",
}: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // For reduced motion, show content at full progress
  if (prefersReduced) {
    return (
      <div className={cn(className)}>
        <div style={{ height: "100vh" }}>{children(1)}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height }} className={cn(className)}>
      <div
        className="sticky overflow-hidden"
        style={{
          top: stickyOffset,
          height: "100vh",
        }}
      >
        <ScrollSectionContent progress={progress}>
          {children}
        </ScrollSectionContent>
      </div>
    </div>
  );
}
