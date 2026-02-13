"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jennifer M.",
    source: "TripAdvisor",
    rating: 5,
    text: "The best winery experience in the Finger Lakes! Céline made us feel like we were in France. The macaron pairing was divine.",
  },
  {
    name: "David & Lisa R.",
    source: "Google",
    rating: 5,
    text: "We joined the Wine Club after our first visit and haven't looked back. The sparkling wine is world-class, and the terrace views are stunning.",
  },
  {
    name: "Mark T.",
    source: "Google",
    rating: 5,
    text: "A hidden gem on Keuka Lake. The French touch makes all the difference. Sébastien's passion for winemaking shines through every glass.",
  },
];

export function TestimonialsSection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
      {/* Top line */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />

      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        blobs={[
          { type: "olive", size: "40%", position: { top: "-10%", left: "-10%" } },
          { type: "gold", size: "30%", position: { bottom: "0", right: "-5%" } },
        ]}
      />

      <div className="max-w-[var(--max-width)] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 px-6">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
              <FrenchText>Santé</FrenchText>
            </p>
            <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-4 sm:mb-5 leading-tight">
              <LineMaskLine><span className="shimmer-text">What Our Guests Say</span></LineMaskLine>
            </LineMaskReveal>
            <SectionDivider />
          </div>
        </ScrollReveal>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 scrollbar-hide">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-[85vw] max-w-[340px]"
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 px-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <TestimonialCard t={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="card-heritage bg-warm-white rounded-none p-6 sm:p-8 h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star
            key={j}
            className="w-3 h-3 fill-gold/70 text-gold/70"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-olive/70 text-[13px] sm:text-sm md:text-base leading-relaxed mb-6 font-body flex-1">
        &ldquo;{t.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gold/8">
        <div>
          <p className="text-olive font-medium text-[13px] sm:text-sm">{t.name}</p>
          <p className="text-stone/50 text-[11px] sm:text-xs">{t.source}</p>
        </div>
        <div className="w-8 h-8 rounded-none bg-olive/6 flex items-center justify-center">
          <span className="text-olive/60 text-xs font-heading font-semibold">
            {t.name.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
