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
import { generateBreadcrumbLD, generateEventLD, generateFAQLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { TOURNAMENTS } from "@/lib/constants/tournaments";

const T = TOURNAMENTS.lpcl;

// ── Tournament constants (single source of truth) ──────────────────
const EVENT = {
  name: "LPCL Kick Off — LevelUP Premier Cricket League",
  league: "LevelUP Premier Cricket League",
  date: "Friday, November 6, 2026",
  dateShort: "Fri, Nov 6, 2026",
  startISO: "2026-11-06T17:00:00-05:00",
  endISO: "2026-11-06T23:00:00-05:00",
  registerByISO: "2026-11-03T23:59:00-05:00",
  registerByLabel: "Tuesday, November 3, 2026",
  time: "5:00 PM onwards",
  fee: "$850",
  flyer: "/images/Content/lpcl-kickoff-flyer.jpg",
  ogImage: "/images/og/lpcl-kickoff.jpg",
  /** League contacts printed on the flyer, alongside the club line. */
  leaguePhones: ["614-943-0733", "615-593-9974"],
};

const PRIZES = [
  {
    icon: Trophy,
    label: "Winners",
    amount: "$1,000",
    detail: "Cash prize + championship trophy",
  },
  {
    icon: Award,
    label: "Runners-up",
    amount: "$500",
    detail: "Cash prize + runners-up trophy",
  },
];

const WHO_PLAYS = [
  {
    label: "Open to every cricket team",
    detail:
      "Club sides, office teams, weekend regulars, friends-and-family XIs — if you've got a squad that loves the game, you're in.",
  },
  {
    label: `${T.minPlayers}–${T.maxPlayers} players per squad`,
    detail: `Lock your spot with ${T.minPlayers} and build to ${T.maxPlayers}. Everyone on the roster must be ${T.minAge} or older.`,
  },
  {
    label: "Indoor, under the lights",
    detail:
      "Played on LevelUP's full-length indoor pitch. No weather, no dew, no early sunset — just cricket on a Friday night.",
  },
];

const SCHEDULE = [
  {
    time: "4:30 PM",
    title: "Captains check-in",
    description:
      "Captains confirm squads and sign waivers at the desk. Nets open for a warm-up knock.",
  },
  {
    time: "5:00 PM",
    title: "Kick off — first ball",
    description:
      "Opening fixtures get under way. Match format, overs, and the full fixture list go to captains after registration closes.",
  },
  {
    time: "Evening",
    title: "Finals & presentation",
    description:
      "Trophies and cash prizes for the winners and runners-up to close the night.",
  },
];

const WHAT_TO_BRING = [
  "Your own bat and protective gear if you have them (club gear available to borrow)",
  "Indoor non-marking shoes (required on the pitch)",
  "Light athletic clothing — the facility is climate-controlled",
  "Water bottle (refill stations on-site)",
  "Photo ID for age verification",
];

const FAQS = [
  {
    question: "How do I register a team for the LPCL Kick Off?",
    answer: `Register online at levelupsports.us${T.registerHref}. Enter your team and captain info, add ${T.minPlayers}–${T.maxPlayers} players (all ${T.minAge}+), and pick your payment option — card now, or pay at the desk. Registration closes ${EVENT.registerByLabel}.`,
  },
  {
    question: "What does it cost to enter a team?",
    answer:
      "$850 per team. One fee covers the whole squad for the night — pay by card when you register, or register now and pay at the desk before the deadline.",
  },
  {
    question: "What if we need to withdraw?",
    answer:
      "Withdraw in writing before registration closes on November 3, 2026 and your entry fee is credited to your account, less a $25 administrative fee. After the deadline, and once fixtures are posted, entry fees are non-refundable. If we cancel the event, entry fees are refunded in full.",
  },
  {
    question: "What are the prizes?",
    answer:
      "Winners take home $1,000 and the championship trophy. Runners-up take home $500 and a trophy.",
  },
  {
    question: "What's the format?",
    answer:
      "Indoor cricket on LevelUP's full-length pitch. The exact format — overs per side, number of fixtures, and the path to the final — depends on how many teams enter and is sent to every captain once registration closes.",
  },
  {
    question: "Can I edit my squad after I register?",
    answer:
      "Yes. Your team lives in the LevelUP app on the account that uses your captain email. After you register, you'll get a \"set your password\" email (if you're new) — sign in at app.levelupsports.us to add, remove, or update players anytime before the squad lock.",
  },
  {
    question: "What if I don't have a full team?",
    answer:
      "Call the league line at 614-943-0733 or email info@levelupsports.us — we keep a list of players looking for a side and will help fill short squads.",
  },
  {
    question: "Can spectators come to watch?",
    answer:
      "Absolutely. Friends and family are welcome at no charge, with viewing areas around the pitch and concessions open through the evening.",
  },
  {
    question: "Where is it held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "LPCL Kick Off — Cricket Tournament Nov 6, 2026 | $1,000 Prize",
  description:
    "LevelUP Premier Cricket League kicks off Friday, November 6, 2026 at LevelUP Sports in Elkton, MD. Indoor cricket from 5 PM, trophies for winners and runners-up, $1,000 and $500 cash prizes. Registrations open.",
  path: T.eventHref,
  ogImage: EVENT.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function CricketLeaguePage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Cricket", url: "/cricket" },
    { name: "LPCL Kick Off", url: T.eventHref },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: EVENT.name,
      description:
        "Opening night of the LevelUP Premier Cricket League: indoor cricket on a full-length pitch in Elkton, MD. Trophies for winners and runners-up, $1,000 and $500 cash prizes.",
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      url: T.eventHref,
      isAccessibleForFree: false,
      sport: "Cricket",
      image: [`${SITE_CONFIG.url}${EVENT.ogImage}`, `${SITE_CONFIG.url}${EVENT.flyer}`],
      organizer: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
      },
      performer: { "@type": "PerformingGroup", name: "Registered Teams — LPCL" },
    }),
    offers: {
      "@type": "Offer",
      name: "Team Entry",
      price: "850",
      priceCurrency: "USD",
      category: "Tournament Registration",
      url: `${SITE_CONFIG.url}${T.registerHref}`,
      availability: "https://schema.org/InStock",
      validThrough: EVENT.registerByISO,
    },
  };

  const faqLD = generateFAQLD(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      {/* ═══════════════════════════════════════════
          HERO — Navy, with the flyer as a pinned poster
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white pt-28 md:pt-32 pb-16 md:pb-24">
        <div aria-hidden="true" className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-secondary/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/cricket" className="hover:text-white transition-colors">Cricket</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">LPCL Kick Off — Nov 6</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-6 border border-white/15">
                  <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
                  {EVENT.league} · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(3.5rem,10vw,7rem)] font-extrabold">LPCL</span>
                  <span className="block text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold text-secondary">
                    Kick Off
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  <span className="font-semibold text-white">Registrations are open.</span>{" "}
                  Indoor cricket under the lights, Friday, November 6 from 5 PM. $850 per team, with
                  $1,000 to the winners and $500 to the runners-up.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-primary-dark hover:bg-secondary-light">
                    <Link href={T.registerHref}>
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
                  Registration closes {EVENT.registerByLabel}.{" "}
                  <Link
                    href={`${T.registerHref}/manage`}
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Already registered? Manage your team →
                  </Link>
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative w-full max-w-[320px] mx-auto lg:max-w-none lg:w-[340px]">
                <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={EVENT.flyer}
                    alt="LPCL Kick Off flyer — LevelUP Premier Cricket League, Friday, November 6, 5 PM onwards, registrations open, trophies for winners and runners, cash prizes $1,000 winners and $500 runners, at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD"
                    fill
                    sizes="(max-width: 1024px) 320px, 340px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -top-3 -right-3 bg-warning text-primary-dark rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider shadow-lg rotate-6"
                >
                  $1,000 Prize
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-10">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">First Ball In</p>
              <CountdownTimer targetDate={new Date(EVENT.startISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* KEY DETAILS */}
      <Section id="details">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Calendar, label: "Date", value: EVENT.dateShort, sub: "Friday · 5 PM onwards", iconBg: "bg-info/10", iconColor: "text-info", topBar: "bg-info" },
              { icon: Trophy, label: "Prizes", value: "$1,000 · $500", sub: "Winners · Runners-up, plus trophies", iconBg: "bg-warning/15", iconColor: "text-warning", topBar: "bg-warning" },
              { icon: Users, label: "Squad", value: `${T.minPlayers}–${T.maxPlayers} players`, sub: `Ages ${T.minAge}+ · open to all teams`, iconBg: "bg-accent/10", iconColor: "text-accent", topBar: "bg-accent" },
              { icon: CircleDollarSign, label: "Entry", value: `${EVENT.fee} / Team`, sub: "Pay by card or at the desk", iconBg: "bg-secondary/15", iconColor: "text-secondary", topBar: "bg-secondary" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm h-full relative overflow-hidden">
                  <div aria-hidden="true" className={`absolute top-0 left-0 right-0 h-1 ${item.topBar}`} />
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.iconBg} ${item.iconColor} mb-3`}>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">{item.label}</p>
                  <p className="font-display font-bold text-lg text-neutral-900 leading-snug">{item.value}</p>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* PRIZES — two big cards, deliberately uneven */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-warning/5 via-white to-accent/5">
        <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-warning/10 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning mb-3">What You&apos;re Playing For</p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Trophies for Winners &amp; Runners-up. Cash on Top.
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-[3fr_2fr] gap-5 max-w-4xl mx-auto items-end">
            {PRIZES.map((p, idx) => (
              <StaggerItem key={p.label}>
                <div
                  className={`rounded-2xl border text-center shadow-sm ${
                    idx === 0
                      ? "bg-gradient-to-br from-warning/15 to-warning/5 border-warning/30 p-8 md:p-10"
                      : "bg-gradient-to-br from-neutral-100 to-white border-neutral-200 p-6 md:p-8"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center rounded-xl mb-3 ${idx === 0 ? "w-14 h-14 bg-warning/20" : "w-12 h-12 bg-neutral-200"}`}>
                    <p.icon className={`${idx === 0 ? "h-7 w-7 text-warning" : "h-6 w-6 text-neutral-500"}`} aria-hidden="true" />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">{p.label}</p>
                  <p className={`font-mono font-bold text-neutral-900 leading-none mt-2 ${idx === 0 ? "text-5xl md:text-6xl" : "text-4xl"}`}>
                    {p.amount}
                  </p>
                  <p className="text-sm text-neutral-600 mt-3">{p.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* WHO PLAYS */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-info/5 to-white border-t border-neutral-100">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 lg:order-2">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-info mb-3">Open Entry · Ages {T.minAge}+</p>
                <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">Who Takes the Pitch</h2>
                <p className="text-neutral-600 mb-8 max-w-xl">
                  The Premier Cricket League is built for the teams that already play together every
                  weekend — and the ones that have been meaning to. Kick Off is where the season starts.
                </p>
              </Reveal>
              <StaggerContainer className="space-y-4">
                {WHO_PLAYS.map((e, idx) => {
                  const stripes = [
                    "bg-gradient-to-r from-secondary to-accent",
                    "bg-gradient-to-r from-info to-primary-light",
                    "bg-gradient-to-r from-warning to-accent",
                  ];
                  return (
                    <StaggerItem key={e.label}>
                      <article className="relative bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm overflow-hidden">
                        <div aria-hidden="true" className={`absolute top-0 bottom-0 left-0 w-1.5 ${stripes[idx % stripes.length]}`} />
                        <h3 className="font-display text-lg font-bold text-neutral-900 mb-1 pl-2">{e.label}</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed pl-2">{e.detail}</p>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
            <Reveal variant="fade-right" className="lg:col-span-5 lg:order-1">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:-rotate-1">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-neutral-200">
                  <Image
                    src="/images/sports/cricket.jpg"
                    alt="Cricket training on the indoor pitch at LevelUP Sports"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SCHEDULE + WHAT TO BRING */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Kick Off Night · Friday, November 6</p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">How the Night Runs</h2>
                <p className="text-neutral-600 mb-6">
                  Doors and nets open before the first ball at 5 PM. Fixtures, overs, and the route to
                  the final are confirmed to captains once registration closes.
                </p>
                <div className="bg-white rounded-xl p-5 border border-neutral-200">
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
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent ring-4 ring-white" aria-hidden="true" />
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-1">
                      <Clock className="inline h-3 w-3 mr-1 -mt-0.5" aria-hidden="true" />
                      {item.time}
                    </p>
                    <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* VENUE + CONTACTS */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Venue &amp; Contacts</p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                Played at LevelUP Sports — Elkton, MD
              </h2>
              <p className="text-neutral-600">
                Full-length indoor pitch, pro nets, free on-site parking. 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <MapPin className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Address</p>
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">League Contacts</p>
                <ul className="space-y-1">
                  {EVENT.leaguePhones.map((n) => (
                    <li key={n}>
                      <a href={`tel:${n}`} className="font-semibold text-neutral-900 hover:text-accent">{n}</a>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-500 mt-2">
                  Club line:{" "}
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-accent">{SITE_CONFIG.phone}</a>
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <Mail className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Email</p>
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-neutral-900 hover:text-accent break-all">
                  {SITE_CONFIG.email}
                </a>
                <p className="text-xs text-neutral-500 mt-2">Same-day reply, weekdays.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="alternate">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
                <h2 className="font-display text-section text-neutral-900 text-balance">LPCL Questions, Answered</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={FAQS} />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-center text-sm text-neutral-500 mt-8">
                Still have a question?{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2">
                  Email us
                </a>{" "}
                or call{" "}
                <a href={`tel:${EVENT.leaguePhones[0]}`} className="text-accent hover:text-accent-hover font-semibold">
                  {EVENT.leaguePhones[0]}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-accent via-accent to-secondary text-white">
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-light/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary-dark/20 blur-3xl" />
        <Container className="relative z-10 text-center">
          <h2 className="font-display text-section text-white mb-4 text-balance">Get Your Team on the Pitch</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {EVENT.fee} per team. Lock your spot with as few as {T.minPlayers} players and build to{" "}
            {T.maxPlayers}. Registration closes {EVENT.registerByLabel}. Edit your squad anytime before
            kick off.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="xl" asChild className="bg-white text-accent hover:bg-neutral-50 shadow-lg">
              <Link href={T.registerHref}>
                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-accent" asChild>
              <Link href="/cricket">Explore Cricket at LevelUP</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
