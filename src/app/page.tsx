import { NewsletterSignup } from "@/components/composed/newsletter-signup";
import { Hero } from "@/components/composed/hero";
import { SportCard } from "@/components/composed/sport-card";
import { FeatureCard } from "@/components/composed/feature-card";
import { StatCounter } from "@/components/composed/stat-counter";
import { TestimonialCard } from "@/components/composed/testimonial-card";
import { FAQAccordion } from "@/components/composed/faq-accordion";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SPORTS } from "@/lib/constants/site";
import { TESTIMONIALS } from "@/content/testimonials";
import { HOMEPAGE_FAQS } from "@/content/faqs";
import { generateFAQLD } from "@/lib/seo/json-ld";
import {
  Users,
  Trophy,
  Calendar,
  Shield,
  Dumbbell,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const faqLD = generateFAQLD(HOMEPAGE_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      {/* Hero */}
      <Hero
        title="Elkton's Premier Sports Facility — Where Athletes Are Made"
        subtitle="Expert coaching, modern courts, and youth training programs in baseball, cricket, badminton, and pickleball. Elkton, MD."
        primaryCTA={{ label: "Book a Session", href: "/schedule" }}
        secondaryCTA={{ label: "Explore Programs", href: "#sports" }}
        variant="home"
        backgroundImage="/images/sports/facility.jpg"
      />

      {/* Social Proof Bar */}
      <Section size="sm" variant="alternate">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-neutral-700">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">500+ Athletes Trained</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">4 Sports Programs</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Star className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">4.9 Star Rating</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Elkton, MD</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sports Section */}
      <Section id="sports">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              Four Sports. One Home.
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From batting cages to badminton courts, we&apos;ve built a
              world-class facility for every athlete. Find your sport.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPORTS.map((sport) => (
              <SportCard key={sport.slug} {...sport} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/kids-agility"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Plus: Kids Agility Training for ages 5-12 &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* About Preview / Value Props */}
      <Section variant="alternate">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-section text-neutral-900 mb-6">
                More Than a Facility. A Community.
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                LevelUP Sports & Athletics Club exists to democratize access to
                premium sports training. At the crossroads of Maryland, Delaware,
                and Pennsylvania, we&apos;ve built a world-class facility where
                every athlete — from first-timer to competitive player — can
                elevate their game.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Our expert coaches, modern facilities, and inclusive community
                create the environment where potential becomes performance.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Safe & Modern</h3>
                <p className="text-xs text-neutral-500">Climate-controlled indoor facility</p>
              </div>
              <div className="bg-accent/5 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Expert Coaches</h3>
                <p className="text-xs text-neutral-500">Certified professionals</p>
              </div>
              <div className="bg-secondary/5 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">All Ages</h3>
                <p className="text-xs text-neutral-500">Youth through adult programs</p>
              </div>
              <div className="bg-info/5 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="h-6 w-6 text-info" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">Flexible</h3>
                <p className="text-xs text-neutral-500">Drop-in or membership</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features / Why LevelUP */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              Why Athletes Choose LevelUP
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Everything you need to train, compete, and grow — under one roof.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Trophy}
              title="Expert-Led Training"
              description="Our coaches bring years of competitive experience and certified training methodology. Every session has a purpose."
            />
            <FeatureCard
              icon={Dumbbell}
              title="Professional Facilities"
              description="Indoor batting cages, competition-grade courts, and dedicated training areas — designed for serious athletes."
            />
            <FeatureCard
              icon={Users}
              title="Programs for Every Level"
              description="From absolute beginners to competitive athletes, our structured programs meet you where you are."
            />
            <FeatureCard
              icon={Calendar}
              title="Flexible Scheduling"
              description="Open play, court rentals, and structured classes throughout the week. Book online in seconds."
            />
            <FeatureCard
              icon={Shield}
              title="Safe & Welcoming"
              description="Climate-controlled, well-maintained facility with a focus on athlete safety and inclusive community."
            />
            <FeatureCard
              icon={Clock}
              title="Year-Round Training"
              description="Rain or shine, hot or cold — train indoors all year. Never miss a session due to weather."
            />
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section variant="primary" size="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Athletes Trained" />
            <StatCounter value={4} label="Sports Programs" />
            <StatCounter value={15} suffix="+" label="Expert Coaches" />
            <StatCounter value={7} label="Days a Week" />
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              What Our Athletes Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what the LevelUP
              community has to say.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="alternate">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-section text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600">
                Everything you need to know to get started.
              </p>
            </div>

            <FAQAccordion items={HOMEPAGE_FAQS} />
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="alternate" size="sm">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-subsection text-neutral-900 mb-3">
              Stay in the Game
            </h2>
            <p className="text-neutral-600 mb-6">
              Get training tips, schedule updates, and exclusive offers delivered to your inbox.
            </p>
            <NewsletterSignup />
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTABanner
        title="Ready to Elevate Your Game?"
        description="Book your first session today. No commitment required — just come play."
        primaryCTA={{ label: "Book a Session", href: "/schedule" }}
        secondaryCTA={{ label: "View Memberships", href: "/memberships" }}
      />
    </>
  );
}
