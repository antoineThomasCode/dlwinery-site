import { describe, it, expect } from "vitest";
import { experiences, generateTimeSlots } from "@/lib/data/experiences";

describe("generateTimeSlots()", () => {
  const date = "2026-06-15";
  const slots = generateTimeSlots(date);

  it("generates 14 time slots (10:00–16:30)", () => {
    expect(slots).toHaveLength(14);
  });

  it("each slot has required fields", () => {
    for (const slot of slots) {
      expect(slot).toHaveProperty("id");
      expect(slot).toHaveProperty("startAt");
      expect(slot).toHaveProperty("spotsLeft");
      expect(slot).toHaveProperty("maxSpots");
    }
  });

  it("first slot starts at 10:00", () => {
    expect(slots[0].startAt).toBe(`${date}T10:00:00`);
  });

  it("last slot starts at 16:30", () => {
    expect(slots[slots.length - 1].startAt).toBe(`${date}T16:30:00`);
  });

  it("preserves the date in startAt", () => {
    for (const slot of slots) {
      expect(slot.startAt).toContain(date);
    }
  });

  it("spotsLeft is between 1 and maxSpots", () => {
    for (const slot of slots) {
      expect(slot.spotsLeft).toBeGreaterThanOrEqual(1);
      expect(slot.spotsLeft).toBeLessThanOrEqual(slot.maxSpots);
    }
  });
});

describe("experiences data integrity", () => {
  it("has at least one experience", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("all IDs are unique", () => {
    const ids = experiences.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every experience has a non-empty name", () => {
    for (const exp of experiences) {
      expect(exp.name.length).toBeGreaterThan(0);
    }
  });

  it("prices are >= 0", () => {
    for (const exp of experiences) {
      expect(exp.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("maxGuests is > 0", () => {
    for (const exp of experiences) {
      expect(exp.maxGuests).toBeGreaterThan(0);
    }
  });
});
