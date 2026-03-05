"use client";

import { useEffect, useState, useCallback } from "react";

type ClubLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: string;
  timestamp: string;
  completedSignup: boolean;
};

const PAGE_SIZE = 20;

const SOURCE_LABELS: Record<string, string> = {
  "wine-club-page": "Wine Club Page",
  tasting_room: "Tasting Room",
  qr: "QR Code",
  footer: "Footer",
  popup: "Popup",
  event: "Event",
};

function formatDate(iso: string): string {
  try {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function sourceLabel(source: string): string {
  return SOURCE_LABELS[source] || source;
}

export function LeadsTable() {
  const [leads, setLeads] = useState<ClubLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pagedLeads = leads.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm" style={{ color: "#6B6560" }}>
        Loading leads...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-sm border px-4 py-8 text-center text-sm"
        style={{
          borderColor: "rgba(139, 0, 0, 0.2)",
          backgroundColor: "rgba(139, 0, 0, 0.04)",
          color: "#8B0000",
        }}
      >
        Error: {error}
        <button
          onClick={fetchLeads}
          className="mt-2 block mx-auto text-xs underline"
          style={{ color: "#26321B" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="py-12 text-center text-sm" style={{ color: "#6B6560" }}>
        No leads captured yet. Leads will appear here once visitors submit the
        Wine Club form.
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className="border-b text-[11px] uppercase tracking-widest"
              style={{
                borderColor: "rgba(215, 164, 94, 0.15)",
                color: "#6B6560",
              }}
            >
              <th className="py-3 pr-4 font-medium">Name</th>
              <th className="py-3 pr-4 font-medium">Email</th>
              <th className="hidden py-3 pr-4 font-medium sm:table-cell">
                Source
              </th>
              <th className="hidden py-3 pr-4 font-medium md:table-cell">
                Date
              </th>
              <th className="py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pagedLeads.map((lead, i) => (
              <tr
                key={`${lead.email}-${i}`}
                className="border-b transition-colors hover:bg-black/[0.02]"
                style={{ borderColor: "rgba(215, 164, 94, 0.08)" }}
              >
                <td
                  className="py-3 pr-4 font-medium"
                  style={{ color: "#26321B" }}
                >
                  {lead.firstName} {lead.lastName}
                </td>
                <td className="py-3 pr-4" style={{ color: "#6B6560" }}>
                  <a
                    href={`mailto:${lead.email}`}
                    className="underline decoration-transparent transition-colors hover:decoration-current"
                  >
                    {lead.email}
                  </a>
                </td>
                <td
                  className="hidden py-3 pr-4 sm:table-cell"
                  style={{ color: "#6B6560" }}
                >
                  <span
                    className="inline-block rounded-sm px-2 py-0.5 text-[11px]"
                    style={{
                      backgroundColor: "rgba(58, 77, 44, 0.08)",
                      color: "#3A4D2C",
                    }}
                  >
                    {sourceLabel(lead.source)}
                  </span>
                </td>
                <td
                  className="hidden py-3 pr-4 text-xs md:table-cell"
                  style={{ color: "#9A9490" }}
                >
                  {formatDate(lead.timestamp)}
                </td>
                <td className="py-3">
                  {lead.completedSignup ? (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: "rgba(58, 77, 44, 0.12)",
                        color: "#26321B",
                      }}
                    >
                      Signed up
                    </span>
                  ) : (
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: "rgba(215, 164, 94, 0.12)",
                        color: "#B8883A",
                      }}
                    >
                      Lead
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs">
          <span style={{ color: "#6B6560" }}>
            Showing {page * PAGE_SIZE + 1}–
            {Math.min((page + 1) * PAGE_SIZE, total)} of {total}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-sm border px-3 py-1.5 transition-colors disabled:opacity-30"
              style={{
                borderColor: "rgba(215, 164, 94, 0.2)",
                color: "#26321B",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-sm border px-3 py-1.5 transition-colors disabled:opacity-30"
              style={{
                borderColor: "rgba(215, 164, 94, 0.2)",
                color: "#26321B",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
