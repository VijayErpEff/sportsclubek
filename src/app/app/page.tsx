import { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, CreditCard, Ticket } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { StoreBadges } from "./store-badges";
import { OpenInApp } from "./open-in-app";

export const metadata: Metadata = generateSEOMetadata({
  title: "Download the LevelUP App — Book Courts, Cages & Sessions",
  description:
    "Book courts, cages, and academy sessions, manage your membership, and check schedules in the LevelUP Sports & Athletics app. Free on iPhone and Android.",
  path: "/app",
});

/** Only same-origin app paths are honoured — never a caller-supplied host. */
function safePath(raw: string | undefined): string {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

const APP_DOES = [
  { icon: CalendarCheck, label: "Book courts, cages, and academy sessions" },
  { icon: CreditCard, label: "Manage your membership and payments" },
  { icon: Ticket, label: "Register for camps, clinics, and tournaments" },
];

interface Props {
  searchParams: Promise<{ to?: string; c?: string; choose?: string }>;
}

export default async function AppPage({ searchParams }: Props) {
  const sp = await searchParams;
  const path = safePath(sp.to);
  const context = sp.c ?? "app";
  const forceChooser = sp.choose === "1";

  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Download the App", url: "/app" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <div className="bg-neutral-50">
        {/* ═══ Download ═══════════════════════════════════════
            Asymmetric 7/5: copy carries the page, the device panel
            drops below the headline baseline and bleeds right. */}
        <section className="relative overflow-hidden">
          {/* Navy field anchored right, cut on an angle behind the device */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 origin-top-right -skew-x-6 bg-primary-dark lg:block"
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-20">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {SITE_CONFIG.shortName}
              </p>

              <h1 className="mt-4 text-hero font-display text-primary-dark">
                Download the LevelUP app
              </h1>

              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-neutral-700">
                Booking, memberships, and schedules all live in the app now. Get
                it once and every link on this site opens straight into it.
              </p>

              <StoreBadges context={context} className="mt-8" />

              <OpenInApp
                path={path}
                context={context}
                forceChooser={forceChooser}
              />
            </div>

            {/* Device panel */}
            <div className="lg:col-span-5 lg:mt-16">
              <div className="mx-auto w-full max-w-[300px] rotate-[-2.5deg] rounded-[2rem] border border-neutral-900/10 bg-white p-4 shadow-xl lg:translate-x-4">
                <div className="rounded-[1.5rem] bg-neutral-50 p-6">
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
                          <Icon
                            className="h-3.5 w-3.5 text-accent"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-sm leading-snug text-neutral-700">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Closing badges — repeated the way download pages do ═══ */}
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-subsection text-primary-dark">
                Get the LevelUP app today
              </h2>
              <p className="mt-2 text-neutral-700">
                Free on iPhone and Android. Need a hand?{" "}
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  Call {SITE_CONFIG.phone}
                </a>{" "}
                and we&rsquo;ll book you over the phone.
              </p>
            </div>
            <StoreBadges context={`${context}-footer`} />
          </div>
        </section>
      </div>
    </>
  );
}
