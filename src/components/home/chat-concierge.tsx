"use client";

import { useState, useEffect, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Clock, Wine, Users, Phone, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";

type FaqItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  answer: string;
  link?: { text: string; href: string; external?: boolean };
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "hours",
    label: "Hours & Location",
    icon: <Clock size={14} />,
    answer:
      "We're open daily from 10am to 6pm, year-round. Located on the west shore of Keuka Lake at 9485 Route 76, Hammondsport, NY 14840.",
    link: { text: "Get Directions", href: "https://maps.google.com/?q=Domaine+LeSeurre+Winery+Hammondsport+NY", external: true },
  },
  {
    id: "tasting",
    label: "Book a Tasting",
    icon: <WineIcon className="w-3.5 h-3.5" />,
    answer:
      "We offer three tasting experiences: Educational ($15), Wine & Macaron Pairing ($28), and our Signature Food Pairing ($35). Walk-ins are always welcome too!",
    link: { text: "View Experiences", href: "/experiences" },
  },
  {
    id: "club",
    label: "Join Wine Club",
    icon: <Users size={14} />,
    answer:
      "LeSeurre Family Club membership is free to join. Enjoy 15% off all purchases, free tastings for you + 3 guests, and 3 curated shipments per year. 860+ members and counting!",
    link: { text: "Join the Family Club", href: "/wine-club" },
  },
  {
    id: "contact",
    label: "Contact Us",
    icon: <Phone size={14} />,
    answer:
      "Call us at (607) 569-3299 or email info@dlwinery.com. We'd love to hear from you!",
    link: { text: "Call Now", href: "tel:+16075693299" },
  },
];

const easing = [0.16, 1, 0.3, 1] as const;

export function ChatConcierge({
  welcomeSectionRef,
}: {
  welcomeSectionRef: RefObject<HTMLElement | null>;
}) {
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // IntersectionObserver — detect when welcome-banner leaves viewport
  useEffect(() => {
    const section = welcomeSectionRef.current;
    if (!section) return;

    // Only enable sticky on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [welcomeSectionRef]);

  const activeFaq = FAQ_ITEMS.find((f) => f.id === selectedFaq);

  const handleFaqClick = (id: string) => {
    setSelectedFaq(selectedFaq === id ? null : id);
    if (isSticky) setIsOpen(true);
  };

  // ── FAQ Chips ──
  const renderChips = (compact?: boolean) => (
    <div className={`flex flex-wrap justify-center gap-2 ${compact ? "gap-1.5" : ""}`}>
      {FAQ_ITEMS.map((faq) => (
        <button
          key={faq.id}
          onClick={() => handleFaqClick(faq.id)}
          className={`
            inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-body font-medium
            transition-all cursor-pointer active:scale-95
            ${compact ? "px-2.5 py-1.5 text-[11px]" : ""}
            ${
              selectedFaq === faq.id
                ? "bg-pourpre-deep text-warm-white"
                : "bg-warm-white border border-gold/20 text-pourpre-deep/70 hover:border-gold/50 hover:text-pourpre-deep"
            }
          `}
        >
          {faq.icon}
          {faq.label}
        </button>
      ))}
    </div>
  );

  // ── Answer Panel ──
  const renderAnswer = () => (
    <AnimatePresence mode="wait">
      {activeFaq && (
        <motion.div
          key={activeFaq.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: easing }}
          className="mt-4 p-4 bg-cream/80 border border-gold/15 text-left"
        >
          <p className="text-pourpre-deep text-[13px] leading-relaxed mb-3">
            {activeFaq.answer}
          </p>
          {activeFaq.link && (
            activeFaq.link.external ? (
              <a
                href={activeFaq.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors group"
              >
                {activeFaq.link.text}
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ) : (
              <a
                href={activeFaq.link.href}
                className="inline-flex items-center gap-1.5 text-gold text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors group"
              >
                {activeFaq.link.text}
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </a>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── Inline FAQ (inside Welcome Banner) ──
  const inlineFaq = (
    <div className="mt-6 max-w-md mx-auto">
      <p className="text-stone/40 text-[10px] tracking-[0.15em] uppercase font-body mb-3">
        Quick Answers
      </p>
      {renderChips()}
      {renderAnswer()}
      <p className="text-stone/40 text-[10px] mt-4">
        Need more help? Call us at{" "}
        <a href="tel:+16075693299" className="text-gold hover:text-gold-dark transition-colors">
          (607) 569-3299
        </a>
      </p>
    </div>
  );

  // ── Sticky FAQ (mobile only, below viewport) ──
  const stickyFaq = (
    <AnimatePresence>
      {isSticky && (
        <>
          {/* Answer overlay */}
          <AnimatePresence>
            {isOpen && activeFaq && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black-warm/30 z-[39] md:hidden"
                  onClick={() => setIsOpen(false)}
                />
                {/* Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: easing }}
                  className="fixed left-3 right-3 z-40 md:hidden rounded-2xl bg-warm-white shadow-xl border border-gold/15 overflow-hidden"
                  style={{
                    bottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 60px + 12px)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gold/10">
                    <span className="text-xs font-body text-pourpre-deep/60 tracking-wide uppercase">
                      Quick Answers
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-pourpre-deep/40 hover:text-pourpre-deep transition-colors"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {/* Answer */}
                  <div className="p-4">
                    <p className="text-pourpre-deep text-[13px] leading-relaxed mb-3">
                      {activeFaq.answer}
                    </p>
                    {activeFaq.link && (
                      activeFaq.link.external ? (
                        <a
                          href={activeFaq.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-gold text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors"
                        >
                          {activeFaq.link.text}
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ) : (
                        <a
                          href={activeFaq.link.href}
                          className="inline-flex items-center gap-1.5 text-gold text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors group"
                        >
                          {activeFaq.link.text}
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </a>
                      )
                    )}
                    <p className="text-stone/40 text-[10px] mt-4 border-t border-gold/8 pt-3">
                      Need more help? Call{" "}
                      <a href="tel:+16075693299" className="text-gold">
                        (607) 569-3299
                      </a>
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Sticky chip bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: easing }}
            className="fixed left-0 right-0 z-40 md:hidden chat-sticky-glass"
            style={{
              bottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2">
                {activeFaq && !isOpen && (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-gold/60 hover:text-gold transition-colors flex-shrink-0"
                    aria-label="Open answer"
                  >
                    <MessageCircle size={18} strokeWidth={1.5} />
                  </button>
                )}
                <div className="flex-1 overflow-x-auto scrollbar-hide">
                  {renderChips(true)}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Inline FAQ — always in the Welcome Banner */}
      {inlineFaq}

      {/* Sticky FAQ — mobile only, when scrolled past Welcome */}
      {stickyFaq}
    </>
  );
}
