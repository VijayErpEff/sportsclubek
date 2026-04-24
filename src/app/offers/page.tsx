import { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { cn } from "@/lib/utils/cn";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CheckCircle, Sun, Sparkles, Trophy, Users } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Current Offers & Promotions — Elkton, MD",
  description:
    "Special deals and promotions at LevelUP Sports in Elkton, MD. Summer Camp early bird 10% off, Spring Game Pass $10/mo, Pickleball Golden Hour, and referral rewards.",
  path: "/offers",
});

type Offer = {
  tag: string;
  priceLabel: string;
  priceSuffix?: string;
  subLabel: string;
  title: string;
  body: string;
  features: string[];
  fineprint: string;
  cta: { label: string; href: string };
  accent: "accent" | "primary";
  highlighted?: boolean;
  ribbon?: string;
};

const OFFERS: Offer[] = [
  {
    tag: "Summer Camps 2026",
    priceLabel: "10% OFF",
    subLabel: "Early Bird — Limited Time",
    title: "Summer Camp Early Bird",
    body: "Reserve your camper's spot at our 2026 Summer Camps and save 10% with early bird pricing. Ages 6+ rotate through Soccer, Baseball, Badminton, Cricket, Chess, and Agility — all indoors.",
    features: [
      "Full Day $299/week (8:30 AM – 5:00 PM)",
      "Half Day $199/week",
      "Weeks: June 22 · July 13 · Aug 10",
      "Indoor facility — zero weather cancellations",
    ],
    fineprint: "Early bird discount applies before early bird deadline. Limited spots available.",
    cta: { label: "Reserve Your Spot", href: "/summer-camps" },
    accent: "accent",
    highlighted: true,
    ribbon: "Most Popular",
  },
  {
    tag: "Spring Special",
    priceLabel: "$10",
    priceSuffix: "/mo",
    subLabel: "Game Pass — Open Play Access",
    title: "Spring Offer — Game Pass",
    body: "Pay just $10/month and get Open Play access to badminton, pickleball, and volleyball. Perfect for regulars who want unlimited court time on a budget.",
    features: [
      "Badminton, pickleball, and volleyball included",
      "3-month commitment required",
      "No join fee",
      "Cancel after your 3-month term",
    ],
    fineprint: "Plus taxes & fees. Limited time offer.",
    cta: { label: "Claim This Offer", href: BOOKING_URLS.springOffer },
    accent: "primary",
  },
  {
    tag: "Pickleball",
    priceLabel: "Golden Hour",
    subLabel: "Special Pickleball Package",
    title: "Pickleball Golden Hour",
    body: "An exclusive membership package with premium pickleball court access and dedicated play times. Built for players who want to level up.",
    features: [
      "Dedicated pickleball court time",
      "Premium membership perks",
      "All equipment included",
      "Priority booking windows",
    ],
    fineprint: "Limited availability. Sign up today.",
    cta: { label: "Claim This Offer", href: BOOKING_URLS.pickleballGoldenHour },
    accent: "primary",
  },
  {
    tag: "Members",
    priceLabel: "Free",
    subLabel: "Session for Both",
    title: "Refer a Friend",
    body: "Know someone who would love LevelUP Sports? Refer a friend and you both get a free session. The more you refer, the more you earn.",
    features: [
      "Existing members and enrollees eligible",
      "Friend must be a first-time visitor",
      "No limit on number of referrals",
      "Free session redeemable on any sport",
    ],
    fineprint: "Valid through December 31, 2026. Referral must mention your name at booking.",
    cta: { label: "Refer a Friend", href: "/contact" },
    accent: "primary",
  },
];

const WHY_OFFERS = [
  {
    icon: Sun,
    title: "Save Up To 15%",
    description: "Stack early bird, referral, and membership discounts for the best deal on training.",
  },
  {
    icon: Sparkles,
    title: "Real Value",
    description: "No gimmicks or 'up to' fine print. Every offer below is exactly what it looks like.",
  },
  {
    icon: Trophy,
    title: "Flexible Terms",
    description: "Month-to-month, short commitments, and cancel-anytime options across most offers.",
  },
  {
    icon: Users,
    title: "Local, Not Corporate",
    description: "Independently owned. Every dollar stays in Elkton supporting youth athletics.",
  },
];

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

      {/* Hero — tight, breadcrumb inline */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white"
          aria-hidden="true"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Offers</li>
            </ol>
          </nav>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              Save on Summer Camps, Open Play &amp; More
            </p>
            <h1 className="font-display text-page-title text-neutral-900 mb-2 text-balance">
              Current Offers &amp; Deals
            </h1>
            <p className="text-neutral-500">
              Active promotions at LevelUP Sports &mdash; Elkton&rsquo;s premier indoor
              athletics club.{" "}
              <Link
                href="/summer-camps"
                className="text-accent hover:text-accent-hover font-medium"
              >
                See Summer Camps &rarr;
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Offer Cards */}
      <div className="pb-12 md:pb-16">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-3">
                Pick Your Offer
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">
                All offers are active today. Click any card to claim &mdash; or call us for help
                choosing.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto pt-4">
            {OFFERS.map((offer) => {
              const accentBg = offer.accent === "accent" ? "bg-accent" : "bg-primary";
              const accentText = offer.accent === "accent" ? "text-accent" : "text-primary";
              return (
                <StaggerItem key={offer.title}>
                  <div
                    className={cn(
                      "relative rounded-2xl bg-white h-full flex flex-col hover:shadow-lg transition-shadow",
                      offer.highlighted
                        ? "border-2 border-accent shadow-md"
                        : "border border-neutral-200"
                    )}
                  >
                    {offer.ribbon && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                        {offer.ribbon}
                      </div>
                    )}

                    {/* Price header — uniform height, rounded top to match card */}
                    <div
                      className={cn(
                        "p-6 text-white text-center rounded-t-2xl flex flex-col items-center justify-center min-h-[170px]",
                        accentBg
                      )}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-2 opacity-90">
                        {offer.tag}
                      </p>
                      <p className="font-display text-3xl font-extrabold leading-none text-balance">
                        {offer.priceLabel}
                        {offer.priceSuffix && (
                          <span className="text-lg font-normal">{offer.priceSuffix}</span>
                        )}
                      </p>
                      <p className="text-xs opacity-90 mt-2 leading-snug text-balance">
                        {offer.subLabel}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                        {offer.body}
                      </p>
                      <ul className="space-y-2 mb-5 flex-1">
                        {offer.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle
                              className={cn("h-4 w-4 shrink-0 mt-0.5", accentText)}
                            />
                            <span className="text-neutral-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-neutral-400 border-t border-neutral-100 pt-4 mb-4">
                        {offer.fineprint}
                      </p>
                      <Button
                        className={cn(
                          "w-full mt-auto",
                          offer.accent === "primary" && "bg-primary hover:bg-primary-light"
                        )}
                        asChild
                      >
                        <Link href={offer.cta.href}>{offer.cta.label}</Link>
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </div>

      {/* Why These Offers */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">
              Why Our Offers Win
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_OFFERS.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 text-center h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Terms */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-section text-neutral-900 mb-4">
                Offer Terms
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed">
                All offers are subject to availability and may be withdrawn at any time.
                Offers cannot be combined unless explicitly stated. Valid at the LevelUP
                Sports Elkton location only. Contact us for full terms and conditions.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Questions About Our Offers?"
        description="Our team is happy to help you find the best deal. Call, email, or walk in today."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${SITE_CONFIG.phone}`,
          href: `tel:${SITE_CONFIG.phone}`,
        }}
      />
    </>
  );
}
