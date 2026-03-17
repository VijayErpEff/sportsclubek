import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

interface HeroProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "home" | "page" | "split";
  backgroundImage?: string;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = "home",
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden",
        {
          "min-h-[85vh]": variant === "home",
          "min-h-[50vh]": variant === "page",
          "min-h-[60vh]": variant === "split",
        },
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-primary-dark">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div
          className={cn(
            "absolute inset-0",
            backgroundImage
              ? "bg-gradient-to-r from-primary-dark/80 via-primary-dark/60 to-primary-dark/40"
              : "bg-gradient-to-br from-primary-dark via-primary to-primary-light"
          )}
        />
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div
          className={cn("max-w-3xl", {
            "text-center mx-auto": variant === "home",
            "text-left": variant === "page" || variant === "split",
          })}
        >
          <h1 className="font-display text-hero text-white mb-6">{title}</h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div
              className={cn("flex flex-wrap gap-4", {
                "justify-center": variant === "home",
              })}
            >
              {primaryCTA && (
                <Button size="xl" asChild>
                  <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
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
