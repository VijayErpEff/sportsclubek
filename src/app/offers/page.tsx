import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CalendarDays, Clock, MapPin, Phone, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "$5 Pickleball Tuesdays — Open Play in Elkton, MD",
  description:
    "$5 Pickleball Tuesdays at LevelUP Sports in Elkton, MD: indoor pickleball open play every Tuesday, 5–10 PM, just $5 per person. Bring your friends — everyone is welcome.",
  path: "/offers",
});

// ── The one promotion running right now ─────────────────────────
const PROMO = {
  name: "$5 Pickleball Tuesdays",
  price: "$5",
  priceNote: "per person",
  day: "Every Tuesday",
  hours: "5:00 – 10:00 PM",
  flyer: "/images/offers/pickleball-tuesdays.jpg",
  fineprint:
    "$5 per person, per Tuesday open-play visit. Walk-ins welcome; paddles and balls provided. Cannot be combined with other offers. Valid at the LevelUP Sports Elkton location only.",
};

const DETAILS = [
  {
    icon: CalendarDays,
    label: "When",
    value: "Every Tuesday",
    sub: "Weekly — no sign-up window, just show up",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "5:00 – 10:00 PM",
    sub: "Come for an hour or stay the whole evening",
  },
  {
    icon: Users,
    label: "Who",
    value: "Everyone is welcome",
    sub: "Beginners, regulars, families, groups of friends",
  },
  {
    icon: MapPin,
    label: "Where",
    value: "LevelUP Sports & Athletics Club",
    sub: `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, MD 21921`,
  },
];

const WHAT_TO_EXPECT = [
  "Indoor, climate-controlled pickleball courts — no wind, no rain, no heat",
  "Round-robin open play, so you rotate in with players at your level",
  "Paddles and balls provided if you don't have your own",
  "50+ regulars who started as beginners and are happy you showed up",
];

export default function OffersPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Offers", url: "/offers" },
  ]);

  // Recurring weekly event schema — no hard dates to go stale.
  const eventLD = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${PROMO.name} — ${SITE_CONFIG.shortName}`,
    description:
      "Indoor pickleball open play every Tuesday from 5 to 10 PM at LevelUP Sports & Athletics Club in Elkton, MD. $5 per person. Everyone is welcome.",
    sport: "Pickleball",
    url: `${SITE_CONFIG.url}/offers`,
    image: [`${SITE_CONFIG.url}${PROMO.flyer}`],
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    eventSchedule: {
      "@type": "Schedule",
      byDay: "https://schema.org/Tuesday",
      startTime: "17:00",
      endTime: "22:00",
      repeatFrequency: "P1W",
      scheduleTimezone: "America/New_York",
    },
    location: {
      "@type": "SportsActivityLocation",
      name: SITE_CONFIG.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: "MD",
        postalCode: "21921",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
    },
    offers: {
      "@type": "Offer",
      price: "5",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/offers`,
    },
  };

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

      {/* Hero — offer copy left, flyer right (5/7 split, flyer overlaps the section edge) */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Offers</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  Current Offer · Pickleball Open Play
                </p>
                <h1 className="font-display text-hero text-neutral-900 text-balance leading-[1.05]">
                  $5 Pickleball Tuesdays
                </h1>
                <p className="mt-5 text-lg text-neutral-600 max-w-xl leading-relaxed">
                  Indoor open play every Tuesday from 5 to 10 PM &mdash; just $5 per
                  person. Bring your friends. Everyone is welcome.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="font-mono text-6xl md:text-7xl font-bold text-accent leading-none">
                      {PROMO.price}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">{PROMO.priceNote}</p>
                  </div>
                  <div className="pb-1 border-l-2 border-neutral-200 pl-6">
                    <p className="font-display text-xl font-bold text-neutral-900">
                      {PROMO.day}
                    </p>
                    <p className="font-mono text-neutral-600">{PROMO.hours}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href={BOOKING_URLS.pickleballOpenPlay}>
                      Book Tuesday Open Play
                      <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={`tel:${SITE_CONFIG.phone}`}>
                      <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                      Call {SITE_CONFIG.phone}
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-neutral-500">
                  No membership needed. Walk-ins welcome &mdash; or reserve your spot in the
                  LevelUP app.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:-mr-8 xl:-mr-16">
              <Reveal variant="fade-left" delay={0.15}>
                <div className="relative mx-auto max-w-md lg:max-w-none lg:rotate-[1.5deg]">
                  <Image
                    src={PROMO.flyer}
                    alt="$5 Pickleball Tuesdays flyer — pickleball open play every Tuesday 5 to 10 PM, $5 per person, at LevelUP Sports & Athletics Club, 701 E Pulaski Hwy, Elkton, MD"
                    width={1000}
                    height={1000}
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="rounded-2xl shadow-card-elevated ring-1 ring-neutral-200"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Details */}
      <Section variant="alternate" size="sm">
        <Container>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DETAILS.map((item) => (
              <StaggerItem key={item.label}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 text-accent">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                      {item.label}
                    </p>
                  </div>
                  <p className="font-display text-base font-bold text-neutral-900">
                    {item.value}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">{item.sub}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* What to expect + fine print */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-section text-neutral-900 mb-5">
                  What to expect on a Tuesday
                </h2>
                <ul className="space-y-3">
                  {WHAT_TO_EXPECT.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-neutral-700 leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-neutral-600">
                  New to the game?{" "}
                  <Link
                    href="/pickleball"
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    See our pickleball program &rarr;
                  </Link>
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l border-neutral-100">
              <Reveal delay={0.1}>
                <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                  Offer terms
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">{PROMO.fineprint}</p>
                <p className="text-sm text-neutral-500 leading-relaxed mt-3">
                  Offers are subject to availability and may be withdrawn at any time.
                  Questions? Email{" "}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-accent hover:text-accent-hover font-medium"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CTABanner
        title="See You Tuesday"
        description="Grab a paddle, bring a friend, and play indoors for $5. Reserve in the LevelUP app or just walk in."
        primaryCTA={{ label: "Book Tuesday Open Play", href: BOOKING_URLS.pickleballOpenPlay }}
        secondaryCTA={{ label: "View Memberships", href: "/memberships" }}
      />
    </>
  );
}
