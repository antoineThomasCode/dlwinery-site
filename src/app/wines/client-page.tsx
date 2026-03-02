"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { LineMaskReveal, LineMaskLine } from "@/components/shared/line-mask-reveal";
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Wine, Grape, Droplets, ShoppingCart } from "lucide-react";
import { wines } from "@/lib/data/wines";

const typeFilters = [
  { value: "all", label: "All Wines" },
  { value: "sparkling", label: "Sparkling" },
  { value: "white", label: "White" },
  { value: "rose", label: "Rosé" },
  { value: "red", label: "Red" },
] as const;

const bodyFilters = [
  { value: "all", label: "All Bodies" },
  { value: "light", label: "Light" },
  { value: "medium", label: "Medium" },
  { value: "full", label: "Full" },
] as const;

const typeColors: Record<string, string> = {
  sparkling: "bg-amber-100/60 text-amber-800",
  white: "bg-yellow-50 text-yellow-700",
  rose: "bg-pink-50 text-pink-700",
  red: "bg-red-50/70 text-red-800",
};

export default function WinesPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [bodyFilter, setBodyFilter] = useState("all");
  const { sectionRef, isVisible } = useSectionBlobs();

  const filtered = wines.filter((w) => {
    if (w.type === "gift-card") return false;
    if (typeFilter !== "all" && w.type !== typeFilter) return false;
    if (bodyFilter !== "all" && w.body !== bodyFilter) return false;
    return true;
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/winery-scenic-view.webp"
          alt="Vineyard overlooking Keuka Lake"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>Nos Vins</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Our Wines</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-md mx-auto">
            French winemaking tradition, Finger Lakes terroir. Explore our collection.
          </p>
        </div>
      </section>

      {/* Filters + Wines */}
      <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "olive", size: "55%", position: { top: "-10%", right: "-15%" } },
            { type: "champagne", size: "50%", position: { bottom: "-5%", left: "-10%" } },
          ]}
          parallax={[{ speed: 0.4 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10 sm:mb-14">
            <div className="flex gap-1.5 flex-wrap">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-4 py-2 text-[11px] tracking-[0.08em] uppercase font-body font-medium transition-colors cursor-pointer ${
                    typeFilter === f.value
                      ? "bg-pourpre-deep text-warm-white"
                      : "bg-warm-white border border-gold/15 text-stone/60 hover:border-gold/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="w-px bg-gold/15 hidden sm:block" />
            <div className="flex gap-1.5 flex-wrap">
              {bodyFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setBodyFilter(f.value)}
                  className={`px-4 py-2 text-[11px] tracking-[0.08em] uppercase font-body font-medium transition-colors cursor-pointer ${
                    bodyFilter === f.value
                      ? "bg-pourpre-deep text-warm-white"
                      : "bg-warm-white border border-gold/15 text-stone/60 hover:border-gold/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-stone/50 text-[11px] tracking-[0.1em] uppercase font-body mb-6">
            {filtered.length} wine{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Wine grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((wine, i) => (
              <ScrollReveal key={wine.id} delay={i * 0.06}>
                <div className="card-heritage group overflow-hidden bg-warm-white rounded-none h-full flex flex-col">
                  <ClipPathReveal direction="up" duration={1.0} className="relative aspect-[4/3] overflow-hidden wine-image-skeleton">
                    <Image
                      src={wine.image ?? "/images/wine-placeholder.webp"}
                      alt={wine.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Badges */}
                    {(wine.badges.length > 0 || (wine.inventoryCount !== undefined && wine.inventoryCount < 12 && wine.inventoryCount > 0)) && (
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {wine.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-pourpre-deep/90 text-gold text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1"
                          >
                            {badge.replace("-", " ")}
                          </span>
                        ))}
                        {wine.inventoryCount !== undefined && wine.inventoryCount < 12 && wine.inventoryCount > 0 && (
                          <span className="bg-red-800/90 text-warm-white text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1">
                            Only {wine.inventoryCount} left
                          </span>
                        )}
                      </div>
                    )}
                    {/* Type tag */}
                    <div className={`absolute bottom-3 right-3 px-2.5 py-1 text-[9px] tracking-[0.08em] uppercase font-medium ${typeColors[wine.type]}`}>
                      {wine.type}
                    </div>
                  </ClipPathReveal>

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-heading text-lg sm:text-xl text-pourpre-deep leading-tight">
                        {wine.name}
                      </h3>
                      <span className="text-stone/40 text-[12px] font-body ml-2 flex-shrink-0">{wine.vintage}</span>
                    </div>
                    <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-4 flex-1">
                      {wine.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="flex items-start gap-2 mb-3">
                      <Grape className="w-3.5 h-3.5 text-gold/40 mt-0.5 flex-shrink-0" />
                      <p className="text-stone/60 text-[12px] leading-relaxed">{wine.tastingNotes}</p>
                    </div>

                    {/* Food pairings */}
                    <div className="flex items-start gap-2 mb-5 pb-4 border-b border-gold/8">
                      <Droplets className="w-3.5 h-3.5 text-gold/40 mt-0.5 flex-shrink-0" />
                      <p className="text-stone/60 text-[12px]">{wine.foodPairings.join(" · ")}</p>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-heading text-pourpre-deep text-xl">${wine.price}</span>
                        <span className="text-gold/70 text-[11px] ml-1.5">
                          ${wine.memberPrice.toFixed(0)} member
                        </span>
                      </div>
                      {wine.vinoshipperUrl ? (
                        <a
                          href={wine.vinoshipperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-pourpre-deep text-[10px] tracking-[0.1em] uppercase font-body font-medium hover:text-pourpre transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Buy
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 text-stone/40 text-[10px] tracking-[0.1em] uppercase font-body font-medium">
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Buy
                        </span>
                      )}
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
