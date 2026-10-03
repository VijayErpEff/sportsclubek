import { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { PaidClient } from "./paid-client";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Payment received — Fall Smash Cup",
    description: "Your LevelUP Smash Cup team entry payment.",
    path: "/register/volleyball-tournament/paid",
  }),
  robots: { index: false, follow: false },
};

export default function PaidPage() {
  return (
    <Section className="pt-28 md:pt-32" size="lg">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<p className="text-neutral-500">Checking your payment…</p>}>
            <PaidClient />
          </Suspense>
        </div>
      </Container>
    </Section>
  );
}
