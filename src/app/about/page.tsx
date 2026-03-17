import { Metadata } from "next";
import { StatCounter } from "@/components/composed/stat-counter";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Target, Heart, Users, Zap } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us",
  description:
    "Learn about LevelUP Sports & Athletics Club — Elkton, MD's premier multi-sport facility. Our mission, story, coaching team, and commitment to athlete development.",
  path: "/about",
});

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standard in coaching, facilities, and athlete experience. Good enough never is.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "We're more than a sports facility — we're a family. Every athlete belongs, every achievement is celebrated.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Every age, every skill level, every background. Premium training should be accessible to all.",
  },
  {
    icon: Zap,
    title: "Growth",
    description:
      "We believe in continuous improvement — for our athletes, our coaches, and our programs.",
  },
];

export default function AboutPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Slim Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light pt-[76px] pb-5">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-2">
            <ol className="flex items-center gap-1.5">
              <li><a href="/" className="hover:text-white/70 transition-colors">Home</a></li>
              <li>/</li>
              <li aria-current="page" className="text-white/60">About</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-white">
            About LevelUP Sports
          </h1>
          <p className="text-white/60 mt-1 text-sm max-w-xl">
            Built by athletes, for athletes. Making world-class sports training accessible to every family in the tri-state area.
          </p>
        </Container>
      </div>

      {/* Mission */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-section text-neutral-900 mb-6">
              Empowering Every Athlete to Rise
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              LevelUP Sports & Athletics Club was founded with a simple belief:
              every athlete deserves access to quality coaching and professional
              facilities, regardless of their zip code or budget.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Located in Elkton, MD — at the crossroads of Maryland, Delaware, and
              Pennsylvania — we serve a tri-state community of families who want
              more for their young athletes. Our indoor facility offers year-round
              training in baseball, cricket, badminton, and pickleball, led by
              coaches who have competed at the highest levels.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Whether your child is picking up a bat for the first time or
              preparing for competitive play, LevelUP is where the journey happens.
              We build skill, confidence, and character — one session at a time.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-white border border-neutral-200"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section variant="primary" size="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Athletes Trained" />
            <StatCounter value={4} label="Sports Offered" />
            <StatCounter value={15} suffix="+" label="Expert Coaches" />
            <StatCounter value={3} label="States Served" />
          </div>
        </Container>
      </Section>

      {/* Team Preview */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              Meet Our Coaching Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our coaches bring decades of competitive experience and a passion for
              developing the next generation of athletes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Coach Rivera", role: "Baseball Director", initials: "CR" },
              { name: "Coach Sharma", role: "Cricket Director", initials: "CS" },
              { name: "Coach Lee", role: "Badminton Director", initials: "CL" },
              { name: "Coach Williams", role: "Fitness & Agility", initials: "CW" },
            ].map((coach) => (
              <div
                key={coach.name}
                className="text-center p-6 rounded-2xl bg-white border border-neutral-200 shadow-card"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
                    {coach.initials}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-neutral-900">
                  {coach.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{coach.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner
        title="Come See Us in Person"
        description="Schedule a facility tour or attend our next Open House event."
        primaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
        secondaryCTA={{ label: "Book a Session", href: "/schedule" }}
      />
    </>
  );
}
