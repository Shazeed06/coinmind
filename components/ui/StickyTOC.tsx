"use client";

import { useEffect, useState } from "react";

type TOCItem = { id: string; label: string };

export function StickyTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block space-y-1">
      <p className="eyebrow text-ink-faint mb-3">On this page</p>
      {items.map(({ id, label }) => (
        // Inactive rows were text-muted on a border-border rail; both the label
        // and its rail sat at the same weight as the active row's label, so the
        // only cue for "you are here" was hue. The active row now also carries
        // the medium weight, and the inactive rail is the lighter line token.
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
    </nav>
  );
}
