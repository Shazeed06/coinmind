// Original, on-brand SVG "cover images" for articles and news.
// No external assets: always loads, no licensing/broken-image risk, fast,
// and editorial rather than generic stock. Deterministic ids (from `seed`)
// keep server/client render identical — no hydration mismatch.

export type CoverVariant =
  | "chart"
  | "coins"
  | "card"
  | "spark"
  | "nodes"
  | "candles";

export type CoverPalette = "forest" | "brass" | "berry" | "deep";

const palettes: Record<
  CoverPalette,
  { bg1: string; bg2: string; ink: string; accent: string; soft: string }
> = {
  forest: { bg1: "#e7f0eb", bg2: "#f3efe6", ink: "#0d5c43", accent: "#b07d2b", soft: "#ffffff" },
  brass: { bg1: "#f5ecd9", bg2: "#faf8f3", ink: "#b07d2b", accent: "#0d5c43", soft: "#ffffff" },
  berry: { bg1: "#f6e7ec", bg2: "#faf8f3", ink: "#a4325a", accent: "#b07d2b", soft: "#ffffff" },
  deep: { bg1: "#0d5c43", bg2: "#093f2f", ink: "#ffffff", accent: "#e6b64c", soft: "#7fb8a3" },
};

export default function CoverArt({
  seed,
  variant,
  palette = "forest",
  className = "",
  label,
}: {
  seed: string;
  variant: CoverVariant;
  palette?: CoverPalette;
  className?: string;
  label?: string;
}) {
  const p = palettes[palette];
  const uid = `${variant}-${seed}`.replace(/[^a-z0-9-]/gi, "");
  const gid = `g-${uid}`;
  const pid = `p-${uid}`;

  return (
    <svg
      viewBox="0 0 400 250"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `${label} illustration` : "Article illustration"}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg1} />
          <stop offset="1" stopColor={p.bg2} />
        </linearGradient>
        <pattern id={pid} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={p.ink} opacity="0.08" />
        </pattern>
      </defs>

      <rect width="400" height="250" fill={`url(#${gid})`} />
      <rect width="400" height="250" fill={`url(#${pid})`} />

      <Motif variant={variant} p={p} />

      {label && (
        <text
          x="24"
          y="228"
          fontSize="13"
          fontWeight="600"
          fontFamily="var(--font-inter), sans-serif"
          fill={p.ink}
          opacity="0.65"
          letterSpacing="0.06em"
        >
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

function Motif({
  variant,
  p,
}: {
  variant: CoverVariant;
  p: { ink: string; accent: string; soft: string };
}) {
  switch (variant) {
    case "chart":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => {
            const h = 30 + i * 26;
            return (
              <rect
                key={i}
                x={92 + i * 46}
                y={190 - h}
                width="30"
                height={h}
                rx="5"
                fill={p.ink}
                opacity={0.15 + i * 0.16}
              />
            );
          })}
          <polyline
            points="107,150 153,128 199,132 245,96 291,70"
            fill="none"
            stroke={p.accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="291" cy="70" r="7" fill={p.accent} stroke={p.soft} strokeWidth="3" />
        </g>
      );

    case "coins":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${-i * 22})`}>
              <ellipse cx="200" cy="168" rx="58" ry="20" fill={p.ink} opacity={0.2 + i * 0.12} />
              <ellipse cx="200" cy="162" rx="58" ry="20" fill={p.ink} opacity={0.28 + i * 0.16} />
            </g>
          ))}
          <circle cx="200" cy="96" r="30" fill={p.accent} />
          <text
            x="200"
            y="107"
            textAnchor="middle"
            fontSize="34"
            fontWeight="700"
            fontFamily="var(--font-inter), sans-serif"
            fill={p.soft}
          >
            ₹
          </text>
        </g>
      );

    case "card":
      return (
        <g transform="translate(118 70) rotate(-6)">
          <rect width="164" height="104" rx="14" fill={p.ink} opacity="0.9" />
          <rect x="20" y="26" width="30" height="24" rx="5" fill={p.accent} />
          <rect x="20" y="66" width="120" height="7" rx="3.5" fill={p.soft} opacity="0.6" />
          <rect x="20" y="80" width="70" height="7" rx="3.5" fill={p.soft} opacity="0.4" />
          <circle cx="132" cy="34" r="12" fill={p.accent} opacity="0.9" />
          <circle cx="118" cy="34" r="12" fill={p.soft} opacity="0.45" />
        </g>
      );

    case "spark":
      return (
        <g>
          <Sparkle cx={200} cy={120} r={44} fill={p.ink} />
          <Sparkle cx={286} cy={78} r={20} fill={p.accent} />
          <Sparkle cx={118} cy={168} r={16} fill={p.accent} />
          <circle cx="200" cy="120" r="86" fill="none" stroke={p.ink} strokeWidth="1.5" opacity="0.18" />
        </g>
      );

    case "nodes":
      return (
        <g>
          <g stroke={p.ink} strokeWidth="2" opacity="0.35">
            <line x1="120" y1="80" x2="200" y2="140" />
            <line x1="200" y1="140" x2="300" y2="86" />
            <line x1="200" y1="140" x2="150" y2="196" />
            <line x1="200" y1="140" x2="272" y2="192" />
            <line x1="120" y1="80" x2="300" y2="86" />
          </g>
          {[
            [120, 80, 12],
            [300, 86, 12],
            [150, 196, 10],
            [272, 192, 10],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={p.ink} opacity="0.85" />
          ))}
          <circle cx="200" cy="140" r="18" fill={p.accent} stroke={p.soft} strokeWidth="3" />
        </g>
      );

    case "candles":
      return (
        <g>
          {[
            { x: 110, o: 150, c: 96, up: true },
            { x: 160, o: 168, c: 120, up: true },
            { x: 210, o: 120, c: 158, up: false },
            { x: 260, o: 132, c: 78, up: true },
            { x: 310, o: 100, c: 60, up: true },
          ].map((k, i) => {
            const top = Math.min(k.o, k.c);
            const h = Math.abs(k.o - k.c);
            const color = k.up ? p.ink : p.accent;
            return (
              <g key={i}>
                <line x1={k.x} y1={top - 18} x2={k.x} y2={top + h + 18} stroke={color} strokeWidth="2.5" opacity="0.7" />
                <rect x={k.x - 11} y={top} width="22" height={Math.max(h, 8)} rx="4" fill={color} opacity="0.85" />
              </g>
            );
          })}
        </g>
      );
  }
}

function Sparkle({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const d = `M ${cx} ${cy - r}
    C ${cx + r * 0.18} ${cy - r * 0.18}, ${cx + r * 0.18} ${cy - r * 0.18}, ${cx + r} ${cy}
    C ${cx + r * 0.18} ${cy + r * 0.18}, ${cx + r * 0.18} ${cy + r * 0.18}, ${cx} ${cy + r}
    C ${cx - r * 0.18} ${cy + r * 0.18}, ${cx - r * 0.18} ${cy + r * 0.18}, ${cx - r} ${cy}
    C ${cx - r * 0.18} ${cy - r * 0.18}, ${cx - r * 0.18} ${cy - r * 0.18}, ${cx} ${cy - r} Z`;
  return <path d={d} fill={fill} />;
}
