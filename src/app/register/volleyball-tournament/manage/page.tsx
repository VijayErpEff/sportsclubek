import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/constants/site";

import { ManageClient } from "./manage-client";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Manage Your Fall Smash Cup Registration",
    description:
      "Your LevelUP Smash Cup team: manage the roster in the LevelUP app, or pay your team fee by card with your registration reference.",
    path: "/register/volleyball-tournament/manage",
  }),
  robots: { index: false, follow: false },
};

export default function ManagePage() {
  return (
    <>
      <Section className="pt-28 md:pt-32 pb-6 bg-gradient-to-b from-primary-dark to-primary text-white">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link
                  href="/events/volleyball-tournament"
                  className="hover:text-white transition-colors"
                >
                  Smash Cup
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Manage Registration</li>
            </ol>
          </nav>
          <Reveal>
            <h1 className="font-display text-hero leading-[1.05] mb-3 text-balance">
              Manage Your <span className="text-secondary">Registration</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Your roster, schedule and waivers live in the LevelUP app on your captain email. Chose
              to pay at the desk and want to pay by card instead? Use your reference below.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section size="lg">
        <Container className="max-w-3xl">
          <Suspense fallback={null}><ManageClient /></Suspense>
          <p className="text-center text-xs text-neutral-500 mt-10">
            Need a hand? Call{" "}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-accent font-semibold hover:text-accent-hover"
            >
              {SITE_CONFIG.phone}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-accent font-semibold hover:text-accent-hover"
            >
              {SITE_CONFIG.email}
            </a>{" "}
            and we&apos;ll verify and reset.
          </p>
        </Container>
      </Section>
    </>
  );
}
