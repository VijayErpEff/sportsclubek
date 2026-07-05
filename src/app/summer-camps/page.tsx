import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbLD,
  generateFAQLD,
  generateEventLD,
  generateCourseLD,
} from "@/lib/seo/json-ld";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import {
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  Sun,
  Users,
  MapPin,
  Phone,
  Sparkles,
  Award,
  Trophy,
  Cpu,
  Zap,
} from "lucide-react";

const FLYER_IMAGE = "/images/sports/LevelUp/Summer Camp Code Ninjas.png";
/** In-page anchor for the program picker — generic CTAs scroll here. */
const REGISTER_URL = "#register";

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Summer Camp 2026 — Elkton, MD | LevelUP × Code Ninjas",
  description:
    "LevelUP × Code Ninjas Summer Camp 2026 in Elkton, MD — Where Play Meets Coding! Coding, robotics, and sports rotations for ages 5+. Full Day $299, Half Day $199 (Sports OR Coding, AM or PM batch). Two weeks: July 13 and August 10. Register now — spots are limited.",
  path: "/summer-camps",
  ogImage: FLYER_IMAGE,
});

// ── Camp Weeks (from flyer) ──────────────────────────────────────────────
const CAMP_WEEKS = [
  {
    label: "Week 1",
    range: "July 13 – 17, 2026",
    startDate: "2026-07-13T08:30",
    endDate: "2026-07-17T17:00",
    fullDayUrl: BOOKING_URLS.summerCampFullDayJul,
    halfDayUrl: BOOKING_URLS.summerCampHalfDayJul,
  },
  {
    label: "Week 2",
    range: "August 10 – 14, 2026",
    startDate: "2026-08-10T08:30",
    endDate: "2026-08-14T17:00",
    fullDayUrl: BOOKING_URLS.summerCampFullDayAug,
    halfDayUrl: BOOKING_URLS.summerCampHalfDayAug,
  },
];

// ── Sports Offered (from flyer) ───────────────────────────────────────────
const SPORTS_OFFERED = [
  { name: "Soccer", emoji: "\u26BD", blurb: "Indoor turf drills, small-sided games, footwork." },
  { name: "Baseball", emoji: "\u26BE", blurb: "Batting cage reps, fielding, game play." },
  { name: "Badminton", emoji: "\uD83C\uDFF8", blurb: "Racket technique, footwork, doubles strategy." },
  { name: "Cricket", emoji: "\uD83C\uDFCF", blurb: "Bowling, batting, net sessions." },
  { name: "Chess", emoji: "\u265E", blurb: "Fundamentals, tactics, mini-tournaments." },
  { name: "Agility", emoji: "\uD83C\uDFC3", blurb: "Speed, balance, coordination training." },
];

// ── Coding & Robotics Track (NEW for 2026) ────────────────────────────────
const TECH_TRACK = [
  { name: "Block Coding", emoji: "🧩", blurb: "Scratch-style logic, sequences, loops, events." },
  { name: "Python Basics", emoji: "🐍", blurb: "Intro to text-based programming for older campers." },
  { name: "Robotics Builds", emoji: "🤖", blurb: "Assemble, program and test classroom robots." },
  { name: "Sensors & Logic", emoji: "💡", blurb: "Light, distance and motion sensors in action." },
  { name: "Mini Challenges", emoji: "🎯", blurb: "Mazes, line-followers, and team build-offs." },
  { name: "Showcase Day", emoji: "🏆", blurb: "End-of-week demo for parents and friends." },
];

