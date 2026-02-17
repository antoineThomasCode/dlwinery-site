import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
};

export default function ReturnsPage() {
  return (
    <main className="pt-28 pb-24 bg-cream bg-parchment-texture min-h-screen">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6">
        <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">Legal</p>
        <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-8">Return &amp; Refund Policy</h1>

        <div className="space-y-6 text-stone text-[13px] sm:text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Wine Quality Guarantee</h2>
            <p>We stand behind every bottle we produce. If you receive a corked, spoiled, or otherwise defective bottle, contact us within 14 days of delivery. We will replace the bottle in your next shipment or issue a full credit toward a different selection.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Shipping Damage</h2>
            <p>If your order arrives damaged in transit, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement shipment at no additional cost.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Tasting Experience Refunds</h2>
            <p>Cancellations made at least 24 hours before your scheduled tasting are eligible for a full refund. Cancellations within 24 hours or no-shows are non-refundable. Rescheduling is always available at no charge — just contact us.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Event Refunds</h2>
            <p>Event cancellation policies vary by event and are listed on each event page. Generally, refunds are available up to 7 days before the event date. If an event is cancelled by the winery, full refunds will be issued automatically.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Wine Club Shipments</h2>
            <p>If you are not satisfied with a wine in your club shipment, contact us and we will replace it in your next shipment or offer a credit. Wine Club members may skip a shipment with at least 14 days notice before the shipment date.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">How to Request a Return</h2>
            <p>Contact us by email at <a href="mailto:info@dlwinery.com" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">info@dlwinery.com</a> or call <a href="tel:+16075693299" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">(607) 569-3299</a>. Please include your order number and a description of the issue. We aim to respond within 24 hours.</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/10">
          <Link href="/contact" className="text-pourpre-deep text-[11px] tracking-[0.1em] uppercase font-body font-medium hover:text-pourpre transition-colors">
            ← Back to Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
