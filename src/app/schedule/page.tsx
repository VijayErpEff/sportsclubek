import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ScheduleCalendar } from "@/components/composed/schedule-calendar";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { CalendarDays, Clock, Phone } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Schedule & Booking",
  description:
    "View the LevelUP Sports weekly schedule. Batting cages, court rentals, academy classes, and open play times in Elkton, MD. Book your session today.",
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

      {/* Slim Blue Header Bar */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light pt-[76px] pb-4">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-white/70" />
              <h1 className="font-display text-xl font-bold text-white">
                Weekly Schedule
              </h1>
              <nav aria-label="Breadcrumb" className="hidden sm:flex text-xs text-white/40 gap-1.5 ml-2">
                <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                <span>/</span>
                <span aria-current="page" className="text-white/60">Schedule</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>Mon–Fri 6AM–10PM</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>7 Days/Week</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Schedule Calendar — immediately visible, no scroll needed */}
      <div className="bg-neutral-50 py-5">
        <Container>
          <ScheduleCalendar />
        </Container>
      </div>
    </>
  );
}
