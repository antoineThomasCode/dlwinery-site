"use client";

import { useEffect, useState, useCallback } from "react";

type LeadStats = {
  total: number;
  thisMonth: number;
  lastMonth: number;
  bySources: Record<string, number>;
};

const SOURCE_LABELS: Record<string, string> = {
  "wine-club-page": "Wine Club Page",
  tasting_room: "Tasting Room",
  qr: "QR Code",
  footer: "Footer",
  popup: "Popup",
  event: "Event",
};

function computeStats(
  leads: Array<{
    source: string;
    timestamp: string;
  }>
): LeadStats {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  let thisMonth = 0;
  let lastMonth = 0;
  const bySources: Record<string, number> = {};

  for (const lead of leads) {
    const date = new Date(lead.timestamp);
    if (date >= thisMonthStart) thisMonth++;
    if (date >= lastMonthStart && date <= lastMonthEnd) lastMonth++;

    const src = lead.source || "unknown";
    bySources[src] = (bySources[src] || 0) + 1;
  }

  return { total: leads.length, thisMonth, lastMonth, bySources };
}

export function KpiCards() {
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStats(computeStats(data.leads || []));
    } catch {
      setStats({ total: 0, thisMonth: 0, lastMonth: 0, bySources: {} });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-sm"
            style={{ backgroundColor: "rgba(237, 232, 219, 0.5)" }}
          />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const trend =
    stats.lastMonth > 0
      ? Math.round(
          ((stats.thisMonth - stats.lastMonth) / stats.lastMonth) * 100
        )
      : stats.thisMonth > 0
        ? 100
        : 0;

  const topSources = Object.entries(stats.bySources)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Total leads */}
      <KpiCard label="Total Club Leads" value={String(stats.total)} />

      {/* This month */}
      <KpiCard
        label="Leads This Month"
        value={String(stats.thisMonth)}
        subtext={
          trend !== 0
            ? `${trend > 0 ? "+" : ""}${trend}% vs last month`
            : stats.lastMonth === 0 && stats.thisMonth === 0
              ? "No data yet"
              : "Same as last month"
        }
        subtextColor={trend > 0 ? "#3A4D2C" : trend < 0 ? "#8B0000" : undefined}
      />

      {/* Last month */}
      <KpiCard label="Leads Last Month" value={String(stats.lastMonth)} />

      {/* Top source */}
      <div
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
          Sources Breakdown
        </p>
        {topSources.length > 0 ? (
          <div className="mt-2 space-y-1.5">
            {topSources.map(([source, count]) => (
              <div
                key={source}
                className="flex items-center justify-between text-xs"
              >
                <span style={{ color: "#6B6560" }}>
                  {SOURCE_LABELS[source] || source}
                </span>
                <span
                  className="font-medium tabular-nums"
                  style={{ color: "#26321B" }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-2xl font-light" style={{ color: "#26321B" }}>
            --
          </p>
        )}
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  subtext,
  subtextColor,
}: {
  label: string;
  value: string;
  subtext?: string;
  subtextColor?: string;
}) {
  return (
    <div
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
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-light tabular-nums"
        style={{
          color: "#26321B",
          fontFamily: "var(--font-heading, 'Diaspora', sans-serif)",
        }}
      >
        {value}
      </p>
      {subtext && (
        <p
          className="mt-1 text-xs"
          style={{ color: subtextColor || "#9A9490" }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
