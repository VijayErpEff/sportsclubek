import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateFAQLD } from "@/lib/seo/json-ld";
import { Hero } from "@/components/composed/hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { SPORTS } from "@/lib/constants/site";
import { CheckCircle, ArrowRight, Calendar, Users, Star } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Try a Free Session",
  description:
    "Try any sport free at LevelUP Sports in Elkton, MD. Batting cages, cricket nets, badminton and pickleball. No commitment, no card required. Book your free session.",
  path: "/free-trial",
});

const STEPS = [
  { number: "1", title: "Choose Your Sport", description: "Baseball, cricket, badminton, or pickleball — pick the one that excites you most.", icon: Star },
  { number: "2", title: "Book a Time", description: "Select a session from our schedule that fits your week. Evenings and weekends available.", icon: Calendar },
  { number: "3", title: "Come Play", description: "Show up, grab the equipment we provide, and enjoy 60 minutes of coached play. No strings attached.", icon: Users },
];

const INCLUDED = [
  "60-minute coached session with a certified instructor",
  "All equipment provided — bats, rackets, balls, shuttlecocks",
  "Personalized skill assessment and next-step recommendations",
  "Zero obligation — no membership pressure, no follow-up sales pitch",
  "Open to ages 5 and up, all skill levels welcome",
];

const FAQ_ITEMS = [
  { question: "Do I need to bring any equipment?", answer: "No. We provide everything you need — bats, rackets, balls, shuttlecocks, and protective gear. Just wear comfortable athletic clothing and sneakers." },
  { question: "Is there really no catch?", answer: "None. No credit card is required and there is no auto-enrollment. We believe once you experience our facility and coaching, you will want to come back on your own terms." },
  { question: "What ages are eligible for the free trial?", answer: "Ages 5 and up. Kids under 12 must have a parent or guardian on site. We also welcome adults — our pickleball and badminton sessions are popular with players of all ages." },
  { question: "Can I try more than one sport?", answer: "Your first free session covers one sport. If you love it and want to explore another, ask about our multi-sport intro package at the front desk." },
];

export default function FreeTrialPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Free Trial", url: "/free-trial" },
  ]);
  const faqLD = generateFAQLD(FAQ_ITEMS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      <Hero variant="page" title="Your First Session Is On Us" subtitle="Pick any sport. Try it free. No commitment, no credit card, no catch." primaryCTA={{ label: "Book My Free Session", href: "/schedule" }} />

      <Section className="py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">Free Trial</li>
            </ol>
          </nav>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-3">How It Works</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Three simple steps. No paperwork, no commitment, no surprises.</p>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-5"><step.icon className="h-6 w-6" /></div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Step {step.number}</div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-8 text-center">What&apos;s Included</h2>
              <ul className="space-y-4">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-3">Pick Your Sport</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Every sport. Every skill level. Your first session is free.</p>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPORTS.map((sport) => (
              <StaggerItem key={sport.slug}>
                <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-lg hover:border-accent/30 transition-all">
                  <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">{sport.name}</h3>
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed">{sport.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/schedule">Book Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <p className="text-center text-lg font-medium text-neutral-700">
              <span className="text-accent font-bold">87%</span> of families who try a session become regular members
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-8 text-center">Frequently Asked Questions</h2>
              <FAQAccordion items={FAQ_ITEMS} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner title="Ready?" description="Pick your sport and book your free session in under 60 seconds." primaryCTA={{ label: "Book My Free Session", href: "/schedule" }} />
    </>
  );
}
