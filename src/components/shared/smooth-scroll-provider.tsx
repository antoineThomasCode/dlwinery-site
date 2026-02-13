"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll — desktop only.
 *
 * On mobile/touch devices, native scroll is already smooth (iOS momentum,
 * Android fling). Lenis on touch causes micro-jumps and blocks scroll
 * over horizontal carousels. Desktop wheel events benefit from the
 * buttery inertial easing that Lenis provides.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on touch devices — native scroll is better on mobile
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Respect reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
