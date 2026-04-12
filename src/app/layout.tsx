import type { Metadata } from "next";
import { inter, plusJakarta, jetbrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/composed/navbar";
import { Footer } from "@/components/composed/footer";
import { BackToTop } from "@/components/composed/back-to-top";
import { CookieConsent } from "@/components/composed/cookie-consent";
import { MobileBottomNav } from "@/components/composed/mobile-bottom-nav";
import { SportPreference } from "@/components/composed/sport-preference";
import { ReturningVisitor } from "@/components/composed/returning-visitor";
import { SurveyBanner } from "@/components/composed/survey-banner";
import { ScrollProgressBar } from "@/components/ui/progress-bar";
import { AnnouncementBanner } from "@/components/composed/announcement-banner";
import { Suspense } from "react";
import { generateOrganizationLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { AdminProvider } from "@/lib/context/admin-context";
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
    "Premier indoor sports facility in Elkton, MD — 15 min from Middletown & Newark, DE. Batting cages, cricket nets, badminton & pickleball courts. Youth academies, expert coaching, court rentals. Open 7 days.",
  keywords: [
    "sports facility Elkton MD",
    "batting cages Elkton",
    "youth sports training Maryland",
    "cricket academy Maryland",
    "pickleball courts Cecil County",
    "badminton lessons Delaware",
    "indoor sports facility",
    "LevelUP Sports",
    "indoor sports Middletown DE",
    "batting cages near Middletown Delaware",
    "cricket facility Newark DE",
    "pickleball courts near me",
    "badminton courts Wilmington DE",
    "youth baseball near Middletown DE",
    "indoor sports facility near Newark Delaware",
    "sports facility near Wilmington DE",
    "batting cages Cecil County MD",
    "cricket academy near me",
    "indoor batting cages Delaware",
    "kids sports programs Elkton",
    "pickleball near Middletown DE",
    "sports near Bear DE",
    "sports training tri-state area MD DE PA",
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
      "Premier indoor sports facility in Elkton, MD — 15 min from Middletown & Newark, DE. Batting cages, cricket nets, badminton & pickleball courts. Youth academies & court rentals. Open 7 days.",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/sports/facility.jpg`,
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
      "Premier indoor sports facility in Elkton, MD — 15 min from Middletown & Newark, DE. Batting cages, cricket nets, badminton & pickleball courts. Youth academies & court rentals. Open 7 days.",
    images: [`${SITE_CONFIG.url}/images/sports/facility.jpg`],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
    },
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site information" />
        <link rel="preload" href="/images/sports/LevelUp/01-Main-Area-1.jpg" as="image" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLD),
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`
            }} />
          </>
        )}
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Suspense>
          <AdminProvider>
            <ScrollProgressBar />
            <AnnouncementBanner />
            <Navbar />
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
            <BackToTop />
            <CookieConsent />
            <MobileBottomNav />
            <SportPreference />
            <ReturningVisitor />
            <SurveyBanner />
          </AdminProvider>
        </Suspense>
      </body>
    </html>
  );
}
