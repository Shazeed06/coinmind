type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subline?: string;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, subline, dark }: SectionHeaderProps) {
  return (
    // 40 / 56 / 64px. The last step used to jump to 96px, which left a section
    // header floating clear of the content it introduces on desktop while the
    // same header sat close to it on a tablet.
    <header className="text-center max-w-[640px] mx-auto mb-10 sm:mb-14 lg:mb-16">
      <p className={`eyebrow ${dark ? "text-white/60" : "text-brand"}`}>{eyebrow}</p>
      <h2 className={`h2 mt-3 px-2 sm:px-0 ${dark ? "text-white" : "text-text"}`}>{title}</h2>
      {subline && (
        <p className={`body mt-4 px-2 sm:px-0 max-w-[640px] mx-auto ${dark ? "text-white/60" : "text-text-muted"}`}>{subline}</p>
      )}
    </header>
  );
}
