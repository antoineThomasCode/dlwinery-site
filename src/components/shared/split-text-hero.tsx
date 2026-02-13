"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface SplitTextHeroProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Render wrapper for each word — receives the animated word as children */
  wordWrapper?: (props: { children: ReactNode }) => ReactNode;
}

/**
 * Award-level hero text animation.
 * Splits text into individual words, each animated with:
 * - y translate from below (masked by overflow-hidden)
 * - opacity fade
 * - rotateX for a subtle 3D tilt
 * - Staggered timing for cinematic feel
 *
 * Usage:
 * <SplitTextHero className="..." delay={0.5}>
 *   A French Accent
 * </SplitTextHero>
 */
export function SplitTextHero({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  stagger = 0.08,
  wordWrapper,
}: SplitTextHeroProps) {
  const words = children.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={`inline ${className}`}
      aria-label={children}
    >
      {words.map((word, i) => {
        const content = (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: {
                  y: "110%",
                  rotateX: 45,
                  opacity: 0,
                },
                visible: {
                  y: "0%",
                  rotateX: 0,
                  opacity: 1,
                  transition: {
                    duration,
                    ease: LUXURY_EASE,
                  },
                },
              }}
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        );

        if (wordWrapper) {
          return wordWrapper({ children: content });
        }
        return content;
      })}
    </motion.span>
  );
}
