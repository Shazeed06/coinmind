import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { FINANCE_PROMPTS, PROMPT_CATEGORIES } from "@/lib/financePrompts";
import { breadcrumb, collectionPage, graph } from "@/lib/ld";
import { ArrowRight, Sparkles } from "lucide-react";

const title = "Finance Prompts for Claude, ChatGPT & Gemini — 20 Premium Prompts";
const description =
  "20 advanced, copy-paste finance prompts for Claude, ChatGPT and Gemini — financial plans, portfolio x-ray, tax optimisation, debt payoff, FIRE and more. Expert-grade, not basic. Free, for India and worldwide.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "finance prompts", "ai finance prompts", "chatgpt prompts for finance", "claude finance prompts",
    "best ai prompts for money", "financial planning prompts", "chatgpt prompts for investing",
    "ai prompts for personal finance india", "gemini finance prompts",
  ],
  alternates: { canonical: "/finance-prompts" },
  openGraph: {
    type: "website", url: `${site.url}/finance-prompts`, siteName: site.name, locale: "en_IN",
    title: "20 Premium Finance Prompts for Claude, ChatGPT & Gemini", description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function Page() {
  const schema = graph([
    collectionPage(title, description, FINANCE_PROMPTS.map((p) => ({ name: p.title, url: `${site.url}/finance-prompts/${p.slug}` }))),
    breadcrumb([{ name: "Home", path: "/" }, { name: "Finance Prompts", path: "/finance-prompts" }]),
  ]);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-[#eef6fb] via-[#f7fbfd] to-white">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2aa7de]/15 blur-3xl" aria-hidden="true" />
        <div className="relative container-main py-16 text-center sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-pill border border-[#d4e7f3] bg-white/80 px-4 py-1.5 text-xs font-medium text-text-muted shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> For Claude · ChatGPT · Gemini
          </span>
          <h1 className="mx-auto mt-6 max-w-[800px] text-[2.25rem] font-extrabold leading-[1.06] tracking-tight text-text sm:text-5xl">
            Premium finance prompts that do the <span className="text-brand">real work</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-text-muted sm:text-lg">
            {FINANCE_PROMPTS.length} copy-paste prompts that turn any AI into a financial analyst — full plans, portfolio x-rays, tax optimisation, debt strategy and more. Not the basic &ldquo;make me a budget&rdquo; ones: each assigns an expert role, takes your numbers, and returns an adviser-grade result. Free, and built for India and worldwide.
          </p>
        </div>
      </section>

      {/* Prompts by category */}
      <section className="section-pad bg-bg-alt">
        <div className="container-main space-y-14">
          {PROMPT_CATEGORIES.map((cat) => {
            const items = FINANCE_PROMPTS.filter((p) => p.category === cat);
            return (
              <div key={cat}>
                <h2 className="text-xl font-extrabold tracking-tight text-text">{cat}</h2>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/finance-prompts/${p.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-bg p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-lift"
                    >
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
                        {p.bestWith.join(" · ")}
                      </span>
                      <h3 className="mt-4 text-[17px] font-bold leading-snug text-text">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{p.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5">
                        Get the prompt <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#0f3a5a]">
        <div className="container-main flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">Prefer the maths done for you?</h2>
            <p className="mt-1.5 text-sm text-white/70">Use CoinMind&rsquo;s free calculators to verify any number the AI gives you.</p>
          </div>
          <Link href="/calculators" className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            Explore calculators <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
