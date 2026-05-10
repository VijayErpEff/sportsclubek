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
  Trophy,
  Target,
  Activity,
  Zap,
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
  name: "LevelUP Soccer Academy Open House",
  tagline:
    "Come experience the energy, the training, and the fun at the LevelUP Soccer Academy.",
  date: "Saturday, May 16, 2026",
  startISO: "2026-05-16T11:00:00-04:00",
  endISO: "2026-05-16T12:30:00-04:00",
  registerUrl: "/go/soccer-open-house",
  flyer: "/images/sports/LevelUp/SoccerOpenHouse.jpeg",
};

const ACTIVITIES = [
  {
    icon: Users,
    label: "Meet the Coaches",
    description:
      "Talk one-on-one with our soccer staff. Ask about training philosophy, age groups, schedules, and what your player's path could look like at LevelUP.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Activity,
    label: "Skill Development Drills",
    description:
      "Real session-style drills — first touch, passing, dribbling under pressure. The same drills our regular Academy players run every week.",
    accent: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Target,
    label: "Technical Training",
    description:
      "Sharp work on technique that makes the difference at tryouts — close ball control, weak foot, decision-making in tight spaces.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Zap,
    label: "Small Group Focus",
    description:
      "Tight coach-to-player ratios so every player gets touches, feedback, and reps. No standing in line — every minute counts.",
    accent: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const INTRO_OFFERS = [
  {
    sessions: "4 Sessions",
    price: "$99",
    perSession: "$24.75 / session",
    description:
      "Try a full month of training. Perfect way to see if our Academy fits your player before committing further.",
    highlight: false,
    badge: "Starter",
  },
  {
    sessions: "8 Sessions",
    price: "$179",
    perSession: "$22.38 / session",
    description:
      "Best value. Eight weeks gives players real reps to build technique, confidence, and connection with our coaches.",
    highlight: true,
    badge: "Best Value · Save $17",
  },
];

const WHAT_TO_EXPECT = [
  "Watch real Academy drills run by our coaches",
  "Try age-appropriate technical activities on indoor turf",
  "Get an honest read on where your player is and what to work on",
  "Hear about the year-round Academy schedule and pricing",
  "Meet other soccer families in the Elkton / Newark / Middletown area",
];

const WHAT_TO_BRING = [
  "Indoor turf shoes or clean trainers (no cleats with metal studs on the turf)",
  "Shin guards (recommended for older players)",
  "Light athletic clothing — facility is climate-controlled at 72°F",
  "Water bottle (refill stations on-site)",
  "A ball if you have one — we have plenty if you don't",
];

const FAQS = [
  {
    question: "Is the Soccer Open House really free?",
    answer:
      "Yes — the Open House on Saturday, May 16 is completely free. No registration fee and no commitment. We just ask that you reserve a spot so our coaches can plan the right group sizes and have enough equipment ready.",
  },
  {
    question: "What ages is the Open House for?",
    answer:
      "The Open House welcomes players of all ages. Our LevelUP Soccer Academy primarily serves youth players, but parents, older siblings, and adults are all welcome to come watch, ask questions, or kick around. Players are grouped by age and skill on the day.",
  },
  {
    question: "Do I need previous soccer experience to attend?",
    answer:
      "Not at all. The Open House is built for new families exploring soccer and for returning players. Coaches adjust drills to the players in front of them — first-touch fundamentals through advanced technical work.",
  },
  {
    question: "What do the introductory offers cover?",
    answer:
      "$99 gets you 4 Academy sessions; $179 gets you 8 Academy sessions (best value — saves $17). Sessions are run by our certified coaches on indoor turf, with small-group ratios and a full technical curriculum. These intro packs are only available to families who attend or contact us during the Open House window.",
  },
  {
    question: "What's the difference between LevelUP Soccer Academy and outdoor club soccer?",
    answer:
      "We're an indoor, year-round technical academy — not a competing club. Many of our players play club outdoors and use LevelUP for off-season development, weak-foot training, or to keep touching the ball when their outdoor season ends. Our focus is technical skill, not standings.",
  },
  {
    question: "Will my player be pressured to enroll afterwards?",
    answer:
      "No. The Open House is a no-pressure way to see the facility, meet the coaches, and try the training. If you love it, we'll talk about Academy enrollment or the intro packs. If not, you got a free soccer session — that's it.",
  },
  {
    question: "Where is the Open House held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking. We're 15 minutes from Middletown, DE; 20 minutes from Newark, DE; and 30 minutes from Wilmington, DE — right off I-95 exit 109A.",
  },
  {
    question: "What happens after the Open House?",
    answer:
      "If you love it, lock in one of the introductory packs (4 sessions $99 or 8 sessions $179) and join the Academy. We run multiple age groups each week with flexible scheduling so you can fit training around school and club commitments.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title:
    "FREE Soccer Open House — May 16, 2026 | LevelUP Soccer Academy, Elkton MD",
  description:
    "Free Soccer Open House at LevelUP Sports in Elkton, MD on Saturday, May 16 from 11 AM – 12:30 PM. Meet the coaches, try real Academy drills, and grab introductory offers: 4 sessions $99 or 8 sessions $179. Indoor turf, all ages welcome.",
  path: "/events/soccer-open-house",
  ogImage: EVENT.flyer,
});

// ── Page ────────────────────────────────────────────────────────────
export default function SoccerOpenHousePage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Soccer", url: "/soccer" },
    { name: "Open House — May 16", url: "/events/soccer-open-house" },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: EVENT.name,
      description:
        "Free soccer open house with the LevelUP Soccer Academy coaches. Skill drills, technical training, small-group focus on indoor turf. All ages welcome. Introductory offers: 4 sessions $99 or 8 sessions $179.",
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      url: "/events/soccer-open-house",
      isAccessibleForFree: true,
    }),
    image: [`${SITE_CONFIG.url}${EVENT.flyer}`],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: EVENT.registerUrl,
      validThrough: EVENT.startISO,
    },
    performer: {
      "@type": "SportsTeam",
      name: "LevelUP Soccer Academy",
    },
  };

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
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light text-white">
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary"
          aria-hidden="true"
        />
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
                <Link
                  href="/soccer"
                  className="hover:text-white transition-colors"
                >
                  Soccer
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Open House — May 16</li>
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
                  Soccer Academy{" "}
                  <span className="text-secondary">Open House</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  {EVENT.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="xl"
                    asChild
                    className="bg-secondary text-white hover:bg-secondary/90"
                  >
                    <Link href={EVENT.registerUrl}>
                      Reserve Your Free Spot{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
                  Saturday, May 16 · 11:00 AM – 12:30 PM · Indoor Turf
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-square max-w-md mx-auto">
                <Image
                  src={EVENT.flyer}
                  alt="LevelUP Soccer Academy Open House flyer — Saturday, May 16, 2026, 11 AM – 12:30 PM, free event with introductory offers 4 sessions $99 or 8 sessions $179"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain"
                  priority
                  fetchPriority="high"
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
                Open House Kick-Off
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
              { icon: Clock, label: "Time", value: "11:00 AM – 12:30 PM" },
              { icon: Sparkles, label: "Cost", value: "FREE" },
              { icon: Users, label: "Who", value: "All ages welcome" },
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
          WHAT'S HAPPENING — 4 Activities
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                What&apos;s Happening
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                90 Minutes of Real Soccer Training
              </h2>
              <p className="text-neutral-600">
                Not a sales pitch with a ball on the floor — an actual Academy
                session you can walk straight into.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {ACTIVITIES.map((activity) => (
              <StaggerItem key={activity.label}>
                <div className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full flex flex-col">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${activity.bg} ${activity.accent} mb-4`}
                  >
                    <activity.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {activity.label}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          INTRODUCTORY OFFERS — Only available at/after Open House
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent bg-accent/10 px-3 py-1.5 rounded-full mb-4">
                <Trophy className="h-3.5 w-3.5" />
                Introductory Offers
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Lock In Your Academy Spot
              </h2>
              <p className="text-neutral-600">
                Available to Open House attendees and families who reach out
                during the launch window. Two simple packs — no contracts.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {INTRO_OFFERS.map((offer) => (
              <StaggerItem key={offer.sessions}>
                <div
                  className={`relative rounded-2xl border p-7 h-full flex flex-col transition-shadow hover:shadow-xl ${
                    offer.highlight
                      ? "border-accent/40 bg-gradient-to-br from-accent/5 to-primary/5 ring-2 ring-accent/20"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  {offer.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-accent text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest shadow-md whitespace-nowrap">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {offer.badge}
                    </span>
                  )}
                  {!offer.highlight && (
                    <span className="inline-flex items-center self-start rounded-full bg-neutral-100 text-neutral-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest mb-3">
                      {offer.badge}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 mt-2">
                    {offer.sessions}
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-5xl font-extrabold text-primary">
                      {offer.price}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">
                    {offer.perSession}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {offer.description}
                  </p>
                  <Button
                    variant={offer.highlight ? "primary" : "outline"}
                    className="mt-auto w-full"
                    asChild
                  >
                    <Link href={EVENT.registerUrl}>
                      Claim This Offer
                    </Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.2}>
            <p className="text-center text-sm text-neutral-500 mt-8 max-w-2xl mx-auto">
              Indoor turf · Climate-controlled facility · Certified coaches ·
              Small-group ratios. Sessions run year-round on flexible schedules
              — perfect for club players in off-season or families looking for
              a serious technical home.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          MEET THE COACHES
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
            <Reveal variant="fade-right" className="lg:col-span-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark shadow-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl font-extrabold text-white/20">
                    LSA
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                  <p className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">
                    Coaching Staff
                  </p>
                  <p className="font-display text-2xl font-bold text-white">
                    LevelUP Soccer Academy
                  </p>
                  <p className="text-white/70 text-sm">
                    Technical-first development
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-3">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <Award className="h-3.5 w-3.5" />
                  Meet the Coaches
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                  Coaching That Builds Real Players
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Our coaches lead a technical-first curriculum — close
                  control, weak foot, decision-making under pressure. The
                  drills you&apos;ll try at the Open House are the same ones we
                  run with Academy regulars every week.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  At the Open House, you&apos;ll meet the staff, see how
                  they coach, and get an honest read on where your player is
                  and what to work on next. No sales script — just soccer
                  people who care about getting better.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          WHAT TO EXPECT + WHAT TO BRING
          ═══════════════════════════════════════════ */}
      <Section>
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
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
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
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
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
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Where &amp; How
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Hosted at LevelUP Sports — Elkton, MD
              </h2>
              <p className="text-neutral-600">
                Free on-site parking. Climate-controlled facility. Indoor
                professional turf — zero weather days.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <MapPin
                  className="h-6 w-6 text-accent mx-auto mb-3"
                  aria-hidden="true"
                />
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
                <Phone
                  className="h-6 w-6 text-accent mx-auto mb-3"
                  aria-hidden="true"
                />
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
                <Mail
                  className="h-6 w-6 text-accent mx-auto mb-3"
                  aria-hidden="true"
                />
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
      <Section>
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
                Want to learn more about ongoing programs?{" "}
                <Link
                  href="/soccer"
                  className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
                >
                  Explore LevelUP Soccer
                </Link>
                {" "}or{" "}
                <Link
                  href="/soccer-academy"
                  className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
                >
                  the Soccer Academy
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
        description="Saturday, May 16 · 11:00 AM – 12:30 PM. No cost, no pressure. Limited spots — please register so coaches can plan the groups."
        primaryCTA={{
          label: "Reserve Your Free Spot",
          href: EVENT.registerUrl,
        }}
        secondaryCTA={{
          label: "Explore Soccer at LevelUP",
          href: "/soccer",
        }}
      />
    </>
  );
}
