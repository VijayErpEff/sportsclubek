import { Metadata } from "next";
import Link from "next/link";
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
import { getRedirect } from "@/lib/constants/redirects";

// ── Tournament constants (single source of truth) ──────────────────
const TOURNAMENT = {
  name: "LevelUP Smash Cup — Indoor Volleyball Tournament",
  shortName: "LevelUP Smash Cup",
  tagline: "Bump. Set. Smash.",
  promise: "Form your squad. Win the cup.",
  date: "Saturday & Sunday, June 6–7, 2026",
  dateShort: "Jun 6–7, 2026",
  startISO: "2026-06-06T09:00:00-04:00",
  endISO: "2026-06-07T19:00:00-04:00",
  registerByISO: "2026-06-02T23:59:00-04:00",
  registerByLabel: "Tuesday, June 2, 2026",
  price: "$200",
  priceUnit: "per team",
  format: "6v6 Indoor",
  structure: "Pool Play + Single-Elimination Playoffs",
  rosterSize: "6–10 players",
  registerHref: "/register/volleyball-tournament",
  upperHandSlug: "volleyball-tournament",
  flyer: "/images/Content/volleyball-smash-cup-flyer.jpg",
  ogImage: "/images/og/volleyball-smash-cup.jpg",
};

const DIVISIONS = [
  {
    label: "Youth Division",
    badge: "12–17",
    description:
      "Co-ed brackets for ages 12–17. Same 6v6 format, same pro-grade nets and sprung courts — built for our next generation of competitive players.",
    accent: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    label: "Adult Division",
    badge: "18+",
    description:
      "Co-ed brackets for ages 18 and up. Recreational squads through serious club teams welcome — a real tournament weekend, win or lose.",
    accent: "text-accent",
    bg: "bg-accent/10",
  },
];

const SCHEDULE = [
  {
    time: "Sat 8:30 AM",
    title: "Check-in & Warm-up",
    description:
      "Captains check in, sign waivers, and confirm rosters. Courts open for warm-up at 8:30 AM sharp.",
  },
  {
    time: "Sat 9:30 AM",
    title: "Pool Play — Day 1",
    description:
      "Every team plays a guaranteed minimum of four pool matches across both divisions. Pools seeded after registration closes.",
  },
  {
    time: "Sat 6:00 PM",
    title: "Day 1 Wrap & Standings",
    description:
      "Final pool standings posted. Teams advance into the bracket draw for Sunday's playoffs.",
  },
  {
    time: "Sun 9:00 AM",
    title: "Playoff Brackets",
    description:
      "Single-elimination playoffs — Youth and Adult divisions run on parallel courts.",
  },
  {
    time: "Sun 4:30 PM",
    title: "Finals & Awards",
    description:
      "Division finals followed by trophies, cash prizes, and gift-card medals for runners-up.",
  },
];

const PRIZES = [
  {
    icon: Trophy,
    label: "Champion (per division)",
    detail: "Cash prize + championship trophy + LevelUP gear",
  },
  {
    icon: Award,
    label: "Runner-up",
    detail: "Gift cards + medals for every player",
  },
  {
    icon: Sparkles,
    label: "All-Tournament Team",
    detail: "Selected by coaches across both divisions",
  },
];

const WHAT_TO_BRING = [
  "Indoor non-marking court shoes (required)",
  "Light athletic clothing — facility is climate-controlled",
  "Water bottle (refill stations on-site)",
  "Knee pads (recommended)",
  "Roster confirmation + signed waivers (sent after registration)",
];

