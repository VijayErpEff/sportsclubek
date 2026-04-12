import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for LevelUp Sports & Athletics Club in Elkton, MD. Facility usage rules, booking policies, membership terms, and liability information.",
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <section className="pt-28 md:pt-32 pb-6">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Terms of Service</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-neutral-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-neutral-500 text-sm">
            Last updated: April 8, 2026
          </p>
        </Container>
      </section>

      <Section size="sm">
        <Container className="max-w-3xl">
          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-[15px]">
            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Agreement to Terms
              </h2>
              <p>
                By accessing or using the LevelUp Sports &amp; Athletics Club website ({" "}
                <Link href="/" className="text-accent hover:text-accent-hover">
                  levelupsports.us
                </Link>
                ) or visiting our facility at {SITE_CONFIG.address.full}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Facility Usage &amp; Code of Conduct
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All participants must check in at the front desk before using any court, cage, or training area</li>
                <li>Clean, non-marking indoor athletic shoes are required on all courts</li>
                <li>Children under 12 must have a parent or guardian present on-site at all times</li>
                <li>Helmets are mandatory in batting cages and are provided free of charge</li>
                <li>Equipment provided by LevelUp Sports must be used responsibly and returned after each session</li>
                <li>Abusive, threatening, or unsportsmanlike behavior toward staff, coaches, or other members will result in removal from the facility and potential membership termination</li>
                <li>LevelUp Sports reserves the right to refuse service to anyone who violates these rules</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Liability Waiver &amp; Assumption of Risk
              </h2>
              <p>
                All participants (or a parent/guardian for minors under 18) must complete a liability waiver before their first session. Participation in sports and athletic activities involves inherent risks including but not limited to strains, sprains, fractures, and other injuries. By using our facility, you acknowledge and accept these risks.
              </p>
              <p className="mt-3">
                LevelUp Sports &amp; Athletics Club maintains comprehensive general liability insurance and sports accident coverage. First-aid trained staff are on-site during all operating hours. An AED (automated external defibrillator) is available on the premises.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Bookings &amp; Cancellation Policy
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Court and cage rentals can be cancelled up to 24 hours in advance for a full refund</li>
                <li>Cancellations within 24 hours may be rescheduled to another available slot but are not refundable</li>
                <li>No-shows forfeit the full session fee</li>
                <li>Online bookings are processed through our partner, Upper Hand. Their terms of service also apply to transactions made through their platform</li>
                <li>Walk-in sessions are subject to court and cage availability</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Membership Terms
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All memberships are month-to-month with no long-term contracts</li>
                <li>Memberships can be cancelled with 30 days&rsquo; written notice — no cancellation fees apply</li>
                <li>Members may freeze their membership for up to 2 months per calendar year at no cost, with 7 days&rsquo; advance notice</li>
                <li>Membership fees are billed monthly to the card on file</li>
                <li>Membership benefits are non-transferable and for the named member only, unless part of a family plan</li>
                <li>LevelUp Sports reserves the right to adjust pricing with 30 days&rsquo; notice to current members</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Academy &amp; Program Enrollment
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Academy programs (baseball, cricket, badminton, volleyball, soccer, kids agility) are sold in session packages</li>
                <li>Missed sessions due to participant absence are not refundable or transferable unless the program is cancelled by LevelUp Sports</li>
                <li>LevelUp Sports reserves the right to reschedule or cancel sessions due to staffing, weather emergencies, or low enrollment, with full credit or refund provided</li>
                <li>Academy coaches may adjust program content based on participant skill levels and group needs</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Website Terms
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All content on this website — text, images, logos, and design — is the property of LevelUp Sports &amp; Athletics Club and may not be reproduced without written permission</li>
                <li>We strive to keep website information accurate and up-to-date, but do not guarantee that all content is current at all times. Pricing, schedules, and program details are subject to change</li>
                <li>Links to third-party websites are provided for convenience. We are not responsible for the content or practices of external sites</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by Maryland law, LevelUp Sports &amp; Athletics Club shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our facility or website. Our total liability for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Governing Law
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the State of Maryland, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved in the courts of Cecil County, Maryland.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Service from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website or facility after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Contact Us
              </h2>
              <p>
                Questions about these terms? Contact us:
              </p>
              <ul className="list-none pl-0 space-y-1 mt-2">
                <li><strong>{SITE_CONFIG.name}</strong></li>
                <li>{SITE_CONFIG.address.full}</li>
                <li>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover">{SITE_CONFIG.email}</a></li>
                <li>Phone: <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="text-accent hover:text-accent-hover">{SITE_CONFIG.phone}</a></li>
              </ul>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
