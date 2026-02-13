"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WineButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "default" | "lg" | "full";
  trackEvent?: string;
  trackCategory?: string;
  trackLabel?: string;
}

export function WineButton({
  children,
  className,
  href,
  onClick,
  size = "default",
  trackEvent,
  trackCategory,
  trackLabel,
}: WineButtonProps) {
  const sizeClasses = {
    default: "px-7 py-3 text-[11px]",
    lg: "min-w-[220px] px-12 py-4 text-[12px] sm:text-[13px]",
    full: "w-full h-12 text-[11px]",
  }[size];

  const trackProps = {
    ...(trackEvent && { "data-track-event": trackEvent }),
    ...(trackCategory && { "data-track-category": trackCategory }),
    ...(trackLabel && { "data-track-label": trackLabel }),
  };

  const classes = cn(
    "wine-button relative overflow-hidden inline-flex items-center justify-center",
    "font-heading uppercase tracking-[0.2em] font-medium",
    "rounded-none text-white/95",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8B1A2B]",
    sizeClasses,
    className,
  );

  const inner = (
    <>
      {/* Wine flow animation — pure CSS, 3 organic layers */}
      <span className="wine-flow absolute inset-0 pointer-events-none" aria-hidden="true" />
      {/* Subtle border glow */}
      <span className="wine-border absolute inset-0 pointer-events-none rounded-none" aria-hidden="true" />
      {/* Text */}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...trackProps}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...trackProps}>
      {inner}
    </button>
  );
}
