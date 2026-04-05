"use client";

import { useEffect } from "react";

interface TrackEventProps {
  action: string;
  params?: Record<string, string>;
}

export function TrackEvent({ action, params }: TrackEventProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag(
        "event",
        action,
        params
      );
    }
  }, [action, params]);

  return null;
}
