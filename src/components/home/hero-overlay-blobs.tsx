"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ──────────────────────────────────────────
   Blob configuration — Triptique: Noir · Vert · Or
   3 very stretched ellipses that intermingle when the
   cursor moves. Each blob has different spring physics
   so they separate, overlap, and blend as they rejoin.
   The intermingling is where the magic happens.
   ────────────────────────────────────────── */

interface BlobConfig {
  width: number;
  height: number;
  gradient: string;
  spring: { damping: number; stiffness: number; mass: number };
  offset: { x: number; y: number };
  blur: number;
  rotation: number;
  idle: { x: [number, number]; y: [number, number]; rotate: [number, number]; duration: number };
}

const BLOBS: BlobConfig[] = [
  {
    // NOIR — the deepest, largest, anchors the composition
    width: 900,
    height: 450,
    gradient: "radial-gradient(ellipse 100% 100%, rgba(20, 16, 16, 0.5) 0%, rgba(28, 22, 22, 0.25) 40%, transparent 70%)",
    spring: { damping: 30, stiffness: 150, mass: 1.0 },
    offset: { x: 0, y: 0 },
    blur: 100,
    rotation: -8,
    idle: { x: [-60, 60], y: [-30, 30], rotate: [-12, -4], duration: 20 },
  },
  {
    // VERT — deep green accent, bleeds through the noir
    width: 750,
    height: 380,
    gradient: "radial-gradient(ellipse 100% 100%, rgba(38, 50, 27, 0.35) 0%, rgba(58, 77, 44, 0.15) 40%, transparent 70%)",
    spring: { damping: 40, stiffness: 100, mass: 1.5 },
    offset: { x: -120, y: 60 },
    blur: 120,
    rotation: 12,
    idle: { x: [70, -70], y: [25, -40], rotate: [8, 16], duration: 26 },
  },
  {
    // OR — luminous gold glow, smallest but most visible
    width: 650,
    height: 320,
    gradient: "radial-gradient(ellipse 100% 100%, rgba(215, 164, 94, 0.18) 0%, rgba(184, 136, 58, 0.08) 40%, transparent 70%)",
    spring: { damping: 50, stiffness: 70, mass: 2.0 },
    offset: { x: 100, y: -70 },
    blur: 140,
    rotation: -5,
    idle: { x: [-40, 80], y: [50, -25], rotate: [-8, 2], duration: 32 },
  },
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────────────────────────
   HeroOverlayBlobs — sits between video and text
   Desktop: cursor-following with spring physics
   Mobile: slow idle drift animation
   mix-blend-mode: screen makes colors ADD together
   where blobs overlap — noir + pourpre + or intermingle
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
  // On mobile, hero blobs are extremely expensive (blur 100-140px + spring physics)
  if (!hasPointer) return null;

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
   Elliptical shape with rotation for organic feel
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
    (v) => v - config.width / 2 + config.offset.x
  );
  const y = useTransform(
    springY,
    (v) => v - config.height / 2 + config.offset.y
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

  // Desktop: cursor-following with spring physics
  if (hasPointer) {
    return (
      <motion.div
        style={{
          x,
          y,
          width: config.width,
          height: config.height,
          rotate: config.rotation,
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%",
            background: config.gradient,
            filter: `blur(${config.blur}px)`,
          }}
        />
      </motion.div>
    );
  }

  // Mobile: slow idle drift with rotation
  return (
    <motion.div
      animate={{
        x: config.idle.x,
        y: config.idle.y,
        rotate: config.idle.rotate,
      }}
      transition={{
        duration: config.idle.duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        marginTop: -config.height / 2 + config.offset.y,
        marginLeft: -config.width / 2 + config.offset.x,
        width: config.width,
        height: config.height,
        rotate: config.rotation,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%",
          background: config.gradient,
          filter: `blur(${config.blur}px)`,
        }}
      />
    </motion.div>
  );
}
