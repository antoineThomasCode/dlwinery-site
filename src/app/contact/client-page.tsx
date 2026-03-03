"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { MapPin, Phone, Mail, Clock, ChevronDown, Check, Send, MessageSquare } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";

const faqs = [
  { q: "Do I need a reservation for a tasting?", a: "Reservations are recommended to guarantee your spot, especially on weekends. Walk-ins are welcome for our Wine by the Glass experience on the terrace (no reservation needed)." },
  { q: "Are you open year-round?", a: "Yes! We are open daily from 10:00 AM to 6:00 PM, 7 days a week. Hours may vary for holidays — check our Events page for special schedules." },
  { q: "Can I bring children?", a: "Children are welcome on our terrace and in our garden area. However, tasting experiences are reserved for guests 21 and older." },
  { q: "Do you host private events?", a: "Absolutely! We offer private tasting experiences, rehearsal dinners, corporate events, and intimate celebrations. Contact us to discuss your vision." },
  { q: "Is the winery accessible?", a: "Our tasting room and terrace are fully accessible. If you have specific accessibility needs, please let us know in advance and we'll make arrangements." },
  { q: "What is your cancellation policy?", a: "Cancellations made 24 hours before your reservation are fully refundable. No-shows may be charged the full tasting fee. Contact us if plans change — we're always flexible." },
  { q: "Do you ship wine?", a: "Yes! We ship to 38 states via VinoShipper. Wine Club members enjoy $18 flat-rate shipping. Visit our Shop page or call us to place an order." },
  { q: "Can I buy a gift card?", a: "Yes, gift cards are available in any amount for tastings, wine purchases, or merchandise. Available in-store or by calling us." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { sectionRef, isVisible } = useSectionBlobs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setFormSubmitted(true);
    } catch {
      setFormError("Could not send your message. Please try again or call us at (607) 224-3552.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/winery-terrace-dining.jpg"
          alt="Contact Domaine LeSeurre"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Contactez-Nous</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Get in Touch</span>
          </h1>
        </div>
      </section>

      {/* Contact info + Form */}
      <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "champagne", size: "55%", position: { top: "-10%", right: "-15%" } },
            { type: "olive", size: "45%", position: { bottom: "-5%", left: "-10%" } },
          ]}
          parallax={[{ speed: 0.3 }, { speed: 0.4 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Info */}
            <ScrollReveal>
              <div>
                <LineMaskReveal className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-6 leading-tight">
                  <LineMaskLine><span className="shimmer-text">Visit Us</span></LineMaskLine>
                </LineMaskReveal>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/8 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold/60" />
                    </div>
                    <div>
                      <h3 className="text-pourpre-deep font-medium text-sm mb-1">Location</h3>
                      <p className="text-stone text-[13px] leading-relaxed">
                        9485 Route 76<br />
                        Hammondsport, NY 14840
                      </p>
                      <p className="text-stone/40 text-[11px] mt-1">West shore of Keuka Lake</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/8 flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold/60" />
                    </div>
                    <div>
                      <h3 className="text-pourpre-deep font-medium text-sm mb-1">Phone</h3>
                      <a href="tel:+16075693299" className="text-pourpre-deep text-sm hover:text-pourpre transition-colors">
                        (607) 569-3299
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/8 flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold/60" />
                    </div>
                    <div>
                      <h3 className="text-pourpre-deep font-medium text-sm mb-1">Email</h3>
                      <a href="mailto:info@dlwinery.com" className="text-pourpre-deep text-sm hover:text-pourpre transition-colors">
                        info@dlwinery.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/8 flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold/60" />
                    </div>
                    <div>
                      <h3 className="text-pourpre-deep font-medium text-sm mb-1">Hours</h3>
                      <p className="text-stone text-[13px]">Open daily: 10:00 AM — 6:00 PM</p>
                      <p className="text-stone/40 text-[11px]">7 days a week</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps embed */}
                <div className="aspect-[16/9] overflow-hidden border border-gold/10">
                  <iframe
                    src="https://maps.google.com/maps?q=Domaine+LeSeurre+Winery+9485+Route+76+Hammondsport+NY+14840&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Domaine LeSeurre Winery Location"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal delay={0.15}>
              <div>
                <h2 className="font-heading text-[1.5rem] sm:text-2xl text-pourpre-deep font-light mb-6">
                  Send Us a Message
                </h2>

                {formSubmitted ? (
                  <div className="bg-warm-white border border-gold/10 p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-heading text-pourpre-deep text-xl mb-2">Message Sent!</h3>
                    <p className="text-stone text-sm mb-4">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setFormSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-pourpre transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Full Name</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Email</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Phone <span className="text-stone/30">(optional)</span></label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Subject</label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option value="tasting">Tasting Reservation</option>
                        <option value="wine-club">Wine Club Inquiry</option>
                        <option value="private-event">Private Event</option>
                        <option value="wine-order">Wine Order / Shipping</option>
                        <option value="press">Press / Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                        {formError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--section-gap)] bg-warm-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4 leading-tight">
                <LineMaskLine><span className="shimmer-text">Frequently Asked Questions</span></LineMaskLine>
              </LineMaskReveal>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="border border-gold/10 bg-cream/50">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="text-pourpre-deep text-sm font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gold/50 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-stone text-[13px] sm:text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-18 bg-pourpre-deep">
        <div className="max-w-[600px] mx-auto px-5 sm:px-6 text-center">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
            <FrenchText>À Bientôt</FrenchText>
          </p>
          <h2 className="font-heading text-[1.5rem] sm:text-3xl text-warm-white font-light mb-6">
            We&apos;d Love to Welcome You
          </h2>
          <Link
            href="/experiences"
            className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-10 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
          >
            <WineIcon className="w-4 h-4" /> Book a Tasting
          </Link>
        </div>
      </section>
    </main>
  );
}
