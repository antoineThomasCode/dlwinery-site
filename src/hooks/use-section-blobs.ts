"use client";

import { useEffect, useRef, useState } from "react";

export function useSectionBlobs({
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  once = true,
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(section);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { sectionRef, isVisible };
}
