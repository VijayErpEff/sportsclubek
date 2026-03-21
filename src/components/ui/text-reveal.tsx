"use client";

import { useRef, useMemo, createElement } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";

type TagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextRevealProps {
  /** The text content to reveal */
  text: string;
  className?: string;
  /** Reveal mode: word-by-word or character-by-character. Default "word" */
  mode?: "word" | "char";
  /** HTML tag to render. Default "p" */
  tag?: TagName;
}

/**
 * Text that reveals word by word or character by character as it scrolls
 * into view. Apple-style text reveal where each segment fades from grey
 * to full color based on scroll progress.
 *
 * Each word/char has a staggered threshold so they appear sequentially.
 * Respects prefers-reduced-motion (shows all text immediately).
 */
export function TextReveal({
  text,
  className,
  mode = "word",
  tag = "p",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const segments = useMemo(() => {
    if (mode === "char") {
      return text.split("");
    }
    return text.split(" ");
  }, [text, mode]);

  // When reduced motion is preferred, render plain text
  if (prefersReduced) {
    return createElement(
      tag,
      { className: cn(className) },
      text
    );
  }

  return (
    <div ref={containerRef}>
      {createElement(
        tag,
        {
          className: cn("flex flex-wrap", className),
          "aria-label": text,
        },
        segments.map((segment, i) => (
          <RevealSegment
            key={`${segment}-${i}`}
            segment={segment}
            index={i}
            total={segments.length}
            progress={scrollYProgress}
            mode={mode}
          />
        ))
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  RevealSegment — individual word or character                              */
/* -------------------------------------------------------------------------- */

interface RevealSegmentProps {
  segment: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  mode: "word" | "char";
}

function RevealSegment({
  segment,
  index,
  total,
  progress,
  mode,
}: RevealSegmentProps) {
  // Calculate the range within the overall progress (0-1) where this
  // segment should animate. We distribute segments evenly across the
  // scroll range, with each segment occupying a small portion.
  const segmentStart = index / total;
  const segmentEnd = Math.min(segmentStart + 1 / total + 0.05, 1);

  const opacity = useTransform(
    progress,
    [segmentStart, segmentEnd],
    [0.2, 1]
  );

  const color = useTransform(
    progress,
    [segmentStart, segmentEnd],
    ["#8A8A9A", "#1A1A2E"]
  );

  // For word mode, add space after each word except the last
  const suffix = mode === "word" ? "\u00A0" : "";

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block will-change-[opacity,color]"
      aria-hidden="true"
    >
      {segment}
      {suffix}
    </motion.span>
  );
}
