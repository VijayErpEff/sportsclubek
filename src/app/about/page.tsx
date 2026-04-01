import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StatCounter } from "@/components/composed/stat-counter";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { BOOKING_URLS } from "@/lib/constants/booking";
import {
  Target, Heart, Users, Zap, MapPin, Trophy, Calendar, Shield,
} from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us",
  description:
    "Learn about LevelUP Sports & Athletics Club — Elkton, MD's premier multi-sport facility. Our mission, story, coaching team, and commitment to athlete development.",
  path: "/about",
});

const milestones = [
  {
    year: "2024",
    title: "The 45-minute problem",
    desc: "Parents across Cecil County, Newark, and Middletown were driving 45+ minutes for decent indoor sports facilities. Baseball families drove to Baltimore. Cricket families drove to Philly. Enough was enough.",
  },
  {
    year: "2025",
    title: "701 E Pulaski Hwy",
    desc: "We found the perfect spot — on Route 40 in Elkton, right off I-95, accessible from Maryland, Delaware, and Pennsylvania. Construction began on a 20,000+ sq ft multi-sport facility.",
  },
  {
    year: "Jan 2026",
    title: "Opening day",
    desc: "First families walk through the doors. Six sports — baseball, cricket, badminton, pickleball, volleyball, and soccer — under one roof. Within weeks, members are coming from three states.",
  },
  {
    year: "2026",
    title: "Growing fast. 3 states. 1 building.",
    desc: "Families from Middletown, Newark, Wilmington, and across Cecil County train here weekly. 200+ player events, Little League rain-out saves, bachelorette parties — the community showed up.",
  },
];

