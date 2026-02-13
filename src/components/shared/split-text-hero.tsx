"use client";

import { motion } from "framer-motion";

interface SplitTextHeroProps {
  children: string;
  className?: string;
  /** Class applied to each individual word span (useful for shimmer effects that need background-clip:text on the text node itself) */
  wordClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Award-level hero text animation.
 * Splits text into individual words, each rising smoothly from below
 * with a gentle opacity fade. No 3D transforms — pure y + opacity
 * for maximum smoothness on mobile (avoids GPU compositing issues
 * that cause micro-jank with rotateX on low-end devices).
 *
 * Easing: custom cubic-bezier with a long deceleration tail.
 */
export function SplitTextHero({
  children,
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 1.1,
  stagger = 0.08,
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
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName}`}
            variants={{
              hidden: {
                y: "100%",
                opacity: 0,
              },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration,
                  ease: [0.25, 0.1, 0.25, 1], // smooth deceleration
                },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}
