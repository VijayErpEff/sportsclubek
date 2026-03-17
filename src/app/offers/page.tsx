import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/composed/hero";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

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
          <div className="grid gap-8 md:grid-cols-3">
            {/* First Session 50% Off */}
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground text-center">
                <p className="text-sm font-medium uppercase tracking-wider mb-1">
                  New Members
                </p>
                <p className="text-4xl font-bold">50% Off</p>
                <p className="text-sm opacity-90 mt-1">Your First Session</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">First Session 50% Off</h3>
                <p className="text-muted-foreground mb-4">
                  New to LevelUP Sports? Try any session — batting cages, court rental, or
                  academy class — at half price. No commitment, no strings attached.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Valid for any single session or rental
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    First-time visitors only
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Cannot be combined with other offers
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground border-t pt-4">
                  Valid through June 30, 2026. One per athlete.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href="/contact">Claim This Offer</Link>
                </Button>
              </div>
            </div>

            {/* Family Membership Special */}
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
              <div className="bg-primary p-6 text-primary-foreground text-center">
                <p className="text-sm font-medium uppercase tracking-wider mb-1">
                  Families
                </p>
                <p className="text-4xl font-bold">25% Off</p>
                <p className="text-sm opacity-90 mt-1">Family Memberships</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Family Membership Special</h3>
                <p className="text-muted-foreground mb-4">
                  Sign up the whole family and save. Get 25% off when two or more family
                  members enroll in any academy program or purchase a facility membership.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Minimum 2 family members required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Applies to academy enrollment and memberships
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    Discount applied to total family enrollment cost
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground border-t pt-4">
                  Valid through August 31, 2026. Must enroll simultaneously.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href="/contact">Claim This Offer</Link>
                </Button>
              </div>
            </div>

            {/* Refer a Friend */}
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
          </div>
        </Container>
      </Section>

      {/* Terms Section */}
      <Section className="bg-muted/50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Offer Terms</h2>
            <p className="text-muted-foreground text-sm">
              All offers are subject to availability and may be withdrawn at any time. Offers
              cannot be combined unless explicitly stated. Valid at the LevelUP Sports Elkton
              location only. Contact us for full terms and conditions.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Questions About Our Offers?"
        description="Our team is happy to help you find the best deal for your situation. Get in touch today."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "View Schedule", href: "/schedule" }}
      />
    </>
  );
}
