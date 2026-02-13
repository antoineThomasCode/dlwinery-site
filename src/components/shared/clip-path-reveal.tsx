"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface ClipPathRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

const clipPaths = {
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0)" },
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0)" },
};

export function ClipPathReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  direction = "up",
}: ClipPathRevealProps) {
  const clip = clipPaths[direction];

  return (
    <motion.div
      initial={{ clipPath: clip.hidden }}
      whileInView={{ clipPath: clip.visible }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
