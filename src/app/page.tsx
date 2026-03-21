import { Metadata } from "next";
import Link from "next/link";

// Layout
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

// UI Primitives
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { GradientText } from "@/components/ui/gradient-text";
import { TextReveal } from "@/components/ui/text-reveal";

// Composed Components
import { VideoHero } from "@/components/composed/video-hero";
import { SportCard } from "@/components/composed/sport-card";
import { StatCounter } from "@/components/composed/stat-counter";
import { TestimonialCarousel } from "@/components/composed/testimonial-carousel";
import { CTABanner } from "@/components/composed/cta-banner";
import { BookingWidget } from "@/components/composed/booking-widget";
import { CourtAvailability } from "@/components/composed/court-availability";
import { GoogleReviews } from "@/components/composed/google-reviews";
import { AthleteSpotlight } from "@/components/composed/athlete-spotlight";
import { LiveActivityBadge, NextSessionCountdown } from "@/components/composed/live-indicator";
import { ReferralBanner } from "@/components/composed/referral-banner";
import { BlogCard } from "@/components/composed/blog-card";

// Data
import { SPORTS } from "@/lib/constants/site";
import { TESTIMONIALS } from "@/content/testimonials";
import { BLOG_POSTS } from "@/content/blog-posts";
import { generateFAQLD } from "@/lib/seo/json-ld";
import { HOMEPAGE_FAQS } from "@/content/faqs";

// Icons
import {
  Users,
  Trophy,
  Calendar,
  Shield,
  MapPin,
  Star,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "LevelUP Sports & Athletics Club | Batting Cages, Cricket, Badminton & Pickleball in Elkton, MD — Near Middletown & Newark, DE",
  description:
    "Indoor batting cages, cricket nets, badminton & pickleball courts in Elkton, MD — just 15 min from Middletown, Newark & Wilmington, DE. Expert youth academies, court rentals, open 7 days. Book online today.",
  alternates: {
    canonical: "https://levelupsports.us",
  },
};

