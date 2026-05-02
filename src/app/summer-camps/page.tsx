import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const FLYER_IMAGE = "/images/sports/LevelUp/Summer Camp.jpeg";
const FLYER_IMAGE_CODE_NINJAS = "/images/sports/LevelUp/Summer Camp Code Ninjas.png";
const REGISTER_URL = "/go/summer-camps";

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Summer Camps 2026 — Elkton, MD | Multi-Sport & Code Ninjas Camps",
  description:
    "Two summer camps at LevelUP Sports in Elkton, MD: Multi-Sport Camp (Soccer, Baseball, Badminton, Cricket, Chess, Agility) and our new LevelUP × Code Ninjas camp — Where Play Meets Coding! Full day $299 / Half day $199. Ages 6+. Early bird 10% off.",
  path: "/summer-camps",
  ogImage: FLYER_IMAGE,
});

// ── Camp Weeks (from flyer) ──────────────────────────────────────────────
const CAMP_WEEKS = [
  {
    label: "Week 1",
    range: "June 22 – 26, 2026",
    startDate: "2026-06-22T08:30",
    endDate: "2026-06-26T17:00",
  },
  {
    label: "Week 2",
    range: "July 13 – 17, 2026",
    startDate: "2026-07-13T08:30",
    endDate: "2026-07-17T17:00",
  },
  {
    label: "Week 3",
    range: "August 10 – 14, 2026",
    startDate: "2026-08-10T08:30",
    endDate: "2026-08-14T17:00",
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

// ── Two Camps for Summer 2026 ────────────────────────────────────────────
const CAMPS = [
  {
    id: "multi-sport",
    eyebrow: "LevelUP Original",
    title: "Multi-Sport Summer Camp",
    tagline: "Six sports. One epic week.",
    description:
      "Our flagship camp: campers ages 6+ rotate through Soccer, Baseball, Badminton, Cricket, Chess and Agility under certified LevelUP coaches. All indoors, all summer.",
    icon: Trophy,
    flyer: FLYER_IMAGE,
    flyerAlt:
      "LevelUP Sports Multi-Sport Summer Camp 2026 flyer — Soccer, Baseball, Badminton, Cricket, Chess and Agility for ages 6+",
    pricing: [
      { label: "Full Day", schedule: "8:30 AM – 5:00 PM", price: 299 },
      { label: "Half Day", schedule: "AM or PM batch", price: 199 },
    ],
    highlights: [
      "Six-sport weekly rotation",
      "Certified LevelUP coaches",
      "All equipment provided",
      "Indoor, climate-controlled facility",
    ],
    href: REGISTER_URL,
    accent: "primary" as const,
  },
  {
    id: "code-ninjas",
    eyebrow: "New Partnership · 2026",
    title: "LevelUP × Code Ninjas",
    tagline: "Where Play Meets Coding!",
    description:
      "Our brand-new co-branded camp with Code Ninjas. Campers split the day between LevelUP courts and the Code Ninjas Coding Zone — building real coding and robotics projects between sports rotations.",
    icon: Cpu,
    flyer: FLYER_IMAGE_CODE_NINJAS,
    flyerAlt:
      "LevelUP Sports and Code Ninjas partnership banner — Where Play Meets Coding! — co-branded summer camp 2026",
    pricing: [
      { label: "Full Day", schedule: "Sports + Coding · 8:30 AM – 5:00 PM", price: 299 },
      { label: "Half Day", schedule: "Coding Only · AM or PM batch", price: 199 },
    ],
    highlights: [
      "Code Ninjas certified Senseis",
      "Block coding, JavaScript, and robotics builds",
      "Sports rotations between coding sessions (Full Day)",
      "End-of-week parent showcase",
    ],
    href: REGISTER_URL,
    accent: "accent" as const,
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
    question: "What summer camps does LevelUP offer in 2026?",
    answer:
      "Two camps under one roof: (1) the LevelUP Multi-Sport Summer Camp — our flagship six-sport rotation (Soccer, Baseball, Badminton, Cricket, Chess, Agility), and (2) the brand-new LevelUP × Code Ninjas Camp — a co-branded coding and robotics camp powered by Code Ninjas. Both camps share weeks, facility, and the same booking page.",
  },
  {
    question: "What is the LevelUP × Code Ninjas camp?",
    answer:
      "It's our 2026 partnership with Code Ninjas — 'Where Play Meets Coding!' Certified Code Ninjas Senseis lead campers through block coding, JavaScript, and hands-on robotics builds in a dedicated Coding Zone right inside our facility. Full Day campers also rotate through sports between coding sessions.",
  },
  {
    question: "How much does each camp cost?",
    answer:
      "Both camps use the same pricing: Full Day is $299/week (8:30 AM – 5:00 PM) and Half Day is $199/week (AM or PM batch). Register before the early bird deadline and save 10%.",
  },
  {
    question: "What ages are LevelUP Summer Camps for?",
    answer:
      "Both camps are open to boys and girls ages 6 and up. Campers are grouped by age and skill level so everyone gets an appropriate challenge.",
  },
  {
    question: "What does the camp schedule look like?",
    answer:
      "Full Day runs Monday–Friday, 8:30 AM to 5:00 PM. Half Day sessions are offered in two batches: AM (morning) and PM (afternoon). Camp weeks are June 22–26, July 13–17, and August 10–14, 2026.",
  },
  {
    question: "What sports are included in the Multi-Sport Camp?",
    answer:
      "Each week rotates through Soccer, Baseball, Badminton, Cricket, Chess, and Agility training. Campers build skills, make friends, and get fit across all six disciplines under certified LevelUP coaches.",
  },
  {
    question: "Can I book one camp some weeks and the other camp other weeks?",
    answer:
      "Yes. Book whatever combination you like across our three camp weeks — for example, Multi-Sport in June and the Code Ninjas camp in July. Everything is booked through one page so it's easy to mix.",
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
    question: "How do I register for Summer Camp?",
    answer:
      "Register online via our Upper Hand booking page (the same page handles both camps), call us at (443) 406-6494, or email info@levelupsports.us. Spots are limited and early bird pricing ends soon.",
  },
];

export default function SummerCampsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Summer Camps", url: "/summer-camps" },
  ]);

  const faqLD = generateFAQLD(FAQS);

  const courseLD = generateCourseLD({
    name: "LevelUP Summer Camps 2026 — Multi-Sport & LevelUP × Code Ninjas",
    description:
      "Two summer camps for ages 6+ at LevelUP Sports in Elkton, MD. (1) Multi-Sport Camp — Soccer, Baseball, Badminton, Cricket, Chess, Agility. (2) LevelUP × Code Ninjas Camp — coding and robotics in partnership with Code Ninjas. Full Day $299/week, Half Day $199/week (AM or PM). Three weeks: June, July, August 2026.",
    url: "/summer-camps",
  });

  const eventsLD = CAMP_WEEKS.map((w) =>
    generateEventLD({
      name: `LevelUP Summer Camps — ${w.label} (${w.range})`,
      description:
        "Multi-Sport Camp and LevelUP × Code Ninjas Camp for ages 6+ at LevelUP Sports & Athletics Club in Elkton, MD. Full Day ($299) and Half Day ($199, AM or PM batch).",
      startDate: w.startDate,
      endDate: w.endDate,
      url: "/summer-camps",
      isAccessibleForFree: false,
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
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
            {/* Left — copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#A8E6CF] mb-5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Registration Open
              </span>
              <h1 className="font-display text-hero text-white mb-4 text-balance leading-[1.05]">
                Summer Camps 2026
                <span className="block text-accent mt-2">Two Camps. One Summer.</span>
              </h1>
              <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-3">
                Pick your path: our flagship Multi-Sport Camp, or the all-new
                LevelUP <span className="text-white/90">×</span> Code Ninjas camp &mdash;
                Where Play Meets Coding!
              </p>
              <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
                Ages 6 and up &middot; Three weeks (June, July, August) &middot; Full Day or Half Day (AM/PM).
                100% indoor, climate-controlled facility.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button size="lg" asChild>
                  <Link href={REGISTER_URL}>Register Now &mdash; Save 10%</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Call (443) 406-6494
                  </a>
                </Button>
              </div>

              <dl className="grid grid-cols-3 gap-4 max-w-lg">
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
                  <dd className="font-display text-2xl font-bold text-accent">6+</dd>
                  <p className="text-xs text-white/50">boys &amp; girls</p>
                </div>
              </dl>
            </div>

            {/* Right — flyer */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 bg-white/5">
                <Image
                  src={FLYER_IMAGE}
                  alt="LevelUP Sports & Athletics Club Summer Camp 2026 flyer featuring Multi-Sports plus Coding & Robotics for ages 6+ — Full Day and Half Day options"
                  width={1200}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute -top-4 -right-4 rounded-2xl bg-accent text-white px-4 py-2.5 shadow-lg rotate-3">
                <p className="font-display font-bold text-sm">Early Bird</p>
                <p className="font-display font-extrabold text-xl leading-none">10% OFF</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <Section className="py-4">
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

      {/* ── Two Camps Picker ───────────────────────────────────────── */}
      <Section id="choose-your-camp">
        <Container>
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Choose Your Camp
              </h2>
              <p className="text-neutral-500">
                Same dates. Same indoor facility. Same booking link. Two completely
                different experiences &mdash; pick the one your camper will love, or
                book different weeks of each.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {CAMPS.map((camp) => (
              <StaggerItem key={camp.id}>
                <article
                  className={`relative rounded-3xl border bg-white overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl ${
                    camp.accent === "accent"
                      ? "border-accent/30 ring-2 ring-accent/10"
                      : "border-primary/20 ring-2 ring-primary/5"
                  }`}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[3/2] bg-neutral-100 overflow-hidden">
                    <Image
                      src={camp.flyer}
                      alt={camp.flyerAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span
                      className={`absolute top-4 left-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow-md ${
                        camp.accent === "accent"
                          ? "bg-accent text-white"
                          : "bg-primary text-white"
                      }`}
                    >
                      {camp.eyebrow}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${
                          camp.accent === "accent"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <camp.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                        {camp.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
                        camp.accent === "accent" ? "text-accent" : "text-primary"
                      }`}
                    >
                      {camp.tagline}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-5">
                      {camp.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {camp.pricing.map((opt) => (
                        <div
                          key={opt.label}
                          className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
                        >
                          <p className="text-[11px] uppercase tracking-widest text-neutral-500 mb-1">
                            {opt.label}
                          </p>
                          <p className="font-display text-2xl font-extrabold text-primary leading-none mb-1">
                            ${opt.price}
                            <span className="text-xs font-normal text-neutral-500"> / week</span>
                          </p>
                          <p className="text-xs text-neutral-500">{opt.schedule}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-6 flex-1">
                      {camp.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                          <CheckCircle
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              camp.accent === "accent" ? "text-accent" : "text-primary"
                            }`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button size="lg" className="mt-auto w-full" asChild>
                      <Link href={camp.href}>Register &mdash; Save 10%</Link>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="text-center text-sm text-neutral-500 mt-8 max-w-2xl mx-auto">
            Both camps register through the same booking page. You&apos;ll be able to
            pick your camp, week, and Full Day / Half Day option at checkout.
          </p>
        </Container>
      </Section>

      {/* ── Camp Weeks ─────────────────────────────────────────────── */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Three Weeks of Summer. Pick Yours.
              </h2>
              <p className="text-neutral-500">
                Both camps run the same three weeks. Book one camp, the other, or
                mix-and-match across weeks &mdash; all from one booking page.
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
                  <Button size="sm" className="mt-auto w-full" asChild>
                    <Link href={REGISTER_URL}>Register This Week</Link>
                  </Button>
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
              <p className="font-semibold text-accent mb-1">Early Bird 10% Off</p>
              <p className="text-sm text-neutral-500">Limited time &mdash; register before spots fill</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Sports Rotation ────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Six Sports. One Camp.
              </h2>
              <p className="text-neutral-500">
                Multi-Sports campers rotate through every discipline each week &mdash; building
                well-rounded athletes, not one-trick specialists.
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
                Two Summer Camps Near Elkton, Newark &amp; Middletown
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-4">
                <p>
                  LevelUP Sports &amp; Athletics Club is the premier destination for
                  youth summer camps in Elkton, MD and the wider Cecil County, Newark DE,
                  Middletown DE, Wilmington DE and Chester County PA tri-state area.
                  In 2026 we&apos;re running two distinct camps under one climate-controlled
                  roof &mdash; so every kid finds the camp that fits.
                </p>
                <p>
                  The <strong>LevelUP Multi-Sport Summer Camp</strong> is our flagship
                  program. Campers ages 6 and up rotate through{" "}
                  <Link href="/soccer" className="text-accent font-medium hover:underline">soccer</Link>,{" "}
                  <Link href="/baseball" className="text-accent font-medium hover:underline">baseball</Link>,{" "}
                  <Link href="/badminton" className="text-accent font-medium hover:underline">badminton</Link>,{" "}
                  <Link href="/cricket" className="text-accent font-medium hover:underline">cricket</Link>, chess, and{" "}
                  <Link href="/kids-agility" className="text-accent font-medium hover:underline">agility</Link>{" "}
                  training each week with certified LevelUP coaches.
                </p>
                <p>
                  Brand-new for 2026, the <strong>LevelUP × Code Ninjas Camp</strong>{" "}
                  &mdash; Where Play Meets Coding! &mdash; is our co-branded coding and
                  robotics camp powered by Code Ninjas. Certified Code Ninjas Senseis lead
                  block coding, JavaScript, and robotics builds in a dedicated Coding Zone
                  inside our facility, with sport rotations between sessions for Full Day campers.
                </p>
                <p>
                  Both camps run the same three weeks (June 22, July 13, August 10) at the
                  same pricing &mdash; Full Day $299/week (8:30 AM – 5:00 PM), Half Day
                  $199/week (AM or PM batch). Register through one shared booking page
                  and save 10% with early bird pricing. Sign up for one camp, the other,
                  or mix-and-match across weeks.
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
        description="Secure your camper's week now and save 10% with early bird pricing. Call, email, or book instantly online."
        primaryCTA={{ label: "Register Now", href: REGISTER_URL }}
        secondaryCTA={{ label: `Call ${SITE_CONFIG.phone}`, href: `tel:${SITE_CONFIG.phone}` }}
      />
    </>
  );
}
