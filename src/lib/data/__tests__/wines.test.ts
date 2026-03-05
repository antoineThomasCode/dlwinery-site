import { describe, it, expect } from "vitest";
import { wines } from "@/lib/data/wines";

const VALID_TYPES = ["red", "white", "rose", "sparkling", "gift-card"];
const VALID_BODY = ["light", "medium", "full"];
const VALID_SWEETNESS = ["dry", "off-dry", "sweet"];

describe("wines data integrity", () => {
  it("has wines", () => {
    expect(wines.length).toBeGreaterThan(0);
  });

  it("all IDs are unique", () => {
    const ids = wines.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all SKUs are unique", () => {
    const skus = wines.map((w) => w.sku);
    expect(new Set(skus).size).toBe(skus.length);
  });

  it("every wine has a non-empty name", () => {
    for (const wine of wines) {
      expect(wine.name.length).toBeGreaterThan(0);
    }
  });

  it("every price is > 0", () => {
    for (const wine of wines) {
      expect(wine.price).toBeGreaterThan(0);
    }
  });

  it("memberPrice <= price (except gift cards)", () => {
    for (const wine of wines) {
      if (wine.type === "gift-card") {
        expect(wine.memberPrice).toBe(wine.price);
      } else {
        expect(wine.memberPrice).toBeLessThanOrEqual(wine.price);
      }
    }
  });

  it("type is a valid enum", () => {
    for (const wine of wines) {
      expect(VALID_TYPES).toContain(wine.type);
    }
  });

  it("body is a valid enum", () => {
    for (const wine of wines) {
      expect(VALID_BODY).toContain(wine.body);
    }
  });

  it("sweetness is a valid enum", () => {
    for (const wine of wines) {
      expect(VALID_SWEETNESS).toContain(wine.sweetness);
    }
  });
});
