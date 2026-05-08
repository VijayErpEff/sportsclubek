"use client";

import dynamic from "next/dynamic";

// Post-paint UI overlays. None of these contribute SEO content (they appear
// on scroll, after a delay, or only for returning users), so we skip SSR and
// keep their JS out of the initial bundle that gates LCP / TBT.

const BackToTop = dynamic(
  () => import("./back-to-top").then((m) => ({ default: m.BackToTop })),
  { ssr: false },
);

const CookieConsent = dynamic(
  () => import("./cookie-consent").then((m) => ({ default: m.CookieConsent })),
  { ssr: false },
);

const SportPreference = dynamic(
  () =>
    import("./sport-preference").then((m) => ({ default: m.SportPreference })),
  { ssr: false },
);

const ReturningVisitor = dynamic(
  () =>
    import("./returning-visitor").then((m) => ({
      default: m.ReturningVisitor,
    })),
  { ssr: false },
);

const SurveyBanner = dynamic(
  () => import("./survey-banner").then((m) => ({ default: m.SurveyBanner })),
  { ssr: false },
);

const ScrollProgressBar = dynamic(
  () =>
    import("@/components/ui/progress-bar").then((m) => ({
      default: m.ScrollProgressBar,
    })),
  { ssr: false },
);

export function DeferredOverlays() {
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
      <CookieConsent />
      <SportPreference />
      <ReturningVisitor />
      <SurveyBanner />
    </>
  );
}
