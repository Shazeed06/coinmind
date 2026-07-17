import type { Metadata } from "next";
import Link from "next/link";
import AiBusinessNameGenerator from "@/components/tools/AiBusinessNameGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Business Name Generator — Startup Name Ideas" },
  description:
    "Free AI business name generator. Describe your idea, pick a style, and get 15 creative, brandable startup name ideas in seconds. No sign-up.",
  alternates: { canonical: "/tools/ai-business-name-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/ai-business-name-generator`,
    title: "AI Business Name Generator — Free",
    description:
      "Describe your idea, pick a style, and get 15 creative, brandable startup name ideas in seconds — free and instant.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Business Name Generator",
      },
    ],
  },
};

const faqs = [
  {
    q: "How does the AI business name generator work?",
    a: "You describe your business in a few words, optionally add an industry, and choose a style. The AI reads that brief and returns 15 brandable name ideas tailored to it. Generate as many fresh batches as you like — each run gives a different set.",
  },
  {
    q: "Is the business name generator free?",
    a: "Yes, it's completely free with no sign-up, no credit card and no limit on how many names you can generate. Describe your idea and hit Generate as often as you need.",
  },
  {
    q: "Can I use these names for my company?",
    a: "The names are creative starting points. Before you commit, always check that the name is available as a domain, isn't trademarked, and can be registered as a company in your country. Availability is not verified by this tool.",
  },
  {
    q: "What makes a good business name?",
    a: "A strong name is short, easy to say and spell, memorable, and hints at what you do without boxing you in. It should have an available domain (ideally .com) and social handles, and avoid trademark clashes. Aim for something that still fits if your business grows beyond its first product.",
  },
  {
    q: "How do I get better name suggestions?",
    a: "Add detail. Instead of 'a coffee shop', try 'a specialty coffee shop for remote workers with fast wifi'. Mention your audience, your vibe and any keywords you love. Then experiment with the style options — Playful, Premium, Techy and the rest each pull the results in a different direction.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Business Name Generator",
        item: `${site.url}/tools/ai-business-name-generator`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-forest">
          Tools
        </Link>
        <span>/</span>
        <span className="text-ink">AI Business Name Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          AI Business Name Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Describe your idea, pick a style, and get 15 creative, brandable name
          ideas in seconds &mdash; free, instant and made for startups.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <AiBusinessNameGenerator />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6">
        <h2 className="font-display text-xl font-600 text-ink">
          Quick answer
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          To name your business, describe what you do in a sentence or two, add
          your industry and choose a naming style, then let the AI suggest 15
          brandable options. Shortlist the ones that are short, easy to say and
          memorable, then check that the domain, trademark and company name are
          all available before you decide.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl article">
        <h2>How to name your business</h2>
        <p>
          Your business name is the first thing customers hear and the label
          they&apos;ll repeat to friends, so it&apos;s worth getting right. The
          best names are short, easy to pronounce, easy to spell and hint at
          what you do &mdash; without pinning you to a single product forever. An
          AI name generator is the fastest way to break through a blank page: it
          gives you dozens of angles you&apos;d never brainstorm alone, which you
          can then refine into a shortlist.
        </p>

        <h2>Tips for a memorable brand name</h2>
        <p>
          Keep it <strong>short</strong> &mdash; one or two syllables are easiest
          to remember and fit better on a logo. Make it <strong>easy to say and
          spell</strong> so word-of-mouth actually works and people can find you
          online. Aim for names that are <strong>distinctive</strong> rather than
          descriptive: coined or unexpected words (think invented or blended
          terms) trademark more easily and stand out in a crowded market. Avoid
          hard-to-type spellings, numbers and hyphens, and steer clear of names
          that lock you into one city or product if you plan to grow.
        </p>

        <h2>Check before you commit</h2>
        <p>
          Once you have a favourite, run three checks. First, the{" "}
          <strong>domain</strong>: a matching .com still signals trust, though
          modern extensions work too. Second, the <strong>trademark</strong>:
          search your national trademark register to avoid a costly clash later.
          Third, <strong>social handles</strong> and company registration, so
          your name is consistent everywhere. This tool sparks ideas &mdash; the
          availability checks are the step that turns an idea into a brand you can
          actually own.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-link */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          More free tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/ai-assistant"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              AI Money Assistant
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Ask anything about saving, investing, taxes and AI tools &mdash;
              free and instant.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              All tools
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Browse every free, private, browser-based tool on CoinMind.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Browse &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
