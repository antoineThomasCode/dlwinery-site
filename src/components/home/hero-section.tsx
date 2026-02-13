"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { SplitTextHero } from "@/components/shared/split-text-hero";
import { useScrollBlobs } from "@/hooks/use-scroll-blobs";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Hero blobs: slow breathing parallax (pourpre 0.3, gold 0.5, dark 0.7)
  useScrollBlobs(sectionRef, [
    { speed: 0.3 },
    { speed: 0.5 },
    { speed: 0.7 },
  ]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-end justify-center overflow-hidden pb-28 md:pb-20 md:items-center">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
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

        {/* Cinematic overlay — dark enough for text contrast, organic blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-olive-deep/75" />

        {/* Vignette — soft darkening at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(28,26,23,0.55)_100%)]" />

        {/* Organic color overlay — blobs with opacity breathing */}
        <div className="organic-overlay">
          <div className="organic-blob blob-pourpre" style={{ width: '55%', height: '55%', top: '-5%', left: '-10%' }} />
          <div className="organic-blob blob-gold" style={{ width: '45%', height: '45%', top: '25%', right: '-5%' }} />
          <div className="organic-blob blob-dark" style={{ width: '60%', height: '60%', bottom: '-10%', left: '20%' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative text-center px-5 sm:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASE }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-gold/80 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-body font-medium mb-1.5">
            Finger Lakes, New York
          </p>
          <p className="text-warm-white/30 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-body">
            Est. 2012 &middot; 6th Generation &middot; Champagne Heritage
          </p>
        </motion.div>

        {/* Split-text hero headline — word-by-word cinematic reveal
             Mobile: 2.25rem fits "A French Accent" on one line (tested at 375px)
             Scale: 2.25rem → 3.5rem → 4.5rem → 5.5rem */}
        <h1 className="font-heading text-[2.25rem] leading-[1.08] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-normal mb-4 sm:mb-5">
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

        {/* Minimal Swiss divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: LUXURY_EASE }}
          className="flex justify-center mb-5 sm:mb-6"
        >
          <div className="w-12 h-px bg-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: LUXURY_EASE }}
          className="font-heading italic text-gold/60 text-base sm:text-lg md:text-xl mb-2"
        >
          Ou la France rencontre les Finger Lakes
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: LUXURY_EASE }}
          className="text-warm-white/50 text-[13px] sm:text-sm md:text-base mb-10 sm:mb-12 font-body max-w-md mx-auto leading-relaxed"
        >
          Six generations of French winemaking tradition.
          <br className="hidden sm:block" />
          One unforgettable lakeside experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <MagneticButton>
            <Link
              href="/experiences"
              className="btn-cta-primary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
              data-track-event="cta_click"
              data-track-category="hero"
              data-track-label="book_tasting"
            >
              Book a Tasting
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/wines"
              className="btn-cta-secondary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
              data-track-event="cta_click"
              data-track-category="hero"
              data-track-label="explore_wines"
            >
              Explore Our Wines
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — mouse icon that pulses */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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
