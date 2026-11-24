import { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { TOURNAMENTS } from "@/lib/constants/tournaments";
import { PaidClient } from "@/components/tournament/paid-client";

const T = TOURNAMENTS["thanksgiving-cricket"];

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Payment received — Thanksgiving Cricket",
    description: "Your Thanksgiving Cricket tournament entry payment.",
    path: `${T.registerHref}/paid`,
  }),
  robots: { index: false, follow: false },
};

export default function ThanksgivingCricketPaidPage() {
  return (
    <Section className="pt-28 md:pt-32" size="lg">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<p className="text-neutral-500">Checking your payment…</p>}>
            <PaidClient tournament={T} />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
