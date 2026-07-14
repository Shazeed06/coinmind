import { site } from "@/lib/site";

// Simple, hand-built mark: a rising ledger bar inside a rounded square.
// Reads as "finance + growth" without looking like clip-art.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="34" height="34" rx="9" fill="var(--color-forest)" />
        <rect x="8.5" y="18" width="3.4" height="7.5" rx="1.2" fill="#fff" opacity="0.55" />
        <rect x="15.3" y="13.5" width="3.4" height="12" rx="1.2" fill="#fff" opacity="0.8" />
        <rect x="22.1" y="8.5" width="3.4" height="17" rx="1.2" fill="#fff" />
        <circle cx="23.8" cy="8.8" r="2.4" fill="var(--color-brass)" stroke="#fff" strokeWidth="1.4" />
      </svg>
      <span className="font-display text-[1.35rem] font-600 tracking-tight text-ink">
        {site.name}
      </span>
    </span>
  );
}
