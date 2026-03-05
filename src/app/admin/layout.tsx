import type { Metadata } from "next";
import Link from "next/link";
import { AuthGate } from "./_components/auth-gate";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFCF7" }}>
      {/* Admin header bar */}
      <header
        className="border-b px-4 py-3 sm:px-6"
        style={{
          backgroundColor: "#26321B",
          borderColor: "rgba(215, 164, 94, 0.2)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <h1
              className="text-lg font-normal tracking-wide sm:text-xl"
              style={{
                fontFamily: "var(--font-heading, 'Diaspora', sans-serif)",
                color: "#FEFCF7",
              }}
            >
              DL Winery Admin
            </h1>
            <span
              className="rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest"
              style={{
                backgroundColor: "rgba(215, 164, 94, 0.15)",
                color: "#D7A45E",
              }}
            >
              MVP
            </span>
          </div>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest transition-colors hover:opacity-80"
            style={{ color: "#D7A45E" }}
          >
            &larr; Back to site
          </Link>
        </div>
      </header>

      {/* Admin content — protected by auth gate */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <AuthGate>{children}</AuthGate>
      </main>
    </div>
  );
}
