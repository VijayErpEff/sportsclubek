import { Metadata } from "next";
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
          <CourtStatusBoard />
        </Container>
      </section>
    </>
  );
}
