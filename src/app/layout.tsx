import type { Metadata } from "next";
import { inter, plusJakarta, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/composed/navbar";
import { Footer } from "@/components/composed/footer";
import { BackToTop } from "@/components/composed/back-to-top";
import { CookieConsent } from "@/components/composed/cookie-consent";
import { MobileBottomNav } from "@/components/composed/mobile-bottom-nav";
import { generateOrganizationLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  title: {
    default: `${SITE_CONFIG.shortName} — Premier Sports Facility in Elkton, MD`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description:
    "Sports facility in Elkton, MD. Baseball, cricket, badminton & pickleball. Expert coaching, modern courts, and youth programs. Book today.",
  keywords: [
    "sports facility Elkton MD",
    "batting cages Elkton",
    "youth sports training Maryland",
    "cricket academy Maryland",
    "pickleball courts Cecil County",
    "badminton lessons Delaware",
    "indoor sports facility",
    "LevelUP Sports",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.shortName} — Premier Sports Facility in Elkton, MD`,
    description:
      "Sports facility in Elkton, MD. Baseball, cricket, badminton & pickleball. Expert coaching, modern courts, and youth programs. Book today.",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og/default.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.shortName} — Premier Sports Facility in Elkton, MD`,
    description:
      "Sports facility in Elkton, MD. Baseball, cricket, badminton & pickleball. Expert coaching, modern courts, and youth programs. Book today.",
    images: [`${SITE_CONFIG.url}/images/og/default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLD = generateOrganizationLD();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLD),
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <CookieConsent />
        <MobileBottomNav />
      </body>
    </html>
  );
}
