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
  Clock,
  UserPlus,
  Shield,
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

const T = TOURNAMENTS["thanksgiving-cricket"];

// ── Tournament constants (single source of truth; mirrors app tournament 3) ──
const EVENT = {
  name: "LevelUP Thanksgiving Indoor Cricket Tournament 2026",
  dateShort: "Nov 26–27, 2026",
  startISO: "2026-11-26T11:00:00-05:00",
  endISO: "2026-11-27T20:30:00-05:00",
  registerByISO: "2026-11-26T11:00:00-05:00",
  registerByLabel: "Thursday, November 26 at 11 AM, when the first match starts",
  fee: "$20",
  flyer: "/images/Content/thanksgiving-cricket-2026.jpg",
  ogImage: "/images/og/thanksgiving-cricket-2026.jpg",
  /** Tournament contact printed on the flyer, alongside the club line. */
  contactPhone: "615-593-9974",
  /** Solo players use the same name + email form; staff place them on a mix-and-match team. */
  soloHref: T.registerHref,
};

const WAYS_IN = [
  {
    icon: Users,
    title: "Bring your own team",
    detail: `Each player signs up with just a name, an email and your team name. Squads of ${T.minPlayers}–${T.maxPlayers}. $20 per player, paid at the desk.`,
    cta: "Register your team",
    href: T.registerHref,
    primary: true,
  },
  {
    icon: UserPlus,
    title: "Come solo, join a mix-and-match team",
    detail:
      "No team? Sign up with your name and email and we'll put you on a mix-and-match side with other solo players. Same $20, paid at the desk.",
    cta: "Sign up as a solo player",
    href: EVENT.soloHref,
    primary: false,
  },
];

const SCHEDULE = [
  {
    time: "Now – Thu, Nov 26 · 11 AM",
    title: "Registration open",
    description: "Teams and solo players sign up with a name and email right up to the first match. Mix-and-match teams are drawn from the solo sign-ups.",
  },
  {
    time: "Thu, Nov 26 · morning",
    title: "Match schedule released",
    description: "Fixtures go out by email based on how many teams signed up.",
  },
  {
    time: "Thu, Nov 26 · 11 AM – 8 PM",
    title: "Round robin",
    description: "Every team plays through the round robin on the indoor pitch.",
  },
  {
    time: "Fri, Nov 27",
    title: "Semi-finals & finals",
    description: "The top teams play off for the trophies. Times go out with the match schedule.",
  },
];

const WHAT_TO_BRING = [
  "Your own bat and protective gear if you have them (club gear available to borrow)",
  "Indoor non-marking shoes (required on the pitch)",
  "Light athletic clothing — the facility is climate-controlled",
  "Water bottle (refill stations on-site)",
];

const FAQS = [
  {
    question: "How do I register for the Thanksgiving cricket tournament?",
    answer: `Sign up at levelupsports.us${T.registerHref} with just your name and email. Playing with a team? Add your team name. Coming solo? Leave it blank and we'll place you on a mix-and-match team. Pay $20 at the desk. Registration closes ${EVENT.registerByLabel}.`,
  },
  {
    question: "How much does it cost?",
    answer:
      "$20 per player, paid at the front desk when you check in (cash, Venmo, Zelle or card). A team of 8 is $160 and a team of 10 is $200. Nothing to pay online.",
  },
  {
    question: "I don't have a team. Can I still play?",
    answer:
      "Yes. Sign up with your name and email and leave the team name blank. Same $20, paid at the desk. We group solo players into mix-and-match teams before the first match.",
  },
  {
    question: "What's the format?",
    answer:
      "Round robin matches on Thursday, November 26 from 11 AM to 8 PM, then semi-finals and finals on Friday, November 27. The match schedule goes out Thursday morning based on the number of teams signed up.",
  },
  {
    question: "What do the winners get?",
    answer: "Trophies for the winners and the runners-up.",
  },
  {
    question: "What if we need to withdraw?",
    answer:
      "Withdraw at least 24 hours before the start for a full refund of what you paid. After that, 50% is refunded until the draw is made. Once the draw is made, entries are not refunded. Refunds are paid once the club approves them.",
  },
  {
    question: "Can I change my team after registering?",
    answer:
      "Yes. Each player signs up separately, so a new teammate just signs up with your team name. To remove someone or fix a typo, call (443) 406-6494 or tell the front desk at check-in.",
  },
  {
    question: "Where is it held?",
    answer:
      "LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD 21921. Free on-site parking, right off I-95 exit 109A — 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.",
  },
];

// ── Metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = generateSEOMetadata({
  title: "Thanksgiving Indoor Cricket Tournament — Nov 26–27, Elkton MD",
  description:
    "Indoor cricket tournament at LevelUP Sports in Elkton, MD on Thanksgiving, Nov 26–27, 2026. $20 per player, teams or solo sign-ups, trophies. Sign up until the first match.",
  path: T.eventHref,
  ogImage: EVENT.ogImage,
});

