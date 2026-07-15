import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic Open Graph image shown when the site is shared on social / in search.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f6fb",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40" fill="none">
            <circle
              cx="20"
              cy="20"
              r="15"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeDasharray="72 22.2"
              transform="rotate(-4 20 20)"
            />
            <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="#16a34a" />
            <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="#16a34a" />
            <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="#16a34a" />
            <circle cx="25.7" cy="8.6" r="2.7" fill="#16a34a" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            <span style={{ color: "#2563eb" }}>coin</span>
            <span style={{ color: "#16a34a" }}>mind</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#0f1424",
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            Smarter money decisions, powered by AI.
          </div>
          <div style={{ fontSize: 30, color: "#3f4661", lineHeight: 1.4 }}>
            Free finance calculators · AI tool reviews · daily finance & AI news
          </div>
        </div>

        {/* Footer bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ height: 8, width: 64, background: "#2563eb", borderRadius: 999 }} />
          <div style={{ height: 8, width: 32, background: "#16a34a", borderRadius: 999 }} />
          <div style={{ fontSize: 26, color: "#6b7288", marginLeft: 8 }}>coinmind.in</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
