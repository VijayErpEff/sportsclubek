import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/composed/hero";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Open House Event",
  description:
    "Visit LevelUP Sports for our Open House event. Tour the facility, meet coaches, try a free session. No commitment required.",
  path: "/open-house",
});

export default function OpenHousePage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Open House", url: "/open-house" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Hero
        title="Open House — Tour Our Sports Facility"
        subtitle="Join us for our next Open House. Tour the facility, meet the coaches, and try a free session."
      />

      {/* Breadcrumb Navigation */}
      <Section className="py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">Open House</li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Event Details */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal variant="fade-right">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance">Event Details</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our Open House is your chance to experience everything LevelUP Sports has to
                offer — completely free and with no commitment. Bring the whole family, explore
                our facility, and see firsthand why athletes of all ages choose to train here.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg font-bold text-primary">D</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Date & Time</h3>
                    <p className="text-muted-foreground">
                      Saturday, April 18, 2026 — 10:00 AM to 3:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg font-bold text-primary">L</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-muted-foreground">
                      LevelUP Sports, Elkton, MD
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-lg font-bold text-primary">C</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Cost</h3>
                    <p className="text-muted-foreground">
                      Completely free. No registration fee, no commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>

            <Reveal variant="fade-left" delay={0.15}>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance">What to Expect</h2>
              <div className="space-y-4">
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                  <h3 className="font-bold mb-2">Facility Tour</h3>
                  <p className="text-sm text-muted-foreground">
                    Walk through our batting cages, badminton courts, cricket nets, and
                    training areas. See the equipment, the space, and the environment your
                    athlete will train in.
                  </p>
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                  <h3 className="font-bold mb-2">Meet the Coaches</h3>
                  <p className="text-sm text-muted-foreground">
                    Talk directly with our coaching staff. Learn about their backgrounds, ask
                    about their training philosophy, and find the right program for your goals.
                  </p>
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                  <h3 className="font-bold mb-2">Free Try-Out Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Step into the cages, hit the courts, or join a mini training session. Try
                    before you commit — we want you to feel confident in your decision.
                  </p>
                </div>
                <div className="rounded-xl border bg-background p-6 shadow-sm">
                  <h3 className="font-bold mb-2">Exclusive Open House Discounts</h3>
                  <p className="text-sm text-muted-foreground">
                    Attendees receive special pricing on academy enrollment and memberships.
                    These discounts are only available during the event.
                  </p>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Who Should Attend */}
      <Section className="bg-muted/50">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-10 text-center text-balance">
              Who Should Attend?
            </h2>
          </Reveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm text-center">
                <h3 className="font-bold mb-2">Parents</h3>
                <p className="text-sm text-muted-foreground">
                  See where your child will train and meet the people who will coach them.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm text-center">
                <h3 className="font-bold mb-2">Young Athletes</h3>
                <p className="text-sm text-muted-foreground">
                  Try out the equipment, meet other players, and find a sport you love.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm text-center">
                <h3 className="font-bold mb-2">Adult Players</h3>
                <p className="text-sm text-muted-foreground">
                  Check out our adult programs, open play sessions, and league opportunities.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm text-center">
                <h3 className="font-bold mb-2">Anyone Curious</h3>
                <p className="text-sm text-muted-foreground">
                  Never played before? No problem. This is the perfect low-pressure introduction.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Registration CTA */}
      <CTABanner
        title="Reserve Your Spot"
        description="Registration is free but helps us prepare for the event. Let us know you're coming so we can make your visit great."
        primaryCTA={{ label: "Register for the Open House", href: "/contact" }}
        secondaryCTA={{ label: "Ask a Question", href: "/contact" }}
      />
    </>
  );
}
