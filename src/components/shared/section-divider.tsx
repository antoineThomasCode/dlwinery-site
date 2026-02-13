"use client";

export function SectionDivider({ className = "", variant = "default" }: { className?: string; variant?: "default" | "light" | "gold" }) {
  const lineColor = variant === "light" ? "bg-warm-white/15" : variant === "gold" ? "bg-gold/30" : "bg-gold/15";

  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <div className={`h-px w-12 ${lineColor}`} />
      <div className={`w-1 h-1 rounded-full ${variant === "light" ? "bg-gold/30" : "bg-gold/25"}`} />
      <div className={`h-px w-12 ${lineColor}`} />
    </div>
  );
}
