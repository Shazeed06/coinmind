"use client";

import { useState } from "react";
import { Link2, Bookmark, Check } from "lucide-react";

// Copy-link + bookmark row shown in the article byline. Social share buttons
// were removed because the site has no social accounts. Copy uses the Clipboard
// API with a graceful failure; bookmark persists per-viewer in localStorage.
export default function ArticleShareBar({ url }: { url: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; ignore */
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-border px-3 h-9 text-xs font-medium text-text-muted hover:border-brand hover:text-brand transition-colors";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={copy} className={btn} aria-label={copied ? "Link copied" : "Copy link"}>
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setSaved((s) => !s);
          try {
            const key = "cm_bookmarks";
            const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
            const next = saved ? list.filter((u) => u !== url) : Array.from(new Set([...list, url]));
            localStorage.setItem(key, JSON.stringify(next));
          } catch {
            /* storage blocked; ignore */
          }
        }}
        className={`grid h-9 w-9 place-items-center rounded-full border border-border text-text-muted hover:border-brand hover:text-brand transition-colors ${saved ? "border-brand text-brand" : ""}`}
        aria-label={saved ? "Remove bookmark" : "Bookmark this article"}
        aria-pressed={saved}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}
