import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsArticles } from "@/lib/newsArticles";
import { site } from "@/lib/site";
import { ChevronRight, Calculator, ArrowRight } from "lucide-react";
import CoverArt from "@/components/CoverArt";
import type { CoverVariant, CoverPalette } from "@/components/CoverArt";
import ArticleMarkdown from "@/components/ArticleMarkdown";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { Pill, Prose } from "@/components/ui";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: { absolute: article.title },
    description: article.summary,
    keywords: article.keywords,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/news/${article.slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: article.title,
      description: article.summary,
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: article.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: ["/opengraph-image"],
    },
  };
}

// Deterministic cover art per slug: no external assets, stable across renders.
const VARIANTS: CoverVariant[] = [
  "chart",
  "coins",
  "card",
  "spark",
  "nodes",
  "candles",
  "piggy",
  "plant",
  "shield",
  "graph-up",
];

function artFor(slug: string, category: "Finance" | "AI") {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
  const variant = VARIANTS[sum % VARIANTS.length];
  const palettes: CoverPalette[] =
    category === "AI" ? ["deep", "berry"] : ["forest", "brass"];
  return { variant, palette: palettes[sum % palettes.length] };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const art = artFor(article.slug, article.category);
  const more = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 4);
  const isoDate = new Date(article.date).toISOString();

  const graph: Record<string, unknown>[] = [
    {
      "@type": "NewsArticle",
      headline: article.title,
      description: article.summary,
      image: [`${site.url}/opengraph-image`],
      keywords: article.keywords.join(", "),
      articleSection: article.category,
      author: {
        "@type": "Person",
        name: site.author.fullName,
        url: `${site.url}/about`,
        jobTitle: site.author.role,
        description: site.author.bio,
      },
      publisher: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
      },
      publishingPrinciples: `${site.url}/editorial-standards`,
      datePublished: isoDate,
      dateModified: isoDate,
      mainEntityOfPage: `${site.url}/news/${article.slug}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "News", item: `${site.url}/news` },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title,
          item: `${site.url}/news/${article.slug}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  const articleJson = { "@context": "https://schema.org", "@graph": graph };

  const categoryColor = article.category === "Finance" ? "text-brand" : "text-accent";

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />

      <section className="section-pad pb-0 bg-white">
        <div className="container-main">
          <nav
            className="flex items-center gap-1.5 text-sm text-text-muted mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/news" className="hover:text-brand transition-colors">
              News
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-text truncate">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Pill>{article.category}</Pill>
            <span className="text-xs text-text-muted">{article.tag}</span>
          </div>

          <h1 className="h2 text-text mt-3 max-w-[720px]">{article.title}</h1>

          <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white text-sm font-semibold">
              {site.author.fullName.charAt(0)}
            </span>
            <div className="text-sm">
              <p className="font-semibold text-text">
                {site.author.fullName}{" "}
                <span className="font-normal text-text-muted">
                  · {site.author.credential}
                </span>
              </p>
              <p className="text-text-muted">
                {article.date} · {article.readMinutes} min read · {article.source}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main section-pad pt-8">
        <div className="aspect-[2/1] rounded-card border border-border overflow-hidden mb-8">
          <CoverArt
            seed={article.slug}
            variant={art.variant}
            palette={art.palette}
            label={article.category}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="container-main section-pad pt-0">
        <div className="grid lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8">
            {/* `article-body` (globals.css) supplies the table and list styling
                that Prose alone does not cover for markdown-rendered bodies. */}
            <Prose className="article-body">
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                {article.summary}
              </p>
              <ArticleMarkdown markdown={article.bodyMarkdown} />
            </Prose>

            <section className="mt-12 border-t border-border pt-8" id="faq">
              <h2 className="h3 text-text">Frequently asked questions</h2>
              <div className="mt-5 space-y-4">
                {article.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-card border border-border bg-bg-alt p-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-text marker:hidden">
                      {f.q}
                    </summary>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="mt-12 border-t border-border pt-8">
              <AuthorReviewBox />
            </div>

            <div className="mt-6 p-5 rounded-card bg-bg-alt border border-border text-sm text-text-muted">
              <strong className="text-text">A note on trust:</strong> this explainer is
              for education, not personalised financial advice. Figures are illustrative.
              Confirm anything that affects a real decision.
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-5 rounded-card border border-border bg-gradient-to-br from-brand/5 to-transparent">
                <Calculator className="h-8 w-8 text-brand" />
                <p className="text-sm font-semibold text-text mt-3">Run your own numbers</p>
                <p className="text-xs text-text-muted mt-1">
                  Free calculators, nothing leaves your browser
                </p>
                <Link
                  href="/calculators"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                  Open calculators <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div>
                <p className="eyebrow text-text-muted mb-3">More news</p>
                <div className="space-y-3">
                  {more.map((a) => (
                    <Link key={a.slug} href={`/news/${a.slug}`} className="block group">
                      <span
                        className={`eyebrow ${
                          a.category === "Finance" ? "text-brand" : "text-accent"
                        }`}
                      >
                        {a.category}
                      </span>
                      <p className="text-sm text-text group-hover:text-brand transition-colors line-clamp-2">
                        {a.title}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {a.readMinutes} min read
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/news"
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline ${categoryColor}`}
                >
                  All news <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
