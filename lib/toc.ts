// Builds the "On this page" list from a markdown body. The slug rule mirrors
// components/ArticleMarkdown.tsx so each TOC anchor matches the heading id it
// renders. Only H2 (## ) sections are listed, to keep the rail short.

export type TocItem = { id: string; label: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tocFromMarkdown(markdown?: string): TocItem[] {
  if (!markdown) return [];
  const items: TocItem[] = [];
  const seen = new Set<string>();
  for (const line of markdown.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line.trim());
    if (!m || line.trim().startsWith("### ")) continue;
    const label = m[1].replace(/\*\*/g, "").trim();
    const id = slugify(label);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    items.push({ id, label });
  }
  return items;
}
