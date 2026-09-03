type PillProps = {
  children: React.ReactNode;
  variant?: "brand" | "muted" | "accent";
};

// `muted` sat on bg-bg-alt, a 3% tint that is invisible against a white card, so
// the muted pill read as loose floating text rather than a tag. It now carries a
// border, which is how a low-emphasis tag stays legible without adding colour.
const variants = {
  brand: "bg-brand/10 text-brand",
  muted: "bg-bg-alt text-text-muted border border-line",
  accent: "bg-accent/10 text-accent",
};

export function Pill({ children, variant = "brand" }: PillProps) {
  return (
    <span className={`pill eyebrow ${variants[variant]}`}>
      {children}
    </span>
  );
}
