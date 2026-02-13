"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";
import { Clock, MapPin, Phone } from "lucide-react";

const visitDetails = [
  {
    icon: Clock,
    title: "Hours",
    lines: ["Open Daily", "10 AM — 6 PM"],
    sublabel: "Reservations recommended",
  },
  {
    icon: MapPin,
    title: "Location",
    lines: ["9485 Route 76", "Hammondsport, NY 14840"],
    sublabel: "West shore of Keuka Lake",
  },
  {
    icon: Phone,
    title: "Contact",
    lines: [
      { text: "(607) 569-3299", href: "tel:+16075693299" },
      { text: "info@dlwinery.com", href: "mailto:info@dlwinery.com" },
    ],
    sublabel: null,
  },
];

export function VisitInfo() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section
      ref={sectionRef}
      className="py-[var(--section-gap)] bg-cream bg-parchment-texture relative overflow-hidden"
    >
      {/* Top line */}
      <div className="gold-line-thin absolute top-0 left-[10%] right-[10%]" />

      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        blobs={[
          {
            type: "champagne",
            size: "35%",
            position: { top: "-10%", right: "-5%" },
          },
          {
            type: "gold",
            size: "30%",
            position: { bottom: "-5%", left: "10%" },
          },
        ]}
      />

      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-4 font-body font-medium">
              <FrenchText>Rendez-Vous</FrenchText>
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-4xl md:text-[3.25rem] text-olive font-light mb-4 sm:mb-5 leading-tight">
              <span className="shimmer-text">Plan Your Visit</span>
            </h2>
            <SectionDivider />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {visitDetails.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="card-heritage bg-warm-white rounded-none p-6 sm:p-8 text-center h-full">
                <div className="w-10 h-10 mx-auto mb-5 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold/70" />
                </div>
                <h3 className="font-heading text-olive text-base sm:text-lg mb-3 tracking-wide">
                  {item.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {item.lines.map((line, j) =>
                    typeof line === "string" ? (
                      <p
                        key={j}
                        className="text-stone text-[13px] sm:text-sm font-body leading-relaxed"
                      >
                        {line}
                      </p>
                    ) : (
                      <p key={j}>
                        <a
                          href={line.href}
                          className="text-olive text-[13px] sm:text-sm font-body font-medium hover:text-pourpre transition-colors link-underline"
                        >
                          {line.text}
                        </a>
                      </p>
                    )
                  )}
                </div>
                {item.sublabel && (
                  <p className="text-stone/40 text-[10px] tracking-[0.1em] uppercase font-body mt-2">
                    {item.sublabel}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
