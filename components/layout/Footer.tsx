"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { photographer } from "@/data";

const footerLinks = {
  Work: [
    { label: "Portfolio",  href: "/portfolio" },
    { label: "Weddings",   href: "/portfolio?cat=weddings" },
    { label: "Portraits",  href: "/portfolio?cat=portraits" },
    { label: "Fashion",    href: "/portfolio?cat=fashion" },
    { label: "Commercial", href: "/portfolio?cat=commercial" },
  ],
  Studio: [
    { label: "About",       href: "/about" },
    { label: "Services",    href: "/services" },
    { label: "Journal",     href: "/blog" },
    { label: "Book a Session", href: "/booking" },
    { label: "Contact",     href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      {/* CTA band */}
      <div className="border-b border-white/5 py-20">
        <div className="container-luxury text-center">
          <span className="label-overline block mb-6">Ready to Begin?</span>
          <h2 className="text-display-lg text-white mb-8">
            Let&apos;s create something<br />
            <em className="text-gold-400 not-italic">extraordinary.</em>
          </h2>
          <Link href="/booking" className="btn-primary mx-auto">
            Book a Session
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-pad">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="block mb-6">
                <span className="font-display text-2xl font-light text-white tracking-widest block">
                  {photographer.name}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-gold-400 mt-1 block">
                  Studio
                </span>
              </Link>
              <p className="text-warm-gray text-sm leading-relaxed mb-8 max-w-xs">
                Award-winning photography rooted in restraint, feeling, and technical mastery.
                Based in Los Angeles, available worldwide.
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://instagram.com/${photographer.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href={`mailto:${photographer.email}`}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400 transition-all"
                  aria-label="Email"
                >
                  <Mail size={14} />
                </a>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="label-overline mb-6">{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-warm-gray text-sm hover:text-gold-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h4 className="label-overline mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${photographer.email}`}
                    className="flex items-center gap-3 text-warm-gray text-sm hover:text-gold-400 transition-colors"
                  >
                    <Mail size={13} className="text-gold-400 shrink-0" />
                    {photographer.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${photographer.phone}`}
                    className="flex items-center gap-3 text-warm-gray text-sm hover:text-gold-400 transition-colors"
                  >
                    <Phone size={13} className="text-gold-400 shrink-0" />
                    {photographer.phone}
                  </a>
                </li>
                <li>
                  <span className="flex items-start gap-3 text-warm-gray text-sm">
                    <MapPin size={13} className="text-gold-400 shrink-0 mt-0.5" />
                    {photographer.location}
                  </span>
                </li>
              </ul>

              <div className="mt-8 p-4 border border-white/5">
                <p className="text-warm-gray text-xs mb-1 tracking-wider uppercase">Response time</p>
                <p className="text-white/70 text-sm">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-xs tracking-wide">
            © {new Date().getFullYear()} {photographer.studio}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-warm-gray text-xs hover:text-gold-400 transition-colors">Privacy</Link>
            <Link href="#" className="text-warm-gray text-xs hover:text-gold-400 transition-colors">Terms</Link>
            <Link href="#" className="text-warm-gray text-xs hover:text-gold-400 transition-colors">License</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
