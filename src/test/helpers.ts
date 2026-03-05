import { NextRequest } from "next/server";

/**
 * Create a mock NextRequest for testing API routes.
 */
export function createMockRequest(
  url: string,
  options?: {
    method?: string;
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): NextRequest {
  const { method = "GET", body, headers = {} } = options ?? {};

  const init = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
  } as { method: string; headers: Record<string, string>; body?: string };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return new NextRequest(new URL(url, "http://localhost:3000"), init);
}
