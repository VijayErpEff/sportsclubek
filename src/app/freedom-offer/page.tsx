import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  DollarSign,
  Percent,
  Snowflake,
  Users,
  Phone,
  ArrowRight,
  MapPin,
  Sparkles,
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

// ── Offer constants ─────────────────────────────────────────────────
const OFFER = {
  name: "LevelUP Freedom Offer — July 4th Weekend",
  startISO: "2026-07-03T13:00:00-04:00",
  endISO: "2026-07-05T21:00:00-04:00",
  banner: "/images/offers/freedom-banner.png",
  flyer: "/images/offers/freedom-flyer.jpeg",
};

const DAYS = [
  { dow: "Friday", date: "July 3", hours: "1:00 PM – 9:00 PM", accent: "bg-accent" },
  { dow: "Saturday", date: "July 4", hours: "9:00 AM – 9:00 PM", accent: "bg-primary" },
  { dow: "Sunday", date: "July 5", hours: "9:00 AM – 9:00 PM", accent: "bg-secondary" },
];

const SPORTS = [
  "Badminton",
  "Volleyball",
  "Soccer",
  "Cricket",
  "Pickleball",
  "Baseball",
];

const FAQS = [
  {
    question: "What is the LevelUP Freedom Offer?",
    answer:
      "A three-day, long-weekend special at LevelUP Sports & Athletics Club in Elkton, MD. From July 3–5, open play is just $5 and net & cage rentals are 50% off. It's our way of celebrating the holiday weekend with the community.",
  },
  {
    question: "Do I need a membership to take part?",
    answer:
      "No membership needed for the Freedom Offer. Walk in during the offer hours, pick a court, and play. First-timers and regulars are all welcome.",
  },
  {
    question: "Which sports are included?",
    answer:
      "Badminton, volleyball, soccer, cricket, pickleball, and baseball — all on our climate-controlled indoor courts. Ages 5 to 65+ are welcome.",
  },
  {
    question: "What are the offer hours?",
    answer:
      "Friday, July 3 from 1:00 PM to 9:00 PM; Saturday, July 4 from 9:00 AM to 9:00 PM; and Sunday, July 5 from 9:00 AM to 9:00 PM.",
  },
  {
    question: "Where is LevelUP located?",
    answer:
      "701 E Pulaski Hwy, Elkton, MD 21921 — with free on-site parking, just off I-95. We're a short drive from Newark and Middletown, DE.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Freedom Offer — $5 Open Play, July 3–5 | LevelUP Sports, Elkton MD",
  description:
    "Celebrate the long weekend at LevelUP Sports in Elkton, MD. July 3–5: $5 open play and 50% off net & cage rentals. Badminton, volleyball, soccer, cricket, pickleball & baseball on climate-controlled courts. All ages.",
  path: "/freedom-offer",
  ogImage: OFFER.banner,
});

