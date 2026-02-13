"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

/* ─── Markdown → React renderer (no external deps) ─── */

type Token =
  | { type: "heading"; level: number; text: string; id: string }
  | { type: "paragraph"; children: InlineToken[] }
  | { type: "image"; alt: string; src: string }
  | { type: "hr" }
  | { type: "list"; ordered: boolean; items: InlineToken[][] }
  | { type: "html"; content: string };

type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "link"; href: string; text: string }
  | { type: "code"; value: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  // Regex: bold, italic, links, inline code
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "bold", value: match[1] });
    else if (match[2]) tokens.push({ type: "italic", value: match[2] });
    else if (match[3]) tokens.push({ type: "code", value: match[3] });
    else if (match[4] && match[5]) tokens.push({ type: "link", href: match[5], text: match[4] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }
  return tokens;
}

function parseMarkdown(content: string): Token[] {
  const lines = content.split("\n");
  const tokens: Token[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) { i++; continue; }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      tokens.push({ type: "hr" });
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      tokens.push({ type: "heading", level, text, id: slugify(text) });
      i++;
      continue;
    }

    // Image
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      tokens.push({ type: "image", alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items: InlineToken[][] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^[-*]\s+/, "")));
        i++;
      }
      tokens.push({ type: "list", ordered: false, items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: InlineToken[][] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\d+\.\s+/, "")));
        i++;
      }
      tokens.push({ type: "list", ordered: true, items });
      continue;
    }

    // Paragraph (collect consecutive non-empty lines)
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^#{1,6}\s/.test(lines[i]) && !/^---/.test(lines[i]) && !/^!\[/.test(lines[i]) && !/^[-*]\s/.test(lines[i]) && !/^\d+\.\s/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      tokens.push({ type: "paragraph", children: parseInline(paraLines.join(" ")) });
    }
  }

  return tokens;
}

function renderInline(tokens: InlineToken[]): ReactNode[] {
  return tokens.map((token, i) => {
    switch (token.type) {
      case "bold":
        return <strong key={i} className="font-semibold text-navy">{token.value}</strong>;
      case "italic":
        return <em key={i} className="font-heading italic text-navy/80">{token.value}</em>;
      case "link":
        return (
          <Link key={i} href={token.href} className="text-bordeaux hover:text-bordeaux-deep underline decoration-bordeaux/30 underline-offset-2 hover:decoration-bordeaux/60 transition-colors">
            {token.text}
          </Link>
        );
      case "code":
        return <code key={i} className="bg-gold/10 text-navy px-1.5 py-0.5 rounded text-sm">{token.value}</code>;
      default:
        return <span key={i}>{token.value}</span>;
    }
  });
}

function mapImageSrc(src: string): string {
  // Map article image references to public images path
  if (src.startsWith("/") || src.startsWith("http")) return src;
  return `/images/${src}`;
}

export function ArticleBody({ content }: { content: string }) {
  // Remove the first H1 (we render it separately in the page header)
  const withoutH1 = content.replace(/^#\s+.+\n/, "");
  const tokens = parseMarkdown(withoutH1);

  return (
    <div className="article-body">
      {tokens.map((token, i) => {
        switch (token.type) {
          case "heading": {
            const Tag = `h${token.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
            const styles: Record<number, string> = {
              2: "text-2xl sm:text-3xl font-heading font-semibold text-navy mt-12 mb-4 leading-tight",
              3: "text-xl sm:text-2xl font-heading font-medium text-navy mt-8 mb-3 leading-tight",
              4: "text-lg sm:text-xl font-heading font-medium text-navy/90 mt-6 mb-2",
            };
            return <Tag key={i} id={token.id} className={styles[token.level] ?? styles[3]}>{token.text}</Tag>;
          }
          case "paragraph":
            return <p key={i} className="text-base sm:text-[17px] leading-[1.8] text-black-warm/80 mb-5 font-body">{renderInline(token.children)}</p>;
          case "image":
            return (
              <figure key={i} className="my-8 sm:my-10 -mx-4 sm:mx-0">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] sm:rounded-lg overflow-hidden">
                  <Image
                    src={mapImageSrc(token.src)}
                    alt={token.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {token.alt && (
                  <figcaption className="text-xs text-stone mt-2 text-center px-4 font-body italic">
                    {token.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "hr":
            return <div key={i} className="my-8 sm:my-10 gold-line-thin" />;
          case "list": {
            const ListTag = token.ordered ? "ol" : "ul";
            return (
              <ListTag key={i} className={`mb-5 space-y-2 pl-4 ${token.ordered ? "list-decimal" : "list-disc"} marker:text-gold`}>
                {token.items.map((item, j) => (
                  <li key={j} className="text-base sm:text-[17px] leading-[1.7] text-black-warm/80 font-body pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ListTag>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
