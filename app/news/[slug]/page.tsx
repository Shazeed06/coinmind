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

export const dynamicParams = false;

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

      {/* Uplifted Editorial Hero Section */}
      <section className="bg-white border-b border-border/60 pt-6 sm:pt-10 pb-8 sm:pb-12">
        <div className="container-main">
          {/* Breadcrumb Navigation */}
          <nav
            className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted mb-4"
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

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Pill>{article.category}</Pill>
            <span className="text-xs text-text-muted font-medium">{article.tag}</span>
            <span className="text-xs text-text-muted">·</span>
            <span className="text-xs text-text-muted">{article.readMinutes} min read</span>
            <span className="text-xs text-text-muted">·</span>
            <span className="text-xs text-text-muted">{article.date}</span>
          </div>

          {/* News Headline */}
          <h1 className="h1-article text-text mt-2 max-w-4xl tracking-tight leading-[1.14]">
            {article.title}
          </h1>

          {/* Lead Summary */}
          <p className="mt-4 text-lg sm:text-xl text-text-muted max-w-3xl leading-relaxed">
            {article.summary}
          </p>

          {/* Author & Source Byline */}
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex items-center gap-3">
              <Link href={`/authors/${site.author.slug}`}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  {site.author.fullName.charAt(0)}
                </span>
              </Link>
              <div className="text-sm">
                <p className="font-semibold text-text">
                  <Link href={`/authors/${site.author.slug}`} className="hover:text-brand hover:underline">
                    {site.author.fullName}
                  </Link>
                  <span className="font-normal text-text-muted"> · {site.author.credential}</span>
                </p>
                <p className="text-xs text-text-muted">
                  {article.date} · {article.readMinutes} min read · Source: {article.source}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Hero Image - PROMINENTLY VISIBLE ABOVE THE FOLD */}
          <div className="mt-8 aspect-[16/9] sm:aspect-[21/9] max-h-[460px] w-full rounded-2xl border border-border overflow-hidden shadow-sm bg-slate-900">
            <CoverArt
              seed={article.slug}
              variant={art.variant}
              palette={art.palette}
              label={article.category}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-main py-10 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Column: 8 of 12 columns for generous, comfortable reading width */}
          <article className="lg:col-span-8">
            <Prose className="article-body">
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

          {/* Sidebar: 4 of 12 columns */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-5 rounded-card border border-border bg-gradient-to-br from-brand/5 to-transparent shadow-2xs">
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
                <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-3">More News</p>
                <div className="space-y-2">
                  {more.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/news/${a.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-bg-alt p-3 hover:border-brand/30 hover:bg-brand/5 transition-all duration-150"
                    >
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            a.category === "Finance" ? "text-brand" : "text-accent"
                          }`}
                        >
                          {a.category}
                        </span>
                        <p className="text-sm font-medium text-text group-hover:text-brand transition-colors line-clamp-2 leading-snug mt-0.5">
                          {a.title}
                        </p>
                        <p className="text-[11px] text-text-muted mt-1">
                          {a.readMinutes} min read · {a.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/news"
                  className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline ${categoryColor}`}
                >
                  All news <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
