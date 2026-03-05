import Link from "next/link";
import { KpiCards } from "./_components/kpi-cards";
import { LeadsTable } from "./_components/leads-table";

// Static business KPIs (updated manually for now — will connect to APIs later)
const BUSINESS_KPIS = [
  {
    label: "Club Members",
    value: "864",
    subtext: "39% of all customers",
  },
  {
    label: "Club Revenue (2025)",
    value: "$333K",
    subtext: "90% of Vinoshipper revenue",
  },
  {
    label: "Visitor-to-Member Conversion",
    value: "1%",
    subtext: "Benchmark: 10% (huge gap)",
  },
  {
    label: "One-Time Buyers to Reactivate",
    value: "886",
    subtext: "Potential second-purchase targets",
  },
] as const;

const QUICK_LINKS = [
  {
    label: "QR Codes",
    href: "/admin/qr",
    description: "Generate QR codes for tasting room",
    external: false,
  },
  {
    label: "Brevo Dashboard",
    href: "https://app.brevo.com",
    description: "Email marketing & CRM",
    external: true,
  },
  {
    label: "Vinoshipper Admin",
    href: "https://vinoshipper.com/admin",
    description: "Wine club & e-commerce",
    external: true,
  },
  {
    label: "Square Dashboard",
    href: "https://squareup.com/dashboard",
    description: "POS, payments & bookings",
    external: true,
  },
] as const;

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Page title */}
      <div>
        <h2
          className="text-2xl sm:text-3xl"
          style={{
            fontFamily: "var(--font-heading, 'Diaspora', sans-serif)",
            color: "#26321B",
          }}
        >
          Dashboard
        </h2>
        <p className="mt-1 text-sm" style={{ color: "#6B6560" }}>
          Wine Club lead tracking &amp; key business metrics.
        </p>
      </div>

      {/* Section 1 — KPI Cards (dynamic, from leads data) */}
      <section>
        <SectionHeader title="Lead Capture KPIs" />
        <KpiCards />
      </section>

      {/* Section 2 — Recent Leads Table */}
      <section>
        <SectionHeader title="Recent Leads" />
        <div
          className="rounded-sm border p-4 sm:p-6"
          style={{
            borderColor: "rgba(215, 164, 94, 0.12)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <LeadsTable />
        </div>
      </section>

      {/* Section 3 — Static Business Metrics */}
      <section>
        <SectionHeader
          title="Business Metrics"
          subtitle="Static data — will connect to Square & Vinoshipper APIs"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {BUSINESS_KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-sm border p-4"
              style={{
                borderColor: "rgba(215, 164, 94, 0.12)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <p
                className="text-[11px] uppercase tracking-widest"
                style={{ color: "#9A9490" }}
              >
                {kpi.label}
              </p>
              <p
                className="mt-2 text-3xl font-light tabular-nums"
                style={{
                  color: "#26321B",
                  fontFamily: "var(--font-heading, 'Diaspora', sans-serif)",
                }}
              >
                {kpi.value}
              </p>
              <p className="mt-1 text-xs" style={{ color: "#9A9490" }}>
                {kpi.subtext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Quick Actions */}
      <section>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-sm border p-4 transition-all hover:shadow-sm"
                style={{
                  borderColor: "rgba(215, 164, 94, 0.12)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#26321B" }}
                  >
                    {link.label}
                  </span>
                  <ExternalIcon />
                </div>
                <p className="mt-1 text-xs" style={{ color: "#9A9490" }}>
                  {link.description}
                </p>
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="group rounded-sm border p-4 transition-all hover:shadow-sm"
                style={{
                  borderColor: "rgba(215, 164, 94, 0.12)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "#26321B" }}
                >
                  {link.label}
                </span>
                <p className="mt-1 text-xs" style={{ color: "#9A9490" }}>
                  {link.description}
                </p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Footer note */}
      <p
        className="border-t pt-6 text-center text-[11px] uppercase tracking-widest"
        style={{ borderColor: "rgba(215, 164, 94, 0.1)", color: "#9A9490" }}
      >
        MVP Dashboard &mdash; Lead data from local JSON backup. Source of truth
        is Brevo.
      </p>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h3
        className="text-sm font-medium uppercase tracking-widest"
        style={{ color: "#26321B" }}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="mt-0.5 text-xs" style={{ color: "#9A9490" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 opacity-30 transition-opacity group-hover:opacity-60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      style={{ color: "#26321B" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
