import { Metadata } from "next";
import { FeatureCard } from "@/components/composed/feature-card";
import { CTABanner } from "@/components/composed/cta-banner";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import {
  Thermometer,
  ParkingCircle,
  Wifi,
  ShieldCheck,
  Sparkles,
  Accessibility,
  Store,
  Clock,
} from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Facilities",
  description:
    "Tour LevelUP Sports' modern indoor facility in Elkton, MD. Professional batting cages, multi-sport courts, training areas, pro shop, and climate-controlled comfort.",
  path: "/facilities",
});

const amenities = [
  {
    icon: Thermometer,
    title: "Climate Controlled",
    description: "Train in comfort year-round with our fully climate-controlled indoor facility.",
  },
  {
    icon: ParkingCircle,
    title: "Free Parking",
    description: "Spacious parking lot with plenty of spots for all visitors.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected while your athletes train. Free high-speed Wi-Fi throughout.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "Professional-grade safety equipment, first-aid trained staff, and secure facility.",
  },
  {
    icon: Sparkles,
    title: "Well Maintained",
    description: "Daily cleaning and regular equipment maintenance for the best experience.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "Wheelchair accessible facility with accommodations for all abilities.",
  },
  {
    icon: Store,
    title: "Pro Shop",
    description: "Essential equipment, gear, and accessories for all four sports on-site.",
  },
  {
    icon: Clock,
    title: "Extended Hours",
    description: "Open early, close late. Weekdays 6 AM-10 PM, weekends from 7 AM.",
  },
];

const facilityAreas = [
  {
    title: "Batting Cages",
    description:
      "Four professional-grade indoor batting cages with adjustable pitching machines. Speed settings from 30-80 MPH to accommodate all ages and skill levels. Helmets provided.",
    features: ["4 cages", "Adjustable speed", "Helmets included", "All ages welcome"],
  },
  {
    title: "Multi-Sport Courts",
    description:
      "Competition-grade courts marked for badminton and pickleball. Professional-quality nets, LED lighting, and shock-absorbing flooring for player comfort and safety.",
    features: ["Competition-grade", "LED lighting", "Professional nets", "Cushioned flooring"],
  },
  {
    title: "Cricket Nets",
    description:
      "Indoor cricket practice nets with bowling machines and coaching technology. Suitable for batting, bowling, and fielding practice in a controlled environment.",
    features: ["Bowling machines", "Full-length nets", "Video analysis", "All skill levels"],
  },
  {
    title: "Training Area",
    description:
      "Dedicated space for agility training, warm-ups, and fitness conditioning. Equipped with cones, ladders, medicine balls, and other training essentials.",
    features: ["Agility equipment", "Warm-up space", "Conditioning gear", "Kids-friendly"],
  },
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

      {/* Slim Header */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light pt-[76px] pb-5">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-2">
            <ol className="flex items-center gap-1.5">
              <li><a href="/" className="hover:text-white/70 transition-colors">Home</a></li>
              <li>/</li>
              <li aria-current="page" className="text-white/60">Facilities</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-white">
            Indoor Sports Facility in Elkton, MD
          </h1>
          <p className="text-white/60 mt-1 text-sm max-w-xl">
            Modern, indoor, climate-controlled — built for athletes who take their game seriously.
          </p>
        </Container>
      </div>

      {/* Facility Areas */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              Explore Our Facility
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Every area of our facility is designed for peak performance and comfort.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {facilityAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-card"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                  <span className="text-6xl font-display font-bold text-primary/10">
                    {area.title.split(" ")[0]}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-subsection text-neutral-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-medium bg-primary/5 text-primary px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Amenities */}
      <Section variant="alternate">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-section text-neutral-900 mb-4">
              Amenities
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity) => (
              <FeatureCard key={amenity.title} {...amenity} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner
        title="See It For Yourself"
        description="Schedule a facility tour or book your first session today."
        primaryCTA={{ label: "Book a Session", href: "/schedule" }}
        secondaryCTA={{ label: "View Schedule", href: "/schedule" }}
      />
    </>
  );
}
