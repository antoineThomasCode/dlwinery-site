import { NextRequest, NextResponse } from "next/server";

/**
 * Verify admin authentication via API key.
 *
 * Checks (in order):
 *   1. `Authorization: Bearer <key>` header
 *   2. `?key=<key>` query parameter
 *
 * Returns `true` if the provided key matches `ADMIN_API_KEY` env var.
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  const envKey = process.env.ADMIN_API_KEY;

  // If env var is not set, we cannot authenticate anyone
  if (!envKey) return false;

  // Check Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, token] = authHeader.split(" ");
    if (scheme?.toLowerCase() === "bearer" && token === envKey) {
      return true;
    }
  }

  // Fallback: check query param
  const keyParam = request.nextUrl.searchParams.get("key");
  if (keyParam === envKey) {
    return true;
  }

  return false;
}

/**
 * Returns a 503 response when ADMIN_API_KEY is not configured.
 */
export function adminKeyNotConfiguredResponse(): NextResponse {
  return NextResponse.json(
    { error: "Admin authentication is not configured" },
    { status: 503 }
  );
}

/**
 * Returns a 401 response for unauthorized requests.
 */
export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { error: "Unauthorized — provide a valid admin API key" },
    { status: 401 }
  );
}
