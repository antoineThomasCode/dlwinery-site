"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { WineIcon } from "@/components/ui/wine-icon";
import {
  Clock, Users, Check, ArrowRight, Star, ExternalLink,
} from "lucide-react";
import { experiences } from "@/lib/data/experiences";

const SQUARE_BOOKING_URL =
  "https://book.squareup.com/appointments/1bmq73zitx9y4n/location/ANY786TGF515Z/";

const AMBIANCE_PHOTOS = [
  { src: "/images/experience-social-1.webp", alt: "Guests enjoying wine tasting at Domaine LeSeurre" },
  { src: "/images/experience-social-2.webp", alt: "Friends sharing a tasting experience on the terrace" },
  { src: "/images/experience-tasting-2.webp", alt: "Guided wine tasting with Celine LeSeurre" },
  { src: "/images/winery-tasting-room-2.webp", alt: "The tasting room at Domaine LeSeurre" },
];

/* ═══════════════════════════════════════════
   Wrapper with Suspense
   ═══════════════════════════════════════════ */
export default function ExperiencesPageWrapper() {
  return (
    <Suspense>
      <ExperiencesPage />
    </Suspense>
  );
}

/* ═══════════════════════════════════════════
   Main page component
   ═══════════════════════════════════════════ */
function ExperiencesPage() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <main>
      {/* ── Hero — compact on mobile ── */}
      <section className="relative h-[36vh] min-h-[260px] sm:h-[44vh] sm:min-h-[320px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/experience-tasting-3.webp"
          alt="Tasting experiences at Domaine LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 sm:mb-4 font-body font-medium">
            <FrenchText>Degustation</FrenchText>
          </p>
          <h1 className="font-heading text-[1.75rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-3 sm:mb-4">
            <span className="shimmer-text-light">Tasting Experiences</span>
          </h1>
          <p className="text-warm-white/60 text-[13px] sm:text-base max-w-md mx-auto">
            Choose your experience and let us take care of the rest.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         "Your Tasting, Your Way" — Ambiance section
         ═══════════════════════════════════════════ */}
      <section className="py-12 sm:py-[var(--section-gap)] bg-warm-white overflow-hidden">
        <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <LineMaskReveal className="font-heading text-[1.5rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-3 sm:mb-4 leading-tight">
                <LineMaskLine>
                  <span className="shimmer-text">Your Tasting, Your Way</span>
                </LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
              <p className="text-stone/60 text-[13px] sm:text-sm max-w-lg mx-auto mt-3 sm:mt-4">
                Whether you&apos;re a first-time visitor or a seasoned collector, every glass tells a story.
              </p>
            </div>
          </ScrollReveal>

          {/* Photo strip — mobile: horizontal scroll, desktop: 4-col grid */}
          <div
            className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible"
            data-lenis-prevent
          >
            {AMBIANCE_PHOTOS.map((photo, i) => (
              <ClipPathReveal
                key={photo.src}
                direction="up"
                duration={1.1}
                delay={i * 0.12}
                className="flex-shrink-0 w-[75vw] snap-center md:w-auto"
              >
                <div className="relative h-[280px] sm:h-[320px] md:h-[360px] rounded-xl overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 75vw, 25vw"
                  />
                </div>
              </ClipPathReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         Experience Cards
         ═══════════════════════════════════════════ */}
      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="py-12 sm:py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden"
      >
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "olive", size: "65%", position: { top: "-10%", left: "-20%" } },
            { type: "gold", size: "50%", position: { bottom: "-5%", right: "-15%" } },
          ]}
          parallax={[{ speed: 0.5 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-16">
              <LineMaskReveal className="font-heading text-[1.5rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-3 sm:mb-4 leading-tight">
                <LineMaskLine>
                  <span className="shimmer-text">Choose Your Experience</span>
                </LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
              <p className="text-stone/60 text-[13px] sm:text-sm max-w-lg mx-auto mt-3 sm:mt-4">
                From a relaxed glass on the terrace to an immersive food pairing — every visit tells a story.
              </p>
            </div>
          </ScrollReveal>

          {/* Mobile: stacked full-bleed cards | Desktop: 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.08}>
                <div className="card-heritage group overflow-hidden bg-warm-white rounded-none h-full flex flex-col">
                  {/* Mobile: shorter aspect, Desktop: 16/10 */}
                  <ClipPathReveal direction="up" duration={1.1} className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden">
                    <Image
                      src={exp.image!}
                      alt={exp.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {exp.price > 0 && (
                      <div className="absolute top-0 right-0 bg-pourpre-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
                        ${exp.price}
                        <span className="text-gold/50 text-xs">/person</span>
                      </div>
                    )}
                    {exp.price === 0 && (
                      <div className="absolute top-0 right-0 bg-pourpre/90 text-warm-white text-[13px] font-body font-medium px-4 py-2">
                        Walk-in
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                  </ClipPathReveal>

                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
                      {exp.subtitle}
                    </p>
                    <h3 className="font-heading text-lg sm:text-2xl text-pourpre-deep mb-2 leading-tight">
                      {exp.name}
                    </h3>
                    <p className="text-stone text-[13px] leading-relaxed mb-3 sm:mb-4">
                      {exp.description}
                    </p>

                    {/* Mobile: collapsed includes | Desktop: full list */}
                    <ul className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-5">
                      {exp.includes.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-stone/70">
                          <Check className="w-3.5 h-3.5 text-gold/50 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                      {exp.includes.length > 3 && (
                        <li className="text-[11px] text-gold/60 pl-5.5 hidden sm:block">
                          +{exp.includes.length - 3} more included
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-stone/50 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-gold/8 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold/40" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold/40" />
                        Up to {exp.maxGuests}
                      </span>
                      {exp.memberPrice === 0 && exp.price > 0 && (
                        <span className="flex items-center gap-1.5 text-gold">
                          <Star className="w-3.5 h-3.5" />
                          Free for members
                        </span>
                      )}
                    </div>

                    {exp.id !== "walk-in" ? (
                      <div>
                        <a
                          href={SQUARE_BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 sm:h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer active:scale-[0.97] transition-transform"
                        >
                          <WineIcon className="w-3.5 h-3.5" />
                          Reserve This Experience
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                        <p className="text-stone/40 text-[10px] text-center mt-2">
                          You&apos;ll be redirected to our secure booking system
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center h-12 text-[11px] tracking-[0.12em] uppercase font-body font-medium text-stone/50 border border-gold/15">
                        No Reservation Needed
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Member perk */}
          <ScrollReveal>
            <div className="mt-8 sm:mt-16 text-center p-5 sm:p-8 bg-warm-white border border-gold/10">
              <p className="text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-2 font-body font-medium">
                Wine Club Member?
              </p>
              <p className="text-pourpre-deep text-sm sm:text-base font-heading mb-3">
                All tasting experiences are complimentary for members + 3 guests
              </p>
              <Link
                href="/wine-club"
                className="inline-flex items-center gap-2 text-pourpre-deep text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
              >
                Learn about the Family Club
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
         Testimonial — Social Proof
         ═══════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background image at very low opacity */}
        <div className="absolute inset-0">
          <Image
            src="/images/experience-banner.webp"
            alt=""
            fill
            className="object-cover opacity-[0.06]"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-cream/90" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
          <ScrollReveal>
            <blockquote className="text-center">
              {/* Decorative opening quote */}
              <span
                className="block font-heading text-[4rem] sm:text-[5rem] leading-none text-gold/30 select-none mb-[-1rem] sm:mb-[-1.5rem]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-heading text-xl sm:text-2xl md:text-[1.75rem] text-pourpre-deep italic leading-relaxed mb-6">
                We came for the wine. We stayed for the story. C&eacute;line made us feel like family.
              </p>
              {/* Decorative closing quote */}
              <span
                className="block font-heading text-[4rem] sm:text-[5rem] leading-none text-gold/30 select-none mt-[-2rem] sm:mt-[-2.5rem] mb-4"
                aria-hidden="true"
              >
                &rdquo;
              </span>
              <SectionDivider variant="gold" />
              <footer className="mt-4">
                <cite className="not-italic text-stone/60 text-[12px] sm:text-sm tracking-wide font-body">
                  Google Review, 2025
                </cite>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
         CTA — Visit the Tasting Room
         ═══════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[400px] sm:h-[70vh] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/winery-tasting-room-3.webp"
          alt="Domaine LeSeurre tasting room overlooking Keuka Lake"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 sm:mb-4 font-body font-medium">
              <FrenchText>Bienvenue</FrenchText>
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4 sm:mb-6">
              <span className="shimmer-text-light">Come taste France</span>
              <br />
              <span className="shimmer-text-light">on Keuka Lake</span>
            </h2>
            <SectionDivider variant="light" className="mb-6 sm:mb-8" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer active:scale-[0.97] transition-transform"
              >
                <WineIcon className="w-3.5 h-3.5" />
                Book Your Tasting
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-[11px] tracking-[0.12em] uppercase font-body font-medium text-warm-white/60 border border-warm-white/20 rounded-none">
                Walk-ins Welcome
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
