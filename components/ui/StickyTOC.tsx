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
      <p className="eyebrow text-text-muted mb-3">On this page</p>
      {items.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`block text-sm py-1.5 border-l-2 pl-3 transition-colors ${
            active === id
              ? "text-brand border-brand font-medium"
              : "text-text-muted border-border hover:text-text hover:border-text-muted"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
