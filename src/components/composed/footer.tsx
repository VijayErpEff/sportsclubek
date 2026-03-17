import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, SPORTS } from "@/lib/constants/site";

const footerSports = SPORTS.map((s) => ({
  label: s.name,
  href: `/${s.slug}`,
}));

const footerCompany = [
  { label: "About", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Memberships", href: "/memberships" },
  { label: "Schedule", href: "/schedule" },
  { label: "Careers", href: "/careers" },
  { label: "Offers", href: "/offers" },
];

const footerPrograms = [
  { label: "Baseball Academy", href: "/baseball-academy" },
  { label: "Cricket Academy", href: "/cricket-academy" },
  { label: "Badminton Academy", href: "/badminton-academy" },
  { label: "Kids Agility", href: "/kids-agility" },
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
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 brightness-0 invert">
              <Image
                src="/images/logo.png"
                alt="LevelUP Sports"
                width={160}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Elkton&apos;s premier multi-sport facility. Expert coaching, modern
              courts, and programs for every skill level.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>{SITE_CONFIG.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-white/70">
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

          {/* Sports Column */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">
              Sports
            </h3>
            <ul className="space-y-2.5">
              {footerSports.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">
              Programs
            </h3>
            <ul className="space-y-2.5">
              {footerPrograms.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
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
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors"
                aria-label={`Follow us on ${social.label}`}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
