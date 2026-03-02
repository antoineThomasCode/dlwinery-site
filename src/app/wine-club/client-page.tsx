"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerChild } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Wine, Gift, Star, Truck, Users, Calendar, Sparkles, Check, ChevronDown, WineOff } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";

const benefits = [
  { icon: Wine, title: "Exclusive Sparkling Wines", detail: "Members-only cuvées reserved for Le Cercle, including limited releases never sold in-store." },
  { icon: Gift, title: "15% Off All Purchases", detail: "In-store and online. Applies to all wines, merchandise, and gift sets year-round." },
  { icon: Star, title: "Free Tastings + 3 Guests", detail: "Unlimited complimentary tastings for you and up to 3 guests on every visit." },
  { icon: Truck, title: "$18 Flat Rate Shipping", detail: "Nationwide delivery at a fixed $18, compared to $30+ standard shipping rates." },
  { icon: Calendar, title: "3 Curated Shipments/Year", detail: "6 bottles hand-selected by Sébastien, shipped in spring, summer, and fall." },
  { icon: Users, title: "Priority Event Access", detail: "First access to Jazz on the Terrace, harvest celebrations, and exclusive member-only events." },
];

const faqs = [
  { q: "How much does membership cost?", a: "Membership is complimentary. You only pay for the wine in your shipments (6 bottles, 3 times per year) at your 15% member discount, plus $18 flat-rate shipping per shipment." },
  { q: "Can I customize my shipments?", a: "You can choose between Sébastien's curated selection (recommended) or customize your own from our full catalog. Changes can be made up to 2 weeks before each shipment." },
  { q: "What states do you ship to?", a: "We currently ship to 38 states via VinoShipper. Due to state regulations, we cannot ship to all states. Contact us to check availability in your area." },
  { q: "Can I cancel my membership?", a: "You may cancel anytime with no fees or penalties. Simply email info@dlwinery.com or call us. We only ask for 30 days notice before your next scheduled shipment." },
  { q: "What if I don't like a wine?", a: "We stand behind our wines. If you're not satisfied with a bottle, contact us and we'll replace it in your next shipment or offer a credit toward a different selection." },
  { q: "Do I get benefits immediately?", a: "Yes! Your 15% discount and free tasting benefits are active from the moment you sign up. Your first shipment will be included in the next scheduled cycle." },
];

const testimonials = [
  { name: "Jennifer & Tom R.", text: "We joined after our first tasting and it's been the gift that keeps giving. The sparkling wines alone are worth it — you can't get them anywhere else.", location: "Rochester, NY" },
  { name: "David L.", text: "The curated shipments are always a pleasant surprise. Sébastien has impeccable taste. And the 15% off means we stock up every visit!", location: "Ithaca, NY" },
  { name: "Susan K.", text: "Best wine club in the Finger Lakes, period. The free tastings for me and my friends make it a no-brainer.", location: "Syracuse, NY" },
];

