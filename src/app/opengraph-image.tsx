import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colours mirror the design tokens in globals.css (CSS variables are not available here).
const navy = "#0b1220";
const line = "#22304a";
const fg = "#f5f3ee";
const muted = "#a3acbd";
const lime = "#b5e655";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: navy,
          color: fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              border: `2px solid ${lime}`,
              borderRadius: 8,
              padding: "6px 12px",
              color: lime,
              fontSize: 28,
              letterSpacing: 3,
            }}
          >
            {site.monogram}
          </div>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 2, color: muted }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 30, color: lime }}>{site.role}</div>
          <div style={{ display: "flex", fontSize: 60, lineHeight: 1.1, maxWidth: 1000 }}>
            {site.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `2px solid ${line}`,
            paddingTop: 24,
            fontSize: 24,
            color: muted,
          }}
        >
          {site.availability}
        </div>
      </div>
    ),
    size,
  );
}
