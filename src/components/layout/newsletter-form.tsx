"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Could not subscribe. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 py-2.5">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold flex-shrink-0">
          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-sm text-gold">Subscribed! Thank you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        className="bg-warm-white/8 border border-gold/20 rounded-none px-4 py-2.5 text-sm text-warm-white placeholder:text-warm-white/25 focus:outline-none focus:border-gold/50 transition-colors duration-300"
      />
      {status === "error" && errorMsg && (
        <p className="text-red-400 text-xs">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-cta-primary rounded-none px-4 py-2.5 text-xs font-body font-medium tracking-[0.12em] uppercase cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        data-track-event="newsletter_signup"
        data-track-category="footer"
        data-track-label="email_capture"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Subscribing...
          </span>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
