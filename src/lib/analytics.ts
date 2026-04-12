/**
 * GA4 Analytics — centralized event tracking for LevelUp Sports.
 *
 * All events flow to Google Analytics 4 via gtag().
 * Set NEXT_PUBLIC_GA_ID in your environment to enable.
 *
 * Naming convention: snake_case, prefixed by category.
 * See https://support.google.com/analytics/answer/9267735 for GA4 limits.
 */

type GtagEvent = {
  action: string;
  params?: Record<string, string | number | boolean>;
};

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag(...args);
  }
}

function send({ action, params }: GtagEvent) {
  gtag("event", action, params);
}

// ── CTA & Navigation ─────────────────────────────────────────────────────────

export function trackCTAClick(label: string, destination: string) {
  send({ action: "cta_click", params: { cta_label: label, destination } });
}

export function trackNavClick(label: string, destination: string) {
  send({ action: "nav_click", params: { nav_label: label, destination } });
}

// ── Sport Interest ───────────────────────────────────────────────────────────

export function trackSportView(sport: string) {
  send({ action: "sport_view", params: { sport_name: sport } });
}

export function trackAcademyView(academy: string) {
  send({ action: "academy_view", params: { academy_name: academy } });
}

// ── Booking & Conversion ─────────────────────────────────────────────────────

export function trackBookingClick(sport: string, program: string) {
  send({
    action: "booking_click",
    params: { sport_name: sport, program_name: program },
  });
}

export function trackFreeTrialStart(sport?: string) {
  send({ action: "free_trial_start", params: { sport_name: sport ?? "any" } });
}

// ── Forms ────────────────────────────────────────────────────────────────────

export function trackFormSubmit(formName: string) {
  send({ action: "form_submit", params: { form_name: formName } });
}

export function trackNewsletterSignup() {
  send({ action: "newsletter_signup", params: {} });
}

// ── Engagement ───────────────────────────────────────────────────────────────

export function trackReferralCopy() {
  send({ action: "referral_link_copy", params: {} });
}

export function trackBannerClick(bannerName: string, action: string) {
  send({
    action: "banner_interaction",
    params: { banner_name: bannerName, interaction: action },
  });
}

export function trackScheduleView(sport?: string) {
  send({ action: "schedule_view", params: { sport_filter: sport ?? "all" } });
}

export function trackPhoneCall() {
  send({ action: "phone_call_click", params: {} });
}

export function trackSocialClick(platform: string) {
  send({ action: "social_click", params: { platform } });
}

export function trackCourtStatusView() {
  send({ action: "court_status_view", params: {} });
}

// ── Survey ──────────────────────────────────────────────────────────────────

export function trackSurveyStart() {
  send({ action: "survey_start", params: {} });
}

export function trackSurveyStep(step: number) {
  send({ action: "survey_step", params: { step_number: step } });
}

export function trackSurveyComplete() {
  send({ action: "survey_complete", params: {} });
}

export function trackSurveyAbandon(lastStep: number) {
  send({ action: "survey_abandon", params: { last_step: lastStep } });
}
