type SectionProps = {
  children: React.ReactNode;
  /** white (default), alt (#F7F9FC), dark (gradient invert) */
  variant?: "white" | "alt" | "dark";
};

// `alt` used to hardcode #F7F9FC. Same colour, but as a literal it could not
// follow the token, so a change to --color-bg-alt would have left section
// backgrounds behind while every bg-bg-alt panel on the page moved.
const bg: Record<string, string> = {
  white: "bg-bg",
  alt: "bg-bg-alt",
  dark: "bg-gradient-invert text-white",
};

export function Section({ children, variant = "white" }: SectionProps) {
  return (
    <section className={`section-pad relative isolation-isolate ${bg[variant]}`}>
      <div className="container-main">{children}</div>
    </section>
  );
}
