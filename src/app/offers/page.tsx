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
import { BOOKING_URLS } from "@/lib/constants/booking";

export const metadata: Metadata = generateSEOMetadata({
  title: "Current Offers & Promotions",
  description:
    "Special deals and promotions at LevelUP Sports Elkton. First-time discounts, seasonal offers, and membership specials.",
  path: "/offers",
});

export default function OffersPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Offers", url: "/offers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Hero
        title="Current Offers & Deals"
        subtitle="Take advantage of our current promotions and special offers."
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
              <li aria-current="page" className="text-neutral-900 font-medium">Offers</li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Offer Cards */}
      <Section>
        <Container>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {/* Spring Offer - Game Pass */}
            <StaggerItem>
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
              <div className="bg-accent p-6 text-white text-center">
                <p className="text-sm font-medium uppercase tracking-wider mb-1">
                  Spring Special
                </p>
                <p className="text-4xl font-bold">$10<span className="text-lg font-normal">/mo</span></p>
                <p className="text-sm opacity-90 mt-1">Game Pass — Open Play Access</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Spring Offer — Game Pass</h3>
                <p className="text-muted-foreground mb-4">
                  Pay $10/month and get access to Open Play for just $10! Enjoy badminton, pickleball, and volleyball with a 3-month commitment.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    Badminton, pickleball, and volleyball included
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    3-month commitment required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    No join fee
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground border-t pt-4">
                  Plus taxes &amp; fees. Limited time offer.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href={BOOKING_URLS.springOffer}>Claim This Offer</Link>
                </Button>
              </div>
            </div>
            </StaggerItem>

            {/* Pickleball Golden Hour */}
            <StaggerItem>
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground text-center">
                <p className="text-sm font-medium uppercase tracking-wider mb-1">
                  Pickleball
                </p>
                <p className="text-4xl font-bold">Golden Hour</p>
                <p className="text-sm opacity-90 mt-1">Special Pickleball Package</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Pickleball Golden Hour</h3>
                <p className="text-muted-foreground mb-4">
                  An exclusive pickleball membership package with premium court access and dedicated play time. Perfect for serious pickleball players.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Dedicated pickleball court time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Premium membership perks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    All equipment included
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground border-t pt-4">
                  Limited availability. Sign up today.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href={BOOKING_URLS.pickleballGoldenHour}>Claim This Offer</Link>
                </Button>
              </div>
            </div>
            </StaggerItem>

            {/* Refer a Friend */}
            <StaggerItem>
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground text-center">
                <p className="text-sm font-medium uppercase tracking-wider mb-1">
                  Members
                </p>
                <p className="text-4xl font-bold">Free</p>
                <p className="text-sm opacity-90 mt-1">Session for Both</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Refer a Friend</h3>
                <p className="text-muted-foreground mb-4">
                  Know someone who would love LevelUP Sports? Refer a friend and you both get
                  a free session. The more you refer, the more you earn.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Existing members and enrollees eligible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Friend must be a first-time visitor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    No limit on number of referrals
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground border-t pt-4">
                  Valid through December 31, 2026. Referral must mention your name at booking.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href="/contact">Refer a Friend</Link>
                </Button>
              </div>
            </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Terms Section */}
      <Section className="bg-muted/50">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4 text-balance">Offer Terms</h2>
              <p className="text-muted-foreground text-sm">
                All offers are subject to availability and may be withdrawn at any time. Offers
                cannot be combined unless explicitly stated. Valid at the LevelUP Sports Elkton
                location only. Contact us for full terms and conditions.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Questions About Our Offers?"
        description="Our team is happy to help you find the best deal for your situation. Get in touch today."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View All Programs", href: BOOKING_URLS.offerings }}
      />
    </>
  );
}
