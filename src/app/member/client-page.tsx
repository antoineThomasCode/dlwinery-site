"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionDivider } from "@/components/shared/section-divider";
import { FrenchText } from "@/components/shared/french-text";
import { WineIcon } from "@/components/ui/wine-icon";
import { Wine, Gift, Star, Truck, Calendar, Package, ShoppingCart, LogOut, User, Mail, Lock, ArrowRight, Check, Clock, Users } from "lucide-react";
import { mockMember } from "@/lib/data/member";

type View = "login" | "dashboard";

const statusColors = {
  preparing: "text-amber-600 bg-amber-50",
  shipped: "text-blue-600 bg-blue-50",
  delivered: "text-green-600 bg-green-50",
};

export default function MemberPage() {
  const [view, setView] = useState<View>("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setView("dashboard");
    // No scroll-to-top — dashboard renders in-place for app-like feel
  };

  // Login screen
  if (view === "login") {
    return (
      <main className="pt-28 pb-24 min-h-screen bg-cream bg-parchment-texture">
        <div className="max-w-[420px] mx-auto px-5 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">
                <FrenchText>Le Cercle</FrenchText>
              </p>
              <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-3">
                Member Area
              </h1>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-warm-white border border-gold/10 p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                    <Mail className="w-3 h-3 inline mr-1.5 text-gold/50" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full bg-cream border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium mb-2">
                    <Lock className="w-3 h-3 inline mr-1.5 text-gold/50" /> Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full bg-cream border border-gold/20 rounded-none px-4 py-3 text-sm text-pourpre-deep font-body focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 btn-cta-primary rounded-none h-12 text-[11px] tracking-[0.15em] uppercase font-body font-medium cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-5 text-center">
                <button className="text-stone/50 text-[12px] hover:text-pourpre-deep transition-colors cursor-pointer">Forgot password?</button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8 text-center">
              <p className="text-stone/60 text-sm mb-3">Not a member yet?</p>
              <Link
                href="/wine-club"
                className="inline-flex items-center gap-2 text-pourpre-deep text-[11px] font-body font-medium tracking-[0.15em] uppercase hover:text-pourpre transition-colors group"
              >
                Join Le Cercle — It&apos;s Free
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Demo notice */}
          <div className="mt-6 p-3 bg-gold/5 border border-gold/15 text-center">
            <p className="text-stone/50 text-[11px]">Demo: Enter any email/password to view the dashboard</p>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard
  const m = mockMember;

  return (
    <main className="pt-24 pb-24 min-h-screen bg-cream bg-parchment-texture">
      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-1 font-body font-medium">
              <FrenchText>Bienvenue</FrenchText>
            </p>
            <h1 className="font-heading text-[1.5rem] sm:text-3xl text-pourpre-deep font-light">
              {m.firstName}&apos;s Dashboard
            </h1>
          </div>
          <button
            onClick={() => setView("login")}
            className="flex items-center gap-1.5 text-stone/50 text-[11px] tracking-[0.08em] uppercase font-body hover:text-pourpre-deep transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <Link href="/experiences" className="flex items-center gap-3 p-4 bg-warm-white border border-gold/10 hover:border-gold/25 transition-colors group">
            <WineIcon className="w-5 h-5 text-gold/60" />
            <div>
              <p className="text-pourpre-deep text-sm font-medium">Book Free Tasting</p>
              <p className="text-stone/40 text-[11px]">{m.benefits.freeTaskings} remaining + {m.benefits.freeGuests} guests</p>
            </div>
          </Link>
          <Link href="/shop" className="flex items-center gap-3 p-4 bg-warm-white border border-gold/10 hover:border-gold/25 transition-colors group">
            <ShoppingCart className="w-5 h-5 text-gold/60" />
            <div>
              <p className="text-pourpre-deep text-sm font-medium">Shop with {m.benefits.discount}% Off</p>
              <p className="text-stone/40 text-[11px]">Member pricing active</p>
            </div>
          </Link>
          <Link href="/events" className="flex items-center gap-3 p-4 bg-warm-white border border-gold/10 hover:border-gold/25 transition-colors group">
            <Calendar className="w-5 h-5 text-gold/60" />
            <div>
              <p className="text-pourpre-deep text-sm font-medium">VIP Events</p>
              <p className="text-stone/40 text-[11px]">Priority access</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next shipment */}
          <div className="lg:col-span-2 bg-warm-white border border-gold/10 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-pourpre-deep text-lg">Next Shipment</h2>
              <span className={`px-3 py-1 text-[10px] tracking-[0.08em] uppercase font-body font-medium ${statusColors[m.nextShipment.status]}`}>
                {m.nextShipment.status}
              </span>
            </div>
            <p className="text-stone/60 text-sm mb-5">
              <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-gold/50" />
              Expected: {m.nextShipment.date}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {m.nextShipment.wines.map((wine, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-cream border border-gold/8">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Wine className={`w-4 h-4 ${
                      wine.type === "sparkling" ? "text-amber-500" :
                      wine.type === "white" ? "text-yellow-600" :
                      wine.type === "rose" ? "text-pink-500" :
                      "text-red-700"
                    }`} />
                  </div>
                  <div>
                    <p className="text-pourpre-deep text-[13px] font-medium">{wine.name}</p>
                    <p className="text-stone/40 text-[10px] uppercase tracking-wide">{wine.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits summary */}
          <div className="bg-warm-white border border-gold/10 p-5 sm:p-6">
            <h2 className="font-heading text-pourpre-deep text-lg mb-5">Your Benefits</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gold/8">
                  <Gift className="w-4 h-4 text-gold/60" />
                </div>
                <div>
                  <p className="text-pourpre-deep text-sm font-medium">{m.benefits.discount}% discount</p>
                  <p className="text-stone/40 text-[11px]">On all purchases</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gold/8">
                  <Star className="w-4 h-4 text-gold/60" />
                </div>
                <div>
                  <p className="text-pourpre-deep text-sm font-medium">{m.benefits.freeTaskings} free tastings</p>
                  <p className="text-stone/40 text-[11px]">+ {m.benefits.freeGuests} guest invites each</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gold/8">
                  <Truck className="w-4 h-4 text-gold/60" />
                </div>
                <div>
                  <p className="text-pourpre-deep text-sm font-medium">$18 flat shipping</p>
                  <p className="text-stone/40 text-[11px]">Nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gold/8">
                  <Users className="w-4 h-4 text-gold/60" />
                </div>
                <div>
                  <p className="text-pourpre-deep text-sm font-medium">VIP event access</p>
                  <p className="text-stone/40 text-[11px]">{m.benefits.vipEvents ? "Active" : "Inactive"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold/8">
              <p className="text-stone/40 text-[10px] tracking-[0.1em] uppercase mb-1">Membership</p>
              <p className="text-pourpre-deep text-sm font-medium capitalize">{m.tier} Tier</p>
              <p className="text-stone/40 text-[11px]">Since {new Date(m.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </div>

        {/* Order history */}
        <div className="mt-6 bg-warm-white border border-gold/10 p-5 sm:p-6">
          <h2 className="font-heading text-pourpre-deep text-lg mb-5">Order History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] tracking-[0.1em] uppercase text-stone/40 font-body border-b border-gold/8">
                  <th className="pb-3 pr-4">Order</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Items</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {m.orderHistory.map((order) => (
                  <tr key={order.id} className="border-b border-gold/5">
                    <td className="py-3 pr-4 text-pourpre-deep font-medium">{order.id}</td>
                    <td className="py-3 pr-4 text-stone/60">{order.date}</td>
                    <td className="py-3 pr-4 text-stone/60">{order.items} bottles</td>
                    <td className="py-3 text-right text-pourpre-deep font-medium">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Referral */}
        <div className="mt-6 bg-pourpre-deep/5 border border-gold/10 p-5 sm:p-6 text-center">
          <h3 className="font-heading text-pourpre-deep text-lg mb-2">Invite a Friend, Earn a Bottle</h3>
          <p className="text-stone text-[13px] mb-4">
            Share your unique link. When they join Le Cercle, you both receive a complimentary bottle.
          </p>
          <div className="inline-flex items-center gap-2 bg-warm-white border border-gold/15 px-4 py-2.5">
            <span className="text-pourpre-deep text-sm font-mono">dlwinery.com/ref/{m.id}</span>
            <button className="text-gold text-[10px] tracking-[0.1em] uppercase font-body font-medium hover:text-gold-dark transition-colors cursor-pointer">Copy</button>
          </div>
        </div>
      </div>
    </main>
  );
}
