import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateBreadcrumbLD, generateFAQLD } from "@/lib/seo/json-ld";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SportPageData } from "@/content/sports";

export function SportPageLayout({ data }: { data: SportPageData }) {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: data.name, url: `/${data.slug}` },
  ]);
  const faqLD = generateFAQLD(data.faqs);

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

      {/* Page Header — clean, light, premium */}
      <div className="pt-28 pb-12 md:pt-36 md:pb-16">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li aria-current="page" className="text-neutral-600 font-medium">{data.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-5 uppercase tracking-wider"
                style={{ backgroundColor: `${data.color}12`, color: data.color }}
              >
                {data.name} Program
              </div>
              <h1 className="font-display text-page-title text-neutral-900 mb-3 text-balance">
                {data.name} in Elkton, MD
              </h1>
              <p className="font-display text-subsection text-neutral-700 mb-4 text-balance max-w-lg">
                {data.tagline}
              </p>
              <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-lg">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href={data.ctaPrimary.href}>{data.ctaPrimary.label}</Link>
                </Button>
                {data.ctaSecondary && (
                  <Button size="lg" variant="outline" asChild>
                    <Link href={data.ctaSecondary.href}>{data.ctaSecondary.label}</Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Highlight Stats */}
            <div className="grid grid-cols-2 gap-3">
              {data.highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-white rounded-xl p-5 shadow-card border border-neutral-100"
                >
                  <p className="text-2xl font-bold text-neutral-900">{h.value}</p>
                  <p className="text-sm text-neutral-400 mt-0.5">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Overview */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            <Reveal variant="fade-right" className="lg:col-span-3">
              <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                About Our {data.name} Program
              </h2>
              {data.overview.map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 sticky top-24">
                <h3 className="font-display font-bold text-neutral-900 mb-4">
                  Facility Features
                </h3>
                <ul className="space-y-3">
                  {data.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Programs & Sessions
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Choose the format that fits your goals and schedule.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {data.programs.map((program) => (
              <StaggerItem key={program.title}>
                <Link
                  href={program.href}
                  className="group bg-white rounded-2xl border border-neutral-200 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    {program.tag && (
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2"
                        style={{ backgroundColor: `${data.color}15`, color: data.color }}
                      >
                        {program.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Coaches — only shown when coach data exists */}
      {data.coaches.length > 0 && (
        <Section variant="alternate">
          <Container>
            <Reveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                  Meet Your Coaches
                </h2>
              </div>
            </Reveal>
            <StaggerContainer className={cn(
              "grid gap-6 mx-auto",
              data.coaches.length === 1 ? "grid-cols-1 max-w-sm" :
              data.coaches.length <= 2 ? "sm:grid-cols-2 max-w-3xl" :
              "sm:grid-cols-2 max-w-4xl"
            )}>
              {data.coaches.map((coach) => (
                <StaggerItem key={coach.name}>
                  <div className="flex items-start gap-4 bg-white rounded-2xl border border-neutral-200 p-6 shadow-card">
                    {coach.image ? (
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${data.color}15` }}
                      >
                        <span className="text-lg font-bold" style={{ color: data.color }}>
                          {coach.initials}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-neutral-900">
                        {coach.name}
                      </h3>
                      <p className="text-sm font-medium text-accent">{coach.role}</p>
                      <p className="text-xs text-neutral-500 mt-1">{coach.credentials}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                  Frequently Asked Questions
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={data.faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title={data.ctaTitle}
        description={`Book a ${data.name.toLowerCase()} session or explore our programs today.`}
        primaryCTA={data.ctaPrimary}
        secondaryCTA={data.ctaSecondary}
      />
    </>
  );
}
