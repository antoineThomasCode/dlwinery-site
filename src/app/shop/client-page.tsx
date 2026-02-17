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
import { ClipPathReveal } from "@/components/shared/clip-path-reveal";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { ShoppingCart, Plus, Minus, X, Truck, Wine, Tag, ArrowRight } from "lucide-react";
import { wines } from "@/lib/data/wines";

type CartItem = { wineId: string; qty: number };

const typeFilters = [
  { value: "all", label: "All" },
  { value: "sparkling", label: "Sparkling" },
  { value: "white", label: "White" },
  { value: "rose", label: "Rosé" },
  { value: "red", label: "Red" },
] as const;

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "done">("cart");
  const { sectionRef, isVisible } = useSectionBlobs();

  const filtered = wines.filter((w) => w.inStock && (typeFilter === "all" || w.type === typeFilter));

  const addToCart = (wineId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.wineId === wineId);
      if (existing) return prev.map((c) => c.wineId === wineId ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { wineId, qty: 1 }];
    });
  };

  const updateQty = (wineId: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.wineId === wineId ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal = cart.reduce((sum, c) => {
    const wine = wines.find((w) => w.id === c.wineId);
    return sum + (wine?.price ?? 0) * c.qty;
  }, 0);

  const getDiscount = (qty: number) => {
    if (qty >= 24) return 0.15;
    if (qty >= 12) return 0.10;
    if (qty >= 6) return 0.05;
    return 0;
  };

  const discountRate = getDiscount(totalItems);
  const discount = subtotal * discountRate;
  const shipping = totalItems > 0 ? 18 : 0;
  const total = subtotal - discount + shipping;

  return (
    <main>
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
            Shop our wines online. Volume discounts available.
          </p>
        </div>
      </section>

      {/* Volume discount banner */}
      <div className="bg-pourpre-deep/95 text-warm-white">
        <div className="max-w-[var(--max-width)] mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] tracking-[0.06em] uppercase font-body">
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 5% off 6+ bottles</span>
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 10% off 12+ bottles</span>
          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-gold/60" /> 15% off 24+ bottles</span>
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-gold/60" /> $18 flat shipping</span>
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
          {/* Filters + Cart toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
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
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center gap-2 px-4 py-2 bg-warm-white border border-gold/15 text-pourpre-deep text-[11px] tracking-[0.08em] uppercase font-body font-medium hover:border-gold/40 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-pourpre-deep text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-8">
            {/* Wine grid */}
            <div className={`flex-1 ${showCart ? "hidden lg:block" : ""}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((wine) => {
                  const inCart = cart.find((c) => c.wineId === wine.id);
                  return (
                    <div key={wine.id} className="card-heritage group overflow-hidden bg-warm-white rounded-none flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden wine-image-skeleton">
                        <Image
                          src={wine.image ?? "/images/wine-placeholder.webp"}
                          alt={wine.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {wine.badges.length > 0 && (
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            {wine.badges.map((badge) => (
                              <span key={badge} className="bg-pourpre-deep/90 text-gold text-[9px] tracking-[0.1em] uppercase font-medium px-2.5 py-1">
                                {badge.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <h3 className="font-heading text-base sm:text-lg text-pourpre-deep leading-tight mb-1">
                          {wine.name}
                        </h3>
                        <p className="text-stone/50 text-[11px] mb-2">{wine.vintage} · {wine.type}</p>
                        <p className="text-stone text-[12px] leading-relaxed mb-4 flex-1 line-clamp-2">
                          {wine.tastingNotes}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-pourpre-deep text-lg">${wine.price}</span>
                          {inCart ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQty(wine.id, -1)} className="w-8 h-8 flex items-center justify-center border border-gold/20 hover:bg-gold/5 transition-colors cursor-pointer">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{inCart.qty}</span>
                              <button onClick={() => updateQty(wine.id, 1)} className="w-8 h-8 flex items-center justify-center border border-gold/20 hover:bg-gold/5 transition-colors cursor-pointer">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(wine.id)}
                              className="flex items-center gap-1.5 px-4 py-2 btn-cta-primary rounded-none text-[10px] tracking-[0.1em] uppercase font-body font-medium cursor-pointer"
                            >
                              <Plus className="w-3 h-3" /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart sidebar */}
            {showCart && (
              <div className="w-full lg:w-[340px] flex-shrink-0">
                <div className="sticky top-24 bg-warm-white border border-gold/10 p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading text-pourpre-deep text-lg">Your Cart</h3>
                    <button onClick={() => setShowCart(false)} className="lg:hidden text-stone/40 hover:text-pourpre-deep cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-stone/50 text-sm text-center py-8">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-5 max-h-[40vh] overflow-y-auto">
                        {cart.map((item) => {
                          const wine = wines.find((w) => w.id === item.wineId)!;
                          return (
                            <div key={item.wineId} className="flex items-center gap-3 pb-3 border-b border-gold/8">
                              <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden wine-image-skeleton">
                                <Image src={wine.image ?? "/images/wine-placeholder.webp"} alt={wine.name} fill className="object-cover" sizes="48px" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-pourpre-deep text-[13px] font-medium truncate">{wine.name}</p>
                                <p className="text-stone/50 text-[11px]">${wine.price} × {item.qty}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button onClick={() => updateQty(item.wineId, -1)} className="w-6 h-6 flex items-center justify-center border border-gold/15 text-stone/50 hover:text-pourpre-deep cursor-pointer">
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <button onClick={() => updateQty(item.wineId, 1)} className="w-6 h-6 flex items-center justify-center border border-gold/15 text-stone/50 hover:text-pourpre-deep cursor-pointer">
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-2 mb-5 text-sm">
                        <div className="flex justify-between text-stone/70">
                          <span>Subtotal ({totalItems} bottles)</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {discountRate > 0 && (
                          <div className="flex justify-between text-gold/80">
                            <span>Volume discount ({(discountRate * 100).toFixed(0)}%)</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-stone/70">
                          <span>Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-gold/10" />
                        <div className="flex justify-between font-medium text-pourpre-deep">
                          <span>Total</span>
                          <span className="font-heading text-xl">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {checkoutStep === "cart" && (
                        <button
                          onClick={() => setCheckoutStep("checkout")}
                          className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4" /> Proceed to Checkout
                        </button>
                      )}

                      {checkoutStep === "checkout" && (
                        <div className="space-y-4">
                          <p className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium">Shipping Details</p>
                          <input placeholder="Full name" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                          <input placeholder="Email" type="email" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                          <input placeholder="Address" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                          <div className="grid grid-cols-2 gap-2">
                            <input placeholder="City" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                            <input placeholder="State" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                          </div>
                          <input placeholder="Zip code" className="w-full bg-cream border border-gold/20 rounded-none px-3 py-2.5 text-sm font-body focus:outline-none focus:border-gold/50 transition-colors" />
                          <p className="text-stone/40 text-[10px]">Must be 21+ to purchase. Shipped via VinoShipper.</p>
                          <button
                            onClick={() => { setCheckoutStep("done"); setCart([]); }}
                            className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                          >
                            Place Order — ${total.toFixed(2)}
                          </button>
                        </div>
                      )}

                      {checkoutStep === "done" && (
                        <div className="text-center py-4">
                          <p className="text-gold text-sm mb-2 font-medium">Order placed!</p>
                          <p className="text-stone/60 text-[13px]">A confirmation email will be sent shortly.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
