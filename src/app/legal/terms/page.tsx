import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for purchases, tastings, and services at Domaine LeSeurre Winery in Hammondsport, NY.",
};

export default function TermsPage() {
  return (
    <main className="pt-28 pb-24 bg-cream bg-parchment-texture min-h-screen">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6">
        <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">Legal</p>
        <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-8">Terms &amp; Conditions</h1>

        <div className="prose-dl space-y-6 text-stone text-[13px] sm:text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Domaine LeSeurre Winery website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">2. Age Requirement</h2>
            <p>You must be 21 years of age or older to purchase wine or participate in wine tasting experiences. By placing an order or making a reservation, you confirm that you meet this age requirement. Valid identification will be required upon delivery and at in-person events.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">3. Reservations & Cancellations</h2>
            <p>Tasting reservations can be cancelled up to 24 hours before the scheduled time for a full refund. No-shows may be charged the full tasting fee. Event reservations follow the specific cancellation policy listed on each event page.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">4. Wine Club Membership</h2>
            <p>LeSeurre Family Club membership is free to join. Members agree to receive 3 shipments per year (6 bottles each) at the current member pricing. Membership may be cancelled with 30 days notice before the next scheduled shipment. Contact us for details on cancellation terms. Cancellation does not affect pending shipments.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">5. Shipping & Delivery</h2>
            <p>Wine is shipped via VinoShipper to applicable states. An adult signature (21+) is required upon delivery. We are not responsible for orders left unattended or for delays caused by carriers. Shipping times are estimates and not guaranteed.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">6. Privacy</h2>
            <p>We collect personal information only as needed to process orders, reservations, and membership. We do not sell or share your personal data with third parties for marketing purposes. Payment information is processed securely and never stored on our servers.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">7. Limitation of Liability</h2>
            <p>Domaine LeSeurre Winery shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products. Our total liability is limited to the amount paid for the specific product or service in question.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">8. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:info@dlwinery.com" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">info@dlwinery.com</a> or call <a href="tel:+16075693299" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">(607) 569-3299</a>.</p>
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
