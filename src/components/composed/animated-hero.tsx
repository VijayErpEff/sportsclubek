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
import { Container } from "@/components/layout/container";

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "home" | "page" | "split";
  backgroundImage?: string;
  videoSrc?: string;
  badge?: string;
  className?: string;
}

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AnimatedHero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = "home",
  backgroundImage,
  videoSrc,
  badge,
  className,
}: AnimatedHeroProps) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center overflow-hidden",
        {
          "min-h-[80vh]": variant === "home",
          "min-h-[50vh]": variant === "page",
          "min-h-[60vh]": variant === "split",
        },
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-primary-dark" aria-hidden="true">
        {videoSrc && !prefersReduced ? (
          <motion.div className="absolute inset-0" style={{ y: prefersReduced ? 0 : backgroundY }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={backgroundImage}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        ) : backgroundImage && (
          <motion.div
            className="absolute inset-0"
            style={{ y: prefersReduced ? 0 : backgroundY }}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}
        <div
          className={cn(
            "absolute inset-0",
            backgroundImage || videoSrc
              ? "bg-gradient-to-r from-primary-dark/70 via-primary-dark/50 to-transparent"
              : "bg-gradient-to-br from-primary-dark via-primary to-primary-light"
          )}
        />
      </div>

      {/* Content */}
      <motion.div style={{ opacity: prefersReduced ? 1 : contentOpacity }} className="relative z-10">
        <Container>
          <div
            className={cn("max-w-3xl", {
              "text-center mx-auto": variant === "home",
              "text-left": variant === "page" || variant === "split",
            })}
          >
            {mounted && !prefersReduced ? (
              <>
                {badge && (
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: APPLE_EASE }}
                  >
                    <span className="w-2 h-2 bg-accent rounded-full live-pulse" />
                    {badge}
                  </motion.div>
                )}
                <motion.h1
                className="font-display text-hero text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: APPLE_EASE }}
              >
                {title}
              </motion.h1>

              {subtitle && (
                <motion.p
                  className={cn(
                    "text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed",
                    variant === "home" && "mx-auto"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: APPLE_EASE }}
                >
                  {subtitle}
                </motion.p>
              )}

              {(primaryCTA || secondaryCTA) && (
                <motion.div
                  className={cn("flex flex-wrap gap-4", {
                    "justify-center": variant === "home",
                  })}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: APPLE_EASE }}
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
              )}
            </>
          ) : (
            <>
              {badge && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90 mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full live-pulse" />
                  {badge}
                </div>
              )}
              <h1 className="font-display text-hero text-white mb-6">
                {title}
              </h1>
              {subtitle && (
                <p className={cn(
                  "text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed",
                  variant === "home" && "mx-auto"
                )}>
                  {subtitle}
                </p>
              )}
              {(primaryCTA || secondaryCTA) && (
                <div className={cn("flex flex-wrap gap-4", {
                  "justify-center": variant === "home",
                })}>
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
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <ChevronDown className="h-6 w-6 animate-scroll-hint" />
      </motion.div>
    </div>
  );
}
