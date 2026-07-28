import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0b1e33 0%, #153e6b 40%, #166534 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#10b981">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
          <span style={{ fontSize: 28, color: "#94a3b8", fontWeight: 600 }}>CoinMind.in</span>
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.15,
            margin: 0,
            maxWidth: 800,
          }}
        >
          Smarter money decisions, powered by AI
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 20,
            maxWidth: 700,
          }}
        >
          46 free calculators · 44 free tools · AI tool reviews
        </p>
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 32,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          <span>⚡ SIP • EMI • Tax • FD • PPF • NPS</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
