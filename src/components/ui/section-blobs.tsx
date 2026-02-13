"use client";

interface BlobConfig {
  type: "pourpre" | "gold" | "dark" | "olive" | "champagne";
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

export function SectionBlobs({
  blobs,
  isVisible,
}: {
  blobs: BlobConfig[];
  isVisible: boolean;
}) {
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