export default function WineClubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
    preference: "curated",
    wineTypes: [] as string[],
  });
  const { sectionRef, isVisible } = useSectionBlobs();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // No scroll-to-top — confirmation renders in-place for app-like feel
  };

  if (formSubmitted) {
    return (
      <main>
        <section className="pt-32 pb-24 bg-cream bg-parchment-texture min-h-screen flex items-center">
          <div className="max-w-[540px] mx-auto px-5 sm:px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <Wine className="w-7 h-7 text-gold" />
            </div>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
              <FrenchText>Bienvenue au Cercle</FrenchText>
            </p>
            <h1 className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4 leading-tight">
              Welcome to Le Cercle
            </h1>
            <p className="text-stone text-sm mb-8">
              Your membership is confirmed! A welcome email has been sent to <strong className="text-pourpre-deep">{signupForm.email}</strong> with everything you need to know.
            </p>
            <div className="p-6 bg-warm-white border border-gold/10 text-left mb-8 space-y-2.5">
              <p className="text-pourpre-deep text-sm font-medium">Your benefits are now active:</p>
              <ul className="space-y-1.5">
                {["15% off all purchases", "Free tastings + 3 guests", "Priority event access", "Next shipment: Spring 2026"].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-stone text-[13px]">
                    <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop" className="btn-cta-primary inline-flex items-center justify-center rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium">
                Shop with Member Prices
              </Link>
              <Link href="/experiences" className="btn-shimmer-gold inline-flex items-center justify-center gap-2 rounded-none h-11 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium">
                <WineIcon className="w-3.5 h-3.5" /> Book Free Tasting
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/club-love-story.webp"
          alt="Wine Club Le Cercle"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[rgba(38,50,27,0.7)]" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Le Cercle</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Join Our Wine Club</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Exclusive wines. Private events. A taste of France, delivered to your door three times a year.
          </p>
          <div className="inline-flex items-center gap-3 p-3 bg-warm-white/10 backdrop-blur-sm border border-warm-white/10">
            <span className="font-heading text-warm-white text-2xl font-semibold">$0</span>
            <span className="text-warm-white/50 text-sm">Membership fee</span>
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
                Membership is complimentary — just a love of fine wine.
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

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-warm-white relative overflow-hidden">
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
              { step: "1", title: "Sign Up", desc: "Fill out the form below — it takes less than 2 minutes. No fees, no commitment." },
              { step: "2", title: "Receive Your Wines", desc: "3 curated shipments of 6 bottles per year (spring, summer, fall). Customize if you prefer." },
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

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-cream bg-parchment-texture relative overflow-hidden">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light mb-4">
                What Members Say
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card-heritage bg-warm-white rounded-none p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-gold/70 text-gold/70" />
                    ))}
                  </div>
                  <blockquote className="text-pourpre-deep/70 text-[13px] sm:text-sm leading-relaxed mb-5 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="pt-4 border-t border-gold/8">
                    <p className="text-pourpre-deep font-medium text-[13px]">{t.name}</p>
                    <p className="text-stone/50 text-[11px]">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-warm-white">
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

      {/* Signup Form */}
      <section id="join" className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <div className="max-w-[620px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
                <FrenchText>Rejoignez-Nous</FrenchText>
              </p>
              <h2 className="font-heading text-[1.75rem] sm:text-4xl text-pourpre-deep font-light mb-4">
                Become a Member
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">First Name</label>
                <input required value={signupForm.firstName} onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Last Name</label>
                <input required value={signupForm.lastName} onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Email</label>
              <input type="email" required value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
            </div>
            <div>
              <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Phone</label>
              <input type="tel" required value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
            </div>

            <div className="h-px bg-gold/10" />
            <p className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium">Shipping Address</p>

            <div>
              <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Street Address</label>
              <input required value={signupForm.address} onChange={(e) => setSignupForm({ ...signupForm, address: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">City</label>
                <input required value={signupForm.city} onChange={(e) => setSignupForm({ ...signupForm, city: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">State</label>
                <input required value={signupForm.state} onChange={(e) => setSignupForm({ ...signupForm, state: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" placeholder="NY" />
              </div>
              <div>
                <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">Zip</label>
                <input required value={signupForm.zip} onChange={(e) => setSignupForm({ ...signupForm, zip: e.target.value })} className="w-full bg-warm-white border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
            </div>

            <div className="h-px bg-gold/10" />
            <p className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium">Wine Preferences</p>

            <div className="flex gap-3">
              {["curated", "custom"].map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setSignupForm({ ...signupForm, preference: pref })}
                  className={`flex-1 py-3 px-4 text-sm font-body text-center transition-colors cursor-pointer ${
                    signupForm.preference === pref
                      ? "bg-pourpre-deep text-warm-white"
                      : "bg-warm-white border border-gold/15 text-stone/60 hover:border-gold/40"
                  }`}
                >
                  {pref === "curated" ? "Sébastien's Selection" : "I'll Choose My Own"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Red", "White", "Rosé", "Sparkling"].map((type) => {
                const selected = signupForm.wineTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSignupForm({
                      ...signupForm,
                      wineTypes: selected
                        ? signupForm.wineTypes.filter((t) => t !== type)
                        : [...signupForm.wineTypes, type],
                    })}
                    className={`px-4 py-2 text-[11px] tracking-[0.08em] uppercase font-body font-medium transition-colors cursor-pointer ${
                      selected
                        ? "bg-gold text-pourpre-deep"
                        : "bg-warm-white border border-gold/15 text-stone/60 hover:border-gold/40"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-13 text-[12px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
            >
              <Wine className="w-4 h-4" />
              Join Le Cercle — It&apos;s Free
            </button>
            <p className="text-stone/40 text-[11px] text-center">
              No fees. Cancel anytime. You only pay for the wines you receive.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
