import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Repeat, Trophy, Ticket } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { splitEvents, type ClubEvent } from "@/content/events";
import { cn } from "@/lib/utils/cn";

// Re-render hourly so events move from Upcoming to Past on their own.
export const revalidate = 3600;

export const metadata: Metadata = generateSEOMetadata({
  title: "Events & Tournaments — Elkton, MD",
  description:
    "Upcoming tournaments, leagues, open play nights, open houses, and camps at LevelUP Sports in Elkton, MD: Smash Cup volleyball, LPCL cricket league, $5 Pickleball Tuesdays, and more.",
  path: "/events",
});

const KIND_STYLES: Record<ClubEvent["kind"], string> = {
  Tournament: "bg-warning/15 text-neutral-900",
  League: "bg-accent/15 text-accent-hover",
  "Open House": "bg-info/10 text-primary",
  Camp: "bg-secondary/20 text-accent-hover",
  "Open Play": "bg-primary/10 text-primary",
};

export default function EventsPage() {
  const { upcoming, recurring, past } = splitEvents();
  const [featured, ...rest] = upcoming;

  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
  ]);

  const listLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming events at LevelUP Sports & Athletics Club",
    itemListElement: upcoming.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: `${SITE_CONFIG.url}${e.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLD) }} />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-8 md:pb-10 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Events</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Tournaments · Leagues · Open Play · Camps
              </p>
              <h1 className="font-display text-page-title text-neutral-900 text-balance">
                What&apos;s On at LevelUP
              </h1>
              <p className="mt-3 text-neutral-600 max-w-xl">
                Every tournament, league night, open house, and camp we host in Elkton, MD — with
                registration links. Dates on this page are the source of truth.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right text-sm text-neutral-500">
              <p>
                Open play and academies run every week.{" "}
                <Link href="/schedule" className="text-accent hover:text-accent-hover font-medium">
                  See the weekly schedule &rarr;
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming */}
      <Section size="sm">
        <Container>
          <Reveal>
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
              <h2 className="font-display text-section text-neutral-900">Upcoming</h2>
            </div>
          </Reveal>

          {upcoming.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center text-neutral-500">
              Nothing on the calendar right now. Open play runs every week —{" "}
              <Link href="/schedule" className="text-accent hover:text-accent-hover font-medium">
                see the schedule &rarr;
              </Link>
            </div>
          ) : (
            <>
              {/* Featured — next event, flyer left, details right (5/7) */}
              <Reveal>
                <article className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center rounded-3xl bg-primary-dark text-white p-6 md:p-8 lg:p-10 overflow-hidden relative">
                  <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
                  <div className="lg:col-span-5 relative">
                    <Link href={featured.href} className="block group">
                      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 lg:rotate-[-1.5deg] group-hover:rotate-0 transition-transform duration-300">
                        <Image
                          src={featured.image}
                          alt={featured.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 90vw, 40vw"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="lg:col-span-7 relative">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-secondary mb-3">
                      Next up · {featured.kind} · {featured.sport}
                    </p>
                    <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.05] text-balance">
                      {featured.name}
                    </h3>
                    <p className="font-mono text-sm text-white/80 mt-3">{featured.dateLabel}</p>
                    <p className="text-white/80 mt-4 max-w-xl leading-relaxed">{featured.blurb}</p>
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      {featured.price && (
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-secondary" aria-hidden="true" />
                          <dt className="sr-only">Entry</dt>
                          <dd className="font-semibold">{featured.price}</dd>
                        </div>
                      )}
                      {featured.prize && (
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-warning" aria-hidden="true" />
                          <dt className="sr-only">Prizes</dt>
                          <dd className="font-semibold">{featured.prize}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button size="lg" asChild className="bg-secondary text-primary-dark hover:bg-secondary-light">
                        <Link href={featured.href}>
                          {featured.cta} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>

              {rest.length > 0 && (
                <StaggerContainer className="grid md:grid-cols-2 gap-5 mt-6">
                  {rest.map((e) => (
                    <StaggerItem key={e.slug}>
                      <EventCard event={e} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* Recurring */}
      {recurring.length > 0 && (
        <Section variant="alternate" size="sm">
          <Container>
            <Reveal>
              <div className="flex items-center gap-2 mb-6">
                <Repeat className="h-4 w-4 text-accent" aria-hidden="true" />
                <h2 className="font-display text-section text-neutral-900">Every Week</h2>
              </div>
            </Reveal>
            <StaggerContainer className="grid md:grid-cols-2 gap-5">
              {recurring.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard event={e} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <Section size="sm">
          <Container>
            <Reveal>
              <h2 className="font-display text-section text-neutral-900 mb-2">Past Events</h2>
              <p className="text-neutral-500 text-sm mb-6">
                Recaps, standings, and the pages that are still up.
              </p>
            </Reveal>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard event={e} past />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      )}

      <CTABanner
        title="Want to Host Your Own?"
        description="Corporate tournaments, club leagues, birthday parties, and private events — we have the courts, the staff, and the scoreboard."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Book a Session", href: BOOKING_URLS.offerings }}
      />
    </>
  );
}

function EventCard({ event: e, past = false }: { event: ClubEvent; past?: boolean }) {
  const href = past && e.pastHref ? e.pastHref : e.href;
  const cta = past ? e.pastCta ?? e.cta : e.cta;
  return (
    <article
      className={cn(
        "group flex h-full rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-shadow hover:shadow-lg",
        past && "border-neutral-100"
      )}
    >
      <Link href={href} className={cn("relative w-28 sm:w-36 shrink-0", past && "grayscale-[0.4]")}>
        <Image src={e.image} alt={e.imageAlt} fill sizes="144px" className="object-cover" />
      </Link>
      <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={cn("text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-0.5", KIND_STYLES[e.kind])}>
            {e.kind}
          </span>
          <span className="text-[11px] text-neutral-400">{e.sport}</span>
          {e.recurring && (
            <span className="text-[10px] font-bold uppercase tracking-wider rounded-md px-2 py-0.5 bg-neutral-100 text-neutral-600">
              {e.recurring}
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-neutral-900 leading-snug">
          <Link href={href} className="hover:text-accent transition-colors">
            {e.name}
          </Link>
        </h3>
        <p className="font-mono text-xs text-neutral-500 mt-1">{e.dateLabel}</p>
        {!past && <p className="text-sm text-neutral-600 mt-2 line-clamp-3">{e.blurb}</p>}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-neutral-900">{!past ? e.price ?? "" : ""}</span>
          <Link href={href} className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent-hover">
            {cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
