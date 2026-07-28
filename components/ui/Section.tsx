type SectionProps = {
  children: React.ReactNode;
  /** white (default), alt (#F7F9FC), dark (gradient invert) */
  variant?: "white" | "alt" | "dark";
};

const bg: Record<string, string> = {
  white: "bg-white",
  alt: "bg-[#F7F9FC]",
  dark: "bg-gradient-invert text-white",
};

export function Section({ children, variant = "white" }: SectionProps) {
  return (
    <section className={`section-pad ${bg[variant]}`}>
      <div className="container-main">{children}</div>
    </section>
  );
}
