import Link from "next/link";

type HubLink = { title: string; href: string; desc: string };

type HubSectionDef = {
  title: string;
  links: HubLink[];
  columns?: 2 | 3 | 4;
};

export function HubSection({ title, links, columns = 3 }: HubSectionDef) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };
  return (
    <section className="mb-10 sm:mb-12">
      <h2 className="font-display text-xl sm:text-2xl font-600 text-ink mb-4">{title}</h2>
      <div className={`grid gap-3 ${gridCols[columns]}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block rounded-xl border border-line p-4 hover:border-forest/40 hover:bg-forest-soft/30 transition-colors"
          >
            <h3 className="font-semibold text-ink leading-snug">{l.title}</h3>
            {l.desc && <p className="mt-1 text-sm text-ink-soft line-clamp-2">{l.desc}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}

type HubPageProps = {
  title: string;
  description: string;
  badge: string;
  sections: HubSectionDef[];
  relatedHubs?: { title: string; href: string }[];
};

export default function HubPage({ title, description, badge, sections, relatedHubs }: HubPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <header className="max-w-3xl mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          {badge}
        </span>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl font-600 text-ink leading-[1.05]">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
          {description}
        </p>
      </header>

      {sections.map((s) => (
        <HubSection key={s.title} {...s} />
      ))}

      {relatedHubs && relatedHubs.length > 0 && (
        <section className="border-t border-line pt-8 mt-8">
          <h2 className="font-display text-xl font-600 text-ink mb-4">Related Topics</h2>
          <div className="flex flex-wrap gap-3">
            {relatedHubs.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="rounded-full bg-paper-2 px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink hover:bg-line transition-colors"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
