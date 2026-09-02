"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CalendarCheck, Check, CreditCard, Globe, Loader2 } from "lucide-react";
import { APP, appUrl } from "@/lib/constants/app";
import { SITE_CONFIG } from "@/lib/constants/site";
import { trackCTAClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type Platform = "ios" | "android" | "desktop";

/** Remembers that this device opened the native app, so we skip the chooser next time. */
const INSTALLED_KEY = "levelup:app-installed";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  // iPadOS 13+ masquerades as macOS; touch points give it away.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "desktop";
}

/** Only same-origin app paths are honoured — never a caller-supplied host. */
function safePath(raw: string | null): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

/**
 * Where "Open in the app" goes.
 *
 * Android gets an intent:// link: Chrome hands it to the app when the package
 * is installed and follows browser_fallback_url when it is not.
 * iOS gets the plain https URL, which iOS routes to the app as a Universal Link
 * when it is installed and to Safari when it is not. Either way: app if present,
 * browser if not.
 */
function openHref(platform: Platform, path: string): string {
  const web = appUrl(path);
  if (platform !== "android") return web;
  const fallback = encodeURIComponent(web);
  return `intent://${APP.host}${path}#Intent;scheme=https;package=${APP.androidPackage};S.browser_fallback_url=${fallback};end`;
}

const APP_DOES = [
  { icon: CalendarCheck, label: "Book courts, cages, and sessions" },
  { icon: CreditCard, label: "Manage your membership and passes" },
  { icon: Check, label: "Check in and track your schedule" },
];

export function AppLauncher() {
  const params = useSearchParams();
  const path = safePath(params.get("to"));
  const context = params.get("c") ?? "app";
  /** ?choose=1 always shows the chooser — the way back for anyone whose
      remembered "I already have it" turned out not to be true. */
  const forceChooser = params.get("choose") === "1";

  const [platform, setPlatform] = useState<Platform | null>(null);

  const open = useCallback(
    (p: Platform) => {
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {
        // Private mode / blocked storage — the link below still works.
      }
      window.location.href = openHref(p, path);
    },
    [path]
  );

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    // Desktop has no app to install — go straight to the web version.
    if (p === "desktop") {
      window.location.replace(appUrl(path));
      return;
    }

    // Returning visitors who already opened the app once skip the chooser.
    if (forceChooser) {
      try {
        window.localStorage.removeItem(INSTALLED_KEY);
      } catch {
        // Nothing to clear.
      }
      return;
    }
    let remembered = false;
    try {
      remembered = window.localStorage.getItem(INSTALLED_KEY) === "1";
    } catch {
      remembered = false;
    }
    if (remembered) open(p);
  }, [forceChooser, open, path]);

  if (platform === null || platform === "desktop") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-primary-dark px-6">
        <p className="flex items-center gap-3 text-neutral-200 font-display font-semibold">
          <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Opening the LevelUP app&hellip;
        </p>
        <span className="sr-only" role="status">
          Redirecting to the LevelUP member app.
        </span>
      </div>
    );
  }

  const store = platform === "android" ? APP.android : APP.ios;
  const storeName = platform === "android" ? "Google Play" : "the App Store";

  return (
    <div className="relative overflow-hidden bg-primary-dark text-white">
      {/* Off-axis field: a single tilted band anchors the split without a blob background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 top-[-10%] h-[70%] w-[90%] origin-top-right -rotate-6 bg-primary/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-0 h-full w-px bg-white/10 lg:left-[58%]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-24">
        {/* ── Copy + actions (7 of 12) ───────────────────────── */}
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-secondary-light">
            {SITE_CONFIG.shortName}
          </p>
          <h1 className="mt-4 text-hero font-display text-white">
            Everything moved
            <span className="block text-secondary">to the app.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-neutral-200">
            Booking, memberships, schedules, and your account now live in the{" "}
            {APP.name} app. Get it once and you are set — every link on this site
            opens straight into it from then on.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="xl" className="rounded-full" asChild>
              <a
                href={store}
                onClick={() => trackCTAClick(`Get the app (${platform})`, store)}
              >
                Get the app on {storeName}
              </a>
            </Button>

            <Button
              size="xl"
              variant="outline"
              className="rounded-full border-white/70 text-white hover:bg-white hover:text-primary-dark"
              onClick={() => {
                trackCTAClick(`Open app (${platform})`, context);
                open(platform);
              }}
            >
              I already have it
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-6">
            <a
              href={appUrl(path)}
              className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-neutral-200 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              onClick={() => trackCTAClick("Continue in browser", appUrl(path))}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              Continue in the browser instead
            </a>
          </p>

          <p className="mt-8 text-sm text-neutral-200/70">
            Trouble getting in? Call{" "}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="font-semibold text-white underline underline-offset-4"
            >
              {SITE_CONFIG.phone}
            </a>{" "}
            and we will book you over the phone.
          </p>
        </div>

        {/* ── Device panel (5 of 12), lifted out of the grid on desktop ── */}
        <div className="lg:col-span-5 lg:-mt-10">
          <div className="mx-auto w-full max-w-[300px] rotate-[-2.5deg] rounded-[2rem] border border-white/15 bg-primary/70 p-5 shadow-xl backdrop-blur-sm lg:translate-x-6">
            <div className="rounded-[1.4rem] bg-white p-6">
              <Image
                src="/images/logo.png"
                alt=""
                width={150}
                height={38}
                className="h-7 w-auto"
              />
              <p className="mt-5 font-display text-card-title text-primary-dark">
                Your club, in your pocket
              </p>
              <ul className="mt-5 space-y-4">
                {APP_DOES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-snug text-neutral-700">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
