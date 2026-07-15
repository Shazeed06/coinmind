import { ImageResponse } from "next/og";

// PNG favicon generated at build time — reliably rendered by every browser and
// crawler (SVG favicons + a missing /favicon.ico were showing the generic globe).
// Simplified CoinMind mark: brand-blue rounded square with green "growth" bars.
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 4,
          background: "#2563eb",
          borderRadius: 11,
          paddingBottom: 13,
        }}
      >
        <div style={{ width: 6, height: 12, background: "#86efac", borderRadius: 3 }} />
        <div style={{ width: 6, height: 19, background: "#4ade80", borderRadius: 3 }} />
        <div style={{ width: 6, height: 27, background: "#22c55e", borderRadius: 3 }} />
      </div>
    ),
    { ...size }
  );
}
