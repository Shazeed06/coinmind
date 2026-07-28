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
  | "candles"
  | "piggy"
  | "plant"
  | "shield"
  | "graph-up";

export type CoverPalette = "forest" | "brass" | "berry" | "deep";

const palettes: Record<
  CoverPalette,
  { bg1: string; bg2: string; ink: string; accent: string; soft: string }
> = {
  forest: { bg1: "#e7effe", bg2: "#f5f6fb", ink: "#2563eb", accent: "#16a34a", soft: "#ffffff" },
  brass: { bg1: "#e6f6ec", bg2: "#f5f6fb", ink: "#16a34a", accent: "#2563eb", soft: "#ffffff" },
  berry: { bg1: "#fbe8f1", bg2: "#f5f6fb", ink: "#db2777", accent: "#2563eb", soft: "#ffffff" },
  deep: { bg1: "#2563eb", bg2: "#1e40af", ink: "#ffffff", accent: "#4ade80", soft: "#93c5fd" },
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

    case "piggy":
      return (
        <g transform="translate(166 80)">
          <ellipse cx="34" cy="46" rx="34" ry="26" fill={p.ink} opacity="0.88" />
          <ellipse cx="52" cy="38" rx="20" ry="14" fill={p.ink} opacity="0.76" />
          <circle cx="48" cy="26" r="5" fill={p.soft} opacity="0.5" />
          <circle cx="62" cy="26" r="5" fill={p.soft} opacity="0.5" />
          <ellipse cx="34" cy="50" rx="12" ry="4" fill={p.ink} opacity="0.5" />
          <text x="34" y="56" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="var(--font-inter), sans-serif" fill={p.accent}>₹</text>
          <path d="M 58 38 L 74 30 L 80 34 L 66 42 Z" fill={p.accent} opacity="0.7" />
          <circle cx="54" cy="75" r="4" fill={p.ink} opacity="0.2" />
          <circle cx="60" cy="77" r="3" fill={p.ink} opacity="0.2" />
          <circle cx="8" cy="59" r="3" fill={p.ink} opacity="0.3" />
          <circle cx="12" cy="63" r="2.5" fill={p.ink} opacity="0.3" />
        </g>
      );

    case "plant":
      return (
        <g>
          <rect x="180" y="195" width="40" height="14" rx="7" fill={p.ink} opacity="0.2" />
          <path d="M 200 195 Q 200 160 176 152 Q 166 148 164 140 Q 160 126 172 116 Q 180 110 182 100 Q 186 86 200 80" fill="none" stroke={p.accent} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 200 195 Q 200 160 224 152 Q 234 148 236 140 Q 240 126 228 116 Q 220 110 218 100 Q 214 86 200 80" fill="none" stroke={p.ink} strokeWidth="4.5" strokeLinecap="round" opacity="0.7" />
          <circle cx="200" cy="74" r="10" fill={p.accent} />
          <text x="200" y="79" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="var(--font-inter), sans-serif" fill={p.soft}>↑</text>
          {[158, 186, 224, 244].map((x, i) => (
            <ellipse key={i} cx={x} cy={120 + i * 10} rx="14" ry="7" fill={p.accent} opacity={0.15 + i * 0.08} />
          ))}
        </g>
      );

    case "shield":
      return (
        <g transform="translate(140 50)">
          <path d="M 60 0 L 120 24 L 120 90 Q 120 156 60 180 Q 0 156 0 90 L 0 24 Z" fill={p.ink} opacity="0.1" />
          <path d="M 60 8 L 112 28 L 112 88 Q 112 146 60 168 Q 8 146 8 88 L 8 28 Z" fill={p.ink} opacity="0.8" />
          <path d="M 60 16 L 104 33 L 104 86 Q 104 138 60 156 Q 16 138 16 86 L 16 33 Z" fill={p.soft} opacity="0.15" />
          <text x="60" y="102" textAnchor="middle" fontSize="36" fontFamily="var(--font-inter), sans-serif" fill={p.accent}>✓</text>
          <circle cx="24" cy="128" r="6" fill={p.accent} opacity="0.3" />
          <circle cx="96" cy="128" r="6" fill={p.accent} opacity="0.3" />
          <circle cx="60" cy="172" r="4" fill={p.accent} opacity="0.2" />
        </g>
      );

    case "graph-up":
      return (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const x = 80 + i * 70;
            const h = 46 + i * 28;
            return (
              <rect key={i} x={x + 8} y={190 - h} width="54" height={h} rx="6" fill={p.ink} opacity={0.08 + i * 0.08} />
            );
          })}
          <polyline points="108,168 158,138 228,142 298,78" fill="none" stroke={p.accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="298" cy="78" r="9" fill={p.accent} stroke={p.soft} strokeWidth="3" />
          <path d="M 290 70 L 306 68 L 302 86 Z" fill={p.accent} />
          <polyline points="108,168 158,138 228,142 298,78" fill="none" stroke={p.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" transform="translate(0 6)" />
          <text x="108" y="180" fontSize="10" fontWeight="600" fontFamily="var(--font-inter), sans-serif" fill={p.ink} opacity="0.4">Q1</text>
          <text x="178" y="154" fontSize="10" fontWeight="600" fontFamily="var(--font-inter), sans-serif" fill={p.ink} opacity="0.4">Q2</text>
          <text x="248" y="156" fontSize="10" fontWeight="600" fontFamily="var(--font-inter), sans-serif" fill={p.ink} opacity="0.4">Q3</text>
          <text x="318" y="92" fontSize="10" fontWeight="600" fontFamily="var(--font-inter), sans-serif" fill={p.ink} opacity="0.4">Q4</text>
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
