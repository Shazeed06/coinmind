import { ImageResponse } from "next/og";
import { posts } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = "CoinMind guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const title = post?.title ?? site.tagline;
  const category = post?.category ?? "Personal Finance";
  const tag = post ? `${category} · ${post.readMinutes} min read` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #e7effe 0%, #f5f6fb 50%, #e6f6ec 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#2563eb" strokeWidth="4.6" strokeLinecap="round" strokeDasharray="72 22.2" transform="rotate(-4 20 20)" />
            <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="#16a34a" />
            <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="#16a34a" />
            <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="#16a34a" />
            <circle cx="25.7" cy="8.6" r="2.7" fill="#16a34a" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#2563eb" }}>coinmind.in</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#0f1424",
              lineHeight: 1.12,
              letterSpacing: -0.5,
            }}
          >
            {title}
          </div>
          {tag && (
            <div style={{ fontSize: 28, color: "#3f4661", fontWeight: 500 }}>
              {tag}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ height: 8, width: 64, background: "#2563eb", borderRadius: 999 }} />
          <div style={{ height: 8, width: 32, background: "#16a34a", borderRadius: 999 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
