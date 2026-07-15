import Link from "next/link";
import { ReactNode } from "react";

// Minimal, dependency-free markdown renderer for blog article bodies.
// Supports: ## H2 headings, paragraphs (blank-line separated), **bold**,
// and [anchor](/path) links. Deliberately small — article content is trusted
// (authored by us / our workflow), not arbitrary user input.

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold** or [text](url), in order of appearance.
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={key++}>{m[2]}</strong>);
    } else if (m[4] !== undefined && m[5] !== undefined) {
      const href = m[5];
      const internal = href.startsWith("/");
      nodes.push(
        internal ? (
          <Link key={key++} href={href} className="text-forest underline underline-offset-2">
            {m[4]}
          </Link>
        ) : (
          <a key={key++} href={href} className="text-forest underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            {m[4]}
          </a>
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ArticleMarkdown({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return <h2 key={i}>{renderInline(trimmed.slice(3).trim())}</h2>;
        }
        // Collapse internal single newlines into spaces within a paragraph.
        return <p key={i}>{renderInline(trimmed.replace(/\n/g, " "))}</p>;
      })}
    </>
  );
}
