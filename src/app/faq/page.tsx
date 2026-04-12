import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/composed/hero";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateFAQLD } from "@/lib/seo/json-ld";
import { HOMEPAGE_FAQS, MEMBERSHIP_FAQS, SAFETY_FAQS } from "@/content/faqs";
import { SPORT_PAGES } from "@/content/sports";
import { ACADEMY_PAGES } from "@/content/academies";

export const metadata: Metadata = generateSEOMetadata({
  title: "FAQ — Frequently Asked Questions About LevelUP Sports",
  description:
    "Answers to common questions about LevelUP Sports in Elkton, MD. Hours, pricing, memberships, free trials, safety policies, youth academies, court rentals, and more.",
  path: "/faq",
});

// Collect all FAQs from across the site into one page
const sportFaqs = Object.values(SPORT_PAGES).flatMap((sport) =>
  sport.faqs.map((faq) => ({ ...faq, category: sport.name }))
);

const academyFaqs = Object.values(ACADEMY_PAGES).flatMap((academy) =>
  academy.faqs.map((faq) => ({ ...faq, category: `${academy.sport} Academy` }))
);

// Build a flat array of all FAQs for schema
const ALL_FAQS = [
  ...HOMEPAGE_FAQS,
  ...SAFETY_FAQS,
  ...MEMBERSHIP_FAQS,
  ...sportFaqs,
  ...academyFaqs,
];

export default function FAQPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);
  const faqLD = generateFAQLD(ALL_FAQS);

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

      <Hero
        variant="page"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about LevelUP Sports — hours, pricing, programs, safety, and more."
      />

      {/* General */}
      <Section size="sm">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-6">
              General
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FAQAccordion items={HOMEPAGE_FAQS} />
          </Reveal>
        </Container>
      </Section>

      {/* Safety & Policies */}
      <Section variant="alternate" size="sm">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-6">
              Safety &amp; Policies
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FAQAccordion items={SAFETY_FAQS} />
          </Reveal>
        </Container>
      </Section>

      {/* Memberships */}
      <Section size="sm">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-6">
              Memberships &amp; Pricing
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FAQAccordion items={MEMBERSHIP_FAQS} />
          </Reveal>
        </Container>
      </Section>

      {/* Sport-Specific */}
      {Object.values(SPORT_PAGES).map((sport) => (
        <Section
          key={sport.slug}
          variant="alternate"
          size="sm"
        >
          <Container className="max-w-3xl">
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-section text-neutral-900">
                  {sport.name}
                </h2>
                <Link
                  href={`/${sport.slug}`}
                  className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  View {sport.name} page &rarr;
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <FAQAccordion items={sport.faqs} />
            </Reveal>
          </Container>
        </Section>
      ))}

      {/* Academy-Specific */}
      {Object.values(ACADEMY_PAGES).map((academy) => (
        <Section
          key={academy.slug}
          size="sm"
        >
          <Container className="max-w-3xl">
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-section text-neutral-900">
                  {academy.sport} Academy
                </h2>
                <Link
                  href={`/${academy.slug}`}
                  className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  View Academy page &rarr;
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <FAQAccordion items={academy.faqs} />
            </Reveal>
          </Container>
        </Section>
      ))}

      <CTABanner
        title="Still Have Questions?"
        description="Our team is happy to help. Call us, email, or stop by."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Try a Free Session", href: "/free-trial" }}
      />
    </>
  );
}
