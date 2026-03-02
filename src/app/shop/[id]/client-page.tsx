"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Grape, Droplets } from "lucide-react";
import { VinoshipperAddToCart } from "@/components/vinoshipper/vinoshipper-add-to-cart";
import { VinoshipperAvailable } from "@/components/vinoshipper/vinoshipper-available";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { wines } from "@/lib/data/wines";
import type { Wine } from "@/lib/types";

const typeColors: Record<string, string> = {
  sparkling: "bg-amber-100/60 text-amber-800",
  white: "bg-yellow-50 text-yellow-700",
  rose: "bg-pink-50 text-pink-700",
  red: "bg-red-50/70 text-red-800",
};

const bodyLabels: Record<string, string> = {
  light: "Light",
  medium: "Medium",
  full: "Full-Bodied",
};

const sweetnessLabels: Record<string, string> = {
  dry: "Dry",
  "off-dry": "Off-Dry",
  sweet: "Sweet",
};

function getRelatedWines(wine: Wine): Wine[] {
  return wines
    .filter((w) => w.id !== wine.id && w.type === wine.type && w.type !== "gift-card" && w.inStock)
    .slice(0, 4);
}

export default function WineDetailPage({ wine }: { wine: Wine }) {
  const isGiftCard = wine.type === "gift-card";
  const memberSaving = wine.price - wine.memberPrice;
  const hasLowStock = wine.inventoryCount !== undefined && wine.inventoryCount < 12 && wine.inventoryCount > 0;
  const related = getRelatedWines(wine);

  return (
    <main>
      {/* Back nav */}
      <div className="bg-cream border-b border-gold/10">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6 py-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-stone/60 hover:text-pourpre-deep text-[11px] tracking-[0.08em] uppercase font-body font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-12 sm:py-16 lg:py-20 bg-cream bg-parchment-texture">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <ScrollReveal>
              <div className="relative aspect-[3/4] bg-[#f8f6f2] overflow-hidden">
                <Image
                  src={wine.image ?? "/images/wine-placeholder.webp"}
                  alt={wine.name}
                  fill
                  className="object-contain p-6 sm:p-10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {wine.badges.map((badge) => (
                    <span key={badge} className="bg-pourpre-deep/90 text-gold text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 w-fit">
                      {badge.replace("-", " ")}
                    </span>
                  ))}
                  {hasLowStock && (
                    <span className="bg-red-800/90 text-warm-white text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 w-fit">
                      Only {wine.inventoryCount} left!
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                {/* Type badge */}
                {!isGiftCard && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-1 text-[9px] tracking-[0.08em] uppercase font-medium ${typeColors[wine.type] ?? ""}`}>
                      {wine.type}
                    </span>
                    <span className="text-stone/40 text-[12px] font-body">{wine.vintage}</span>
                  </div>
                )}

                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-pourpre-deep leading-tight mb-4">
                  {wine.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-heading text-pourpre-deep text-2xl sm:text-3xl">${wine.price}</span>
                  {!isGiftCard && memberSaving > 0 && (
                    <span className="text-gold text-[13px] font-body">
                      ${wine.memberPrice.toFixed(2)} member price
                    </span>
                  )}
                </div>

                {/* Add to cart — Vinoshipper handles qty selector, compliance, shipping */}
                <div className="mb-6 pb-6 border-b border-gold/10">
                  {isGiftCard ? (
                    <a
                      href={wine.vinoshipperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 btn-cta-primary rounded-none text-[11px] tracking-[0.12em] uppercase font-body font-medium cursor-pointer"
                    >
                      Buy Gift Card
                    </a>
                  ) : (
                    <VinoshipperAddToCart productId={wine.id} />
                  )}
                  <p className="text-stone/40 text-[10px] mt-3">
                    Must be 21+ to purchase. Shipping calculated at checkout.
                  </p>
                </div>

                {/* Available states — Vinoshipper renders dynamically */}
                <div className="mb-6 pb-6 border-b border-gold/10">
                  <p className="text-pourpre-deep text-[11px] tracking-[0.08em] uppercase font-body font-medium mb-2">Ships To</p>
                  <VinoshipperAvailable className="text-stone/60 text-[12px]" />
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-gold/10">
                  <p className="text-stone text-sm sm:text-[15px] leading-relaxed">
                    {wine.description}
                  </p>
                </div>

                {/* Tasting notes */}
                {wine.tastingNotes && (
                  <div className="flex items-start gap-3 mb-4">
                    <Grape className="w-4 h-4 text-gold/50 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-pourpre-deep text-[11px] tracking-[0.08em] uppercase font-body font-medium mb-1">Tasting Notes</p>
                      <p className="text-stone/70 text-[13px] leading-relaxed">{wine.tastingNotes}</p>
                    </div>
                  </div>
                )}

                {/* Food pairings */}
                {wine.foodPairings.length > 0 && (
                  <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gold/10">
                    <Droplets className="w-4 h-4 text-gold/50 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-pourpre-deep text-[11px] tracking-[0.08em] uppercase font-body font-medium mb-1">Food Pairings</p>
                      <p className="text-stone/70 text-[13px]">{wine.foodPairings.join(" · ")}</p>
                    </div>
                  </div>
                )}

                {/* Specs */}
                {!isGiftCard && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-stone/40 text-[10px] tracking-[0.1em] uppercase font-body mb-1">Body</p>
                      <p className="text-pourpre-deep text-[13px] font-medium">{bodyLabels[wine.body]}</p>
                    </div>
                    <div>
                      <p className="text-stone/40 text-[10px] tracking-[0.1em] uppercase font-body mb-1">Sweetness</p>
                      <p className="text-pourpre-deep text-[13px] font-medium">{sweetnessLabels[wine.sweetness]}</p>
                    </div>
                    <div>
                      <p className="text-stone/40 text-[10px] tracking-[0.1em] uppercase font-body mb-1">Type</p>
                      <p className="text-pourpre-deep text-[13px] font-medium capitalize">{wine.type}</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related wines */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20 bg-warm-white">
          <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
            <h2 className="font-heading text-xl sm:text-2xl text-pourpre-deep mb-8">You May Also Enjoy</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map((w) => (
                <Link key={w.id} href={`/shop/${w.id}`} className="group">
                  <div className="card-heritage overflow-hidden bg-cream rounded-none flex flex-col h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f6f2]">
                      <Image
                        src={w.image ?? "/images/wine-placeholder.webp"}
                        alt={w.name}
                        fill
                        className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-heading text-sm text-pourpre-deep leading-tight mb-1 group-hover:text-pourpre transition-colors">
                        {w.name}
                      </h3>
                      <p className="text-stone/50 text-[10px] mb-1">{w.vintage} · {w.type}</p>
                      <span className="font-heading text-pourpre-deep text-base">${w.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
