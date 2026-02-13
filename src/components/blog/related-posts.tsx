import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type BlogPost, getPillarMeta } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="bg-cream py-14 sm:py-16 pb-24 md:pb-16">
      <div className="max-w-[var(--max-width)] mx-auto px-5 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl text-navy text-center mb-10 font-light">
          Continue Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post) => {
            const pillar = getPillarMeta(post.pillar);
            return (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group card-heritage rounded-lg bg-warm-white p-5 sm:p-6 flex flex-col"
              >
                <span className={`self-start text-[10px] tracking-[0.12em] uppercase font-body font-semibold px-2 py-0.5 rounded-sm mb-3 ${pillar.color}`}>
                  {pillar.label}
                </span>
                <h3 className="font-heading text-lg sm:text-xl text-navy group-hover:text-bordeaux transition-colors mb-2 leading-snug font-medium">
                  {post.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed font-body line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-bordeaux text-xs font-body font-medium tracking-wide uppercase group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
