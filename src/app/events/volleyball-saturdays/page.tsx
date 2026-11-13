import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

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

// ── Program constants (single source of truth) ──────────────────────
const PROGRAM = {
  name: "Saturday Volleyball Training with Coach Ken Cranker",
  path: "/events/volleyball-saturdays",
  registerHref: BOOKING_URLS.volleyballSaturdays,
  startISO: "2026-11-14T11:00:00-05:00",
  endISO: "2026-12-19T14:30:00-05:00",
  flyer: "/images/Content/volleyball-saturday-training-fall-2026.jpg",
  ogImage: "/images/og/volleyball-saturday-training-fall-2026.jpg",
};

type Session = { month: string; day: string; note: string; off?: boolean };

const SESSIONS: Session[] = [
  { month: "Nov", day: "14", note: "Week 1" },
  { month: "Nov", day: "21", note: "Week 2" },
  { month: "Nov", day: "28", note: "Off", off: true },
  { month: "Dec", day: "5", note: "Week 3" },
  { month: "Dec", day: "12", note: "Week 4" },
  { month: "Dec", day: "19", note: "Week 5" },
];

const GROUPS = [
  {
    level: "Beginners",
    ages: "Ages 8–12",
    time: "11 AM–12:30 PM",
    price: "$199",
    priceValue: "199",
    appProgram: "Volleyball 5 week Clinic (Saturdays Age group 8-12) - (11am-12:30pm)",
    focus: ["Serving", "Passing", "Setting", "Footwork", "Teamwork"],
    detail:
      "For players new to the game or still building the basics. A clean serve, a steady platform, and knowing where to stand when the ball comes over.",
  },
  {
    level: "Intermediate / Advanced",
    ages: "Ages 12+",
    time: "1–2:30 PM",
    price: "$249",
    priceValue: "249",
    appProgram: "Volleyball 5 week Clinic (Saturdays Age group 12+) - (1pm-2:30pm)",
    focus: ["Technique", "Attacking", "Blocking", "Game strategy"],
    detail:
      "For players who already pass and serve with confidence. Sharper technique, a real approach and swing, timing at the net, and reading the other side.",
  },
];

const WHAT_TO_BRING = [
  "Indoor court shoes (non-marking soles)",
  "Knee pads (recommended)",
  "Comfortable athletic clothes — the facility is climate-controlled",
  "A water bottle (refill stations on-site)",
];

