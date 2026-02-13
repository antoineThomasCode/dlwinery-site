"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface InkDrawProps {
  /** Path to an SVG file in /public, e.g. "/images/ink/finger-lakes-map.svg" */
  src: string;
  className?: string;
  /** Delay in seconds before the draw animation starts */
  delay?: number;
  /** Duration in seconds for each path's stroke reveal */
  duration?: number;
  /** Stagger in seconds between sequential path animations */
  stagger?: number;
}

/**
 * InkDraw — Animated SVG stroke reveal component.
 *
 * Fetches an SVG file, inlines it, then uses Intersection Observer
 * to trigger a sequential stroke-dashoffset animation on every <path>.
 * Respects prefers-reduced-motion by showing the SVG instantly.
 */
export function InkDraw({
  src,
  className = "",
  delay = 0,
  duration = 1.2,
  stagger = 0.15,
}: InkDrawProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const hasAnimated = useRef(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Fetch SVG source
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setSvgMarkup(text);
      })
      .catch((err) => {
        console.error("[InkDraw]", err);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Intersection Observer — trigger once
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [svgMarkup]);

  // Animate paths once visible
  const animatePaths = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;

    const paths = node.querySelectorAll<SVGPathElement>("path");
    paths.forEach((path, i) => {
      const length = path.getTotalLength();

      if (prefersReduced) {
        // No animation — show everything immediately
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = String(
          path.getAttribute("opacity") ?? "1"
        );
        return;
      }

      // Set up hidden state
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = "none";

      // Force reflow so the browser registers the initial state
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      path.getBoundingClientRect();

      // Animate with staggered delay
      const pathDelay = delay + i * stagger;
      path.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${pathDelay}s, opacity 0.3s ease ${pathDelay}s`;
      path.style.strokeDashoffset = "0";
    });
  }, [delay, duration, stagger, prefersReduced]);

  useEffect(() => {
    if (isVisible && svgMarkup) {
      // Wait one frame for the innerHTML to settle
      requestAnimationFrame(() => {
        animatePaths();
      });
    }
  }, [isVisible, svgMarkup, animatePaths]);

  if (!svgMarkup) {
    // Reserve space to prevent layout shift
    return (
      <div
        ref={containerRef}
        className={className}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
