import type { Metadata } from "next";
import Link from "next/link";
import { aiTools, type Region } from "@/lib/data";
import { detailByName } from "@/lib/aiToolDetails";
import { IconSparkle, IconStar, IconCheck, IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Best AI Tools 2026 — US, China & India Compared" },
  description:
    "Up-to-date directory of top AI tools from the US, China and India — ratings, benefits and pricing for ChatGPT, Claude, Gemini, DeepSeek, Qwen and more.",
  alternates: { canonical: "/ai-tools" },
  openGraph: { url: "/ai-tools" },
};

const regions: { key: Region; label: string; flag: string; note: string }[] = [
  {
    key: "USA",
    label: "United States",
    flag: "🇺🇸",
    note: "The biggest, most capable general-purpose tools — and most of the household names.",
  },
  {
    key: "China",
    label: "China",
    flag: "🇨🇳",
    note: "Fast-rising models that are often open-source and dramatically cheaper to run.",
  },
  {
    key: "India",
    label: "India",
    flag: "🇮🇳",
    note: "Home-grown AI built around Indian languages, context and sovereign deployment.",
  },
];

const tierStyle: Record<string, string> = {
  Free: "bg-forest-soft text-forest",
  Freemium: "bg-brass-soft text-brass",
  Paid: "bg-paper-2 text-ink-soft",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="pt-14 pb-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-brass-soft px-3 py-1.5 text-xs font-semibold text-brass">
          <IconSparkle className="h-3.5 w-3.5" /> AI Tools Directory
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          The most important AI tools, from the US, China & India
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          The AI world moves fast. This is our running directory of the tools
          that matter right now — what each one is best at, its key benefits, and
          what it costs. Prices are indicative and can change; always confirm on
          the official site.
        </p>
      </header>

      {/* Quick jump */}
      <div className="mb-10 flex flex-wrap gap-2">
        {regions.map((r) => (
          <a
            key={r.key}
            href={`#${r.key.toLowerCase()}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-sm font-medium text-ink hover:border-forest hover:text-forest transition-colors"
          >
            <span>{r.flag}</span> {r.label}
            <span className="text-ink-faint">
              ({aiTools.filter((t) => t.region === r.key).length})
            </span>
          </a>
        ))}
      </div>

      {regions.map((r) => {
        const tools = aiTools.filter((t) => t.region === r.key);
        return (
          <section key={r.key} id={r.key.toLowerCase()} className="mb-16 scroll-mt-24">
            <div className="border-b border-line pb-4">
              <h2 className="font-display text-3xl font-600 text-ink flex items-center gap-3">
                <span aria-hidden>{r.flag}</span> {r.label}
              </h2>
              <p className="mt-2 text-ink-soft max-w-3xl">{r.note}</p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {tools.map((t) => (
                <article
                  key={t.name}
                  className="rounded-2xl border border-line bg-card p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-600 text-ink">
                        {t.name}
                      </h3>
                      <p className="text-sm font-medium text-ink-faint">
                        {t.maker} · {t.category}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-paper-2 px-3 py-1.5 text-sm font-semibold text-ink shrink-0">
                      <IconStar className="h-4 w-4 text-brass" />
                      {t.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-3 text-ink-soft leading-relaxed">
                    {t.tagline}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                        Pricing
                      </p>
                      <p className="text-sm font-medium text-ink">{t.pricing}</p>
                    </div>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold shrink-0 ${
                        tierStyle[t.tier]
                      }`}
                    >
                      {t.tier}
                    </span>
                  </div>

                  {detailByName(t.name) && (
                    <Link
                      href={`/ai-tools/${detailByName(t.name)!.slug}`}
                      className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border border-line-strong py-2.5 text-sm font-semibold text-ink hover:border-forest hover:text-forest transition-colors"
                    >
                      Read full review, use cases &amp; hacks
                      <IconArrow className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-4 mb-4 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          How we rate AI tools
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Each tool is assessed against a documented editorial rubric —
          usefulness, output quality, ease of use and value for money — using
          hands-on research and publicly available information. We update this
          directory as tools launch and prices change. If we ever add affiliate
          links, they won&apos;t affect our ratings. Pricing shown is indicative —
          check the official website for the latest plans in your country.
        </p>
      </section>
    </div>
  );
}
