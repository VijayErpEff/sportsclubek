import { Metadata } from "next";
import { Suspense } from "react";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
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
      <Suspense fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="animate-pulse text-neutral-300 text-lg font-medium">Loading&hellip;</div>
        </div>
      }>
        <CourtStatusBoard />
      </Suspense>
    </>
  );
}
