import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Users,
  CircleDollarSign,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cookie,
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

const PATH = "/events/pickleball-tournament";

// ── Tournament constants (single source of truth) ───────────────────
const EVENT = {
  name: "LevelUP Indoor Pickleball Tournament",
  date: "Sunday, December 13, 2026",
  dateShort: "Sun, Dec 13, 2026",
  time: "1:00 – 7:00 PM",
  startISO: "2026-12-13T13:00:00-05:00",
  endISO: "2026-12-13T19:00:00-05:00",
  registerByISO: "2026-12-09T19:00:00-05:00",
  registerByLabel: "Wednesday, December 9 at 7:00 PM",
  fee: "$35",
  flyer: "/images/Content/pickleball-tournament-dec-2026.jpg",
  ogImage: "/images/og/pickleball-tournament-dec-2026.jpg",
  /**
   * Registration runs on Pickleball.com. Paste the event link here when it's
   * published and every CTA on this page switches from "opens soon" to "Register".
   */
  registerUrl: null as string | null,
};

const DIVISIONS = [
  { name: "Mixed Doubles", rule: "No DUPR rating required", note: "The open door — bring any partner and play." },
  { name: "Doubles", rule: "DUPR-rated, 3.499 & under", note: "Competitive doubles for developing rated players." },
  { name: "Doubles", rule: "DUPR-rated, 3.5 & above", note: "The top bracket for experienced rated players." },
];

const DAY_PLAN = [
  { time: "Wed, Dec 9 · 7:00 PM", title: "Registration closes", description: "Pairs are seeded into their divisions after the deadline." },
  { time: "Sun, Dec 13 · 1:00 PM", title: "First serve", description: "Play runs across the indoor courts through the afternoon. Snacks provided." },
  { time: "Sun, Dec 13 · 7:00 PM", title: "Champions crowned", description: "Division finals wrap up the day." },
];

const WHAT_TO_BRING = [
  "Your paddle (loaner paddles available if you need one)",
  "Indoor non-marking court shoes",
  "Your doubles partner",
  "Your DUPR ID if you're entering a rated doubles division",
  "Water bottle (refill stations on-site)",
];

const FAQS = [
  {
    question: "When and where is the pickleball tournament?",
    answer: `${EVENT.date}, 1:00 to 7:00 PM, on the indoor courts at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921.`,
  },
  {
    question: "How do I register?",
    answer: `Registration runs on Pickleball.com. The link is being published now and will be posted on this page as soon as it's live. Registration closes ${EVENT.registerByLabel}.`,
  },
  {
    question: "How much does it cost?",
    answer: "$35 per participant, so $70 for a doubles pair. Snacks are provided.",
  },
  {
    question: "Which division should I enter?",
    answer:
      "Mixed Doubles needs no DUPR rating, so it's open to everyone. The two Doubles divisions are DUPR-rated: one for players rated 3.499 and under, one for 3.5 and above.",
  },
  {
    question: "Do I need a partner?",
    answer:
      "Yes, every division is doubles. If you're looking for a partner, call the club and we'll try to pair you with another player.",
  },
  {
    question: "Where is it held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Indoor Pickleball Tournament — Dec 13, 2026, Elkton MD",
  description:
    "Indoor pickleball tournament at LevelUP Sports in Elkton, MD, Sunday Dec 13, 1–7 PM. Mixed doubles plus DUPR-rated doubles divisions. $35 per player, snacks provided.",
  path: PATH,
  ogImage: EVENT.ogImage,
});

function RegisterButton({ className, label = "Register" }: { className?: string; label?: string }) {
  if (EVENT.registerUrl) {
    return (
      <Button size="xl" asChild className={className}>
        <a href={EVENT.registerUrl} target="_blank" rel="noopener noreferrer">
          {label} on Pickleball.com <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </a>
      </Button>
    );
  }
  return (
    <Button size="xl" disabled className={className}>
      Registration opens soon
    </Button>
  );
}

