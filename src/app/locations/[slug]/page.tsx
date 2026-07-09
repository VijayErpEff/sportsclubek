import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { MapEmbed } from "@/components/composed/map-embed";
import { TrackEvent } from "@/components/ui/track-event";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateFAQLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG, SPORT_NAV_ITEMS } from "@/lib/constants/site";
import { LOCATIONS, getLocation, type LocationData } from "@/content/locations";
import { ArrowRight, Car, Check, MapPin } from "lucide-react";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return generateSEOMetadata({
    title: loc.meta.title,
    description: loc.meta.description,
    path: `/locations/${loc.slug}`,
  });
}

function generateLocationServiceLD(loc: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: `${SITE_CONFIG.name} — Serving ${loc.display}`,
    description: loc.meta.description,
    url: `${SITE_CONFIG.url}/locations/${loc.slug}`,
    telephone: SITE_CONFIG.phone,
    image: `${SITE_CONFIG.url}/images/sports/facility.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    parentOrganization: { "@id": `${SITE_CONFIG.url}/#organization` },
    areaServed: [
      { "@type": "City", name: loc.display },
      ...loc.nearby.map((n) => ({ "@type": "City" as const, name: n })),
      ...loc.zips.map((z) => ({ "@type": "PostalCodeSpecification" as const, postalCode: z })),
    ],
    priceRange: "$$",
  };
}

export default async function LocationPage({ params }: PageParams) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: loc.display, url: `/locations/${loc.slug}` },
  ]);
  const faqLD = generateFAQLD(loc.faqs.map((f) => ({ question: f.q, answer: f.a })));
  const serviceLD = generateLocationServiceLD(loc);

  const sportsForCity = SPORT_NAV_ITEMS.filter((s) =>
    loc.sports.some((sl) => s.href === `/${sl}`)
  );

  return (
    <>
      <TrackEvent
        action="location_page_view"
        params={{ location: loc.slug, city: loc.city }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLD) }} />

      {/* Header */}
      <Section className="pt-28 md:pt-36 pb-10 md:pb-12">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-neutral-300">/</li>
              <li><Link href="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
              <li className="text-neutral-300">/</li>
              <li aria-current="page" className="text-neutral-600 font-medium">{loc.display}</li>
            </ol>
          </nav>

          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-5 uppercase tracking-wider bg-accent/10 text-accent">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {loc.hero.eyebrow}
            </div>
            <h1 className="font-display text-page-title text-neutral-900 mb-4 text-balance max-w-3xl">
              {loc.hero.headline}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed mb-6">
              {loc.hero.subhead}
            </p>

            {/* Drive info chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 text-sm mb-8">
              <Car className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <strong>{loc.driveTime}</strong> · {loc.driveDistance} from {loc.city} ·{" "}
                <span className="text-neutral-500">Free parking on-site</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/schedule">Book a Court</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${SITE_CONFIG.phone}`}>Call {SITE_CONFIG.phone}</a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why locals choose us */}
      <Section className="py-12 md:py-16 bg-neutral-50">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
              Why {loc.city} families choose LevelUP
            </h2>
            <p className="text-neutral-600 max-w-2xl mb-10">
              Built for the {loc.display} community. Real schedules, real coaching,
              real value.
            </p>
          </Reveal>
          <StaggerContainer>
            <div className="grid md:grid-cols-2 gap-5">
              {loc.whyHere.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200 h-full">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-card-title text-neutral-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-neutral-600 leading-relaxed pl-9">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Sports for this city */}
      <Section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
              Most popular with {loc.city} athletes
            </h2>
            <p className="text-neutral-600 max-w-2xl mb-10">
              The sports {loc.display} members book most. Tap any to learn more or jump
              straight to booking.
            </p>
          </Reveal>
          <StaggerContainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sportsForCity.map((sport) => (
                <StaggerItem key={sport.href}>
                  <Link
                    href={sport.href}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-neutral-200 hover:border-accent hover:shadow-md transition-all min-h-[88px]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl" aria-hidden="true">{sport.emoji}</span>
                      <div>
                        <p className="font-display font-semibold text-neutral-900">
                          {sport.name}
                        </p>
                        <p className="text-xs text-neutral-500">{sport.desc}</p>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-5 w-5 text-neutral-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                      aria-hidden="true"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Map + directions */}
      <Section className="py-12 md:py-16 bg-neutral-50">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-3 text-balance">
              Getting here from {loc.city}
            </h2>
            <p className="text-neutral-600 max-w-2xl mb-8">
              {SITE_CONFIG.address.full} · {loc.driveDistance} from {loc.display} ·{" "}
              {loc.driveTime} typical drive time.
            </p>
          </Reveal>
          <MapEmbed source={`location_${loc.slug}`} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-8 text-balance">
              {loc.city} FAQs
            </h2>
          </Reveal>
          <FAQAccordion
            items={loc.faqs.map((f) => ({ question: f.q, answer: f.a }))}
          />
        </Container>
      </Section>

      <CTABanner
        title={`Ready when you are, ${loc.city}`}
        description={`Book a court, a cage, or an academy session. ${loc.driveTime} away — open 7 days a week.`}
        primaryCTA={{ label: "Book a Court", href: "/schedule" }}
        secondaryCTA={{ label: "Explore Academies", href: "/kids-agility" }}
      />
    </>
  );
}
