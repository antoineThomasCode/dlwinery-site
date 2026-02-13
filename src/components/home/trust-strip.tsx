"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Star, Award, Calendar, Users } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    label: "4.8/5",
    sublabel: "Google Rating",
  },
  {
    icon: Award,
    label: "Award-Winning",
    sublabel: "Wines",
  },
  {
    icon: Calendar,
    label: "Est. 2012",
    sublabel: "Finger Lakes",
  },
  {
    icon: Users,
    label: "6th Generation",
    sublabel: "Champagne Heritage",
  },
];

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-10 bg-warm-white relative overflow-hidden">
      {/* Top and bottom lines */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />
      <div className="gold-line-thin absolute bottom-0 left-[10%] right-[10%]" />

      <ScrollReveal direction="none">
        <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
          {/* Mobile: 2x2 grid / Desktop: horizontal row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-center gap-3 py-2 md:py-0 ${
                  i < trustItems.length - 1
                    ? "md:border-r md:border-gold/10"
                    : ""
                }`}
              >
                <item.icon className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-olive text-[11px] sm:text-xs font-body font-medium tracking-[0.08em] uppercase leading-tight">
                    {item.label}
                  </p>
                  <p className="text-stone/50 text-[9px] sm:text-[10px] tracking-[0.06em] uppercase leading-tight">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
