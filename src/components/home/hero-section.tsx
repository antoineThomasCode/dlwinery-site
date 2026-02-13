"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end justify-center overflow-hidden pb-28 md:pb-20 md:items-center">
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
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-gold/80 text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-body font-medium mb-1.5">
            Finger Lakes, New York
          </p>
          <p className="text-warm-white/30 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-body">
            Est. 2012 &middot; 6th Generation &middot; Champagne Heritage
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal mb-4 sm:mb-5"
        >
          <span className="shimmer-text-light">A French Accent</span>
          <br />
          <span className="shimmer-text-light italic">on Keuka Lake</span>
        </motion.h1>

        {/* Minimal Swiss divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mb-5 sm:mb-6"
        >
          <div className="w-12 h-px bg-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-heading italic text-gold/60 text-base sm:text-lg md:text-xl mb-2"
        >
          Où la France rencontre les Finger Lakes
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-warm-white/50 text-[13px] sm:text-sm md:text-base mb-10 sm:mb-12 font-body max-w-md mx-auto leading-relaxed"
        >
          Six generations of French winemaking tradition.
          <br className="hidden sm:block" />
          One unforgettable lakeside experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <Link
            href="/experiences"
            className="btn-cta-primary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
            data-track-event="cta_click"
            data-track-category="hero"
            data-track-label="book_tasting"
          >
            Book a Tasting
          </Link>
          <Link
            href="/wines"
            className="btn-cta-secondary inline-flex items-center justify-center min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-heading rounded-none"
            data-track-event="cta_click"
            data-track-category="hero"
            data-track-label="explore_wines"
          >
            Explore Our Wines
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
