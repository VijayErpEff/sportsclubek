"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import { cn } from "@/lib/utils/cn";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, prefersReduced, next, autoPlayInterval]);

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

  // Get 3 visible testimonials for desktop
  const getVisible = () => {
    const items: { testimonial: Testimonial; index: number }[] = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (current + i + total) % total;
      items.push({ testimonial: testimonials[idx], index: idx });
    }
    return items;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      {/* Desktop: 3-card view */}
      <div className="hidden lg:block relative">
        <div className="grid grid-cols-3 gap-6">
          {getVisible().map(({ testimonial, index }, i) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              className={cn(
                "transition-all duration-500",
                i === 1 ? "scale-[1.02] z-10" : "opacity-80 scale-[0.98]"
              )}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-card-hover flex items-center justify-center text-neutral-500 hover:text-primary transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-card-hover flex items-center justify-center text-neutral-500 hover:text-primary transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile: single card with swipe */}
      <div className="lg:hidden overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${total}`}
            initial={prefersReduced ? {} : { opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag={prefersReduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
          >
            <TestimonialCard {...testimonials[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div
        className="flex items-center justify-center gap-2 mt-8"
        role="tablist"
        aria-label="Select testimonial"
      >
        {testimonials.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === current}
            aria-label={`Testimonial ${index + 1}`}
            onClick={() => goTo(index)}
            className={cn(
              "rounded-full transition-all duration-300",
              index === current
                ? "w-8 h-2.5 bg-accent"
                : "w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400"
            )}
          />
        ))}
      </div>
    </section>
  );
}
