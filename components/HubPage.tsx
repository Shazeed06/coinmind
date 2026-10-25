import Link from "next/link";
import ArticleMarkdown from "@/components/ArticleMarkdown";
import { breadcrumb, faqPage, graph } from "@/lib/ld";
import { IconArrow } from "@/components/icons";

type HubLink = { title: string; href: string; desc: string };

export type HubFaq = { q: string; a: string };

type HubSectionDef = {
  title: string;
  links: HubLink[];
  columns?: 2 | 3 | 4;
};

// Section heading with a small colour accent bar, so each group reads as a
// titled block rather than a loose line of text above some boxes.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl sm:text-2xl text-ink mb-5 flex items-center gap-2.5">
      <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-forest to-brand" />
      {children}
    </h2>
  );
}

export function HubSection({ title, links, columns = 3 }: HubSectionDef) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };
  return (
    <section className="mb-12 sm:mb-14">
      <SectionHeading>{title}</SectionHeading>
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group relative flex flex-col rounded-2xl border border-line bg-card p-5 shadow-sm transition-all duration-200 hover:border-forest/50 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-ink leading-snug group-hover:text-forest transition-colors">
                {l.title}
              </h3>
              <IconArrow className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:text-forest group-hover:translate-x-0.5" />
            </div>
            {l.desc && <p className="mt-2 text-sm text-ink-soft line-clamp-2">{l.desc}</p>}
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
  "[&_p]:text-ink-soft [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:max-w-[640px] [&_p]:text-justify [&_p]:[hyphens:auto]",
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Hero band: a soft brand-tinted gradient with a blurred glow gives the
          top of every hub real presence instead of plain text on white. */}
      <section className="relative overflow-hidden border-b border-line/70 bg-gradient-to-b from-forest-soft/50 via-forest-soft/10 to-transparent">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[46rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative container-main py-14 text-center sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-forest shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-forest" />
            {badge}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl text-ink leading-[1.07] sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base text-ink-soft leading-relaxed sm:text-lg">
            {description}
          </p>
          {intro && (
            <p className="mx-auto mt-4 max-w-[640px] text-sm text-ink-soft leading-relaxed sm:text-base">
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="container-main py-12 sm:py-16">
        {sections.map((s) => (
          <HubSection key={s.title} {...s} />
        ))}

        {bodyMarkdown && (
          <section className="mt-4 border-t border-line pt-10">
            <div className={`max-w-3xl mx-auto ${bodyProse}`}>
              <ArticleMarkdown markdown={bodyMarkdown} />
            </div>
          </section>
        )}

        {faqs && faqs.length > 0 && (
          <section className="mt-12 border-t border-line pt-10">
            <div className="max-w-3xl mx-auto">
              <SectionHeading>Frequently Asked Questions</SectionHeading>
              <div className="grid gap-4">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-line bg-card p-4 shadow-sm sm:p-5">
                    <h3 className="font-semibold text-ink leading-snug">{f.q}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedHubs && relatedHubs.length > 0 && (
          <section className="mt-12 border-t border-line pt-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-xl text-ink mb-5">Related Topics</h2>
              <div className="flex flex-wrap gap-3">
                {relatedHubs.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft shadow-sm hover:border-forest hover:text-forest transition-colors"
                  >
                    {r.title}
                    <IconArrow className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
