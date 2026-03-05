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
import { Calendar, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { events } from "@/lib/data/events";

export default function EventsPage() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/winery-event-1.jpg"
          alt="Events at Domaine LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Nos Événements</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Gather. Taste. Celebrate.</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-md mx-auto">
            From intimate tastings to lively festivals, there&apos;s always something happening.
          </p>
        </div>
      </section>

      {/* Events list */}
      <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "gold", size: "60%", position: { top: "-10%", right: "-15%" } },
            { type: "olive", size: "50%", position: { bottom: "-5%", left: "-10%" } },
          ]}
          parallax={[{ speed: 0.4 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-4 leading-tight">
                <LineMaskLine><span className="shimmer-text">Upcoming Events</span></LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {events.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.08}>
                <div className="card-heritage group overflow-hidden bg-warm-white rounded-none">
                  <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr]">
                    {/* Image */}
                    <ClipPathReveal direction="left" duration={1.1} className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px] overflow-hidden">
                      <Image
                        src={event.image!}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {event.price > 0 ? (
                        <div className="absolute top-0 right-0 bg-pourpre-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
                          ${event.price}
                        </div>
                      ) : (
                        <div className="absolute top-0 right-0 bg-pourpre/90 text-warm-white text-[13px] font-body font-medium px-4 py-2">
                          Free
                        </div>
                      )}
                    </ClipPathReveal>

                    {/* Content */}
                    <div className="p-5 sm:p-6 lg:p-8 flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone/60 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold/50" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold/50" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gold/50" />
                          {event.spotsLeft} spots left
                        </span>
                      </div>

                      <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl text-pourpre-deep mb-3 leading-tight">
                        {event.title}
                      </h2>
                      <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-5 flex-1">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/events/${event.slug}`}
                          className="flex items-center justify-center gap-2 btn-cta-primary rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
                          data-track-event="cta_click"
                          data-track-category="events"
                          data-track-label={event.slug}
                        >
                          {event.price > 0 ? "Reserve My Spot" : "RSVP — Free"}
                        </Link>
                        <Link
                          href={`/events/${event.slug}`}
                          className="text-pourpre-deep text-[11px] font-body font-medium tracking-[0.1em] uppercase hover:text-pourpre transition-colors group hidden sm:inline-flex items-center gap-1.5"
                        >
                          Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