// ── Program Options ───────────────────────────────────────────────────────
const PROGRAM_OPTIONS = [
  {
    id: "full-day",
    badge: "Best Value",
    title: "Full Day",
    schedule: "8:30 AM – 5:00 PM",
    price: 299,
    icon: Trophy,
    highlight: true,
    description:
      "Campers split the day between the Code Ninjas Coding Zone and LevelUP courts — coding and robotics in the morning or afternoon, sports rotations the rest of the day.",
    includes: [
      "Daily coding & robotics with Code Ninjas Senseis",
      "Sports rotations across Soccer, Baseball, Badminton, Cricket, Chess and Agility",
      "Lunch break with supervised activities",
      "Take-home project from the end-of-week showcase",
    ],
    register: [
      { label: "Jul 13 – 17", url: BOOKING_URLS.summerCampFullDayJul },
      { label: "Aug 10 – 14", url: BOOKING_URLS.summerCampFullDayAug },
    ],
  },
  {
    id: "half-day-sports",
    badge: "Half Day · Sports",
    title: "Half Day — Sports",
    schedule: "AM or PM Batch",
    price: 199,
    icon: Zap,
    highlight: false,
    description:
      "Pure athletic training across Soccer, Baseball, Badminton, Cricket, Chess and Agility. Pick the morning or afternoon batch to fit your family's schedule.",
    includes: [
      "Six-sport rotation each week",
      "Certified LevelUP coaches",
      "All sports equipment provided",
      "AM or PM batch — flexible scheduling",
    ],
    register: [
      { label: "Jul 13 – 17", url: BOOKING_URLS.summerCampHalfDayJul },
      { label: "Aug 10 – 14", url: BOOKING_URLS.summerCampHalfDayAug },
    ],
  },
  {
    id: "half-day-coding",
    badge: "Half Day · Coding",
    title: "Half Day — Coding & Robotics",
    schedule: "AM or PM Batch",
    price: 199,
    icon: Cpu,
    highlight: false,
    description:
      "Focused coding and robotics block led by certified Code Ninjas Senseis. Pick the morning or afternoon batch to fit your family's schedule.",
    includes: [
      "Block coding, JavaScript, and robotics builds",
      "Small-group, instructor-led labs",
      "All laptops and robotics kits provided",
      "AM or PM batch — flexible scheduling",
    ],
    register: [
      { label: "Jul 13 – 17", url: BOOKING_URLS.summerCampHalfDayJul },
      { label: "Aug 10 – 14", url: BOOKING_URLS.summerCampHalfDayAug },
    ],
  },
];

const WHATS_INCLUDED = [
  "Expert coaching across six sports plus dedicated coding & robotics instructors",
  "All sports equipment, laptops and robotics kits provided — just bring shoes, water bottle, and lunch (full day)",
  "Daily rotations balance physical training with STEM learning",
  "Indoor, climate-controlled facility — zero weather cancellations",
  "Safe, supervised environment with background-checked, first-aid certified staff",
  "Small batch sizes for both AM and PM half-day sessions",
];

const PARENT_INFO = [
  {
    icon: Clock,
    title: "Drop-off / Pickup",
    description:
      "Full Day: 8:30 AM – 5:00 PM (drop-off from 8:15). Half Day: AM batch (morning) or PM batch (afternoon) — pick what fits.",
  },
  {
    icon: Sun,
    title: "100% Indoor Facility",
    description:
      "Climate-controlled courts and turf — no rain-outs, no heat cancellations, ever.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All coaches are background-checked and first-aid certified. Small staff-to-camper ratio.",
  },
  {
    icon: MapPin,
    title: "Easy to Find",
    description:
      "701 E Pulaski Hwy, Elkton MD — minutes from Newark, Middletown, and I-95.",
  },
];

const FAQS = [
  {
    question: "What is the LevelUP × Code Ninjas Summer Camp?",
    answer:
      "It's our 2026 co-branded summer camp with Code Ninjas — 'Where Play Meets Coding!' Certified Code Ninjas Senseis lead campers through block coding, JavaScript, and hands-on robotics builds in a dedicated Coding Zone right inside our facility. Full Day campers also rotate through sports between coding sessions.",
  },
  {
    question: "How much does the camp cost?",
    answer:
      "Full Day is $299/week (8:30 AM – 5:00 PM) and Half Day is $199/week (AM or PM batch). Spots are limited, so we recommend registering early to reserve your camper's week.",
  },
  {
    question: "What ages is the camp for?",
    answer:
      "The camp is open to boys and girls ages 5 and up. Campers are grouped by age and skill level so everyone gets an appropriate challenge across both the coding track and (for Full Day) the sports rotations.",
  },
  {
    question: "What does the camp schedule look like?",
    answer:
      "Full Day runs Monday–Friday, 8:30 AM to 5:00 PM. Half Day sessions are offered in two batches: AM (morning) and PM (afternoon). Camp weeks are July 13–17 and August 10–14, 2026.",
  },
  {
    question: "What's the difference between Full Day and Half Day?",
    answer:
      "Full Day ($299) combines Code Ninjas coding & robotics with sports rotations across Soccer, Baseball, Badminton, Cricket, Chess and Agility. Half Day ($199) comes in two options — Sports only or Coding & Robotics only — and each runs as either an AM (morning) or PM (afternoon) batch.",
  },
  {
    question: "What will my child learn in the Code Ninjas track?",
    answer:
      "Block-based coding, JavaScript fundamentals, hands-on robotics builds, sensor and logic projects, and team challenges. The week ends with a parent showcase. All laptops and robotics kits are provided.",
  },
  {
    question: "Where is LevelUP Sports located?",
    answer:
      "LevelUP Sports & Athletics Club is at 701 E Pulaski Hwy, Elkton, MD 21921 — easy access from Cecil County, Newark DE, Middletown DE, and northeast Maryland.",
  },
  {
    question: "What should my child bring to camp?",
    answer:
      "Athletic shoes, a water bottle, and a packed lunch for Full Day campers. All sports equipment, laptops, and robotics kits are provided. Our facility is 100% indoor and climate-controlled.",
  },
  {
    question: "How do I register?",
    answer:
      "Register online via our Upper Hand booking page, call us at (443) 406-6494, or email info@levelupsports.us. Spots are limited, so we recommend booking early.",
  },
];

