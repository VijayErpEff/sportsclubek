import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Hero } from "@/components/composed/hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CTABanner } from "@/components/composed/cta-banner";
import { SITE_CONFIG } from "@/lib/constants/site";
import { CheckCircle, Calendar, Clock, Shield, Sun, Users, MapPin } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Summer Sports Camps — Elkton, MD | Ages 6–16",
  description:
    "Summer sports camps at LevelUP Sports in Elkton, MD. Baseball, cricket, badminton & multi-sport for ages 6-16. Full and half day. Near Middletown & Newark, DE.",
  path: "/summer-camps",
});

const CAMPS = [
  {
    name: "Baseball Intensive",
    price: "$299",
    perWeek: true,
    ages: "Ages 7-16",
    schedule: "Full day, Mon-Fri, 9AM-3PM",
    highlights: [
      "Batting cage sessions daily",
      "Pitching and fielding clinics",
      "Game strategy and film review",
      "Friday scrimmage games",
      "Snacks and lunch included",
    ],
  },
  {
    name: "Cricket Camp",
    price: "$199",
    perWeek: true,
    ages: "Ages 6-16",
    schedule: "Half day, Mon-Fri, 9AM-12PM",
    highlights: [
      "Batting and bowling fundamentals",
      "Net sessions with bowling machines",
      "Fielding and wicket-keeping drills",
      "Match-play Fridays",
      "Snacks included",
    ],
  },
  {
    name: "Badminton Camp",
    price: "$199",
    perWeek: true,
    ages: "Ages 6-14",
    schedule: "Half day, Mon-Fri, 1PM-4PM",
    highlights: [
      "Footwork and racket technique",
      "Singles and doubles strategy",
      "Conditioning and agility work",
      "Round-robin tournament Friday",
      "Snacks included",
    ],
  },
  {
    name: "Multi-Sport Explorer",
    price: "$279",
    perWeek: true,
    ages: "Ages 6-12",
    schedule: "Full day, Mon-Fri, 9AM-3PM",
    highlights: [
      "Rotate through all our sports",
      "Two sports per day",
      "Focus on fundamentals and fun",
      "Team games and challenges",
      "Snacks and lunch included",
    ],
  },
];

const WHATS_INCLUDED = [
  "Expert coaching from certified instructors",
  "All equipment and gear provided",
  "Skill assessment on day one and progress report on day five",
  "Camp t-shirt and water bottle",
  "Indoor, climate-controlled facility — no weather cancellations",
  "Safe, supervised environment with background-checked staff",
];

const PARENT_INFO = [
  { icon: Clock, title: "Drop-off / Pickup", description: "Full day: drop-off 8:45AM, pickup 3:15PM. Half day: varies by session." },
  { icon: Sun, title: "Indoor Facility", description: "100% indoor, climate-controlled. No weather cancellations, ever." },
  { icon: Shield, title: "Safety First", description: "All coaches are background-checked and first-aid certified." },
  { icon: MapPin, title: "Easy Access", description: "Located on Rt. 40 in Elkton. Easy access from Middletown, Newark, and I-95." },
];

export default function SummerCampsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Summer Camps", url: "/summer-camps" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <Hero
        variant="page"
        title="Summer Camps 2025"
        subtitle="Full-day and half-day sports camps for ages 6-16. Baseball, cricket, badminton, and multi-sport options. June 9 through August 15."
        primaryCTA={{ label: "Register Now", href: "/contact" }}
        secondaryCTA={{ label: "View Schedule", href: "/schedule" }}
      />

      <Section className="py-4">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">Summer Camps</li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Camp Options */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-3">Camp Options</h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Pick one sport to go deep, or explore them all. Register for a single week or the whole summer.</p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAMPS.map((camp) => (
              <StaggerItem key={camp.name}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-1">{camp.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-primary">{camp.price}</span>
                    <span className="text-neutral-500 text-sm">/ week</span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-1">{camp.ages}</p>
                  <p className="text-sm text-accent font-medium mb-4">{camp.schedule}</p>
                  <ul className="space-y-2.5 flex-1">
                    {camp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-neutral-600 text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/contact">Register</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* What's Included */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-section text-neutral-900 mb-8 text-center">What&apos;s Included</h2>
              <ul className="space-y-4">
                {WHATS_INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Schedule & Early Bird */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-section text-neutral-900 mb-6">Schedule &amp; Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <Calendar className="h-6 w-6 text-accent mx-auto mb-3" />
                  <p className="font-semibold text-neutral-900 mb-1">June 9 &ndash; Aug 15</p>
                  <p className="text-sm text-neutral-500">10 weeks of camp</p>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <Users className="h-6 w-6 text-accent mx-auto mb-3" />
                  <p className="font-semibold text-neutral-900 mb-1">Flexible Registration</p>
                  <p className="text-sm text-neutral-500">Sign up for 1 week or all 10</p>
                </div>
                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                  <Sun className="h-6 w-6 text-accent mx-auto mb-3" />
                  <p className="font-semibold text-accent mb-1">15% Early Bird</p>
                  <p className="text-sm text-neutral-500">Register before May 1</p>
                </div>
              </div>
              <p className="text-neutral-500 text-sm">
                Multi-week discounts available. Sibling discount: 10% off second child. Contact us for details.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* For Parents */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 mb-10 text-center">For Parents</h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARENT_INFO.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary mb-3">
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

      <CTABanner
        title="Register for Summer Camp"
        description="Spots are limited. Secure your child's place today and save 15% with early bird pricing."
        primaryCTA={{ label: "Register Now", href: "/contact" }}
        secondaryCTA={{ label: "Call Us", href: `tel:${SITE_CONFIG.phone}` }}
      />
    </>
  );
}
