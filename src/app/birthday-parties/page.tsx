import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Hero } from "@/components/composed/hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CheckCircle, PartyPopper, ClipboardList, Play, Armchair, Users, Building, Bus, Award } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Birthday Parties & Group Events — Elkton, MD",
  description:
    "Host a birthday party at LevelUp Sports in Elkton, MD. Batting cages, badminton, pickleball, and coaching for ages 6+. Packages from $249. Book today.",
  path: "/birthday-parties",
});

const STANDARD_FEATURES = [
  "Up to 10 kids",
  "90 minutes of court/cage time",
  "Dedicated party host",
  "All equipment provided",
  "Setup and cleanup included",
  "Bring your own cake and food",
];

const PREMIUM_FEATURES = [
  "Up to 15 kids",
  "2 hours of court/cage time",
  "Dedicated party host + coaching session",
  "All equipment provided",
  "Setup and cleanup included",
  "Pizza, drinks, and paper goods included",
  "Custom LevelUp party favors",
  "Photo station with props",
];

const HOW_IT_WORKS = [
  { step: "Book", description: "Pick a date, choose your package, and tell us the birthday star's favorite sport.", icon: ClipboardList },
  { step: "We Plan", description: "Our events team handles setup, equipment, and all the logistics.", icon: PartyPopper },
  { step: "They Play", description: "Kids get coached, compete, and have a blast on real courts and cages.", icon: Play },
  { step: "You Relax", description: "Sit back, take photos, and enjoy the best party you have ever not had to plan.", icon: Armchair },
];

const ALSO_GREAT_FOR = [
  { title: "Corporate Events", description: "Team building with batting cages and pickleball tournaments.", icon: Building },
  { title: "School Field Trips", description: "Active, educational outings for PE classes and after-school groups.", icon: Bus },
  { title: "Team Outings", description: "Celebrate the end of season or kick off a new one together.", icon: Users },
  { title: "Scout Troops", description: "Earn badges while learning real sports skills from certified coaches.", icon: Award },
];

export default function BirthdayPartiesPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Birthday Parties", url: "/birthday-parties" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <Hero
        variant="page"
        title="The Birthday Party They'll Actually Talk About"
        subtitle="Forget bounce houses. Give them batting cages, badminton courts, and real coaching. Ages 6+."
        primaryCTA={{ label: "Book a Party", href: "/contact" }}
      />

      <Section className="py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">Birthday Parties</li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-3">Party Packages</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Two packages. Zero stress. All fun.</p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <StaggerItem>
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 hover:shadow-lg transition-shadow">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">Standard</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-primary">$249</span>
                  <span className="text-neutral-500 text-sm">/ up to 10 kids</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {STANDARD_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-neutral-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Book Standard</Link>
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border-2 border-accent bg-white p-8 hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">Premium</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-primary">$399</span>
                  <span className="text-neutral-500 text-sm">/ up to 15 kids</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {PREMIUM_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-neutral-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/contact">Book Premium</Link>
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* How It Works */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">How It Works</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="text-center p-6 rounded-2xl bg-white border border-neutral-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Step {i + 1}</div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">{item.step}</h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Also Great For */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">Also Great For</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALSO_GREAT_FOR.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-section text-neutral-900 mb-4">Ready to Book?</h2>
              <p className="text-neutral-500 mb-6">
                Call or email us to reserve your date. We book up fast on weekends, so plan ahead.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <Button size="lg" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>Call {SITE_CONFIG.phone}</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`mailto:${SITE_CONFIG.email}`}>Email Us</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Not Sure Which Package?"
        description="Give us a call and we will help you plan the perfect event."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
