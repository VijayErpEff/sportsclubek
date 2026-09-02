"use client";

import Image from "next/image";
import { APP } from "@/lib/constants/app";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Official Apple and Google store badges, shown together the way every
 * app-download page does it — people recognise the artwork, so it converts
 * better than a styled text button.
 *
 * Both files are the vendors' own assets. Apple's SVG is edge-to-edge at
 * 119.66x40. Google's PNG carries 41px of mandated clear space inside a
 * 646x250 canvas (visible badge 564x168), so it renders 1.4881x taller and
 * is pulled back by a negative margin to sit at the same optical height.
 */
export function StoreBadges({
  context,
  className = "",
}: {
  context: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${className}`}>
      <a
        href={APP.ios}
        onClick={() => trackCTAClick(`App Store badge (${context})`, APP.ios)}
        className="inline-block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:opacity-60"
      >
        <Image
          src="/images/badges/app-store.svg"
          alt={`Download ${APP.name} on the App Store`}
          width={144}
          height={48}
          className="h-12 w-auto"
          unoptimized
        />
      </a>

      <a
        href={APP.android}
        onClick={() => trackCTAClick(`Google Play badge (${context})`, APP.android)}
        className="inline-block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:opacity-60"
      >
        <Image
          src="/images/badges/google-play.png"
          alt={`Get ${APP.name} on Google Play`}
          width={186}
          height={72}
          className="-m-3 h-[4.5rem] w-auto"
          unoptimized
        />
      </a>
    </div>
  );
}
