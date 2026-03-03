"use client";

import { useState, useEffect, useRef } from "react";
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
import { Wine, Gift, Star, Truck, Users, Calendar, Check, ChevronDown, ArrowDown } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";
import { wines } from "@/lib/data/wines";

const VINOSHIPPER_CLUB_ID = 10399;

const benefits = [
  { icon: Wine, title: "Exclusive Sparkling Wines", detail: "Members-only cuvees reserved for Le Cercle, including limited releases never sold in-store." },
  { icon: Gift, title: "15% Off All Purchases", detail: "In-store and online. Applies to all wines, merchandise, and gift sets year-round." },
  { icon: Star, title: "Free Tastings + 3 Guests", detail: "Unlimited complimentary tastings for you and up to 3 guests on every visit." },
  { icon: Truck, title: "$18 Flat Rate Shipping", detail: "Nationwide delivery at a fixed $18, compared to $30+ standard shipping rates." },
  { icon: Calendar, title: "3 Curated Shipments/Year", detail: "6 bottles hand-selected by Sebastien, shipped in spring, summer, and fall." },
  { icon: Users, title: "Priority Event Access", detail: "First access to Jazz on the Terrace, harvest celebrations, and exclusive member-only events." },
];

const faqs = [
  { q: "How much does membership cost?", a: "Membership is complimentary. You only pay for the wine in your shipments (6 bottles, 3 times per year) at your 15% member discount, plus $18 flat-rate shipping per shipment." },
  { q: "Can I customize my shipments?", a: "You can choose between Sebastien's curated selection (recommended) or customize your own from our full catalog. Changes can be made up to 2 weeks before each shipment." },
  { q: "What states do you ship to?", a: "We currently ship to 38 states via VinoShipper. Due to state regulations, we cannot ship to all states. Contact us to check availability in your area." },
  { q: "Can I cancel my membership?", a: "You may cancel anytime with no fees or penalties. Simply email info@dlwinery.com or call us. We only ask for 30 days notice before your next scheduled shipment." },
  { q: "What if I don't like a wine?", a: "We stand behind our wines. If you're not satisfied with a bottle, contact us and we'll replace it in your next shipment or offer a credit toward a different selection." },
  { q: "Do I get benefits immediately?", a: "Yes! Your 15% discount and free tasting benefits are active from the moment you sign up. Your first shipment will be included in the next scheduled cycle." },
];

const testimonials = [
  { name: "Jennifer & Tom R.", text: "We joined after our first tasting and it's been the gift that keeps giving. The sparkling wines alone are worth it — you can't get them anywhere else.", location: "Rochester, NY" },
  { name: "David L.", text: "The curated shipments are always a pleasant surprise. Sebastien has impeccable taste. And the 15% off means we stock up every visit!", location: "Ithaca, NY" },
  { name: "Susan K.", text: "Best wine club in the Finger Lakes, period. The free tastings for me and my friends make it a no-brainer.", location: "Syracuse, NY" },
];

const featuredWineIds = ["100252", "176222", "20307"];
const featuredWines = featuredWineIds.map((id) => wines.find((w) => w.id === id)!).filter(Boolean);

function VinoshipperClubForm() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // After the div mounts, tell Vinoshipper to re-render so it picks up the new element
    const timer = setTimeout(() => {
      if (window.Vinoshipper?.isRendered()) {
        window.Vinoshipper.render();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-warm-white/95 rounded-none overflow-hidden">
      <div
        ref={formRef}
        className="vs-club-registration"
        data-vs-club-allow={String(VINOSHIPPER_CLUB_ID)}
        data-vs-club-default={String(VINOSHIPPER_CLUB_ID)}
        data-vs-club-headline="0"
      />
    </div>
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
          <p className="text-warm-white/60 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Exclusive wines. Private events. A taste of France, delivered to your door three times a year.
          </p>
          <p className="text-gold/80 text-[13px] sm:text-sm font-body mb-8">
            Join 864 members who love great wine
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
                Membership is complimentary — just a love of fine wine.<br />
                <span className="text-gold font-medium">Save 15% on every bottle — e.g., $34.99 &rarr; $29.74</span>
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
              { step: "1", title: "Sign Up on Vinoshipper", desc: "Join Le Cercle through our secure partner Vinoshipper — it takes less than 2 minutes. No fees, no commitment." },
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
      <section className="py-16 sm:py-20 bg-warm-white relative overflow-hidden">
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

      {/* Join CTA — Embedded Vinoshipper Club Registration */}
      <section id="join" className="py-16 sm:py-24 bg-pourpre-deep relative overflow-hidden">
        <div className="max-w-[620px] mx-auto px-5 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
              <FrenchText>Rejoignez-Nous</FrenchText>
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-4xl text-warm-white font-light mb-4">
              Ready to Join Le Cercle?
            </h2>
            <p className="text-warm-white/60 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Sign up below — it takes less than 2 minutes.
              Your benefits are active immediately.
            </p>
          </ScrollReveal>

          {/* Vinoshipper Embedded Club Registration Form */}
          <VinoshipperClubForm />

          <ScrollReveal delay={0.2}>
            <p className="text-warm-white/30 text-[11px] mt-6 max-w-sm mx-auto">
              Secure signup powered by Vinoshipper — handles shipping compliance, age verification, and membership management
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
