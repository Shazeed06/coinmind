import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { FINANCE_PROMPTS, promptBySlug } from "@/lib/financePrompts";
import { article, breadcrumb, faqPage, graph } from "@/lib/ld";
import { PromptBox } from "@/components/AiGuidePage";
import AuthorReviewBox from "@/components/AuthorReviewBox";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return FINANCE_PROMPTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = promptBySlug(slug);
  if (!p) return {};
  const title = `${p.title} — Finance Prompt for Claude, ChatGPT & Gemini`;
  const description = `${p.description} Copy-paste prompt, how to use it, and tips. Free.`;
  return {
    title: { absolute: title },
    description,
    keywords: p.keywords,
    alternates: { canonical: `/finance-prompts/${slug}` },
    openGraph: {
      type: "article", url: `${site.url}/finance-prompts/${slug}`, siteName: site.name, locale: "en_IN",
      title, description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = promptBySlug(slug);
  if (!p) notFound();

  const faqs = [
    { q: `Which AI is best for the ${p.title} prompt?`, a: `It works on ${p.bestWith.join(", ")}. ${p.bestWith[0]} is a strong first choice for this kind of task. Paste the prompt, fill in your numbers, and ask follow-up questions to refine the output.` },
    { q: "Is the result financial advice?", a: "No. These prompts make an AI reason like an analyst, but AI can make mistakes and does not know your full situation. Treat the output as educational, verify every number (CoinMind's free calculators help), and consult a SEBI-registered adviser or a licensed professional before any major decision." },
    { q: "Is it safe to paste my financial details?", a: "Share amounts, categories and rates — never account numbers, passwords, card numbers, PAN or Aadhaar. You don't need identifiers for the analysis." },
  ];

  const related = FINANCE_PROMPTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const fallback = FINANCE_PROMPTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const more = related.length ? related : fallback;

  const schema = graph([
    article(p.title, p.description, "2026-10-27"),
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Finance Prompts", path: "/finance-prompts" },
      { name: p.title, path: `/finance-prompts/${slug}` },
    ]),
    faqPage(faqs),
  ]);

  return (
    <div className="container-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-ink-faint">
        <Link href="/" className="hover:text-brand">Home</Link><span>/</span>
        <Link href="/finance-prompts" className="hover:text-brand">Finance Prompts</Link><span>/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      <div className="mx-auto max-w-[900px]">
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{p.category}</span>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft">Best with {p.bestWith.join(" · ")}</span>
          </div>
          <h1 className="h1-article mt-4 text-ink">{p.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{p.description}</p>
        </header>

        <div className="mt-8">
          <PromptBox label={`Prompt — paste into ${p.bestWith[0]}`} prompt={p.prompt} />
        </div>

        <div className="mt-6">
          <FinancialDisclaimer type="general" />
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">How to use it</h2>
          <ol className="mt-5 space-y-3 text-ink-soft">
            {p.howToUse.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ink">Pro tips</h2>
          <ul className="mt-5 space-y-2.5 text-ink-soft">
            {p.tips.map((t, i) => (
              <li key={i} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /><span>{t}</span></li>
            ))}
          </ul>
          {p.relatedCalc && (
            <p className="mt-5 text-sm text-ink-soft">
              Verify the numbers with CoinMind&rsquo;s{" "}
              <Link href={p.relatedCalc.href} className="font-semibold text-brand hover:underline">{p.relatedCalc.label}</Link>.
            </p>
          )}
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-ink">More finance prompts</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/finance-prompts/${m.slug}`} className="group rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brand/40">
                <p className="text-sm font-bold text-ink">{m.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-ink-faint">{m.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand group-hover:gap-2 transition-all">Open <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
          <Link href="/finance-prompts" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            All {FINANCE_PROMPTS.length} finance prompts <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

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

        <div className="mt-16">
          <AuthorReviewBox />
        </div>
      </div>

      <div className="mb-16" />
    </div>
  );
}
