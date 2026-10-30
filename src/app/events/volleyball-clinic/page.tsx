import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Gift, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { FAQAccordion } from "@/components/composed/faq-accordion";

import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateEventLD, generateFAQLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { cn } from "@/lib/utils/cn";

// ── Clinic constants (single source of truth) ──────────────────────
const CLINIC = {
  name: "5-Week Volleyball Clinic",
  path: "/events/volleyball-clinic",
  registerHref: BOOKING_URLS.volleyballClinic,
  startISO: "2026-11-11T18:00:00-05:00",
  endISO: "2026-12-20T12:30:00-05:00",
  flyer: "/images/Content/volleyball-clinic-fall-2026.jpg",
  ogImage: "/images/og/volleyball-clinic-fall-2026.jpg",
};

type Session = { month: string; day: string; note: string; kind: "bonus" | "clinic" | "off" };

const GROUPS: {
  day: string;
  time: string;
  bonusLabel: string;
  sessions: Session[];
}[] = [
  {
    day: "Wednesdays",
    time: "6–7:30 PM",
    bonusLabel: "Wednesday, November 4",
    sessions: [
      { month: "Nov", day: "4", note: "Bonus", kind: "bonus" },
      { month: "Nov", day: "11", note: "Week 1", kind: "clinic" },
      { month: "Nov", day: "18", note: "Week 2", kind: "clinic" },
      { month: "Nov", day: "25", note: "Off", kind: "off" },
      { month: "Dec", day: "2", note: "Week 3", kind: "clinic" },
      { month: "Dec", day: "9", note: "Week 4", kind: "clinic" },
      { month: "Dec", day: "16", note: "Week 5", kind: "clinic" },
    ],
  },
  {
    day: "Sundays",
    time: "11 AM–12:30 PM",
    bonusLabel: "Sunday, November 8",
    sessions: [
      { month: "Nov", day: "8", note: "Bonus", kind: "bonus" },
      { month: "Nov", day: "15", note: "Week 1", kind: "clinic" },
      { month: "Nov", day: "22", note: "Week 2", kind: "clinic" },
      { month: "Nov", day: "29", note: "Off", kind: "off" },
      { month: "Dec", day: "6", note: "Week 3", kind: "clinic" },
      { month: "Dec", day: "13", note: "Week 4", kind: "clinic" },
      { month: "Dec", day: "20", note: "Week 5", kind: "clinic" },
    ],
  },
];

const PLANS = [
  {
    price: "$199",
    name: "1 session per week",
    detail: "Wednesday or Sunday — pick the group that fits your week. 5 sessions, 7½ hours of coaching.",
  },
  {
    price: "$349",
    name: "2 sessions per week",
    detail: "Wednesday and Sunday. 10 sessions — twice the reps, for players getting ready for a season or tryouts.",
  },
];

const SKILLS = [
  { name: "Serve", detail: "A consistent underhand or overhand serve, and a toss you can repeat under pressure." },
  { name: "Pass", detail: "Platform and footwork to get the ball to the setter — the skill that wins rallies." },
  { name: "Set", detail: "Clean hands, accurate location, and reading where your hitter wants the ball." },
  { name: "Spike", detail: "Approach timing, arm swing, and placing the attack instead of just hitting hard." },
  { name: "Teamwork", detail: "Calling the ball, covering your hitter, and moving as six players instead of one." },
  { name: "Game Play", detail: "Every session finishes with game play, so the week's skill shows up in real rallies." },
];

const WHAT_TO_BRING = [
  "Indoor court shoes (non-marking soles)",
  "Knee pads (recommended)",
  "Comfortable athletic clothes — the facility is climate-controlled",
  "A water bottle (refill stations on-site)",
];

