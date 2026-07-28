type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subline?: string;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, subline, dark }: SectionHeaderProps) {
  return (
    <header className="text-center max-w-[640px] mx-auto mb-12 sm:mb-16 lg:mb-24">
      <p className={`eyebrow ${dark ? "text-white/60" : "text-brand"}`}>{eyebrow}</p>
      <h2 className={`h2 mt-3 ${dark ? "text-white" : "text-text"}`}>{title}</h2>
      {subline && (
        <p className={`body mt-4 max-w-[640px] mx-auto ${dark ? "text-white/60" : "text-text-muted"}`}>{subline}</p>
      )}
    </header>
  );
}
