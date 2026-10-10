"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, getConsent, type ConsentState } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Meta's base snippet, minus the auto PageView (route changes send their own). */
function loadPixel(id: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", id);
}

/**
 * Meta Pixel (Facebook + Instagram ads). Loads only after the visitor accepts
 * marketing cookies, and only when NEXT_PUBLIC_META_PIXEL_ID is set. Also keeps
 * GA Consent Mode in step with the banner. Conversion events are sent from
 * `@/lib/analytics`.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const [marketing, setMarketing] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const apply = (state: ConsentState | null) => {
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (state && gtag) {
        gtag("consent", "update", {
          analytics_storage: state.analytics ? "granted" : "denied",
          ad_storage: state.marketing ? "granted" : "denied",
          ad_user_data: state.marketing ? "granted" : "denied",
          ad_personalization: state.marketing ? "granted" : "denied",
        });
      }
      // Withdrawn consent: stop sending from this page. The script can't be
      // unloaded, so revoke and let the next page load skip it entirely.
      if (!state?.marketing && window.fbq) window.fbq("consent", "revoke");
      setMarketing(Boolean(state?.marketing));
    };
    apply(getConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  useEffect(() => {
    if (!PIXEL_ID || !marketing) return;
    loadPixel(PIXEL_ID);
    window.fbq?.("consent", "grant");
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq?.("track", "PageView");
  }, [marketing, pathname]);

  return null;
}
