"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Trophy, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "LevelUp Core",
    icon: Zap,
    regular: 69.99,
    earlyBird: 59.99,
    savings: 10,
    tagline: "Your game, your way.",
    description:
      "Perfect for players who love to focus on just one sport. Whether it's Pickleball, Badminton, Volleyball, or Cricket — full access to your game of choice.",
    features: [
      "8 Open Play Sessions/month",
      "All indoor courts",
      "Basic booking priority",
      "Community events access",
      "Add more sports anytime",
    ],
    recommended: false,
  },
  {
    name: "LevelUp Momentum",
    icon: Trophy,
    regular: 109.99,
    earlyBird: 89.99,
    savings: 20,
    tagline: "Can't choose just one?",
    description:
      "Access to all sports — play what you want, when you want. Switch between games based on your mood, and keep every workout exciting.",
    features: [
      "14 Open Play Sessions/month",
      "All sports included",
      "Priority booking",
      "Program discounts",
      "Equipment rental discounts",
      "Add more sessions anytime",
    ],
    recommended: true,
  },
  {
    name: "LevelUp Ultimate",
    icon: Crown,
    regular: 149.99,
    earlyBird: 119.99,
    savings: 30,
    tagline: "The ultimate all-access pass.",
    description:
      "Play any sport, anytime — with the freedom to add extra sessions whenever you want. Nonstop action, total flexibility, and maximum value.",
    features: [
      "24 Open Play Sessions/month",
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
  const [billing, setBilling] = useState<"regular" | "earlyBird">("earlyBird");

  return (
    <div>
      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center bg-neutral-100 rounded-full p-1">
          <button
            onClick={() => setBilling("regular")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
              billing === "regular"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Regular
          </button>
          <button
            onClick={() => setBilling("earlyBird")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5",
              billing === "earlyBird"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Early Bird
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan) => {
          const price =
            billing === "earlyBird" ? plan.earlyBird : plan.regular;
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

                {billing === "earlyBird" && (
                  <p className="text-sm text-neutral-400 line-through mb-0.5">
                    ${plan.regular.toFixed(2)}/month
                  </p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-neutral-900">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-neutral-400 text-sm">/month</span>
                </div>
                {billing === "earlyBird" && (
                  <p className="text-xs text-accent font-semibold mt-1">
                    *Early Bird Preview: Save ${plan.savings.toFixed(2)}/month
                  </p>
                )}
                <p className="text-sm text-neutral-500 mt-2">
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

              {billing === "earlyBird" && (
                <div className="mb-4 rounded-lg bg-accent/5 border border-accent/10 px-3 py-2 text-center">
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">
                    Early Bird
                  </span>
                </div>
              )}

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                size="md"
                className="w-full"
                asChild
              >
                <Link href="/free-trial">
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