export default function HomePage() {
  const faqLD = generateFAQLD(HOMEPAGE_FAQS);
  const latestPosts = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      {/* ═══════════════════════════════════════════
          HERO — Cinematic video hero with scroll fade
          ═══════════════════════════════════════════ */}
      <VideoHero
        posterImage="/images/sports/facility.jpg"
        title="Where Athletes Are Made"
        subtitle="Expert coaching, modern courts, and youth training programs in baseball, cricket, badminton, and pickleball. Elkton, MD."
        badge="Now Open — Elkton, MD"
        primaryCTA={{ label: "Book a Session", href: "/schedule" }}
        secondaryCTA={{ label: "Explore Programs", href: "#sports" }}
        overlayOpacity={0.5}
      />

      {/* ═══════════════════════════════════════════
          LIVE ACTIVITY BAR — Real-time facility pulse
          ═══════════════════════════════════════════ */}
      <div className="bg-primary-dark border-b border-white/5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 py-3">
            <LiveActivityBadge />
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <NextSessionCountdown />
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Star className="h-4 w-4 text-warning fill-warning" />
              <span className="font-medium text-white/70">4.9</span>
              <span className="hidden sm:inline">from 127 reviews</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════
          SPORTS — Four sports with 3D tilt cards
          ═══════════════════════════════════════════ */}
      <Section id="sports">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                Four Sports.{" "}
                <GradientText className="inline">One Home.</GradientText>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                From batting cages to badminton courts, we&apos;ve built a
                world-class facility for every athlete. Find your sport.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPORTS.map((sport) => (
              <StaggerItem key={sport.slug}>
                <SportCard {...sport} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.2}>
            <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/kids-agility"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                <Zap className="h-4 w-4" />
                Kids Agility Training (Ages 5-12)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                <Calendar className="h-4 w-4" />
                View Full Schedule
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          VALUE PROPOSITION — Scroll-driven text reveal
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal variant="fade-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  Why LevelUP
                </p>
              </Reveal>
              <TextReveal
                text="LevelUP exists to democratize access to premium sports training. At the crossroads of Maryland, Delaware, and Pennsylvania, every athlete — from first-timer to competitive player — can elevate their game."
                tag="h2"
                className="font-display text-subsection text-neutral-900 leading-snug mb-8"
              />
              <Reveal delay={0.2}>
                <p className="text-neutral-600 leading-relaxed mb-10">
                  Our expert coaches, modern facilities, and inclusive community
                  create the environment where potential becomes performance.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" asChild>
                    <Link href="/about">Our Story</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/facilities">Tour the Facility</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 gap-5">
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    Safe & Modern
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Climate-controlled indoor facility
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    Expert Coaches
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Certified professionals
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    All Ages
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Youth through adult programs
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-5 w-5 text-info" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    4 Sports
                  </h3>
                  <p className="text-xs text-neutral-500">
                    One facility, endless possibilities
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          STATS — Animated counters with glow
          ═══════════════════════════════════════════ */}
      <Section variant="primary" size="sm">
        <Container>
          <Reveal variant="fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter value={500} suffix="+" label="Athletes Trained" />
              <StatCounter value={4} label="Sports Programs" />
              <StatCounter value={15} suffix="+" label="Expert Coaches" />
              <StatCounter value={7} label="Days a Week" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          BOOKING — Inline booking widget
          ═══════════════════════════════════════════ */}
      <Section id="book">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  Book Online
                </p>
                <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                  Reserve Your Court in{" "}
                  <GradientText className="inline">3 Clicks</GradientText>
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Skip the phone call. Choose your sport, pick a time, and
                  you&apos;re booked. Batting cages, cricket nets, badminton
                  courts, and pickleball — all available online.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-xs">1</span>
                    </div>
                    Choose your sport and court
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-xs">2</span>
                    </div>
                    Pick your date and time slot
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-xs">3</span>
                    </div>
                    Confirm and you&apos;re all set
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal variant="fade-left" delay={0.1}>
              <BookingWidget />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          COURT AVAILABILITY — Live status grid
          ═══════════════════════════════════════════ */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <CourtAvailability />
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          GOOGLE REVIEWS — Social proof
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <GoogleReviews />
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          ATHLETE SPOTLIGHT — Featured stories
          ═══════════════════════════════════════════ */}
      <AthleteSpotlight />

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — Community voices
          ═══════════════════════════════════════════ */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Community
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                What Our Athletes Say
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what the
                LevelUP community has to say.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TestimonialCarousel testimonials={TESTIMONIALS} />
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          BLOG PREVIEW — Latest training tips & news
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  From the Blog
                </p>
                <h2 className="font-display text-section text-neutral-900 text-balance">
                  Training Tips & News
                </h2>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">
                  View All Posts <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          REFERRAL — Share & earn rewards
          ═══════════════════════════════════════════ */}
      <ReferralBanner className="mx-auto max-w-container px-4 sm:px-6 lg:px-8" />

      {/* ═══════════════════════════════════════════
          LOCAL SEO — Serving the Tri-State Area
          ═══════════════════════════════════════════ */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Conveniently Located
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                Serving the MD / DE / PA Tri-State Area
              </h2>
              <p className="text-neutral-600 max-w-3xl mx-auto">
                Located at 701 E Pulaski Hwy in Elkton, MD, LevelUP Sports is
                the closest premier indoor sports facility for families across
                three states. Open Mon&ndash;Sat 6 AM&ndash;11 PM, Sun 6 AM&ndash;9 PM.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {[
                { city: "Middletown, DE", time: "15 min" },
                { city: "Newark, DE", time: "20 min" },
                { city: "Bear, DE", time: "25 min" },
                { city: "Wilmington, DE", time: "30 min" },
                { city: "New Castle, DE", time: "25 min" },
                { city: "Glasgow, DE", time: "20 min" },
                { city: "North East, MD", time: "10 min" },
                { city: "Rising Sun, MD", time: "15 min" },
                { city: "Kennett Square, PA", time: "25 min" },
                { city: "Oxford, PA", time: "30 min" },
              ].map((area) => (
                <div
                  key={area.city}
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm border border-neutral-100"
                >
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-neutral-900 truncate">
                      {area.city}
                    </p>
                    <p className="text-[10px] text-neutral-500">{area.time} drive</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-center text-sm text-neutral-500 mt-6">
              Indoor batting cages, cricket nets, badminton courts &amp;
              pickleball courts &mdash; all under one roof near you.{" "}
              <Link
                href="/facilities"
                className="text-accent hover:text-accent-hover font-medium"
              >
                Tour our facility &rarr;
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          FINAL CTA — Convert
          ═══════════════════════════════════════════ */}
      <CTABanner
        title="Ready to Elevate Your Game?"
        description="Book your first session today. No commitment required — just come play."
        primaryCTA={{ label: "Book a Session", href: "#book" }}
        secondaryCTA={{ label: "View Memberships", href: "/memberships" }}
      />
    </>
  );
}
