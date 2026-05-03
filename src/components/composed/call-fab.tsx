"use client";

import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";
import { trackPhoneCall } from "@/lib/analytics";

export function CallFab() {
  return (
    <a
      href={`tel:${SITE_CONFIG.phone}`}
      onClick={trackPhoneCall}
      aria-label={`Call ${SITE_CONFIG.phone}`}
      className="
        group fixed z-50
        right-4 md:right-6
        bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)]
        md:bottom-6
        flex items-center gap-2
        h-14 md:h-12 px-4
        rounded-full
        bg-accent text-white
        shadow-xl shadow-accent/30
        hover:bg-accent-hover transition-colors
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30
      "
    >
      <span className="relative flex h-3 w-3 items-center justify-center" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <Phone className="h-5 w-5" aria-hidden="true" />
      <span className="font-semibold text-sm hidden sm:inline">Call Us</span>
    </a>
  );
}
