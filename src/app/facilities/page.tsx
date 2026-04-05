import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import {
  Thermometer, ParkingCircle, Wifi, ShieldCheck,
  Sparkles, Accessibility, Store, Clock, ArrowRight, MapPin,
} from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Indoor Sports Facility Tour — Elkton, MD | Serving Middletown, Newark & Wilmington, DE",
  description:
    "Tour LevelUP Sports' 20,000 sq ft indoor facility in Elkton, MD — 15 min from Middletown, 20 from Newark, 30 from Wilmington. Batting cages, cricket nets, badminton & pickleball courts, volleyball courts, and soccer turf. Open 7 days.",
  path: "/facilities",
});

const facilityAreas = [
  {
    title: "Batting Cages",
    stat: "4 Cages",
    description:
      "Four professional cages with machines from 30 to 90 MPH. Helmets provided. Your kid can work at their pace — or push their limits.",
    features: ["Adjustable speed", "Helmets included", "Video analysis available"],
    link: "/baseball",
    image: "/images/sports/baseball.jpg",
    alt: "Indoor batting cages with professional pitching machines at LevelUP Sports",
  },
  {
    title: "Multi-Sport Courts",
    stat: "Competition Grade",
    description:
      "BWF-standard badminton and USAPA pickleball courts with synthetic sprung flooring, tournament LED lighting, and professional nets. Not converted tennis courts — purpose-built.",
    features: ["LED lighting", "Professional nets", "Cushioned flooring"],
    link: "/badminton",
    image: "/images/sports/badminton.jpg",
    alt: "Competition-grade badminton and pickleball courts at LevelUP Sports",
  },
  {
    title: "Cricket Nets",
    stat: "Full-Length",
    description:
      "Full-length nets with professional bowling machines. If you've been making do with tennis balls in the garage, this will feel like coming home.",
    features: ["Bowling machines", "Video analysis", "All skill levels"],
    link: "/cricket",
    image: "/images/sports/cricket.png",
    alt: "Full-length indoor cricket nets with bowling machines at LevelUP Sports",
  },
  {
    title: "Training Area",
    stat: "Multi-Purpose",
    description:
      "Dedicated space for agility training, warm-ups, and conditioning. Cones, ladders, medicine balls, and more.",
    features: ["Agility equipment", "Conditioning gear", "Kids-friendly"],
    link: "/kids-agility",
    image: "/images/sports/kids-agility.jpg",
    alt: "Multi-purpose training area for youth agility and conditioning at LevelUP Sports",
  },
];

const amenities = [
  { icon: Thermometer, title: "Climate Controlled", desc: "Year-round comfort" },
  { icon: ParkingCircle, title: "Free Parking", desc: "Spacious lot" },
  { icon: Wifi, title: "Free Wi-Fi", desc: "Stay connected" },
  { icon: ShieldCheck, title: "Safety First", desc: "First-aid trained staff" },
  { icon: Sparkles, title: "Well Maintained", desc: "Daily cleaning" },
  { icon: Accessibility, title: "Accessible", desc: "All abilities welcome" },
  { icon: Store, title: "Pro Shop", desc: "Gear & equipment" },
  { icon: Clock, title: "Extended Hours", desc: "6AM–10PM weekdays" },
];

