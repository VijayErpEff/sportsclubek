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
  Shield,
  MapPin,
  Phone,
  Calendar,
  Target,
  HardHat,
  Thermometer,
} from "lucide-react";

const PAGE_IMAGE = "/images/sports/LevelUp/Baseball Training Area.jpg";

export const metadata: Metadata = generateSEOMetadata({
  title: "Batting Cage Rentals in Elkton, MD | Hourly Cage Rental",
  description:
    "Book an indoor batting cage rental at LevelUP Sports in Elkton, MD. 4 professional cages with pitching machines 30-90 MPH. Near Newark, Middletown & Wilmington DE. Hourly rentals, open 7 days.",
  path: "/batting-cage-rentals",
  ogImage: PAGE_IMAGE,
});

const FEATURES = [
  {
    icon: Gauge,
    title: "Machines 30–90 MPH",
    description:
      "Four cages with adjustable pitching machines. Dial the speed to match any age or skill level.",
  },
  {
    icon: Thermometer,
    title: "100% Indoor",
    description:
      "Climate-controlled. Rain, heat, or winter — your rental never gets cancelled for weather.",
  },
  {
    icon: HardHat,
    title: "Helmets & Gear Included",
    description:
      "We provide helmets. Bring your own bat, or rent one at the front desk.",
  },
  {
    icon: Clock,
    title: "Hourly Rentals",
    description:
      "Book by the hour. Reserve online through Upper Hand — instant confirmation.",
  },
  {
    icon: Users,
    title: "Up to 4 Per Cage",
    description:
      "Great for solo training, parent-and-child reps, or a small group taking swings together.",
  },
  {
    icon: Target,
    title: "Baseball & Softball",
    description:
      "Machines throw both hardball and softball. Perfect for youth leagues, travel teams, and adult rec.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "Book online",
    description:
      "Pick your cage, date, and time slot on Upper Hand. Instant confirmation — no waiting on a call-back.",
  },
  {
    step: "Show up",
    description:
      "Arrive 5 minutes early. Check in at the front desk, grab a helmet, and we'll walk you to your cage.",
  },
  {
    step: "Swing away",
    description:
      "Our staff sets the machine to your speed. Take your reps. Focus on your cuts without a line behind you.",
  },
  {
    step: "Level up",
    description:
      "Rent again, or ask about private hitting lessons and our Baseball Academy for structured progression.",
  },
];

const PERFECT_FOR = [
  "Youth players prepping for tryouts and travel-team selections",
  "High school and college athletes staying sharp in the off-season",
  "Parents wanting focused one-on-one reps with their kid",
  "Travel teams booking a group cage session",
  "Adult rec league players fixing their swing",
  "First-timers exploring baseball or softball",
];

const FAQS = [
  {
    question: "How much does a batting cage rental cost at LevelUP Sports?",
    answer:
      "Our batting cages rent by the hour. Current pricing is posted on our Upper Hand booking page — book online for real-time availability and instant confirmation.",
  },
  {
    question: "Do you rent batting cages near Newark, DE?",
    answer:
      "Yes. LevelUP Sports is at 701 E Pulaski Hwy in Elkton, MD — roughly 20 minutes from Newark, DE and 15 minutes from Middletown, DE. Many of our regular batting cage renters come from Newark, Middletown, Wilmington, and Bear, DE.",
  },
  {
    question: "What speed can your pitching machines throw?",
    answer:
      "Our four batting cages have machines that throw from 30 MPH (for first-timers and younger kids) all the way up to 90 MPH. Staff will set the machine to match your level when you arrive.",
  },
  {
    question: "Can I rent a batting cage for a group or party?",
    answer:
      "Yes. Cages fit up to four rotating batters comfortably. For larger groups and birthday parties, check our birthday party packages which bundle cages, courts, and food.",
  },
  {
    question: "Is softball available in the batting cages?",
    answer:
      "Yes. Our machines throw both baseball and softball. Just let front-desk staff know your preference when you check in.",
  },
  {
    question: "Do I need to bring my own bat and helmet?",
    answer:
      "We provide helmets for every renter. Bats are available to rent at the front desk, or you can bring your own.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "Peak times (weekday evenings 5–8 PM and weekend mornings) book up 3–5 days ahead. Off-peak weekday afternoons are usually available same-day.",
  },
  {
    question: "Do you offer batting lessons with the cage rental?",
    answer:
      "Yes. We have private hitting lessons and a full Baseball Academy with certified coaches. Call (443) 406-6494 to pair a cage rental with coaching.",
  },
];

