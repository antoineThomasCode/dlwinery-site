import { describe, it, expect } from "vitest";
import { events } from "@/lib/data/events";

describe("events data integrity", () => {
  it("has events", () => {
    expect(events.length).toBeGreaterThan(0);
  });

  it("all IDs are unique", () => {
    const ids = events.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all slugs are unique", () => {
    const slugs = events.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every event has a non-empty title", () => {
    for (const event of events) {
      expect(event.title.length).toBeGreaterThan(0);
    }
  });

  it("every event has a non-empty date", () => {
    for (const event of events) {
      expect(event.date.length).toBeGreaterThan(0);
    }
  });

  it("price >= 0", () => {
    for (const event of events) {
      expect(event.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("capacity >= spotsLeft", () => {
    for (const event of events) {
      expect(event.capacity).toBeGreaterThanOrEqual(event.spotsLeft);
    }
  });

  it("spotsLeft >= 0", () => {
    for (const event of events) {
      expect(event.spotsLeft).toBeGreaterThanOrEqual(0);
    }
  });

  it("capacity > 0", () => {
    for (const event of events) {
      expect(event.capacity).toBeGreaterThan(0);
    }
  });
});