export default function FacilitiesPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Facilities", url: "/facilities" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Hero — Full-bleed facility image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/sports/LevelUp/01-Main-Area-1.png"
          alt="Inside LevelUP Sports facility — modern indoor courts and training areas in Elkton, MD"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-neutral-900/20"
          aria-hidden="true"
        />
        <Container className="relative z-10 pb-16 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li className="text-white font-medium">Facilities</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="font-display text-hero text-white mb-4 text-balance">
              See What&apos;s Inside.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              10 courts and cages. 6 sports. 72°F year-round. Here&apos;s what
              you&apos;ll find at 701 E Pulaski Hwy.
            </p>
          </div>
        </Container>
      </section>

      {/* Facility Areas — Alternating image + text */}
      <Section size="lg">
        <Container>
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-section text-neutral-900 text-balance">
                Four world-class training zones, one roof.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-24 md:space-y-32">
            {facilityAreas.map((area, i) => (
              <Reveal
                key={area.title}
                variant={i % 2 === 0 ? "fade-right" : "fade-left"}
                delay={0.1}
              >
                <Link href={area.link} className="group block">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Image */}
                    <div
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-elevated ${
                        i % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <Image
                        src={area.image}
                        alt={area.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Content */}
                    <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-display text-subsection text-neutral-900 group-hover:text-primary transition-colors">
                          {area.title}
                        </h3>
                        <span className="text-caption font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                          {area.stat}
                        </span>
                      </div>
                      <p className="text-body-lg text-neutral-500 leading-relaxed mb-6">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {area.features.map((f) => (
                          <span
                            key={f}
                            className="text-caption text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-sm font-semibold text-accent gap-2 group-hover:gap-3 transition-all">
                        Explore {area.title}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Social Proof Stats Bar */}
      <Section variant="primary" size="sm">
        <Container>
          <Reveal variant="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "20,000+", label: "Sq Ft of Space" },
                { value: "500+", label: "Athletes Trained" },
                { value: "7", label: "Days a Week" },
                { value: "4.9★", label: "Google Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-section text-white font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Amenities */}
      <Section>
        <Container>
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Amenities
              </p>
              <h2 className="font-display text-section text-neutral-900 text-balance">
                Everything you need, nothing you don&apos;t.
              </h2>
            </div>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {amenities.map((a) => (
              <StaggerItem key={a.title} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 group-hover:bg-accent/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <a.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm font-semibold text-neutral-900">
                  {a.title}
                </p>
                <p className="text-caption text-neutral-400 mt-0.5">{a.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Testimonial Pull Quote */}
      <section className="border-t border-neutral-100">
        <Container>
          <Reveal>
            <blockquote className="py-16 md:py-24 max-w-3xl mx-auto text-center">
              <p className="font-display text-subsection text-neutral-900 leading-relaxed text-balance">
                &ldquo;The facility is world-class. My kids train baseball and
                cricket here, and the quality of coaching and equipment is better
                than anything within an hour&apos;s drive.&rdquo;
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-neutral-900">
                  — Parent of two athletes, Elkton MD
                </p>
              </footer>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Service Area — Tri-State Coverage */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                Serving the Tri-State Area
              </p>
              <h2 className="font-display text-section text-neutral-900 mb-4 text-balance">
                Athletes From Three States Train Here
              </h2>
              <p className="text-neutral-600 max-w-3xl mx-auto">
                Located at 701 E Pulaski Hwy, Elkton, MD — right off I-95
                exit 109A, at the crossroads of Maryland, Delaware, and
                Pennsylvania. Free parking and easy highway access from every
                direction.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Delaware */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-card-title text-neutral-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  Delaware
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { city: "Middletown", time: "15 min" },
                    { city: "Glasgow", time: "20 min" },
                    { city: "Newark", time: "20 min" },
                    { city: "Bear", time: "25 min" },
                    { city: "New Castle", time: "25 min" },
                    { city: "Christiana", time: "25 min" },
                    { city: "Hockessin", time: "25 min" },
                    { city: "Wilmington", time: "30 min" },
                  ].map((loc) => (
                    <li
                      key={loc.city}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-700 font-medium">
                        {loc.city}
                      </span>
                      <span className="text-neutral-400 text-xs">
                        {loc.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maryland */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-card-title text-neutral-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  Maryland
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { city: "Elkton", time: "5 min" },
                    { city: "North East", time: "10 min" },
                    { city: "Rising Sun", time: "15 min" },
                    { city: "Perryville", time: "15 min" },
                    { city: "Chesapeake City", time: "20 min" },
                    { city: "Havre de Grace", time: "25 min" },
                  ].map((loc) => (
                    <li
                      key={loc.city}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-700 font-medium">
                        {loc.city}
                      </span>
                      <span className="text-neutral-400 text-xs">
                        {loc.time}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                  Serving all of Cecil County
                </p>
              </div>

              {/* Pennsylvania */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-card-title text-neutral-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  Pennsylvania
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { city: "Kennett Square", time: "25 min" },
                    { city: "Oxford", time: "30 min" },
                  ].map((loc) => (
                    <li
                      key={loc.city}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-700 font-medium">
                        {loc.city}
                      </span>
                      <span className="text-neutral-400 text-xs">
                        {loc.time}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
                  Serving Chester County
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-center text-sm text-neutral-500 mt-8">
              Can&apos;t find your town? If you&apos;re within 30 minutes of
              Elkton, MD, we&apos;re likely your closest indoor multi-sport
              facility.{" "}
              <Link
                href="/contact"
                className="text-accent hover:text-accent-hover font-medium"
              >
                Contact us &rarr;
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABanner
        title="See It For Yourself"
        description="Schedule a facility tour or book your first session today."
        primaryCTA={{ label: "Try a Free Session", href: "/free-trial" }}
        secondaryCTA={{ label: "View Schedule", href: "/schedule" }}
      />
    </>
  );
}
