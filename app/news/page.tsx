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
  title: "Finance & AI News — Today's Briefing",
  description:
    "A daily briefing of the most important finance and AI news, summarised in plain English. Markets, rates, AI models and tools — the signal, not the noise.",
  alternates: { canonical: "/news" },
};

function ago(minutes: number) {
  if (minutes < 60) return `${minutes}m ago`;
  const h = Math.floor(minutes / 60);
  return `${h}h ago`;
}

export default function Page() {
  const [lead, ...rest] = news;
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="pt-14 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
            <IconNews className="h-3.5 w-3.5" /> Daily briefing
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
            Today in finance & AI
          </h1>
          <p className="mt-4 text-lg text-ink-soft leading-relaxed">
            The stories that move markets and shape technology — scanned,
            summarised and refreshed every day.
          </p>
        </div>
        <p className="text-sm text-ink-faint shrink-0">
          Updated · Monday, 14 July 2026
        </p>
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
              <span>{lead.source}</span>
              <span className="h-3 w-px bg-line-strong" />
              <span>{ago(lead.minutesAgo)}</span>
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
                  <span>{n.source}</span>
                  <span className="h-3 w-px bg-line-strong" />
                  <span>{ago(n.minutesAgo)}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* How it works note (also builds trust for AdSense/originality) */}
      <section className="mt-16 mb-4 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8 max-w-3xl">
        <h2 className="font-display text-xl font-600 text-ink">
          How we put the briefing together
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">
          Each morning we scan trusted finance and technology sources, then
          write original, plain-English summaries of what matters — with the
          context you need to understand why. We link out to the original
          reporting so you can always go deeper. This is journalism-style
          curation, not copy-paste: every summary here is written fresh.
        </p>
      </section>
    </div>
  );
}
