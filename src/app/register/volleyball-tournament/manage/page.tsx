import { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/constants/site";

import { ManageClient } from "./manage-client";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Manage Your Smash Cup Registration",
    description:
      "Edit your LevelUP Smash Cup volleyball tournament registration — update team name, captain info, or roster. Captain email + 4-digit PIN required.",
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
              Sign in with your captain email + 4-digit PIN to update your team name, roster, or
              captain info before the tournament.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section size="lg">
        <Container className="max-w-3xl">
          <ManageClient />
          <p className="text-center text-xs text-neutral-500 mt-10">
            Forgot your PIN? Call{" "}
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
