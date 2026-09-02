"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { APP, appUrl } from "@/lib/constants/app";
import { trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type Platform = "ios" | "android" | "desktop";

/** Remembers that this device opened the native app, so we skip the prompt next time. */
const INSTALLED_KEY = "levelup:app-installed";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  // iPadOS 13+ masquerades as macOS; touch points give it away.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "desktop";
}

/**
 * Where "open the app" goes.
 *
 * Android gets an intent:// link: Chrome hands it to the app when the package
 * is installed and follows browser_fallback_url when it is not.
 * iOS gets the plain https URL, which iOS routes to the app as a Universal Link
 * when installed and to Safari when not. Either way: app if present, browser if
 * not.
 */
function openHref(platform: Platform, path: string): string {
  const web = appUrl(path);
  if (platform !== "android") return web;
  const fallback = encodeURIComponent(web);
  return `intent://${APP.host}${path}#Intent;scheme=https;package=${APP.androidPackage};S.browser_fallback_url=${fallback};end`;
}

interface Props {
  /** Path inside the app to land on once it opens */
  path: string;
  /** GA4 attribution label */
  context: string;
  /** ?choose=1 — always show this page, never auto-open */
  forceChooser: boolean;
}

/**
 * The only part of the download page that depends on the device: an
 * "open the app" shortcut for people who already have it, plus the browser
 * escape hatch. Everything else renders on the server.
 */
export function OpenInApp({ path, context, forceChooser }: Props) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  const open = useCallback(
    (p: Platform) => {
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {
        // Private mode / blocked storage — the link still works.
      }
      window.location.href = openHref(p, path);
    },
    [path]
  );

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    if (forceChooser) {
      try {
        window.localStorage.removeItem(INSTALLED_KEY);
      } catch {
        // Nothing to clear.
      }
      return;
    }

    // Returning visitors who already opened the app once go straight back in.
    if (p === "desktop") return;
    let remembered = false;
    try {
      remembered = window.localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      remembered = false;
    }
    if (remembered) open(p);
  }, [forceChooser, open, path]);

  const webHref = appUrl(path);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      {platform !== null && platform !== "desktop" && (
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            trackCTAClick(`Open app (${platform})`, context);
            open(platform);
          }}
        >
          Already have it? Open the app
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}

      <a
        href={webHref}
        className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onClick={() => trackCTAClick("Continue in browser", webHref)}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        Continue in your browser
      </a>
    </div>
  );
}
