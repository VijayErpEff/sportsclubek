"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** How long each slide stays fully visible (ms) */
const SLIDE_INTERVAL = 6000;

/** Crossfade transition duration (ms) */
const CROSSFADE_MS = 1800;

/** Ken Burns zoom duration — matches slide interval + crossfade (ms) */
const ZOOM_MS = 7000;

interface HeroImage {
  src: string;
  alt: string;
}

interface VideoHeroProps {
  videoSrc?: string;
  posterImage?: string;
  images?: HeroImage[];
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  overlayOpacity?: number;
  badge?: string;
  className?: string;
}

export function VideoHero({
  videoSrc,
  posterImage,
  images,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  overlayOpacity = 0.5,
  badge,
  className,
}: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasSlideshow = images && images.length > 1;
  const effectivePoster =
    posterImage || (images?.length === 1 ? images[0].src : undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Slideshow auto-advance ────────────────────────
  useEffect(() => {
    if (!hasSlideshow || isPaused || prefersReduced) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [hasSlideshow, images?.length, isPaused, prefersReduced]);

  // Pause video when prefers-reduced-motion
  useEffect(() => {
    if (!videoRef.current) return;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [prefersReduced]);

  // Scroll-linked opacity fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  // Ken Burns for single-poster fallback
  const kenBurnsScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Stagger delays
  const BADGE_DELAY = 0.2;
  const TITLE_DELAY = 0.4;
  const SUBTITLE_DELAY = 0.6;
  const CTA_DELAY = 0.8;
  const SCROLL_DELAY = 1.2;

  const shouldAnimate = mounted && !prefersReduced;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center min-h-[90vh] overflow-hidden",
        className
      )}
      onMouseEnter={hasSlideshow ? () => setIsPaused(true) : undefined}
      onMouseLeave={hasSlideshow ? () => setIsPaused(false) : undefined}
    >
      {/* ── Background media ───────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* ── Slideshow mode ─────────────────────── */}
        {hasSlideshow &&
          images.map((image, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={image.src}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${CROSSFADE_MS}ms cubic-bezier(0.45, 0, 0.15, 1)`,
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  priority={index < 2}
                  className={cn(
                    "object-cover",
                    shouldAnimate &&
                      cn(
                        "transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                        isActive
                          ? `duration-[${ZOOM_MS}ms] scale-[1.08]`
                          : `duration-[${ZOOM_MS}ms] scale-100`
                      )
                  )}
                  style={
                    shouldAnimate
                      ? {
                          transitionProperty: "transform",
                          transitionDuration: `${ZOOM_MS}ms`,
                          transitionTimingFunction:
                            "cubic-bezier(0.25, 0.1, 0.25, 1)",
                          transform: isActive ? "scale(1.08)" : "scale(1)",
                        }
                      : undefined
                  }
                  sizes="100vw"
                  quality={80}
                />
              </div>
            );
          })}

        {/* ── Video mode ─────────────────────────── */}
        {!hasSlideshow && videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={effectivePoster}
            onCanPlayThrough={() => setVideoLoaded(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* ── Static poster mode ─────────────────── */}
        {!hasSlideshow && (!videoSrc || !videoLoaded) && effectivePoster && (
          <motion.div
            className="absolute inset-0"
            style={
              !videoSrc && shouldAnimate
                ? { scale: kenBurnsScale }
                : undefined
            }
          >
            <Image
              src={effectivePoster}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* ── Gradient overlays ──────────────────── */}
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-t from-primary-dark via-primary-dark/60 to-primary-dark/30"
          style={{ opacity: overlayOpacity + 0.2 }}
        />
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-r from-primary-dark/80 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* ── Content ────────────────────────────────── */}
      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl"
          style={
            shouldAnimate
              ? { opacity: contentOpacity, y: contentY }
              : undefined
          }
        >
          {/* Badge */}
          {badge && (
            <>
              {shouldAnimate ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: BADGE_DELAY,
                    ease: APPLE_EASE,
                  }}
                >
                  <Badge
                    variant="accent"
                    className="mb-5 bg-accent/20 text-white border border-accent/30 px-3 py-1 text-sm"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              ) : (
                <Badge
                  variant="accent"
                  className="mb-5 bg-accent/20 text-white border border-accent/30 px-3 py-1 text-sm"
                >
                  {badge}
                </Badge>
              )}
            </>
          )}

          {/* Title */}
          {shouldAnimate ? (
            <motion.h1
              className="font-display text-hero text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: TITLE_DELAY,
                ease: APPLE_EASE,
              }}
            >
              {title}
            </motion.h1>
          ) : (
            <h1 className="font-display text-hero text-white mb-6">{title}</h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <>
              {shouldAnimate ? (
                <motion.p
                  className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: SUBTITLE_DELAY,
                    ease: APPLE_EASE,
                  }}
                >
                  {subtitle}
                </motion.p>
              ) : (
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </>
          )}

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <>
              {shouldAnimate ? (
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: CTA_DELAY,
                    ease: APPLE_EASE,
                  }}
                >
                  {primaryCTA && (
                    <Button size="xl" asChild>
                      <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                    </Button>
                  )}
                  {secondaryCTA && (
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      asChild
                    >
                      <Link href={secondaryCTA.href}>
                        {secondaryCTA.label}
                      </Link>
                    </Button>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {primaryCTA && (
                    <Button size="xl" asChild>
                      <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                    </Button>
                  )}
                  {secondaryCTA && (
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-primary"
                      asChild
                    >
                      <Link href={secondaryCTA.href}>
                        {secondaryCTA.label}
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </Container>

      {/* ── Slide indicators ───────────────────────── */}
      {hasSlideshow && mounted && (
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
          initial={shouldAnimate ? { opacity: 0 } : undefined}
          animate={shouldAnimate ? { opacity: 1 } : undefined}
          transition={
            shouldAnimate
              ? { delay: SCROLL_DELAY, duration: 0.5 }
              : undefined
          }
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                index === activeSlide
                  ? "bg-white w-8"
                  : "bg-white/30 w-3 hover:bg-white/50"
              )}
              aria-label={`View slide ${index + 1} of ${images.length}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </motion.div>
      )}

      {/* ── Scroll indicator ───────────────────────── */}
      {shouldAnimate && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: SCROLL_DELAY, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 text-white/50" />
          </motion.div>
        </motion.div>
      )}

      {!shouldAnimate && mounted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="text-[11px] uppercase tracking-widest text-white/50 font-medium">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-white/50" />
        </div>
      )}
    </div>
  );
}