const coaches = [
  {
    name: "Coach Rivera",
    role: "Baseball Director",
    cred: "15+ years coaching experience. Former collegiate player at University of Maryland.",
    image: "/images/sports/baseball.jpg",
    sport: "Baseball",
  },
  {
    name: "Sarbjeet Ladda",
    role: "Chief Bowling Coach — Cricket",
    cred: "IPL veteran (KKR, Gujarat Lions, Delhi Daredevils). MLC Champion. 100+ Minor League wickets. BRSS Academy partner.",
    image: "/images/Coaches/Sarabjit.jpeg",
    sport: "Cricket",
  },
  {
    name: "Coach Lee",
    role: "Badminton Director",
    cred: "BWF-certified coach. 10+ years competitive experience and tournament coaching.",
    image: "/images/sports/badminton.jpg",
    sport: "Badminton",
  },
  {
    name: "Coach Viktor",
    role: "Volleyball Director",
    cred: "20+ years competitive playing. Ukrainian league medalist. 6+ years coaching youth and university teams.",
    image: "/images/sports/volleyball.jpg",
    sport: "Volleyball",
  },
  {
    name: "Coach Williams",
    role: "Youth Fitness",
    cred: "Certified youth fitness specialist. Builds athletic foundations for young athletes ages 5–12.",
    image: "/images/sports/kids-agility.jpg",
    sport: "Agility",
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

      {/* Hero — Split layout: text left, image right */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-neutral-50">
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-8">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">About</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal variant="fade-right">
              <div>
                <h1 className="font-display text-hero text-neutral-900 mb-6 text-balance">
                  Built by Parents. Run by Coaches. Made for Athletes.
                </h1>
                <p className="text-body-lg text-neutral-500 leading-relaxed max-w-lg">
                  We&apos;re not a franchise. We&apos;re coaches, parents, and athletes
                  who got tired of driving 45 minutes for decent facilities.
                  So we built one.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button asChild>
                    <Link href="/free-trial">Try a Free Session</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/schedule">View Schedule</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={0.15}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-elevated">
                <Image
                  src="/images/sports/facility.jpg"
                  alt="Inside LevelUP Sports — modern indoor facility in Elkton, MD"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Story — Two-column narrative with quick stats */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  Our Story
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-8 text-balance">
                  Built at the crossroads of three states.
                </h2>
                <div className="space-y-5 text-neutral-600 leading-relaxed">
                  <p>
                    Elkton, Maryland sits where Maryland, Delaware, and
                    Pennsylvania converge. Families from across this tri-state
                    area were driving 45+ minutes for quality indoor sports
                    training. We changed that.
                  </p>
                  <p>
                    Our facility brings professional-grade batting cages,
                    competition courts, cricket nets, and agility training under
                    one climate-controlled roof — staffed by coaches who&apos;ve
                    competed at the highest levels.
                  </p>
                  <p>
                    From a 6-year-old swinging a bat for the first time to a
                    17-year-old preparing for college recruitment, we meet every
                    athlete where they are and push them to where they want to
                    be.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: "Elkton, MD", sub: "Tri-state area" },
                  { icon: Trophy, label: "6 Sports", sub: "Under one roof" },
                  {
                    icon: Calendar,
                    label: "7 Days",
                    sub: "Year-round training",
                  },
                  { icon: Shield, label: "All Ages", sub: "Youth to adult" },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <div className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-card-hover transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-semibold text-neutral-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-caption text-neutral-400 mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Timeline / Milestones */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="font-display text-section text-neutral-900 text-center mb-16 text-balance">
              Our journey so far.
            </h2>
          </Reveal>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <Reveal key={`${m.year}-${m.title}`} delay={i * 0.1}>
                <div className="flex gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-accent shrink-0 mt-1.5" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-neutral-200" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-caption font-bold text-accent">
                      {m.year}
                    </p>
                    <p className="font-display font-bold text-neutral-900 mt-1">
                      {m.title}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Our Values
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                What drives everything we do.
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Excellence",
                desc: "Professional-grade coaching, facilities, and athlete experience — always raising the bar.",
              },
              {
                icon: Heart,
                title: "Community",
                desc: "More than a facility. A family where every achievement is celebrated together.",
              },
              {
                icon: Users,
                title: "Inclusivity",
                desc: "Every age, every skill level, every background. Premium training accessible to all.",
              },
              {
                icon: Zap,
                title: "Growth",
                desc: "Continuous improvement for our athletes, coaches, and programs. Never standing still.",
              },
            ].map((value) => (
              <StaggerItem key={value.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {value.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Stats */}
      <Section variant="primary" size="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Athletes Trained" />
            <StatCounter value={6} label="Sports Offered" />
            <StatCounter value={15} suffix="+" label="Expert Coaches" />
            <StatCounter value={3} label="States Served" />
          </div>
        </Container>
      </Section>

      {/* Coaching Team — Cards with sport imagery banners */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Our Team
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                Coaches who&apos;ve been where you want to go.
              </h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
                Every coach on our staff brings competitive experience and a
                genuine passion for developing the next generation of athletes.
              </p>
            </div>
          </Reveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {coaches.map((coach) => (
              <StaggerItem key={coach.name}>
                <div className="bg-white rounded-2xl shadow-card overflow-hidden group hover:shadow-card-hover transition-all">
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={coach.image}
                      alt={`${coach.sport} training at LevelUP Sports`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      aria-hidden="true"
                    />
                    <Badge className="absolute bottom-2.5 left-3 bg-white/90 text-neutral-900 text-xs backdrop-blur-sm">
                      {coach.sport}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-neutral-900">
                      {coach.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mt-1">
                      {coach.role}
                    </p>
                    <p className="text-caption text-neutral-500 mt-2 leading-relaxed">
                      {coach.cred}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Testimonial */}
      <section className="border-t border-neutral-100">
        <Container>
          <Reveal>
            <blockquote className="py-16 md:py-24 max-w-3xl mx-auto text-center">
              <p className="font-display text-subsection text-neutral-900 leading-relaxed text-balance">
                &ldquo;My daughter started in the agility program at age 7. Two
                years later she&apos;s competing in badminton tournaments. The
                coaches here don&apos;t just teach sports — they build
                confidence.&rdquo;
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-neutral-900">
                  — Parent of a youth athlete, Wilmington DE
                </p>
              </footer>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      <CTABanner
        title="Come See Us in Person"
        description="Schedule a facility tour or attend our next Open House event."
        primaryCTA={{ label: "Schedule a Tour", href: "/open-house" }}
        secondaryCTA={{ label: "Book a Session", href: BOOKING_URLS.offerings }}
      />
    </>
  );
}
