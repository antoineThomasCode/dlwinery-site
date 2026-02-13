"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { SplitTextHero } from "@/components/shared/split-text-hero";
import { HeroOverlayBlobs } from "./hero-overlay-blobs";
import { WineIcon } from "@/components/ui/wine-icon";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end justify-center overflow-hidden pb-28 md:pb-20 md:items-center">

      {/* ── Layer 0: Video ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/winery-lake-view.webp"
        >
          <source src="/images/hero-video.webm" type="video/webm" />
        </video>
      </div>

      {/* ── Layer 1: Static gradient — black dominant, pourpre breathes through ── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[rgba(42,20,24,0.25)] to-black/75" />
      </div>

      {/* ── Layer 2: Multiply blend tint — noir profond ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          backgroundColor: "rgba(28, 22, 22, 0.35)",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Layer 3: Interactive cursor blobs — organic darkening that follows mouse ── */}
      <HeroOverlayBlobs />

      {/* ── Layer 4: Vignette — deep black edges, hint of wine ── */}
      <div className="absolute inset-0" style={{ zIndex: 4 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,16,16,0.6)_100%)]" />
      </div>

      {/* ── Layer 10: Content — always on top ── */}
      <div className="relative text-center px-5 sm:px-8 max-w-3xl mx-auto" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASE }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-warm-white/40 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-body mb-1.5">
            Est. 2012 &middot; 6th Generation<br className="sm:hidden" /> &middot; Champagne Heritage
          </p>
          <p className="text-gold/80 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-body font-medium">
            Finger Lakes, New York
          </p>
        </motion.div>

        {/* Split-text hero headline — word-by-word cinematic reveal */}
        <h1 className="font-heading text-[2.25rem] leading-[1.08] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal mb-8 sm:mb-10">
          <span className="block">
            <SplitTextHero delay={0.5} duration={1.1} stagger={0.12} wordClassName="shimmer-hero">
              A French Accent
            </SplitTextHero>
          </span>
          <span className="italic block">
            <SplitTextHero delay={0.9} duration={1.1} stagger={0.12} wordClassName="shimmer-hero">
              on Keuka Lake
            </SplitTextHero>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASE }}
          className="flex flex-row gap-2.5 sm:gap-4 justify-center px-2 sm:px-0"
        >
          <MagneticButton>
            <Link
              href="/experiences"
              className="btn-cta-primary inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-12 py-3.5 sm:py-4 text-[10px] sm:text-[13px] tracking-[0.12em] sm:tracking-[0.15em] uppercase font-body font-medium rounded-none whitespace-nowrap"
              data-track-event="cta_click"
              data-track-category="hero"
              data-track-label="book_tasting"
            >
              <WineIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Book a Tasting
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/wines"
              className="btn-cta-secondary inline-flex items-center justify-center px-5 sm:px-12 py-3.5 sm:py-4 text-[10px] sm:text-[13px] tracking-[0.12em] sm:tracking-[0.15em] uppercase font-body font-medium rounded-none whitespace-nowrap"
              data-track-event="cta_click"
              data-track-category="hero"
              data-track-label="explore_wines"
            >
              Explore Our Wines
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-[22px] h-[34px] rounded-full border border-gold/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[3px] h-[6px] rounded-full bg-gold/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
