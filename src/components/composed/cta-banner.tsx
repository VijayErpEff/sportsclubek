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
        "relative overflow-hidden py-16 md:py-20",
        variant === "primary"
          ? "bg-gradient-to-r from-primary-dark via-primary to-primary-light"
          : "bg-gradient-to-r from-accent-hover via-accent to-accent-light",
        className
      )}
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <Container className="relative text-center">
        <h2 className="font-display text-section text-white mb-4">{title}</h2>
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
                : "bg-white text-accent hover:bg-neutral-100"
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
