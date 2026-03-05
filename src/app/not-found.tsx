import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WineIcon } from "@/components/ui/wine-icon";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream bg-parchment-texture px-5 sm:px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
          <WineIcon className="w-7 h-7 text-gold" />
        </div>

        <h1 className="font-heading text-[2rem] sm:text-4xl text-pourpre-deep font-light mb-3 leading-tight">
          Page Not Found
        </h1>
        <p className="text-stone text-[13px] sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          It seems you&apos;ve wandered off the vineyard path.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-cta-primary inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
          >
            Return Home
          </Link>
          <Link
            href="/wines"
            className="btn-shimmer-gold inline-flex items-center justify-center gap-2 rounded-none h-12 px-8 text-[11px] tracking-[0.15em] uppercase font-body font-medium"
          >
            Explore Our Wines
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
