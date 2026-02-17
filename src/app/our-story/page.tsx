"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { InkDivider } from "@/components/shared/ink-divider";
import { InkDraw } from "@/components/shared/ink-draw";
import { WineIcon } from "@/components/ui/wine-icon";
import { ArrowRight } from "lucide-react";

const timeline = [
  {
    year: "6 Generations",
    title: "Champagne Roots",
    description: "The LeSeurre family has been making wine in Champagne, France, for six generations. The craft of winemaking is in the blood — passed down from parent to child, vintage after vintage.",
    image: "/images/story-vendanges-1947.jpg",
    imageAlt: "Vendanges in Champagne, 1947",
  },
  {
    year: "2000s",
    title: "A Global Journey",
    description: "Sébastien trained alongside master winemakers in New Zealand and Australia, absorbing New World techniques while staying true to Old World principles. Each vineyard taught him something new about terroir and expression.",
    image: "/images/owners-photo-1.webp",
    imageAlt: "Sébastien LeSeurre",
  },
  {
    year: "2012",
    title: "Falling for Keuka Lake",
    description: "Céline and Sébastien discovered the Finger Lakes — a region with a microclimate remarkably similar to their homeland. The cool-climate terroir, steep slopes, and deep glacial lakes reminded them of the conditions that make Champagne so special.",
    image: "/images/winery-scenic-view.webp",
    imageAlt: "Keuka Lake vineyard view",
  },
  {
    year: "2014",
    title: "Domaine LeSeurre is Born",
    description: "With a small vineyard on the west shore of Keuka Lake, the couple began crafting wines that bridge Old World elegance and New World character. Méthode champenoise sparkling, Burgundy-style Chardonnay, Loire-inspired Cabernet Franc — all with a distinctly Finger Lakes expression.",
    image: "/images/experience-tasting-1.webp",
    imageAlt: "Wine tasting at Domaine LeSeurre",
  },
  {
    year: "Today",
    title: "A French Accent on Keuka Lake",
    description: "What started as a dream has become one of the most celebrated wineries in the Finger Lakes. Domaine LeSeurre is known for its French-inspired approach, warm hospitality, and wines that tell the story of two worlds meeting in one glass.",
    image: "/images/winery-terrace-dining.jpg",
    imageAlt: "Terrace dining at Domaine LeSeurre",
  },
];

export default function OurStoryPage() {
  const { sectionRef: storyRef, isVisible: storyVisible } = useSectionBlobs();
  const { sectionRef: valuesRef, isVisible: valuesVisible } = useSectionBlobs();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/owners-photo-1.webp"
          alt="Céline & Sébastien LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[rgba(38,50,27,0.7)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Notre Histoire</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">From Champagne to Keuka Lake</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-lg mx-auto">
            Six generations of French winemaking tradition, one unforgettable lakeside story.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 bg-cream bg-parchment-texture relative overflow-hidden">
        <div className="max-w-[720px] mx-auto px-5 sm:px-6 text-center">
          <ScrollReveal>
            <blockquote className="font-heading italic text-pourpre-deep/80 text-lg sm:text-2xl md:text-3xl leading-relaxed mb-6">
              &ldquo;We taste regularly — every two or three days — relying on taste over Brix measurements. It&apos;s the French way.&rdquo;
            </blockquote>
            <cite className="text-stone text-sm not-italic block mb-6">
              — <span className="text-pourpre-deep font-medium">Sébastien LeSeurre</span>, Winemaker
            </cite>
            <InkDivider className="justify-center" />
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section ref={storyRef} className="py-[var(--section-gap)] bg-warm-white relative overflow-hidden">
        <SectionBlobs
          isVisible={storyVisible}
          sectionRef={storyRef}
          blobs={[
            { type: "olive", size: "60%", position: { top: "-10%", left: "-15%" } },
            { type: "champagne", size: "50%", position: { bottom: "-5%", right: "-10%" } },
          ]}
          parallax={[{ speed: 0.4 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-14 sm:mb-18">
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-4 leading-tight">
                <LineMaskLine><span className="shimmer-text">Our Journey</span></LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="space-y-16 sm:space-y-24">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <ScrollReveal delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                  <ClipPathReveal direction={i % 2 === 0 ? "left" : "right"} duration={1.2} className="relative aspect-[4/3] rounded-none overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className={`object-cover ${i === 0 ? "sepia-[0.15]" : ""}`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </ClipPathReveal>
                </ScrollReveal>

                {/* Text */}
                <ScrollReveal delay={0.2} className={i % 2 === 1 ? "lg:order-first" : ""}>
                  <div className="lg:px-4">
                    <p className="text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-3 font-body font-medium">
                      {item.year}
                    </p>
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-pourpre-deep mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={valuesVisible}
          sectionRef={valuesRef}
          blobs={[
            { type: "gold", size: "55%", position: { top: "-10%", right: "-15%" } },
            { type: "pourpre", size: "45%", position: { bottom: "-5%", left: "-10%" } },
          ]}
          parallax={[{ speed: 0.3 }, { speed: 0.4 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4 leading-tight">
                <LineMaskLine><span className="shimmer-text">Our Philosophy</span></LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Terroir First",
                desc: "We believe wine should express its place. Every vintage is a conversation between the vine, the soil, and the climate of Keuka Lake.",
              },
              {
                title: "French Craft, New World Spirit",
                desc: "Old World techniques meet New World innovation. We honor tradition while embracing the unique character of the Finger Lakes.",
              },
              {
                title: "Hospitality as Art",
                desc: "Every visit should feel like a visit to friends in the French countryside. Warm, generous, and full of discoveries.",
              },
            ].map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card-heritage bg-warm-white rounded-none p-6 sm:p-8 text-center h-full">
                  <div className="w-10 h-10 mx-auto mb-5 flex items-center justify-center bg-gold/8">
                    <WineIcon className="w-5 h-5 text-gold/70" />
                  </div>
                  <h3 className="font-heading text-pourpre-deep text-lg mb-3">{v.title}</h3>
                  <p className="text-stone text-[13px] sm:text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-pourpre-deep relative overflow-hidden">
        <div className="max-w-[600px] mx-auto px-5 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
              <FrenchText>Rendez-Vous</FrenchText>
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-3xl text-warm-white font-light mb-6 leading-tight">
              Come Write the Next Chapter With Us
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/experiences"
                className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-10 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
              >
                <WineIcon className="w-4 h-4" /> Book a Tasting
              </Link>
              <Link
                href="/wines"
                className="btn-cta-secondary inline-flex items-center justify-center gap-2 rounded-none h-12 px-10 text-[11px] tracking-[0.15em] uppercase font-body font-medium text-warm-white"
              >
                Explore Our Wines <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