const FAQS = [
  {
    question: "How do I register for the volleyball clinic?",
    answer:
      "Register in the LevelUP app — on the web at app.levelupsports.us/training, or in the iPhone or Android app under Training. Choose the 5-Week Volleyball Clinic and pick the Wednesday group, the Sunday group, or both.",
  },
  {
    question: "How much does it cost?",
    answer:
      "$199 for one session per week (Wednesday or Sunday) for five weeks. $349 for two sessions per week (Wednesday and Sunday) for five weeks.",
  },
  {
    question: "What are the dates and times?",
    answer:
      "Wednesday group: 6–7:30 PM on November 11 and 18, and December 2, 9, and 16. Sunday group: 11 AM–12:30 PM on November 15 and 22, and December 6, 13, and 20. There are no sessions Thanksgiving week (November 25 and 29).",
  },
  {
    question: "How does the early enrollment bonus work?",
    answer:
      "Enroll early and your player gets an extra session before the clinic starts: Wednesday, November 4, 6–7:30 PM for the Wednesday group, and Sunday, November 8, 11 AM–12:30 PM for the Sunday group.",
  },
  {
    question: "What skills does the clinic cover?",
    answer:
      "Serving, passing, setting, and spiking, plus teamwork and game play. Each session pairs skills work with live play.",
  },
  {
    question: "Where is the clinic held?",
    answer:
      "Indoors at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Volleyball Clinic in Elkton, MD — 5 Weeks from $199",
  description:
    "Indoor volleyball clinic at LevelUP Sports in Elkton, MD: serve, pass, set, spike. Wednesdays 6–7:30 PM or Sundays 11 AM–12:30 PM, Nov 11 – Dec 20, 2026. $199, or $349 for both days.",
  path: CLINIC.path,
  ogImage: CLINIC.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function VolleyballClinicPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Volleyball", url: "/volleyball" },
    { name: "Volleyball Clinic", url: CLINIC.path },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: `${CLINIC.name} — LevelUP Sports, Elkton, MD`,
      description:
        "Five weeks of indoor volleyball training in Elkton, MD: serving, passing, setting, spiking, teamwork, and game play. Wednesday evening and Sunday morning groups.",
      startDate: CLINIC.startISO,
      endDate: CLINIC.endISO,
      url: CLINIC.path,
      isAccessibleForFree: false,
      sport: "Volleyball",
      image: [`${SITE_CONFIG.url}${CLINIC.ogImage}`, `${SITE_CONFIG.url}${CLINIC.flyer}`],
    }),
    offers: [
      { name: "1 session per week", price: "199" },
      { name: "2 sessions per week", price: "349" },
    ].map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "USD",
      category: "Clinic Registration",
      url: `${SITE_CONFIG.url}${CLINIC.registerHref}`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-10-30",
      validThrough: CLINIC.startISO,
    })),
  };

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
                <Link href="/volleyball" className="hover:text-white transition-colors">Volleyball</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">5-Week Clinic</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-light mb-5">
                  Serve · Pass · Set · Spike · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-white/80">5-Week</span>
                  <span className="block text-[clamp(3rem,8.5vw,6rem)] font-extrabold">Volleyball Clinic</span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  Wednesday evenings or Sunday mornings — or both. Skills work, teamwork, and game
                  play, starting November 11.{" "}
                  <span className="font-semibold text-white">From $199 for five weeks.</span>
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
                    <span className="font-semibold text-white">Enroll early for a bonus session:</span>{" "}
                    Wednesday group on Nov 4, Sunday group on Nov 8.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-5">
              <div className="relative w-full max-w-[360px] mx-auto lg:max-w-[420px]">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={CLINIC.flyer}
                    alt="LevelUP 5-Week Volleyball Clinic flyer: serve, pass, set, spike. Wednesdays 6 to 7:30 PM on November 11 and 18 and December 2, 9 and 16. Sundays 11 AM to 12:30 PM on November 15 and 22 and December 6, 13 and 20. Enroll early for a bonus session: Wednesday group November 4, Sunday group November 8. $199 for one session per week, $349 for two sessions per week."
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

      {/* DATES — one strip per group, bonus and Thanksgiving week called out */}
      <Section id="dates" variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Clinic Dates · 2026</p>
              <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                Choose Wednesday or Sunday — or Train Both Days
              </h2>
              <p className="text-neutral-600">
                Each group meets five times, 90 minutes a session. Both groups take Thanksgiving week off.
              </p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-6">
            {GROUPS.map((g, gi) => (
              <Reveal key={g.day} delay={gi * 0.1}>
                <article className="bg-white rounded-xl border border-neutral-200 p-5 md:p-6 h-full">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
                    <h3 className="font-display text-2xl font-bold text-neutral-900">{g.day}</h3>
                    <p className="flex items-center gap-1.5 font-mono text-sm font-bold text-accent">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {g.time}
                    </p>
                  </div>
                  <ol className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {g.sessions.map((s) => (
                      <li
                        key={`${s.month}-${s.day}`}
                        className={cn(
                          "rounded-lg border px-1 py-3 text-center",
                          s.kind === "clinic" && "bg-neutral-50 border-neutral-200",
                          s.kind === "bonus" && "bg-warning/10 border-warning/40",
                          s.kind === "off" && "border-dashed border-neutral-300 text-neutral-500"
                        )}
                      >
                        <p className="font-mono text-[11px] uppercase tracking-wider">{s.month}</p>
                        <p
                          className={cn(
                            "font-display text-2xl font-extrabold leading-none my-1",
                            s.kind === "off" ? "line-through decoration-2" : "text-neutral-900"
                          )}
                        >
                          {s.day}
                        </p>
                        <p className={cn("text-[11px]", s.kind === "bonus" ? "font-semibold text-neutral-900" : "text-neutral-600")}>
                          {s.note}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-sm text-neutral-600">
                    <Gift className="inline h-4 w-4 mr-1 -mt-0.5 text-warning" aria-hidden="true" />
                    Bonus session {g.bonusLabel}, {g.time}, for early enrollees.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING — two options, the both-days plan carries more weight */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Pricing</p>
              <h2 className="font-display text-section text-neutral-900 text-balance">One Day a Week, or Two</h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-[2fr_3fr] gap-5 items-stretch">
            {PLANS.map((p, i) => (
              <StaggerItem key={p.price}>
                <div
                  className={cn(
                    "rounded-xl border h-full p-6 md:p-8",
                    i === 0 ? "bg-white border-neutral-200" : "bg-primary-dark border-primary-dark text-white"
                  )}
                >
                  <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", i === 0 ? "text-neutral-500" : "text-secondary-light")}>
                    {p.name}
                  </p>
                  <p className={cn("font-mono font-bold leading-none mt-3", i === 0 ? "text-5xl text-neutral-900" : "text-6xl")}>
                    {p.price}
                  </p>
                  <p className={cn("mt-4 text-sm leading-relaxed max-w-md", i === 0 ? "text-neutral-600" : "text-white/80")}>
                    {p.detail}
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className={cn("mt-6", i === 1 && "bg-secondary text-primary-dark hover:bg-secondary-light")}
                  >
                    <Link href={CLINIC.registerHref}>
                      Register <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* WHAT THEY'LL LEARN */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-5">
              <div className="relative max-w-md mx-auto lg:max-w-none lg:-rotate-1">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl ring-1 ring-neutral-200">
                  <Image
                    src="/images/sports/volleyball.jpg"
                    alt="Indoor volleyball court at LevelUP Sports in Elkton, MD"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Skills Development · Teamwork · Game Play
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-8 text-balance">What Your Player Works On</h2>
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
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Sign Up in Two Minutes</p>
                <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">How to Register</h2>
                <ol className="space-y-5">
                  {[
                    "Tap Register Now — it opens the LevelUP app, or the web version if you don't have it installed.",
                    "Sign in or create a free account, then go to Training and pick the 5-Week Volleyball Clinic.",
                    "Choose Wednesday, Sunday, or both, add your player, and pay. You'll get a confirmation by email.",
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
      <Section variant="alternate">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">FAQ</p>
                <h2 className="font-display text-section text-neutral-900 text-balance">Volleyball Clinic Questions</h2>
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
          <h2 className="font-display text-section text-white mb-4 text-balance">Save Your Spot on the Court</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            <Calendar className="inline h-5 w-5 mr-1.5 -mt-1" aria-hidden="true" />
            Wednesdays from Nov 11, Sundays from Nov 15. $199 for one day a week, $349 for both.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="xl" asChild className="bg-white text-accent hover:bg-neutral-50">
              <Link href={CLINIC.registerHref}>
                Register Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-accent" asChild>
              <Link href="/volleyball-academy">Year-Round Volleyball Academy</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
