"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface LineMaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Wraps each child element (or line of text) in an overflow-hidden mask
 * and animates it from y: 100% to y: 0 with luxury easing.
 *
 * Usage: wrap each line in a <span className="block"> inside <LineMaskReveal>
 */
export function LineMaskReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  stagger = 0.1,
}: LineMaskRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px 0px 0px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LineMaskLine({
  children,
  className = "",
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        variants={{
          hidden: { y: "100%" },
          visible: {
            y: 0,
            transition: { duration, ease: LUXURY_EASE },
          },
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