// ── Page ────────────────────────────────────────────────────────────
export default function ThanksgivingCricketPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Cricket", url: "/cricket" },
    { name: "Thanksgiving Cricket Tournament", url: T.eventHref },
  ]);

  const eventLD = {
    ...generateEventLD({
      name: EVENT.name,
      description:
        "Two-day indoor cricket tournament in Elkton, MD: round robin on Thanksgiving Day, semi-finals and finals on Friday. Bring a team or join a mix-and-match team. Trophies for winners and runners-up.",
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
      performer: { "@type": "PerformingGroup", name: "Registered Teams — Thanksgiving Cricket" },
    }),
    offers: {
      "@type": "Offer",
      name: "Player Entry",
      price: "20",
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
                <Link href="/cricket" className="hover:text-white transition-colors">Cricket</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Thanksgiving Tournament — Nov 26–27</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <Reveal variant="fade-right">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-3 py-1.5 rounded-full mb-6 border border-white/15">
                  <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
                  Indoor Cricket · Elkton, MD
                </p>

                <h1 className="font-display leading-[0.95] tracking-tight mb-6 text-balance">
                  <span className="block text-[clamp(3rem,9vw,6.25rem)] font-extrabold">Thanksgiving</span>
                  <span className="block text-[clamp(2rem,5.5vw,4rem)] font-extrabold text-secondary">
                    Cricket Tournament
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl text-balance">
                  <span className="font-semibold text-white">Registration is open.</span>{" "}
                  Round robin on Thanksgiving Day, finals on Friday. Sign up with just your name and email,
                  then pay $20 at the desk. Bring your own team or come solo and join a mix-and-match side.
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
                    <Link href={EVENT.soloHref}>Join as a Solo Player</Link>
                  </Button>
                </div>
                <p className="text-sm text-white/60 mt-6">
                  Registration closes {EVENT.registerByLabel}.{" "}
                  <Link
                    href={`${T.registerHref}/manage`}
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Registered a team in the app? Manage it →
                  </Link>
                </p>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative w-full max-w-[320px] mx-auto lg:max-w-none lg:w-[340px]">
                <div className="relative aspect-[900/1138] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 rotate-2">
                  <Image
                    src={EVENT.flyer}
                    alt="Thanksgiving Indoor Cricket Tournament 2026 flyer — Thursday, November 26, 11 AM to 8 PM round robin; Friday, November 27 semi-finals and finals; $20 per player; bring your own team or join a mix-and-match team; trophies for winners and runners-up; registration closes Wednesday, November 25 at 6 PM; LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD"
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

      {/* COUNTDOWN — to the registration deadline, the thing that matters this week */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-10">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Registration Closes In</p>
              <CountdownTimer targetDate={new Date(EVENT.registerByISO)} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* KEY DETAILS */}
      <Section id="details">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Calendar, label: "Dates", value: EVENT.dateShort, sub: "Thu round robin · Fri finals", iconBg: "bg-info/10", iconColor: "text-info", topBar: "bg-info" },
              { icon: CircleDollarSign, label: "Entry", value: `${EVENT.fee} / Player`, sub: "Pay at the desk", iconBg: "bg-secondary/15", iconColor: "text-secondary", topBar: "bg-secondary" },
              { icon: Users, label: "Teams", value: `${T.minPlayers}–${T.maxPlayers} players`, sub: "Or join a mix-and-match team", iconBg: "bg-accent/10", iconColor: "text-accent", topBar: "bg-accent" },
              { icon: Trophy, label: "Trophies", value: "Winners & Runners-up", sub: "Open to all players", iconBg: "bg-warning/15", iconColor: "text-warning", topBar: "bg-warning" },
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

      {/* TWO WAYS IN — team (wide) vs solo (narrow), deliberately uneven */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-info/5 to-white border-t border-neutral-100">
        <Container>
          <Reveal>
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-info mb-3">Open to All Players</p>
              <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">Two Ways Onto the Pitch</h2>
              <p className="text-neutral-600">
                Got a crew? Register them together. On your own? Sign up solo and we&apos;ll build the
                teams from everyone who does.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-[3fr_2fr] gap-5 items-stretch">
            {WAYS_IN.map((w) => (
              <StaggerItem key={w.title}>
                <article
                  className={`h-full rounded-2xl border p-6 md:p-8 flex flex-col ${
                    w.primary
                      ? "bg-primary-dark text-white border-primary-dark"
                      : "bg-white text-neutral-900 border-neutral-200"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      w.primary ? "bg-secondary/20 text-secondary" : "bg-accent/10 text-accent"
                    }`}
                  >
                    <w.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{w.title}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${w.primary ? "text-white/80" : "text-neutral-600"}`}>
                    {w.detail}
                  </p>
                  <div className="mt-auto">
                    <Button
                      size="lg"
                      asChild
                      variant={w.primary ? "primary" : "outline"}
                      className={w.primary ? "bg-secondary text-primary-dark hover:bg-secondary-light" : undefined}
                    >
                      <Link href={w.href}>
                        {w.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* SCHEDULE + WHAT TO BRING */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal variant="fade-right">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Thanksgiving Week</p>
                <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">How the Tournament Runs</h2>
                <p className="text-neutral-600 mb-6">
                  Fixtures depend on how many teams sign up, so the full match schedule goes out on
                  Thursday morning, just before the first match.
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
                <p className="mt-4 flex items-start gap-2 text-xs text-neutral-500">
                  <Shield className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                  Full refund if you withdraw at least 24 hours before the start; 50% after that until the draw is made.
                </p>
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
                Indoor pitch, climate-controlled, free on-site parking. 15 minutes from Middletown, DE; 20 from Newark, DE; 30 from Wilmington.
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Tournament Contact</p>
                <a href={`tel:${EVENT.contactPhone}`} className="font-semibold text-neutral-900 hover:text-accent">
                  {EVENT.contactPhone}
                </a>
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
          <h2 className="font-display text-section text-white mb-4 text-balance">Spend Thanksgiving on the Pitch</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Name and email is all it takes. $20 per player at the desk. Teams of {T.minPlayers}–{T.maxPlayers},
            or sign up solo and join a mix-and-match team. Registration closes {EVENT.registerByLabel}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="xl" asChild className="bg-white text-accent hover:bg-neutral-50 shadow-lg">
              <Link href={T.registerHref}>
                Register Your Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-accent" asChild>
              <Link href={EVENT.soloHref}>Join as a Solo Player</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
