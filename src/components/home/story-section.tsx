"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        blobs={[
          { type: "pourpre", size: "50%", position: { top: "-10%", right: "-15%" } },
          { type: "olive", size: "35%", position: { bottom: "5%", left: "-10%" } },
        ]}
      />
      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Images */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-none overflow-hidden shadow-lg">
                <Image
                  src="/images/owners-photo-1.webp"
                  alt="Céline & Sébastien LeSeurre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Overlapping heritage image */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 w-[40%] sm:w-[45%] aspect-square rounded-none overflow-hidden shadow-xl border-l-2 border-gold/25">
                <Image
                  src="/images/story-vendanges-1947.jpg"
                  alt="Vendanges in Champagne, 1947"
                  fill
                  className="object-cover sepia-[0.15]"
                  sizes="200px"
                />
                {/* Heritage badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-olive-deep/90 py-1.5 px-2 text-center">
                  <p className="text-gold/70 text-[8px] sm:text-[9px] tracking-[0.15em] uppercase font-medium">Champagne &middot; 1947</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text */}
          <ScrollReveal delay={0.15}>
            <div className="lg:pl-4 pt-10 lg:pt-0">
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
                <FrenchText>Notre Histoire</FrenchText>
              </p>
              <h2 className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-2 leading-tight">
                <span className="shimmer-text">From Champagne</span>
                <br />
                <span className="shimmer-text italic">to Keuka Lake</span>
              </h2>
              <SectionDivider className="justify-start mb-6 sm:mb-7" />

              <p className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed mb-3.5">
                From a 6th-generation Champagne family to the shores of Keuka Lake — Céline and Sébastien LeSeurre brought their French winemaking heritage to create something truly unique in the Finger Lakes.
              </p>
              <p className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed mb-7">
                Their journey took them from France to New Zealand, Australia, and finally to Hammondsport in 2012, where they fell in love with the terroir and built their American dream.
              </p>

              {/* Quote */}
              <blockquote className="relative border-l-2 border-pourpre/20 pl-5 mb-8 py-1">
                <p className="font-heading italic text-olive/80 text-base sm:text-lg md:text-xl leading-relaxed">
                  We taste regularly — every two or three days — relying on taste over Brix measurements.
                </p>
                <cite className="text-stone text-[13px] sm:text-sm not-italic mt-3 block">
                  — <span className="text-olive font-medium">Sébastien LeSeurre</span>, Winemaker
                </cite>
              </blockquote>

              <Link
                href="/our-story"
                className="inline-flex items-center gap-2.5 text-olive text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
                data-track-event="cta_click"
                data-track-category="story"
                data-track-label="read_our_story"
              >
                Read Our Full Story
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
