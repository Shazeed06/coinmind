export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="text-[1.4rem] font-700 tracking-tight lowercase leading-none">
        <span className="text-brand">coin</span>
        <span className="text-accent">mind</span>
      </span>
    </span>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <circle cx="20" cy="20" r="15" fill="none" stroke="#2F5BEA" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="72 22.2" transform="rotate(-4 20 20)" />
      <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="#16A34A" />
      <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="#16A34A" />
      <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="#16A34A" />
      <circle cx="25.7" cy="8.6" r="2.7" fill="#16A34A" />
    </svg>
  );
}
