"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Trophy, Crown } from "lucide-react";
import { BOOKING_URLS } from "@/lib/constants/booking";

const plans = [
  {
    name: "LevelUP Core",
    icon: Zap,
    price: 59.99,
    tagline: "Your game, your way.",
    sport: "1 Sport",
    sessions: "8 Open Plays",
    description:
      "Perfect for players who love to focus on just one sport. Whether it's Pickleball, Badminton, Volleyball, or Cricket — full access to your game of choice.",
    features: [
      "8 Open Play sessions/month",
      "All indoor courts",
      "Basic booking priority",
      "Community events access",
      "Add more sports anytime",
    ],
    recommended: false,
  },
  {
    name: "LevelUP Momentum",
    icon: Trophy,
    price: 89.99,
    tagline: "Can't choose just one?",
    sport: "All Sports",
    sessions: "14 Open Plays",
    description:
      "Access to all sports — play what you want, when you want. Switch between games based on your mood, and keep every workout exciting.",
    features: [
      "14 Open Play sessions/month",
      "All sports included",
      "Priority booking",
      "Program discounts",
      "Equipment rental discounts",
      "Add more sessions anytime",
    ],
    recommended: true,
  },
  {
    name: "LevelUP Ultimate",
    icon: Crown,
    price: 119.99,
    tagline: "The ultimate all-access pass.",
    sport: "All Sports",
    sessions: "24 Open Plays",
    description:
      "Play any sport, anytime — with the freedom to add extra sessions whenever you want. Nonstop action, total flexibility, and maximum value.",
    features: [
      "24 Open Play sessions/month",
      "All sports included",
      "Highest booking priority",
      "Program discounts",
      "Equipment rental & pro shop discounts",
      "Add more sessions anytime",
    ],
    recommended: false,
  },
];

export function PricingSection() {
  return (
    <div>
      {/* Open Play Pricing Bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-900">Open Play</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="accent" className="text-xs px-2 py-0.5">Members</Badge>
          <span className="font-mono font-bold text-neutral-900">$8</span>
          <span className="text-neutral-500">/hour</span>
          <span className="text-xs text-accent font-medium">(50% off)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-xs px-2 py-0.5">Non-Members</Badge>
          <span className="font-mono font-bold text-neutral-900">$15</span>
          <span className="text-neutral-500">/hour</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl bg-white flex flex-col transition-all duration-300",
                plan.recommended
                  ? "ring-2 ring-accent shadow-card-elevated md:scale-[1.02] z-10 p-6 pt-7"
                  : "shadow-card hover:shadow-card-hover p-6"
              )}
            >
              {plan.recommended && (
                <Badge
                  variant="accent"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-bold"
                >
                  Most Popular
                </Badge>
              )}

              {/* Header */}
              <div className="mb-5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      plan.recommended ? "bg-accent/10" : "bg-neutral-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        plan.recommended ? "text-accent" : "text-primary"
                      )}
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-900">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-accent mb-3 ml-[42px]">
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-neutral-900">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="text-neutral-400 text-sm">/month</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                    {plan.sport}
                  </span>
                  <span className="text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5">
                    {plan.sessions}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 mt-3">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 space-y-2 mb-5 border-t border-neutral-100 pt-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                size="md"
                className="w-full"
                asChild
              >
                <Link href={BOOKING_URLS.memberships}>
                  {plan.recommended ? "Get Started" : "Choose Plan"}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
