"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Wine, Gift, Star, Truck, Users, Calendar, ChevronDown, ArrowDown, ExternalLink, Loader2 } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";
import { wines } from "@/lib/data/wines";

const VINOSHIPPER_CLUB_URL =
  "https://vinoshipper.com/shop/domaine_leseurre_winery/join-our-club";

const benefits = [
  { icon: Wine, title: "Exclusive Sparkling Wines", detail: "Access to sparkling wines reserved for club members — limited production, unique cuvees." },
  { icon: Gift, title: "15% Off Every Bottle", detail: "Members enjoy 15% off all wine purchases. Save on every visit and every order." },
  { icon: Star, title: "Free Tastings + 3 Guests", detail: "Unlimited complimentary tastings for you and up to 3 guests on every visit." },
  { icon: Truck, title: "$18 Flat Rate Shipping", detail: "Club shipments delivered at a fixed $18 rate (6+ bottles), compared to $30+ standard shipping." },
  { icon: Calendar, title: "3 Curated Shipments/Year", detail: "6 bottles hand-selected by Sebastien, shipped in March, June, and September." },
  { icon: Users, title: "Priority Event Access", detail: "First access to winery events, harvest celebrations, and exclusive member-only gatherings." },
];

const faqs = [
  { q: "How much does membership cost?", a: "Membership is free to join. You only pay for the wine in your shipments (6 bottles, 3 times per year) at your 15% member discount, plus $18 flat-rate shipping per club shipment." },
  { q: "Can I customize my shipments?", a: "You can choose between Sebastien's curated selection (recommended) or customize your own from our catalog. Contact us before each shipment to make changes." },
  { q: "What states do you ship to?", a: "We ship to most US states via VinoShipper. Due to state alcohol regulations, some states are restricted. Contact us to check availability in your area." },
  { q: "Can I cancel my membership?", a: "Contact us at info@dlwinery.com or call (607) 569-3299 to discuss your membership options. We ask for 30 days notice before your next scheduled shipment." },
  { q: "What's included in each shipment?", a: "6 bottles hand-selected by Sebastien — a mix of our best reds, whites, and seasonal selections. Club shipments go out in March, June, and September." },
  { q: "When do my benefits start?", a: "Your 15% discount and free tasting benefits are active once your membership is confirmed through Vinoshipper. Your first shipment will be included in the next scheduled cycle." },
];

const socialProofStats = [
  { value: "860+", label: "Active Members", detail: "And growing every month" },
  { value: "6th Gen", label: "French Winemaking", detail: "Champagne family heritage" },
  { value: "15%", label: "Off Every Bottle", detail: "In-store and online" },
];

const featuredWineIds = ["100252", "176222", "20307"];
const featuredWines = featuredWineIds.map((id) => wines.find((w) => w.id === id)!).filter(Boolean);

function ClubLeadForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/club-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-warm-white/5 border border-gold/20 p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/15 flex items-center justify-center">
          <Wine className="w-6 h-6 text-gold" />
        </div>
        <h3 className="font-heading text-warm-white text-xl mb-2">
          Welcome, {form.firstName}!
        </h3>
        <p className="text-warm-white/60 text-sm mb-3 leading-relaxed">
          One last step — complete your membership on Vinoshipper to activate your 15% discount, free tastings, and first shipment.
        </p>
        <div className="bg-warm-white/5 border border-gold/10 p-4 mb-6">
          <p className="text-gold/80 text-[11px] tracking-[0.1em] uppercase font-body mb-2">Your Annual Savings</p>
          <p className="font-heading text-gold text-3xl font-semibold">$95–$115</p>
          <p className="text-warm-white/40 text-[12px] mt-1">On 18 bottles at 15% off + free tastings for you &amp; 3 guests</p>
        </div>
        <a
          href={VINOSHIPPER_CLUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-10 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
        >
          Complete Signup on Vinoshipper
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
        <p className="text-warm-white/25 text-[11px] mt-4">
          Vinoshipper handles age verification, payment, and shipping compliance
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-warm-white/5 border border-gold/20 p-6 sm:p-8 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="club-first" className="block text-warm-white/50 text-[11px] tracking-[0.1em] uppercase font-body mb-1.5">
            First Name <span className="text-gold/60">*</span>
          </label>
          <input
            id="club-first"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full bg-warm-white/8 border border-warm-white/15 text-warm-white text-sm px-4 py-3 placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
            placeholder="Céline"
          />
        </div>
        <div>
          <label htmlFor="club-last" className="block text-warm-white/50 text-[11px] tracking-[0.1em] uppercase font-body mb-1.5">
            Last Name <span className="text-gold/60">*</span>
          </label>
          <input
            id="club-last"
            type="text"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full bg-warm-white/8 border border-warm-white/15 text-warm-white text-sm px-4 py-3 placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
            placeholder="LeSeurre"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="club-email" className="block text-warm-white/50 text-[11px] tracking-[0.1em] uppercase font-body mb-1.5">
          Email <span className="text-gold/60">*</span>
        </label>
        <input
          id="club-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-warm-white/8 border border-warm-white/15 text-warm-white text-sm px-4 py-3 placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="club-phone" className="block text-warm-white/50 text-[11px] tracking-[0.1em] uppercase font-body mb-1.5">
          Phone <span className="text-warm-white/25 text-[10px] normal-case">(optional)</span>
        </label>
        <input
          id="club-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-warm-white/8 border border-warm-white/15 text-warm-white text-sm px-4 py-3 placeholder:text-warm-white/20 focus:border-gold/40 focus:outline-none transition-colors"
          placeholder="(607) 555-0123"
        />
      </div>

      {errorMsg && (
        <p className="text-red-400 text-[13px] mb-4">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-cta-primary w-full inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <WineIcon className="w-4 h-4" />
            Continue to Membership
          </>
        )}
      </button>

      <p className="text-warm-white/25 text-[11px] mt-4 text-center">
        Next step: complete signup on Vinoshipper (age verification &amp; payment)
      </p>
    </form>
  );
}

