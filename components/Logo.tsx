// CoinMind logo — an open blue ring (C) with green growth bars and an "i" dot,
// plus the two-tone "coinmind" wordmark. Pure SVG + text: transparent, crisp at
// any size, and it follows the theme colours (blue = primary, green = accent).
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="text-[1.4rem] font-700 tracking-tight lowercase leading-none">
        <span className="text-forest">coin</span>
        <span className="text-brass">mind</span>
      </span>
    </span>
  );
}

// The icon mark on its own (also used to generate the favicon).
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      {/* Open ring (C) */}
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeDasharray="72 22.2"
        transform="rotate(-4 20 20)"
      />
      {/* Ascending growth bars */}
      <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="var(--color-brass)" />
      <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="var(--color-brass)" />
      <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="var(--color-brass)" />
      {/* "i" dot sitting in the ring's opening */}
      <circle cx="25.7" cy="8.6" r="2.7" fill="var(--color-brass)" />
    </svg>
  );
}
