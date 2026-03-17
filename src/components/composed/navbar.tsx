"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isOpen) {
          setIsOpen(false);
          menuToggleRef.current?.focus();
        }
        if (openDropdown) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, openDropdown]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = menu.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    menu.addEventListener("keydown", handleTab);
    // Focus first focusable element
    const firstFocusable =
      menu.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => menu.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpenDropdown(openDropdown === label ? null : label);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setOpenDropdown(null);
      }
    },
    [openDropdown]
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-nav"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-[72px]"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "relative z-50 flex items-center",
              !isScrolled && !isOpen && "brightness-0 invert"
            )}
          >
            <Image
              src="/images/logo.png"
              alt="LevelUP Sports"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              "children" in link && link.children ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isScrolled
                        ? "text-neutral-700 hover:text-primary hover:bg-neutral-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                    aria-controls={`dropdown-${link.label.toLowerCase()}`}
                    onKeyDown={(e) => handleDropdownKeyDown(e, link.label)}
                    onFocus={() => setOpenDropdown(link.label)}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Mega Menu */}
                  <div
                    id={`dropdown-${link.label.toLowerCase()}`}
                    role="menu"
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
                      openDropdown === link.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    )}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-neutral-200 p-4 min-w-[280px]">
                      <div className="grid grid-cols-2 gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors"
                            onClick={() => setOpenDropdown(null)}
                            onBlur={(e) => {
                              // Close dropdown when focus leaves the menu
                              const parent = e.currentTarget.closest("[role=menu]");
                              if (
                                parent &&
                                !parent.contains(e.relatedTarget as Node)
                              ) {
                                setOpenDropdown(null);
                              }
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-neutral-100 col-span-2">
                        <Link
                          href="/schedule"
                          role="menuitem"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          View Full Schedule &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isScrolled
                      ? "text-neutral-700 hover:text-primary hover:bg-neutral-100"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button size="md" asChild>
              <Link href="/schedule">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuToggleRef}
            className={cn(
              "relative z-50 lg:hidden p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",
              isScrolled || isOpen
                ? "text-neutral-900 hover:bg-neutral-100"
                : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "visible" : "invisible"
        )}
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="pt-24 px-6 pb-6 h-full overflow-y-auto">
            <div className="space-y-1">
              {NAV_LINKS.map((link) =>
                "children" in link && link.children ? (
                  <div key={link.label}>
                    <button
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-neutral-900 rounded-lg hover:bg-neutral-50 min-h-[44px]"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-neutral-500 transition-transform",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200",
                        openDropdown === link.label
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2.5 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50 hover:text-primary min-h-[44px] flex items-center"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-3 text-base font-medium text-neutral-900 rounded-lg hover:bg-neutral-50 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="mt-8 space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/schedule" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </Button>
              <p className="text-center text-sm text-neutral-500">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-primary"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
