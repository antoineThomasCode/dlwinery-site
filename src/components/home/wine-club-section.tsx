"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { Wine, Gift, Star, Truck, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Wine, label: "Exclusive Sparkling Wines", detail: "Members-only cuvées" },
  { icon: Gift, label: "15% Off All Purchases", detail: "In-store & online" },
  { icon: Star, label: "Free Tastings + 3 Guests", detail: "Unlimited visits" },
  { icon: Truck, label: "$18 Flat Rate Shipping", detail: "Nationwide delivery" },
];

export function WineClubSection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="relative py-[var(--section-gap)] overflow-hidden">
      {/* Background — parallax */}
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="/images/club-love-story.webp"
          alt="Wine Club Le Cercle"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-olive-deep/90 via-black/60 to-pourpre-deep/70" />
        {/* Scroll-triggered blobs */}
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "pourpre", size: "45%", position: { bottom: "0", right: "-10%" } },
            { type: "champagne", size: "40%", position: { top: "10%", left: "-5%" } },
          ]}
          parallax={[
            { speed: -0.4 },
            { speed: -0.6 },
          ]}
        />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-[5%] right-[5%] gold-line" />

      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <ScrollReveal>
            <div>
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
                <FrenchText>Le Cercle</FrenchText>
              </p>
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] font-light mb-2 leading-tight">
                <LineMaskLine><span className="shimmer-text-light">Join Our</span></LineMaskLine>
                <LineMaskLine><span className="shimmer-text-light italic">Wine Club</span></LineMaskLine>
              </LineMaskReveal>
              <SectionDivider variant="light" className="justify-start mb-6 sm:mb-7" />
              <p className="text-warm-white/55 text-[13px] sm:text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Exclusive wines. Private events. A taste of France, delivered to your door three times a year.
                Membership is complimentary — just a love of fine wine.
              </p>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10">
                {benefits.map((b) => (
                  <div key={b.label} className="flex items-start gap-3 p-3.5 rounded-none bg-warm-white/4 border-l-2 border-gold/15 hover:bg-warm-white/6 transition-all duration-300">
                    <b.icon className="w-4 h-4 text-gold/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-warm-white/90 text-[13px] sm:text-sm font-medium block leading-snug">{b.label}</span>
                      <span className="text-warm-white/30 text-[11px] sm:text-xs">{b.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="btn-cta-primary bg-gold hover:bg-gold-light text-olive-deep text-[13px] sm:text-sm px-8 sm:px-10 py-6 sm:py-5 rounded-none tracking-[0.12em] uppercase font-semibold transition-all duration-500"
                >
                  <Link
                    href="/wine-club"
                    data-track-event="cta_click"
                    data-track-category="wine_club"
                    data-track-label="join_le_cercle"
                  >
                    Become a Member
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="btn-cta-secondary text-warm-white text-[13px] sm:text-sm px-8 sm:px-10 py-6 sm:py-5 rounded-none tracking-[0.12em] uppercase transition-all duration-500"
                >
                  <Link href="/wine-club" className="inline-flex items-center gap-2">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Image card */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative hidden sm:block">
              <ClipPathReveal direction="right" duration={1.3} className="relative aspect-[3/4] rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="/images/wine-club-1.webp"
                  alt="Wine Club members enjoying a private tasting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e9fPQAJoQN4oGLsFwAAAABJRU5ErkJggg=="
                />
              </ClipPathReveal>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-warm-white rounded-none p-5 shadow-xl border-l-2 border-gold/30">
                <p className="text-olive font-heading text-3xl font-semibold">$0</p>
                <p className="text-stone text-xs">Membership fee</p>
                <div className="w-8 h-px bg-gold/20 my-2.5" />
                <p className="text-gold/70 text-xs font-medium tracking-[0.1em] uppercase">Classic Tier</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-[5%] right-[5%] gold-line" />
    </section>
  );
}
