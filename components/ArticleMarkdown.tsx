import Link from "next/link";
import { ReactNode } from "react";

// Minimal, dependency-free markdown renderer for article bodies.
// Supports: ## / ### headings with anchor IDs, paragraphs, bullet and numbered lists,
// blockquotes, GitHub-style pipe tables, bold, and links.

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
          <Link
            key={key++}
            href={href}
            className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-colors font-medium"
          >
            {m[4]}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            className="text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
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

const isDivider = (line: string) =>
  /^\s*\|?[\s:-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes("-");

export default function ArticleMarkdown({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        // Subheading H3
        if (trimmed.startsWith("### ")) {
          const headingText = trimmed.slice(4).trim();
          const id = slugify(headingText);
          return (
            <h3 key={i} id={id} className="scroll-mt-24">
              {renderInline(headingText)}
            </h3>
          );
        }

        // Section Heading H2
        if (trimmed.startsWith("## ")) {
          const headingText = trimmed.slice(3).trim();
          const id = slugify(headingText);
          return (
            <h2 key={i} id={id} className="scroll-mt-24">
              {renderInline(headingText)}
            </h2>
          );
        }

        // Blockquotes
        if (trimmed.startsWith("> ")) {
          const quoteText = trimmed
            .split("\n")
            .map((l) => l.replace(/^>\s*/, ""))
            .join(" ");
          return (
            <blockquote
              key={i}
              className="my-6 border-l-4 border-forest bg-forest-soft/40 px-5 py-4 rounded-r-xl text-ink-soft italic leading-relaxed text-[17px]"
            >
              {renderInline(quoteText)}
            </blockquote>
          );
        }

        const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);

        // Pipe table: header row, divider row, then body rows.
        if (lines.length >= 2 && lines[0].includes("|") && isDivider(lines[1])) {
          const head = splitRow(lines[0]);
          const rows = lines.slice(2).map(splitRow);
          return (
            <div key={i} className="my-8 overflow-x-auto rounded-xl border border-line bg-card shadow-2xs">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line bg-paper-2 font-semibold text-ink">
                  <tr>
                    {head.map((c, j) => (
                      <th key={j} className="p-3.5">
                        {renderInline(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  {rows.map((r, j) => (
                    <tr key={j} className="hover:bg-paper-2/40 transition-colors">
                      {r.map((c, k) => (
                        <td key={k} className="p-3.5">
                          {renderInline(c)}
                        </td>
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
            <ul key={i} className="my-5 pl-6 list-disc space-y-2.5 text-text/90">
              {lines.map((l, j) => (
                <li key={j} className="text-[17px] leading-[1.7]">
                  {renderInline(l.replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Numbered list: every line starts with "1. ", "2. " etc.
        if (lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={i} className="my-5 pl-6 list-decimal space-y-2.5 text-text/90">
              {lines.map((l, j) => (
                <li key={j} className="text-[17px] leading-[1.7]">
                  {renderInline(l.replace(/^\d+\.\s+/, ""))}
                </li>
              ))}
            </ol>
          );
        }

        // Standard paragraph
        return (
          <p key={i} className="text-[17px] leading-[1.78] mb-5 text-text/90">
            {renderInline(trimmed.replace(/\n/g, " "))}
          </p>
        );
      })}
    </>
  );
}
