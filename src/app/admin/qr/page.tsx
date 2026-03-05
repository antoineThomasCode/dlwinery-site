"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

/* ─────────────────────────────────────────────
   QR Code configurations
   ───────────────────────────────────────────── */

const BASE_URL = "https://dlwinery.com";

const QR_CONFIGS = [
  {
    id: "table-tent",
    label: "Table Tent (Tasting Room)",
    description: "Primary QR for table tents — redirects via /join with tasting room UTM",
    path: "/join",
    filename: "qr-table-tent",
  },
  {
    id: "receipt-insert",
    label: "Receipt / Business Card Insert",
    description: "For business cards or receipt inserts handed at checkout",
    path: "/wine-club?utm_source=tasting_room&utm_medium=card&utm_campaign=receipt_insert",
    filename: "qr-receipt-insert",
  },
  {
    id: "event-tent",
    label: "Event Tent Card",
    description: "For special events, festivals, and off-site tastings",
    path: "/wine-club?utm_source=event&utm_medium=qr&utm_campaign=event_tent",
    filename: "qr-event-tent",
  },
] as const;

const QR_OPTIONS: QRCode.QRCodeToDataURLOptions = {
  width: 400,
  margin: 2,
  color: {
    dark: "#26321B",
    light: "#FFFFFF",
  },
  errorCorrectionLevel: "H",
};

/* ─────────────────────────────────────────────
   Single QR Card component
   ───────────────────────────────────────────── */

function QRCard({
  config,
}: {
  config: (typeof QR_CONFIGS)[number];
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const svgRef = useRef<string | null>(null);
  const fullUrl = `${BASE_URL}${config.path}`;

  useEffect(() => {
    // Generate PNG data URL for preview
    QRCode.toDataURL(fullUrl, QR_OPTIONS).then(setDataUrl);

    // Generate SVG string for download
    QRCode.toString(fullUrl, {
      type: "svg",
      width: 400,
      margin: 2,
      color: {
        dark: "#26321B",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    }).then((svg) => {
      svgRef.current = svg;
    });
  }, [fullUrl]);

  const downloadSvg = () => {
    if (!svgRef.current) return;

    // Wrap the QR SVG with branding text below
    const branded = buildBrandedSvg(svgRef.current);
    const blob = new Blob([branded], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: 8,
        padding: 24,
        maxWidth: 460,
        background: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          margin: "0 0 4px",
          color: "#26321B",
        }}
      >
        {config.label}
      </h2>
      <p style={{ fontSize: 13, color: "#666", margin: "0 0 16px" }}>
        {config.description}
      </p>

      {/* Preview */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR code for ${config.label}`}
            width={240}
            height={240}
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div
            style={{
              width: 240,
              height: 240,
              background: "#f3f4f6",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: 14,
            }}
          >
            Generating...
          </div>
        )}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 15,
            fontWeight: 600,
            color: "#26321B",
            letterSpacing: "0.02em",
          }}
        >
          Domaine LeSeurre
        </span>
      </div>

      {/* URL info */}
      <p
        style={{
          fontSize: 12,
          color: "#999",
          margin: "12px 0 0",
          wordBreak: "break-all",
          fontFamily: "monospace",
        }}
      >
        {fullUrl}
      </p>

      {/* Download button */}
      <button
        onClick={downloadSvg}
        style={{
          marginTop: 12,
          padding: "8px 20px",
          background: "#26321B",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Download SVG
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Build a branded SVG wrapper with the QR code
   + "Domaine LeSeurre" text underneath
   ───────────────────────────────────────────── */

function buildBrandedSvg(rawSvg: string): string {
  // The qrcode lib outputs an SVG with a viewBox of "0 0 W H".
  // We extract the inner content and wrap it in a taller SVG to add text.
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
  const qrSize = viewBoxMatch
    ? parseInt(viewBoxMatch[1].split(" ")[2], 10)
    : 400;

  // Remove the outer <svg> tag to get inner content
  const innerContent = rawSvg
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "");

  const textHeight = 40;
  const totalHeight = qrSize + textHeight;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qrSize} ${totalHeight}" width="${qrSize}" height="${totalHeight}">
  <rect width="${qrSize}" height="${totalHeight}" fill="#FFFFFF"/>
  <g>${innerContent}</g>
  <text
    x="${qrSize / 2}"
    y="${qrSize + 28}"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="18"
    font-weight="600"
    fill="#26321B"
    letter-spacing="0.04em"
  >Domaine LeSeurre</text>
</svg>`;
}

/* ─────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────── */

export default function AdminQRPage() {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "40px 24px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#26321B",
          margin: "0 0 8px",
        }}
      >
        QR Codes — Domaine LeSeurre
      </h1>
      <p style={{ fontSize: 15, color: "#666", margin: "0 0 32px" }}>
        Generate and download branded QR codes for tasting room materials.
        Each code includes UTM tracking for analytics.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: 24,
        }}
      >
        {QR_CONFIGS.map((config) => (
          <QRCard key={config.id} config={config} />
        ))}
      </div>
    </div>
  );
}
