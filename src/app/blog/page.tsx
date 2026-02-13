import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllPosts, getPillarMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Wine Stories, Guides & Finger Lakes Travel Tips",
  description:
    "Discover wine guides, food pairing tips, and Finger Lakes travel stories from Domaine LeSeurre — a French-heritage winery on Keuka Lake.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const heroImages: Record<string, string> = {
    seasonal: "/images/winery-terrace-dining.jpg",
    guide: "/images/winery-scenic-view.webp",
    education: "/images/winery-wine-macaron.webp",
    heritage: "/images/story-vendanges-1947.jpg",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] sm:h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/winery-lake-view.webp"
            alt="View of Keuka Lake from Domaine LeSeurre"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-navy-deep/10" />
        </div>
        <div className="relative max-w-[var(--max-width)] mx-auto w-full px-5 sm:px-6 pb-8 sm:pb-12">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body font-medium mb-2">
            From the Vineyard
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl !text-warm-white font-light">
            Stories, Guides & Wine Wisdom
          </h1>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6 -mt-6 sm:-mt-8 relative z-10 mb-12 sm:mb-16">
          <Link href={`/${featured.slug}`} className="group block">
            <div className="card-heritage rounded-lg bg-warm-white overflow-hidden sm:grid sm:grid-cols-2">
              <div className="relative aspect-[16/10] sm:aspect-auto">
                <Image
                  src={heroImages[featured.pillar] ?? heroImages.guide}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="p-5 sm:p-8 flex flex-col justify-center">
                <span className={`self-start text-[10px] tracking-[0.12em] uppercase font-body font-semibold px-2 py-0.5 rounded-sm mb-3 ${getPillarMeta(featured.pillar).color}`}>
                  {getPillarMeta(featured.pillar).label}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl text-navy group-hover:text-bordeaux transition-colors mb-3 leading-tight font-medium">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base text-stone leading-relaxed font-body line-clamp-3 mb-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-stone/70 font-body mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime} min
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-bordeaux text-xs font-body font-medium tracking-wide uppercase group-hover:gap-2.5 transition-all">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6 pb-20 md:pb-16">
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-heading text-xl text-navy font-medium whitespace-nowrap">More Articles</h2>
              <div className="flex-1 gold-line-thin" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {rest.map((post) => {
                const pillar = getPillarMeta(post.pillar);
                return (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group card-heritage rounded-lg bg-warm-white overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={heroImages[post.pillar] ?? heroImages.guide}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <span className={`self-start text-[10px] tracking-[0.12em] uppercase font-body font-semibold px-2 py-0.5 rounded-sm mb-2 ${pillar.color}`}>
                        {pillar.label}
                      </span>
                      <h3 className="font-heading text-lg text-navy group-hover:text-bordeaux transition-colors mb-2 leading-snug font-medium">
                        {post.title}
                      </h3>
                      <p className="text-sm text-stone leading-relaxed font-body line-clamp-2 mb-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-stone/70 font-body">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min
                        </span>
                        <span className="inline-flex items-center gap-1 text-bordeaux font-medium tracking-wide uppercase group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
