import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CTABanner } from "@/components/composed/cta-banner";
import { ScheduleCalendar } from "@/components/composed/schedule-calendar";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { Phone, Clock } from "lucide-react";

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

      {/* Hero — Compact, utilitarian */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-8">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Schedule</li>
            </ol>
          </nav>
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="font-display text-page-title text-neutral-900 mb-3 text-balance">
                  Weekly Schedule
                </h1>
                <p className="text-body-lg text-neutral-500 max-w-lg">
                  Filter by sport, pick your day, and find the perfect session.
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-neutral-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    Mon–Fri 6AM–10PM &bull; Sat 7AM–9PM &bull; Sun 8AM–8PM
                  </span>
                </div>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium"
                >
                  <Phone className="h-4 w-4" />
                  Call to Book
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Schedule Calendar */}
      <div className="pb-20 md:pb-28">
        <Container>
          <ScheduleCalendar />
        </Container>
      </div>

      <CTABanner
        title="Ready to Train?"
        description="Become a member for unlimited access, or book a single session to get started."
        primaryCTA={{ label: "View Memberships", href: "/memberships" }}
        secondaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
      />
    </>
  );
}
