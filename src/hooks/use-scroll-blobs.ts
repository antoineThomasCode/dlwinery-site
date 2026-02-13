"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollBlobConfig {
  /** Parallax speed multiplier. Positive = moves down with scroll, negative = moves up (inverted). Typical range: 0.2–0.8 */
  speed: number;
  /** Optional subtle rotation in degrees added during scroll */
  rotation?: number;
}

/**
 * Attaches GSAP ScrollTrigger-based parallax Y movement to blob elements
 * within a section. Call this hook in each section that uses SectionBlobs.
 *
 * Respects prefers-reduced-motion and skips GSAP on mobile (pointer: coarse).
 * Existing CSS breathing animations are untouched — GSAP only adds translateY.
 */
export function useScrollBlobs(
  sectionRef: React.RefObject<HTMLElement | null>,
  configs: ScrollBlobConfig[]
) {
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Skip on mobile — GSAP scrub per scroll pixel is too expensive on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Respect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    // Find all blob elements inside the section's organic-overlay
    const blobs = section.querySelectorAll<HTMLElement>(".organic-blob");
    if (!blobs.length) return;

    const tweens: gsap.core.Tween[] = [];

    blobs.forEach((blob, i) => {
      const config = configs[i];
      if (!config) return;

      const yDistance = config.speed * 200; // px of parallax travel
      const rotationDeg = config.rotation ?? 0;

      const tween = gsap.fromTo(
        blob,
        {
          y: -yDistance / 2,
          rotation: -rotationDeg / 2,
        },
        {
          y: yDistance / 2,
          rotation: rotationDeg / 2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      tweens.push(tween);
    });

    tweensRef.current = tweens;

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      tweensRef.current = [];
    };
  }, [sectionRef, configs]);
}
