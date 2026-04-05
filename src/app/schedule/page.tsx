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
      <section className="pt-20 pb-2 md:pt-32 md:pb-8">
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
          <h1 className="font-display text-xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Weekly Schedule
          </h1>
          <p className="hidden md:block mt-2 text-neutral-500 max-w-lg">
            Filter by sport, pick your day, and find the perfect session.
          </p>
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
        primaryCTA={{ label: "View Memberships", href: BOOKING_URLS.memberships }}
        secondaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
      />
    </>
  );
}
