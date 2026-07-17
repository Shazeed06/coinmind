import type { Metadata } from "next";
import Link from "next/link";
import AiParaphraser from "@/components/tools/AiParaphraser";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Paraphrasing Tool — Free Rewriter" },
  description:
    "Free AI paraphrasing tool. Instantly rewrite and rephrase any text in seven styles — fluent, formal, casual, simple, shorten or expand. No sign-up.",
  alternates: { canonical: "/tools/ai-paraphraser" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/ai-paraphraser",
    title: "AI Paraphrasing Tool — Free Rewriter",
    description:
      "Rewrite and rephrase any text in seconds with AI. Choose from fluent, formal, casual, simple, shorten or expand styles — free and no sign-up.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Paraphraser tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this AI paraphrasing tool free?",
    a: "Yes. You can rewrite as much text as you like, in any style, without signing up or paying. It is completely free to use.",
  },
  {
    q: "Will the rewritten text keep my original meaning?",
    a: "That is the goal. The tool is instructed to preserve your meaning while changing the wording and phrasing. Always read the result and tweak anything that drifts from what you intended, especially for technical or factual writing.",
  },
  {
    q: "What is the difference between the styles?",
    a: "Standard gives a clean, natural rewrite. Fluent smooths and polishes it. Formal makes it professional, while Casual makes it relaxed and conversational. Simple uses plain English, Shorten makes it more concise, and Expand adds more detail and length.",
  },
  {
    q: "Can I use this to avoid plagiarism?",
    a: "Paraphrasing changes wording, but genuine, original work still needs your own ideas and proper citation of any sources. Use this tool to improve clarity and phrasing, not to pass off someone else's work as your own.",
  },
  {
    q: "Is my text stored or shared?",
    a: "Your text is sent securely to the AI only to generate the rewrite and is not published or shown to other users. Avoid pasting passwords or sensitive personal data into any online tool as a general precaution.",
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
        name: "AI Paraphraser",
        item: `${site.url}/tools/ai-paraphraser`,
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
        <span className="text-ink">AI Paraphraser</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          AI Paraphraser
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Reword and rephrase any text in seconds. Pick a style &mdash; fluent,
          formal, casual, simple, shorten or expand &mdash; and let AI rewrite it
          while keeping your meaning.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <AiParaphraser />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-600 text-ink">Quick answer</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            An AI paraphraser rewrites your text in different words while keeping
            the original meaning. Paste your text above, choose a style, and click{" "}
            <strong className="text-ink">Paraphrase</strong>. In a few seconds you
            get a fresh version you can copy. It is free, needs no sign-up, and
            works for essays, emails, articles, captions and more.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What is an AI paraphrasing tool?</h2>
        <p>
          A paraphrasing tool, also called a rewriter or article spinner, takes a
          piece of writing and expresses the same ideas in a different way. Instead
          of simply swapping a few words for synonyms, a modern{" "}
          <strong>AI paraphraser</strong> understands the whole sentence and
          rebuilds it &mdash; changing structure, phrasing and tone while protecting
          the underlying meaning. That makes the result read naturally rather than
          like a thesaurus was let loose on your text.
        </p>

        <h2>When should you paraphrase?</h2>
        <p>
          Rewriting is useful in dozens of everyday situations. Students use it to
          restate research in their own voice and to tidy up rough drafts. Writers
          and marketers use it to refresh old content, adapt one message for
          different channels, or beat writer&apos;s block. Professionals lean on it
          to make an email sound more formal, soften a blunt message, or trim a long
          paragraph down to the essentials. Because you control the style, the same
          tool handles all of these jobs.
        </p>

        <h2>How to get the best results</h2>
        <p>
          Start with clear input: the tidier your original text, the better the
          rewrite. Choose the style that matches your goal &mdash; use{" "}
          <strong>Formal</strong> for reports, <strong>Simple</strong> to explain
          something plainly, <strong>Shorten</strong> to cut length, and{" "}
          <strong>Expand</strong> when you need more depth. Always read the output
          and edit anything that changes your intended meaning, and cite your
          sources when you are paraphrasing someone else&apos;s work. Paraphrasing
          improves clarity and phrasing, but the ideas and honesty still have to be
          yours.
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
            href="/tools/word-counter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Word Counter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Count words, characters and reading time as you type.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">All tools</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Browse every free tool on CoinMind, from PDF utilities to AI helpers.
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
