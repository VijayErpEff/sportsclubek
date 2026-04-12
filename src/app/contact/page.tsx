import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MapEmbed } from "@/components/composed/map-embed";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/composed/contact-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us — Sports Facility in Elkton, MD",
  description:
    "Get in touch with LevelUp Sports in Elkton, MD. Call (443) 406-6494, email, or visit us at 701 E Pulaski Hwy. Bookings, questions, and directions.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Header */}
      <Section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-neutral-500 mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="text-neutral-900 font-medium">Contact</li>
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Get in Touch
          </h1>
          <p className="mt-2 text-lg text-neutral-600 max-w-2xl">
            Have a question, want to book a session, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </Container>
      </Section>

      {/* Contact Info + Form */}
      <Section className="py-8 md:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Details */}
            <Reveal variant="fade-right">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-5">
                  Contact Information
                </h2>
                <p className="text-neutral-600 mb-6">
                  Reach out by phone, email, or stop by our facility in Elkton, MD.
                </p>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Phone className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900">Phone</h3>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="text-sm text-neutral-600 hover:text-primary transition-colors"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Mail className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900">Email</h3>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-sm text-neutral-600 hover:text-primary transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900">Address</h3>
                      <p className="text-sm text-neutral-600">{SITE_CONFIG.address.full}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900">Hours</h3>
                      <div className="text-sm text-neutral-600 space-y-0.5">
                        <p>Mon&ndash;Sat: {SITE_CONFIG.hours.weekday}</p>
                        <p>Sunday: {SITE_CONFIG.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal variant="fade-left" delay={0.15}>
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-5">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section className="py-8 md:py-12 bg-neutral-50">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">
              Find Us
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <MapEmbed />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
