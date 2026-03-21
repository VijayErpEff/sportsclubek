"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GOOGLE_REVIEWS, AGGREGATE_RATING, type GoogleReview } from "@/content/reviews";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            starSize,
            i < Math.floor(rating)
              ? "fill-warning text-warning"
              : i < rating
              ? "fill-warning/50 text-warning"
              : "fill-neutral-200 text-neutral-200"
          )}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="flex-shrink-0 w-[300px] rounded-xl border border-neutral-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
            {review.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{review.author}</p>
            <p className="text-[11px] text-neutral-500">{review.date}</p>
          </div>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-3 text-sm text-neutral-700 leading-relaxed line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>
      {review.sport && (
        <span className="mt-3 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
          {review.sport}
        </span>
      )}
    </div>
  );
}

export function GoogleReviews({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  // Auto-scroll animation
  const animate = useCallback(() => {
    if (!scrollRef.current || isPaused || prefersReduced) return;

    scrollPositionRef.current += 0.5;
    const container = scrollRef.current;
    const halfScroll = container.scrollWidth / 2;

    if (scrollPositionRef.current >= halfScroll) {
      scrollPositionRef.current = 0;
    }

    container.scrollLeft = scrollPositionRef.current;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, prefersReduced]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Sync scroll position when user manually scrolls
  const handleScroll = useCallback(() => {
    if (scrollRef.current && isPaused) {
      scrollPositionRef.current = scrollRef.current.scrollLeft;
    }
  }, [isPaused]);

  return (
    <div className={cn(className)}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        {/* Left: Aggregate rating */}
        <div className="flex-shrink-0 lg:w-[280px]">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-[4rem] leading-none font-bold text-neutral-900">
              {AGGREGATE_RATING.ratingValue}
            </span>
            <span className="text-lg text-neutral-500 font-medium">
              / {AGGREGATE_RATING.bestRating}
            </span>
          </div>
          <StarRating rating={AGGREGATE_RATING.ratingValue} size="lg" />
          <p className="mt-2 text-sm text-neutral-600">
            Based on{" "}
            <span className="font-semibold text-neutral-900">
              {AGGREGATE_RATING.reviewCount}
            </span>{" "}
            reviews
          </p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View on Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Right: Scrolling reviews */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 cursor-grab active:cursor-grabbing"
            role="region"
            aria-label="Customer reviews"
            tabIndex={0}
          >
            {duplicatedReviews.map((review, i) => (
              <motion.div
                key={`${review.author}-${i}`}
                initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(i * 0.05, 0.3),
                  ease: APPLE_EASE,
                }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            name: "LevelUP Sports & Athletics Club",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: AGGREGATE_RATING.ratingValue,
              reviewCount: AGGREGATE_RATING.reviewCount,
              bestRating: AGGREGATE_RATING.bestRating,
            },
            review: GOOGLE_REVIEWS.map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.author },
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: 5,
              },
              reviewBody: r.text,
            })),
          }),
        }}
      />
    </div>
  );
}
