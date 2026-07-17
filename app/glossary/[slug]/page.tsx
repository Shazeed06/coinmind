import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  GLOSSARY,
  GLOSSARY_SLUGS,
  getGlossaryTerm,
  type GlossaryTerm,
} from "@/lib/glossary";
import ArticleMarkdown from "@/components/ArticleMarkdown";
import { IconArrow, IconCheck } from "@/components/icons";

// Only the terms in GLOSSARY are generated; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return GLOSSARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};

  const title = `What Is ${term.term}? Meaning & Definition`;
  return {
    title: { absolute: title },
    description: term.short,
    alternates: { canonical: `/glossary/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/glossary/${slug}`,
      siteName: site.name,
      locale: "en_IN",
      title,
      description: term.short,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${term.term} — meaning and definition`,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const relatedTerms = term.related
    .map((s) => getGlossaryTerm(s))
    .filter((t): t is GlossaryTerm => Boolean(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: term.term,
        description: term.short,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "CoinMind Finance & AI Glossary",
          url: `${site.url}/glossary`,
        },
        url: `${site.url}/glossary/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Glossary",
            item: `${site.url}/glossary`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: term.term,
            item: `${site.url}/glossary/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/glossary" className="hover:text-forest">
          Glossary
        </Link>
        <span>/</span>
        <span className="text-ink">{term.term}</span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          {term.category} term
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          {term.term}
        </h1>
        <p className="mt-3 text-lg text-ink-soft leading-relaxed">
          A plain-English definition of {term.term} &mdash; what it means, how it
          works, and a simple example.
        </p>
      </header>

      {/* Quick Answer / definition box — the AEO snippet target */}
      <section className="mt-8 rounded-2xl border border-forest/30 bg-forest-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Quick answer
        </p>
        <p className="mt-2 text-[1.05rem] leading-relaxed text-ink">
          {term.short}
        </p>
      </section>

      {/* Full explainer */}
      <article className="article mt-10">
        <ArticleMarkdown markdown={term.bodyMarkdown} />
      </article>

      {/* Related calculator / tool / guide CTA */}
      {term.relatedHref && (
        <section className="mt-10 rounded-2xl border border-line bg-forest-soft p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-600 text-ink">
              Put {term.term} into practice
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Try the tool or guide most relevant to this term.
            </p>
          </div>
          <Link
            href={term.relatedHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            {term.relatedLabel ?? "Open"} <IconArrow className="h-4 w-4" />
          </Link>
        </section>
      )}

      {/* Related terms */}
      {relatedTerms.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-600 text-ink">
            Related terms
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {relatedTerms.map((r) => (
              <Link
                key={r.slug}
                href={`/glossary/${r.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors"
              >
                <IconCheck className="h-3.5 w-3.5 text-forest" />
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to full glossary */}
      <section className="mt-12 rounded-2xl border border-line bg-paper-2 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-600 text-ink">
            Browse the full glossary
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {GLOSSARY.length} finance &amp; AI terms explained in plain English.
          </p>
        </div>
        <Link
          href="/glossary"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest"
        >
          All terms <IconArrow className="h-4 w-4" />
        </Link>
      </section>

      <div className="mt-12 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">A note on accuracy:</strong> this definition
        is for general education, not personalised financial or tax advice.
        Figures are illustrative and rules can change &mdash; confirm anything
        that affects a real decision.
      </div>
    </div>
  );
}
