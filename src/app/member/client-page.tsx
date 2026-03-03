"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { Wine, ArrowRight, ExternalLink } from "lucide-react";

export default function MemberPage() {
  return (
    <main className="pt-28 pb-24 min-h-screen bg-cream bg-parchment-texture">
      <div className="max-w-[540px] mx-auto px-5 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
              <FrenchText>Le Cercle</FrenchText>
            </p>
            <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-3">
              Member Portal
            </h1>
            <SectionDivider />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-warm-white border border-gold/10 p-6 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Wine className="w-7 h-7 text-gold" />
            </div>

            <h2 className="font-heading text-xl sm:text-2xl text-pourpre-deep font-light mb-4">
              Coming Soon
            </h2>
            <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              We&apos;re building an exclusive member experience.
              In the meantime, manage your Wine Club membership on Vinoshipper.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://vinoshipper.com/account"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
              >
                Manage My Membership
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <Link
                href="/wine-club"
                className="btn-shimmer-gold inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
              >
                Join Le Cercle
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-stone/50 text-[12px]">
              Questions? Call us at{" "}
              <a href="tel:+16075693299" className="text-gold hover:text-gold-dark transition-colors">
                (607) 569-3299
              </a>{" "}
              or email{" "}
              <a href="mailto:info@dlwinery.com" className="text-gold hover:text-gold-dark transition-colors">
                info@dlwinery.com
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
