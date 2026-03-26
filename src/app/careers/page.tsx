import { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Heart, TrendingUp, Users, Dumbbell, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Careers at LevelUP Sports",
  description:
    "Join the LevelUP Sports team. Coaching positions, facility operations, and more. Build the future of youth athletics.",
  path: "/careers",
});

const openPositions = [
  {
    title: "Pickleball Coach",
    type: "Full-Time",
    description:
      "Lead recreational and competitive pickleball training programs for all ages.",
  },
  {
    title: "Youth Fitness Trainer",
    type: "Full-Time",
    description:
      "Conduct agility, coordination, and fitness sessions for children aged 4–12.",
  },
  {
    title: "Badminton Coach",
    type: "Full-Time",
    description:
      "Train beginner to intermediate players in individual and group settings.",
  },
  {
    title: "Volleyball Coach",
    type: "Full-Time",
    description:
      "Develop skills and strategies for youth and adult volleyball teams.",
  },
  {
    title: "Club Manager",
    type: "Full-Time",
    description:
      "Oversee daily operations, staff management, and member services.",
  },
  {
    title: "Front Desk Staff",
    type: "Full-Time",
    description:
      "Provide excellent customer service and manage facility bookings.",
  },
];

const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real impact on young athletes every day." },
  { icon: TrendingUp, title: "Growth", desc: "Leadership opportunities as we expand." },
  { icon: Users, title: "Team Culture", desc: "Passionate people who share your love of sport." },
  { icon: Dumbbell, title: "Facility Access", desc: "Complimentary access to all courts and cages." },
];

export default function CareersPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Compact Hero — matches memberships page style */}
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
              <li className="text-neutral-600 font-medium">Careers</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              Join Our Team
            </p>
            <h1 className="font-display text-page-title text-neutral-900 mb-2 text-balance">
              Build the Future of Youth Athletics
            </h1>
            <p className="text-neutral-500">
              We&apos;re looking for passionate coaches and team members who want to make a difference in young athletes&apos; lives.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Work Here — Compact cards */}
      <Section size="sm">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((perk) => (
              <StaggerItem key={perk.title}>
                <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <perk.icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{perk.title}</h3>
                  <p className="text-xs text-neutral-500">{perk.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Current Openings — Clean grid cards */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Open Positions
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                Current Openings
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {openPositions.map((position) => (
              <StaggerItem key={position.title}>
                <div className="rounded-xl bg-white border border-neutral-100 p-5 shadow-card hover:shadow-card-hover transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {position.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1.5">{position.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4 flex-1">{position.description}</p>
                  <a
                    href={`mailto:info@levelupsports.us?subject=Application: ${position.title}&body=Hi LevelUP Sports,%0D%0A%0D%0AI am interested in the ${position.title} position. Please find my resume attached.%0D%0A%0D%0AThank you.`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Don't See Your Role — Compact */}
      <Section size="sm">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-subsection text-neutral-900 mb-3 text-balance">
                Don&apos;t See Your Role?
              </h2>
              <p className="text-neutral-500 text-sm mb-5">
                We&apos;re always looking for talented people. Send us your resume and tell us what you&apos;d bring to LevelUP Sports.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:info@levelupsports.us?subject=Open Application — LevelUP Sports">
                  Send Your Resume
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Ready to Join the Team?"
        description="Apply today and help us build the future of youth athletics in Elkton, MD."
        primaryCTA={{ label: "Apply Now", href: "mailto:info@levelupsports.us?subject=Application — LevelUP Sports" }}
        secondaryCTA={{ label: "Learn More About Us", href: "/about" }}
      />
    </>
  );
}
