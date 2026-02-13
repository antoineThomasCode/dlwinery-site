"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";

export function CtaSection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/winery-terrace.webp"
          alt="Terrace at Domaine LeSeurre"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-pourpre-deep/50 to-olive-deep/80" />
        {/* Scroll-triggered blobs */}
        <SectionBlobs
          isVisible={isVisible}
          blobs={[
            { type: "pourpre", size: "55%", position: { top: "-10%", right: "0" } },
            { type: "gold", size: "50%", position: { bottom: "-5%", left: "10%" } },
            { type: "dark", size: "40%", position: { top: "20%", left: "-10%" } },
          ]}
        />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-[5%] right-[5%] gold-line" />

      <div className="max-w-2xl mx-auto px-6 text-center relative">
        <ScrollReveal>
          {/* Minimal divider */}
          <div className="w-8 h-px bg-gold/40 mx-auto mb-8" />

          <h2 className="font-heading text-[1.75rem] sm:text-4xl md:text-[3rem] font-light mb-4 leading-tight">
            <span className="shimmer-text-light">Ready to Experience</span>
            <br />
            <span className="shimmer-text-light italic">the French Touch?</span>
          </h2>

          <p className="text-warm-white/50 text-[13px] sm:text-base mb-10 sm:mb-12 font-body leading-relaxed max-w-md mx-auto">
            Book your tasting, join Le Cercle, or simply come say <span className="font-heading italic text-gold/60">bonjour</span>. We&apos;re open every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href="/experiences"
              className="btn-cta-primary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
              data-track-event="cta_click"
              data-track-category="final_cta"
              data-track-label="book_tasting"
            >
              Book a Tasting
            </Link>
            <Link
              href="/wine-club"
              className="btn-cta-secondary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
              data-track-event="cta_click"
              data-track-category="final_cta"
              data-track-label="join_club"
            >
              Join Le Cercle
            </Link>
          </div>

          <p className="text-warm-white/25 text-[10px] tracking-[0.2em] uppercase mt-10 font-body">
            Open daily &middot; 10 AM — 6 PM &middot; Reservations recommended
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-[5%] right-[5%] gold-line" />
    </section>
  );
}
