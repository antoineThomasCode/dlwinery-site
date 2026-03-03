"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FrenchText } from "@/components/shared/french-text";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Calendar, Clock, Users, MapPin, ChevronLeft, Phone, Mail, ExternalLink } from "lucide-react";
import { events } from "@/lib/data/events";

export default function EventDetailPage() {
  const params = useParams();
  const event = events.find((e) => e.slug === params.slug);

  if (!event) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-cream text-center px-6">
        <h1 className="font-heading text-2xl text-pourpre-deep mb-4">Event Not Found</h1>
        <Link href="/events" className="text-pourpre-deep text-sm underline">Back to Events</Link>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <ParallaxImage
          src={event.image!}
          alt={event.title}
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 max-w-[var(--max-width)] mx-auto px-6 pb-10 w-full">
          <Link href="/events" className="flex items-center gap-1.5 text-warm-white/60 text-[11px] tracking-[0.1em] uppercase font-body mb-4 hover:text-warm-white transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" /> All Events
          </Link>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-warm-white/60 text-[12px]">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold/60" /> {event.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold/60" /> {event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gold/60" /> Domaine LeSeurre, Keuka Lake</span>
          </div>
        </div>
      </section>

      {/* Content + Reserve */}
      <section className="py-16 sm:py-20 bg-cream bg-parchment-texture">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
            {/* Description */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl text-pourpre-deep mb-5">About This Event</h2>
                {event.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-stone text-[13px] sm:text-sm md:text-base leading-relaxed mb-4">
                    {para}
                  </p>
                ))}

                <div className="flex items-center gap-2 mt-6 p-4 bg-warm-white border border-gold/10">
                  <Users className="w-4 h-4 text-gold/50" />
                  <span className="text-stone text-sm">
                    <strong className="text-pourpre-deep">{event.spotsLeft}</strong> spots remaining out of {event.capacity}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Reserve — contact CTA */}
            <div>
              <div className="sticky top-24 bg-warm-white border border-gold/10 p-5 sm:p-6">
                <h3 className="font-heading text-pourpre-deep text-lg mb-1">
                  {event.price > 0 ? "Reserve Your Spot" : "RSVP — Free Event"}
                </h3>
                {event.price > 0 && (
                  <p className="text-stone/60 text-sm mb-5">${event.price} per person</p>
                )}
                {event.price === 0 && (
                  <p className="text-stone/60 text-sm mb-5">No ticket required</p>
                )}

                <p className="text-stone text-[13px] leading-relaxed mb-6">
                  To reserve your spot, please call us or send an email. We&apos;ll confirm your reservation within 24 hours.
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+16075693299"
                    className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call (607) 569-3299
                  </a>
                  <a
                    href={`mailto:info@dlwinery.com?subject=RSVP: ${event.title} — ${event.date}`}
                    className="w-full flex items-center justify-center gap-2 btn-shimmer-gold rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Us
                  </a>
                </div>

                <div className="pt-4 border-t border-gold/8 space-y-2">
                  <div className="flex items-center gap-2 text-[12px] text-stone/50">
                    <Calendar className="w-3.5 h-3.5 text-gold/40" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-stone/50">
                    <Clock className="w-3.5 h-3.5 text-gold/40" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-stone/50">
                    <MapPin className="w-3.5 h-3.5 text-gold/40" />
                    Domaine LeSeurre, Keuka Lake
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
