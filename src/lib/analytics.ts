/**
 * GA4 Analytics — centralized event tracking for LevelUP Sports.
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

/** Fires when the sticky/floating "Book a Court" CTA is clicked. */
export function trackBookingCTAClick(source_page: string) {
  send({ action: "booking_cta_click", params: { source_page } });
}

/** Fires when /schedule is viewed or the booking widget is opened. */
export function trackBookingStarted(source: string) {
  send({ action: "booking_started", params: { source } });
}

/** Fires after a successful booking submission. Mark as a key event in GA4. */
export function trackBookingCompleted(params: {
  sport: string;
  court_id?: string;
  value?: number;
}) {
  send({
    action: "booking_completed",
    params: {
      sport_name: params.sport,
      court_id: params.court_id ?? "",
      value: params.value ?? 0,
      currency: "USD",
    },
  });
}

export function trackFreeTrialStart(sport?: string) {
  send({ action: "free_trial_start", params: { sport_name: sport ?? "any" } });
}

/** Fires when a "Get Directions" link is clicked. Key local-intent signal. */
export function trackDirectionsClick(source: string) {
  send({ action: "directions_click", params: { source } });
}

/** Fires on membership tier CTA click or inquiry-form open. */
export function trackMembershipInquiry(tier: string) {
  send({ action: "membership_inquiry", params: { tier_name: tier } });
}

/** Fires when a sport tile/card is clicked from any page. */
export function trackSportCardClick(sport: string, source_page: string) {
  send({
    action: "sport_card_click",
    params: { sport_name: sport, source_page },
  });
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
