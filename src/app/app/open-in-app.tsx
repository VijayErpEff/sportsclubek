"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { APP, appUrl } from "@/lib/constants/app";
import { trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type Platform = "ios" | "android" | "desktop";

/**
 * An earlier version remembered "this device has the app" and auto-redirected
 * on later visits. It backfired: the flag was set by the visitor *claiming* to
 * have the app, not by the app actually opening, so one tap on a device without
 * it — or on iOS, where the Universal Link cannot resolve until an
 * apple-app-site-association file is served from app.levelupsports.us — pinned
 * that device to the browser and it never saw the store again. Cleared on sight.
 */
const LEGACY_INSTALLED_KEY = "levelup:app-installed";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  // iPadOS 13+ masquerades as macOS; touch points give it away.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "desktop";
}

/**
 * Where "open the app" goes. Whenever the app cannot be opened, the fallback
 * is the store listing — never the browser.
 *
 * Android: an intent:// link. Chrome hands it to the app when the package is
 * installed and follows browser_fallback_url when it is not, so pointing that
 * fallback at Google Play gets "app if installed, download if not" natively.
 *
 * iOS: the App Store listing, which shows OPEN when the app is installed and
 * GET when it is not — the same two outcomes, handled by iOS itself. A plain
 * https Universal Link would be a more direct open, but its miss case is
 * Safari, not the App Store, and it cannot resolve to the app at all until
 * app.levelupsports.us serves an apple-app-site-association file. Once that
 * file is live, switch this to appUrl(path) for a one-hop open.
 */
function openHref(platform: Platform, path: string): string {
  if (platform === "android") {
    const fallback = encodeURIComponent(APP.android);
    return `intent://${APP.host}${path}#Intent;scheme=https;package=${APP.androidPackage};S.browser_fallback_url=${fallback};end`;
  }
  return APP.ios;
}

interface Props {
  /** Path inside the app to land on once it opens */
  path: string;
  /** GA4 attribution label */
  context: string;
}

/**
 * The only part of the download page that depends on the device: an
 * "open the app" shortcut for people who already have it, plus the browser
 * escape hatch. Everything else renders on the server.
 *
 * Nothing here navigates on its own — the store badges are the point of the
 * page, so it never redirects out from under someone.
 */
export function OpenInApp({ path, context }: Props) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
    try {
      window.localStorage.removeItem(LEGACY_INSTALLED_KEY);
    } catch {
      // Private mode / blocked storage — nothing to clear.
    }
  }, []);

  const webHref = appUrl(path);

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      {platform !== null && platform !== "desktop" && (
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          asChild
        >
          <a
            href={openHref(platform, path)}
            onClick={() => trackCTAClick(`Open app (${platform})`, context)}
          >
            Already have it? Open the app
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </Button>
      )}

      <a
        href={webHref}
        className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onClick={() => trackCTAClick("Continue in browser", webHref)}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        Don&rsquo;t want the app? Use the web version
      </a>
    </div>
  );
}
