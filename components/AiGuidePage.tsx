import Link from "next/link";
import { breadcrumb, faqPage, graph, article } from "@/lib/ld";
import AuthorReviewBox, { type Source } from "@/components/AuthorReviewBox";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

export type Faq = { q: string; a: string };

// Shared shell for the AI explainer/guide pages under /ai-tools. Uses the full
// container width with a comfortable ~900px reading column (not the narrow blog
// measure), and emits Article + Breadcrumb + FAQPage structured data.
export default function AiGuidePage({
  slug,
  eyebrow,
  title,
  intro,
  date,
  children,
  faqs,
  sources,
  financeDisclaimer,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  date: string;
  children: React.ReactNode;
  faqs: Faq[];
  sources?: Source[];
  financeDisclaimer?: boolean;
}) {
  const schema = graph([
    article(title, intro, date),
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "AI Tools", path: "/ai-tools" },
      { name: title, path: `/ai-tools/${slug}` },
    ]),
    ...(faqs.length > 0 ? [faqPage(faqs)] : []),
  ]);

  return (
    <div className="container-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-ink-faint">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link href="/ai-tools" className="hover:text-brand">AI Tools</Link>
        <span>/</span>
        <span className="text-ink">{title}</span>
      </nav>

      <div className="mx-auto max-w-[900px]">
        <header className="mt-8">
          <span className="eyebrow text-brand">{eyebrow}</span>
          <h1 className="h1-article mt-3 text-ink">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </header>

        {financeDisclaimer && (
          <div className="mt-6">
            <FinancialDisclaimer type="general" />
          </div>
        )}

        <div className="mt-12 space-y-12">{children}</div>

        {faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
            <div className="mt-5 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink transition-colors hover:text-brand">
                    <span>{f.q}</span>
                    <span className="mt-0.5 shrink-0 text-xl leading-none text-ink-faint transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[760px] pr-8 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <AuthorReviewBox sources={sources} />
        </div>
      </div>

      <div className="mb-16" />
    </div>
  );
}

// Section heading used inside the guide body.
export function GuideH2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-[1.6rem] leading-snug text-ink" style={{ scrollMarginTop: "6rem" }}>
      {children}
    </h2>
  );
}

// A ready-to-paste prompt block with a label.
export function PromptBox({ label, prompt }: { label?: string; prompt: string }) {
  return (
    <figure className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper-2">
      <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
        {label ?? "Prompt — paste into Claude"}
      </figcaption>
      <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-4 text-[13.5px] leading-relaxed text-ink">{prompt}</pre>
    </figure>
  );
}