const FAQS = [
  {
    question: "How do I register for Saturday volleyball training?",
    answer:
      "Register in the LevelUP app — on the web at app.levelupsports.us/training, or in the iPhone or Android app under Training. Pick \"Volleyball 5 week Clinic (Saturdays Age group 8-12)\" for the 11 AM beginners group, or \"Volleyball 5 week Clinic (Saturdays Age group 12+)\" for the 1 PM intermediate/advanced group.",
  },
  {
    question: "How much does it cost?",
    answer:
      "$199 for the Beginners group (ages 8–12) and $249 for the Intermediate/Advanced group (ages 12+). Both prices cover all five Saturday sessions.",
  },
  {
    question: "What are the dates and times?",
    answer:
      "Five Saturdays: November 14 and 21, and December 5, 12, and 19. No session on November 28, Thanksgiving weekend. Beginners train 11 AM–12:30 PM; Intermediate/Advanced train 1–2:30 PM.",
  },
  {
    question: "My player is 12 — which group should they join?",
    answer:
      "Twelve-year-olds fit either group. Choose Beginners if they're still learning to serve and pass consistently, and Intermediate/Advanced if they already play on a team. Not sure? Call the front desk at (443) 406-6494 and we'll help you pick.",
  },
  {
    question: "Who is the coach?",
    answer:
      "Both groups are coached by Coach Ken Cranker at LevelUP Sports & Athletics Club in Elkton, MD.",
  },
  {
    question: "Where is the training held?",
    answer:
      "Indoors at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Saturday Youth Volleyball Training — Elkton, MD",
  description:
    "5-week Saturday volleyball training with Coach Ken Cranker in Elkton, MD. Beginners 8–12 at 11 AM ($199), intermediate/advanced 12+ at 1 PM ($249). Nov 14 – Dec 19.",
  path: PROGRAM.path,
  ogImage: PROGRAM.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function VolleyballSaturdaysPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Volleyball", url: "/volleyball" },
    { name: "Saturday Training", url: PROGRAM.path },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: `${PROGRAM.name} — LevelUP Sports, Elkton, MD`,
      description:
        "Five Saturdays of indoor youth volleyball training in Elkton, MD with Coach Ken Cranker. Beginners ages 8–12 at 11 AM; intermediate/advanced ages 12+ at 1 PM.",
      startDate: PROGRAM.startISO,
      endDate: PROGRAM.endISO,
      url: PROGRAM.path,
      isAccessibleForFree: false,
      sport: "Volleyball",
      image: [`${SITE_CONFIG.url}${PROGRAM.ogImage}`, `${SITE_CONFIG.url}${PROGRAM.flyer}`],
    }),
    offers: GROUPS.map((g) => ({
      "@type": "Offer",
      name: `${g.level} (${g.ages}) — 5 weeks`,
      price: g.priceValue,
      priceCurrency: "USD",
      category: "Training Registration",
      url: `${SITE_CONFIG.url}${PROGRAM.registerHref}`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-11-12",
      validThrough: PROGRAM.startISO,
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
              <li className="text-white font-medium">Saturday Training</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal variant="fade-right" className="lg:col-span-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-light mb-5">
                  5 Saturdays · Nov 14 – Dec 19 · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(3rem,8.5vw,6rem)] font-extrabold">Volleyball Training</span>
                  <span className="block mt-2 text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold text-white/80">
                    with Coach Ken Cranker
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  Build your skills. Grow your confidence. Two groups, matched to where your player is
                  now: beginners at 11 AM, intermediate and advanced at 1 PM.{" "}
                  <span className="font-semibold text-white">$199 or $249 for five weeks.</span>
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-primary-dark hover:bg-secondary-light">
                    <Link href={PROGRAM.registerHref}>
                      Register Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    asChild
                    className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
                  >
                    <a href="#groups">Pick a Group</a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15} className="lg:col-span-5">
              <div className="relative w-full max-w-[340px] mx-auto lg:max-w-[400px]">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={PROGRAM.flyer}
                    alt="LevelUP Volleyball Training with Coach Ken Cranker flyer: 5-week Saturday program on November 14 and 21 and December 5, 12 and 19. Beginners ages 8 to 12, 11 AM to 12:30 PM, $199 for 5 weeks — serving, passing, setting, footwork, teamwork. Intermediate and advanced ages 12 and up, 1 to 2:30 PM, $249 for 5 weeks — technique, attacking, blocking, game strategy."
                    fill
                    sizes="(max-width: 1024px) 340px, 400px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* GROUPS — the two levels side by side, intermediate panel carries the weight */}
      <Section id="groups" variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Two Groups · Every Saturday</p>
              <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                Train at the Right Level
              </h2>
              <p className="text-neutral-600">
                Each group meets five times, 90 minutes a session, on the same Saturdays. Twelve-year-olds
                can join either — pick by experience.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-5 items-stretch">
            {GROUPS.map((g, i) => (
              <StaggerItem key={g.level}>
                <article
                  className={cn(
                    "rounded-xl border h-full p-6 md:p-8 flex flex-col",
                    i === 0 ? "bg-white border-neutral-200" : "bg-primary-dark border-primary-dark text-white"
                  )}
                >
                  <p
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.2em]",
                      i === 0 ? "text-accent" : "text-secondary-light"
                    )}
                  >
                    {g.ages}
                  </p>
                  <h3 className={cn("font-display text-2xl md:text-3xl font-extrabold mt-2", i === 0 ? "text-neutral-900" : "text-white")}>
                    {g.level}
                  </h3>
                  <div className="flex flex-wrap items-end justify-between gap-4 mt-5">
                    <p className={cn("flex items-center gap-1.5 font-mono text-sm font-bold", i === 0 ? "text-accent" : "text-secondary-light")}>
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {g.time}
                    </p>
                    <p className="font-mono font-bold leading-none">
                      <span className={cn("text-5xl", i === 0 ? "text-neutral-900" : "text-white")}>{g.price}</span>
                      <span className={cn("ml-2 text-xs uppercase tracking-wider", i === 0 ? "text-neutral-500" : "text-white/70")}>
                        5 weeks
                      </span>
                    </p>
                  </div>
                  <p className={cn("mt-5 text-sm leading-relaxed max-w-md", i === 0 ? "text-neutral-600" : "text-white/80")}>
                    {g.detail}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.level} focus areas`}>
                    {g.focus.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          i === 0 ? "bg-neutral-100 text-neutral-700" : "bg-white/10 text-white"
                        )}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <Button
                      size="lg"
                      asChild
                      className={cn(i === 1 && "bg-secondary text-primary-dark hover:bg-secondary-light")}
                    >
                      <Link href={PROGRAM.registerHref}>
                        Register — {g.level.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* DATES — one strip, Thanksgiving weekend called out */}
      <Section id="dates">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Dates · 2026</p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">Five Saturdays</h2>
                <p className="text-neutral-600">
                  Both groups train on the same five Saturdays and take Thanksgiving weekend off.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SESSIONS.map((s) => (
                  <li
                    key={`${s.month}-${s.day}`}
                    className={cn(
                      "rounded-lg border px-1 py-4 text-center",
                      s.off ? "border-dashed border-neutral-300 text-neutral-500" : "bg-neutral-50 border-neutral-200"
                    )}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider">{s.month}</p>
                    <p
                      className={cn(
                        "font-display text-3xl font-extrabold leading-none my-1",
                        s.off ? "line-through decoration-2" : "text-neutral-900"
                      )}
                    >
                      {s.day}
                    </p>
                    <p className="text-[11px] text-neutral-600">{s.note}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
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
                    "Sign in or create a free account, then go to Training.",
                    "Choose your player's program, add your player, and pay. You'll get a confirmation by email.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-neutral-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">
                    Look for these in Training
                  </p>
                  <ul className="space-y-1.5 font-mono text-[13px] text-neutral-800">
                    {GROUPS.map((g) => (
                      <li key={g.appProgram}>{g.appProgram}</li>
                    ))}
                  </ul>
                </div>
                <Button size="lg" asChild className="mt-8">
                  <Link href={PROGRAM.registerHref}>
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
                <h2 className="font-display text-section text-neutral-900 text-balance">Saturday Training Questions</h2>
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
          <h2 className="font-display text-section text-white mb-4 text-balance">Saturdays Start November 14</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            <Calendar className="inline h-5 w-5 mr-1.5 -mt-1" aria-hidden="true" />
            Beginners 8–12 at 11 AM, $199. Intermediate/Advanced 12+ at 1 PM, $249.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="xl" asChild className="bg-white text-accent hover:bg-neutral-50">
              <Link href={PROGRAM.registerHref}>
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
