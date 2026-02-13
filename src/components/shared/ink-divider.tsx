"use client";

import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function InkDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <svg
        className="w-[240px] sm:w-[280px] h-[24px]"
        viewBox="0 0 280 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Main brush stroke — organic, slightly wavy like an ink wash */}
        <motion.path
          d="M20 12 C50 12, 55 8, 80 9 C105 10, 110 14, 140 12 C170 10, 175 14, 200 13 C225 12, 230 9, 260 12"
          stroke="rgba(107,45,62,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 1.8, ease: LUXURY_EASE },
            opacity: { duration: 0.3 },
          }}
        />
        {/* Secondary thin line — offset, like a second pass of the brush */}
        <motion.path
          d="M40 15 C65 14, 75 17, 100 16 C125 15, 145 13, 170 14 C195 15, 210 17, 240 15"
          stroke="rgba(107,45,62,0.15)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 1.5, delay: 0.4, ease: LUXURY_EASE },
            opacity: { duration: 0.3, delay: 0.4 },
          }}
        />
        {/* Small ink splatter dot — appears after strokes draw */}
        <motion.circle
          cx="140"
          cy="12"
          r="1.5"
          fill="rgba(107,45,62,0.2)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 1.2, ease: LUXURY_EASE }}
        />
      </svg>
    </div>
  );
}
