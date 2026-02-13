"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ──────────────────────────────────────────
   Blob configuration
   Each blob has different spring physics so they
   separate and rejoin as the cursor moves — this
   creates the "liquid" quality.
   ────────────────────────────────────────── */

interface BlobConfig {
  size: number;
  color: string;
  spring: { damping: number; stiffness: number; mass: number };
  offset: { x: number; y: number };
  blur: number;
  idle: { x: [number, number]; y: [number, number]; duration: number };
}

const BLOBS: BlobConfig[] = [
  {
    // Primary — follows cursor closely, darkest
    size: 450,
    color: "rgba(28, 26, 23, 0.4)",
    spring: { damping: 25, stiffness: 200, mass: 0.8 },
    offset: { x: 0, y: 0 },
    blur: 80,
    idle: { x: [-40, 40], y: [-25, 25], duration: 18 },
  },
  {
    // Secondary — lags behind, wine-tinted
    size: 380,
    color: "rgba(74, 28, 40, 0.3)",
    spring: { damping: 35, stiffness: 120, mass: 1.2 },
    offset: { x: -100, y: 50 },
    blur: 100,
    idle: { x: [50, -50], y: [20, -35], duration: 24 },
  },
  {
    // Tertiary — slowest drift, ambient tint
    size: 550,
    color: "rgba(28, 26, 23, 0.22)",
    spring: { damping: 45, stiffness: 80, mass: 1.8 },
    offset: { x: 80, y: -60 },
    blur: 120,
    idle: { x: [-30, 60], y: [40, -20], duration: 30 },
  },
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────────────────────────
   HeroOverlayBlobs — sits between video and text
   Desktop: cursor-following with spring physics
   Mobile: slow idle drift animation
   ────────────────────────────────────────── */

export function HeroOverlayBlobs() {
  const [hasPointer, setHasPointer] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setPrefersReduced(reducedMotion.matches);
    if (!reducedMotion.matches) {
      setHasPointer(hover.matches);
    }

    const onHoverChange = () => {
      if (!reducedMotion.matches) setHasPointer(hover.matches);
    };
    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
      if (e.matches) setHasPointer(false);
    };

    hover.addEventListener("change", onHoverChange);
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      hover.removeEventListener("change", onHoverChange);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 2.0, ease: LUXURY_EASE }}
    >
      {BLOBS.map((config, i) => (
        <CursorBlob
          key={i}
          config={config}
          hasPointer={hasPointer}
          containerRef={containerRef}
        />
      ))}
    </motion.div>
  );
}

/* ──────────────────────────────────────────
   Individual blob — spring-tracked or idle
   ────────────────────────────────────────── */

function CursorBlob({
  config,
  hasPointer,
  containerRef,
}: {
  config: BlobConfig;
  hasPointer: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springX = useSpring(mouseX, config.spring);
  const springY = useSpring(mouseY, config.spring);

  const x = useTransform(
    springX,
    (v) => v - config.size / 2 + config.offset.x
  );
  const y = useTransform(
    springY,
    (v) => v - config.size / 2 + config.offset.y
  );

  useEffect(() => {
    if (!hasPointer) return;
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [hasPointer, mouseX, mouseY, containerRef]);

  const blobGradient = `radial-gradient(circle, ${config.color} 0%, transparent 70%)`;

  // Desktop: cursor-following with spring physics
  if (hasPointer) {
    return (
      <motion.div
        style={{ x, y, width: config.size, height: config.size }}
        className="absolute top-0 left-0 rounded-full will-change-transform"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: blobGradient,
            filter: `blur(${config.blur}px)`,
          }}
        />
      </motion.div>
    );
  }

  // Mobile: slow idle drift
  return (
    <motion.div
      animate={{
        x: config.idle.x,
        y: config.idle.y,
      }}
      transition={{
        duration: config.idle.duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute rounded-full"
      style={{
        top: "50%",
        left: "50%",
        marginTop: -config.size / 2 + config.offset.y,
        marginLeft: -config.size / 2 + config.offset.x,
        width: config.size,
        height: config.size,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: blobGradient,
          filter: `blur(${config.blur}px)`,
        }}
      />
    </motion.div>
  );
}
