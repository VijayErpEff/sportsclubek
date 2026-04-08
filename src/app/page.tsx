import fs from "fs";
import path from "path";
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
import { GoogleReviews } from "@/components/composed/google-reviews";
import { CTABanner } from "@/components/composed/cta-banner";
import { AthleteSpotlight } from "@/components/composed/athlete-spotlight";
import { LiveActivityBadge, NextSessionCountdown } from "@/components/composed/live-indicator";
import { ReferralBanner } from "@/components/composed/referral-banner";
import { BlogCard } from "@/components/composed/blog-card";

// Data
import { SPORTS } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
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

/** Descriptive alt text keyed by filename for SEO and accessibility */
const FACILITY_ALT_TEXT: Record<string, string> = {
  "01-Main-Area-1.png":
    "Indoor multi-sport facility main court area at LevelUP Sports in Elkton, MD",
  "02-Main-Area-2.png":
    "Wide view of indoor courts for badminton, pickleball, and volleyball at LevelUP Sports",
  "04-Training-Area.png":
    "Youth sports training area with batting cages and agility equipment at LevelUP Sports",
  "05-Cricket-Nets.png":
    "Professional indoor cricket nets and bowling machine setup at LevelUP Sports Elkton",
  "06-Lounge.png":
    "Player lounge and viewing area for families at LevelUP Sports & Athletics Club",
};

/**
 * Auto-discovers hero images from public/images/sports/LevelUp/.
 * Just add or remove image files in that folder — no code changes needed.
 * Files are sorted alphabetically; prefix with numbers (01-, 02-) to control order.
 */
function getFacilityImages(): Array<{ src: string; alt: string }> {
  const dir = path.join(process.cwd(), "public/images/sports/LevelUp");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
      .sort()
      .map((f) => ({
        src: `/images/sports/LevelUp/${f}`,
        alt:
          FACILITY_ALT_TEXT[f] ??
          `LevelUP Sports indoor facility — ${f.replace(/\.[^.]+$/, "").replace(/^\d+-/, "").replace(/-/g, " ")}`,
      }));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title:
    "LevelUP Sports — Indoor Sports Facility in Elkton, MD",
  description:
    "Indoor batting cages, cricket nets, badminton & pickleball courts in Elkton, MD — 15 min from Middletown & Newark, DE. Youth academies, court rentals. Book today.",
  alternates: {
    canonical: "https://levelupsports.us",
  },
};

export default function HomePage() {
  const facilityImages = getFacilityImages();
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
        images={facilityImages}
        title="The Sports Facility Your Family Has Been Looking For"
        subtitle="15 minutes from Middletown. 20 from Newark. Every sport you love, coaches who remember your kid's name."
        badge="Now Open — 701 E Pulaski Hwy, Elkton"
        primaryCTA={{ label: "Try a Free Session", href: "/free-trial" }}
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
              <span className="font-medium text-white/70">5.0</span>
              <span className="hidden sm:inline">— 20 Google Reviews</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ═══════════════════════════════════════════
          SPORTS — Sport cards with 3D tilt
          ═══════════════════════════════════════════ */}
      <Section id="sports">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-section text-neutral-900 mb-6 text-balance">
                Every Sport.{" "}
                <GradientText className="inline">One Home.</GradientText>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Rain, snow, 95°F heat — doesn&apos;t matter. Year-round
                indoor training across baseball, cricket, badminton, pickleball, volleyball, and soccer. All skill levels. All ages.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                <Zap className="h-4 w-4" />
                Kids Agility Training (Ages 5-12)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
              >
                <Calendar className="h-4 w-4" />
                View Full Schedule
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/offers"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                <Star className="h-4 w-4" />
                Current Deals &amp; Offers
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
                  Why Families Choose Us
                </p>
              </Reveal>
              <TextReveal
                text="Other facilities have courts. We have coaches who track your kid's progress, send you updates, and genuinely care whether they improve. That's the difference."
                tag="h2"
                className="font-display text-subsection text-neutral-900 leading-snug mb-8"
              />
              <Reveal delay={0.2}>
                <p className="text-neutral-600 leading-relaxed mb-10">
                  500+ athletes train here from Middletown, Newark, Wilmington,
                  and Cecil County. Most tried other places first. They stay
                  because their kids are actually getting better.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" asChild>
                    <Link href="/about">Meet Our Coaches</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/facilities">See the Facility</Link>
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
                    Climate Controlled
                  </h3>
                  <p className="text-xs text-neutral-500">
                    72°F year-round. Rain or shine.
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    Real Credentials
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Coaches who&apos;ve played at the competitive level
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    Ages 5 to 65+
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Youth academies through adult open play
                  </p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-500 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-5 w-5 text-info" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">
                    Free First Session
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Try any sport, no commitment required
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
              <StatCounter value={500} suffix="+" label="Athletes & Families" />
              <StatCounter value={6} label="Sports, One Roof" />
              <StatCounter value={15} suffix="+" label="Certified Coaches" />
              <StatCounter value={7} label="Days a Week" />
            </div>
          </Reveal>
        </Container>
      </Section>


      {/* ═══════════════════════════════════════════
          ATHLETE SPOTLIGHT — Featured stories
          ═══════════════════════════════════════════ */}
      <AthleteSpotlight />

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
          BLOG PREVIEW — Latest training tips & news
          ═══════════════════════════════════════════ */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                  Tips & Stories
                </p>
                <h2 className="font-display text-section text-neutral-900 text-balance">
                  Free Training Advice from Our Coaches
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
                Closer Than You Think
              </h2>
              <p className="text-neutral-600 max-w-3xl mx-auto">
                On Route 40 in Elkton — just off I-95. Free parking, easy
                access from three states. Open Mon&ndash;Sat 6 AM&ndash;11 PM, Sun 6 AM&ndash;9 PM.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-6xl mx-auto">
              {[
                { city: "Middletown, DE", time: "15 min" },
                { city: "Glasgow, DE", time: "20 min" },
                { city: "Newark, DE", time: "20 min" },
                { city: "Bear, DE", time: "25 min" },
                { city: "New Castle, DE", time: "25 min" },
                { city: "Christiana, DE", time: "25 min" },
                { city: "Hockessin, DE", time: "25 min" },
                { city: "Wilmington, DE", time: "30 min" },
                { city: "North East, MD", time: "10 min" },
                { city: "Rising Sun, MD", time: "15 min" },
                { city: "Chesapeake City, MD", time: "20 min" },
                { city: "Havre de Grace, MD", time: "25 min" },
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
              The tri-state area&apos;s only facility with batting cages, cricket nets,
              badminton courts, pickleball, volleyball, AND soccer &mdash; all indoors, all year.{" "}
              <Link
                href="/facilities"
                className="text-accent hover:text-accent-hover font-medium"
              >
                Tour our facility &rarr;
              </Link>
              {" "}or{" "}
              <Link
                href="/open-house"
                className="text-accent hover:text-accent-hover font-medium"
              >
                attend our next Open House &rarr;
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          FINAL CTA — Convert
          ═══════════════════════════════════════════ */}
      <CTABanner
        title="Your First Session Is Free"
        description="No commitment. No pressure. Just come play. If you love it, we'll talk memberships. If not, you tried a new sport for free."
        primaryCTA={{ label: "Claim Your Free Session", href: "/free-trial" }}
        secondaryCTA={{ label: "View Pricing", href: "/memberships" }}
      />
    </>
  );
}
