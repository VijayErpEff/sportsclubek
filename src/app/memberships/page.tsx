import { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { MEMBERSHIP_FAQS } from "@/content/faqs";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = generateSEOMetadata({
  title: "Memberships & Pricing",
  description:
    "Flexible membership plans for individuals and families at LevelUP Sports. Access batting cages, courts, coaching programs, and more. Compare plans and pricing.",
  path: "/memberships",
});

const plans = [
  {
    name: "Basic",
    price: 49,
    period: "month",
    description: "Perfect for casual players who want regular access.",
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
    price: 89,
    period: "month",
    description: "Our most popular plan for dedicated athletes and families.",
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
    price: 149,
    period: "month",
    description: "Full access for serious athletes and competitive families.",
    features: [
      { text: "Unlimited open play access", included: true },
      { text: "Unlimited court/cage bookings", included: true },
      { text: "Member pricing on extras", included: true },
      { text: "Online booking", included: true },
      { text: "All academy programs included", included: true },
      { text: "4 guest passes per month", included: true },
      { text: "Priority booking", included: true },
    ],
    recommended: false,
  },
];

export default function MembershipsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Memberships", url: "/memberships" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Slim Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light pt-[76px] pb-5">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-2">
            <ol className="flex items-center gap-1.5">
              <li><a href="/" className="hover:text-white/70 transition-colors">Home</a></li>
              <li>/</li>
              <li aria-current="page" className="text-white/60">Memberships</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-white">
            Sports Memberships & Pricing
          </h1>
          <p className="text-white/60 mt-1 text-sm max-w-xl">
            Flexible plans for individuals and families. Access batting cages, courts, coaching, and more.
          </p>
        </Container>
      </div>

      {/* Pricing Cards */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-2xl border bg-white p-8 flex flex-col",
                  plan.recommended
                    ? "border-accent shadow-xl ring-2 ring-accent/20 scale-[1.02]"
                    : "border-neutral-200 shadow-card"
                )}
              >
                {plan.recommended && (
                  <Badge
                    variant="accent"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                  >
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-mono text-4xl font-bold text-neutral-900">
                      ${plan.price}
                    </span>
                    <span className="text-neutral-500">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check className="h-4 w-4 text-secondary shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-neutral-300 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-neutral-700"
                            : "text-neutral-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.recommended ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href="/schedule">
                    {plan.recommended ? "Get Started" : "Choose Plan"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-neutral-500 mt-8">
            All plans include 30-day cancellation. No long-term contracts.
            Family plans available — contact us for details.
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="alternate">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-4">
                Membership FAQ
              </h2>
            </div>
            <FAQAccordion items={MEMBERSHIP_FAQS} />
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Not Sure Which Plan Is Right?"
        description="Contact us or visit for a free tour. We'll help you find the perfect fit."
        primaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
        secondaryCTA={{ label: "Contact Us", href: "/about" }}
      />
    </>
  );
}
