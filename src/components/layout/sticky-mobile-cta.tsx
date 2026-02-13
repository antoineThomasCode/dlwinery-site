"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-40 md:hidden left-0 right-0"
          style={{ bottom: "calc(64px + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="px-4 pb-2">
            <Link
              href="/experiences"
              className="flex items-center justify-center w-full h-12 btn-cta-primary rounded-none text-[11px] tracking-[0.15em] uppercase font-body font-medium shadow-lg"
              data-track-event="cta_click"
              data-track-category="sticky_mobile"
              data-track-label="book_tasting"
            >
              Book a Tasting
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
