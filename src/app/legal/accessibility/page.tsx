import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
};

export default function AccessibilityPage() {
  return (
    <main className="pt-28 pb-24 bg-cream bg-parchment-texture min-h-screen">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6">
        <p className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-body font-medium">Legal</p>
        <h1 className="font-heading text-[1.75rem] sm:text-3xl text-pourpre-deep font-light mb-8">Accessibility Statement</h1>

        <div className="space-y-6 text-stone text-[13px] sm:text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Our Commitment</h2>
            <p>Domaine LeSeurre Winery is committed to ensuring digital accessibility for all visitors. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Standards</h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with disabilities.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Measures Taken</h2>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Semantic HTML structure with proper heading hierarchy</li>
              <li>ARIA labels on interactive elements and decorative content</li>
              <li>Keyboard navigation support for all interactive elements</li>
              <li>Sufficient color contrast ratios (WCAG AA compliant)</li>
              <li>Reduced motion support via <code className="bg-warm-white px-1 py-0.5 text-[12px]">prefers-reduced-motion</code></li>
              <li>Responsive design that works across screen sizes and devices</li>
              <li>Alt text on all meaningful images</li>
              <li>Focus indicators on all interactive elements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Physical Accessibility</h2>
            <p>Our tasting room and terrace are wheelchair accessible. If you have specific accessibility needs for your visit, please contact us in advance and we will make appropriate arrangements to ensure you have a comfortable experience.</p>
          </section>

          <section>
            <h2 className="font-heading text-pourpre-deep text-lg mb-3">Feedback</h2>
            <p>We welcome your feedback on the accessibility of our website and winery. If you encounter any accessibility barriers, please contact us:</p>
            <ul className="mt-2 space-y-1">
              <li>Email: <a href="mailto:info@dlwinery.com" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">info@dlwinery.com</a></li>
              <li>Phone: <a href="tel:+16075693299" className="text-pourpre-deep font-medium hover:text-pourpre transition-colors">(607) 569-3299</a></li>
            </ul>
            <p className="mt-2">We aim to respond to accessibility feedback within 2 business days.</p>
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