export default function SummerCampsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Summer Camps", url: "/summer-camps" },
  ]);

  const faqLD = generateFAQLD(FAQS);

  const courseLD = generateCourseLD({
    name: "LevelUP × Code Ninjas Summer Camp 2026",
    description:
      "Co-branded summer camp with Code Ninjas for ages 5+ at LevelUP Sports in Elkton, MD. Coding, robotics, and sports rotations led by certified Code Ninjas Senseis and LevelUP coaches. Three options: Full Day $299/week (sports + coding, 8:30 AM – 5:00 PM), Half Day Sports $199/week (AM or PM batch), Half Day Coding & Robotics $199/week (AM or PM batch). Two weeks: July 13–17 and August 10–14, 2026.",
    url: "/summer-camps",
  });

  const eventsLD = CAMP_WEEKS.map((w) =>
    generateEventLD({
      name: `LevelUP × Code Ninjas Summer Camp — ${w.label} (${w.range})`,
      description:
        "Coding, robotics, and sports summer camp for ages 5+ at LevelUP Sports & Athletics Club in Elkton, MD, in partnership with Code Ninjas. Full Day ($299) and Half Day ($199, AM or PM batch).",
      startDate: w.startDate,
      endDate: w.endDate,
      url: "/summer-camps",
      isAccessibleForFree: false,
      image: [`${SITE_CONFIG.url}${encodeURI(FLYER_IMAGE)}`],
      performer: {
        "@type": "PerformingGroup",
        name: "LevelUP Coaches & Code Ninjas Senseis",
      },
      offers: {
        price: "199",
        priceCurrency: "USD",
        url: w.halfDayUrl,
        validThrough: w.startDate,
      },
    })
  );

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLD) }}
      />
      {eventsLD.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* ── Hero Banner with Flyer ────────────────────────────────── */}
      <section
        aria-label="Summer Camps 2026"
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-br from-[#0F2440] via-primary to-[#0F2440] text-white"
      >
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(43,168,74,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(27,125,58,0.35),transparent_50%)]" />
        </div>

        <Container className="relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#A8E6CF] mb-5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Registration Open
            </span>
            <h1 className="font-display text-hero text-white mb-4 text-balance leading-[1.05]">
              LevelUP × Code Ninjas
              <span className="block text-accent mt-2">Where Play Meets Coding!</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-3">
              Our brand-new 2026 summer camp in partnership with Code Ninjas.
              Coding, robotics, and sports &mdash; all under one indoor roof in Elkton, MD.
            </p>
            <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
              Ages 5 and up &middot; Two weeks (July 13 &amp; August 10) &middot; Full Day or Half Day (AM/PM).
              100% indoor, climate-controlled facility.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" asChild>
                <Link href={REGISTER_URL}>Register Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
                <a href={`tel:${SITE_CONFIG.phone}`}>
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  Call (443) 406-6494
                </a>
              </Button>
            </div>

            <dl className="grid grid-cols-3 gap-4 max-w-lg border-t border-white/10 pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Full Day</dt>
                <dd className="font-display text-2xl font-bold text-accent">$299</dd>
                <p className="text-xs text-white/50">per week</p>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Half Day</dt>
                <dd className="font-display text-2xl font-bold text-accent">$199</dd>
                <p className="text-xs text-white/50">per week</p>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Ages</dt>
                <dd className="font-display text-2xl font-bold text-accent">5+</dd>
                <p className="text-xs text-white/50">boys &amp; girls</p>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <Section className="pt-4 pb-0">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">
                Summer Camps
              </li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* ── Program Options (Full Day / Half Day) ──────────────────── */}
      <Section id="register" className="pt-4 md:pt-6 scroll-mt-24">
        <Container>
          <Reveal>
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Pick Your Program
              </h2>
              <p className="text-neutral-500">
                Choose the schedule that fits your family. Full Day combines coding,
                robotics, and sports. Half Day comes in two flavors &mdash; Sports only
                or Coding &amp; Robotics only &mdash; each with morning and afternoon batches.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
            {PROGRAM_OPTIONS.map((p) => (
              <StaggerItem key={p.id}>
                <div
                  className={`relative rounded-2xl border p-6 h-full flex flex-col transition-shadow hover:shadow-xl ${
                    p.highlight
                      ? "border-accent/40 bg-gradient-to-br from-accent/5 to-primary/5 ring-2 ring-accent/20"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-accent text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest shadow-md">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {p.badge}
                    </span>
                  )}
                  {!p.highlight && (
                    <span className="inline-flex items-center self-start rounded-full bg-neutral-100 text-neutral-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest mb-3">
                      {p.badge}
                    </span>
                  )}
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/5 text-primary mb-4 mt-2">
                    <p.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-1 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
                    {p.schedule}
                  </p>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-display text-3xl font-extrabold text-primary">
                      ${p.price}
                    </span>
                    <span className="text-sm text-neutral-500">/ week</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-2 text-center">
                      Register your week
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {p.register.map((r) => (
                        <Button
                          key={r.label}
                          size="sm"
                          variant={p.highlight ? "primary" : "outline"}
                          asChild
                        >
                          <a href={r.url}>{r.label}</a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Camp Weeks ─────────────────────────────────────────────── */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Two Weeks of Summer. Pick Yours.
              </h2>
              <p className="text-neutral-500">
                Book one week or both &mdash; choose Full Day or Half Day for each.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CAMP_WEEKS.map((w) => (
              <StaggerItem key={w.label}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {w.label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                    {w.range}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    Full Day 8:30 AM &ndash; 5:00 PM &middot; Half Day AM &amp; PM batches
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button size="sm" asChild>
                      <a href={w.fullDayUrl}>Full Day</a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={w.halfDayUrl}>Half Day</a>
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-neutral-100 text-center">
              <Trophy className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-neutral-900 mb-1">Full Day</p>
              <p className="text-sm text-neutral-500">
                <span className="font-bold text-primary">$299</span> per week &middot; 8:30 AM &ndash; 5:00 PM
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-100 text-center">
              <Users className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-neutral-900 mb-1">Half Day</p>
              <p className="text-sm text-neutral-500">
                <span className="font-bold text-primary">$199</span> per week &middot; AM or PM batch
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
              <Sun className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-accent mb-1">Now Enrolling</p>
              <p className="text-sm text-neutral-500">Two weeks &mdash; July 13 &amp; Aug 10, spots fill fast</p>
            </div>
          </div>

          {/* Friendly "other weeks" callout */}
          <Reveal>
            <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8 text-center">
              <p className="font-display text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                Looking for a different week?
              </p>
              <p className="text-neutral-600 leading-relaxed mb-5">
                We&apos;d love to hear from you. If our July or August dates don&apos;t
                line up with your family&apos;s plans, reach out &mdash; if there&apos;s
                enough interest we&apos;ll do our best to add another week.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Call (443) 406-6494
                  </a>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a href={`mailto:${SITE_CONFIG.email}?subject=Summer%20Camp%20-%20Alternate%20Week%20Request`}>
                    Email us
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Sports Rotation ────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Sports Rotation (Full Day)
              </h2>
              <p className="text-neutral-500">
                Full Day campers split their time between the Code Ninjas Coding Zone
                and our courts &mdash; rotating through six sports between coding and
                robotics sessions.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPORTS_OFFERED.map((sport) => (
              <StaggerItem key={sport.name}>
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center h-full">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    {sport.emoji}
                  </div>
                  <h3 className="font-display font-bold text-neutral-900 mb-1">
                    {sport.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-snug">{sport.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Code Ninjas Track ──────────────────────────────────────── */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                LevelUP × Code Ninjas · New 2026
              </span>
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Where Play Meets Coding
              </h2>
              <p className="text-neutral-500">
                Inside the LevelUP × Code Ninjas camp, certified Code Ninjas Senseis lead
                campers through hands-on programming and robotics &mdash; right next door
                to our courts. End-of-week parent showcase included.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_TRACK.map((item) => (
              <StaggerItem key={item.name}>
                <div className="p-5 rounded-2xl bg-white border border-neutral-100 text-center h-full">
                  <div className="text-3xl mb-2" aria-hidden="true">
                    {item.emoji}
                  </div>
                  <h3 className="font-display font-bold text-neutral-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-snug">{item.blurb}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── What's Included ───────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-section text-neutral-900 mb-3">
                  What&apos;s Included
                </h2>
                <p className="text-neutral-500">
                  Every camp week includes expert coaching, gear, and an unforgettable
                  environment.
                </p>
              </div>
              <ul className="space-y-4">
                {WHATS_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── For Parents ───────────────────────────────────────────── */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">
              For Parents
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARENT_INFO.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 text-center h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary mb-3">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ── Local SEO Copy ────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-4">
                The Best Summer Camp Near Elkton, Newark &amp; Middletown
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-4">
                <p>
                  LevelUP Sports &amp; Athletics Club is the premier destination for
                  youth summer camps in Elkton, MD and the wider Cecil County, Newark DE,
                  Middletown DE, Wilmington DE and Chester County PA tri-state area.
                  In 2026 we&apos;re proud to partner with Code Ninjas to launch a brand-new
                  camp under one climate-controlled roof &mdash; <strong>Where Play Meets Coding!</strong>
                </p>
                <p>
                  Inside the LevelUP × Code Ninjas Camp, certified Code Ninjas Senseis
                  guide campers through block-based coding, JavaScript fundamentals,
                  hands-on robotics builds, sensor and logic projects, and team challenges
                  &mdash; all in a dedicated Coding Zone right inside our facility. Full
                  Day campers also rotate through{" "}
                  <Link href="/soccer" className="text-accent font-medium hover:underline">soccer</Link>,{" "}
                  <Link href="/baseball" className="text-accent font-medium hover:underline">baseball</Link>,{" "}
                  <Link href="/badminton" className="text-accent font-medium hover:underline">badminton</Link>,{" "}
                  <Link href="/cricket" className="text-accent font-medium hover:underline">cricket</Link>, chess, and{" "}
                  <Link href="/kids-agility" className="text-accent font-medium hover:underline">agility</Link>{" "}
                  between coding sessions.
                </p>
                <p>
                  Three flexible options: Full Day $299/week (8:30 AM – 5:00 PM) combines
                  coding with sports; Half Day Sports $199/week (AM or PM batch) for
                  athletics-only campers; and Half Day Coding &amp; Robotics $199/week
                  (AM or PM batch) for STEM-focused campers. Two camp weeks &mdash;
                  July 13 and August 10. Register early to reserve your camper&apos;s
                  spot &mdash; spots are limited. Indoor facility means zero weather cancellations.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <Award className="h-8 w-8 text-accent mx-auto mb-3" aria-hidden="true" />
                <h2 className="font-display text-section text-neutral-900 mb-3">
                  Summer Camp FAQs
                </h2>
                <p className="text-neutral-500">
                  Everything parents ask before registering.
                </p>
              </div>
              <div className="space-y-3">
                {FAQS.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 open:shadow-md transition-shadow"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                      <h3 className="font-display text-base font-semibold text-neutral-900">
                        {faq.question}
                      </h3>
                      <span
                        className="text-accent shrink-0 text-xl transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Spots Are Limited — Register Today"
        description="Secure your camper's week now before spots fill. Call, email, or book instantly online."
        primaryCTA={{ label: "Register Now", href: REGISTER_URL }}
        secondaryCTA={{ label: `Call ${SITE_CONFIG.phone}`, href: `tel:${SITE_CONFIG.phone}` }}
      />
    </>
  );
}
