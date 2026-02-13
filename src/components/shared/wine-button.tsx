"use client";

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CURSOR_SPRING = { damping: 25, stiffness: 200, mass: 0.5 };
const EASE = [0.16, 1, 0.3, 1] as const;

interface WineButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "default" | "lg" | "full";
  /** data-track attributes */
  trackEvent?: string;
  trackCategory?: string;
  trackLabel?: string;
}

export function WineButton({
  children,
  className,
  href,
  onClick,
  size = "default",
  trackEvent,
  trackCategory,
  trackLabel,
}: WineButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const springX = useSpring(cursorX, CURSOR_SPRING);
  const springY = useSpring(cursorY, CURSOR_SPRING);

  // Template literal for CSS gradient position
  const gradX = useTransform(springX, (v) => `${v}%`);
  const gradY = useTransform(springY, (v) => `${v}%`);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDesktop(hover.matches && !motion.matches);
  }, []);

  function handleMouseMove(e: MouseEvent) {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    cursorX.set(((e.clientX - rect.left) / rect.width) * 100);
    cursorY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleMouseEnter() { setIsHovered(true); }
  function handleMouseLeave() {
    setIsHovered(false);
    cursorX.set(50);
    cursorY.set(50);
  }

  const sizeClasses = {
    default: "px-7 py-3 text-[11px]",
    lg: "min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px]",
    full: "w-full h-11 text-[11px]",
  }[size];

  const trackProps = {
    ...(trackEvent && { "data-track-event": trackEvent }),
    ...(trackCategory && { "data-track-category": trackCategory }),
    ...(trackLabel && { "data-track-label": trackLabel }),
  };

  const innerContent = (
    <>
      {/* Layer 1: Deep ambient drift */}
      <span className="wine-gradient-deep absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Layer 2: Living wine mid-glow */}
      <span className="wine-gradient-living absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Layer 3: Cursor highlight (desktop) or ambient pulse (mobile) */}
      {isDesktop ? (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: useTransform(
              [gradX, gradY],
              ([x, y]) => `radial-gradient(circle 80px at ${x} ${y}, #C41E3A 0%, transparent 100%)`
            ),
          }}
          animate={{ opacity: isHovered ? 0.55 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      ) : (
        <span className="wine-gradient-mobile absolute inset-0 pointer-events-none" aria-hidden="true" />
      )}

      {/* Text */}
      <span className="relative z-10 transition-colors duration-500">
        {children}
      </span>
    </>
  );

  const sharedClasses = cn(
    "wine-button relative overflow-hidden inline-flex items-center justify-center",
    "font-heading uppercase tracking-[0.2em] font-normal",
    "rounded-none border border-white/[0.08]",
    "text-white/90 hover:text-white",
    "transition-[border-color] duration-500",
    "hover:border-white/20",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8B1A2B]",
    sizeClasses,
    className,
  );

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 40px rgba(139,26,43,0.3), 0 0 80px rgba(74,14,27,0.15)"
            : "0 0 0px rgba(139,26,43,0), 0 0 0px rgba(74,14,27,0)",
        }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {href ? (
        <Link href={href} className={sharedClasses} {...trackProps}>
          {innerContent}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={sharedClasses} {...trackProps}>
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}
