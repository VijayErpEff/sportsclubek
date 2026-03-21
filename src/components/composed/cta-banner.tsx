import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";

interface CTABannerProps {
  title: string;
  description?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "primary" | "accent";
  className?: string;
}

export function CTABanner({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = "primary",
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        variant === "primary"
          ? "bg-gradient-to-r from-primary-dark to-primary"
          : "bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light",
        className
      )}
    >

      <Container className="relative z-10 text-center">
        <h2 className="font-display text-section text-white mb-4 text-balance">{title}</h2>
        {description && (
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="xl"
            variant={variant === "primary" ? "primary" : "secondary"}
            className={
              variant === "primary"
                ? ""
                : "bg-white text-secondary hover:bg-neutral-100"
            }
            asChild
          >
            <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
          </Button>
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
      </Container>
    </section>
  );
}
