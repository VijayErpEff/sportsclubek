"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { ATHLETE_SPOTLIGHTS } from "@/content/athletes";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AthleteSpotlight({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = ATHLETE_SPOTLIGHTS.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 8 seconds
  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [isPaused, prefersReduced, next]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [next, prev]
  );

  const athlete = ATHLETE_SPOTLIGHTS[current];

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5, ease: APPLE_EASE },
      };

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary-dark py-20 md:py-32",
        className
      )}
      aria-roledescription="carousel"
      aria-label="Athlete spotlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-90"
        aria-hidden="true"
      />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4 bg-accent/20 text-accent-light">
            Athlete Spotlights
          </Badge>
          <h2 className="font-display text-section text-white">
            Stories of Growth
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              role="group"
              aria-roledescription="slide"
              aria-label={`${current + 1} of ${total}: ${athlete.name}`}
              className="text-center"
              {...motionProps}
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                  <Quote className="h-6 w-6 text-accent-light" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-8">
                <p className="font-display text-xl md:text-2xl lg:text-[1.75rem] text-white leading-relaxed font-medium">
                  &ldquo;{athlete.quote}&rdquo;
                </p>
              </blockquote>

              {/* Athlete info */}
              <div className="flex flex-col items-center gap-3">
                {/* Avatar placeholder */}
                {athlete.image && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-accent/30 ring-offset-2 ring-offset-primary-dark">
                    <Image
                      src={athlete.image}
                      alt={athlete.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}

                <div>
                  <p className="text-lg font-semibold text-white">
                    {athlete.name}
                    <span className="text-white/60 font-normal">
                      , {athlete.age}
                    </span>
                  </p>
                  <p className="text-sm text-accent-light font-medium">
                    {athlete.sport}
                  </p>
                </div>

                {/* Achievement */}
                <p className="text-sm text-white/70 max-w-md">
                  {athlete.achievement}
                </p>

                {/* Member since badge */}
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                  Member since {athlete.memberSince}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev button */}
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Previous athlete"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Select athlete">
              {ATHLETE_SPOTLIGHTS.map((a, index) => (
                <button
                  key={a.name}
                  role="tab"
                  aria-selected={index === current}
                  aria-label={`${a.name}'s story`}
                  onClick={() => setCurrent(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    index === current
                      ? "w-8 h-2.5 bg-accent"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Next athlete"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
