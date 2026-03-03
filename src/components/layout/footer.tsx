import Image from "next/image";
import Link from "next/link";
import { FrenchText } from "@/components/shared/french-text";
import { WineIcon } from "@/components/ui/wine-icon";
import { NewsletterForm } from "@/components/layout/newsletter-form";

function MapPinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8.67187 11.7C9.44364 13.2937 10.7324 14.5792 12.3281 15.3469C12.4458 15.4026 12.576 15.4267 12.7059 15.4169C12.8358 15.407 12.9608 15.3635 13.0687 15.2906L15.4125 13.725C15.516 13.6548 15.6357 13.6119 15.7603 13.6004C15.8849 13.5889 16.0104 13.6092 16.125 13.6594L20.5125 15.5437C20.6625 15.6061 20.7877 15.7161 20.869 15.8567C20.9504 15.9973 20.9832 16.1608 20.9625 16.3219C20.8234 17.4072 20.2937 18.4048 19.4723 19.1278C18.6509 19.8508 17.5943 20.2497 16.5 20.25C13.1185 20.25 9.87548 18.9067 7.48439 16.5156C5.0933 14.1245 3.75 10.8815 3.75 7.49998C3.75025 6.40573 4.1492 5.34906 4.87221 4.52769C5.59522 3.70633 6.59274 3.17655 7.67812 3.03749C7.83922 3.01679 8.00266 3.04963 8.14326 3.13094C8.28386 3.21225 8.39384 3.33753 8.45625 3.48748L10.3406 7.88436C10.3896 7.99719 10.4101 8.12033 10.4003 8.24295C10.3905 8.36556 10.3507 8.48388 10.2844 8.58748L8.71875 10.9687C8.64905 11.0764 8.60814 11.2002 8.59993 11.3282C8.59172 11.4563 8.61649 11.5843 8.67187 11.7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6.75V12H16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.75 8.24999H14.25C13.9542 8.24875 13.6611 8.3061 13.3875 8.41873C13.114 8.53137 12.8654 8.69705 12.6563 8.90623C12.4471 9.11541 12.2814 9.36394 12.1688 9.63749C12.0561 9.91103 11.9988 10.2042 12 10.5V21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13.5H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="currentColor" strokeMiterlimit="10" />
      <path d="M16.125 3.375H7.875C5.38972 3.375 3.375 5.38972 3.375 7.875V16.125C3.375 18.6103 5.38972 20.625 7.875 20.625H16.125C18.6103 20.625 20.625 18.6103 20.625 16.125V7.875C20.625 5.38972 18.6103 3.375 16.125 3.375Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16.875" cy="7.125" r="1.125" fill="currentColor" />
    </svg>
  );
}

const exploreLinks = [
  { href: "/experiences", label: "Tasting Experiences" },
  { href: "/wines", label: "Our Wines" },
  { href: "/wine-club", label: "Wine Club" },
  { href: "/shop", label: "Wine Shop" },
  { href: "/events", label: "Events" },
  { href: "/our-story", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-pourpre-deep text-warm-white pb-20 md:pb-0">
      {/* Gold divider with fleur de lys */}
      <div className="relative flex items-center justify-center py-0">
        <div className="flex-1 h-px bg-gold/25" />
        <div className="px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ink/fleur-de-lys.svg"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 opacity-30 brightness-200"
          />
        </div>
        <div className="flex-1 h-px bg-gold/25" />
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
              className="h-10 w-auto mb-6 brightness-110"
            />
            <p className="text-sm leading-relaxed mb-4 text-warm-white/50">
              Six generations of French winemaking tradition, one unforgettable
              lakeside experience in the heart of the Finger Lakes.
            </p>
            <div className="h-px bg-gold/15 mb-4" />
            <p className="text-gold/70 text-sm italic font-heading">
              <FrenchText>&ldquo;À votre santé&rdquo;</FrenchText>
            </p>
          </div>

          {/* Column 2: Visit us */}
          <div>
            <h3 className="!text-warm-white font-heading text-lg mb-5 flex items-center gap-2">
              Visit Us
              <span className="flex-1 h-px bg-gold/15 ml-2" />
            </h3>
            <ul className="space-y-3.5 text-sm text-warm-white/60">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 mt-0.5 text-gold/50 flex-shrink-0" />
                <span>
                  14 Winery Farm Rd
                  <br />
                  Hammondsport, NY 14840
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-gold/50 flex-shrink-0" />
                <a
                  href="tel:+16072243552"
                  className="hover:text-gold transition-colors duration-300"
                >
                  (607) 224-3552
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="w-4 h-4 text-gold/50 flex-shrink-0" />
                <a
                  href="mailto:info@dlwinery.com"
                  className="hover:text-gold transition-colors duration-300"
                >
                  info@dlwinery.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 mt-0.5 text-gold/50 flex-shrink-0" />
                <span>
                  Open daily 10:00 AM — 6:00 PM
                  <br />
                  <span className="text-warm-white/30">7 days a week</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3 className="!text-warm-white font-heading text-lg mb-5 flex items-center gap-2">
              Explore
              <span className="flex-1 h-px bg-gold/15 ml-2" />
            </h3>
            <ul className="space-y-2.5 text-sm text-warm-white/60">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors duration-300 hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter + Social */}
          <div>
            <h3 className="!text-warm-white font-heading text-lg mb-5 flex items-center gap-2">
              Stay Connected
              <span className="flex-1 h-px bg-gold/15 ml-2" />
            </h3>
            <p className="text-sm mb-4 text-warm-white/50">
              Get updates on new releases, events, and exclusive offers.
            </p>
            <NewsletterForm />

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/DomaineLeSeurre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-warm-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/domaine_leseurre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-warm-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA band */}
        <div className="mt-14 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/experiences"
            className="btn-cta-primary inline-flex items-center justify-center gap-2 px-10 py-3.5 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase font-body font-medium rounded-none"
          >
            <WineIcon className="w-4 h-4" />
            Book a Tasting
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/8">
        <div className="max-w-[var(--max-width)] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-warm-white/25">
          <p>&copy; {new Date().getFullYear()} Domaine LeSeurre Winery. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:text-warm-white/50 transition-colors duration-300">Terms</Link>
            <Link href="/legal/returns" className="hover:text-warm-white/50 transition-colors duration-300">Returns</Link>
            <Link href="/legal/accessibility" className="hover:text-warm-white/50 transition-colors duration-300">Accessibility</Link>
          </div>
          <p>Shipped by <a href="https://www.vinoshipper.com/" target="_blank" rel="noopener noreferrer" className="hover:text-warm-white/50 transition-colors duration-300">VinoShipper</a></p>
        </div>
      </div>
    </footer>
  );
}
