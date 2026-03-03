"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { VinoshipperAddToCart } from "@/components/vinoshipper/vinoshipper-add-to-cart";
import { VinoshipperAvailable } from "@/components/vinoshipper/vinoshipper-available";
import { Tag, Truck, ArrowRight } from "lucide-react";
import { wines } from "@/lib/data/wines";

const typeFilters = [
  { value: "all", label: "All" },
  { value: "sparkling", label: "Sparkling" },
  { value: "white", label: "White" },
  { value: "rose", label: "Rosé" },
  { value: "red", label: "Red" },
  { value: "gift-card", label: "Gift Cards" },
] as const;

export default function ShopPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const { sectionRef, isVisible } = useSectionBlobs();

  const filtered = wines.filter((w) => w.inStock && (typeFilter === "all" || w.type === typeFilter));

  return (
    <main className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="/images/winery-scenic-view.webp"
          alt="Wine shop"
          sizes="100vw"
          className="absolute inset-0"
          speed={0.08}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[rgba(38,50,27,0.6)]" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
            <FrenchText>La Boutique</FrenchText>
          </p>
          <h1 className="font-heading text-[2rem] sm:text-4xl md:text-5xl text-warm-white font-light leading-tight mb-4">
            <span className="shimmer-text-light">Bring the Terrace Home</span>
          </h1>
          <p className="text-warm-white/60 text-sm sm:text-base max-w-md mx-auto">
            Six generations of French winemaking. Direct to your cellar.
          </p>
        </div>
      </section>

      {/* Volume discount banner + Available In */}
      <div className="bg-pourpre-deep/95 text-warm-white">
        <div className="max-w-[var(--max-width)] mx-auto px-6 py-3 flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] tracking-[0.06em] uppercase font-body">
            <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 5% off 6+ bottles</span>
            <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 10% off 12+ bottles</span>
            <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 15% off 24+ bottles</span>
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-gold/60" /> $18 flat shipping</span>
          </div>
          <VinoshipperAvailable className="text-warm-white/40 text-center text-[10px]" />
        </div>
      </div>

      {/* Shop */}
      <section ref={sectionRef} className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden">
        <SectionBlobs
          isVisible={isVisible}
          sectionRef={sectionRef}
          blobs={[
            { type: "champagne", size: "55%", position: { top: "-10%", left: "-15%" } },
            { type: "gold", size: "45%", position: { bottom: "-5%", right: "-10%" } },
          ]}
          parallax={[{ speed: 0.4 }, { speed: 0.3 }]}
        />
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          {/* Filters — horizontal scroll on mobile */}
          <div className="-mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto scrollbar-hide mb-6" data-lenis-prevent>
            <div className="flex gap-1.5 min-w-max">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={`px-4 py-2.5 text-[11px] tracking-[0.08em] uppercase font-body font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    typeFilter === f.value
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

          {/* Wine grid — 1 col on small mobile, 2 col on wider, 3-4 on desktop */}
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((wine) => {
              const isGiftCard = wine.type === "gift-card";
              const memberSaving = wine.price - wine.memberPrice;
              const hasLowStock = wine.inventoryCount !== undefined && wine.inventoryCount < 12 && wine.inventoryCount > 0;
              return (
                <div key={wine.id} className="card-heritage group overflow-hidden bg-warm-white rounded-none flex flex-col">
                  <Link href={`/shop/${wine.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f6f2] wine-image-skeleton">
                      <Image
                        src={wine.image ?? "/images/wine-placeholder.svg"}
                        alt={wine.name}
                        fill
                        className="object-contain p-2 sm:p-4 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Badges — top left */}
                      {wine.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          {wine.badges.map((badge) => (
                            <span key={badge} className="bg-pourpre-deep/90 text-gold text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1">
                              {badge.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Low stock — top right */}
                      {hasLowStock && (
                        <span className="absolute top-3 right-3 bg-red-800/90 text-warm-white text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1">
                          Only {wine.inventoryCount} left
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <Link href={`/shop/${wine.id}`}>
                      <h3 className="font-heading text-base sm:text-lg text-pourpre-deep leading-tight mb-1 hover:text-pourpre transition-colors">
                        {wine.name}
                      </h3>
                    </Link>
                    {!isGiftCard && (
                      <p className="text-stone/50 text-[11px] sm:text-xs mb-3 uppercase tracking-wide">{wine.vintage} · {wine.type}</p>
                    )}
                    {isGiftCard && wine.description && (
                      <p className="text-stone text-[12px] leading-relaxed mb-3 flex-1 line-clamp-2">
                        {wine.description}
                      </p>
                    )}
                    <div className="mt-auto flex flex-col gap-2.5">
                      <div>
                        <span className="font-heading text-pourpre-deep text-lg sm:text-xl">${wine.price}</span>
                        {!isGiftCard && memberSaving > 0 && (
                          <span className="block text-gold text-[11px] sm:text-xs font-medium">
                            Members: ${wine.memberPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {isGiftCard ? (
                        <a
                          href={wine.vinoshipperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-4 py-2.5 btn-cta-primary rounded-none text-[10px] tracking-[0.1em] uppercase font-body font-medium cursor-pointer"
                        >
                          Buy Gift Card <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <VinoshipperAddToCart productId={wine.id} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
