type ProseProps = { children: React.ReactNode; className?: string };

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div className={`prose-container [&_h2]:h2 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:h3 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:body [&_p]:mb-4 [&_p]:max-w-[680px] [&_ul]:body [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:body [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 ${className}`}>
      {children}
    </div>
  );
}
