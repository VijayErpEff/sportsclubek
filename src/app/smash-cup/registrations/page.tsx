import { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants/app";

export const metadata: Metadata = {
  title: "Smash Cup — Team Registrations",
  robots: { index: false, follow: false },
};

// Registrations, rosters, payments and check-in live in the LevelUP app's admin area now. This
// page is the staff bookmark that used to hold the PIN-protected list.
export default function SmashCupRegistrationsPage() {
  return (
    <Section className="pt-28 md:pt-32" size="lg">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">
            Staff Only · Fall 2026 Smash Cup
          </p>
          <h1 className="font-display text-page-title text-neutral-900">Team Registrations</h1>
          <p className="text-neutral-500 mt-2">
            Every team, roster, captain contact and payment is in the LevelUP app. Sign in with your
            staff account, open the tournament, and use &quot;Record payment&quot; for fees collected at
            the desk.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild><a href={`${APP.web}/admin/tournaments`}>Open tournaments in the app</a></Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
