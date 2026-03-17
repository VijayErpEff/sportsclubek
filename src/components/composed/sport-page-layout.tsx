import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Button } from "@/components/ui/button";
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

      {/* Hero Header */}
      <div className="relative bg-neutral-900 pt-[72px]">
        {/* Background Image — only if valid */}
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt={`${data.name} at LevelUP Sports`}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/50" />
        </div>
        <Container className="relative py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#sports" className="hover:text-white/70 transition-colors">Sports</Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-white/60">{data.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${data.color}30`, color: data.color }}
              >
                {data.name} Program
              </div>
              <h1 className="font-display text-hero text-white mb-4">
                {data.tagline}
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-lg">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href={data.ctaPrimary.href}>{data.ctaPrimary.label}</Link>
                </Button>
                {data.ctaSecondary && (
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-neutral-900" asChild>
                    <Link href={data.ctaSecondary.href}>{data.ctaSecondary.label}</Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Highlight Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {data.highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                >
                  <p className="text-2xl font-bold text-white">{h.value}</p>
                  <p className="text-sm text-white/50 mt-0.5">{h.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Highlights */}
          <div className="flex gap-3 mt-6 lg:hidden overflow-x-auto pb-2">
            {data.highlights.map((h) => (
              <div
                key={h.label}
                className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/10 flex-shrink-0"
              >
                <span className="text-white font-bold text-sm">{h.value}</span>
                <span className="text-white/40 text-xs ml-1.5">{h.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Overview */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-display text-section text-neutral-900 mb-6">
                About Our {data.name} Program
              </h2>
              {data.overview.map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-2">
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
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-display text-section text-neutral-900 mb-3">
              Programs & Sessions
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Choose the format that fits your goals and schedule.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {data.programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
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
            ))}
          </div>
        </Container>
      </Section>

      {/* Coaches */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-display text-section text-neutral-900 mb-3">
              Meet Your Coaches
            </h2>
          </div>
          <div className={cn(
            "grid gap-6 max-w-3xl mx-auto",
            data.coaches.length === 1 ? "grid-cols-1 max-w-sm" : "sm:grid-cols-2"
          )}>
            {data.coaches.map((coach) => (
              <div
                key={coach.name}
                className="flex items-start gap-4 bg-white rounded-2xl border border-neutral-200 p-6 shadow-card"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${data.color}15` }}
                >
                  <span className="text-lg font-bold" style={{ color: data.color }}>
                    {coach.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900">
                    {coach.name}
                  </h3>
                  <p className="text-sm font-medium text-accent">{coach.role}</p>
                  <p className="text-xs text-neutral-500 mt-1">{coach.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion items={data.faqs} />
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
