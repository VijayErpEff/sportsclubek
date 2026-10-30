import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Users,
  CircleDollarSign,
  Clock,
  Gift,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
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
import { BOOKING_URLS } from "@/lib/constants/booking";
import { cn } from "@/lib/utils/cn";

// ── Clinic constants (single source of truth) ──────────────────────
const CLINIC = {
  name: "5-Week Soccer Clinic",
  path: "/events/soccer-clinic",
  registerHref: BOOKING_URLS.soccerClinic,
  ages: "6+",
  day: "Thursdays",
  time: "6:30–7:30 PM",
  fee: "$149",
  startISO: "2026-11-12T18:30:00-05:00",
  endISO: "2026-12-17T19:30:00-05:00",
  /** Enroll by this date for the bonus session — which runs that same evening. */
  bonusISO: "2026-11-05T18:30:00-05:00",
  bonusLabel: "Thursday, November 5",
  flyer: "/images/Content/soccer-clinic-fall-2026.jpg",
  ogImage: "/images/og/soccer-clinic-fall-2026.jpg",
};

type Session = { month: string; day: string; note: string; kind: "bonus" | "clinic" | "off" };

const SESSIONS: Session[] = [
  { month: "Nov", day: "5", note: "Bonus session", kind: "bonus" },
  { month: "Nov", day: "12", note: "Week 1", kind: "clinic" },
  { month: "Nov", day: "19", note: "Week 2", kind: "clinic" },
  { month: "Nov", day: "26", note: "Thanksgiving — off", kind: "off" },
  { month: "Dec", day: "3", note: "Week 3", kind: "clinic" },
  { month: "Dec", day: "10", note: "Week 4", kind: "clinic" },
  { month: "Dec", day: "17", note: "Week 5", kind: "clinic" },
];

const SKILLS = [
  { name: "Dribbling", detail: "Close control at speed, both feet, and the moves that beat a defender one-on-one." },
  { name: "Passing", detail: "Weight and accuracy on short passes, receiving on the half-turn, and playing out of pressure." },
  { name: "Ball Control", detail: "First touch off the ground and out of the air, so the ball stays where your child wants it." },
  { name: "Shooting", detail: "Striking technique with the laces and inside of the foot, and finishing under pressure." },
  { name: "Teamwork", detail: "Talking on the field, moving to support a teammate, and defending as a unit." },
  { name: "Game Play", detail: "Every session ends in a scrimmage, so the week's skill gets used in a real game." },
];

const WHAT_TO_BRING = [
  "Sneakers or turf shoes for the indoor turf",
  "Shin guards (recommended)",
  "Comfortable athletic clothes — the facility is climate-controlled",
  "A water bottle (refill stations on-site)",
  "A size 4 or 5 ball if you have one — we have plenty to share",
];

