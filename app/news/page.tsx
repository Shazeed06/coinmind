import type { Metadata } from "next";
import { news } from "@/lib/data";
import { IconNews } from "@/components/icons";
import CoverArt, { type CoverVariant, type CoverPalette } from "@/components/CoverArt";

// Pick on-brand cover art per story from its category (varied by position).
function newsArt(
  category: string,
  i: number
): { variant: CoverVariant; palette: CoverPalette } {
  if (category === "Finance") {
    return i % 2 === 0
      ? { variant: "candles", palette: "brass" }
      : { variant: "chart", palette: "forest" };
  }
  return i % 2 === 0
    ? { variant: "nodes", palette: "deep" }
    : { variant: "spark", palette: "berry" };
}

export const metadata: Metadata = {
  title: "Finance & AI Explainers — In Plain English",
  description:
    "Original, plain-English explainers of the finance and AI developments that matter — markets, rates, AI models and tools. Written to inform, not to chase headlines.",
  alternates: { canonical: "/news" },
};

export default function Page() {
  const [lead, ...rest] = news;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-14 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
            <IconNews className="h-3.5 w-3.5" /> Explainers
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
            Finance & AI, explained
          </h1>
          <p className="mt-4 text-lg text-ink-soft leading-relaxed">
            The developments shaping markets and technology — summarised in
            clear, plain English, with the context that matters.
          </p>
        </div>
      </header>

      {/* Lead story */}
      <article className="rounded-3xl border border-line bg-card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[240px] overflow-hidden">
            <CoverArt
              seed={`lead-${lead.title}`}
              variant={newsArt(lead.category, 0).variant}
              palette={newsArt(lead.category, 0).palette}
              className="absolute inset-0 h-full w-full"
            />
            <span className="absolute left-6 top-6 inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest-deep">
              {lead.category} · {lead.tag}
            </span>
          </div>
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <h2 className="font-display text-3xl font-600 leading-tight text-ink">
              {lead.title}
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">{lead.summary}</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-ink-faint">
              <span>CoinMind explainer</span>
              <span className="h-3 w-px bg-line-strong" />
              <span>{lead.tag}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Grid of the rest */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((n, i) => {
          const art = newsArt(n.category, i + 1);
          return (
            <article
              key={n.title}
              className="rounded-2xl border border-line bg-card overflow-hidden flex flex-col"
            >
              <div className="relative h-36 overflow-hidden border-b border-line">
                <CoverArt
                  seed={n.title}
                  variant={art.variant}
                  palette={art.palette}
                  className="absolute inset-0 h-full w-full"
                />
                <span
                  className={`absolute left-4 top-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    n.category === "Finance"
                      ? "bg-forest-soft text-forest"
                      : "bg-brass-soft text-brass"
                  }`}
                >
                  {n.category} · {n.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-600 text-ink leading-snug">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed flex-1">
                  {n.summary}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-ink-faint">
                  <span>CoinMind explainer</span>
                  <span className="h-3 w-px bg-line-strong" />
                  <span>{n.tag}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* How it works note (also builds trust for AdSense/originality) */}
      <section className="mt-16 mb-4 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8 max-w-3xl">
        <h2 className="font-display text-xl font-600 text-ink">
          How we write these
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          These are original, plain-English explainers written by the CoinMind
          team on the finance and AI topics that matter — what&apos;s happening
          and why it&apos;s relevant to your money or the tools you use.
          They&apos;re for general education, not live breaking-news or
          financial advice. For the latest figures and announcements, always
          check primary sources.
        </p>
      </section>
    </div>
  );
}