// ── Page ────────────────────────────────────────────────────────────
export default function FreedomOfferPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Offers", url: "/offers" },
    { name: "Freedom Offer", url: "/freedom-offer" },
  ]);

  const eventLD = generateEventLD({
    name: OFFER.name,
    description:
      "Three-day Freedom Offer at LevelUP Sports & Athletics Club: $5 open play and 50% off net & cage rentals, July 3–5. Badminton, volleyball, soccer, cricket, pickleball, and baseball on climate-controlled indoor courts. Ages 5 to 65+.",
    startDate: OFFER.startISO,
    endDate: OFFER.endISO,
    url: "/freedom-offer",
    isAccessibleForFree: false,
    sport: "Multi-sport",
    image: [`${SITE_CONFIG.url}${OFFER.banner}`],
    performer: {
      "@type": "PerformingGroup",
      name: "LevelUP Sports & Athletics Club",
    },
    offers: {
      price: "5",
      priceCurrency: "USD",
      url: `${SITE_CONFIG.url}/freedom-offer`,
      validThrough: OFFER.endISO,
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

      {/* ═══════════════════════════════════════════ HERO ═══════════ */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-light text-white">
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors">Offers</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Freedom Offer</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary bg-white/10 backdrop-blur px-3 py-1.5 rounded-full mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Freedom Offer · July 4th Weekend
                </p>
                <h1 className="font-display text-hero leading-[1.05] mb-4 text-balance">
                  Play Free.{" "}
                  <span className="text-secondary">Feel the Energy.</span>
                </h1>
                <p className="text-lg text-white/80 mb-6 max-w-xl">
                  Three days of open courts to celebrate the long weekend — every
                  sport under one climate-controlled roof in Elkton, MD.
                </p>

                {/* Offer chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 font-bold">
                    <DollarSign className="h-4 w-4 text-secondary" /> $5 Open Play
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 font-bold">
                    <Percent className="h-4 w-4 text-secondary" /> 50% Off Net &amp; Cage Rentals
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="xl" asChild className="bg-secondary text-white hover:bg-secondary/90">
                    <a href={`tel:${SITE_CONFIG.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call to Book
                    </a>
                  </Button>
                  <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary" asChild>
                    <Link href="#details">
                      See the Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  Fri July 3 · Sat July 4 · Sun July 5 — indoor, climate-controlled
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[1200/630]">
                <Image
                  src={OFFER.banner}
                  alt="LevelUP Freedom Offer — Play Free, Feel the Energy. $5 open play and 50% off net and cage rentals, July 3 to 5, climate-controlled, Elkton MD."
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════ COUNTDOWN ══════ */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-10">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Offer Starts In
              </p>
              <CountdownTimer targetDate={new Date(OFFER.startISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════ KEY DETAILS ════ */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: DollarSign, label: "Open Play", value: "$5 all weekend" },
              { icon: Percent, label: "Rentals", value: "50% off net & cage" },
              { icon: Snowflake, label: "Indoor", value: "Climate-controlled" },
              { icon: Users, label: "Who", value: "Ages 5 to 65+" },
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

      {/* ═══════════════════════════════════════════ SCHEDULE ═══════ */}
      <Section variant="alternate" id="details">
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Limited-Time · 3 Days Only
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
                When to Come Play
              </h2>
              <p className="text-neutral-600">
                Walk in during the hours below — no reservation required, though a
                quick call helps us have a court ready for larger groups.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {DAYS.map((d) => (
              <StaggerItem key={d.date}>
                <div className="relative bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm h-full overflow-hidden">
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${d.accent}`} aria-hidden="true" />
                  <div className="flex items-center gap-2 text-neutral-400 mb-3">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{d.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 mb-3">{d.dow}</h3>
                  <p className="inline-flex items-center gap-2 font-semibold text-accent">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {d.hours}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════ INCLUDED ═══════ */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            <Reveal variant="fade-right">
              <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm h-full">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  One pass, every court
                </p>
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-5">
                  Six Sports, All Weekend
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {SPORTS.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-800 font-semibold text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-600 mt-6">
                  Bring the family, bring a crew. Rackets, nets, and cages are
                  ready to go — just show up and play.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.1}>
              <div className="bg-primary text-white rounded-2xl p-8 h-full flex flex-col justify-center gap-4">
                {[
                  { icon: DollarSign, text: "$5 open play — every sport, all three days" },
                  { icon: Percent, text: "50% off net & batting-cage rentals" },
                  { icon: Snowflake, text: "Climate-controlled indoors at a comfortable 72°F" },
                  { icon: Users, text: "All ages welcome, from 5 to 65+" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <span className="flex-none inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-secondary-light">
                      <f.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════ LOCATION ═══════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="font-display text-section text-neutral-900 mb-3">Find Us</h2>
              <p className="text-neutral-600">
                {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city},{" "}
                {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip} — free on-site
                parking, just off I-95.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Button size="lg" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>
                    <Phone className="mr-2 h-4 w-4" /> {SITE_CONFIG.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Directions &amp; Hours</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════ FAQ ═══════════ */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  Good to Know
                </p>
                <h2 className="font-display text-section text-neutral-900">
                  Freedom Offer FAQ
                </h2>
              </div>
            </Reveal>
            <FAQAccordion items={FAQS} />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════ CTA ═══════════ */}
      <CTABanner
        title="Join the Club & Feel the Energy"
        description="No membership needed for the Freedom Offer — just show up and play. See you on the courts, July 3–5."
        primaryCTA={{ label: "Call (443) 406-6494", href: `tel:${SITE_CONFIG.phone}` }}
        secondaryCTA={{ label: "Explore Memberships", href: "/memberships" }}
        variant="accent"
      />
    </>
  );
}
