"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FrenchText } from "@/components/shared/french-text";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Calendar, Clock, Users, MapPin, Check, ChevronLeft, User, Mail, Phone } from "lucide-react";
import { events } from "@/lib/data/events";

export default function EventDetailPage() {
  const params = useParams();
  const event = events.find((e) => e.slug === params.slug);
  const [tickets, setTickets] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  if (!event) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-cream text-center px-6">
        <h1 className="font-heading text-2xl text-pourpre-deep mb-4">Event Not Found</h1>
        <Link href="/events" className="text-pourpre-deep text-sm underline">Back to Events</Link>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-28 pb-24 min-h-screen bg-cream bg-parchment-texture">
        <div className="max-w-[540px] mx-auto px-5 sm:px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <Check className="w-7 h-7 text-gold" />
          </div>
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
            <FrenchText>Confirmé</FrenchText>
          </p>
          <h1 className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4">
            You&apos;re Registered!
          </h1>
          <p className="text-stone text-sm mb-8">
            A confirmation email has been sent to <strong className="text-pourpre-deep">{form.email}</strong>.
          </p>
          <div className="p-6 bg-warm-white border border-gold/10 text-left space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-stone/70">Event</span>
              <span className="text-pourpre-deep font-medium">{event.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone/70">Date</span>
              <span className="text-pourpre-deep">{event.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone/70">Time</span>
              <span className="text-pourpre-deep">{event.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone/70">Tickets</span>
              <span className="text-pourpre-deep">{tickets}</span>
            </div>
            {event.price > 0 && (
              <>
                <div className="h-px bg-gold/10" />
                <div className="flex justify-between">
                  <span className="text-pourpre-deep font-medium">Total</span>
                  <span className="font-heading text-pourpre-deep text-xl">${event.price * tickets}</span>
                </div>
              </>
            )}
          </div>
          <Link href="/events" className="btn-cta-primary inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium">
            View More Events
          </Link>
        </div>
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

      {/* Content + RSVP */}
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

            {/* RSVP form */}
            <div>
              <div className="sticky top-24 bg-warm-white border border-gold/10 p-5 sm:p-6">
                <h3 className="font-heading text-pourpre-deep text-lg mb-1">
                  {event.price > 0 ? "Reserve Your Spot" : "RSVP — Free Event"}
                </h3>
                {event.price > 0 && (
                  <p className="text-stone/60 text-sm mb-5">${event.price} per person</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                      <User className="w-3 h-3 inline mr-1.5 text-gold/50" /> Full Name
                    </label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-cream border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                      <Mail className="w-3 h-3 inline mr-1.5 text-gold/50" /> Email
                    </label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-cream border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                      <Phone className="w-3 h-3 inline mr-1.5 text-gold/50" /> Phone
                    </label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-cream border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                  </div>

                  {event.price > 0 && (
                    <div>
                      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                        Number of Tickets
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setTickets(n)}
                            className={`w-10 h-10 flex items-center justify-center text-sm transition-colors cursor-pointer ${
                              tickets === n ? "bg-gold text-pourpre-deep font-medium" : "bg-cream border border-gold/15 text-stone/60 hover:border-gold/40"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.price > 0 && (
                    <div className="flex justify-between items-center pt-3 border-t border-gold/10">
                      <span className="text-stone/70 text-sm">Total</span>
                      <span className="font-heading text-pourpre-deep text-xl">${event.price * tickets}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                  >
                    {event.price > 0 ? `Reserve — $${event.price * tickets}` : "RSVP Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
