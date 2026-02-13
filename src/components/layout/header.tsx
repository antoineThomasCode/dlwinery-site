"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, Wine, CalendarDays, Home, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/experiences", label: "Experiences" },
  { href: "/our-story", label: "Our Story" },
  { href: "/wines", label: "Our Wines" },
  { href: "/wine-club", label: "Wine Club" },
  { href: "/shop", label: "Shop" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const mobileNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/experiences", icon: CalendarDays, label: "Book" },
  { href: "/wines", icon: Wine, label: "Wines" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/member", icon: User, label: "Account" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-warm-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Top gold line */}
        <div className={`gold-line-thin transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

        <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative">
            <Image
              src="/images/leseurre-logo.svg"
              alt="Domaine LeSeurre"
              width={150}
              height={42}
              className={`h-9 sm:h-10 w-auto transition-all duration-500 ${
                scrolled ? "brightness-0" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-body font-medium tracking-[0.1em] uppercase transition-colors relative group ${
                  scrolled
                    ? "text-olive/70 hover:text-olive"
                    : "text-warm-white/80 hover:text-warm-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Member icon - desktop */}
            <Link
              href="/member"
              className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                scrolled ? "hover:bg-olive/5 text-olive" : "hover:bg-warm-white/10 text-warm-white"
              }`}
              aria-label="Member area"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Book CTA - desktop */}
            <Link
              href="/experiences"
              className="hidden md:inline-flex items-center justify-center btn-header-cta rounded-none text-[11px] tracking-[0.1em] uppercase font-heading font-normal px-6 h-9"
              data-track-event="cta_click"
              data-track-category="header"
              data-track-label="book_tasting"
            >
              Book a Tasting
            </Link>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    scrolled ? "text-olive hover:bg-olive/5" : "text-warm-white hover:bg-warm-white/10"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm bg-cream p-0 border-l border-gold/10">
                <div className="flex flex-col h-full">
                  {/* Logo area */}
                  <div className="p-6 pb-4 border-b border-gold/10">
                    <Image
                      src="/images/leseurre-logo.svg"
                      alt="Domaine LeSeurre"
                      width={130}
                      height={38}
                      className="h-8 w-auto"
                    />
                    <p className="text-gold/60 text-xs font-heading italic mt-2">
                      Finger Lakes, New York
                    </p>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 py-4 overflow-y-auto">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center px-6 py-3.5 text-sm font-body font-medium tracking-[0.06em] uppercase text-olive hover:bg-gold/5 hover:text-bordeaux transition-all border-l-2 border-transparent hover:border-gold"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="gold-line-thin mx-6 my-3" />
                    <Link
                      href="/member"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-6 py-3.5 text-sm font-body font-medium tracking-[0.06em] uppercase text-olive hover:bg-gold/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-gold" />
                      Member Area
                    </Link>
                  </nav>

                  {/* Bottom CTA */}
                  <div className="p-6 border-t border-gold/10 bg-warm-white/50">
                    <Link
                      href="/experiences"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-full btn-header-cta rounded-none h-12 text-sm tracking-[0.08em] uppercase font-heading font-normal"
                    >
                      Book a Tasting
                    </Link>
                    <p className="text-center text-gold/50 text-xs font-heading italic mt-3">
                      À votre santé
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className={`gold-line-thin transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      </header>

      {/* Mobile Bottom Navigation — app-like */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bottom-nav-glass safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 text-olive/60 hover:text-bordeaux transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
