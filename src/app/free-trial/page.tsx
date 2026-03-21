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
import {
  CheckCircle,
  ArrowRight,
  Calendar,
  Users,
  Star,
  Dumbbell,
} from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Try a Free Session",
  description:
    "Try any sport free at LevelUP Sports in Elkton, MD — 15 min from Middletown & Newark, DE. Batting cages, cricket nets, badminton & pickleball. No commitment, no card required.",
  path: "/free-trial",
});

const FAQ_ITEMS = [
  {
    question: "Do I need to bring any equipment?",
    answer:
      "No. We provide everything — bats, rackets, balls, shuttlecocks, helmets, and protective gear. Just wear comfortable athletic clothing and clean indoor shoes.",
  },
  {
    question: "Is there really no catch?",
    answer:
      "None. No credit card required. No auto-enrollment. We believe once you experience the facility and coaching, you'll want to come back — on your own terms.",
  },
  {
    question: "What ages are eligible?",
    answer:
      "Ages 5 and up. Kids under 12 need a parent or guardian on site. Adults are very welcome — pickleball and badminton open play sessions are popular with all ages.",
  },
  {
    question: "Can I try more than one sport?",
    answer:
      "Yes! You can book a free trial in each of our four sports. Many families try two or three before deciding on their favorite.",
  },
];

export default function FreeTrialPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Free Trial", url: "/free-trial" },
  ]);
  const faqLD = generateFAQLD(FAQ_ITEMS);

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

      {/* Hero */}
      <Hero
        variant="page"
        title="Your First Session Is On Us"
        subtitle="Pick any sport. Try it free. No commitment, no credit card, no catch."
        primaryCTA={{ label: "Book My Free Session", href: "/schedule" }}
      />

      {/* How It Works + What's Included — combined into one tight section */}
      <Section size="sm">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left — Steps */}
            <div>
              <Reveal>
                <h2 className="font-display text-section text-neutral-900 mb-6">
                  Three Steps. Zero Risk.
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="space-y-5">
                  {[
                    {
                      icon: Dumbbell,
                      step: "1",
                      title: "Choose Your Sport",
                      desc: "Baseball, cricket, badminton, or pickleball. Not sure? We'll help you pick.",
                    },
                    {
                      icon: Calendar,
                      step: "2",
                      title: "Book a Time",
                      desc: "Pick a slot from the schedule. Evenings and weekends available. Walk-ins welcome too.",
                    },
                    {
                      icon: Users,
                      step: "3",
                      title: "Show Up and Play",
                      desc: "Equipment provided. Coach included. 60 minutes of real training. No strings.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <s.icon className="h-4.5 w-4.5 text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-0.5">
                          Step {s.step}
                        </div>
                        <h3 className="font-semibold text-neutral-900 text-sm">
                          {s.title}
                        </h3>
                        <p className="text-neutral-500 text-sm mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — What's Included card */}
            <Reveal variant="fade-left" delay={0.1}>
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 lg:p-8">
                <h2 className="font-display text-lg font-semibold text-neutral-900 mb-5">
                  What&apos;s Included — Free
                </h2>
                <ul className="space-y-3">
                  {[
                    "60-minute coached session",
                    "All equipment provided (bats, rackets, helmets, etc.)",
                    "Personalized skill assessment",
                    "No obligation to sign up for anything",
                    "Ages 5+ and adults welcome",
                    "Valid for all four sports",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500 mb-3">
                    <span className="font-semibold text-accent">87%</span> of
                    families who try a session become regular members
                  </p>
                  <Button className="w-full" asChild>
                    <Link href="/schedule">
                      Book My Free Session{" "}
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Pick Your Sport — compact cards */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-6 text-center">
              Pick Your Sport
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SPORTS.map((sport) => (
              <StaggerItem key={sport.slug}>
                <Link
                  href="/schedule"
                  className="group block rounded-xl border border-neutral-200 bg-white p-5 hover:shadow-card-hover hover:border-accent/30 transition-all"
                >
                  <h3 className="font-display font-semibold text-neutral-900 mb-1.5">
                    {sport.name}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {sport.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                    Book Free Trial
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* FAQ — tight */}
      <Section size="sm">
        <Container className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-subsection text-neutral-900 mb-6 text-center">
              Common Questions
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FAQAccordion items={FAQ_ITEMS} />
          </Reveal>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTABanner
        title="Ready to Try?"
        description="Pick your sport. Book a time. Show up and play — free."
        primaryCTA={{ label: "Book My Free Session", href: "/schedule" }}
        secondaryCTA={{ label: "View All Programs", href: "/#sports" }}
      />
    </>
  );
}
