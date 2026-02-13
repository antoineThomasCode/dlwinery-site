"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLOW_COLORS = {
  gold: {
    inner: "rgba(215,164,94,0.12)",
    outer: "rgba(215,164,94,0.04)",
  },
  champagne: {
    inner: "rgba(237,217,179,0.15)",
    outer: "rgba(237,217,179,0.05)",
  },
  burgundy: {
    inner: "rgba(58,77,44,0.10)",
    outer: "rgba(58,77,44,0.03)",
  },
};

const SPRING = { damping: 30, stiffness: 150, mass: 0.5 };
const SIZE = 350;

export function CursorGlow({
  variant = "gold",
}: {
  variant?: keyof typeof GLOW_COLORS;
}) {
  const [show, setShow] = useState(false);
  const mouseX = useMotionValue(-SIZE);
  const mouseY = useMotionValue(-SIZE);
  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hover.matches || motionPref.matches) return;
    setShow(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - SIZE / 2);
      mouseY.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (!show) return null;
  const c = GLOW_COLORS[variant];

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, width: SIZE, height: SIZE }}
      className="pointer-events-none fixed top-0 left-0 z-0"
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${c.inner} 0%, ${c.outer} 40%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "20%",
          left: "20%",
          width: "60%",
          height: "60%",
          background: `radial-gradient(circle, ${c.inner} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}
