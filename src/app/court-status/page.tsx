import { Metadata } from "next";
import { Suspense } from "react";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Container } from "@/components/layout/container";
import { CourtStatusBoard } from "./court-status-board";

export const metadata: Metadata = generateSEOMetadata({
  title: "Live Court Status",
  description:
    "Check real-time court and cage availability at LevelUP Sports in Elkton, MD. See which courts are open for pickleball, badminton, box cricket, volleyball, and batting cages.",
  path: "/court-status",
});

export default function CourtStatusPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Court Status", url: "/court-status" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <section className="pt-20 pb-6 md:pt-24 md:pb-8">
        <Container>
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-neutral-100 rounded-lg" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-neutral-100 rounded-xl" />)}
              </div>
              <div className="h-40 bg-neutral-100 rounded-xl" />
            </div>
          }>
            <CourtStatusBoard />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
