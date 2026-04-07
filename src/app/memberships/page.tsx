import { Metadata } from "next";
import Link from "next/link";
import { PricingSection } from "@/components/composed/pricing-section";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateFAQLD } from "@/lib/seo/json-ld";
import { MEMBERSHIP_FAQS } from "@/content/faqs";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { Check, X, GraduationCap, Shield, Users } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Memberships & Pricing — Plans from $49/mo",
  description:
    "Flexible membership plans at LevelUP Sports in Elkton, MD. Access batting cages, courts, and coaching. Individual, family, and elite tiers. Compare plans.",
  path: "/memberships",
});

const comparisonFeatures = [
  { name: "Open Play Sessions/month", core: "8", momentum: "14", ultimate: "24" },
  { name: "Sports included", core: "1 sport", momentum: "All sports", ultimate: "All sports" },
  { name: "All indoor courts", core: true, momentum: true, ultimate: true },
  { name: "Community events access", core: true, momentum: true, ultimate: true },
  { name: "Booking priority", core: "Basic", momentum: "Priority", ultimate: "Highest" },
  { name: "Program discounts", core: false, momentum: true, ultimate: true },
  { name: "Equipment rental discounts", core: false, momentum: true, ultimate: true },
  { name: "Pro shop discounts", core: false, momentum: false, ultimate: true },
  { name: "Add extra sessions", core: true, momentum: true, ultimate: true },
];

export default function MembershipsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Memberships", url: "/memberships" },
  ]);

  const faqLD = generateFAQLD(MEMBERSHIP_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      {/* Hero — Tight, flows directly into pricing */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Memberships</li>
            </ol>
          </nav>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              Join 500+ Athletes &amp; Families
            </p>
            <h1 className="font-display text-page-title text-neutral-900 mb-2 text-balance">
              Simple Plans. No Contracts. Cancel Anytime.
            </h1>
            <p className="text-neutral-500">
              Not sure? Try a free session first — no card required. Open Play is $15/hour without a membership — with one, it drops to just $8/hour (50% off).
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing — Flows directly from hero, no Section wrapper */}
      <div className="pb-12 md:pb-16">
        <Container>
          <PricingSection />
          <p className="text-center text-sm text-neutral-400 mt-6">
            All plans include 30-day cancellation. No long-term contracts.
          </p>
        </Container>
      </div>

      {/* Discount Bar — Compact inline */}
      <div className="bg-neutral-50 border-y border-neutral-100 py-5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="text-neutral-700">
                <span className="font-semibold">Student</span> 15% off
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-neutral-700">
                <span className="font-semibold">Military</span> 20% off
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-neutral-700">
                <span className="font-semibold">Family plans</span> available
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Feature Comparison Table */}
      <Section size="sm">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Compare
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                See what&apos;s included in each plan.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="py-3 pr-4 text-sm font-semibold text-neutral-500 min-w-[160px]">
                      Feature
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-neutral-900 min-w-[90px]">
                      Core
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-bold text-accent min-w-[90px]">
                      Momentum
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-neutral-900 min-w-[90px]">
                      Ultimate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-b border-neutral-100"
                    >
                      <td className="py-3 pr-4 text-sm text-neutral-700">
                        {feature.name}
                      </td>
                      {(["core", "momentum", "ultimate"] as const).map((tier) => {
                        const val = feature[tier];
                        return (
                          <td
                            key={tier}
                            className="py-3 px-4 text-center text-sm"
                          >
                            {typeof val === "boolean" ? (
                              val ? (
                                <Check className="h-4 w-4 text-accent mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-neutral-200 mx-auto" />
                              )
                            ) : (
                              <span className="font-medium text-neutral-900">
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Testimonial — Compact */}
      <section className="border-t border-neutral-100">
        <Container>
          <Reveal>
            <blockquote className="py-10 md:py-14 max-w-3xl mx-auto text-center">
              <p className="font-display text-subsection text-neutral-900 leading-relaxed text-balance">
                &ldquo;The Pro membership has been worth every penny. My son does
                baseball academy and I play pickleball — one membership, two
                sports, zero hassle.&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold text-neutral-900">
                  — Momentum Member since 2026, Newark DE
                </p>
              </footer>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <Section variant="alternate" size="sm">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  FAQ
                </p>
                <h2 className="font-display text-section text-neutral-900 text-balance">
                  Common questions about membership.
                </h2>
              </div>
            </Reveal>
            <FAQAccordion items={MEMBERSHIP_FAQS} />
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Try Before You Buy"
        description="Contact us or visit for a free tour. We'll help you find the perfect fit."
        primaryCTA={{ label: "Try a Free Session", href: BOOKING_URLS.freeTrial }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
