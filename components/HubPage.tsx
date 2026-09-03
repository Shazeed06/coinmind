import Link from "next/link";
import ArticleMarkdown from "@/components/ArticleMarkdown";
import { breadcrumb, faqPage, graph } from "@/lib/ld";

type HubLink = { title: string; href: string; desc: string };

export type HubFaq = { q: string; a: string };

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
  /** Short lead paragraph rendered directly under the h1 description. */
  intro?: string;
  /** Long-form markdown body rendered after the link sections. */
  bodyMarkdown?: string;
  /** Visible FAQ section + FAQPage structured data. */
  faqs?: HubFaq[];
};

// Typography for the long-form markdown body, matched to the hub design tokens.
const bodyProse = [
  "[&>*:first-child]:mt-0",
  "[&_h2]:font-display [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-600 [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:leading-snug",
  "[&_h3]:font-display [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-600 [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-2",
  "[&_p]:text-ink-soft [&_p]:leading-relaxed [&_p]:mb-4",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-ink-soft",
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-ink-soft",
  "[&_li]:leading-relaxed",
  "[&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-sm [&_table]:my-6",
  "[&_th]:border-b [&_th]:border-line [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink [&_th]:align-bottom",
  "[&_td]:border-b [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:text-ink-soft [&_td]:align-top",
  "[&_strong]:text-ink [&_strong]:font-semibold",
].join(" ");

export default function HubPage({
  title,
  description,
  badge,
  sections,
  relatedHubs,
  intro,
  bodyMarkdown,
  faqs,
}: HubPageProps) {
  // Hub pages own their structured data now that the root layout no longer
  // reads the request path. A hub does not receive its own href, so the final
  // breadcrumb item carries the title with no url: Google reads a trailing
  // ListItem without `item` as the current page.
  const schemaGraph = graph([
    breadcrumb([{ name: "Home", path: "/" }, { name: title }]),
    ...(faqs && faqs.length > 0 ? [faqPage(faqs)] : []),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
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
        {intro && (
          <p className="mt-4 text-sm sm:text-base text-ink-soft leading-relaxed">
            {intro}
          </p>
        )}
      </header>

      {sections.map((s) => (
        <HubSection key={s.title} {...s} />
      ))}

      {bodyMarkdown && (
        <section className="border-t border-line pt-8 mt-2 mb-10 sm:mb-12">
          <div className={`max-w-3xl ${bodyProse}`}>
            <ArticleMarkdown markdown={bodyMarkdown} />
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="border-t border-line pt-8 mb-10 sm:mb-12">
          <h2 className="font-display text-xl sm:text-2xl font-600 text-ink mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-3 max-w-3xl">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-line bg-card p-4 sm:p-5">
                <h3 className="font-semibold text-ink leading-snug">{f.q}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
