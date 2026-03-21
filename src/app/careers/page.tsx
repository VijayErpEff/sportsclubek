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
  title: "Careers at LevelUP Sports",
  description:
    "Join the LevelUP Sports team. Coaching positions, facility operations, and more. Build the future of youth athletics.",
  path: "/careers",
});

const openPositions = [
  {
    title: "Head Baseball Coach",
    type: "Full-Time",
    description:
      "Lead our baseball academy program. Develop curriculum, manage coaching staff, and drive player development across all age groups. Requires collegiate playing experience and 3+ years coaching.",
    responsibilities: [
      "Design and deliver 12-week academy curriculum",
      "Evaluate and develop players ages 8–18",
      "Mentor and coordinate assistant coaches",
      "Communicate progress to parents and guardians",
    ],
  },
  {
    title: "Cricket Coach",
    type: "Part-Time",
    description:
      "Coach batting, bowling, and fielding sessions for youth and adult players. Must have competitive playing experience and a passion for growing the sport in the U.S.",
    responsibilities: [
      "Lead structured cricket coaching sessions",
      "Develop drills for batting, bowling, and fielding",
      "Prepare players for match play and league competition",
      "Support cricket academy growth and community engagement",
    ],
  },
  {
    title: "Front Desk Coordinator",
    type: "Full-Time",
    description:
      "Be the first face visitors see at LevelUP Sports. Manage bookings, answer inquiries, handle payments, and keep our daily operations running smoothly.",
    responsibilities: [
      "Greet visitors and manage check-in process",
      "Handle booking, scheduling, and payment processing",
      "Answer phone and email inquiries",
      "Maintain front desk area and supply inventory",
    ],
  },
  {
    title: "Program Assistant",
    type: "Part-Time",
    description:
      "Support our coaching staff across multiple programs. Set up training areas, assist with drills, and help maintain a safe, organized environment for athletes.",
    responsibilities: [
      "Assist coaches during training sessions",
      "Set up and break down equipment and training areas",
      "Supervise athletes during transitions and breaks",
      "Support facility cleanliness and organization",
    ],
  },
];

export default function CareersPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Hero
        title="Coaching & Sports Jobs in Elkton, MD"
        subtitle="We're looking for passionate coaches and team members who want to make a difference in young athletes' lives."
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
              <li aria-current="page" className="text-neutral-900 font-medium">Careers</li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Why Work Here */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance">Why Work at LevelUP Sports?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At LevelUP Sports, we are building something special — a community-driven sports
                facility where athletes of all ages come to grow. Our team is passionate about
                coaching, mentorship, and creating an environment where every person who walks
                through our doors leaves better than they came in.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                If you love sports, believe in the power of coaching, and want to be part of a
                growing organization, we want to hear from you.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="font-bold mb-2">Meaningful Work</h3>
                <p className="text-sm text-muted-foreground">
                  Make a real impact on young athletes and the local community every single day.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="font-bold mb-2">Growth Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  As we grow, so do opportunities for leadership, specialization, and career
                  advancement.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="font-bold mb-2">Team Culture</h3>
                <p className="text-sm text-muted-foreground">
                  Work alongside passionate, supportive people who share your love of sport and
                  competition.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="font-bold mb-2">Facility Access</h3>
                <p className="text-sm text-muted-foreground">
                  Team members enjoy complimentary access to our batting cages, courts, and
                  training sessions.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section className="bg-muted/50">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-10 text-center text-balance">
              Open Positions
            </h2>
          </Reveal>
          <StaggerContainer className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position) => (
              <StaggerItem key={position.title}>
                <div className="rounded-xl border bg-background p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <h3 className="text-xl font-bold">{position.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {position.type}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{position.description}</p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2">Key Responsibilities</h4>
                    <ul className="space-y-1.5">
                      {position.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild>
                    <Link href="/contact">Apply for This Position</Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Don't See Your Role */}
      <Section>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4 text-balance">
                Don&apos;t See Your Role?
              </h2>
              <p className="text-muted-foreground mb-6">
                We are always interested in hearing from talented, passionate people. If you
                think you would be a great fit for our team but do not see the right position
                listed, send us your resume and a note about what you would bring to LevelUP
                Sports.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Send Us Your Resume</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Application CTA */}
      <CTABanner
        title="Ready to Join the Team?"
        description="Apply today and help us build the future of youth athletics in Elkton, MD."
        primaryCTA={{ label: "Apply Now", href: "/contact" }}
        secondaryCTA={{ label: "Learn More About Us", href: "/about" }}
      />
    </>
  );
}
