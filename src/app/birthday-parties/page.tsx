import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CheckCircle, PartyPopper, ClipboardList, Play, Armchair, Users, Building, Bus, Award, Gift, Clock, Pizza, Timer } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Birthday Parties & Group Events — Elkton, MD",
  description:
    "Host a birthday party at LevelUP Sports in Elkton, MD. Batting cages, badminton, pickleball, and more for ages 6+. Packages from $199 with pizza, drinks, and return gift coupons. Book today.",
  path: "/birthday-parties",
});

const PACKAGES = [
  {
    name: "Level 1",
    price: 199,
    playTime: "1 Hour",
    celebrationTime: "30 mins",
    maxKids: 10,
    additionalKid: 10,
    food: "2 Cheese Pizzas + 1 Soft Drink (2L)",
    returnGift: "$10 OFF (1 hr Cage/Court)",
    birthdayGift: "$15 OFF (1 hr Cage/Court)",
    totalGiftValue: 115,
    features: [
      "Up to 10 kids",
      "1 hour of play time on courts & cages",
      "30 min celebration time (cake & food)",
      "2 cheese pizzas + 1 soft drink (2L)",
      "All equipment provided",
      "Setup and cleanup included",
      "$10 OFF return gift for each guest",
      "$15 OFF gift for the birthday child",
    ],
  },
  {
    name: "Level 2",
    price: 349,
    playTime: "2 Hours",
    celebrationTime: "30 mins",
    maxKids: 15,
    additionalKid: 15,
    food: "3 Cheese Pizzas + 1 Soft Drink (2L)",
    returnGift: "$15 OFF (1 hr Cage/Court)",
    birthdayGift: "$20 OFF (1 hr Cage/Court)",
    totalGiftValue: 245,
    popular: true,
    features: [
      "Up to 15 kids",
      "2 hours of play time on courts & cages",
      "30 min celebration time (cake & food)",
      "3 cheese pizzas + 1 soft drink (2L)",
      "All equipment provided",
      "Setup and cleanup included",
      "$15 OFF return gift for each guest",
      "$20 OFF gift for the birthday child",
    ],
  },
  {
    name: "Level 3",
    price: 449,
    playTime: "3 Hours",
    celebrationTime: "30 mins",
    maxKids: 20,
    additionalKid: 15,
    food: "4 Cheese Pizzas + 2 Soft Drinks (2L)",
    returnGift: "$15 OFF (1 hr Cage/Court)",
    birthdayGift: "$40 OFF (1 hr Cage/Court)",
    totalGiftValue: 340,
    features: [
      "Up to 20 kids",
      "3 hours of play time on courts & cages",
      "30 min celebration time (cake & food)",
      "4 cheese pizzas + 2 soft drinks (2L)",
      "All equipment provided",
      "Setup and cleanup included",
      "$15 OFF return gift for each guest",
      "$40 OFF gift for the birthday child",
    ],
  },
];

const HOW_IT_WORKS = [
  { step: "Book", description: "Pick a date, choose your package, and tell us the birthday star's favorite sport.", icon: ClipboardList },
  { step: "We Plan", description: "Our events team handles setup, equipment, and all the logistics.", icon: PartyPopper },
  { step: "They Play", description: "Kids get coached, compete, and have a blast on real courts and cages.", icon: Play },
  { step: "You Relax", description: "Sit back, take photos, and enjoy the best party you have ever not had to plan.", icon: Armchair },
];

const ALSO_GREAT_FOR = [
  { title: "Corporate Events", description: "Team building with batting cages and pickleball tournaments.", icon: Building },
  { title: "School Field Trips", description: "Active, educational outings for PE classes and after-school groups.", icon: Bus },
  { title: "Team Outings", description: "Celebrate the end of season or kick off a new one together.", icon: Users },
  { title: "Scout Troops", description: "Earn badges while learning real sports skills from certified coaches.", icon: Award },
];

export default function BirthdayPartiesPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Birthday Parties", url: "/birthday-parties" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      {/* Hero — Tight, flows directly into pricing (matches memberships style) */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-white" aria-hidden="true" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Birthday Parties</li>
            </ol>
          </nav>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              Ages 6+ &bull; Pizza Included &bull; All Equipment Provided
            </p>
            <h1 className="font-display text-page-title text-neutral-900 mb-2 text-balance">
              The Birthday Party They&rsquo;ll Actually Talk About
            </h1>
            <p className="text-neutral-500">
              Forget bounce houses. Give them batting cages, badminton courts, and real coaching. Packages from $199 with return gift coupons.{" "}
              <Link href="/contact" className="text-accent hover:text-accent-hover font-medium">
                Book a party &rarr;
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Cards — flows directly from hero */}
      <div className="pb-12 md:pb-16">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-3">Party Packages</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Three packages. Pizza included. Zero stress. All fun.</p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PACKAGES.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div className={cn(
                  "rounded-2xl bg-white p-7 hover:shadow-lg transition-shadow h-full flex flex-col relative",
                  pkg.popular ? "border-2 border-accent" : "border border-neutral-200"
                )}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                  )}
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-primary">${pkg.price}</span>
                    <span className="text-neutral-500 text-sm">/ up to {pkg.maxKids} kids</span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-5">+${pkg.additionalKid}/kid beyond {pkg.maxKids}</p>

                  {/* Quick stats */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <Play className="h-3.5 w-3.5 text-accent" />
                      <span>{pkg.playTime} play</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <Timer className="h-3.5 w-3.5 text-accent" />
                      <span>{pkg.celebrationTime} celebration</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <Pizza className="h-3.5 w-3.5 text-accent" />
                      <span>Food included</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-neutral-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Return gift value callout */}
                  <div className="rounded-lg bg-accent/5 border border-accent/20 p-3 mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Gift className="h-4 w-4 text-accent" />
                      <span className="text-xs font-bold text-accent uppercase tracking-wide">Limited Time Offer</span>
                    </div>
                    <p className="text-sm text-neutral-700">
                      <span className="font-bold">${pkg.totalGiftValue} total</span> in return gift coupons ({pkg.returnGift} per guest + {pkg.birthdayGift} for birthday child). Coupons valid 60 days.
                    </p>
                  </div>

                  <Button className={cn("w-full", !pkg.popular && "bg-primary hover:bg-primary-light")} asChild>
                    <Link href="/contact">Book {pkg.name}</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.1}>
            <p className="text-center text-xs text-neutral-400 mt-6 max-w-2xl mx-auto">
              All packages include setup, cleanup, and all equipment. Bring your own cake! Additional kids beyond package max at ${PACKAGES[0].additionalKid}-${PACKAGES[1].additionalKid}/kid. Return gift coupon max value: $40/hour.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* How It Works */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">How It Works</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="text-center p-6 rounded-2xl bg-white border border-neutral-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Step {i + 1}</div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">{item.step}</h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Also Great For */}
      <Section>
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">Also Great For</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALSO_GREAT_FOR.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary mb-4">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-900 mb-1">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-section text-neutral-900 mb-4">Ready to Book?</h2>
              <p className="text-neutral-500 mb-6">
                Call or email us to reserve your date. We book up fast on weekends, so plan ahead.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <Button size="lg" asChild>
                  <a href={`tel:${SITE_CONFIG.phone}`}>Call {SITE_CONFIG.phone}</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`mailto:${SITE_CONFIG.email}`}>Email Us</a>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Not Sure Which Package?"
        description="Give us a call and we will help you plan the perfect event."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
