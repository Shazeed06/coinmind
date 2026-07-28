type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subline?: string;
  /** For dark variants, text colors invert */
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, subline, dark }: SectionHeaderProps) {
  return (
    <header className="text-center max-w-[640px] mx-auto mb-24">
      <p className={`eyebrow ${dark ? "text-white/60" : "text-[#2F5BEA]"}`}>{eyebrow}</p>
      <h2 className={`h2 mt-3 ${dark ? "text-white" : "text-[#0F172A]"}`}>{title}</h2>
      {subline && (
        <p className={`body mt-4 max-w-[640px] mx-auto ${dark ? "text-white/60" : "text-[#64748B]"}`}>{subline}</p>
      )}
    </header>
  );
}
