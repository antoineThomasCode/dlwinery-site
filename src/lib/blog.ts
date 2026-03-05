import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  author: string;
  pillar: string;
  keywords: string[];
  content: string;
  readingTime: number;
  excerpt: string;
};

export function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 230);
}

export function extractExcerpt(content: string): string {
  // Remove markdown headings, images, links, frontmatter dashes
  const clean = content
    .replace(/^#{1,6}\s.*/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^---$/gm, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  const firstParagraph = clean.split("\n").find((line) => line.trim().length > 80);
  if (!firstParagraph) return clean.slice(0, 160) + "...";
  return firstParagraph.slice(0, 200) + (firstParagraph.length > 200 ? "..." : "");
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug as string,
      title: data.title as string,
      metaTitle: (data.meta_title ?? data.title) as string,
      metaDescription: (data.meta_description ?? "") as string,
      date: data.date as string,
      author: (data.author ?? "Domaine LeSeurre") as string,
      pillar: (data.pillar ?? "guide") as string,
      keywords: (data.keywords ?? []) as string[],
      content,
      readingTime: estimateReadingTime(content),
      excerpt: extractExcerpt(content),
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

const PILLAR_META: Record<string, { label: string; color: string }> = {
  guide: { label: "Guide", color: "bg-sage/15 text-sage" },
  education: { label: "Education", color: "bg-olive/10 text-olive" },
  heritage: { label: "Heritage", color: "bg-pourpre-light/10 text-pourpre-light" },
  seasonal: { label: "Seasonal", color: "bg-gold/15 text-gold-dark" },
};

export function getPillarMeta(pillar: string) {
  return PILLAR_META[pillar] ?? PILLAR_META.guide;
}
