/**
 * Cookie-consent state shared by the consent banner and the tracking scripts.
 *
 * The banner writes the `cookie-consent` cookie and fires CONSENT_EVENT; GA
 * (Consent Mode) and the Meta Pixel listen for it so a choice takes effect
 * without a reload.
 */

export const CONSENT_COOKIE = "cookie-consent";
export const CONSENT_EVENT = "levelup:consent-change";
/** Fired by the footer "Cookie settings" link to reopen the preferences dialog. */
export const OPEN_CONSENT_EVENT = "levelup:open-cookie-settings";

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/** The visitor's saved choice, or null when they haven't chosen yet. */
export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ConsentState;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState) {
  const maxAge = 365 * 24 * 60 * 60; // 1 year
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))};path=/;max-age=${maxAge};SameSite=Lax`;
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
}