// ── Page ────────────────────────────────────────────────────────────
export default function PickleballTournamentPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Pickleball", url: "/pickleball" },
    { name: "Pickleball Tournament", url: PATH },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: EVENT.name,
      description:
        "Indoor pickleball tournament in Elkton, MD: Mixed Doubles (no DUPR rating required) and DUPR-rated Doubles divisions for 3.499 & under and 3.5 & above. $35 per participant, snacks provided.",
      startDate: EVENT.startISO,
      endDate: EVENT.endISO,
      url: PATH,
      isAccessibleForFree: false,
      sport: "Pickleball",
      image: [`${SITE_CONFIG.url}${EVENT.ogImage}`, `${SITE_CONFIG.url}${EVENT.flyer}`],
      organizer: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
      },
      performer: { "@type": "PerformingGroup", name: "Registered Players — Pickleball Tournament" },
    }),
    offers: {
      "@type": "Offer",
      name: "Participant Entry",
      price: "35",
      priceCurrency: "USD",
      category: "Tournament Registration",
      url: EVENT.registerUrl ?? `${SITE_CONFIG.url}${PATH}`,
      availability: EVENT.registerUrl ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      validThrough: EVENT.registerByISO,
    },
  };

  const faqLD = generateFAQLD(FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />

      {/* HERO — navy, flyer pinned as a poster */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white pt-28 md:pt-32 pb-16 md:pb-24">
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/pickleball" className="hover:text-white transition-colors">Pickleball</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Tournament — Dec 13</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-3 py-1.5 rounded-full mb-6 border border-white/15">
                  <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
                  {EVENT.dateShort} · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(2.25rem,6vw,4rem)] font-extrabold">Indoor Pickleball</span>
                  <span className="block text-[clamp(3rem,10vw,6.5rem)] font-extrabold text-secondary">Tournament</span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  <span className="font-semibold text-white">You asked for it.</span> Sunday, December 13,
                  1–7 PM. Three doubles divisions, $35 per player, snacks provided. Grab your partner.
                </p>

                <div className="flex flex-wrap gap-3">
                  <RegisterButton className="bg-secondary text-primary-dark hover:bg-secondary-light" />
                  <Button
                    size="xl"
                    variant="outline"
                    asChild
                    className="border-white/30 text-white hover:bg-white hover:text-primary-dark"
                  >
                    <a href="#divisions">See the Divisions</a>
                  </Button>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  {EVENT.registerUrl
                    ? `Registration closes ${EVENT.registerByLabel}.`
                    : `Registration is on Pickleball.com — the link goes up here shortly. Closes ${EVENT.registerByLabel}.`}
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative w-full max-w-[320px] mx-auto lg:max-w-none lg:w-[340px]">
                <div className="relative aspect-[900/1125] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={EVENT.flyer}
                    alt="Indoor Pickleball Tournament flyer — Sunday, December 13, 2026, 1 to 7 PM; Mixed Doubles with no DUPR rating required, DUPR-rated Doubles 3.499 and under, DUPR-rated Doubles 3.5 and above; $35 per participant, snacks provided; registration closes Wednesday, December 9 at 7 PM; LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD"
                    fill
                    sizes="(max-width: 1024px) 320px, 340px"
                    className="object-cover"
                    priority
                  />
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">First Serve In</p>
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
              { icon: Calendar, label: "Date", value: EVENT.dateShort, sub: EVENT.time, iconBg: "bg-info/10", iconColor: "text-info", topBar: "bg-info" },
              { icon: CircleDollarSign, label: "Entry", value: `${EVENT.fee} / Player`, sub: "$70 per doubles pair", iconBg: "bg-secondary/15", iconColor: "text-secondary", topBar: "bg-secondary" },
              { icon: Users, label: "Format", value: "3 doubles divisions", sub: "Mixed + two DUPR-rated", iconBg: "bg-accent/10", iconColor: "text-accent", topBar: "bg-accent" },
              { icon: Cookie, label: "On Us", value: "Snacks provided", sub: "Stay between matches", iconBg: "bg-warning/15", iconColor: "text-warning", topBar: "bg-warning" },
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

      {/* DIVISIONS — a ruled list, like the flyer, not three identical cards */}
      <section id="divisions" className="py-14 md:py-20 bg-gradient-to-b from-info/5 to-white border-t border-neutral-100">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-info mb-3">Choose Your Division</p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">Three Ways to Play Doubles</h2>
              <p className="text-neutral-600">
                No rating? Mixed Doubles is open to everyone. Got a DUPR rating? Enter the bracket that
                matches it.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <ol className="divide-y divide-neutral-200 border-y border-neutral-200">
                {DIVISIONS.map((d, i) => (
                  <li key={d.rule} className="grid sm:grid-cols-[3rem_1fr_1.2fr] gap-x-6 gap-y-1 py-6 items-baseline">
                    <span className="font-mono text-sm font-bold text-accent" aria-hidden="true">0{i + 1}</span>
                    <h3 className="font-display text-2xl font-extrabold text-neutral-900">{d.name}</h3>
                    <div>
                      <p className="font-semibold text-neutral-900">{d.rule}</p>
                      <p className="text-sm text-neutral-500">{d.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DAY PLAN + WHAT TO BRING */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Tournament Day</p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">How the Day Runs</h2>
                <p className="text-neutral-600 mb-6">
                  Match times depend on how many pairs enter each division and go out to players after
                  registration closes.
                </p>
                <div className="bg-white rounded-xl p-5 border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                    What to Bring
                  </h3>
                  <ul className="space-y-2">
                    {WHAT_TO_BRING.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="text-accent mt-0.5" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.15}>
              <ol className="relative border-l-2 border-accent/20 ml-3 space-y-6">
                {DAY_PLAN.map((item) => (
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
                Indoor, climate-controlled courts and free on-site parking. 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.
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
                  Get Directions <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm text-center">
                <Phone className="h-6 w-6 text-accent mx-auto mb-3" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Call the Club</p>
                <a href={`tel:${SITE_CONFIG.phone}`} className="font-semibold text-neutral-900 hover:text-accent">
                  {SITE_CONFIG.phone}
                </a>
                <p className="text-xs text-neutral-500 mt-2">Looking for a partner? Ask us.</p>
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
                <h2 className="font-display text-section text-neutral-900 text-balance">Tournament Questions, Answered</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion items={FAQS} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 bg-accent text-white">
        <Container className="text-center">
          <h2 className="font-display text-section text-white mb-4 text-balance">Grab Your Partner. Rally Your Crew.</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Sunday, December 13, 1–7 PM. $35 per player, snacks provided. Registration closes{" "}
            {EVENT.registerByLabel}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <RegisterButton className="bg-white text-accent hover:bg-neutral-50 shadow-lg" />
            <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-accent" asChild>
              <Link href="/pickleball">Explore Pickleball at LevelUP</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
