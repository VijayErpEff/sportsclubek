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
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Weekly Schedule
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
            <p className="hidden md:block text-neutral-500 max-w-lg">
              Filter by sport, pick your day, and find the perfect session.
            </p>
            <a
              href="tel:(443) 406-6494"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-violet-400/40 bg-violet-50/50 text-xs font-medium text-violet-700 hover:bg-violet-50 transition-colors shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Courts &amp; cages available for rental — call to book
            </a>
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
