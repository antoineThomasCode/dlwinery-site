"use client";

import { useScrollBlobs, type ScrollBlobConfig } from "@/hooks/use-scroll-blobs";

interface BlobConfig {
  type: "pourpre" | "gold" | "dark" | "olive" | "champagne";
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

export function SectionBlobs({
  blobs,
  isVisible,
  sectionRef,
  parallax,
}: {
  blobs: BlobConfig[];
  isVisible: boolean;
  /** Required for GSAP scroll parallax — pass the section's ref */
  sectionRef?: React.RefObject<HTMLElement | null>;
  /** Per-blob parallax config. Length must match blobs array. */
  parallax?: ScrollBlobConfig[];
}) {
  // Activate GSAP scroll-linked parallax when both sectionRef and parallax are provided
  useScrollBlobs(
    sectionRef ?? { current: null },
    parallax ?? []
  );

  return (
    <div className="organic-overlay" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`organic-blob blob-${blob.type} transition-opacity duration-[1500ms] ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: blob.size,
            height: blob.size,
            ...blob.position,
            transitionDelay: `${blob.delay ?? i * 200}ms`,
            animationPlayState: isVisible ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
