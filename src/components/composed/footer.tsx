"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, FileText } from "lucide-react";
import { trackPhoneCall, trackSocialClick } from "@/lib/analytics";
import { Container } from "@/components/layout/container";
import { NewsletterSignup } from "./newsletter-signup";
import { SITE_CONFIG, SPORTS } from "@/lib/constants/site";

const footerSportsAndAcademies = [
  ...SPORTS.map((s) => ({
    label: s.name,
    href: `/${s.slug}`,
  })),
  { label: "Kids Agility", href: "/kids-agility" },
];

const footerCompany = [
  { label: "About", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Memberships", href: "/memberships" },
  { label: "Schedule", href: "/schedule" },
  { label: "Court Status", href: "/court-status" },
  { label: "Free Trial", href: "/free-trial" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Summer Camps", href: "/summer-camps" },
];

const socialLinks = [
  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: Facebook },
  { label: "Instagram", href: SITE_CONFIG.social.instagram, icon: Instagram },
  { label: "Twitter", href: SITE_CONFIG.social.twitter, icon: Twitter },
  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <Container>
        {/* Newsletter Row */}
        <div className="py-12 border-b border-white/10">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-lg font-semibold text-white mb-2 inline-flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
              Get Our Free Training Guide
            </h3>
            <p className="text-white/50 text-sm mb-5">
              Download &ldquo;10 Drills Every Young Athlete Should Know&rdquo; + weekly training tips and schedule updates.
            </p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 bg-white rounded-xl p-2.5">
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.shortName}
                width={140}
                height={35}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Elkton&apos;s premier multi-sport facility. Expert coaching, modern
              courts, and programs for every skill level.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>{SITE_CONFIG.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  onClick={trackPhoneCall}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Sports & Programs Column */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">
              Sports
            </h3>
            <ul className="space-y-2.5">
              {footerSportsAndAcademies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-white/40 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
              reserved.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-accent transition-colors"
                aria-label={`Follow us on ${social.label}`}
                onClick={() => trackSocialClick(social.label)}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
