import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { LOCATIONS } from "@/content/locations";
import { ArrowRight, Car, MapPin } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Cities We Serve — Indoor Sports Across MD & DE",
  description:
    "LevelUP Sports serves families across Cecil County, MD and New Castle County, DE. Find drive times, sports, and FAQs for Newark DE, Middletown DE, Glasgow DE, and North East MD.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Section className="pt-28 md:pt-36 pb-12">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li aria-current="page" className="text-neutral-600 font-medium">Locations</li>
            </ol>
          </nav>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-5 uppercase tracking-wider bg-accent/10 text-accent">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              Service Area
            </div>
            <h1 className="font-display text-page-title text-neutral-900 mb-4 text-balance max-w-3xl">
              Indoor sports for the MD / DE tri-state
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              One facility in Elkton, MD serving families across Cecil County and
              New Castle County. Find your nearest city below.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="pb-16 md:pb-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group block p-6 rounded-2xl bg-white border border-neutral-200 hover:border-accent hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-display text-card-title text-neutral-900 group-hover:text-primary transition-colors">
                    {loc.display}
                  </h2>
                  <ArrowRight
                    className="h-5 w-5 text-neutral-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                  <Car className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>
                    <strong>{loc.driveTime}</strong> · {loc.driveDistance}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {loc.hero.subhead}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
