"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { damping: 20, stiffness: 300, mass: 0.5 };
const MAX_DISPLACEMENT = 8;

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  maxDisplacement?: number;
}

export function MagneticButton({
  children,
  className = "",
  maxDisplacement = MAX_DISPLACEMENT,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDesktop(hover.matches && !motion.matches);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    // Normalize based on distance from center relative to element size
    const normalX = dx / (rect.width / 2);
    const normalY = dy / (rect.height / 2);
    x.set(normalX * maxDisplacement);
    y.set(normalY * maxDisplacement);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (!isDesktop) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