export default function WineClubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/club-love-story.webp"
          alt="LeSeurre Family Club"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[rgba(38,50,27,0.7)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>La Famille</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Join Our Wine Club</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Exclusive wines. Private events. A taste of France, delivered to your door three times a year.
          </p>
          <p className="text-gold/80 text-[13px] sm:text-sm font-body mb-8">
            Join 860+ members who love great wine
          </p>
          <div className="inline-flex items-center gap-3 p-3 bg-warm-white/10 backdrop-blur-sm border border-warm-white/10 mb-6">
            <span className="font-heading text-warm-white text-2xl font-semibold">$0</span>
            <span className="text-warm-white/50 text-sm">Membership fee</span>
          </div>
          <div>
            <a
              href="#join"
              className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
            >
              <WineIcon className="w-4 h-4" />
              Become a Member
              <ArrowDown className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "gold", size: "55%", position: { top: "-10%", right: "-15%" } },
            { type: "olive", size: "50%", position: { bottom: "-5%", left: "-10%" } },
          ]}
          parallax={[{ speed: 0.4 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <LineMaskReveal className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-pourpre-deep font-light mb-4 leading-tight">
                <LineMaskLine><span className="shimmer-text">Member Benefits</span></LineMaskLine>
              </LineMaskReveal>
              <p className="text-stone text-[13px] sm:text-sm max-w-lg mx-auto leading-relaxed">
                Free to join — just a love of fine wine.<br />
                <span className="text-gold font-medium">15% off every bottle — e.g., $34.99 &rarr; $29.74</span>
              </p>
              <SectionDivider className="mt-5" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <div className="card-heritage bg-warm-white rounded-none p-6 h-full">
                  <div className="w-10 h-10 mb-4 flex items-center justify-center bg-gold/8">
                    <b.icon className="w-5 h-5 text-gold/70" />
                  </div>
                  <h3 className="font-heading text-pourpre-deep text-base sm:text-lg mb-2">{b.title}</h3>
                  <p className="text-stone text-[13px] sm:text-sm leading-relaxed">{b.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Club Wines */}
      <section className="py-16 sm:py-20 bg-warm-white relative overflow-hidden">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-4">
                Wines You&apos;ll Discover
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWines.map((wine, i) => (
              <ScrollReveal key={wine.id} delay={i * 0.1}>
                <div className="card-heritage bg-cream/50 rounded-none overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                    <Image
                      src={wine.image ?? "/images/wine-placeholder.svg"}
                      alt={wine.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {wine.vintage > 0 && (
                      <p className="text-gold/60 text-[10px] tracking-[0.2em] uppercase font-body mb-1">{wine.vintage}</p>
                    )}
                    <h3 className="font-heading text-pourpre-deep text-base sm:text-lg mb-2">{wine.name}</h3>
                    <p className="text-stone text-[13px] leading-relaxed mb-4 flex-1 line-clamp-2">{wine.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone/50 text-sm line-through">${wine.price.toFixed(2)}</span>
                      <span className="text-gold font-heading text-lg font-semibold">${wine.memberPrice.toFixed(2)}</span>
                      <span className="text-gold/60 text-[11px] font-body">for members</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-cream bg-parchment-texture relative overflow-hidden">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-4">
                How It Works
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Tell Us About Yourself", desc: "Share your name and email below — it takes 30 seconds. Then complete your membership on Vinoshipper." },
              { step: "2", title: "Receive Your Wines", desc: "3 curated shipments of 6 bottles per year — March, June, and September. Customize if you prefer." },
              { step: "3", title: "Enjoy the Perks", desc: "15% off, free tastings, priority events, and exclusive members-only wines. All day, every day." },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="font-heading text-gold text-lg font-semibold">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-pourpre-deep text-lg mb-2">{item.title}</h3>
                  <p className="text-stone text-[13px] sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-20 bg-warm-white relative overflow-hidden">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-4">
                Why Members Stay
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialProofStats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card-heritage bg-warm-white rounded-none p-8 h-full text-center">
                  <p className="font-heading text-gold text-4xl sm:text-5xl font-semibold mb-2">{stat.value}</p>
                  <p className="text-pourpre-deep font-heading text-base sm:text-lg mb-1">{stat.label}</p>
                  <p className="text-stone/60 text-[13px]">{stat.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-cream bg-parchment-texture">
        <div className="max-w-[680px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-4">
                Frequently Asked Questions
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
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

      {/* Join CTA — Lead Capture Form */}
      <section id="join" className="py-16 sm:py-24 bg-pourpre-deep relative overflow-hidden">
        <div className="max-w-[520px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
                <FrenchText>Rejoignez-Nous</FrenchText>
              </p>
              <h2 className="font-heading text-[1.75rem] sm:text-4xl text-warm-white font-light mb-4">
                Ready to Join the Family?
              </h2>
              <p className="text-warm-white/60 text-sm max-w-md mx-auto leading-relaxed">
                Tell us about yourself, then complete your membership on Vinoshipper.
                Your benefits are active immediately.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ClubLeadForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
