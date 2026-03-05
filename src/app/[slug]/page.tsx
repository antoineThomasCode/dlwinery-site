import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getAllPosts, getPostBySlug, getPostSlugs, getPillarMeta } from "@/lib/blog";
import { ArticleBody } from "@/components/blog/article-body";
import { BlogCta } from "@/components/blog/blog-cta";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

// Known static pages — these slugs should NOT be caught by [slug]
const STATIC_PAGES = new Set([
  "experiences",
  "our-story",
  "wines",
  "wine-club",
  "shop",
  "events",
  "blog",
  "contact",
  "member",
  "legal",
]);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs()
    .filter((slug) => !STATIC_PAGES.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // Don't serve blog posts for static page slugs
  if (STATIC_PAGES.has(slug)) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pillar = getPillarMeta(post.pillar);
  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Pick a hero image based on pillar
  const heroImages: Record<string, string> = {
    seasonal: "/images/winery-terrace-dining.jpg",
    guide: "/images/winery-scenic-view.webp",
    education: "/images/winery-wine-macaron.webp",
    heritage: "/images/story-vendanges-1947.jpg",
  };
  const heroImage = heroImages[post.pillar] ?? heroImages.guide;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Article JSON-LD */}
      <ArticleJsonLd
        title={post.title}
        description={post.metaDescription}
        date={post.date}
        author={post.author}
        keywords={post.keywords}
        url={`https://dlwinery.com/${post.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://dlwinery.com" },
          { name: "Blog", url: "https://dlwinery.com/blog" },
          { name: post.title, url: `https://dlwinery.com/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImage} alt={`Hero image for ${post.title}`} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/90 via-olive-deep/40 to-olive-deep/20" />
        </div>
        <div className="relative max-w-[720px] mx-auto w-full px-5 sm:px-6 pb-8 sm:pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-warm-white/60 hover:text-warm-white text-xs tracking-wide uppercase font-body mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All articles
          </Link>
          <span className={`inline-block text-[10px] tracking-[0.15em] uppercase font-body font-semibold px-2.5 py-1 rounded-sm mb-3 ${pillar.color}`}>
            {pillar.label}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl !text-warm-white font-light leading-[1.1] mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-warm-white/50 text-xs font-body">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-[720px] mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <ArticleBody content={post.content} />
      </article>

      {/* Bottom CTA */}
      <BlogCta />

      {/* Related articles */}
      {related.length > 0 && <RelatedPosts posts={related} />}
    </>
  );
}
