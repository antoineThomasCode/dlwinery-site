import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "../route";
import { createMockRequest } from "@/test/helpers";

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.stubEnv("BREVO_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 503 when BREVO_API_KEY is missing", async () => {
    vi.stubEnv("BREVO_API_KEY", "");
    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });

  it("returns 400 when email is missing", async () => {
    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: {},
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "bad-email" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("valid email");
  });

  it("returns success on Brevo 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1 }),
      })
    );

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns success on Brevo 201", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 201,
        json: () => Promise.resolve({ id: 1 }),
      })
    );

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("treats 'already exist' as success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({ message: "Contact already exist" }),
      })
    );

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.alreadySubscribed).toBe(true);
  });

  it("adds listId when BREVO_NEWSLETTER_LIST_ID is set", async () => {
    vi.stubEnv("BREVO_NEWSLETTER_LIST_ID", "42");
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal("fetch", mockFetch);

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    await POST(req);

    const payload = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(payload.listIds).toEqual([42]);
  });

  it("returns 500 on Brevo server error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: "Server error" }),
      })
    );

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it("returns 500 on network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network failure"))
    );

    const req = createMockRequest("/api/newsletter", {
      method: "POST",
      body: { email: "test@example.com" },
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
