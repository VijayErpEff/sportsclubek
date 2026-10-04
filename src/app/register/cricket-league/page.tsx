import { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/constants/site";
import { TOURNAMENTS } from "@/lib/constants/tournaments";
import { RegistrationForm } from "@/components/tournament/registration-form";

const T = TOURNAMENTS.lpcl;

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Register Your Team — LPCL Kick Off Cricket Tournament",
    description:
      "Register your team for the LevelUP Premier Cricket League Kick Off — Friday, November 6, 2026 in Elkton, MD. Indoor cricket, trophies, $1,000 and $500 cash prizes.",
    path: T.registerHref,
  }),
  // Registration funnel — keep crawl budget on the marketing page.
  robots: { index: false, follow: true },
};

export default function CricketLeagueRegisterPage() {
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
                <Link href={T.eventHref} className="hover:text-white transition-colors">
                  LPCL Kick Off
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Register</li>
            </ol>
          </nav>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-3 py-1.5 rounded-full mb-5 border border-white/15">
              <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
              LevelUP Premier Cricket League · {T.dateLabel}
            </p>
            <h1 className="font-display text-hero leading-[1.05] mb-3 text-balance">
              Register Your <span className="text-secondary">Team</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Indoor cricket under the lights, Friday, November 6 from 5 PM. $850 per team. Lock your spot with
              as few as {T.minPlayers} players, then build your squad to {T.maxPlayers} anytime
              before kick off.
            </p>
            <p className="text-sm text-white/60 mt-4">
              Already registered?{" "}
              <Link
                href={`${T.registerHref}/manage`}
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                Manage your registration →
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section size="lg">
        <Container className="max-w-3xl">
          <RegistrationForm tournament={T} />
          <p className="text-center text-xs text-neutral-500 mt-10">
            Questions? Call{" "}
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
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
