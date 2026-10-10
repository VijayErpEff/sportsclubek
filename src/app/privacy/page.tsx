import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for LevelUP Sports & Athletics Club in Elkton, MD. How we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
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
              <li className="text-neutral-600 font-medium">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-neutral-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-sm">
            Last updated: October 10, 2026
          </p>
        </Container>
      </section>

      <Section size="sm">
        <Container className="max-w-3xl">
          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-[15px]">
            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Introduction
              </h2>
              <p>
                LevelUP Sports &amp; Athletics Club (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website{" "}
                <Link href="/" className="text-accent hover:text-accent-hover">
                  levelupsports.us
                </Link>{" "}
                and the physical facility located at {SITE_CONFIG.address.full}. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Information We Collect
              </h2>
              <h3 className="font-semibold text-neutral-900 mt-4 mb-2">Information You Provide</h3>
              <p>We collect information you voluntarily provide when you:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Book a court, cage, or session through our booking platform</li>
                <li>Sign up for a membership</li>
                <li>Fill out a contact form, tour request, or survey</li>
                <li>Subscribe to our newsletter or training guide</li>
                <li>Register yourself or a team for a tournament, league, camp, open house, or other event</li>
                <li>Sign a liability waiver, membership agreement, or consent form</li>
                <li>Apply for a job</li>
              </ul>
              <p className="mt-3">
                This may include your name, email address, phone number, date of birth or age, emergency contact, team and roster details, survey answers, and payment information. For minors, we collect this from a parent or guardian. Bookings and payments are handled in the LevelUP Sports &amp; Athletics app and its payment processor (Stripe) — we never see or store full card numbers.
              </p>

              <h3 className="font-semibold text-neutral-900 mt-4 mb-2">Information Collected Automatically</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Device and browser type, operating system, and screen resolution</li>
                <li>IP address and approximate geographic location</li>
                <li>Pages visited, time spent on pages, and navigation patterns</li>
                <li>Referring website or search terms that brought you to our site</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Process bookings, memberships, and payments</li>
                <li>Communicate with you about your account, sessions, and schedule changes</li>
                <li>Send promotional offers and newsletter content (only if you opted in)</li>
                <li>Improve our website, facility, and programs based on usage patterns and feedback</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Third-Party Services
              </h2>
              <p>We use the following third-party services that may collect data:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>
                  <strong>Google Analytics 4 (GA4)</strong> — website traffic analysis. Google may collect cookies and usage data. See{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                    Google&rsquo;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Meta Pixel (Facebook and Instagram)</strong> — measures how our Facebook and
                  Instagram ads perform and lets us show ads to people who have visited our site. It
                  loads only if you accept marketing cookies, and you can withdraw that choice at any
                  time. See{" "}
                  <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                    Meta&rsquo;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>LevelUP Sports &amp; Athletics app</strong> — our own booking,
                  scheduling, and payment platform at app.levelupsports.us and in the iOS and
                  Android apps. Account and booking data you enter there is covered by this policy.
                </li>
                <li>
                  <strong>Apple App Store and Google Play</strong> — app distribution. Each store
                  collects its own download and device data under its own policy.
                </li>
                <li>
                  <strong>Stripe</strong> — card payments for tournament entries and in the LevelUP
                  app. Stripe receives your card details directly; we never see or store full card
                  numbers. See{" "}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                    Stripe&rsquo;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Azure Communication Services</strong> — sends our transactional email
                  (confirmations, waivers, receipts).
                </li>
                <li>
                  <strong>Vercel / Netlify</strong> — website hosting and content delivery.
                </li>
                <li>
                  <strong>Google Maps</strong> — embedded maps on our contact and facilities pages.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or share your personal information with third parties for their own marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Cookies
              </h2>
              <p>
                Our website uses cookies and similar technologies for analytics (Google Analytics), for advertising measurement (the Meta Pixel, only if you accept marketing cookies), and to remember your preferences. You choose which categories to allow in the cookie banner, and you can also control cookies through your browser settings. Disabling cookies may affect some website functionality but will not prevent you from using our core services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information, including HTTPS encryption for all website traffic, secure hosting infrastructure, and access controls for staff. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security. To the fullest extent permitted by law, we are not liable for unauthorized access, loss, or disclosure of information that occurs despite these measures, including through a third-party service, and your use of our website and app is subject to the limitation of liability in our{" "}
                <Link href="/terms#liability" className="text-accent hover:text-accent-hover">Terms of Service</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Email, Text Message &amp; Call Consent
              </h2>
              <p>
                When you give us your email on a form, you agree to receive emails from us about your inquiry, bookings, and account, and — where the form says so — our newsletter and offers. Every marketing email has an unsubscribe link.
              </p>
              <p className="mt-3">
                When you give us your phone number, you consent to receive calls and text messages from LevelUP Sports at that number, including automated or pre-recorded messages, about your inquiry, bookings, programs, and offers. Consent is not a condition of any purchase. Message and data rates may apply; message frequency varies. Reply <strong>STOP</strong> to any text to opt out and <strong>HELP</strong> for help, or email{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover">{SITE_CONFIG.email}</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Where Your Information Is Stored &amp; How Long We Keep It
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Form submissions, leads, survey answers, and newsletter sign-ups are stored in our hosted database (Upstash Redis) and may be copied to a private Google Sheet used by our staff to follow up.</li>
                <li>Accounts, bookings, memberships, rosters, and payment records are stored in the LevelUP app. Card details are held only by Stripe.</li>
                <li>Signed waivers, consents, and membership agreements are kept with the version of the text you agreed to, the date and time, and your IP address, so we can prove what was agreed.</li>
                <li>We keep leads and marketing data until you ask us to delete it or it has been inactive for 3 years. We keep booking, payment, and account records for 7 years for tax and accounting purposes. We keep signed waivers and consents for at least 5 years after your last visit — and, for a minor, until 3 years after they turn 18 — because that is how long a claim could be brought.</li>
                <li>We may keep information longer where the law requires or where it is needed for a dispute.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Children&rsquo;s Privacy
              </h2>
              <p>
                Our programs serve youth athletes ages 5 and up. Our website and app are not directed to children under 13, and we do not knowingly collect information online directly from a child under 13. Information about a minor (name, age, emergency contact, medical notes relevant to participation, photos) is collected from and with the consent of a parent or legal guardian through membership, enrollment, waiver, or event registration. Parents and guardians may contact us at any time to review, update, or request deletion of their child&rsquo;s information. If you believe a child under 13 has given us information directly, email us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Opt out of the use of your photo or likeness in future marketing (we cannot recall material already published)</li>
              </ul>
              <p className="mt-3">
                We do not sell personal information, and we do not share it with third parties for their own targeted advertising. Residents of Maryland and other states with privacy laws may exercise the rights those laws give them by contacting us; we will verify your identity before acting on a request and respond within the time the law requires. You will not be treated differently for exercising a right.
              </p>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover">
                  {SITE_CONFIG.email}
                </a>{" "}
                or call{" "}
                <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="text-accent hover:text-accent-hover">
                  {SITE_CONFIG.phone}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900 mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, contact us:
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