const FAQS = [
  {
    question: "How do I register for the soccer clinic?",
    answer:
      "Register in the LevelUP app — on the web at app.levelupsports.us/training, or in the iPhone or Android app under Training. Choose the 5-Week Soccer Clinic, add your player, and pay $149 to hold their spot.",
  },
  {
    question: "What does the clinic cost?",
    answer:
      "$149 for the full five-week program: five one-hour Thursday sessions, 6:30–7:30 PM. Enroll by November 5 and your player also gets a bonus sixth session that night at no extra cost.",
  },
  {
    question: "How does the early enrollment bonus work?",
    answer:
      "Register on or before Thursday, November 5, 2026 and your player joins an extra session that same evening, 6:30–7:30 PM — a head start before Week 1 on November 12.",
  },
  {
    question: "What are the clinic dates?",
    answer:
      "Thursdays November 12 and 19, and December 3, 10, and 17, 2026, 6:30–7:30 PM. There is no session on Thanksgiving, November 26.",
  },
  {
    question: "What ages is it for? Does my child need soccer experience?",
    answer:
      "Ages 6 and up. No experience needed. Players are grouped so beginners build the basics while experienced players are pushed on technique and game speed.",
  },
  {
    question: "What will my child work on?",
    answer:
      "Dribbling, passing, ball control, shooting, teamwork, and game play. Each session pairs skill work with a scrimmage so the skill gets used in a real game.",
  },
  {
    question: "Can parents watch?",
    answer:
      "Yes. Parents and siblings are welcome to watch from the viewing area beside the turf.",
  },
  {
    question: "Where is the clinic held?",
    answer:
      "Indoors on the turf at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Youth Soccer Clinic, Elkton MD — $149, Ages 6+",
  description:
    "Indoor youth soccer clinic at LevelUP Sports in Elkton, MD. Thursdays 6:30–7:30 PM, Nov 12 – Dec 17, 2026. Ages 6+, $149 for 5 weeks. Enroll by Nov 5 for a bonus session.",
  path: CLINIC.path,
  ogImage: CLINIC.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function SoccerClinicPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Soccer", url: "/soccer" },
    { name: "Soccer Clinic", url: CLINIC.path },
  ]);

  const eventLD = generateEventLD({
    name: `${CLINIC.name} — LevelUP Sports, Elkton, MD`,
    description:
      "Five Thursday-evening youth soccer sessions for ages 6+ on indoor turf in Elkton, MD: dribbling, passing, ball control, shooting, teamwork, and scrimmages.",
    startDate: CLINIC.startISO,
    endDate: CLINIC.endISO,
    url: CLINIC.path,
    isAccessibleForFree: false,
    sport: "Soccer",
    image: [`${SITE_CONFIG.url}${CLINIC.ogImage}`, `${SITE_CONFIG.url}${CLINIC.flyer}`],
    offers: {
      name: "5-Week Program",
      price: "149",
      priceCurrency: "USD",
      category: "Clinic Registration",
      url: `${SITE_CONFIG.url}${CLINIC.registerHref}`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-10-30",
      validThrough: CLINIC.startISO,
    },
  });

  const faqLD = generateFAQLD(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      {/* ═══════════════════════════════════════════
          HERO — navy field cut on an angle behind the flyer (7/5)
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary-dark text-white pt-28 md:pt-32 pb-16 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] origin-top-right -skew-x-6 bg-accent lg:block"
        />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/soccer" className="hover:text-white transition-colors">Soccer</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">5-Week Clinic</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-light mb-5">
                  Youth Soccer · Ages {CLINIC.ages} · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-white/80">5-Week</span>
                  <span className="block text-[clamp(3.25rem,9vw,6.5rem)] font-extrabold">Soccer Clinic</span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  Thursday nights on our indoor turf, {CLINIC.time}, starting November 12. Skills
                  work, then a scrimmage, every week. <span className="font-semibold text-white">{CLINIC.fee} for all five sessions.</span>
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-primary-dark hover:bg-secondary-light">
                    <Link href={CLINIC.registerHref}>
                      Register Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    asChild
                    className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
                  >
                    <a href="#dates">See the Dates</a>
                  </Button>
                </div>

                <p className="mt-6 flex items-start gap-2 text-sm text-white/75 max-w-lg">
                  <Gift className="h-4 w-4 mt-0.5 shrink-0 text-warning" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-white">Early enrollment bonus:</span> register by{" "}
                    {CLINIC.bonusLabel} and get an extra session that night, {CLINIC.time}.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-5">
              <div className="relative w-full max-w-[360px] mx-auto lg:max-w-[420px]">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={CLINIC.flyer}
                    alt="LevelUP 5-Week Soccer Clinic flyer: ages 6 and up, Thursdays 6:30 to 7:30 PM, $149 for the 5-week program, clinic dates November 12 and 19 and December 3, 10 and 17, 2026. Skills development plus scrimmages. Enroll by November 5 for an additional session on November 5."
                    fill
                    sizes="(max-width: 1024px) 360px, 420px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* KEY DETAILS */}
      <Section id="details" size="sm">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Users, label: "Ages", value: `${CLINIC.ages}`, sub: "No experience needed" },
              { icon: Clock, label: "When", value: CLINIC.day, sub: CLINIC.time },
              { icon: Calendar, label: "Runs", value: "Nov 12 – Dec 17", sub: "5 sessions · off Thanksgiving" },
              { icon: CircleDollarSign, label: "Price", value: CLINIC.fee, sub: "Full 5-week program" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-xl p-5 md:p-6 border border-neutral-200 h-full">
                  <item.icon className="h-5 w-5 text-accent mb-3" aria-hidden="true" />
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">{item.label}</p>
                  <p className="font-display font-bold text-xl text-neutral-900 leading-snug">{item.value}</p>
                  <p className="text-sm text-neutral-600 mt-1">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* DATES — a strip of Thursdays, bonus and the skipped holiday called out */}
      <Section id="dates" variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Clinic Dates · 2026</p>
              <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">Five Thursdays, One Hour Each</h2>
              <p className="text-neutral-600">
                Every session runs {CLINIC.time}. We skip Thanksgiving, so the program wraps up on
                December 17.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {SESSIONS.map((s) => (
                  <li
                    key={`${s.month}-${s.day}`}
                    className={cn(
                      "rounded-xl border p-4 text-center",
                      s.kind === "clinic" && "bg-white border-neutral-200",
                      s.kind === "bonus" && "bg-warning/10 border-warning/40",
                      s.kind === "off" && "bg-transparent border-dashed border-neutral-300 text-neutral-500"
                    )}
                  >
                    <p className="font-mono text-xs uppercase tracking-wider">{s.month}</p>
                    <p
                      className={cn(
                        "font-display text-3xl font-extrabold leading-none my-1",
                        s.kind === "off" ? "line-through decoration-2" : "text-neutral-900"
                      )}
                    >
                      {s.day}
                    </p>
                    <p className={cn("text-xs", s.kind === "bonus" ? "font-semibold text-neutral-900" : "text-neutral-600")}>
                      {s.note}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-neutral-600">
                <Gift className="inline h-4 w-4 mr-1 -mt-0.5 text-warning" aria-hidden="true" />
                The November 5 bonus session is for players registered by that day.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* EARLY ENROLLMENT COUNTDOWN */}
      <section className="bg-primary-dark text-white py-12">
        <Container>
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning mb-2">Early Enrollment Bonus</p>
                <p className="font-display text-2xl md:text-3xl font-bold text-balance">
                  Enroll by Nov 5 and start a week early.
                </p>
              </div>
              <CountdownTimer targetDate={new Date(CLINIC.bonusISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* WHAT THEY'LL LEARN */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-5">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:-rotate-1">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-neutral-200">
                  <Image
                    src="/images/sports/soccer.jpg"
                    alt="Young players training on the indoor soccer turf at LevelUP Sports in Elkton, MD"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Skills Development + Scrimmages</p>
                <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">What Your Player Works On</h2>
                <p className="text-neutral-600 mb-8 max-w-xl">
                  Each Thursday builds on the last: a focused skill block, small-sided drills, then a
                  scrimmage to put it to work.
                </p>
              </Reveal>
              <StaggerContainer className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {SKILLS.map((s, i) => (
                  <StaggerItem key={s.name}>
                    <div className="border-t-2 border-accent pt-3">
                      <h3 className="font-display text-lg font-bold text-neutral-900">
                        <span className="font-mono text-sm text-accent mr-2">{String(i + 1).padStart(2, "0")}</span>
                        {s.name}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mt-1">{s.detail}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </Container>
      </Section>

      {/* HOW TO REGISTER + WHAT TO BRING */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Sign Up in Two Minutes</p>
                <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">How to Register</h2>
                <ol className="space-y-5">
                  {[
                    "Tap Register Now — it opens the LevelUP app, or the web version if you don't have it installed.",
                    "Sign in or create a free account, then go to Training and pick the 5-Week Soccer Clinic.",
                    `Add your player and pay ${CLINIC.fee}. You'll get a confirmation by email.`,
                  ].map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-neutral-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
                <Button size="lg" asChild className="mt-8">
                  <Link href={CLINIC.registerHref}>
                    Register Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.15}>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                  What to Bring
                </h3>
                <ul className="space-y-2.5">
                  {WHAT_TO_BRING.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="text-accent mt-0.5" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-neutral-200 space-y-3 text-sm">
                  <p className="flex items-start gap-2 text-neutral-700">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                      {SITE_CONFIG.address.zip} ·{" "}
                      <a
                        href={SITE_CONFIG.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:text-accent-hover underline underline-offset-2"
                      >
                        Directions
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-neutral-700 hover:text-accent">{SITE_CONFIG.phone}</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-neutral-700 hover:text-accent break-all">{SITE_CONFIG.email}</a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
                <h2 className="font-display text-section text-neutral-900 text-balance">Soccer Clinic Questions</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={FAQS} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-accent text-white py-16 md:py-20">
        <Container className="text-center">
          <h2 className="font-display text-section text-white mb-4 text-balance">Save Your Player&apos;s Spot</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {CLINIC.fee} for five Thursday sessions, ages {CLINIC.ages}. Register by {CLINIC.bonusLabel} and
            the bonus session is on us.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="xl" asChild className="bg-white text-accent hover:bg-neutral-50">
              <Link href={CLINIC.registerHref}>
                Register Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-accent" asChild>
              <Link href="/soccer-academy">Year-Round Soccer Academy</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
