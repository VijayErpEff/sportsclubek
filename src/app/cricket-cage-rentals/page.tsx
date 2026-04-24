import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateBreadcrumbLD,
  generateFAQLD,
  generateSportOfferLD,
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
  Clock,
  Users,
  Gauge,
  MapPin,
  Phone,
  Calendar,
  Target,
  Thermometer,
  Shield,
} from "lucide-react";

const PAGE_IMAGE = "/images/sports/LevelUp/05-Cricket-Nets.jpg";

export const metadata: Metadata = generateSEOMetadata({
  title: "Cricket Cage Rentals in Elkton, MD | Indoor Cricket Nets",
  description:
    "Rent indoor cricket nets at LevelUP Sports in Elkton, MD. Full-length nets, bowling machines, and hourly cage rentals near Newark, Middletown & Wilmington DE. Book online, open 7 days.",
  path: "/cricket-cage-rentals",
  ogImage: PAGE_IMAGE,
});

const FEATURES = [
  {
    icon: Gauge,
    title: "Bowling Machines",
    description:
      "Professional bowling machines dial from gentle to match pace. Work on line, length, and swing without a bowler.",
  },
  {
    icon: Thermometer,
    title: "Indoor All Year",
    description:
      "Climate-controlled nets. Practice through winter, monsoon-style rain, or summer heat — we stay open.",
  },
  {
    icon: Target,
    title: "Full-Length Nets",
    description:
      "Regulation-length cricket nets with proper run-ups. Batting practice, bowling drills, and middle-practice scenarios.",
  },
  {
    icon: Clock,
    title: "Hourly Rentals",
    description:
      "Book by the hour on Upper Hand. Instant confirmation — ideal for weekly practice or one-off sessions.",
  },
  {
    icon: Users,
    title: "Solo or Squad",
    description:
      "Great for solo batting reps, two-player batter/bowler sessions, or small club groups.",
  },
  {
    icon: Shield,
    title: "Gear Available",
    description:
      "Bring your own kit, or we can point you to equipment. Stumps, balls, and net space — ready to go.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "Reserve online",
    description:
      "Pick your net, date, and time slot on Upper Hand. Real-time availability, instant confirmation.",
  },
  {
    step: "Arrive and check in",
    description:
      "Show up 5–10 minutes early. Staff walks you to your net and sets up the bowling machine if requested.",
  },
  {
    step: "Train hard",
    description:
      "Use the full hour. Work batting, bowling, wicket-keeping, or middle-practice drills without weather delays.",
  },
  {
    step: "Rebook",
    description:
      "Lock in a weekly slot, or enroll in our Cricket Academy for structured coaching with certified trainers.",
  },
];

const PERFECT_FOR = [
  "Weekly practice for club and league cricketers",
  "Youth players prepping for tryouts and junior tournaments",
  "Coaches running structured net sessions with students",
  "Travel teams from Newark, Middletown, and Wilmington, DE",
  "Adult recreational cricketers staying sharp year-round",
  "First-time cricketers learning the basics in a focused space",
];

const FAQS = [
  {
    question: "How much does a cricket cage rental cost at LevelUP Sports?",
    answer:
      "Cricket nets rent by the hour. Current rates and real-time availability are on our Upper Hand booking page — check there for instant confirmation and any discounts for multi-session bookings.",
  },
  {
    question: "Where are the closest indoor cricket nets to Newark, DE?",
    answer:
      "LevelUP Sports is at 701 E Pulaski Hwy in Elkton, MD — about 20 minutes from Newark and 15 from Middletown, DE. Many of our regular cricket renters drive in from Newark, Middletown, Wilmington, Bear, and Glasgow, DE.",
  },
  {
    question: "Do you have bowling machines in the cricket nets?",
    answer:
      "Yes. Our cricket facility includes professional bowling machines. You can book a rental that includes machine time, or run traditional net sessions with a partner.",
  },
  {
    question: "Can I rent a cricket net for a group or team practice?",
    answer:
      "Yes. Club teams and travel squads regularly book our nets. For recurring team practices or longer multi-net sessions, call (443) 406-6494 and we can set up a standing booking.",
  },
  {
    question: "Do you offer cricket coaching with the net rental?",
    answer:
      "Yes. Pair your net time with a private session from our certified coaches, or enroll in the Cricket Academy for structured year-round development.",
  },
  {
    question: "What should I bring to a cricket net rental?",
    answer:
      "Bring your bat, pads, gloves, helmet, and appropriate shoes. We provide the nets, stumps, and bowling-machine access. If you need gear, call ahead — we can often help.",
  },
  {
    question: "Are your cricket nets full-length and regulation?",
    answer:
      "Yes. Our nets are full-length with proper run-ups, giving both batters and bowlers realistic match-style practice. The facility is 100% indoor and climate-controlled.",
  },
  {
    question: "How far in advance should I book a cricket net?",
    answer:
      "Weekend and evening slots book 5–7 days ahead, especially during peak cricket season. Weekday afternoons and late mornings are usually available same-day.",
  },
];

