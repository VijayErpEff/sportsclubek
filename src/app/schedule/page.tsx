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
          <p className="hidden md:block mt-2 text-neutral-500 max-w-lg">
            Filter by sport, pick your day, and find the perfect session.
          </p>
          <a
            href="tel:(443) 406-6494"
            className="mt-3 flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-violet-400/50 bg-gradient-to-r from-violet-50 to-white hover:shadow-md transition-all group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500 text-white shrink-0 group-hover:bg-violet-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-violet-800">Courts &amp; Cages Available for Rental</p>
              <p className="text-xs text-neutral-500">All areas convertible — book any space on-demand for any sport</p>
            </div>
            <span className="text-sm font-bold text-violet-600 shrink-0 group-hover:underline">(443) 406-6494</span>
          </a>
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
