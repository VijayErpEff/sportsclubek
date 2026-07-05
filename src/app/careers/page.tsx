import { Metadata } from "next";
import Link from "next/link";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { CareerApplyButton } from "@/components/composed/career-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD, generateJobPostingLD } from "@/lib/seo/json-ld";
import { Heart, TrendingUp, Users, Dumbbell, Briefcase, ArrowRight } from "lucide-react";
import {
  PositionDetailsDialog,
  type PositionDetails,
} from "./position-details-dialog";

export const metadata: Metadata = generateSEOMetadata({
  title: "Careers — Join Our Team in Elkton, MD",
  description:
    "Join the LevelUP Sports team in Elkton, MD. Coaching, facility operations, and front desk positions. Build the future of youth athletics in the tri-state area.",
  path: "/careers",
});

type Position = {
  title: string;
  type: string;
  description: string;
  details?: PositionDetails;
};

const openPositions: Position[] = [
  {
    title: "Pickleball Coach",
    type: "Full-Time",
    description:
      "Lead recreational and competitive pickleball training programs for all ages.",
  },
  {
    title: "Youth Fitness Trainer",
    type: "Full-Time",
    description:
      "Conduct agility, coordination, and fitness sessions for children aged 4–12.",
  },
  {
    title: "Badminton Coach",
    type: "Full-Time",
    description:
      "Train beginner to intermediate players in individual and group settings.",
  },
  {
    title: "Volleyball Coach",
    type: "Full-Time",
    description:
      "Develop skills and strategies for youth and adult volleyball teams.",
  },
  {
    title: "Baseball Coach",
    type: "Full-Time",
    description:
      "Lead batting cage sessions and hitting, pitching, and fielding instruction for youth players.",
  },
  {
    title: "Softball Coach",
    type: "Full-Time",
    description:
      "Coach hitting, pitching, and fielding fundamentals for youth and teen softball players.",
  },
  {
    title: "Club Manager",
    type: "Full-Time",
    description:
      "Oversee daily operations, staff management, and member services.",
  },
  {
    title: "Front Desk Staff",
    type: "Full-Time",
    description:
      "Provide excellent customer service and manage facility bookings.",
  },
  {
    title: "Social Media Manager",
    type: "Open",
    description:
      "Own the LevelUP voice across Instagram, TikTok, and YouTube — turn athletes' stories into our brand.",
    details: {
      summary:
        "Lead day-to-day content, community engagement, and paid social strategy for a fast-growing multi-sport club serving the MD/DE/PA tri-state area. You'll capture the energy on our courts and cages and turn it into the content that fills them.",
      location: "Elkton, MD — on-site preferred, hybrid possible",
      compensation: "Negotiable based on experience + portfolio",
      responsibilities: [
        "Plan and publish a multi-platform content calendar across Instagram, TikTok, YouTube Shorts, and Facebook.",
        "Capture on-site at training sessions, academies, open houses, and events — photo and short-form video.",
        "Edit Reels, TikToks, and Shorts that showcase coaches, athletes, and member moments.",
        "Run community management: replies, DMs, comment moderation, and athlete spotlights.",
        "Partner with coaches, families, and local creators on collaborations and ambassador content.",
        "Plan and execute paid social campaigns tied to membership drives, academy enrollment, and events.",
        "Report monthly on reach, engagement, follower growth, and conversion to bookings and sign-ups.",
      ],
      requirements: [
        "2+ years managing social accounts for a brand, agency, or creator-led business.",
        "Portfolio of short-form video work (Reels, TikTok, or Shorts) you can share.",
        "Strong copywriting in a confident, energetic, inclusive voice — no jargon, no fluff.",
        "Comfortable shooting and editing on iPhone, mirrorless camera, or both.",
        "Working knowledge of Meta Business Suite, TikTok Analytics, and GA4.",
      ],
      niceToHave: [
        "Background in sports, fitness, or youth-brand marketing.",
        "Adobe Premiere, CapCut Pro, or DaVinci Resolve familiarity.",
        "Knowledge of the Cecil County / Newark DE / Wilmington DE local market.",
        "Email marketing or SMS campaign experience.",
      ],
    },
  },
  {
    title: "Sales Manager",
    type: "Open",
    description:
      "Drive membership growth, academy enrollment, and corporate/league partnerships across Cecil County and the tri-state area.",
    details: {
      summary:
        "Own the LevelUP revenue funnel — from facility tours to member signup to academy enrollment and corporate league deals. You'll be the person prospects meet first and the reason families and partners say yes.",
      location: "Elkton, MD — on-site + local travel for partner visits",
      compensation: "Competitive base + uncapped performance bonus",
      responsibilities: [
        "Lead facility tours and convert prospects into members, academy students, and rental customers.",
        "Manage the full CRM pipeline — from inbound lead to signed agreement.",
        "Hit monthly targets for new memberships, academy enrollments, and recurring revenue.",
        "Run outreach to schools, leagues, corporate partners, and community organizations.",
        "Collaborate with marketing on local activation, referrals, and ambassador programs.",
        "Negotiate and close team, league, and event-rental contracts.",
        "Report weekly on funnel health, win rates, and pipeline forecast.",
      ],
      requirements: [
        "3+ years of B2C or membership sales — fitness, athletics, hospitality, or youth services preferred.",
        "Documented track record of hitting or exceeding MRR / enrollment targets.",
        "CRM proficiency (HubSpot, Salesforce, Mindbody, or similar).",
        "Strong in-person presence — comfortable leading tours, family meetings, and partner pitches.",
        "Clean driving record for off-site partner visits across MD/DE/PA.",
      ],
      niceToHave: [
        "Existing network in Maryland or Delaware school athletics, leagues, or youth sports.",
        "Bilingual (Spanish) a plus.",
        "Experience building referral, ambassador, or corporate-wellness programs.",
      ],
    },
  },
];

