"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionBlobs } from "@/components/ui/section-blobs";
import { useSectionBlobs } from "@/hooks/use-section-blobs";

const ChatConcierge = dynamic(
  () => import("@/components/home/chat-concierge").then((m) => m.ChatConcierge),
  { ssr: false }
);

export function WelcomeBanner() {
  const { sectionRef, isVisible } = useSectionBlobs();

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-warm-white relative overflow-hidden">
      {/* Top and bottom lines */}
      <div className="gold-line-thin absolute top-0 left-[15%] right-[15%]" />
      <div className="gold-line-thin absolute bottom-0 left-[15%] right-[15%]" />

      {/* Scroll-triggered blobs */}
      <SectionBlobs
        isVisible={isVisible}
        sectionRef={sectionRef}
        blobs={[
          { type: "champagne", size: "65%", position: { top: "-15%", right: "-15%" } },
          { type: "gold", size: "50%", position: { bottom: "-10%", left: "5%" } },
          { type: "olive", size: "40%", position: { top: "20%", left: "-20%" } },
        ]}
        parallax={[
          { speed: 0.3 },
          { speed: 0.5 },
          { speed: 0.2 },
        ]}
      />

      <ScrollReveal direction="none">
        <div className="max-w-2xl mx-auto px-6 text-center relative">
          <p className="font-heading italic text-gold/60 text-sm sm:text-base mb-3 tracking-wide">
            Bienvenue
          </p>
          <p className="text-pourpre-deep/60 text-[13px] sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            C&eacute;line and S&eacute;bastien LeSeurre invite you to their corner of Keuka Lake — where six generations of Champagne tradition meet New World terroir. Come for the wine, stay for the view.
          </p>
          <ChatConcierge welcomeSectionRef={sectionRef} />
        </div>
      </ScrollReveal>
    </section>
  );
}
