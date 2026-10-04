import { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/constants/site";

import { RegistrationForm } from "@/components/tournament/registration-form";
import { TOURNAMENTS } from "@/lib/constants/tournaments";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Register Your Team — Fall Smash Cup Volleyball Tournament",
    description:
      "Register your team for the LevelUP Smash Cup indoor 6v6 volleyball tournament — Saturday, October 24, 2026 in Elkton, MD. Co-ed, ages 16+, up to 8 players, $250 per team.",
    path: "/register/volleyball-tournament",
  }),
  // Registration funnel — keep crawl budget on the marketing page.
  robots: { index: false, follow: true },
};

export default function VolleyballRegisterPage() {
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
              <li className="text-white font-medium">Register</li>
            </ol>
          </nav>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-3 py-1.5 rounded-full mb-5 border border-white/15">
              <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
              LevelUP Smash Cup · Sat, Oct 24, 2026
            </p>
            <h1 className="font-display text-hero leading-[1.05] mb-3 text-balance">
              Register Your <span className="text-secondary">Team</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              6v6 indoor volleyball, $250 per team. Co-ed, ages 16+. Lock your
              spot with as few as 4 players, then build your roster up to 8
              anytime before the tournament.
            </p>
            <p className="text-sm text-white/60 mt-4">
              Already registered?{" "}
              <Link
                href="/register/volleyball-tournament/manage"
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
          <RegistrationForm tournament={TOURNAMENTS["smash-cup"]} />
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
