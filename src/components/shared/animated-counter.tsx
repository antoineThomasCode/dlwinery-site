"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform, type MotionValue } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Animated number counter that counts up when scrolled into view.
 * Uses Framer Motion spring for organic, luxury feel.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v: number) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = (display as MotionValue<string>).on("change", (v: string) => setText(v));
    return unsubscribe;
  }, [display]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
