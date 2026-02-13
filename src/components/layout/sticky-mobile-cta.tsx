"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WineButton } from "@/components/shared/wine-button";

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
            <WineButton
              href="/experiences"
              size="full"
              trackEvent="cta_click"
              trackCategory="sticky_mobile"
              trackLabel="book_tasting"
            >
              Book a Tasting
            </WineButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
