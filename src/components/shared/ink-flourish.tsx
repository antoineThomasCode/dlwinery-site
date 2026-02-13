"use client";

import { motion } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function InkFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        className="w-[70px] h-[32px]"
        viewBox="0 0 70 32"
        fill="none"
      >
        {/* Vine tendril — left curl */}
        <motion.path
          d="M15 28 C15 20, 20 16, 25 14 C30 12, 32 8, 30 4"
          stroke="rgba(215,164,94,0.4)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 1.2, ease: LUXURY_EASE },
            opacity: { duration: 0.3 },
          }}
        />
        {/* Central stem */}
        <motion.path
          d="M30 4 C32 8, 35 12, 35 16 C35 20, 36 24, 40 28"
          stroke="rgba(215,164,94,0.4)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 1.0, delay: 0.3, ease: LUXURY_EASE },
            opacity: { duration: 0.3, delay: 0.3 },
          }}
        />
        {/* Right curl */}
        <motion.path
          d="M40 28 C44 24, 48 20, 50 16 C52 12, 48 8, 55 6"
          stroke="rgba(215,164,94,0.4)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 1.2, delay: 0.5, ease: LUXURY_EASE },
            opacity: { duration: 0.3, delay: 0.5 },
          }}
        />
        {/* Small leaf/grape accent — left */}
        <motion.path
          d="M22 16 C20 14, 18 16, 20 18"
          stroke="rgba(215,164,94,0.3)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 0.6, delay: 0.8, ease: LUXURY_EASE },
            opacity: { duration: 0.2, delay: 0.8 },
          }}
        />
        {/* Small leaf/grape accent — right */}
        <motion.path
          d="M48 18 C50 16, 52 18, 50 20"
          stroke="rgba(215,164,94,0.3)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 0.6, delay: 1.0, ease: LUXURY_EASE },
            opacity: { duration: 0.2, delay: 1.0 },
          }}
        />
      </svg>
    </div>
  );
}
