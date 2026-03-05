import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createMockRequest } from "@/test/helpers";

// Mock fs before importing the route
vi.mock("fs", () => {
  const promises = {
    readFile: vi.fn(() => Promise.resolve("[]")),
    writeFile: vi.fn(() => Promise.resolve()),
    mkdir: vi.fn(() => Promise.resolve()),
  };
  return { default: { promises }, promises };
});

// Import after vi.mock is hoisted
import { POST, GET } from "../route";
import { promises as mockFs } from "fs";

describe("POST /api/club-lead", () => {
  const validBody = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    phone: "555-0123",
    source: "wine-club-page",
  };

  beforeEach(() => {
    vi.mocked(mockFs.readFile).mockResolvedValue("[]");
    vi.mocked(mockFs.writeFile).mockResolvedValue();
    vi.mocked(mockFs.mkdir).mockResolvedValue(undefined);
    vi.stubEnv("BREVO_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 400 when required fields are missing", async () => {
    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: { firstName: "Jean" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: { ...validBody, email: "bad" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("valid email");
  });

  it("returns success with redirect URL", async () => {
    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.redirectUrl).toContain("vinoshipper.com");
  });

  it("writes lead to fs", async () => {
    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    await POST(req);

    expect(mockFs.writeFile).toHaveBeenCalled();
    const written = JSON.parse(
      vi.mocked(mockFs.writeFile).mock.calls[0][1] as string
    );
    expect(written).toHaveLength(1);
    expect(written[0].email).toBe("jean@example.com");
  });

  it("deduplicates by email (updates existing)", async () => {
    const existing = [
      {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@example.com",
        source: "old",
        timestamp: "2026-01-01T00:00:00.000Z",
        completedSignup: false,
      },
    ];
    vi.mocked(mockFs.readFile).mockResolvedValue(JSON.stringify(existing));

    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: { ...validBody, source: "updated-source" },
    });
    await POST(req);

    const written = JSON.parse(
      vi.mocked(mockFs.writeFile).mock.lastCall![1] as string
    );
    expect(written).toHaveLength(1);
    expect(written[0].source).toBe("updated-source");
  });

  it("pushes to Brevo when API key is set", async () => {
    vi.stubEnv("BREVO_API_KEY", "test-key");
    const mockFetch = vi
      .fn()
      .mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    vi.stubGlobal("fetch", mockFetch);

    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    await POST(req);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain("brevo.com/v3/contacts");
  });

  it("returns 503 when BREVO_API_KEY is missing", async () => {
    vi.stubEnv("BREVO_API_KEY", "");
    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(503);
  });

  it("returns 502 when Brevo API responds with error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, text: () => Promise.resolve("Server error") })
    );

    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(502);
  });

  it("returns 500 when Brevo network fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Brevo down"))
    );

    const req = createMockRequest("/api/club-lead", {
      method: "POST",
      body: validBody,
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});

describe("GET /api/club-lead", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns lead count", async () => {
    vi.mocked(mockFs.readFile).mockResolvedValue(
      JSON.stringify([{ email: "a@a.com" }, { email: "b@b.com" }])
    );

    const res = await GET();
    const data = await res.json();
    expect(data.count).toBe(2);
  });

  it("returns 0 when file doesn't exist", async () => {
    vi.mocked(mockFs.readFile).mockRejectedValue(new Error("ENOENT"));

    const res = await GET();
    const data = await res.json();
    expect(data.count).toBe(0);
  });
});
