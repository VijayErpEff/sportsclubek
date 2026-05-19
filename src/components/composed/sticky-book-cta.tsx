"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { trackBookingCTAClick } from "@/lib/analytics";

const HIDE_ON_ROUTES: ReadonlyArray<string> = [
  "/schedule",
  "/register",
  "/free-trial",
  "/survey",
  "/go",
];

const SHOW_AFTER_PX = 320;

export function StickyBookCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const hidden = HIDE_ON_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <Link
      href="/schedule"
      onClick={() => trackBookingCTAClick(pathname)}
      aria-label="Book a court or cage"
      data-state={visible ? "visible" : "hidden"}
      className="
        group fixed z-50
        left-4 md:left-auto md:right-6
        bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)]
        md:bottom-[calc(3.5rem+1.5rem)]
        inline-flex items-center gap-2
        h-14 md:h-12 px-5
        rounded-full
        bg-primary text-white
        shadow-xl shadow-primary/30
        hover:bg-primary-light transition-all
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30
        data-[state=hidden]:opacity-0 data-[state=hidden]:translate-y-2 data-[state=hidden]:pointer-events-none
        data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0
        motion-safe:duration-300 motion-safe:ease-out
      "
    >
      <Calendar className="h-5 w-5" aria-hidden="true" />
      <span className="font-semibold text-sm">Book a Court</span>
    </Link>
  );
}
