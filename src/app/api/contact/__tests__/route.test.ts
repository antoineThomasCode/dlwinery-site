import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST, escapeHtml } from "../route";
import { createMockRequest } from "@/test/helpers";

describe("escapeHtml()", () => {
  it("escapes all HTML entities", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  it("escapes ampersands", () => {
    expect(escapeHtml("A & B")).toBe("A &amp; B");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });
});

describe("POST /api/contact", () => {
  const validBody = {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "tasting",
    message: "I'd like to book a tasting.",
  };

  beforeEach(() => {
    vi.stubEnv("BREVO_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 503 when BREVO_API_KEY is missing", async () => {
    vi.stubEnv("BREVO_API_KEY", "");
    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });

  it("returns 400 when required fields are missing", async () => {
    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: { name: "Jane" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("required");
  });

  it("returns 400 for invalid email", async () => {
    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: { ...validBody, email: "not-an-email" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("valid email");
  });

  it("returns success and sends correct payload to Brevo", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ messageId: "123" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);

    // Verify Brevo was called with correct structure
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain("brevo.com");
    const payload = JSON.parse(options.body);
    expect(payload.to[0].email).toBe("info@dlwinery.com");
    expect(payload.replyTo.email).toBe("jane@example.com");
    expect(payload.subject).toContain("Tasting Reservation");
    expect(payload.tags).toContain("website-contact-form");
  });

  it("returns 500 when Brevo responds with error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: "Internal" }),
      })
    );

    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("returns 500 on network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );

    const req = createMockRequest("/api/contact", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("maps subject labels correctly", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal("fetch", mockFetch);

    for (const [key, label] of [
      ["tasting", "Tasting Reservation"],
      ["wine-club", "Wine Club Inquiry"],
      ["private-event", "Private Event"],
      ["wine-order", "Wine Order / Shipping"],
      ["press", "Press / Media"],
      ["other", "Other"],
    ]) {
      const req = createMockRequest("/api/contact", {
        method: "POST",
        body: { ...validBody, subject: key },
      });
      const res = await POST(req);
      expect(res.status).toBe(200);

      const payload = JSON.parse(mockFetch.mock.lastCall![1].body);
      expect(payload.subject).toContain(label);
    }
  });
});
