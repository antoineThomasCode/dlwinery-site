"use client";

export function GoldOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg className="w-32 h-6 text-gold/30" viewBox="0 0 120 20" fill="none">
        {/* Left scroll */}
        <path d="M0 10 Q10 10 15 5 Q20 0 25 5 Q30 10 35 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M35 10 Q40 10 42 8" stroke="currentColor" strokeWidth="0.8" fill="none" />
        {/* Center diamond */}
        <path d="M52 10 L57 5 L62 10 L57 15 Z" fill="currentColor" opacity="0.4" />
        <circle cx="57" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
        {/* Right scroll — mirrored */}
        <path d="M78 8 Q80 10 85 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M85 10 Q90 10 95 5 Q100 0 105 5 Q110 10 120 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}
