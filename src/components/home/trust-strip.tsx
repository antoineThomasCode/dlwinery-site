"use client";

import { ScrollReveal, StaggerChild } from "@/components/shared/scroll-reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Star, Award, Calendar, Users } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-10 bg-warm-white relative overflow-hidden">
      {/* Top and bottom lines */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />
      <div className="gold-line-thin absolute bottom-0 left-[10%] right-[10%]" />

      <ScrollReveal direction="none" stagger staggerDelay={0.12}>
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          {/* Mobile: 2x2 grid / Desktop: horizontal row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
            {/* Google Rating — animated counter */}
            <StaggerChild>
              <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:border-r md:border-gold/10">
                <Star className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-pourpre-deep text-[11px] sm:text-xs font-body font-medium tracking-[0.08em] uppercase leading-tight">
                    <AnimatedCounter value={4.8} decimals={1} duration={2} />/5
                  </p>
                  <p className="text-stone/50 text-[9px] sm:text-[10px] tracking-[0.06em] uppercase leading-tight">
                    Google Rating
                  </p>
                </div>
              </div>
            </StaggerChild>

            {/* Award-Winning */}
            <StaggerChild>
              <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:border-r md:border-gold/10">
                <Award className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-pourpre-deep text-[11px] sm:text-xs font-body font-medium tracking-[0.08em] uppercase leading-tight">
                    Award-Winning
                  </p>
                  <p className="text-stone/50 text-[9px] sm:text-[10px] tracking-[0.06em] uppercase leading-tight">
                    Wines
                  </p>
                </div>
              </div>
            </StaggerChild>

            {/* Est. 2012 */}
            <StaggerChild>
              <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:border-r md:border-gold/10">
                <Calendar className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-pourpre-deep text-[11px] sm:text-xs font-body font-medium tracking-[0.08em] uppercase leading-tight">
                    Est. <AnimatedCounter value={2012} decimals={0} duration={2.5} />
                  </p>
                  <p className="text-stone/50 text-[9px] sm:text-[10px] tracking-[0.06em] uppercase leading-tight">
                    Finger Lakes
                  </p>
                </div>
              </div>
            </StaggerChild>

            {/* 6th Generation */}
            <StaggerChild>
              <div className="flex items-center justify-center gap-3 py-2 md:py-0">
                <Users className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-pourpre-deep text-[11px] sm:text-xs font-body font-medium tracking-[0.08em] uppercase leading-tight">
                    <AnimatedCounter value={6} decimals={0} duration={1.5} suffix="th" /> Generation
                  </p>
                  <p className="text-stone/50 text-[9px] sm:text-[10px] tracking-[0.06em] uppercase leading-tight">
                    Champagne Heritage
                  </p>
                </div>
              </div>
            </StaggerChild>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
