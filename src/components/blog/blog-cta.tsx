import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WineIcon } from "@/components/ui/wine-icon";

export function BlogCta() {
  return (
    <section className="bg-navy-deep py-14 sm:py-16">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 text-center">
        <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body font-medium mb-3">
          Experience It Yourself
        </p>
        <h2 className="font-heading text-2xl sm:text-3xl !text-warm-white font-light mb-4 leading-tight">
          Taste the French Side of the Finger Lakes
        </h2>
        <p className="text-warm-white/50 text-sm sm:text-base font-body max-w-md mx-auto mb-8 leading-relaxed">
          Book a tasting at Domaine LeSeurre and discover why visitors call it the
          most memorable stop on the Keuka Lake Wine Trail.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-bordeaux hover:bg-bordeaux-deep text-warm-white rounded-sm text-[12px] tracking-[0.1em] uppercase font-medium px-8 h-11 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/experiences" className="inline-flex items-center gap-2"><WineIcon className="w-4 h-4" /> Book a Tasting</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gold/25 text-warm-white hover:bg-gold/10 hover:border-gold/40 rounded-sm text-[12px] tracking-[0.1em] uppercase font-medium px-8 h-11 transition-all"
          >
            <Link href="/join-the-club">Join the Wine Club</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
