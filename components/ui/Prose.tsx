type ProseProps = { children: React.ReactNode; className?: string };

export function Prose({ children, className = "" }: ProseProps) {
  return (
    // Ordered lists previously inherited nothing, so a numbered list in prose
    // lost its markers and its indent while bullet lists kept both. Links get a
    // lighter underline that solidifies on hover, matching ArticleMarkdown.
    <div className={`prose-container [&_h2]:h2 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:h3 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:body [&_p]:mb-4 [&_p]:max-w-[680px] [&_ul]:body [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:body [&_ol]:space-y-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:body [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-brand/40 hover:[&_a]:decoration-brand [&_a]:transition-colors ${className}`}>
      {children}
    </div>
  );
}
