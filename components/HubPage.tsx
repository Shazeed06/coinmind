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
    // 56px between link groups, up from 40/48. These sections have no
    // background change to separate them, so the gap is the only thing telling
    // the reader where one group ends, and it has to beat the 20px gap between
    // a group heading and its own cards by a clear margin.
    <section className="mb-12 sm:mb-14">
      <h2 className="font-display text-xl sm:text-2xl text-ink mb-5">{title}</h2>
      {/* gap-4, and cards laid out as columns: a link whose desc is empty or
          short no longer leaves its title floating against the top of a card
          stretched to match a two-line neighbour. */}
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex flex-col rounded-xl border border-line p-4 hover:border-forest/40 hover:bg-forest-soft/30 transition-colors"
          >
            <h3 className="font-semibold text-ink leading-snug">{l.title}</h3>
            {l.desc && <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{l.desc}</p>}
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
  // The body column is max-w-3xl so its tables have room, but at 768px a
  // paragraph runs about 98 characters per line. Capping the running text at
  // 600px brings it to roughly 75 while leaving tables and headings full width.
  "[&_p]:text-ink-soft [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:max-w-[600px]",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-ink-soft [&_ul]:max-w-[600px]",
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-ink-soft [&_ol]:max-w-[600px]",
  "[&_li]:leading-relaxed",
  // <ArticleMarkdown/> wraps every table in .table-scroll, but the rule that
  // makes that wrapper scroll lives at `.article-body .table-scroll`, and this
  // column is not .article-body. So the 560px min-width below had nothing to
  // scroll inside and pushed the whole document to 576px at a 375px viewport:
  // the entire page scrolled sideways. The wrapper now carries its own
  // overflow, and the table keeps its min-width and scrolls within it.
  "[&_.table-scroll]:my-6 [&_.table-scroll]:overflow-x-auto [&_.table-scroll]:rounded-xl [&_.table-scroll]:border [&_.table-scroll]:border-line",
  "[&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-sm [&_table]:my-6",
  "[&_.table-scroll_table]:my-0",
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
      {/* 64px below the header, matching the gap this page uses between its
          other major blocks. The two lead paragraphs are capped at 600px (~75
          characters) instead of running the full 768px column, which read as
          ~98 characters per line on a desktop screen. */}
      <header className="max-w-3xl mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          {badge}
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl text-ink leading-[1.05]">
          {title}
        </h1>
        <p className="mt-4 max-w-[600px] text-base sm:text-lg text-ink-soft leading-relaxed">
          {description}
        </p>
        {intro && (
          <p className="mt-4 max-w-[600px] text-sm sm:text-base text-ink-soft leading-relaxed">
            {intro}
          </p>
        )}
      </header>

      {sections.map((s) => (
        <HubSection key={s.title} {...s} />
      ))}

      {/* The three trailing blocks each open with a rule, but they used to set
          their own space around it: mt-2/pt-8, pt-8 with no top margin, and
          mt-8/pt-8. Rules landed at three different distances from the content
          above them. They now share one measure, 48px of air above the rule and
          40px below it, so the page closes on a steady beat. */}
      {bodyMarkdown && (
        <section className="mt-12 border-t border-line pt-10">
          <div className={`max-w-3xl ${bodyProse}`}>
            <ArticleMarkdown markdown={bodyMarkdown} />
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl sm:text-2xl text-ink mb-5">
            Frequently Asked Questions
          </h2>
          {/* gap-4 and a 600px answer measure: at gap-3 the stacked cards read
              as one block rather than as separate questions. */}
          <div className="grid gap-4 max-w-3xl">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-line bg-card p-4 sm:p-5">
                <h3 className="font-semibold text-ink leading-snug">{f.q}</h3>
                <p className="mt-2 max-w-[600px] text-sm text-ink-soft leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedHubs && relatedHubs.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl text-ink mb-5">Related Topics</h2>
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
