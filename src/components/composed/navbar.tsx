"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";

const SPORT_ITEMS = [
  { name: "Baseball", href: "/baseball", academy: "/baseball-academy", emoji: "\u26be", desc: "Batting cages & coaching" },
  { name: "Cricket", href: "/cricket", academy: "/cricket-academy", emoji: "\ud83c\udfcf", desc: "Nets & bowling machines" },
  { name: "Badminton", href: "/badminton", academy: "/badminton-academy", emoji: "\ud83c\udff8", desc: "Competition-grade courts" },
  { name: "Pickleball", href: "/pickleball", academy: null as string | null, emoji: "\ud83c\udfd3", desc: "Open play & rentals" },
];

const NAV_ITEMS = [
  { label: "Facilities", href: "/facilities" },
  { label: "Court Status", href: "/court-status" },
  { label: "Memberships", href: "/memberships" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Free Trial", href: "/free-trial" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Body scroll lock for mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSportsOpen(false);
      }
    }
    if (sportsOpen) {
      // Delay adding the listener so the opening click doesn't immediately close it
      const id = setTimeout(() => document.addEventListener("click", handler), 0);
      return () => { clearTimeout(id); document.removeEventListener("click", handler); };
    }
  }, [sportsOpen]);

  // Escape to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSportsOpen(false); setMobileOpen(false); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setSportsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isSportsPage = /baseball|cricket|badminton|pickleball|kids-agility/.test(pathname);

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-[100] transition-all duration-300", scrolled ? "shadow-md bg-white/80 backdrop-blur-lg" : "shadow-sm bg-white")}>
        <Container>
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
            <Link href="/" className="shrink-0">
              <Image src="/images/logo.png" alt={SITE_CONFIG.shortName} width={150} height={38} className="h-8 w-auto" priority />
            </Link>

            {/* ── Desktop Nav (centered) ── */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {/* Sports dropdown wrapper */}
              <div ref={wrapperRef} className="relative">
                <button
                  onClick={() => setSportsOpen(prev => !prev)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    sportsOpen || isSportsPage ? "text-primary bg-primary/5" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                  aria-expanded={sportsOpen}
                  aria-haspopup="true"
                >
                  Sports
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", sportsOpen && "rotate-180")} />
                </button>

                {sportsOpen && (
                  <div className="absolute top-full mt-1 left-0 w-[480px] bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-5 animate-fade-in" role="menu">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3 px-1">Our Sports</p>
                    <div className="grid grid-cols-2 gap-1">
                      {SPORT_ITEMS.map((sport) => (
                        <Link key={sport.href} href={sport.href} role="menuitem"
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                          onClick={() => setSportsOpen(false)}
                        >
                          <span className="text-xl mt-0.5">{sport.emoji}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-neutral-900 group-hover:text-primary transition-colors">{sport.name}</span>
                              <ChevronRight className="h-3 w-3 text-neutral-300 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <p className="text-xs text-neutral-400 mt-0.5">{sport.desc}</p>
                            {sport.academy && (
                              <Link href={sport.academy} className="inline-block text-[11px] font-medium text-accent hover:text-accent-hover mt-1"
                                onClick={(e) => { e.stopPropagation(); setSportsOpen(false); }}>
                                Academy &rarr;
                              </Link>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between px-1">
                      <Link href="/kids-agility" className="text-xs text-neutral-400 hover:text-primary transition-colors" onClick={() => setSportsOpen(false)}>
                        Kids Agility (Ages 5-12) &rarr;
                      </Link>
                      <Link href="/schedule" className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors" onClick={() => setSportsOpen(false)}>
                        Full Schedule &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {NAV_ITEMS.map((item) => (
                <Link key={item.label} href={item.href}
                  className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href ? "text-primary bg-primary/5" : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  )}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 ml-auto pl-4">
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-xs text-neutral-400 hover:text-primary transition-colors hidden xl:block">{SITE_CONFIG.phone}</a>
              <Button size="sm" className="rounded-full px-5" asChild>
                <Link href="/free-trial">Free Trial</Link>
              </Button>
              <span className="hidden xl:inline-flex items-center gap-1 text-[10px] text-neutral-300 font-mono">
                <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded text-[10px] text-neutral-400 border border-neutral-200">&#8984;K</kbd>
              </span>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(p => !p)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </Container>
      </header>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden bg-white" role="dialog" aria-modal="true">
          <div className="h-full flex flex-col pt-20 pb-8 overflow-y-auto">
            <div className="px-6 pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3 px-1">Our Sports</p>
              <div className="grid grid-cols-2 gap-2">
                {SPORT_ITEMS.map((sport) => (
                  <Link key={sport.href} href={sport.href}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    <span className="text-lg">{sport.emoji}</span>
                    <div>
                      <span className="text-sm font-semibold text-neutral-900">{sport.name}</span>
                      <p className="text-[10px] text-neutral-400 leading-tight">{sport.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/kids-agility" className="flex items-center gap-2.5 px-3 py-2.5 mt-2 text-sm text-neutral-500 hover:text-primary" onClick={() => setMobileOpen(false)}>
                + Kids Agility Training
              </Link>
            </div>
            <div className="h-px bg-neutral-100 mx-6" />
            <div className="px-6 pt-4 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <Link key={item.label} href={item.href}
                  className={cn("flex items-center px-3 py-3 text-base font-semibold rounded-xl min-h-[44px]",
                    pathname === item.href ? "text-primary bg-primary/5" : "text-neutral-900 hover:bg-neutral-50"
                  )} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="flex items-center px-3 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-50 rounded-xl min-h-[44px]" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
            <div className="mt-auto px-6 pt-8 space-y-3">
              <Button size="lg" className="w-full rounded-full" asChild>
                <Link href="/free-trial" onClick={() => setMobileOpen(false)}>Free Trial</Link>
              </Button>
              <p className="text-center text-sm text-neutral-400">
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-primary">{SITE_CONFIG.phone}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
