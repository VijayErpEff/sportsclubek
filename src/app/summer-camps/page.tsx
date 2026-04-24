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
} from "lucide-react";

const FLYER_IMAGE = "/images/sports/LevelUp/Summer Camp.jpeg";
const REGISTER_URL = "/go/summer-camps";

export const metadata: Metadata = generateSEOMetadata({
  title:
    "Summer Camps 2026 — Elkton, MD | Ages 6+ Sports, Chess & Agility",
  description:
    "LevelUP Summer Camps 2026 in Elkton, MD — Soccer, Baseball, Badminton, Cricket, Chess & Agility for ages 6+. Full day $299 / Half day $199. Save 10% with early bird. Serving Cecil County, Newark & Middletown DE.",
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

const WHATS_INCLUDED = [
  "Expert coaching from certified instructors across six disciplines",
  "All sports equipment and gear provided — just bring shoes and a water bottle",
  "Daily skill rotations so campers sample every sport each week",
  "Indoor, climate-controlled facility — zero weather cancellations",
  "Safe, supervised environment with background-checked, first-aid certified staff",
  "Great coaches, great environment — unforgettable summer",
];

const PARENT_INFO = [
  {
    icon: Clock,
    title: "Drop-off / Pickup",
    description:
      "Full Day: 8:30 AM – 5:00 PM (drop-off from 8:15). Half Day: morning or afternoon session.",
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
    question: "What ages are LevelUP Summer Camps for?",
    answer:
      "Our 2026 Summer Camps are open to boys and girls ages 6 and up. Campers are grouped by age and skill level so everyone gets an appropriate challenge.",
  },
  {
    question: "What does the camp schedule look like?",
    answer:
      "Full Day runs Monday–Friday, 8:30 AM to 5:00 PM, and Half Day sessions run for half of each day. Camp weeks are June 22–26, July 13–17, and August 10–14, 2026.",
  },
  {
    question: "How much does Summer Camp cost?",
    answer:
      "Full Day camp is $299 per week and Half Day camp is $199 per week. Register before the early bird deadline and save 10% — limited time only.",
  },
  {
    question: "What sports and activities are included?",
    answer:
      "Each week rotates through Soccer, Baseball, Badminton, Cricket, Chess, and Agility training. Campers build skills, make friends, and get fit across all six disciplines.",
  },
  {
    question: "Where is LevelUP Sports located?",
    answer:
      "LevelUP Sports & Athletics Club is at 701 E Pulaski Hwy, Elkton, MD 21921 — easy access from Cecil County, Newark DE, Middletown DE, and northeast Maryland.",
  },
  {
    question: "What should my child bring to camp?",
    answer:
      "Just athletic shoes, a water bottle, and a packed lunch for Full Day campers. All sports equipment is provided. Our facility is 100% indoor and climate-controlled.",
  },
  {
    question: "How do I register for Summer Camp?",
    answer:
      "Register online via our Upper Hand booking page, call us at (443) 406-6494, or email info@levelupsports.us. Spots are limited and early bird pricing ends soon.",
  },
];

export default function SummerCampsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Summer Camps", url: "/summer-camps" },
  ]);

  const faqLD = generateFAQLD(FAQS);

  const courseLD = generateCourseLD({
    name: "LevelUP Summer Sports Camps 2026",
    description:
      "Multi-sport summer camp for ages 6+ in Elkton, MD. Soccer, Baseball, Badminton, Cricket, Chess and Agility. Full day ($299) and half day ($199) options across three weeks in June, July and August 2026.",
    url: "/summer-camps",
  });

  const eventsLD = CAMP_WEEKS.map((w) =>
    generateEventLD({
      name: `LevelUP Summer Camp — ${w.label} (${w.range})`,
      description:
        "Full-day and half-day sports camp for ages 6+ at LevelUP Sports & Athletics Club in Elkton, MD. Soccer, Baseball, Badminton, Cricket, Chess, and Agility.",
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
                <span className="block text-accent mt-2">Play. Learn. Grow. Level Up!</span>
              </h1>
              <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-3">
                Elkton, MD&apos;s premier multi-sport summer camp for ages 6 and up.
                Six sports, three weeks, one unforgettable summer.
              </p>
              <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
                Soccer &middot; Baseball &middot; Badminton &middot; Cricket &middot; Chess &middot; Agility.
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
                  alt="LevelUP Sports & Athletics Club Summer Camp 2026 flyer featuring Soccer, Baseball, Badminton, Cricket, Chess and Agility for ages 6+"
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

      {/* ── Schedule / Pricing Summary ─────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Three Weeks of Summer. Six Sports. One Level-Up Experience.
              </h2>
              <p className="text-neutral-500">
                Book one week to sample, or all three for a full-summer arc of skill
                development, friendships, and fitness. Limited spots — register early.
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
                    Full Day 8:30 AM &ndash; 5:00 PM &middot; Half Day options available
                  </p>
                  <Button size="sm" className="mt-auto w-full" asChild>
                    <Link href={REGISTER_URL}>Register This Week</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
              <Trophy className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-neutral-900 mb-1">Full Day Camp</p>
              <p className="text-sm text-neutral-500">
                <span className="font-bold text-primary">$299</span> per week &middot; 8:30 AM &ndash; 5:00 PM
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
              <Users className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-semibold text-neutral-900 mb-1">Half Day Camp</p>
              <p className="text-sm text-neutral-500">
                <span className="font-bold text-primary">$199</span> per week &middot; AM or PM session
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
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Six Sports. One Camp.
              </h2>
              <p className="text-neutral-500">
                Each camper rotates through every discipline each week &mdash; building
                well-rounded athletes, not one-trick specialists.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPORTS_OFFERED.map((sport) => (
              <StaggerItem key={sport.name}>
                <div className="p-5 rounded-2xl bg-white border border-neutral-100 text-center h-full">
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
                  Our 2026 Summer Camp combines premium multi-sport training with the
                  structure and fun kids deserve &mdash; all under one climate-controlled roof.
                </p>
                <p>
                  Campers ages 6 and up rotate through <Link href="/soccer" className="text-accent font-medium hover:underline">soccer</Link>,{" "}
                  <Link href="/baseball" className="text-accent font-medium hover:underline">baseball</Link>,{" "}
                  <Link href="/badminton" className="text-accent font-medium hover:underline">badminton</Link>,{" "}
                  <Link href="/cricket" className="text-accent font-medium hover:underline">cricket</Link>, chess, and{" "}
                  <Link href="/kids-agility" className="text-accent font-medium hover:underline">agility</Link>{" "}
                  training each week. Certified coaches lead every session. Families love
                  that our indoor facility means zero weather cancellations &mdash; no rain
                  delays, no heat warnings, no lost camp days.
                </p>
                <p>
                  Full Day camp runs Monday through Friday, 8:30 AM to 5:00 PM ($299/week).
                  Half Day sessions are also available ($199/week). Register before the
                  early bird deadline and save 10%. Sign up for one week or all three.
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
