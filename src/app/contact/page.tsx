import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/composed/hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { MapEmbed } from "@/components/composed/map-embed";
import { Reveal } from "@/components/ui/reveal";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description:
    "Get in touch with LevelUP Sports & Athletics Club in Elkton, MD. Call, email, or visit us. We're here to help with bookings, questions, and more.",
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

      <Hero
        title="Get in Touch"
        subtitle="Have a question, want to book a session, or just want to say hello? We'd love to hear from you."
      />

      {/* Breadcrumb */}
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
              <li aria-current="page" className="text-neutral-900 font-medium">
                Contact
              </li>
            </ol>
          </nav>
        </Container>
      </Section>

      {/* Contact Info + Form */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Details */}
            <Reveal variant="fade-right">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance">
                Contact Information
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Reach out by phone, email, or stop by our facility in Elkton,
                MD. We&apos;re happy to answer questions about programs,
                memberships, bookings, or anything else.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Phone</h3>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-neutral-600 hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Email</h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-neutral-600 hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Address</h3>
                    <p className="text-neutral-600">
                      {SITE_CONFIG.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Hours</h3>
                    <div className="text-neutral-600 text-sm space-y-1">
                      <p>Mon&ndash;Fri: {SITE_CONFIG.hours.weekday}</p>
                      <p>Saturday: {SITE_CONFIG.hours.saturday}</p>
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
              <h2 className="text-3xl font-bold tracking-tight mb-6 text-balance">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section variant="alternate">
        <Container>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center text-balance">
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

function ContactForm() {
  return (
    <form
      action="/api/contact"
      method="POST"
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-neutral-900 mb-1.5"
          >
            Name <span className="text-error">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-neutral-900 mb-1.5"
          >
            Email <span className="text-error">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-neutral-900 mb-1.5"
        >
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-neutral-900 mb-1.5"
        >
          Subject <span className="text-error">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          defaultValue=""
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="booking">Booking &amp; Reservations</option>
          <option value="membership">Memberships</option>
          <option value="academy">Academy Programs</option>
          <option value="careers">Careers &amp; Employment</option>
          <option value="events">Events &amp; Open House</option>
          <option value="offers">Offers &amp; Promotions</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-neutral-900 mb-1.5"
        >
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
}
