import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Trophy,
  Users,
  CircleDollarSign,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Clock,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CountdownTimer } from "@/components/composed/countdown-timer";
import { FAQAccordion } from "@/components/composed/faq-accordion";

import { generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbLD,
  generateEventLD,
  generateFAQLD,
} from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

// ── Tournament constants (single source of truth) ──────────────────
const TOURNAMENT = {
  name: "LevelUP Smash Cup — Fall 2026 Indoor Volleyball Tournament",
  shortName: "LevelUP Smash Cup — Fall 2026",
  tagline: "Bump. Set. Smash.",
  promise: "Form your squad. Win the cup.",
  date: "Saturday, October 24, 2026",
  dateShort: "Oct 24, 2026",
  startISO: "2026-10-24T11:00:00-04:00",
  endISO: "2026-10-24T21:00:00-04:00",
  registerByISO: "2026-10-20T23:59:00-04:00",
  registerByLabel: "Tuesday, October 20, 2026",
  price: "$250",
  priceUnit: "per team",
  format: "6v6 Indoor",
  structure: "Pool Play + Single-Elimination Playoffs",
  rosterSize: "4–8 players",
  eligibility: "Co-ed · Ages 16+",
  registerHref: "/register/volleyball-tournament",
  flyer: "/images/Content/volleyball-smash-cup-fall-2026.jpg",
  ogImage: "/images/og/volleyball-smash-cup-fall-2026.jpg",
};

const ELIGIBILITY = [
  {
    label: "Co-ed, open division",
    detail:
      "One bracket, every squad. Set your own gender mix — there's no required ratio on the court.",
  },
  {
    label: "Ages 16 and up",
    detail:
      "Every rostered player must be 16 or older on game day. High-school crews, college teams, and adult clubs all welcome.",
  },
  {
    label: "Up to 8 players per team",
    detail:
      "Lock your spot with as few as 4 and build your roster to 8. Six on the court, two ready to rotate in.",
  },
];

const SCHEDULE = [
  {
    time: "10:15 AM",
    title: "Check-in & Warm-up",
    description:
      "Captains check in, sign waivers, and confirm rosters. Courts open for warm-up before first serve.",
  },
  {
    time: "11:00 AM",
    title: "Pool Play",
    description:
      "First serve at 11. Every team is guaranteed multiple pool matches. Pools are seeded after registration closes.",
  },
  {
    time: "Afternoon",
    title: "Playoff Bracket",
    description:
      "Top teams from each pool advance to single-elimination playoffs. Bracket times are posted courtside and sent to captains.",
  },
  {
    time: "Evening",
    title: "Finals & Awards",
    description:
      "Championship match followed by cash prizes, trophies, and medals. Exact times go out to captains the week of the tournament.",
  },
];

const PRIZES = [
  {
    icon: Trophy,
    label: "Champions",
    detail: "Cash prize + championship trophy + LevelUP gear",
  },
  {
    icon: Award,
    label: "Runner-up",
    detail: "Cash prize + medals for every player",
  },
  {
    icon: Sparkles,
    label: "All-Tournament Team",
    detail: "Selected by the tournament staff across the day",
  },
];

const WHAT_TO_BRING = [
  "Indoor non-marking court shoes (required)",
  "Light athletic clothing — facility is climate-controlled",
  "Water bottle (refill stations on-site)",
  "Knee pads (recommended)",
  "Photo ID for age verification (all players 16+)",
  "Roster confirmation + signed waivers (sent after registration)",
];

