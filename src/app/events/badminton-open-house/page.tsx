import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Users,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Baby,
  User,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { CountdownTimer } from "@/components/composed/countdown-timer";
import { FAQAccordion } from "@/components/composed/faq-accordion";

import { generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbLD,
  generateEventLD,
  generateFAQLD,
} from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

// ── Event constants ─────────────────────────────────────────────────
const EVENT = {
  name: "LevelUP Badminton Open House",
  tagline: "Discover the joy of badminton — free clinic with a 50-year master coach.",
  date: "Saturday, May 2, 2026",
  startISO: "2026-05-02T18:00:00-04:00",
  endISO: "2026-05-02T20:00:00-04:00",
  registerUrl:
    "https://app.upperhand.io/customers/2578-levelup-sports-and-athletics-club/events/194708-levelup-badminton-training-clinic-open-house",
  flyer: "/images/Content/badminton-open-house-may-2.jpeg",
};

const SESSIONS = [
  {
    icon: Baby,
    label: "Kids Session",
    time: "6:00 – 7:00 PM",
    description:
      "A fun, age-appropriate intro for young players. Coach Nick leads drills, simple games, and footwork basics in a friendly, low-pressure setting.",
    accent: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: User,
    label: "Adults Session",
    time: "7:15 – 8:00 PM",
    description:
      "For adults at any level — from never-played to club regulars. Drills, technique tips, and match play, plus a chance to meet other players.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
];

const WHAT_TO_EXPECT = [
  "Meet our experienced coach in person",
  "Fun drills and on-court activities",
  "Hands-on tips to improve your game",
  "Learn about our ongoing badminton programs",
  "Meet other players and families in the community",
];

const WHAT_TO_BRING = [
  "Your own racket if you have one (loaners available on request)",
  "Indoor non-marking court shoes",
  "Light athletic clothing — facility is climate-controlled at 72°F",
  "Water bottle (refill stations on-site)",
  "An open mind and a willingness to try something new",
];

const FAQS = [
  {
    question: "Is this really free?",
    answer:
      "Yes — the Badminton Open House on Saturday, May 2 is completely free. No registration fee and no commitment. We just ask that you reserve your spot through Upper Hand so we can plan the right coach-to-player ratio.",
  },
  {
    question: "Do I need any badminton experience?",
    answer:
      "Not at all. The Open House is designed for everyone — first-timers picking up a racket, club players looking to sharpen up, and anyone curious about badminton. Coach Nick adjusts the session to the room.",
  },
  {
    question: "Which session should my kid attend?",
    answer:
      "Kids ages 6–13 should join the 6:00 – 7:00 PM Kids session. Older teens and adults are welcome at the 7:15 – 8:00 PM Adults session. Younger kids (under 6) are welcome to come watch with a parent.",
  },
  {
    question: "Do I need to bring a racket?",
    answer:
      "Bring one if you have it. If not, we have loaner rackets available — just let us know at check-in.",
  },
  {
    question: "Who is Coach Nick Tan?",
    answer:
      "Coach Nick brings 50 years of badminton experience as a player, mentor, and coach. He's a long-time leader of the Dilwyne Badminton Club in Wilmington, DE and has been part of the badminton community in our region for decades. He has a unique gift for working with brand-new players and seasoned competitors alike.",
  },
  {
    question: "Will I be pressured to sign up for a membership?",
    answer:
      "No. The Open House is a no-pressure way to experience our facility and coaching. If you love it, we'll happily talk about academy enrollment, court rentals, or memberships afterwards. If not, you got a free badminton clinic from a master coach — that's it.",
  },
  {
    question: "Where is the Open House held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking. We're 15 minutes from Middletown, DE; 20 minutes from Newark, DE; and 30 minutes from Wilmington, DE.",
  },
  {
    question: "Will there be future tournaments or programs?",
    answer:
      "Yes — our next tournament is the LevelUP Badminton Tournament on Saturday, May 30 (a $80/team doubles event with Beginner, Intermediate, and Advanced divisions). We also run a year-round Badminton Academy and offer hourly court rentals on three BWF-standard courts.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title:
    "FREE Badminton Open House — May 2, 2026 | Coach Nick Tan, Elkton MD",
  description:
    "Free Badminton Open House at LevelUP Sports in Elkton, MD on Saturday, May 2. Kids session 6–7 PM, Adults 7:15–8 PM. Led by Coach Nick Tan (50 years of experience). All ages and levels welcome — limited spots.",
  path: "/events/badminton-open-house",
  ogImage: EVENT.flyer,
});

// ── Page ────────────────────────────────────────────────────────────
export default function BadmintonOpenHousePage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Badminton", url: "/badminton" },
    { name: "Open House — May 2", url: "/events/badminton-open-house" },
  ]);

  const eventLD = generateEventLD({
    name: EVENT.name,
    description:
      "Free badminton clinic and open house with Coach Nick Tan (50 years of experience). Kids session 6–7 PM, Adults session 7:15–8 PM. All ages and levels welcome.",
    startDate: EVENT.startISO,
    endDate: EVENT.endISO,
    url: "/events/badminton-open-house",
    isAccessibleForFree: true,
    sport: "Badminton",
    image: [`${SITE_CONFIG.url}${EVENT.flyer}`],
    performer: {
      "@type": "Person",
      name: "Coach Nick Tan",
      description:
        "50 years of badminton experience, long-time leader of Dilwyne Badminton Club, Wilmington, DE.",
    },
    offers: {
      price: "0",
      priceCurrency: "USD",
      url: EVENT.registerUrl,
      validThrough: EVENT.startISO,
    },
  });

  const faqLD = generateFAQLD(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      {/* ═══════════════════════════════════════════
          HERO — Free clinic with countdown
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light text-white">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary" aria-hidden="true" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/badminton" className="hover:text-white transition-colors">
                  Badminton
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Open House — May 2</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Free Event — Limited Spots
                </p>
                <h1 className="font-display text-hero leading-[1.05] mb-4 text-balance">
                  Badminton{" "}
                  <span className="text-secondary">Open House</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  {EVENT.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-white hover:bg-secondary/90">
                    <a
                      href={EVENT.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reserve Your Free Spot <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <a href={`tel:${SITE_CONFIG.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {SITE_CONFIG.phone}
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  Saturday, May 2 · Kids 6–7 PM · Adults 7:15–8 PM
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-square max-w-md mx-auto">
                <Image
                  src={EVENT.flyer}
                  alt="LevelUP Badminton Open House flyer — Saturday, May 2, free event with Coach Nick Tan, kids 6–7 PM and adults 7:15–8 PM"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          COUNTDOWN
          ═══════════════════════════════════════════ */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-10">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Open House Tip-Off
              </p>
              <CountdownTimer targetDate={new Date(EVENT.startISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          KEY DETAILS
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Calendar, label: "Date", value: EVENT.date },
              { icon: Clock, label: "Time", value: "6:00 – 8:00 PM" },
              { icon: Sparkles, label: "Cost", value: "FREE" },
              { icon: Users, label: "Who", value: "All ages & levels" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    {item.label}
                  </p>
                  <p className="font-display font-semibold text-neutral-900 leading-snug">
                    {item.value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          TWO SESSIONS — Kids + Adults
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Two Sessions
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Built for Kids and Adults
              </h2>
              <p className="text-neutral-600">
                Pick the session that fits — or come for both. Either way, it&apos;s free.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {SESSIONS.map((session) => (
              <StaggerItem key={session.label}>
                <div className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full flex flex-col">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${session.bg} ${session.accent} mb-4`}>
                    <session.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">
                    {session.label}
                  </h3>
                  <p className="font-mono text-sm text-accent font-semibold mb-3">
                    {session.time}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          MEET THE COACH — Nick Tan spotlight
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
            <Reveal variant="fade-right" className="lg:col-span-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark shadow-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl font-extrabold text-white/20">
                    NT
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                  <p className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">
                    Featured Coach
                  </p>
                  <p className="font-display text-2xl font-bold text-white">
                    Coach Nick Tan
                  </p>
                  <p className="text-white/70 text-sm">50 years of experience</p>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-3">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <Award className="h-3.5 w-3.5" />
                  Meet Your Coach
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                  50 Years of Badminton Wisdom in One Evening
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Coach Nick Tan has spent five decades inside the sport — as a competitor, mentor, and longtime leader of the Dilwyne Badminton Club in Wilmington, DE. He&apos;s coached complete beginners and seasoned tournament players, and he has a special gift for making the game click in just a few sessions.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  At the Open House, you&apos;ll get hands-on coaching, simple drills you can take home, and the chance to ask the kind of questions a 50-year veteran can actually answer.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          WHAT TO EXPECT + WHAT TO BRING
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Reveal variant="fade-right">
              <div className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  What to Expect
                </h3>
                <ul className="space-y-3">
                  {WHAT_TO_EXPECT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.1}>
              <div className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full">
                <h3 className="font-display text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  What to Bring
                </h3>
                <ul className="space-y-3">
                  {WHAT_TO_BRING.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          LOCATION & CONTACT
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Where & How
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Hosted at LevelUP Sports — Elkton, MD
              </h2>
              <p className="text-neutral-600">
                Free on-site parking. Climate-controlled facility. Three BWF-standard badminton courts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <MapPin className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Address
                </p>
                <p className="font-semibold text-neutral-900">
                  701 E Pulaski Hwy
                  <br />
                  Elkton, MD 21921
                </p>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover mt-3"
                >
                  Get Directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <Phone className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="font-semibold text-neutral-900 hover:text-accent"
                >
                  {SITE_CONFIG.phone}
                </a>
                <p className="text-xs text-neutral-500 mt-2">
                  Questions? Call us anytime.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <Mail className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="font-semibold text-neutral-900 hover:text-accent break-all"
                >
                  {SITE_CONFIG.email}
                </a>
                <p className="text-xs text-neutral-500 mt-2">
                  Same-day reply during business hours.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  FAQ
                </p>
                <h2 className="font-display text-section text-neutral-900 text-balance">
                  Open House Questions, Answered
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={FAQS} />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-neutral-500 mt-8">
                Want to keep playing after the Open House?{" "}
                <Link
                  href="/events/badminton-tournament"
                  className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
                >
                  Check out our May 30 tournament
                </Link>
                {" "}or{" "}
                <Link
                  href="/badminton-academy"
                  className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
                >
                  the Badminton Academy
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <CTABanner
        title="Reserve Your Free Spot"
        description="Saturday, May 2 — Kids 6–7 PM, Adults 7:15–8 PM. No cost, no commitment, no pressure. Limited spots — please register so we can plan."
        primaryCTA={{
          label: "Reserve on Upper Hand",
          href: EVENT.registerUrl,
        }}
        secondaryCTA={{
          label: "Explore Badminton at LevelUP",
          href: "/badminton",
        }}
      />
    </>
  );
}