export default function CricketCageRentalsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Cricket Cage Rentals", url: "/cricket-cage-rentals" },
  ]);

  const faqLD = generateFAQLD(FAQS);

  const sportLD = generateSportOfferLD({
    name: "Cricket Cage Rentals",
    description:
      "Indoor cricket cage and net rentals in Elkton, MD. Full-length nets with bowling machines. Hourly rental for batting, bowling, and team practice.",
    slug: "cricket-cage-rentals",
  });

  const offerLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cricket Net Rental",
    name: "Indoor Cricket Cage Rental",
    description:
      "Hourly rental of indoor cricket nets with bowling machines. Full-length regulation nets for batting, bowling, and team practice.",
    provider: {
      "@type": "SportsActivityLocation",
      name: SITE_CONFIG.name,
      "@id": `${SITE_CONFIG.url}/#organization`,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.zip,
        addressCountry: SITE_CONFIG.address.country,
      },
    },
    areaServed: SITE_CONFIG.serviceAreas.map((a) => ({
      "@type": "City",
      name: a,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      url: `${SITE_CONFIG.url}/go/cricket-cage-rentals`,
      availability: "https://schema.org/InStock",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerLD) }}
      />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li>
                <Link href="/cricket" className="hover:text-primary transition-colors">
                  Cricket
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Cricket Cage Rentals</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Indoor &bull; Bowling Machines &bull; Open 7 Days
              </p>
              <h1 className="font-display text-page-title text-neutral-900 mb-4 text-balance">
                Cricket Cage Rentals in Elkton, MD
              </h1>
              <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
                Rent full-length indoor cricket nets by the hour at LevelUP Sports.
                Bowling machines available, climate-controlled year-round, and minutes
                from Newark &amp; Middletown, DE.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Button size="lg" asChild>
                  <a
                    href={BOOKING_URLS.cricketCageRentals}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Net Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>
                    <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                    Call {SITE_CONFIG.phone}
                  </a>
                </Button>
              </div>
              <p className="text-sm text-neutral-500">
                The closest indoor cricket practice facility to Newark, Middletown,
                Wilmington, and Bear, DE.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={PAGE_IMAGE}
                alt="Indoor cricket nets and batting cages at LevelUP Sports in Elkton, MD"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                What You Get With Your Cricket Net Rental
              </h2>
              <p className="text-neutral-500">
                Real nets, real machines, real practice. Indoor year-round.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* How It Works */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">
              How to Rent a Cricket Net
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="text-center p-6 rounded-2xl bg-white border border-neutral-100 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4 font-display text-xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">
                    {item.step}
                  </h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Perfect For */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-6 text-center">
                Who Rents Our Cricket Nets
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {PERFECT_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 text-accent shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Local SEO */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-4">
                The Closest Indoor Cricket Practice to Newark &amp; Wilmington, DE
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  LevelUP Sports is Maryland&rsquo;s premier indoor cricket facility,
                  serving cricketers across Cecil County, New Castle County, and Chester
                  County. Our full-length nets and bowling machines give club players,
                  travel teams, and junior cricketers a place to train through every
                  season.
                </p>
                <p>
                  Outdoor cricket grounds in MD and DE close for weather from
                  November through March. Our indoor facility stays open all year.
                  Regular renters come from Newark, Middletown, Wilmington, Bear,
                  Glasgow, and even Philadelphia and Kennett Square, PA.
                </p>
                <p>
                  Want structured coaching? Join our{" "}
                  <Link
                    href="/cricket-academy"
                    className="text-accent font-medium hover:underline"
                  >
                    Cricket Academy
                  </Link>{" "}
                  for year-round development with certified coaches. Or explore{" "}
                  <Link
                    href="/memberships"
                    className="text-accent font-medium hover:underline"
                  >
                    memberships
                  </Link>{" "}
                  for discounted net hours and priority booking. Also see our{" "}
                  <Link
                    href="/cricket"
                    className="text-accent font-medium hover:underline"
                  >
                    full cricket program
                  </Link>{" "}
                  page for leagues and tournaments.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-section text-neutral-900 mb-3">
                  Cricket Net Rental FAQs
                </h2>
                <p className="text-neutral-500">
                  Everything you need to know before you book a net.
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

      {/* Location + Contact */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Where to Find Us
              </h2>
              <p className="text-neutral-600 mb-2">{SITE_CONFIG.address.full}</p>
              <p className="text-neutral-500 text-sm mb-6">
                Hours: Mon&ndash;Sat {SITE_CONFIG.hours.weekday} &middot; Sun{" "}
                {SITE_CONFIG.hours.sunday}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild>
                  <a
                    href={BOOKING_URLS.cricketCageRentals}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                    Book Your Net
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href={SITE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Book Your Cricket Net Today"
        description="Full-length indoor nets, bowling machines, hourly rentals. Reserve online or call us now."
        primaryCTA={{ label: "Book Online", href: BOOKING_URLS.cricketCageRentals }}
        secondaryCTA={{
          label: `Call ${SITE_CONFIG.phone}`,
          href: `tel:${SITE_CONFIG.phone}`,
        }}
      />
    </>
  );
}
