import { describe, it, expect } from "vitest";
import { estimateReadingTime, extractExcerpt, getPillarMeta } from "@/lib/blog";

describe("estimateReadingTime()", () => {
  it("returns 1 for short text", () => {
    expect(estimateReadingTime("Hello world")).toBe(1);
  });

  it("returns correct time for longer text", () => {
    const words = new Array(460).fill("word").join(" "); // 460 words => ceil(460/230) = 2
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("rounds up partial minutes", () => {
    const words = new Array(231).fill("word").join(" "); // ceil(231/230) = 2
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("returns 1 for empty string", () => {
    // "".split(/\s+/) = [""] => length 1 => ceil(1/230) = 1
    expect(estimateReadingTime("")).toBe(1);
  });
});

describe("extractExcerpt()", () => {
  it("strips markdown headings", () => {
    const md = "# Title\n\nThis is a paragraph that is longer than eighty characters to ensure it gets picked up by the excerpt logic as the first paragraph.";
    const excerpt = extractExcerpt(md);
    expect(excerpt).not.toContain("# Title");
    expect(excerpt).toContain("This is a paragraph");
  });

  it("strips bold and italic", () => {
    const md = "This is **bold** and *italic* text that is quite long so that it passes the eighty character minimum for being selected as the first paragraph line.";
    const excerpt = extractExcerpt(md);
    expect(excerpt).not.toContain("**");
    expect(excerpt).not.toContain("*italic*");
    expect(excerpt).toContain("bold");
    expect(excerpt).toContain("italic");
  });

  it("strips links but keeps text", () => {
    const md = "Check out [this link](https://example.com) in a paragraph that is definitely longer than eighty characters so the function picks it up properly ok.";
    const excerpt = extractExcerpt(md);
    expect(excerpt).toContain("this link");
    expect(excerpt).not.toContain("https://example.com");
  });

  it("truncates at 200 characters", () => {
    const longParagraph = "A".repeat(250);
    const excerpt = extractExcerpt(longParagraph);
    expect(excerpt.length).toBeLessThanOrEqual(203); // 200 + "..."
    expect(excerpt).toContain("...");
  });

  it("falls back to first 160 chars if no paragraph > 80 chars", () => {
    const md = "Short.\nAlso short.";
    const excerpt = extractExcerpt(md);
    expect(excerpt).toContain("...");
  });
});

describe("getPillarMeta()", () => {
  it("returns correct meta for known pillars", () => {
    expect(getPillarMeta("guide")).toEqual({
      label: "Guide",
      color: "bg-sage/15 text-sage",
    });
    expect(getPillarMeta("education")).toEqual({
      label: "Education",
      color: "bg-olive/10 text-olive",
    });
    expect(getPillarMeta("heritage")).toEqual({
      label: "Heritage",
      color: "bg-pourpre-light/10 text-pourpre-light",
    });
    expect(getPillarMeta("seasonal")).toEqual({
      label: "Seasonal",
      color: "bg-gold/15 text-gold-dark",
    });
  });

  it("falls back to guide for unknown pillar", () => {
    expect(getPillarMeta("unknown")).toEqual(getPillarMeta("guide"));
  });
});
