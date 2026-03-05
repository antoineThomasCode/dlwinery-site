import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges class strings", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("handles empty call", () => {
    expect(cn()).toBe("");
  });

  it("deduplicates identical classes", () => {
    expect(cn("p-4", "p-4")).toBe("p-4");
  });

  it("handles array inputs", () => {
    expect(cn(["px-2", "py-3"])).toBe("px-2 py-3");
  });
});
