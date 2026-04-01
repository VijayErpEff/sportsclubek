import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
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

      {/* Page Header — clean, light */}
      <div className="pt-28 pb-12 md:pt-36 md:pb-16">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
            <ol className="flex items-center gap-1.5">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-neutral-300">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.url} className="hover:text-primary transition-colors">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-neutral-600 font-medium">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5" style={{ color: data.color }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.15em]"
              style={{ color: data.color }}
            >
              Academy Program
            </span>
          </div>

          <h1 className="font-display text-page-title text-neutral-900 mb-4 max-w-2xl text-balance">
            {data.tagline}
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl mb-8">
            {data.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 mb-8">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-card border border-neutral-100 px-5 py-3"
              >
                <span className="text-neutral-900 font-bold text-sm">{stat.value}</span>
                <span className="text-neutral-400 text-xs ml-1.5">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={data.enrollUrl}>Enroll Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Overview + What You Get */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            <Reveal variant="fade-right" className="lg:col-span-3">
              <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                Program Overview
              </h2>
              {data.overview.map((p, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed mb-4">{p}</p>
              ))}
            </Reveal>
            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-2">
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
                    <Link href={data.enrollUrl}>Enroll Now</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Curriculum */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Curriculum
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                Progressive skill development tailored to each level.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.curriculum.map((tier, index) => (
              <StaggerItem key={tier.label}>
              <div
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Coaches */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Your Coaching Team
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className={cn(
            "grid gap-6 mx-auto",
            data.coaches.length === 1 ? "grid-cols-1 max-w-md" :
            data.coaches.length <= 2 ? "sm:grid-cols-2 max-w-3xl" :
            "sm:grid-cols-2 max-w-4xl"
          )}>
            {data.coaches.map((coach) => (
              <StaggerItem key={coach.name}>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-card">
                  <div className="flex items-start gap-4">
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
                      <h3 className="font-display font-bold text-neutral-900">{coach.name}</h3>
                      <p className="text-sm font-medium" style={{ color: data.color }}>{coach.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 mt-4 leading-relaxed">{coach.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

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
        description={data.ctaDescription}
        primaryCTA={{ label: "Enroll Now", href: data.enrollUrl }}
        secondaryCTA={{ label: "Contact Us", href: "/about" }}
      />
    </>
  );
}
