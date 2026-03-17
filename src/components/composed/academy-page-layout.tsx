import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Button } from "@/components/ui/button";
import { generateBreadcrumbLD, generateFAQLD, generateCourseLD } from "@/lib/seo/json-ld";
import { Check, GraduationCap, Users, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AcademyPageData } from "@/content/academies";

export function AcademyPageLayout({ data }: { data: AcademyPageData }) {
  const breadcrumbs = data.sportSlug
    ? [
        { name: "Home", url: "/" },
        { name: data.sport, url: `/${data.sportSlug}` },
        { name: data.name, url: `/${data.slug}` },
      ]
    : [
        { name: "Home", url: "/" },
        { name: data.name, url: `/${data.slug}` },
      ];

  const breadcrumbLD = generateBreadcrumbLD(breadcrumbs);
  const faqLD = generateFAQLD(data.faqs);
  const courseLD = generateCourseLD({
    name: data.name,
    description: data.description,
    url: `/${data.slug}`,
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLD) }}
      />

      {/* Hero Header */}
      <div className="relative bg-neutral-900 pt-[72px]">
        <div className="absolute inset-0">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/80 to-neutral-900/60" />
        </div>
        <Container className="relative py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-4">
            <ol className="flex items-center gap-1.5">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.url} className="hover:text-white/70 transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/60">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5" style={{ color: data.color }} />
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: data.color }}
            >
              Academy Program
            </span>
          </div>

          <h1 className="font-display text-hero text-white mb-3 max-w-2xl">
            {data.tagline}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mb-6">
            {data.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2"
              >
                <span className="text-white font-bold text-sm">{stat.value}</span>
                <span className="text-white/40 text-xs ml-1.5">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/schedule">Enroll Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-neutral-900" asChild>
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Overview + What You Get */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-display text-section text-neutral-900 mb-6">
                Program Overview
              </h2>
              {data.overview.map((p, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 sticky top-24">
                <h3 className="font-display font-bold text-neutral-900 mb-4">
                  What You Get
                </h3>
                <ul className="space-y-3">
                  {data.whatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <Button className="w-full" asChild>
                    <Link href="/schedule">Enroll Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Curriculum */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-display text-section text-neutral-900 mb-3">
              Curriculum
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Progressive skill development tailored to each level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.curriculum.map((tier, index) => (
              <div
                key={tier.label}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
              >
                {/* Tier header with color */}
                <div className="p-1">
                  <div
                    className="rounded-xl px-5 py-4"
                    style={{ backgroundColor: `${tier.color}10` }}
                  >
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                    >
                      {tier.label}
                    </span>
                    <h3 className="font-display text-lg font-bold text-neutral-900">
                      {tier.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {tier.description}
                    </p>
                  </div>
                </div>

                {/* Skills list */}
                <ul className="px-5 pb-5 pt-3 space-y-2.5">
                  {tier.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: tier.color }}
                      />
                      <span className="text-sm text-neutral-600">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Coaches */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-display text-section text-neutral-900 mb-3">
              Your Coaching Team
            </h2>
          </div>
          <div className={cn(
            "grid gap-6 max-w-3xl mx-auto",
            data.coaches.length === 1 ? "grid-cols-1 max-w-md" : "sm:grid-cols-2"
          )}>
            {data.coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${data.color}15` }}
                  >
                    <span className="text-lg font-bold" style={{ color: data.color }}>
                      {coach.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-neutral-900">{coach.name}</h3>
                    <p className="text-sm font-medium" style={{ color: data.color }}>{coach.role}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mt-4 leading-relaxed">{coach.bio}</p>
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
        description={data.ctaDescription}
        primaryCTA={{ label: "Enroll Now", href: "/schedule" }}
        secondaryCTA={{ label: "Contact Us", href: "/about" }}
      />
    </>
  );
}
