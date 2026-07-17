import type { Metadata } from "next";
import Link from "next/link";
import AiSummarizer from "@/components/tools/AiSummarizer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Text Summarizer — Free Summary Generator" },
  description:
    "Free AI text summarizer. Paste any article, essay or report and get a clear short, medium or detailed summary in seconds — as text or bullet points.",
  alternates: { canonical: "/tools/ai-summarizer" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/ai-summarizer`,
    title: "AI Text Summarizer — Free Summary Generator",
    description:
      "Paste any long text and get an instant AI summary — short, medium or detailed, as plain text or bullet points. Free, no sign-up.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Text Summarizer tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is the AI text summarizer free to use?",
    a: "Yes. The summarizer is completely free with no sign-up, subscription or usage cap. Paste your text, pick a length and get an instant summary as many times as you like.",
  },
  {
    q: "How long can the text I paste be?",
    a: "You can summarize anything from a couple of paragraphs to a long article or report. For very large documents, summarize a few sections at a time for the sharpest results.",
  },
  {
    q: "What is the difference between Short, Medium and Detailed?",
    a: "Short gives you 2–3 sentences with the core idea, Medium condenses everything into one tight paragraph, and Detailed produces a multi-paragraph overview that keeps more of the supporting points.",
  },
  {
    q: "Can I get the summary as bullet points?",
    a: "Yes. Turn on the Bullet points toggle before summarizing and the AI will return the key takeaways as a clean, scannable list instead of running prose.",
  },
  {
    q: "Is the summary accurate and safe to rely on?",
    a: "The AI preserves the key facts, names and numbers from your text, but it can occasionally miss nuance. Always skim the original for anything important — such as academic, legal or medical detail — before you rely on a summary.",
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
        name: "AI Text Summarizer",
        item: `${site.url}/tools/ai-summarizer`,
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
        <span className="text-ink">AI Text Summarizer</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          AI Text Summarizer
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Paste any article, essay or report and get a clear, accurate summary in
          seconds &mdash; choose short, medium or detailed, as text or bullet
          points.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <AiSummarizer />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">
          Quick answer: what is an AI text summarizer?
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">
          An AI text summarizer is a free tool that reads long content &mdash; an
          article, essay, research paper, email thread or report &mdash; and
          rewrites it as a much shorter version that keeps the key facts and main
          ideas. Paste your text, pick how long you want the summary to be, and
          the AI returns a condensed version in seconds. It&apos;s ideal for
          students revising notes, professionals clearing a busy inbox, and anyone
          who needs the gist of something without reading every word.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>How the AI summarizer works</h2>
        <p>
          When you press <strong>Summarize</strong>, your text is sent to an AI
          language model with a clear instruction: distil the content down to the
          length you chose while preserving the important facts, names and
          numbers. The model identifies the main arguments and supporting points,
          drops repetition and filler, then rewrites everything in plain, readable
          language. You can ask for the result as flowing prose or, with the{" "}
          <strong>Bullet points</strong> toggle, as a scannable list of
          takeaways.
        </p>

        <h2>Choosing the right length</h2>
        <p>
          Pick <strong>Short</strong> when you just need the headline idea in two
          or three sentences &mdash; perfect for deciding whether something is
          worth a full read. <strong>Medium</strong> gives you a single balanced
          paragraph that works well for notes and quick briefings.{" "}
          <strong>Detailed</strong> keeps more of the structure and supporting
          detail across several paragraphs, which is better for study material or
          when you need to reference specifics later.
        </p>

        <h2>Popular ways people use it</h2>
        <p>
          Students use it to condense textbook chapters, lecture transcripts and
          journal articles into revision notes. Professionals summarise reports,
          meeting notes and long email chains before replying. Writers and
          researchers pull the core points out of source material, and readers use
          it to get through newsletters and news stories faster. Because the tool
          works from any text you paste, it fits almost any subject &mdash; from
          finance and law to science and marketing.
        </p>

        <h2>Tips for a better summary</h2>
        <p>
          Paste clean text without navigation menus or unrelated snippets so the
          AI focuses on the real content. For a very long document, summarise it in
          sections rather than all at once &mdash; you&apos;ll get sharper, more
          faithful results. Finally, treat the summary as a fast first pass: if a
          fact really matters, check it against the original before you act on it.
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