const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Make a real impact on young athletes every day." },
  { icon: TrendingUp, title: "Growth", desc: "Leadership opportunities as we expand." },
  { icon: Users, title: "Team Culture", desc: "Passionate people who share your love of sport." },
  { icon: Dumbbell, title: "Facility Access", desc: "Complimentary access to all courts and cages." },
];

export default function CareersPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  const datePosted = new Date().toISOString().slice(0, 10);
  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const jobPostingLDs = openPositions
    .filter((p): p is Position & { details: PositionDetails } => !!p.details)
    .map((p) =>
      generateJobPostingLD({
        title: p.title,
        description: `${p.details.summary} Responsibilities: ${p.details.responsibilities.join(" ")} Requirements: ${p.details.requirements.join(" ")}`,
        datePosted,
        validThrough,
        url: "/careers",
        employmentType: "OTHER",
      })
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      {jobPostingLDs.map((ld) => (
        <script
          key={ld.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* Compact Hero — matches memberships page style */}
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
              <li className="text-neutral-600 font-medium">Careers</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              Join Our Team
            </p>
            <h1 className="font-display text-page-title text-neutral-900 mb-2 text-balance">
              Build the Future of Youth Athletics
            </h1>
            <p className="text-neutral-500">
              We&apos;re looking for passionate coaches and team members who want to make a difference in young athletes&apos; lives.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Work Here — Compact cards */}
      <Section size="sm">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((perk) => (
              <StaggerItem key={perk.title}>
                <div className="rounded-xl border border-neutral-100 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                    <perk.icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm mb-1">{perk.title}</h3>
                  <p className="text-xs text-neutral-500">{perk.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Current Openings — Clean grid cards */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                Open Positions
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                Current Openings
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {openPositions.map((position) => (
              <StaggerItem key={position.title}>
                <div className="rounded-xl bg-white border border-neutral-100 p-5 shadow-card hover:shadow-card-hover transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {position.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1.5">{position.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4 flex-1">{position.description}</p>
                  <div className="flex items-center justify-between gap-3">
                    {position.details && (
                      <PositionDetailsDialog
                        title={position.title}
                        details={position.details}
                      />
                    )}
                    <CareerApplyButton
                      position={position.title}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors ml-auto"
                    >
                      Apply Now <ArrowRight className="h-3.5 w-3.5" />
                    </CareerApplyButton>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Don't See Your Role — Compact */}
      <Section size="sm">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-subsection text-neutral-900 mb-3 text-balance">
                Don&apos;t See Your Role?
              </h2>
              <p className="text-neutral-500 text-sm mb-5">
                We&apos;re always looking for talented people. Send us your resume and tell us what you&apos;d bring to LevelUP Sports.
              </p>
              <CareerApplyButton
                position="Open Application"
                className="inline-flex items-center justify-center h-10 px-6 rounded-lg border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
              >
                Send Your Application
              </CareerApplyButton>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="Ready to Join the Team?"
        description="Apply today and help us build the future of youth athletics in Elkton, MD."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Learn More About Us", href: "/about" }}
      />
    </>
  );
}
