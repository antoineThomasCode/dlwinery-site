import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FrenchText } from "@/components/shared/french-text";

export function Footer() {
  return (
    <footer className="bg-[#E8E2D6] text-pourpre-deep pb-20 md:pb-0">
      {/* Fleur de lys divider */}
      <div className="relative flex items-center justify-center py-0">
        <div className="flex-1 h-px bg-gold/30" />
        <div className="px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ink/fleur-de-lys.svg"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 opacity-40"
            style={{ filter: "sepia(1) saturate(2) hue-rotate(10deg) brightness(0.7)" }}
          />
        </div>
        <div className="flex-1 h-px bg-gold/30" />
      </div>

      {/* Main footer */}
      <div className="max-w-[var(--max-width)] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            <Image
              src="/images/logo-inverted.webp"
              alt="Domaine LeSeurre"
              width={160}
              height={45}
              className="h-10 w-auto mb-6"
            />
            <p className="text-sm leading-relaxed mb-4 text-pourpre-deep/60">
              Six generations of French winemaking tradition, one unforgettable
              lakeside experience in the heart of the Finger Lakes.
            </p>
            <div className="h-px bg-gold/20 mb-4" />
            <p className="text-gold text-sm italic font-heading">
              <FrenchText>&ldquo;À votre santé&rdquo;</FrenchText>
            </p>
          </div>

          {/* Column 2: Visit us */}
          <div>
            <h3 className="text-pourpre-deep font-heading text-lg mb-5 flex items-center gap-2">
              Visit Us
              <span className="flex-1 h-px bg-gold/20 ml-2" />
            </h3>
            <ul className="space-y-3.5 text-sm text-pourpre-deep/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-gold/70 flex-shrink-0" />
                <span>
                  14 Winery Farm Rd
                  <br />
                  Hammondsport, NY 14840
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a
                  href="tel:+16072243552"
                  className="hover:text-pourpre transition-colors"
                >
                  (607) 224-3552
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold/70 flex-shrink-0" />
                <a
                  href="mailto:info@dlwinery.com"
                  className="hover:text-pourpre transition-colors"
                >
                  info@dlwinery.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-gold/70 flex-shrink-0" />
                <span>
                  Open daily 10:00 AM — 6:00 PM
                  <br />
                  <span className="text-pourpre-deep/40">7 days a week</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3 className="text-pourpre-deep font-heading text-lg mb-5 flex items-center gap-2">
              Explore
              <span className="flex-1 h-px bg-gold/20 ml-2" />
            </h3>
            <ul className="space-y-2.5 text-sm text-pourpre-deep/70">
              {[
                { href: "/experiences", label: "Tasting Experiences" },
                { href: "/wines", label: "Our Wines" },
                { href: "/wine-club", label: "Wine Club" },
                { href: "/shop", label: "Wine Shop" },
                { href: "/events", label: "Events" },
                { href: "/our-story", label: "Our Story" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-pourpre transition-colors hover:pl-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-pourpre-deep font-heading text-lg mb-5 flex items-center gap-2">
              Stay Connected
              <span className="flex-1 h-px bg-gold/20 ml-2" />
            </h3>
            <p className="text-sm mb-4 text-pourpre-deep/60">
              Get updates on new releases, events, and exclusive offers.
            </p>
            <form className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="Your email"
                className="bg-warm-white/60 border border-gold/20 rounded-sm px-4 py-2.5 text-sm text-pourpre-deep placeholder:text-pourpre-deep/30 focus:outline-none focus:border-gold/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-pourpre-deep hover:bg-pourpre text-warm-white rounded-none px-4 py-2.5 text-xs font-body font-medium tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer"
                data-track-event="newsletter_signup"
                data-track-category="footer"
                data-track-label="email_capture"
              >
                Subscribe
              </button>
            </form>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/DomaineLeSeurre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-pourpre-deep/15 flex items-center justify-center text-pourpre-deep/50 hover:text-pourpre hover:border-pourpre/30 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/domaine_leseurre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-pourpre-deep/15 flex items-center justify-center text-pourpre-deep/50 hover:text-pourpre hover:border-pourpre/30 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-pourpre-deep/8">
        <div className="max-w-[var(--max-width)] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-pourpre-deep/35">
          <p>&copy; {new Date().getFullYear()} Domaine LeSeurre Winery. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-pourpre-deep/60 transition-colors">Terms</Link>
            <Link href="/legal/returns" className="hover:text-pourpre-deep/60 transition-colors">Returns</Link>
            <Link href="/legal/accessibility" className="hover:text-pourpre-deep/60 transition-colors">Accessibility</Link>
          </div>
          <p>Shipped by <a href="https://www.vinoshipper.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pourpre-deep/60 transition-colors">VinoShipper</a></p>
        </div>
      </div>
    </footer>
  );
}
