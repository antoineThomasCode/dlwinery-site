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
import { Calendar, ArrowRight } from "lucide-react";

const events = [
  {
    id: "jazz-terrace",
    title: "Jazz on the Terrace",
    date: "March 15, 2026",
    time: "5:00 PM — 8:00 PM",
    price: 25,
    description: "Live jazz, local wines, and sunset views over Keuka Lake. An evening to remember.",
    image: "/images/winery-event-1.jpg",
  },
  {
    id: "spring-release",
    title: "Spring Release Party",
    date: "April 5, 2026",
    time: "12:00 PM — 4:00 PM",
    price: 0,
    description: "Be the first to taste our new spring releases. Wine Club members enjoy exclusive early access.",
    image: "/images/winery-event-2.jpg",
  },
  {
    id: "wine-food-fest",
    title: "Finger Lakes Wine & Food Festival",
    date: "May 17, 2026",
    time: "11:00 AM — 6:00 PM",
    price: 45,
    description: "A celebration of local flavors featuring Finger Lakes wineries and artisan food producers.",
    image: "/images/winery-event-3.jpg",
  },
];

export function EventsSection() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-warm-white relative overflow-hidden">
      {/* Top line */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />

      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        blobs={[
          { type: "gold", size: "50%", position: { top: "-15%", right: "-10%" } },
          { type: "champagne", size: "40%", position: { bottom: "-10%", left: "5%" } },
        ]}
      />

      <div className="max-w-[var(--max-width)] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 px-6">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
              <FrenchText>Nos Événements</FrenchText>
            </p>
            <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-4 sm:mb-5 leading-tight">
              <LineMaskLine><span className="shimmer-text">Gather. Taste. Celebrate.</span></LineMaskLine>
            </LineMaskReveal>
            <p className="text-stone text-[13px] sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              From intimate tastings to lively festivals, there&apos;s always something happening at Domaine LeSeurre.
            </p>
            <SectionDivider className="mt-5 sm:mt-6" />
          </div>
        </ScrollReveal>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 scrollbar-hide" data-lenis-prevent>
            {events.map((event) => (
              <div
                key={event.id}
                className="snap-center flex-shrink-0 w-[78vw] max-w-[320px]"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 px-6">
          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.1}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12 sm:mt-14 px-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 text-olive text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
            >
              View All Events
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: typeof events[number] }) {
  return (
    <div className="card-heritage group overflow-hidden bg-cream rounded-none h-full flex flex-col">
      <ClipPathReveal direction="up" duration={1.1} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 78vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e9fPQAJoQN4oGLsFwAAAABJRU5ErkJggg=="
        />
        {event.price > 0 ? (
          <div className="absolute top-0 right-0 bg-olive-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
            ${event.price}
          </div>
        ) : (
          <div className="absolute top-0 right-0 bg-olive/90 text-warm-white text-[13px] font-body font-medium px-4 py-2">
            Free
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/15 to-transparent" />
      </ClipPathReveal>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[11px] text-stone/60 mb-3">
          <Calendar className="w-3.5 h-3.5 text-gold/50" />
          <span>{event.date} &middot; {event.time}</span>
        </div>
        <h3 className="font-heading text-xl text-olive mb-2 leading-tight">{event.title}</h3>
        <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-5 flex-1">{event.description}</p>
        <Button
          asChild
          variant="outline"
          className="w-full btn-shimmer-gold border-olive/10 text-olive hover:bg-olive hover:text-warm-white hover:border-olive rounded-none h-11 sm:h-10 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-400"
        >
          <Link
            href={`/events/${event.id}`}
            data-track-event="cta_click"
            data-track-category="events"
            data-track-label={event.id}
          >
            Reserve My Spot
          </Link>
        </Button>
      </div>
    </div>
  );
}
