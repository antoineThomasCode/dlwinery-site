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
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { Clock, Users, ArrowRight } from "lucide-react";

const experiences = [
  {
    id: "educational",
    name: "Educational Wine Tasting",
    subtitle: "Discover the Finger Lakes",
    price: 15,
    duration: "45 min",
    maxGuests: 8,
    description: "Explore our award-winning wines with a guided tasting. Learn about Finger Lakes terroir and French winemaking techniques.",
    image: "/images/experience-tasting-1.webp",
  },
  {
    id: "macaron",
    name: "A Taste of France",
    subtitle: "Wine & Macaron Pairing",
    price: 28,
    duration: "60 min",
    maxGuests: 6,
    description: "An exclusive pairing of our finest wines with artisanal French macarons. A sensory journey to the heart of France.",
    image: "/images/winery-wine-macaron.webp",
    featured: true,
  },
  {
    id: "signature",
    name: "Signature Wine & Food",
    subtitle: "The Complete Experience",
    price: 35,
    duration: "75 min",
    maxGuests: 6,
    description: "Our premium experience: curated wine and artisanal food pairings, private terrace setting, and the full Domaine LeSeurre story.",
    image: "/images/experience-tasting-3.webp",
  },
];

export function ExperiencesSection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
      {/* Top line */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />

      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        blobs={[
          { type: "olive", size: "50%", position: { top: "-10%", left: "-15%" } },
          { type: "gold", size: "40%", position: { bottom: "-5%", right: "-10%" } },
        ]}
      />

      <div className="max-w-[var(--max-width)] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 px-6">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
              <FrenchText>Dégustation</FrenchText>
            </p>
            <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-4 sm:mb-5 leading-tight">
              <LineMaskLine><span className="shimmer-text">Your Tasting Awaits</span></LineMaskLine>
            </LineMaskReveal>
            <p className="text-stone text-[13px] sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Choose your experience and let us take care of the rest.
            </p>
            <SectionDivider className="mt-5 sm:mt-6" />
          </div>
        </ScrollReveal>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 scrollbar-hide" data-lenis-prevent>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="snap-center flex-shrink-0 w-[82vw] max-w-[340px]"
              >
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 px-6">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.id} delay={i * 0.12}>
              <ExperienceCard exp={exp} />
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        <ScrollReveal>
          <div className="text-center mt-12 sm:mt-14 px-6">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2.5 text-olive text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
              data-track-event="cta_click"
              data-track-category="experiences"
              data-track-label="view_all"
            >
              View All Experiences
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: typeof experiences[number] }) {
  return (
    <div className={`card-heritage group overflow-hidden bg-warm-white rounded-none h-full flex flex-col ${"featured" in exp && exp.featured ? "md:-mt-2 md:mb-2 md:shadow-lg" : ""}`}>
      {/* Image — clip-path reveal */}
      <ClipPathReveal direction="up" duration={1.1} className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 82vw, 33vw"
        />
        {/* Price badge */}
        <div className="absolute top-0 right-0 bg-olive-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
          ${exp.price}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </ClipPathReveal>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-medium mb-1.5">
          {exp.subtitle}
        </p>
        <h3 className="font-heading text-xl sm:text-2xl text-olive mb-2.5 leading-tight">
          {exp.name}
        </h3>
        <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-4 flex-1">
          {exp.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] text-stone/50 mb-5 pb-4 border-b border-gold/8">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold/40" />
            {exp.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold/40" />
            Up to {exp.maxGuests}
          </span>
        </div>

        <Button
          asChild
          className="w-full btn-shimmer bg-olive hover:bg-olive-deep text-warm-white rounded-none h-11 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-400"
        >
          <Link
            href={`/experiences?select=${exp.id}`}
            data-track-event="cta_click"
            data-track-category="experiences"
            data-track-label={`book_${exp.id}`}
          >
            Reserve This Experience
          </Link>
        </Button>
      </div>
    </div>
  );
}
