import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CTABanner } from "@/components/composed/cta-banner";
import { ScheduleCalendar } from "@/components/composed/schedule-calendar";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { BOOKING_URLS } from "@/lib/constants/booking";

export const metadata: Metadata = generateSEOMetadata({
  title: "Schedule & Book Sessions — Elkton, MD",
  description:
    "View the LevelUP Sports weekly schedule. Batting cages, court rentals, academy classes, and open play in Elkton, MD. Book your session online today.",
  path: "/schedule",
});

export default function SchedulePage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Schedule", url: "/schedule" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Compact header — minimal on mobile so schedule is visible immediately */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-2 md:mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Schedule</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                Weekly Schedule
              </h1>
              <p className="hidden md:block mt-2 text-neutral-500 max-w-lg">
                Filter by sport, pick your day, and find the perfect session.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={BOOKING_URLS.schedule}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                Book Events
              </a>
              <a
                href={BOOKING_URLS.memberships}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
              >
                Memberships
              </a>
              <a
                href={BOOKING_URLS.creditPasses}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
              >
                Credit Passes
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Calendar */}
      <div className="pb-20 md:pb-28">
        <Container>
          <Suspense><ScheduleCalendar /></Suspense>
        </Container>
      </div>

      <CTABanner
        title="Ready to Train?"
        description="Become a member for unlimited access, or book a single session to get started."
        primaryCTA={{ label: "Book a Session", href: BOOKING_URLS.schedule }}
        secondaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
      />
    </>
  );
}
