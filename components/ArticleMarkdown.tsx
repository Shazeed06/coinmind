import Link from "next/link";
import { ReactNode } from "react";

// Minimal, dependency-free markdown renderer for article bodies.
// Supports: ## / ### headings, paragraphs (blank-line separated), bullet and
// numbered lists, GitHub-style pipe tables, **bold**, and [anchor](/path) links.
// Deliberately small. Article content is trusted (authored by us / our
// workflow), not arbitrary user input.

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
          <Link key={key++} href={href} className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-colors">
            {m[4]}
          </Link>
        ) : (
          <a key={key++} href={href} className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-colors" target="_blank" rel="noopener noreferrer">
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

function splitRow(line: string): string[] {
  return line
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((c) => c.trim());
}

const isDivider = (line: string) => /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes("-");

export default function ArticleMarkdown({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return <h3 key={i}>{renderInline(trimmed.slice(4).trim())}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={i}>{renderInline(trimmed.slice(3).trim())}</h2>;
        }

        const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

        // Pipe table: header row, divider row, then body rows.
        if (lines.length >= 2 && lines[0].includes("|") && isDivider(lines[1])) {
          const head = splitRow(lines[0]);
          const rows = lines.slice(2).map(splitRow);
          return (
            <div key={i} className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {head.map((c, j) => (
                      <th key={j}>{renderInline(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((c, k) => (
                        <td key={k}>{renderInline(c)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Bullet list: every line starts with "- " or "* ".
        if (lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        // Numbered list: every line starts with "1. ", "2. " etc.
        if (lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\d+\.\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        // Collapse internal single newlines into spaces within a paragraph.
        return <p key={i}>{renderInline(trimmed.replace(/\n/g, " "))}</p>;
      })}
    </>
  );
}
