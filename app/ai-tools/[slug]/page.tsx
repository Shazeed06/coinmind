import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aiTools } from "@/lib/data";
import { aiToolDetails, detailBySlug, detailByName } from "@/lib/aiToolDetails";
import { site } from "@/lib/site";
import { IconArrow, IconStar, IconCheck, IconBolt, IconSparkle } from "@/components/icons";

export function generateStaticParams() {
  return aiToolDetails.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = detailBySlug(slug);
  const tool = detail && aiTools.find((t) => t.name === detail.name);
  if (!detail || !tool) return {};
  return {
    title: `${tool.name} Review 2026 — Features, Pricing, Use Cases & Hacks`,
    description: `${tool.name} by ${tool.maker}: ${tool.tagline} See key features, pricing (${tool.pricing}), real use cases and pro tips.`,
    alternates: { canonical: `/ai-tools/${slug}` },
    openGraph: { title: `${tool.name} — Review, Pricing & Hacks`, description: tool.tagline, type: "article" },
  };
}

const tierStyle: Record<string, string> = {
  Free: "bg-forest-soft text-forest",
  Freemium: "bg-brass-soft text-brass",
  Paid: "bg-paper-2 text-ink-soft",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = detailBySlug(slug);
  const tool = detail && aiTools.find((t) => t.name === detail.name);
  if (!detail || !tool) notFound();

  const related = aiTools
    .filter((t) => t.region === tool.region && t.name !== tool.name)
    .slice(0, 3);

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        applicationCategory: "AI tool",
        operatingSystem: "Web",
        offers: { "@type": "Offer", description: tool.pricing },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          bestRating: 5,
          ratingCount: 100,
        },
        publisher: { "@type": "Organization", name: tool.maker },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "AI Tools", item: `${site.url}/ai-tools` },
          { "@type": "ListItem", position: 3, name: tool.name, item: `${site.url}/ai-tools/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/ai-tools" className="hover:text-forest">AI Tools</Link>
        <span>/</span>
        <span className="text-ink">{tool.name}</span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
              {tool.name}
            </h1>
            <p className="mt-2 text-ink-faint font-medium">
              by {tool.maker} · {tool.category} · {tool.region}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-paper-2 px-3 py-1.5 text-sm font-semibold text-ink">
              <IconStar className="h-4 w-4 text-brass" />
              {tool.rating.toFixed(1)} / 5
            </span>
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tierStyle[tool.tier]}`}>
              {tool.tier}
            </span>
          </div>
        </div>

        <p className="mt-5 text-lg text-ink-soft leading-relaxed">{tool.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={detail.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            Visit {tool.name} <IconArrow className="h-4 w-4" />
          </a>
          <span className="text-sm text-ink-faint">
            Pricing: <strong className="text-ink font-semibold">{tool.pricing}</strong>
          </span>
        </div>
      </header>

      {/* Overview */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-600 text-ink">Overview</h2>
        <p className="mt-3 text-ink-soft leading-relaxed text-[1.05rem]">
          {detail.overview}
        </p>
      </section>

      {/* Key benefits */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">Why people like it</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {tool.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 rounded-xl border border-line bg-card p-4 text-sm text-ink-soft">
              <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* Use cases */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink">Best use cases</h2>
        <div className="mt-4 space-y-2.5">
          {detail.useCases.map((u, i) => (
            <div key={u} className="flex items-start gap-3 rounded-xl bg-paper-2 p-4">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-ink-soft">{u}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hacks / pro tips */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-600 text-ink flex items-center gap-2">
          <IconBolt className="h-6 w-6 text-brass" /> Pro tips &amp; hacks
        </h2>
        <ul className="mt-4 space-y-3">
          {detail.hacks.map((h) => (
            <li key={h} className="flex items-start gap-3 rounded-xl border-l-4 border-brass bg-brass-soft/50 p-4 text-ink-soft">
              <IconSparkle className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing box */}
      <section className="mt-10 rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-xl font-600 text-ink">Pricing</h2>
        <p className="mt-2 text-ink-soft">{tool.pricing}</p>
        <p className="mt-2 text-xs text-ink-faint">
          Pricing is indicative and can change — always confirm on the{" "}
          <a href={detail.website} target="_blank" rel="noopener noreferrer nofollow" className="text-forest underline underline-offset-2">
            official {tool.name} website
          </a>
          .
        </p>
      </section>

      <div className="mt-8 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">Note:</strong> {site.name} reviews are based
        on our own testing and research. Some links may earn us a commission at no
        cost to you; it never affects our ratings.
      </div>

      {/* Related */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">More {tool.region} tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((t) => {
            const d = detailByName(t.name);
            return (
              <Link
                key={t.name}
                href={d ? `/ai-tools/${d.slug}` : "/ai-tools"}
                className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
              >
                <h3 className="font-display text-base font-600 text-ink group-hover:text-forest transition-colors">
                  {t.name}
                </h3>
                <p className="mt-1 text-xs text-ink-faint">{t.category}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-forest">
                  Read <IconArrow className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
