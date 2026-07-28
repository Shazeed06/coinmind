type PillProps = {
  children: React.ReactNode;
  variant?: "brand" | "muted" | "accent";
};

const variants = {
  brand: "bg-brand/10 text-brand",
  muted: "bg-bg-alt text-text-muted",
  accent: "bg-accent/10 text-accent",
};

export function Pill({ children, variant = "brand" }: PillProps) {
  return (
    <span className={`eyebrow inline-flex items-center rounded-pill px-3 py-1 ${variants[variant]}`}>
      {children}
    </span>
  );
}
