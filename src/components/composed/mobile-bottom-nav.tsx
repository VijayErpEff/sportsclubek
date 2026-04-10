"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Calendar, Phone, LayoutGrid, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { SPORT_NAV_ITEMS } from "@/lib/constants/site";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [sportsOpen, setSportsOpen] = useState(false);

  const isSportsPage = /volleyball|cricket|badminton|pickleball|soccer|baseball|kids-agility/.test(pathname);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Sports", href: "#sports", icon: Trophy, isSheet: true },
    { label: "Schedule", href: "/schedule", icon: Calendar },
    { label: "Courts", href: "/court-status", icon: LayoutGrid, isLive: true },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <>
      {/* Sports sheet */}
      <AnimatePresence>
        {sportsOpen && (
          <>
            {/* Transparent backdrop — click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[48] md:hidden"
              onClick={() => setSportsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: APPLE_EASE }}
              className="fixed bottom-14 left-0 right-0 z-[49] bg-white rounded-t-2xl shadow-xl border-t border-neutral-200 md:hidden"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-400">Our Sports</p>
                  <button
                    onClick={() => setSportsOpen(false)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                    aria-label="Close sports menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SPORT_NAV_ITEMS.map((sport) => (
                    <div
                      key={sport.href}
                      className={cn(
                        "rounded-xl overflow-hidden",
                        pathname === sport.href || pathname === sport.academy
                          ? "bg-primary/5"
                          : "bg-neutral-50"
                      )}
                    >
                      <Link
                        href={sport.href}
                        onClick={() => setSportsOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 p-3 transition-colors min-h-[44px]",
                          pathname === sport.href || pathname === sport.academy
                            ? "text-primary"
                            : "text-neutral-900 hover:bg-neutral-100"
                        )}
                      >
                        <span className="text-lg">{sport.emoji}</span>
                        <span className="text-sm font-semibold">{sport.name}</span>
                      </Link>
                      {sport.academy && (
                        <Link
                          href={sport.academy}
                          onClick={() => setSportsOpen(false)}
                          className={cn(
                            "flex items-center px-3 pb-2.5 text-[11px] font-medium transition-colors",
                            pathname === sport.academy ? "text-primary" : "text-accent hover:text-accent-hover"
                          )}
                        >
                          <span className="ml-[calc(1.125rem+0.625rem)]">Academy &rarr;</span>
                        </Link>
                      )}
                    </div>
                  ))}
                  {/* Kids Agility — standalone, no academy */}
                  <Link
                    href="/kids-agility"
                    onClick={() => setSportsOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-xl transition-colors min-h-[44px]",
                      pathname === "/kids-agility"
                        ? "bg-primary/5 text-primary"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-900"
                    )}
                  >
                    <span className="text-lg">{"\u26a1"}</span>
                    <span className="text-sm font-semibold">Kids Agility</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <nav
        aria-label="Quick navigation"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200/30 bg-white/80 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex h-14 items-center justify-around">
          {navItems.map(({ label, href, icon: Icon, isSheet, isLive }) => {
            const isActive = isSheet
              ? sportsOpen || isSportsPage
              : href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

            if (isSheet) {
              return (
                <li key={label} className="flex-1">
                  <button
                    onClick={() => setSportsOpen((p) => !p)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-medium transition-colors w-full",
                      isActive ? "text-accent" : "text-neutral-500 hover:text-neutral-900"
                    )}
                    aria-expanded={sportsOpen}
                    aria-label="Open sports menu"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={label} className="flex-1">
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-medium transition-colors",
                    isActive ? "text-accent" : "text-neutral-500 hover:text-neutral-900"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {isLive && (
                      <span className="absolute -top-0.5 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                    )}
                  </span>
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
