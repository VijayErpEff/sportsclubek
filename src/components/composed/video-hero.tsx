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

interface VideoHeroProps {
  videoSrc?: string;
  posterImage: string;
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause video when prefers-reduced-motion
  useEffect(() => {
    if (!videoRef.current) return;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        // Autoplay blocked
      });
    }
  }, [prefersReduced]);

  // Scroll-linked opacity fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  // Ken Burns for poster fallback
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
    >
      {/* Background media */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Video background */}
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterImage}
            onCanPlayThrough={() => setVideoLoaded(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Poster image (shown as fallback or if no video) */}
        {(!videoSrc || !videoLoaded) && (
          <motion.div
            className="absolute inset-0"
            style={
              !videoSrc && shouldAnimate
                ? { scale: kenBurnsScale }
                : undefined
            }
          >
            <Image
              src={posterImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-primary-dark/30"
          style={{ opacity: overlayOpacity + 0.2 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
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
                  transition={{ duration: 0.5, delay: BADGE_DELAY, ease: APPLE_EASE }}
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
              transition={{ duration: 0.7, delay: TITLE_DELAY, ease: APPLE_EASE }}
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
                  transition={{ duration: 0.6, delay: SUBTITLE_DELAY, ease: APPLE_EASE }}
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
                  transition={{ duration: 0.5, delay: CTA_DELAY, ease: APPLE_EASE }}
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
                      <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
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
                      <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </Container>

      {/* Scroll indicator */}
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