export default function BattingCageRentalsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Batting Cage Rentals", url: "/batting-cage-rentals" },
  ]);

  const faqLD = generateFAQLD(FAQS);

  const sportLD = generateSportOfferLD({
    name: "Batting Cage Rentals",
    description:
      "Indoor batting cage rentals in Elkton, MD. Four professional cages with pitching machines 30–90 MPH for baseball and softball. Hourly rental with helmets included.",
    slug: "batting-cage-rentals",
  });

  const offerLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Batting Cage Rental",
    name: "Indoor Batting Cage Rental",
    description:
      "Hourly rental of indoor batting cages with pitching machines up to 90 MPH. Baseball and softball. Helmets provided.",
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
      url: `${SITE_CONFIG.url}/go/offerings`,
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
                <Link href="/baseball" className="hover:text-primary transition-colors">
                  Baseball
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Batting Cage Rentals</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Indoor &bull; 30–90 MPH &bull; Open 7 Days
              </p>
              <h1 className="font-display text-page-title text-neutral-900 mb-4 text-balance">
                Batting Cage Rentals in Elkton, MD
              </h1>
              <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
                Rent an indoor batting cage by the hour at LevelUP Sports &mdash; four pro
                cages, pitching machines 30 to 90 MPH, helmets included. Baseball and
                softball welcome.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Button size="lg" asChild>
                  <a
                    href={BOOKING_URLS.offerings}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Cage Now
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
                Serving Elkton, MD and nearby Newark, Middletown, Wilmington, and Bear,
                DE. 20 min from Newark &middot; 30 min from Wilmington.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={PAGE_IMAGE}
                alt="Indoor batting cages at LevelUP Sports in Elkton, MD with pitching machines for baseball and softball"
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
                What You Get With Your Cage Rental
              </h2>
              <p className="text-neutral-500">
                Purpose-built indoor cages. Real equipment. Zero excuses to miss a session.
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
              How to Rent a Batting Cage
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
                Who Rents Our Batting Cages
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
                The Closest Indoor Batting Cages to Newark &amp; Middletown, DE
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  LevelUP Sports &amp; Athletics Club is the go-to indoor batting cage
                  rental for families and players across Cecil County, MD and New Castle
                  County, DE. Our facility at 701 E Pulaski Hwy in Elkton sits minutes
                  from I-95 &mdash; roughly 20 minutes from Newark, 15 from Middletown,
                  and 30 from Wilmington.
                </p>
                <p>
                  Unlike outdoor cages that close for rain, snow, or heat, our four
                  climate-controlled cages are available year-round. Pitching machines
                  dial from 30 MPH (great for first-time hitters and Little League) all
                  the way to 90 MPH (high school and college prep). Helmets are provided.
                  Bring your own bat, or rent one at the front desk.
                </p>
                <p>
                  Looking for more than a one-off session? Pair your cage rental with{" "}
                  <Link
                    href="/baseball-academy"
                    className="text-accent font-medium hover:underline"
                  >
                    our Baseball Academy
                  </Link>{" "}
                  for structured coaching, or check our{" "}
                  <Link
                    href="/memberships"
                    className="text-accent font-medium hover:underline"
                  >
                    memberships
                  </Link>{" "}
                  for discounted cage hours. Need a space for a kid&rsquo;s{" "}
                  <Link
                    href="/birthday-parties"
                    className="text-accent font-medium hover:underline"
                  >
                    birthday party
                  </Link>
                  ? Our party packages combine cages, courts, and food.
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
                  Batting Cage Rental FAQs
                </h2>
                <p className="text-neutral-500">
                  Everything you need to know before you book a cage.
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
                    href={BOOKING_URLS.offerings}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                    Book Your Cage
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
        title="Book Your Cage Today"
        description="Four cages, hourly rentals, open 7 days. Instant confirmation online or give us a call."
        primaryCTA={{ label: "Book Online", href: BOOKING_URLS.offerings }}
        secondaryCTA={{
          label: `Call ${SITE_CONFIG.phone}`,
          href: `tel:${SITE_CONFIG.phone}`,
        }}
      />
    </>
  );
}
