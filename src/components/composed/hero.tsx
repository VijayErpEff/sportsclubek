import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedHero } from "./animated-hero";

interface HeroProps {
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

export function Hero(props: HeroProps) {
  if (props.variant === "home") {
    return <AnimatedHero {...props} />;
  }

  const { title, subtitle, primaryCTA, secondaryCTA, className } = props;

  return (
    <div
      className={cn(
        "relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden",
        className
      )}
    >
      {/* Subtle background accent — thin green line + gentle gradient wash */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <h1 className="font-display text-page-title text-neutral-900 mb-4 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-neutral-500 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap gap-3 mt-8">
              {primaryCTA && (
                <Button size="lg" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
