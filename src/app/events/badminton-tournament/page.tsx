import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  CircleDollarSign,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
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

// ── Tournament constants ────────────────────────────────────────────
const TOURNAMENT = {
  name: "LevelUP Badminton Tournament",
  tagline: "Compete. Smash. Win.",
  date: "Saturday, May 30, 2026",
  startTime: "10:00 AM",
  endTime: "6:00 PM",
  startISO: "2026-05-30T10:00:00-04:00",
  endISO: "2026-05-30T18:00:00-04:00",
  registerByISO: "2026-05-26T23:59:00-04:00",
  registerByLabel: "Monday, May 26, 2026",
  price: "$80",
  priceUnit: "per team",
  format: "Doubles",
  structure: "Round Robin + Playoffs",
  registerUrl:
    "https://app.upperhand.io/customers/2578-levelup-sports-and-athletics-club/events/194712-levelup-badminton-tournament",
  flyer: "/images/Content/badminton-tournament-may-30.jpeg",
};

const DIVISIONS = [
  {
    label: "Beginner",
    description:
      "For new players with limited tournament experience. Friendly, fundamentals-focused brackets.",
    accent: "text-secondary",
  },
  {
    label: "Intermediate",
    description:
      "For players with some tournament experience who want competitive matches at their level.",
    accent: "text-accent",
  },
  {
    label: "Advanced",
    description:
      "For experienced and competitive players. High-paced rallies and serious competition.",
    accent: "text-primary",
  },
];

const SCHEDULE = [
  {
    time: "9:30 AM",
    title: "Check-in & Warm-up",
    description: "Arrive 30 minutes early for check-in, captain's meeting, and on-court warm-up.",
  },
  {
    time: "10:00 AM",
    title: "Round Robin Begins",
    description: "Group play across Beginner, Intermediate, and Advanced divisions on three BWF-standard courts.",
  },
  {
    time: "1:00 PM",
    title: "Lunch Break",
    description: "Light refreshments available on-site. Final group standings posted before playoffs.",
  },
  {
    time: "2:00 PM",
    title: "Playoffs",
    description: "Top teams from each group advance into knockout brackets within their division.",
  },
  {
    time: "5:30 PM",
    title: "Finals & Awards",
    description: "Division finals followed by trophies for first place in every bracket.",
  },
];

const WHAT_TO_BRING = [
  "Your own racket (rentals available on request)",
  "Indoor non-marking court shoes",
  "Light athletic clothing — facility is climate-controlled at 72°F",
  "Water bottle (refill stations on-site)",
  "Towel and a positive attitude",
];

const FAQS = [
  {
    question: "How do I register for the tournament?",
    answer:
      "Registration is handled through Upper Hand. Click any 'Register Your Team' button on this page or go to levelupsports.us/go/badminton-tournament. Entry is $80 per doubles team and registration closes Monday, May 26, 2026.",
  },
  {
    question: "Can I register as an individual without a partner?",
    answer:
      "The tournament is a doubles format, so you'll need a partner to register your team. If you're looking for a partner, call us at (443) 406-6494 or email info@levelupsports.us — we'll do our best to connect you with another solo registrant in your division.",
  },
  {
    question: "How do I pick the right division?",
    answer:
      "Beginner is for players new to tournaments. Intermediate is for players with some tournament or league experience. Advanced is for experienced competitive players. If you're unsure, pick the lower of the two divisions you're considering — competition is faster than open play.",
  },
  {
    question: "What's the format — Round Robin and playoffs?",
    answer:
      "Each division starts with Round Robin group play so every team is guaranteed multiple matches. Top teams from each group then advance to single-elimination playoffs to determine division champions.",
  },
  {
    question: "Can spectators come to watch?",
    answer:
      "Absolutely — friends and family are welcome at no charge. We have a dedicated viewing area with seating around the courts, and concessions will be available throughout the day.",
  },
  {
    question: "What if I need to cancel after registering?",
    answer:
      "Cancellations are handled through Upper Hand. Refund eligibility depends on how close to the event you cancel — please reach out to us at (443) 406-6494 if you need help.",
  },
  {
    question: "Are the courts BWF-standard?",
    answer:
      "Yes. All matches are played on our three BWF-standard courts with synthetic sprung flooring, tournament-calibrated LED lighting, and professional nets — the same surface you'd find at certified competitions.",
  },
  {
    question: "Where exactly is the tournament held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking. We're 15 minutes from Middletown, DE; 20 minutes from Newark, DE; and 30 minutes from Wilmington, DE — right off I-95 exit 109A.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title:
    "LevelUP Badminton Tournament — May 30, 2026 | Doubles, $80/team",
  description:
    "Join the LevelUP Badminton Tournament on Saturday, May 30 in Elkton, MD. Doubles format, $80 per team, Beginner / Intermediate / Advanced divisions. Round Robin + playoffs on BWF-standard courts. Register by May 26.",
  path: "/events/badminton-tournament",
  ogImage: TOURNAMENT.flyer,
});