const FAQS = [
  {
    question: "How do I register a team for the Fall Smash Cup?",
    answer:
      "Register online at levelupsports.us/register/volleyball-tournament. Enter your team and captain info, add 4–8 players (all ages 16+), and pick your payment option. Entry is $250 per team and registration closes Tuesday, October 20, 2026.",
  },
  {
    question: "Can I edit my team roster after I register?",
    answer:
      "Yes. After you register, you'll get a registration ID. Anytime before the roster lock, head to levelupsports.us/register/volleyball-tournament/manage and sign in with your captain email + 4-digit PIN to add, remove, or update players.",
  },
  {
    question: "What does the $250 entry fee cover?",
    answer:
      "$250 per team covers all matches, court time, officials, awards, and gym access for the full day. Each team is guaranteed multiple pool-play matches plus playoff matches if they advance.",
  },
  {
    question: "What's the format — 6v6 indoor with pools and playoffs?",
    answer:
      "Yes — 6v6 indoor volleyball on regulation nets, all in one day. The morning is round-robin pool play (every team is guaranteed multiple matches). Top teams from each pool advance to single-elimination playoffs in the afternoon, with the final and awards in the evening.",
  },
  {
    question: "Who can play? Is it co-ed?",
    answer:
      "It's a single co-ed open division. Teams set their own gender mix — there is no required ratio. Every rostered player must be 16 or older on October 24, 2026. Bring a photo ID to check-in.",
  },
  {
    question: "How big is the roster — and can we substitute players?",
    answer:
      "Lock your team's spot with as few as 4 players, then build your roster up to 8 anytime before the tournament. We recommend 6 or more so you can rotate through the 6v6 format. Any rostered player can take the court at any time. Players cannot play for more than one team.",
  },
  {
    question: "What if I don't have enough players or can't field a full team?",
    answer:
      "Call us at (443) 406-6494 or email info@levelupsports.us — we maintain a free-agent list and will help match solo players or short rosters with teams looking for one or two more players.",
  },
  {
    question: "Can spectators come to watch?",
    answer:
      "Absolutely. Friends and family are welcome at no charge. We have dedicated viewing areas around the courts with seating, plus concessions running throughout the day.",
  },
  {
    question: "What if I need to cancel after registering?",
    answer:
      "Refunds in full are available up to 14 days before the tournament (through October 10, 2026). Inside 14 days, refunds are at the club's discretion. Email info@levelupsports.us or call (443) 406-6494 to cancel.",
  },
  {
    question: "Where exactly is the tournament held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking. We're 15 minutes from Middletown, DE; 20 minutes from Newark, DE; 30 minutes from Wilmington, DE; and right off I-95 exit 109A — convenient for teams across MD, DE, and PA.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title:
    "Volleyball Tournament — Oct 24, 2026 | LevelUP Smash Cup, $250/team",
  description:
    "Indoor 6v6 volleyball tournament at LevelUP Sports in Elkton, MD on Saturday, October 24, 2026. Co-ed, ages 16+, up to 8 players per team, $250 per team, cash prizes. Register online and edit your roster anytime.",
  path: "/events/volleyball-tournament",
  ogImage: TOURNAMENT.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function VolleyballTournamentPage() {
  // ── JSON-LD ──
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Volleyball", url: "/volleyball" },
    { name: "Fall Smash Cup Tournament", url: "/events/volleyball-tournament" },
  ]);

  const eventLD = generateEventLD({
    name: TOURNAMENT.name,
    description:
      "One-day indoor 6v6 volleyball tournament — co-ed open division, ages 16+, up to 8 players per team. Pool play from 11 AM, single-elimination playoffs, cash prizes. Regulation indoor courts in Elkton, MD.",
    startDate: TOURNAMENT.startISO,
    endDate: TOURNAMENT.endISO,
    url: "/events/volleyball-tournament",
    isAccessibleForFree: false,
    sport: "Volleyball",
    image: [
      `${SITE_CONFIG.url}${TOURNAMENT.ogImage}`,
      `${SITE_CONFIG.url}${TOURNAMENT.flyer}`,
    ],
    offers: {
      name: "Team Entry",
      price: "250",
      priceCurrency: "USD",
      url: `${SITE_CONFIG.url}${TOURNAMENT.registerHref}`,
      validThrough: TOURNAMENT.registerByISO,
      category: "Tournament Registration",
    },
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Registered Teams — Co-ed Open Division",
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
          HERO — Flyer-style, "Bump. Set. Smash." with action photo
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white">
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary"
          aria-hidden="true"
        />
        {/* Warm radial spotlight — breaks up the navy monotony */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(43, 168, 74, 0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(243, 156, 18, 0.10) 0%, transparent 65%)",
          }}
        />
        {/* Court-line decoration — subtle volleyball court markings */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1200 800"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        >
          <rect x="80" y="120" width="1040" height="560" />
          <line x1="600" y1="120" x2="600" y2="680" />
          <line x1="80" y1="320" x2="1120" y2="320" />
          <line x1="80" y1="480" x2="1120" y2="480" />
          <circle cx="600" cy="400" r="60" />
        </svg>
        {/* Decorative green accent squares */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-12 w-4 h-4 bg-secondary rounded-sm hidden md:block"
        />
        <div
          aria-hidden="true"
          className="absolute top-2/3 right-24 w-3 h-3 bg-secondary rounded-sm hidden md:block"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-12 w-2.5 h-2.5 bg-secondary rounded-sm hidden md:block"
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
                <Link href="/volleyball" className="hover:text-white transition-colors">
                  Volleyball
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Smash Cup — Oct 24</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-6 border border-white/15">
                  <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
                  LevelUP Sports · Elkton, MD · Indoor Volleyball Tournament
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(3rem,9vw,6rem)] font-extrabold">
                    Bump.
                  </span>
                  <span className="block text-[clamp(3rem,9vw,6rem)] font-extrabold">
                    Set.
                  </span>
                  <span className="block text-[clamp(3rem,9vw,6rem)] font-extrabold text-secondary">
                    Smash.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  <span className="font-semibold text-white">Form your squad. Win the cup.</span>{" "}
                  One-day 6v6 indoor volleyball — co-ed, ages 16+, cash prizes on the line.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    size="xl"
                    asChild
                    className="bg-secondary text-primary-dark hover:bg-secondary-light"
                  >
                    <Link href={TOURNAMENT.registerHref}>
                      Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    asChild
                    className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
                  >
                    <a href="#details">Tournament Details</a>
                  </Button>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  Registration closes {TOURNAMENT.registerByLabel}.{" "}
                  <Link
                    href="/register/volleyball-tournament/manage"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Already registered? Edit your roster →
                  </Link>
                  <br />
                  On game day, follow{" "}
                  <Link
                    href="/smash-cup/live"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    live scores &amp; the bracket →
                  </Link>
                </p>
              </div>
            </Reveal>

            {/* Action photo + date sticker — replaces the all-typography
                date card so the hero feels less monotone */}
            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative w-full max-w-[320px] mx-auto lg:max-w-none lg:w-[300px]">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src="/images/sports/volleyball.jpg"
                    alt="Volleyball player spiking the ball at LevelUP Sports indoor court"
                    fill
                    sizes="(max-width: 1024px) 320px, 300px"
                    className="object-cover"
                    priority
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-secondary/20"
                  />
                  {/* Date sticker — anchored bottom of photo */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-0.5">
                        October 2026
                      </p>
                      <p className="font-display font-extrabold text-4xl md:text-5xl text-white tabular-nums leading-none">
                        24
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mt-1.5">
                        Saturday · 11 AM
                      </p>
                    </div>
                    <div className="bg-secondary text-primary-dark rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider shrink-0">
                      6v6
                    </div>
                  </div>
                </div>
                {/* Floating accent badge */}
                <div
                  aria-hidden="true"
                  className="absolute -top-3 -right-3 bg-warning text-primary-dark rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider shadow-lg rotate-6"
                >
                  Cash Prize
                </div>
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
                First Serve In
              </p>
              <CountdownTimer targetDate={new Date(TOURNAMENT.startISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          KEY DETAILS — Diversified icon colors break up the monotony
          ═══════════════════════════════════════════ */}
      <Section id="details">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                label: "Date",
                value: TOURNAMENT.dateShort,
                sub: "Saturday · 11 AM onwards",
                iconBg: "bg-info/10",
                iconColor: "text-info",
                topBar: "bg-info",
              },
              {
                icon: Trophy,
                label: "Prizes",
                value: "Cash Prizes",
                sub: "Trophies + medals for the top two",
                iconBg: "bg-warning/15",
                iconColor: "text-warning",
                topBar: "bg-warning",
              },
              {
                icon: Users,
                label: "Format",
                value: TOURNAMENT.format,
                sub: TOURNAMENT.eligibility,
                iconBg: "bg-accent/10",
                iconColor: "text-accent",
                topBar: "bg-accent",
              },
              {
                icon: CircleDollarSign,
                label: "Entry",
                value: `${TOURNAMENT.price} / Team`,
                sub: "Max 8 players per team",
                iconBg: "bg-secondary/15",
                iconColor: "text-secondary",
                topBar: "bg-secondary",
              },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm h-full relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-1 ${item.topBar}`}
                  />
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.iconBg} ${item.iconColor} mb-3`}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    {item.label}
                  </p>
                  <p className="font-display font-bold text-lg text-neutral-900 leading-snug">
                    {item.value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          WHO PLAYS — Flyer on the left, eligibility stack on the right
          ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-info/5 to-white border-t border-neutral-100">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-5">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:-rotate-1">
                <Image
                  src={TOURNAMENT.flyer}
                  alt="LevelUP Volleyball Tournament flyer — Saturday, October 24, 2026, 11 AM onwards, co-ed ages 16+, maximum 8 players per team, $250 team registration, cash prizes"
                  width={1000}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="rounded-2xl shadow-2xl ring-1 ring-neutral-200"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-info mb-3">
                  One Division · Co-ed · 16+
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                  Who Takes the Court
                </h2>
                <p className="text-neutral-600 mb-8 max-w-xl">
                  Run it back with your high-school crew, your college friends, or the
                  Tuesday-night rec squad. One open bracket means every team plays for the
                  same cup.
                </p>
              </Reveal>
              <StaggerContainer className="space-y-4">
                {ELIGIBILITY.map((e, idx) => {
                  const stripes = [
                    "bg-gradient-to-r from-secondary to-accent",
                    "bg-gradient-to-r from-info to-primary-light",
                    "bg-gradient-to-r from-warning to-accent",
                  ];
                  return (
                    <StaggerItem key={e.label}>
                      <article className="relative bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm overflow-hidden">
                        <div
                          aria-hidden="true"
                          className={`absolute top-0 bottom-0 left-0 w-1.5 ${stripes[idx % stripes.length]}`}
                        />
                        <h3 className="font-display text-lg font-bold text-neutral-900 mb-1 pl-2">
                          {e.label}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed pl-2">{e.detail}</p>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          PRIZES — Warm trophy-gold backdrop for variety
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-warning/5 via-white to-accent/5">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-warning/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
        />
        <Container className="relative">
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning mb-3">
                What You&apos;re Playing For
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Cash, Trophies, and Bragging Rights
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRIZES.map((p, idx) => {
              const tints = [
                {
                  bg: "from-warning/10 to-warning/5",
                  border: "border-warning/25",
                  icon: "text-warning",
                  iconBg: "bg-warning/15",
                },
                {
                  bg: "from-accent/10 to-secondary/5",
                  border: "border-accent/25",
                  icon: "text-accent",
                  iconBg: "bg-accent/15",
                },
                {
                  bg: "from-info/10 to-info/5",
                  border: "border-info/25",
                  icon: "text-info",
                  iconBg: "bg-info/15",
                },
              ];
              const t = tints[idx % tints.length];
              return (
                <StaggerItem key={p.label}>
                  <div
                    className={`bg-gradient-to-br ${t.bg} rounded-2xl p-6 border ${t.border} h-full text-center shadow-sm`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${t.iconBg} mb-3`}
                    >
                      <p.icon className={`h-6 w-6 ${t.icon}`} aria-hidden="true" />
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 mb-2">{p.label}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{p.detail}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE + WHAT TO BRING
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Game Day · Saturday, October 24
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                  How the Day Runs
                </h2>
                <p className="text-neutral-600 mb-6">
                  First serve at 11 AM. Pool play guarantees every team multiple matches, then
                  the top teams move into single-elimination playoffs, capped by the final and
                  awards. Exact bracket times go to captains the week of the tournament.
                </p>
                <div className="bg-white rounded-xl p-5 border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    What to Bring
                  </h3>
                  <ul className="space-y-2">
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
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <ol className="relative border-l-2 border-accent/20 ml-3 space-y-6">
                {SCHEDULE.map((item) => (
                  <li key={item.time} className="pl-6 relative">
                    <span
                      className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent ring-4 ring-white"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-1">
                      <Clock className="inline h-3 w-3 mr-1 -mt-0.5" aria-hidden="true" />
                      {item.time}
                    </p>
                    <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          VENUE
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Venue
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Played at LevelUP Sports — Elkton, MD
              </h2>
              <p className="text-neutral-600">
                Compete where champions train. Pro-grade nets and sprung courts. Free on-site parking. 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.
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
                  Need a partner? We&apos;ll help you find one.
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
                <p className="text-xs text-neutral-500 mt-2">Same-day reply, weekdays.</p>
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
                  Smash Cup Questions, Answered
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={FAQS} />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-neutral-500 mt-8">
                Still have a question?{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2"
                >
                  Email us
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-accent hover:text-accent-hover font-semibold"
                >
                  {SITE_CONFIG.phone}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          FINAL CTA — Custom green-toned banner (breaks up navy)
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-accent via-accent to-secondary text-white">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-light/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary-dark/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute top-8 right-8 w-3 h-3 bg-white/40 rounded-sm hidden md:block"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-12 left-16 w-2 h-2 bg-white/40 rounded-sm hidden md:block"
        />
        <Container className="relative z-10 text-center">
          <h2 className="font-display text-section text-white mb-4 text-balance">
            Lock In Your Team&apos;s Spot
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            $250 per team. Lock your spot with as few as 4 players and build to 8. Registration
            closes {TOURNAMENT.registerByLabel}. Edit your lineup anytime before the tournament.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="xl"
              asChild
              className="bg-white text-accent hover:bg-neutral-50 shadow-lg"
            >
              <Link href={TOURNAMENT.registerHref}>
                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-accent"
              asChild
            >
              <Link href="/volleyball">Explore Volleyball at LevelUP</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