const FAQS = [
  {
    question: "How do I register a team for the LevelUP Smash Cup?",
    answer:
      "Register online at levelupsports.us/register/volleyball-tournament. Pick a division (Youth 12–17 or Adult 18+), enter your team and captain info, add 6–10 players, and pick your payment option. Entry is $200 per team and registration closes Tuesday, June 2, 2026.",
  },
  {
    question: "Can I edit my team roster after I register?",
    answer:
      "Yes. After you register, you'll get a registration ID. Anytime before the roster lock, head to levelupsports.us/register/volleyball-tournament/manage and sign in with your captain email + 4-digit PIN to add, remove, or update players.",
  },
  {
    question: "What does the $200 entry fee cover?",
    answer:
      "$200 per team covers all matches across both days, court time, officials, awards, and gym access throughout the tournament. Each team is guaranteed a minimum of four pool-play matches plus playoff matches if they advance.",
  },
  {
    question: "What's the format — 6v6 indoor with pools and playoffs?",
    answer:
      "Yes — 6v6 indoor volleyball on regulation nets. Saturday is round-robin pool play (every team is guaranteed a minimum number of matches). Top teams from each pool advance to single-elimination playoffs on Sunday.",
  },
  {
    question: "Are Youth and Adult divisions both co-ed?",
    answer:
      "Both divisions are co-ed. Teams set their own gender mix — there is no required ratio. Youth Division is for ages 12–17; Adult Division is for ages 18 and up.",
  },
  {
    question: "How big is the roster — and can we substitute players?",
    answer:
      "Rosters are 6–10 players. You can use any combination of rostered players on the court at any time during the tournament. Players cannot play for more than one team in the same division.",
  },
  {
    question: "What if I don't have enough players or can't field a full team?",
    answer:
      "Call us at (443) 406-6494 or email info@levelupsports.us — we maintain a free-agent list and will help match solo players or short rosters with teams looking for one or two more players.",
  },
  {
    question: "Can spectators come to watch?",
    answer:
      "Absolutely. Friends and family are welcome at no charge. We have dedicated viewing areas around the courts with seating, plus concessions running throughout the day on Saturday and Sunday.",
  },
  {
    question: "What if I need to cancel after registering?",
    answer:
      "Refunds in full are available up to 14 days before the tournament. Inside 14 days, refunds are at the club's discretion. Email info@levelupsports.us or call (443) 406-6494 to cancel.",
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
    "LevelUP Smash Cup — Volleyball Tournament Jun 6–7, 2026 | $200/team",
  description:
    "Indoor 6v6 volleyball tournament at LevelUP Sports in Elkton, MD on June 6–7, 2026. Co-ed Youth (12–17) and Adult (18+) divisions, $200 per team, 6–10 player rosters, cash + trophies. Register online and edit your roster anytime.",
  path: "/events/volleyball-tournament",
  ogImage: TOURNAMENT.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function VolleyballTournamentPage() {
  // Hide the Upper Hand secondary CTA if no destination has been wired up yet.
  const upperHandEntry = getRedirect(TOURNAMENT.upperHandSlug);
  const showUpperHand =
    !!upperHandEntry && !upperHandEntry.destination.includes("TBD");

  // ── JSON-LD ──
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Volleyball", url: "/volleyball" },
    { name: "Smash Cup Tournament", url: "/events/volleyball-tournament" },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: TOURNAMENT.name,
      description:
        "Indoor 6v6 volleyball tournament with co-ed Youth (12–17) and Adult (18+) divisions. Pool play Saturday, single-elimination playoffs Sunday, on regulation indoor courts in Elkton, MD.",
      startDate: TOURNAMENT.startISO,
      endDate: TOURNAMENT.endISO,
      url: "/events/volleyball-tournament",
      isAccessibleForFree: false,
    }),
    image: [
      `${SITE_CONFIG.url}${TOURNAMENT.ogImage}`,
      `${SITE_CONFIG.url}${TOURNAMENT.flyer}`,
    ],
    sport: "Volleyball",
    offers: {
      "@type": "Offer",
      name: "Team Entry",
      price: "200",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}${TOURNAMENT.registerHref}`,
      validThrough: TOURNAMENT.registerByISO,
      category: "Tournament Registration",
    },
    subEvent: [
      {
        "@type": "SportsEvent",
        name: "LevelUP Smash Cup — Youth Division (12–17)",
        description:
          "Co-ed 6v6 indoor volleyball brackets for ages 12–17. Pool play and single-elimination playoffs.",
        startDate: TOURNAMENT.startISO,
        endDate: TOURNAMENT.endISO,
        sport: "Volleyball",
        url: `${SITE_CONFIG.url}/events/volleyball-tournament#youth`,
      },
      {
        "@type": "SportsEvent",
        name: "LevelUP Smash Cup — Adult Division (18+)",
        description:
          "Co-ed 6v6 indoor volleyball brackets for adults 18 and up. Pool play and single-elimination playoffs.",
        startDate: TOURNAMENT.startISO,
        endDate: TOURNAMENT.endISO,
        sport: "Volleyball",
        url: `${SITE_CONFIG.url}/events/volleyball-tournament#adult`,
      },
    ],
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
    },
    performer: {
      "@type": "PerformingGroup",
      name: "Registered Teams — Youth & Adult Divisions",
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
          HERO — Flyer-style, "Bump. Set. Smash."
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white">
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary"
          aria-hidden="true"
        />
        {/* Decorative green accent squares — echoing the flyer's design language */}
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
              <li className="text-white font-medium">Smash Cup — Jun 6–7</li>
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
                  6v6 indoor volleyball — co-ed Youth and Adult divisions on game day.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-primary-dark hover:bg-secondary-light">
                    <Link href={TOURNAMENT.registerHref}>
                      Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {showUpperHand && (
                    <Button
                      size="xl"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-primary"
                      asChild
                    >
                      <Link href={`/go/${TOURNAMENT.upperHandSlug}`}>
                        Pay & Register on Upper Hand
                      </Link>
                    </Button>
                  )}
                </div>
                <p className="text-sm text-white/60 mt-6">
                  Registration closes {TOURNAMENT.registerByLabel}.{" "}
                  <Link
                    href="/register/volleyball-tournament/manage"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Already registered? Edit your roster →
                  </Link>
                </p>
              </div>
            </Reveal>

            {/* Date stamp card — echoes the flyer's "06 — 07" treatment */}
            <Reveal variant="fade-left" delay={0.15}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8 md:p-10 text-center min-w-[220px] shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-2">
                  June
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6">
                  2026
                </p>
                <div className="space-y-2">
                  <div className="font-display font-extrabold text-6xl md:text-7xl tabular-nums">
                    06
                  </div>
                  <div className="text-2xl text-white/40 font-light leading-none">—/—</div>
                  <div className="font-display font-extrabold text-6xl md:text-7xl tabular-nums">
                    07
                  </div>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Sat &amp; Sun
                </p>
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
          KEY DETAILS
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                label: "Dates",
                value: TOURNAMENT.dateShort,
                sub: "Saturday & Sunday",
              },
              {
                icon: Trophy,
                label: "Prizes",
                value: "Cash + Trophies",
                sub: "Gift cards & medals for runners-up",
              },
              {
                icon: Users,
                label: "Format",
                value: TOURNAMENT.format,
                sub: "Co-ed · Youth & Adult divisions",
              },
              {
                icon: CircleDollarSign,
                label: "Entry",
                value: `${TOURNAMENT.price} / Team`,
                sub: TOURNAMENT.rosterSize + " roster",
              },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
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
          DIVISIONS
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Two Divisions · Both Co-ed
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                A Bracket for Every Squad
              </h2>
              <p className="text-neutral-600">
                Run it back with your high-school crew or rally a backyard club — there&apos;s a division built for the way you play.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {DIVISIONS.map((d, idx) => (
              <StaggerItem key={d.label}>
                <article
                  id={idx === 0 ? "youth" : "adult"}
                  className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full flex flex-col"
                >
                  <div
                    className={`inline-flex items-center gap-2 ${d.bg} ${d.accent} text-sm font-bold rounded-lg px-3 py-1.5 self-start mb-4`}
                  >
                    <span className="font-mono tracking-tight">{d.badge}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {d.label}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{d.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          PRIZES
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                What You&apos;re Playing For
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Cash, Trophies, and Bragging Rights
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PRIZES.map((p) => (
              <StaggerItem key={p.label}>
                <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl p-6 border border-accent/15 h-full text-center">
                  <p.icon className="h-8 w-8 text-accent mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-display font-bold text-neutral-900 mb-2">{p.label}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{p.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          SCHEDULE + WHAT TO BRING
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Tournament Weekend
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                  How the Weekend Runs
                </h2>
                <p className="text-neutral-600 mb-6">
                  Day 1 is pool play — every team is guaranteed multiple matches. Day 2 is single-elimination playoffs across both divisions, capped by finals and awards.
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
          FINAL CTA
          ═══════════════════════════════════════════ */}
      <CTABanner
        title="Lock In Your Team's Spot"
        description={`$200 per team. ${TOURNAMENT.rosterSize} rosters. Registration closes ${TOURNAMENT.registerByLabel}. Edit your lineup anytime before the lock.`}
        primaryCTA={{
          label: "Register Your Team",
          href: TOURNAMENT.registerHref,
        }}
        secondaryCTA={{
          label: "Explore Volleyball at LevelUP",
          href: "/volleyball",
        }}
      />
    </>
  );
}
