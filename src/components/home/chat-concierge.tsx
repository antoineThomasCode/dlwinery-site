"use client";

import { useState, useRef, useEffect, useCallback, type RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const FAKE_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["wine", "tasting", "visit", "taste", "try"],
    response:
      "We'd love to welcome you! Our tastings are available daily from 11am to 5pm. You can book a private experience or walk in — both are wonderful ways to discover our wines.",
  },
  {
    keywords: ["event", "wedding", "party", "celebrate", "celebration", "reception"],
    response:
      "Our lakeside terrace is perfect for private events. From intimate gatherings to celebrations of up to 80 guests, we'll craft something special. Shall I connect you with our events team?",
  },
];

const DEFAULT_RESPONSE =
  "Thank you for reaching out! I'm still learning, but our team would love to help. You can call us at (607) 569-3032 or email info@dlwinery.com for a personal response.";

function getFakeResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, response } of FAKE_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) return response;
  }
  return DEFAULT_RESPONSE;
}

const easing = [0.16, 1, 0.3, 1] as const;

export function ChatConcierge({
  welcomeSectionRef,
}: {
  welcomeSectionRef: RefObject<HTMLElement | null>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);

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

  // Scroll to bottom of messages — use "nearest" to avoid page-level scroll jumps
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);

    // If we're in sticky mode, open the conversation panel
    if (isSticky) setIsOpen(true);

    const delay = 1500 + Math.random() * 500;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: getFakeResponse(text) },
      ]);
    }, delay);
  }, [inputValue, isTyping, isSticky]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Message Bubbles ──
  const renderMessages = () => (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[280px] scrollbar-hide px-1">
      <AnimatePresence mode="popLayout">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easing }}
            className={`max-w-[85%] ${
              msg.role === "user" ? "self-end" : "self-start"
            }`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed font-body ${
                msg.role === "user"
                  ? "bg-pourpre-deep text-cream rounded-br-md"
                  : "bg-cream/80 text-pourpre-deep border border-gold/20 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Typing indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="self-start"
          >
            <div className="bg-cream/80 border border-gold/20 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );

  // ── Input Field ──
  const renderInput = (ref: React.RefObject<HTMLInputElement | null>, autoFocus?: boolean) => (
    <div className="flex items-center gap-2 bg-warm-white border border-gold/30 rounded-full px-4 py-2.5 focus-within:border-gold/60 transition-colors duration-300">
      <input
        ref={ref}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can I help you today?"
        autoFocus={autoFocus}
        className="flex-1 bg-transparent text-pourpre-deep text-[13px] sm:text-sm font-body placeholder:text-pourpre-deep/40 outline-none"
      />
      <button
        onClick={handleSend}
        disabled={!inputValue.trim() || isTyping}
        aria-label="Send message"
        className="text-gold hover:text-gold-dark disabled:opacity-30 transition-colors duration-200 flex-shrink-0"
      >
        <Send size={18} strokeWidth={1.5} />
      </button>
    </div>
  );

  // ── Inline Chat (inside Welcome Banner) ──
  const inlineChat = (
    <div className="mt-6 max-w-md mx-auto">
      {messages.length > 0 && <div className="mb-3">{renderMessages()}</div>}
      {renderInput(inputRef)}
    </div>
  );

  // ── Sticky Chat (mobile only, below viewport) ──
  const stickyChat = (
    <AnimatePresence>
      {isSticky && (
        <>
          {/* Conversation overlay */}
          <AnimatePresence>
            {isOpen && (
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
                      Concierge
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-pourpre-deep/40 hover:text-pourpre-deep transition-colors"
                      aria-label="Close chat"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {/* Messages */}
                  <div className="p-3">{renderMessages()}</div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Sticky input bar */}
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
                {/* Open conversation button (if messages exist) */}
                {messages.length > 0 && !isOpen && (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-gold/60 hover:text-gold transition-colors flex-shrink-0"
                    aria-label="Open conversation"
                  >
                    <MessageCircle size={18} strokeWidth={1.5} />
                  </button>
                )}
                <div className="flex-1">
                  {renderInput(stickyInputRef)}
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
      {/* Inline chat — always in the Welcome Banner */}
      {inlineChat}

      {/* Sticky chat — mobile only, when scrolled past Welcome */}
      {stickyChat}
    </>
  );
}
