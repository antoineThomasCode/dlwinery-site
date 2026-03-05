"use client";

import { useState, useEffect, type ReactNode, type FormEvent } from "react";

const STORAGE_KEY = "admin_token";

/**
 * Reads the admin token from localStorage (client-side only).
 */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Gate component that protects admin content behind a simple API key form.
 * Stores the key in localStorage so the user doesn't need to re-enter it
 * on every page load.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setToken(getAdminToken());
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div
        className="flex min-h-[50vh] items-center justify-center text-sm"
        style={{ color: "#6B6560" }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!token) {
    return <LoginForm onAuthenticated={setToken} />;
  }

  return <>{children}</>;
}

function LoginForm({
  onAuthenticated,
}: {
  onAuthenticated: (token: string) => void;
}) {
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = key.trim();
    if (!trimmed) {
      setError("Please enter an admin key");
      return;
    }

    setLoading(true);

    // Validate the key by making a test request to the admin API
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${trimmed}` },
      });

      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, trimmed);
        onAuthenticated(trimmed);
      } else if (res.status === 401) {
        setError("Invalid admin key");
      } else if (res.status === 503) {
        setError("Admin authentication is not configured on the server");
      } else {
        setError(`Unexpected error (${res.status})`);
      }
    } catch {
      setError("Network error — could not verify key");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-sm border p-8"
        style={{
          borderColor: "rgba(215, 164, 94, 0.15)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <h2
          className="text-center text-lg tracking-wide"
          style={{
            fontFamily: "var(--font-heading, 'Diaspora', sans-serif)",
            color: "#26321B",
          }}
        >
          Admin Access
        </h2>
        <p
          className="mt-2 text-center text-xs"
          style={{ color: "#9A9490" }}
        >
          Enter your admin key to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-key"
              className="block text-[11px] uppercase tracking-widest"
              style={{ color: "#6B6560" }}
            >
              Admin Key
            </label>
            <input
              id="admin-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key..."
              autoFocus
              disabled={loading}
              className="mt-1.5 w-full rounded-sm border px-3 py-2 text-sm outline-none transition-colors focus:ring-1"
              style={{
                borderColor: error
                  ? "rgba(139, 0, 0, 0.4)"
                  : "rgba(215, 164, 94, 0.2)",
                color: "#26321B",
                backgroundColor: "#FEFCF7",
              }}
            />
          </div>

          {error && (
            <p className="text-xs" style={{ color: "#8B0000" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm px-4 py-2.5 text-xs font-medium uppercase tracking-widest transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: "#26321B",
              color: "#FEFCF7",
            }}
          >
            {loading ? "Verifying..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
