import type { Post } from "@/lib/data";

// "Key Takeaways" for an article. A post can set `keyTakeaways` explicitly;
// otherwise we derive 2-4 concise points so every article shows the callout
// consistently, without hand-writing them for all ~159 posts. Source order:
// explicit → FAQ answers → the first bullet list in the body.

function firstSentence(text: string, max = 170): string {
  const t = text.trim().replace(/\s+/g, " ").replace(/\*\*/g, "");
  const m = t.match(/^(.+?[.!?])(\s|$)/);
  let s = m ? m[1] : t;
  if (s.length > max) s = s.slice(0, max - 1).trimEnd() + "…";
  return s.trim();
}

export function getKeyTakeaways(post: Post): string[] {
  if (post.keyTakeaways?.length) return post.keyTakeaways;

  // From FAQ answers — usually the most self-contained, concrete statements.
  if (post.faq?.length) {
    const items = post.faq
      .slice(0, 4)
      .map((f) => firstSentence(f.a))
      .filter((s) => s.length > 20);
    if (items.length >= 2) return items;
  }

  // From the first bullet list in the body.
  if (post.bodyMarkdown) {
    for (const block of post.bodyMarkdown.split(/\n\s*\n/)) {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length >= 2 && lines.every((l) => /^[-*]\s+/.test(l))) {
        const items = lines
          .slice(0, 4)
          .map((l) => firstSentence(l.replace(/^[-*]\s+/, "")))
          .filter((s) => s.length > 15);
        if (items.length >= 2) return items;
      }
    }
  }

  return [];
}
