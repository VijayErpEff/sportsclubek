"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Bell, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, SPORT_NAV_ITEMS } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { trackPhoneCall, trackCTAClick } from "@/lib/analytics";
import { captureLead } from "@/lib/leads";

const BELL_STORAGE_KEY = "lus_nav_subscribed";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAV_ITEMS = [
  { label: "Facilities", href: "/facilities" },
  { label: "Court Status", href: "/court-status" },
  { label: "Memberships", href: "/memberships" },
  { label: "Parties", href: "/birthday-parties" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSportsExpanded, setMobileSportsExpanded] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [bellDot, setBellDot] = useState(false);
  const [bellName, setBellName] = useState("");
  const [bellEmail, setBellEmail] = useState("");
  const [bellPhone, setBellPhone] = useState("");
  const [bellStatus, setBellStatus] = useState<"idle" | "loading" | "success">("idle");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bellDesktopRef = useRef<HTMLDivElement>(null);
  const bellMobileRef = useRef<HTMLDivElement>(null);
  const bellDropdownRef = useRef<HTMLDivElement>(null);

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

  // Click outside to close dropdown — use mousedown so the close re-render
  // completes before the click event reaches the target (e.g. logo link)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSportsOpen(false);
      }
    }
    if (sportsOpen) {
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }
  }, [sportsOpen]);

  // Escape to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSportsOpen(false); setMobileOpen(false); setBellOpen(false); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setSportsOpen(false);
    setMobileOpen(false);
    setBellOpen(false);
  }, [pathname]);

  // Bell: check if already subscribed
  useEffect(() => {
    try {
      if (!localStorage.getItem(BELL_STORAGE_KEY)) setBellDot(true);
    } catch {}
  }, []);

  // Bell: click outside to close (check both bell button ref and dropdown ref)
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      const inDesktop = bellDesktopRef.current?.contains(target);
      const inMobile = bellMobileRef.current?.contains(target);
      const inDropdown = bellDropdownRef.current?.contains(target);
      if (!inDesktop && !inMobile && !inDropdown) {
        setBellOpen(false);
      }
    }
    if (bellOpen) {
      const id = setTimeout(() => document.addEventListener("click", handler), 0);
      return () => { clearTimeout(id); document.removeEventListener("click", handler); };
    }
  }, [bellOpen]);

  const handleBellSubmit = async () => {
    if (!bellEmail.trim()) return;
    setBellStatus("loading");
    await captureLead({
      email: bellEmail.trim(),
      name: bellName.trim(),
      phone: bellPhone.trim(),
      source: "sport_preference",
      context: "Navbar signup",
    });
    try { localStorage.setItem(BELL_STORAGE_KEY, "true"); } catch {}
    setBellStatus("success");
    setBellDot(false);
    setTimeout(() => { setBellOpen(false); setBellStatus("idle"); }, 1500);
  };

  const handleBellDismiss = () => {
    setBellOpen(false);
    setBellDot(false);
    try { sessionStorage.setItem("lus_bell_dismissed", "true"); } catch {}
  };

  const isSportsPage = /volleyball|cricket|badminton|pickleball|soccer|baseball|kids-agility/.test(pathname);

  return (
    <>
      <header className={cn("fixed inset-x-0 z-[100] transition-all duration-300", scrolled ? "shadow-md bg-white/80 backdrop-blur-lg" : "shadow-sm bg-white")} style={{ top: "var(--banner-height, 0px)" }}>
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
                      {SPORT_NAV_ITEMS.map((sport) => (
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
              <a href={`tel:${SITE_CONFIG.phone}`} onClick={trackPhoneCall} className="text-xs text-neutral-400 hover:text-primary transition-colors hidden xl:block">{SITE_CONFIG.phone}</a>

              {/* Bell lead capture */}
              <div ref={bellDesktopRef} className="relative">
                <button
                  onClick={() => setBellOpen((p) => !p)}
                  className="relative p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors"
                  aria-label="Get updates"
                  aria-expanded={bellOpen}
                >
                  <Bell className="h-4.5 w-4.5" />
                  {bellDot && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
                  )}
                </button>

                {bellOpen && (
                  <div className="absolute top-full mt-2 right-0 w-[320px] bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-5 animate-fade-in">
                    {bellStatus === "success" ? (
                      <div className="flex items-center gap-2 justify-center py-3">
                        <Check className="h-5 w-5 text-accent" />
                        <p className="text-sm font-semibold text-neutral-900">You&apos;re in!</p>
                      </div>
                    ) : (
                      <>
                        <p className="font-display text-base font-bold text-neutral-900 mb-1">Stay in the Game</p>
                        <p className="text-xs text-neutral-500 mb-4">Get alerts for open play, new sessions &amp; offers.</p>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={bellName}
                            onChange={(e) => setBellName(e.target.value)}
                            placeholder="Your name"
                            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                          />
                          <input
                            type="email"
                            value={bellEmail}
                            onChange={(e) => setBellEmail(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleBellSubmit(); }}
                            placeholder="Your email"
                            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                          />
                          <input
                            type="tel"
                            value={bellPhone}
                            onChange={(e) => setBellPhone(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleBellSubmit(); }}
                            placeholder="Phone (optional)"
                            autoComplete="tel"
                            inputMode="tel"
                            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                          />
                          <button
                            onClick={handleBellSubmit}
                            disabled={!bellEmail.trim() || bellStatus === "loading"}
                            className="w-full h-10 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            {bellStatus === "loading" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>Let&apos;s Go <ArrowRight className="h-3.5 w-3.5" /></>
                            )}
                          </button>
                        </div>
                        <button
                          onClick={handleBellDismiss}
                          className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 pt-3 transition-colors"
                        >
                          No thanks
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button size="sm" className="rounded-full px-5" asChild>
                <a href={BOOKING_URLS.freeTrial} onClick={() => trackCTAClick("Free Trial", BOOKING_URLS.freeTrial)}>Free Trial</a>
              </Button>
            </div>

            {/* Mobile: bell + toggle */}
            <div className="lg:hidden flex items-center gap-1">
              <div ref={bellMobileRef} className="relative">
                <button
                  onClick={() => setBellOpen((p) => !p)}
                  className="relative p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Get updates"
                >
                  <Bell className="h-5 w-5" />
                  {bellDot && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
                  )}
                </button>
              </div>
              <button
                className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(p => !p)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ── Mobile Bell Dropdown ── */}
      {bellOpen && (
        <div ref={bellDropdownRef} className="fixed inset-x-0 z-[99] lg:hidden" style={{ top: "calc(var(--banner-height, 0px) + 4rem)" }}>
          <div className="mx-3 mt-1 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-5">
            {bellStatus === "success" ? (
              <div className="flex items-center gap-2 justify-center py-2">
                <Check className="h-5 w-5 text-accent" />
                <p className="text-sm font-semibold text-neutral-900">You&apos;re in!</p>
              </div>
            ) : (
              <>
                <p className="font-display text-base font-bold text-neutral-900 mb-1">Stay in the Game</p>
                <p className="text-xs text-neutral-500 mb-4">Get alerts for open play, new sessions &amp; offers.</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={bellName}
                    onChange={(e) => setBellName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-11 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                  />
                  <input
                    type="email"
                    value={bellEmail}
                    onChange={(e) => setBellEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleBellSubmit(); }}
                    placeholder="Your email"
                    className="w-full h-11 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                  />
                  <input
                    type="tel"
                    value={bellPhone}
                    onChange={(e) => setBellPhone(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleBellSubmit(); }}
                    placeholder="Phone (optional)"
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full h-11 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                  />
                  <button
                    onClick={handleBellSubmit}
                    disabled={!bellEmail.trim() || bellStatus === "loading"}
                    className="w-full h-11 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {bellStatus === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>Let&apos;s Go <ArrowRight className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </div>
                <button
                  onClick={handleBellDismiss}
                  className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 pt-3 transition-colors"
                >
                  No thanks
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            className="fixed inset-0 z-[110] lg:hidden bg-white"
            role="dialog"
            aria-modal="true"
          >
            <div className="h-full flex flex-col pt-20 pb-8 overflow-y-auto">
              {/* Nav items first — immediately accessible */}
              <div className="px-6 pb-4 space-y-0.5">
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
              <div className="h-px bg-neutral-100 mx-6" />
              {/* Sports — collapsible section */}
              <div className="px-6 pt-4 pb-6">
                <button
                  onClick={() => setMobileSportsExpanded((p) => !p)}
                  className="flex items-center justify-between w-full px-1 mb-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">Our Sports</p>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-neutral-400 transition-transform", mobileSportsExpanded && "rotate-180")} />
                </button>
                {mobileSportsExpanded && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {SPORT_NAV_ITEMS.map((sport, i) => (
                        <motion.div
                          key={sport.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.2, ease: APPLE_EASE }}
                          className={cn("rounded-xl overflow-hidden", pathname === sport.href || pathname === sport.academy ? "bg-primary/5" : "bg-neutral-50")}
                        >
                          <Link
                            href={sport.href}
                            className="flex items-center gap-2.5 p-3 hover:bg-neutral-100 transition-colors min-h-[44px]"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="text-lg">{sport.emoji}</span>
                            <div>
                              <span className={cn("text-sm font-semibold", pathname === sport.href ? "text-primary" : "text-neutral-900")}>{sport.name}</span>
                              <p className="text-[10px] text-neutral-400 leading-tight">{sport.desc}</p>
                            </div>
                          </Link>
                          {sport.academy && (
                            <Link
                              href={sport.academy}
                              className={cn(
                                "flex items-center px-3 pb-2.5 text-[11px] font-medium transition-colors min-h-[32px]",
                                pathname === sport.academy ? "text-primary" : "text-accent hover:text-accent-hover"
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              <span className="ml-[calc(1.125rem+0.625rem)]">Academy &rarr;</span>
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <Link href="/kids-agility" className="flex items-center gap-2.5 px-3 py-2.5 mt-2 text-sm text-neutral-500 hover:text-primary" onClick={() => setMobileOpen(false)}>
                      + Kids Agility Training
                    </Link>
                  </>
                )}
              </div>
              <div className="mt-auto px-6 pt-8 space-y-3">
                <Button size="lg" className="w-full rounded-full" asChild>
                  <a href={BOOKING_URLS.freeTrial} onClick={() => setMobileOpen(false)}>Free Trial</a>
                </Button>
                <p className="text-center text-sm text-neutral-400">
                  <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-primary">{SITE_CONFIG.phone}</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
