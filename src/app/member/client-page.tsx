"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { WineIcon } from "@/components/ui/wine-icon";
import {
  Wine,
  ArrowRight,
  ExternalLink,
  Gift,
  Star,
  Truck,
  Calendar,
} from "lucide-react";

const shipments = [
  { season: "Spring", month: "March", status: "current" as const },
  { season: "Summer", month: "June", status: "upcoming" as const },
  { season: "Fall", month: "September", status: "upcoming" as const },
];

const benefits = [
  { icon: Gift, title: "15% Off Every Bottle", detail: "In-store and online" },
  { icon: Star, title: "Free Tastings + 3 Guests", detail: "Every visit" },
  { icon: Truck, title: "$18 Flat Shipping", detail: "On club shipments" },
  { icon: Calendar, title: "3 Shipments / Year", detail: "Curated by Sebastien" },
];

export default function MemberPage() {
  return (
    <main className="pt-28 pb-24 min-h-screen bg-cream bg-parchment-texture">
      <div className="max-w-[680px] mx-auto px-5 sm:px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
              <FrenchText>La Famille</FrenchText>
            </p>
            <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-3">
              Member Portal
            </h1>
            <SectionDivider />
          </div>
        </ScrollReveal>

        {/* Quick Links */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="https://vinoshipper.com/account"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary flex-1 inline-flex items-center justify-center gap-2 rounded-none h-12 px-6 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
            >
              Manage My Membership
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <Link
              href="/wines"
              className="btn-shimmer-gold flex-1 inline-flex items-center justify-center gap-2 rounded-none h-12 px-6 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
            >
              Browse Wines
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="btn-shimmer-gold flex-1 inline-flex items-center justify-center gap-2 rounded-none h-12 px-6 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
            >
              Contact Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Shipment Calendar */}
        <ScrollReveal delay={0.15}>
          <div className="mb-10">
            <h2 className="font-heading text-lg sm:text-xl text-pourpre-deep font-light mb-4 text-center">
              Shipment Calendar
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {shipments.map((s) => (
                <div
                  key={s.season}
                  className={`border p-4 text-center transition-colors ${
                    s.status === "current"
                      ? "border-gold/40 bg-gold/5"
                      : "border-gold/10 bg-warm-white"
                  }`}
                >
                  <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                    <WineIcon
                      className={`w-5 h-5 ${
                        s.status === "current" ? "text-gold" : "text-gold/40"
                      }`}
                    />
                  </div>
                  <p
                    className={`font-heading text-sm sm:text-base mb-0.5 ${
                      s.status === "current"
                        ? "text-pourpre-deep font-medium"
                        : "text-pourpre-deep/70"
                    }`}
                  >
                    {s.season}
                  </p>
                  <p className="text-stone/50 text-[11px] uppercase tracking-wide">
                    {s.month}
                  </p>
                  {s.status === "current" && (
                    <span className="inline-block mt-2 text-gold text-[9px] tracking-[0.1em] uppercase font-medium px-2 py-0.5 bg-gold/10">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Your Benefits */}
        <ScrollReveal delay={0.2}>
          <div className="mb-10">
            <h2 className="font-heading text-lg sm:text-xl text-pourpre-deep font-light mb-4 text-center">
              Your Benefits
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-warm-white border border-gold/10 p-4 text-center"
                >
                  <b.icon className="w-5 h-5 text-gold/60 mx-auto mb-2" />
                  <p className="font-heading text-pourpre-deep text-[13px] sm:text-sm mb-0.5">
                    {b.title}
                  </p>
                  <p className="text-stone/50 text-[11px]">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Not a Member CTA */}
        <ScrollReveal delay={0.25}>
          <div className="bg-pourpre-deep p-6 sm:p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-warm-white/10 flex items-center justify-center">
              <Wine className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-warm-white text-lg sm:text-xl font-light mb-2">
              Not a Member Yet?
            </h2>
            <p className="text-warm-white/60 text-[13px] sm:text-sm leading-relaxed mb-5 max-w-sm mx-auto">
              Join 864 members enjoying 15% off every bottle, free tastings, and
              exclusive access to our sparkling wines.
            </p>
            <Link
              href="/wine-club"
              className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
            >
              <WineIcon className="w-4 h-4" />
              Join the Family Club
              <ArrowRight className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Contact footer */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-stone/50 text-[12px]">
              Questions? Call us at{" "}
              <a
                href="tel:+16075693299"
                className="text-gold hover:text-gold-dark transition-colors"
              >
                (607) 569-3299
              </a>{" "}
              or email{" "}
              <a
                href="mailto:info@dlwinery.com"
                className="text-gold hover:text-gold-dark transition-colors"
              >
                info@dlwinery.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