// ── Page ────────────────────────────────────────────────────────────
export default function BadmintonTournamentPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Badminton", url: "/badminton" },
    { name: "Tournament — May 30", url: "/events/badminton-tournament" },
  ]);

  const eventLD = generateEventLD({
    name: TOURNAMENT.name,
    description:
      "Doubles badminton tournament with Beginner, Intermediate, and Advanced divisions. Round Robin group play followed by playoffs on BWF-standard courts.",
    startDate: TOURNAMENT.startISO,
    endDate: TOURNAMENT.endISO,
    url: "/events/badminton-tournament",
    isAccessibleForFree: false,
    sport: "Badminton",
    image: [`${SITE_CONFIG.url}${TOURNAMENT.flyer}`],
    performer: {
      "@type": "PerformingGroup",
      name: "Registered Players — Beginner, Intermediate & Advanced Divisions",
    },
    offers: {
      price: "80",
      priceCurrency: "USD",
      url: TOURNAMENT.registerUrl,
      validThrough: TOURNAMENT.registerByISO,
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
          HERO — Event headline + countdown + register CTA
          ═══════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light text-white">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-accent" aria-hidden="true" />
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
              <li className="text-white font-medium">Tournament — May 30</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-5">
                  <Trophy className="h-3.5 w-3.5" />
                  Tournament — Limited Spots
                </p>
                <h1 className="font-display text-hero leading-[1.05] mb-4 text-balance">
                  LevelUP Badminton{" "}
                  <span className="text-accent">Tournament</span>
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  {TOURNAMENT.tagline} — A one-day doubles tournament across three skill divisions on our BWF-standard courts in Elkton, MD.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-accent hover:bg-accent-hover">
                    <a
                      href={TOURNAMENT.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
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
                  Registration closes {TOURNAMENT.registerByLabel}.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-square max-w-md mx-auto">
                <Image
                  src={TOURNAMENT.flyer}
                  alt="LevelUP Badminton Tournament flyer — Saturday, May 30, $80 per team, doubles tournament with Beginner, Intermediate, and Advanced divisions"
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
          COUNTDOWN — Time until tip-off
          ═══════════════════════════════════════════ */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-10">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Tournament Tip-Off
              </p>
              <CountdownTimer targetDate={new Date(TOURNAMENT.startISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          KEY DETAILS — Date / Time / Price / Format
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                label: "Date",
                value: TOURNAMENT.date,
              },
              {
                icon: Clock,
                label: "Time",
                value: `${TOURNAMENT.startTime} – ${TOURNAMENT.endTime}`,
              },
              {
                icon: CircleDollarSign,
                label: "Entry",
                value: `${TOURNAMENT.price} ${TOURNAMENT.priceUnit}`,
              },
              {
                icon: Users,
                label: "Format",
                value: `${TOURNAMENT.format} · ${TOURNAMENT.structure}`,
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
          DIVISIONS — Three skill levels
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Three Divisions
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                A Bracket for Every Skill Level
              </h2>
              <p className="text-neutral-600">
                Whether you&apos;re playing your first competitive match or chasing tournament points, there&apos;s a division built for you.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {DIVISIONS.map((d) => (
              <StaggerItem key={d.label}>
                <div className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full flex flex-col">
                  <Trophy className={`h-7 w-7 ${d.accent} mb-4`} aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {d.label}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          DAY-OF SCHEDULE
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Day of the Tournament
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                  How the Day Runs
                </h2>
                <p className="text-neutral-600 mb-6">
                  Every team is guaranteed multiple Round Robin matches, with top teams advancing into single-elimination playoffs in their division.
                </p>
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                  <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    What to Bring
                  </h3>
                  <ul className="space-y-2">
                    {WHAT_TO_BRING.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
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
          LOCATION & CONTACT
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
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
                Free on-site parking. Climate-controlled facility. Three BWF-standard courts with tournament-grade LED lighting.
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
                  Call for partner-matching help
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
                  Questions? We reply same-day.
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
                  Tournament Questions, Answered
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
        title="Secure Your Team's Spot"
        description={`$80 per doubles team. Registration closes ${TOURNAMENT.registerByLabel}. Limited spots — book now to lock in your division.`}
        primaryCTA={{
          label: "Register on Upper Hand",
          href: TOURNAMENT.registerUrl,
        }}
        secondaryCTA={{
          label: "Explore Badminton at LevelUP",
          href: "/badminton",
        }}
      />
    </>
  );
}
