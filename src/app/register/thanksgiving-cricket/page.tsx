import { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG } from "@/lib/constants/site";
import { TOURNAMENTS } from "@/lib/constants/tournaments";
import { QuickSignupForm } from "@/components/tournament/quick-signup-form";

const T = TOURNAMENTS["thanksgiving-cricket"];

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Sign Up — Thanksgiving Cricket Tournament",
    description:
      "Sign up for the LevelUP Thanksgiving Indoor Cricket Tournament, Nov 26–27, 2026 in Elkton, MD. Just your name and email. $20 per player, pay at the desk.",
    path: T.registerHref,
  }),
  // Registration funnel — keep crawl budget on the marketing page.
  robots: { index: false, follow: true },
};

export default function ThanksgivingCricketRegisterPage() {
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
                  Thanksgiving Cricket
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">Register</li>
            </ol>
          </nav>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 px-3 py-1.5 rounded-full mb-5 border border-white/15">
              <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-sm" aria-hidden="true" />
              Thanksgiving Indoor Cricket · {T.dateLabel}
            </p>
            <h1 className="font-display text-hero leading-[1.05] mb-3 text-balance">
              Team or Solo, <span className="text-secondary">You&apos;re In</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Just your name and email. Round robin on Thursday, November 26, finals on Friday.
              $20 per player, paid at the desk. No team? Sign up solo and we&apos;ll place you on one.
            </p>
            <p className="text-sm text-white/60 mt-4">
              Registered a full team in the app already?{" "}
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
        <Container className="max-w-xl">
          <QuickSignupForm tournament={T} endpoint={`${T.apiBase}/signup`} />
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
