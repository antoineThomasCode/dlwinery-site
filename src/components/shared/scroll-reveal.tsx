"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  stagger?: boolean;
  staggerDelay?: number;
}

const directionMap = {
  up: { y: 24, x: 0 },
  left: { y: 0, x: -30 },
  right: { y: 0, x: 30 },
  none: { y: 0, x: 0 },
};

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const offset = directionMap[direction];

  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: offset.y, x: offset.x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const offset = directionMap[direction];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: offset.y, x: offset.x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.7, ease: LUXURY_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
