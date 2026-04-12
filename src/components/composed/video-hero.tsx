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

/** How long each slide holds before the next crossfade begins (ms) */
const SLIDE_INTERVAL = 5000;

/** Crossfade blend duration — long enough to feel like a dissolve, not a cut (ms) */
const CROSSFADE_MS = 3500;

/** Ken Burns pan/zoom duration — spans the full visible window (ms) */
const ZOOM_DURATION = 9000;

/**
 * Varied Ken Burns directions — each slide gets a unique
 * pan + zoom trajectory for cinematic depth.
 * Uses translate3d for GPU-accelerated compositing.
 */
const KEN_BURNS_VARIANTS = [
  { from: "scale(1) translate3d(0,0,0)", to: "scale(1.12) translate3d(-1.5%,-1%,0)" },
  { from: "scale(1.1) translate3d(1%,0,0)", to: "scale(1) translate3d(-0.5%,0.5%,0)" },
  { from: "scale(1) translate3d(0,1.5%,0)", to: "scale(1.1) translate3d(-1%,-0.5%,0)" },
  { from: "scale(1.08) translate3d(-1%,0,0)", to: "scale(1) translate3d(1%,0,0)" },
  { from: "scale(1) translate3d(0,0,0)", to: "scale(1.14) translate3d(0,-1.5%,0)" },
  { from: "scale(1.12) translate3d(0.5%,0.5%,0)", to: "scale(1) translate3d(-0.5%,0,0)" },
  { from: "scale(1) translate3d(-0.5%,0,0)", to: "scale(1.1) translate3d(0.5%,-1%,0)" },
];

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
  const slideKeyRef = useRef(0);
  const [slideKey, setSlideKey] = useState(0);

  const hasSlideshow = images && images.length > 1;
  const effectivePoster =
    posterImage || (images?.length === 1 ? images[0].src : undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Slideshow auto-advance ──────────────────────────
  useEffect(() => {
    if (!hasSlideshow || prefersReduced) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [hasSlideshow, images?.length, prefersReduced]);

  // Increment slideKey when active slide changes (for Ken Burns restart)
  useEffect(() => {
    slideKeyRef.current++;
    setSlideKey(slideKeyRef.current);
  }, [activeSlide]);

  // Pause video when prefers-reduced-motion
  useEffect(() => {
    if (!videoRef.current) return;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [prefersReduced]);

  // Scroll-linked content fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const kenBurnsScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Stagger delays
  const BADGE_DELAY = 0.2;
  const TITLE_DELAY = 0.4;
  const SUBTITLE_DELAY = 0.6;
  const CTA_DELAY = 0.8;
  const shouldAnimate = mounted && !prefersReduced;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex overflow-hidden",
        // Full viewport with dvh fallback for mobile address-bar handling
        "min-h-screen min-h-[100dvh]",
        // Mobile: text anchored to bottom, images fill upper screen
        // Desktop: text vertically centered
        "items-end pb-20 md:items-center md:pb-0",
        className
      )}
    >
      {/* ── Background media ─────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* ── Slideshow mode ───────────────────────── */}
        {hasSlideshow &&
          images.map((image, index) => {
            const isActive = index === activeSlide;
            const variant =
              KEN_BURNS_VARIANTS[index % KEN_BURNS_VARIANTS.length];

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
                {shouldAnimate ? (
                  <motion.div
                    key={isActive ? `active-${slideKey}` : `idle-${index}`}
                    className="absolute inset-0"
                    initial={{ transform: variant.from }}
                    animate={{
                      transform: isActive ? variant.to : variant.from,
                    }}
                    transition={{
                      duration: isActive ? ZOOM_DURATION / 1000 : 0,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      sizes="100vw"
                      quality={75}
                    />
                  </motion.div>
                ) : (
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover"
                    sizes="100vw"
                    quality={75}
                  />
                )}
              </div>
            );
          })}

        {/* ── Video mode ───────────────────────────── */}
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

        {/* ── Static poster mode ───────────────────── */}
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

        {/* ── Gradient overlays ────────────────────── */}
        {/* Mobile: minimal bottom gradient — images dominate viewport */}
        <div className="absolute inset-0 z-[3] md:hidden bg-gradient-to-t from-primary-dark/80 via-primary-dark/25 via-35% to-transparent" />
        {/* Desktop: localized bottom-left scrim — images visible on right */}
        <div
          className="absolute inset-0 z-[3] hidden md:block"
          style={{
            background:
              "linear-gradient(to top right, rgba(15,36,64,0.75) 0%, rgba(15,36,64,0.2) 45%, transparent 65%)",
          }}
        />
        {/* Light bottom anchor (desktop only) */}
        <div className="absolute inset-0 z-[3] hidden md:block bg-gradient-to-t from-primary-dark/40 to-transparent to-25%" />
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl"
          style={{
            textShadow:
              "0 2px 30px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.4)",
            ...(shouldAnimate
              ? { opacity: contentOpacity, y: contentY }
              : undefined),
          }}
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

          {/* Title — always a real <h1> for SEO, animation layered on top */}
          <motion.h1
            className="font-display text-hero text-white mb-4 md:mb-6"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldAnimate ? {
              duration: 0.7,
              delay: TITLE_DELAY,
              ease: APPLE_EASE,
            } : { duration: 0 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle — hidden on mobile to let images dominate */}
          {subtitle && (
            <>
              {shouldAnimate ? (
                <motion.p
                  className="hidden md:block text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
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
                <p className="hidden md:block text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
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
                      className="hidden md:inline-flex border-white text-white hover:bg-white hover:text-primary"
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
                      className="hidden md:inline-flex border-white text-white hover:bg-white hover:text-primary"
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

      {/* ── Scroll indicator ───────────────────────── */}
      {shouldAnimate && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
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
