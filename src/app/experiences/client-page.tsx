"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { WineIcon } from "@/components/ui/wine-icon";
import { Clock, Users, Check, ChevronLeft, ChevronRight, CalendarDays, User, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { experiences, generateTimeSlots } from "@/lib/data/experiences";

type Step = "choose" | "datetime" | "details" | "confirmation";

export default function ExperiencesPageWrapper() {
  return (
    <Suspense>
      <ExperiencesPage />
    </Suspense>
  );
}

function ExperiencesPage() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("select");

  const [step, setStep] = useState<Step>(preselect ? "datetime" : "choose");
  const [selectedExp, setSelectedExp] = useState(
    preselect ? experiences.find((e) => e.id === preselect) ?? null : null
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [guests, setGuests] = useState(2);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const { sectionRef, isVisible } = useSectionBlobs();

  const handleSelectExperience = (exp: typeof experiences[number]) => {
    setSelectedExp(exp);
    setStep("datetime");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDateNext = () => {
    if (selectedDate && selectedSlot) {
      setStep("details");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const slots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <main>
      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/experience-tasting-3.webp"
          alt="Tasting experiences at Domaine LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Dégustation</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Tasting Experiences</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-md mx-auto">
            Choose your experience and let us take care of the rest.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      {step !== "choose" && (
        <div className="bg-warm-white border-b border-gold/10">
          <div className="max-w-[var(--max-width)] mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {(["choose", "datetime", "details", "confirmation"] as Step[]).map((s, i) => {
                const labels = ["Experience", "Date & Time", "Your Details", "Confirmed"];
                const stepIndex = ["choose", "datetime", "details", "confirmation"].indexOf(step);
                const isActive = i <= stepIndex;
                return (
                  <div key={s} className="flex items-center gap-2 sm:gap-4">
                    {i > 0 && <div className={`w-6 sm:w-10 h-px ${isActive ? "bg-gold" : "bg-gold/15"} transition-colors`} />}
                    <div className="flex items-center gap-1.5">
                      <div className={`w-6 h-6 rounded-full text-[10px] font-medium flex items-center justify-center transition-colors ${isActive ? "bg-gold text-pourpre-deep" : "bg-gold/10 text-stone/40"}`}>
                        {i < stepIndex ? <Check className="w-3 h-3" /> : i + 1}
                      </div>
                      <span className={`hidden sm:block text-[11px] tracking-[0.08em] uppercase font-body ${isActive ? "text-pourpre-deep" : "text-stone/40"}`}>
                        {labels[i]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step: Choose experience */}
      {step === "choose" && (
        <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
          <SectionBlobs
            isVisible={isVisible}
            sectionRef={sectionRef}
            blobs={[
              { type: "olive", size: "65%", position: { top: "-10%", left: "-20%" } },
              { type: "gold", size: "50%", position: { bottom: "-5%", right: "-15%" } },
            ]}
            parallax={[{ speed: 0.5 }, { speed: 0.3 }]}
          />
          <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16">
                <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-4 leading-tight">
                  <LineMaskLine><span className="shimmer-text">Choose Your Experience</span></LineMaskLine>
                </LineMaskReveal>
                <SectionDivider />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {experiences.map((exp, i) => (
                <ScrollReveal key={exp.id} delay={i * 0.1}>
                  <div className="card-heritage group overflow-hidden bg-warm-white rounded-none h-full flex flex-col">
                    <ClipPathReveal direction="up" duration={1.1} className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={exp.image!}
                        alt={exp.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {exp.price > 0 && (
                        <div className="absolute top-0 right-0 bg-pourpre-deep/90 text-gold text-sm font-heading font-semibold px-4 py-2">
                          ${exp.price}<span className="text-gold/50 text-xs">/person</span>
                        </div>
                      )}
                      {exp.price === 0 && (
                        <div className="absolute top-0 right-0 bg-pourpre/90 text-warm-white text-[13px] font-body font-medium px-4 py-2">
                          Walk-in
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                    </ClipPathReveal>

                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-medium mb-1.5">
                        {exp.subtitle}
                      </p>
                      <h3 className="font-heading text-xl sm:text-2xl text-pourpre-deep mb-2.5 leading-tight">
                        {exp.name}
                      </h3>
                      <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Includes */}
                      <ul className="space-y-1.5 mb-5">
                        {exp.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[12px] text-stone/70">
                            <Check className="w-3.5 h-3.5 text-gold/50 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-[11px] text-stone/50 mb-5 pb-4 border-b border-gold/8 mt-auto">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold/40" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gold/40" />
                          Up to {exp.maxGuests}
                        </span>
                      </div>

                      {exp.id !== "walk-in" ? (
                        <button
                          onClick={() => handleSelectExperience(exp)}
                          className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                        >
                          <WineIcon className="w-3.5 h-3.5" />
                          Reserve This Experience
                        </button>
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
              <div className="mt-12 sm:mt-16 text-center p-6 sm:p-8 bg-warm-white border border-gold/10">
                <p className="text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-2 font-body font-medium">Wine Club Member?</p>
                <p className="text-pourpre-deep text-sm sm:text-base font-heading mb-3">All tasting experiences are complimentary for members + 3 guests</p>
                <Link
                  href="/wine-club"
                  className="inline-flex items-center gap-2 text-pourpre-deep text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
                >
                  Learn about Le Cercle
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Step: Date & Time */}
      {step === "datetime" && selectedExp && (
        <section className="py-16 sm:py-20 bg-cream bg-parchment-texture relative overflow-hidden">
          <div className="max-w-[680px] mx-auto px-5 sm:px-6">
            <button
              onClick={() => { setStep("choose"); setSelectedExp(null); }}
              className="flex items-center gap-1.5 text-stone/60 text-[11px] tracking-[0.1em] uppercase font-body mb-8 hover:text-pourpre-deep transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Change experience
            </button>

            {/* Selected experience summary */}
            <div className="flex items-center gap-4 p-4 bg-warm-white border border-gold/10 mb-10">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                <Image src={selectedExp.image!} alt={selectedExp.name} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <h3 className="font-heading text-pourpre-deep text-lg leading-tight">{selectedExp.name}</h3>
                <p className="text-stone/60 text-[12px]">{selectedExp.duration} &middot; ${selectedExp.price}/person</p>
              </div>
            </div>

            {/* Date picker */}
            <div className="mb-8">
              <label className="block text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                <CalendarDays className="w-3.5 h-3.5 inline mr-2 text-gold/50" />
                Select a Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(""); }}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Party size */}
            <div className="mb-8">
              <label className="block text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                <Users className="w-3.5 h-3.5 inline mr-2 text-gold/50" />
                Party Size
              </label>
              <div className="flex gap-2">
                {Array.from({ length: selectedExp.maxGuests }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setGuests(n)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-body transition-colors cursor-pointer ${
                      guests === n
                        ? "bg-gold text-pourpre-deep font-medium"
                        : "bg-warm-white border border-gold/15 text-stone/60 hover:border-gold/40"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="mb-10">
                <label className="block text-pourpre-deep text-[11px] tracking-[0.12em] uppercase font-body font-medium mb-3">
                  <Clock className="w-3.5 h-3.5 inline mr-2 text-gold/50" />
                  Available Times
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot) => {
                    const time = new Date(slot.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                    const isFull = slot.spotsLeft === 0;
                    const isSelected = selectedSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        disabled={isFull}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`py-2.5 px-2 text-center transition-colors text-sm cursor-pointer ${
                          isFull
                            ? "bg-stone/5 text-stone/25 cursor-not-allowed line-through"
                            : isSelected
                              ? "bg-gold text-pourpre-deep font-medium"
                              : "bg-warm-white border border-gold/15 text-pourpre-deep hover:border-gold/40"
                        }`}
                      >
                        <span className="block">{time}</span>
                        {!isFull && (
                          <span className={`text-[10px] ${slot.spotsLeft <= 2 ? "text-amber-600" : "text-stone/40"}`}>
                            {slot.spotsLeft} left
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Total & Next */}
            {selectedDate && selectedSlot && (
              <div className="flex items-center justify-between p-5 bg-warm-white border border-gold/10 mb-6">
                <div>
                  <p className="text-stone/50 text-[10px] tracking-[0.1em] uppercase">Total</p>
                  <p className="font-heading text-pourpre-deep text-2xl">
                    ${selectedExp.price * guests}
                  </p>
                  <p className="text-stone/40 text-[11px]">{guests} guest{guests > 1 ? "s" : ""} × ${selectedExp.price}</p>
                </div>
                <button
                  onClick={handleDateNext}
                  className="flex items-center gap-2 btn-cta-primary rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                >
                  Continue <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Step: Details form */}
      {step === "details" && selectedExp && (
        <section className="py-16 sm:py-20 bg-cream bg-parchment-texture relative overflow-hidden">
          <div className="max-w-[580px] mx-auto px-5 sm:px-6">
            <button
              onClick={() => setStep("datetime")}
              className="flex items-center gap-1.5 text-stone/60 text-[11px] tracking-[0.1em] uppercase font-body mb-8 hover:text-pourpre-deep transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Change date & time
            </button>

            <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-2">
              Almost There
            </h2>
            <p className="text-stone text-sm mb-8">Complete your details to confirm your reservation.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                    <User className="w-3 h-3 inline mr-1.5 text-gold/50" /> First Name
                  </label>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                  <Mail className="w-3 h-3 inline mr-1.5 text-gold/50" /> Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                  <Phone className="w-3 h-3 inline mr-1.5 text-gold/50" /> Phone
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                  <MessageSquare className="w-3 h-3 inline mr-1.5 text-gold/50" /> Special Requests <span className="text-stone/40">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="Allergies, celebrations, accessibility needs..."
                />
              </div>

              {/* Summary */}
              <div className="p-5 bg-warm-white border border-gold/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone/70">Experience</span>
                  <span className="text-pourpre-deep font-medium">{selectedExp.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone/70">Date</span>
                  <span className="text-pourpre-deep">{selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone/70">Time</span>
                  <span className="text-pourpre-deep">{selectedSlot && slots.find((s) => s.id === selectedSlot) && new Date(slots.find((s) => s.id === selectedSlot)!.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone/70">Guests</span>
                  <span className="text-pourpre-deep">{guests}</span>
                </div>
                <div className="h-px bg-gold/10 my-2" />
                <div className="flex justify-between">
                  <span className="text-pourpre-deep font-medium">Total</span>
                  <span className="font-heading text-pourpre-deep text-xl">${selectedExp.price * guests}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-13 text-[12px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
              >
                <WineIcon className="w-4 h-4" />
                Confirm Reservation
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Step: Confirmation */}
      {step === "confirmation" && submitted && selectedExp && (
        <section className="py-16 sm:py-24 bg-cream bg-parchment-texture relative overflow-hidden">
          <div className="max-w-[540px] mx-auto px-5 sm:px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Check className="w-7 h-7 text-gold" />
            </div>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
              <FrenchText>Merci</FrenchText>
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4 leading-tight">
              Your Reservation is Confirmed
            </h2>
            <p className="text-stone text-sm mb-8">
              A confirmation email has been sent to <strong className="text-pourpre-deep">{form.email}</strong>. We look forward to welcoming you.
            </p>

            <div className="p-6 bg-warm-white border border-gold/10 text-left mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone/70">Experience</span>
                <span className="text-pourpre-deep font-medium">{selectedExp.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone/70">Date</span>
                <span className="text-pourpre-deep">{selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone/70">Guests</span>
                <span className="text-pourpre-deep">{guests}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone/70">Name</span>
                <span className="text-pourpre-deep">{form.firstName} {form.lastName}</span>
              </div>
              <div className="h-px bg-gold/10" />
              <div className="flex justify-between">
                <span className="text-pourpre-deep font-medium">Total</span>
                <span className="font-heading text-pourpre-deep text-xl">${selectedExp.price * guests}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-cta-primary inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
              >
                Back to Home
              </Link>
              <Link
                href="/wines"
                className="btn-shimmer-gold inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
              >
                Explore Our Wines
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
