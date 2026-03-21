"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap, Trophy, Crown } from "lucide-react";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    monthly: 49,
    annual: 39,
    description: "Regular access for casual players.",
    features: [
      { text: "Open play hours access", included: true },
      { text: "2 court/cage bookings per week", included: true },
      { text: "Member pricing on extras", included: true },
      { text: "Online booking", included: true },
      { text: "Academy program access", included: false },
      { text: "Guest passes", included: false },
      { text: "Priority booking", included: false },
    ],
    recommended: false,
  },
  {
    name: "Pro",
    icon: Trophy,
    monthly: 89,
    annual: 69,
    description: "Unlimited access for dedicated athletes.",
    features: [
      { text: "Unlimited open play access", included: true },
      { text: "Unlimited court/cage bookings", included: true },
      { text: "Member pricing on extras", included: true },
      { text: "Online booking", included: true },
      { text: "1 academy program included", included: true },
      { text: "2 guest passes per month", included: true },
      { text: "Priority booking", included: false },
    ],
    recommended: true,
  },
  {
    name: "Elite",
    icon: Crown,
    monthly: 149,
    annual: 119,
    description: "Full access for serious competitors.",
    features: [
      { text: "Unlimited open play access", included: true },
      { text: "Unlimited court/cage bookings", included: true },
      { text: "Member pricing on extras", included: true },
      { text: "Online booking", included: true },
      { text: "All academy programs included", included: true },
      { text: "4 guest passes per month", included: true },
      { text: "Priority booking & early access", included: true },
    ],
    recommended: false,
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center bg-neutral-100 rounded-full p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
              billing === "monthly"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5",
              billing === "annual"
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Annual
            <span className="text-xs font-bold text-accent">-20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthly : plan.annual;
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

              {/* Header: icon + name inline, then price */}
              <div className="mb-5">
                <div className="flex items-center gap-2.5 mb-3">
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
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-neutral-900">
                    ${price}
                  </span>
                  <span className="text-neutral-400 text-sm">/mo</span>
                </div>
                {billing === "annual" && (
                  <p className="text-xs text-accent font-semibold mt-1">
                    ${price * 12}/yr &mdash; save $
                    {(plan.monthly - plan.annual) * 12}
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
                    key={feature.text}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    {feature.included ? (
                      <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-neutral-200 shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-neutral-700"
                          : "text-neutral-300"
                      }
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.recommended ? "primary" : "outline"}
                size="md"
                className="w-full"
                asChild
              >
                <Link href="/schedule">
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
