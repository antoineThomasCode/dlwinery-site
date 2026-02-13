"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { InkDivider } from "@/components/shared/ink-divider";
import { InkDraw } from "@/components/shared/ink-draw";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        sectionRef={sectionRef}
        blobs={[
          { type: "pourpre", size: "65%", position: { top: "-10%", right: "-20%" } },
          { type: "olive", size: "50%", position: { bottom: "0%", left: "-15%" } },
          { type: "champagne", size: "40%", position: { top: "30%", left: "50%" } },
        ]}
        parallax={[
          { speed: 0.5, rotation: 8 },
          { speed: 0.3, rotation: -5 },
          { speed: 0.2 },
        ]}
      />
      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Images */}
          <div className="relative">
            {/* Main image — clip-path reveal + parallax */}
            <ClipPathReveal direction="up" duration={1.2} className="relative aspect-[4/5] sm:aspect-[4/5] rounded-none shadow-lg">
              <ParallaxImage
                src="/images/owners-photo-1.webp"
                alt="Céline & Sébastien LeSeurre"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0"
              />
            </ClipPathReveal>
            {/* Overlapping heritage image */}
            <ClipPathReveal direction="left" delay={0.4} duration={1.0} className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 w-[40%] sm:w-[45%] aspect-square rounded-none overflow-hidden shadow-xl border-l-2 border-gold/25">
              <Image
                src="/images/story-vendanges-1947.jpg"
                alt="Vendanges in Champagne, 1947"
                fill
                className="object-cover sepia-[0.15]"
                sizes="200px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e9fPQAJoQN4oGLsFwAAAABJRU5ErkJggg=="
              />
              {/* Heritage badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-olive-deep/90 py-1.5 px-2 text-center">
                <p className="text-gold/70 text-[8px] sm:text-[9px] tracking-[0.15em] uppercase font-medium">Champagne &middot; 1947</p>
              </div>
            </ClipPathReveal>
          </div>

          {/* Right: Text */}
          <ScrollReveal delay={0.15}>
            <div className="lg:pl-4 pt-10 lg:pt-0">
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
                <FrenchText>Notre Histoire</FrenchText>
              </p>
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-2 leading-tight">
                <LineMaskLine><span className="shimmer-text">From Champagne</span></LineMaskLine>
                <LineMaskLine><span className="shimmer-text italic">to Keuka Lake</span></LineMaskLine>
              </LineMaskReveal>
              <InkDivider className="justify-start mb-6 sm:mb-7" />

              <p className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed mb-3.5">
                From a 6th-generation Champagne family to the shores of Keuka Lake — Céline and Sébastien LeSeurre brought their French winemaking heritage to create something truly unique in the Finger Lakes.
              </p>
              <p className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed mb-7">
                Their journey took them from France to New Zealand, Australia, and finally to Hammondsport in 2012, where they fell in love with the terroir and built their American dream.
              </p>

              {/* Decorative French calligraphic quote — ink wash accent */}
              <p
                className="font-heading italic text-pourpre/[0.07] text-[3rem] sm:text-[4rem] leading-none select-none pointer-events-none -rotate-3 -mb-6 -ml-2"
                aria-hidden="true"
              >
                L&apos;art de vivre
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

              {/* Vine ornament — ink draw on scroll */}
              <InkDraw
                src="/images/ink/vine-ornament.svg"
                className="w-full max-w-[160px] opacity-15 mb-6"
                delay={0.3}
                duration={1.2}
                stagger={0.12}
              />

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
