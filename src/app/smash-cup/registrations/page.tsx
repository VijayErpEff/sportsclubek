import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { RegistrationsBoard } from "./registrations-board";

export const metadata: Metadata = {
  title: "Smash Cup — Team Registrations",
  robots: { index: false, follow: false },
};

export default function SmashCupRegistrationsPage() {
  return (
    <Section className="pt-28 md:pt-32" size="lg">
      <Container>
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">
            Staff Only · Fall 2026 Smash Cup
          </p>
          <h1 className="font-display text-page-title text-neutral-900">
            Team Registrations
          </h1>
          <p className="text-neutral-500 mt-2 max-w-2xl">
            Every team registered for the October 24 volleyball tournament, with rosters,
            captain contact info, and payment status. Export to CSV for check-in sheets.
          </p>
        </div>
        <RegistrationsBoard />
      </Container>
    </Section>
  );
}
