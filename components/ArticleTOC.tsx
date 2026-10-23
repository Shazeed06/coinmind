"use client";

import { useEffect, useState } from "react";

type TOCItem = { id: string; label: string };

// "On this page" list with scroll-spy. Unlike ui/StickyTOC this does NOT pin
// itself, so it sits safely among other sidebar blocks (calculator, related,
// newsletter) and scrolls with them instead of overlapping.
export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="hidden rounded-card border border-border bg-bg p-5 shadow-card lg:block">
      <p className="eyebrow text-text-muted mb-3">On this page</p>
      <div className="space-y-1">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block border-l-2 py-1.5 pl-3 text-sm transition-colors ${
              active === id
                ? "border-brand font-medium text-brand"
                : "border-line text-text-muted hover:border-line-strong hover:text-text"
            }`}
            aria-current={active === id ? "true" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
