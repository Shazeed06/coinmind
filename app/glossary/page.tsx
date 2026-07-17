import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  GLOSSARY,
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
} from "@/lib/glossary";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Finance & AI Glossary — Terms Explained Simply" },
  description:
    "A plain-English glossary of finance and AI terms — from SIP, EMI and mutual funds to LLMs and AI agents — each explained simply with a real example.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    type: "website",
    url: `${site.url}/glossary`,
    siteName: site.name,
    locale: "en_IN",
    title: "Finance & AI Glossary — Terms Explained Simply",
    description:
      "Clear definitions of key finance and AI terms, from SIP and mutual funds to LLMs and AI agents — each with a simple, real-world example.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CoinMind Finance & AI Glossary",
      },
    ],
  },
};

// One-line intro shown under each category heading.
const CATEGORY_BLURB: Record<GlossaryCategory, string> = {
  Investing: "Funds, returns and the building blocks of growing your money.",
  Tax: "Deductions, indirect taxes and what the taxman actually takes.",
  Credit: "Scores and the numbers lenders judge you by.",
  Banking: "Deposits, loans, insurance and everyday money.",
  AI: "The language of artificial intelligence, explained simply.",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        name: "CoinMind Finance & AI Glossary",
        description:
          "Plain-English definitions of key finance and AI terms, each with a simple example.",
        url: `${site.url}/glossary`,
        hasDefinedTerm: GLOSSARY.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.short,
          url: `${site.url}/glossary/${t.slug}`,
        })),
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
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <span className="text-ink">Glossary</span>
      </nav>

      {/* Hero */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          {GLOSSARY.length} terms explained
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Finance &amp; AI Glossary
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Money and AI are full of jargon. Here every key term is defined in
          plain English &mdash; short enough to grasp in seconds, with a real
          example so it actually sticks.
        </p>
      </header>

      {/* Category jump nav */}
      <nav className="mt-8 flex flex-wrap gap-2.5">
        {GLOSSARY_CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase()}`}
            className="inline-flex items-center rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors"
          >
            {cat}
          </a>
        ))}
      </nav>

      {/* Terms grouped by category */}
      {GLOSSARY_CATEGORIES.map((cat) => {
        const terms = GLOSSARY.filter((t) => t.category === cat);
        if (terms.length === 0) return null;
        return (
          <section key={cat} id={cat.toLowerCase()} className="mt-14 scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h2 className="font-display text-2xl font-600 text-ink">{cat}</h2>
              <span className="text-sm text-ink-faint">
                {terms.length} terms
              </span>
            </div>
            <p className="mt-3 text-ink-soft">{CATEGORY_BLURB[cat]}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {terms.map((t) => (
                <Link
                  key={t.slug}
                  href={`/glossary/${t.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
                >
                  <h3 className="font-display text-lg font-600 text-ink group-hover:text-forest transition-colors">
                    {t.term}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                    {t.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                    Read definition{" "}
                    <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-14 rounded-2xl border border-line bg-paper-2 p-6 text-sm text-ink-soft">
        <strong className="text-ink">A note on accuracy:</strong> these
        definitions are for general education, not personalised financial or tax
        advice. Figures are illustrative and rules can change &mdash; confirm
        anything that affects a real decision.
      </div>
    </div>
  );
}
