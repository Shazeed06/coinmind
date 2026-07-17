import type { Metadata } from "next";
import Link from "next/link";
import WordCounter from "@/components/tools/WordCounter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Word Counter — Count Words & Characters Free" },
  description:
    "Free online word counter. Get live word, character, sentence and paragraph counts plus reading and speaking time. 100% private — runs in your browser.",
  alternates: { canonical: "/tools/word-counter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/word-counter",
    title: "Word Counter — Count Words & Characters Free",
    description:
      "Live word, character, sentence and paragraph counts with reading and speaking time. 100% private — your text never leaves your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Word Counter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my text uploaded to a server?",
    a: "No. The word counter runs entirely in your browser with JavaScript. Nothing you type or paste is uploaded, stored or seen by anyone — it never leaves your device, so it is safe for private or confidential writing.",
  },
  {
    q: "How are words counted?",
    a: "Words are counted the same way Word processors do: any run of characters separated by spaces, tabs or line breaks counts as one word. Numbers, hyphenated words and symbols surrounded by spaces each count as a single word.",
  },
  {
    q: "What is the difference between characters with and without spaces?",
    a: "Characters (with spaces) counts every character you type, including spaces, tabs and line breaks. Characters (no spaces) ignores all whitespace — this is the figure most social platforms and meta-tag limits refer to.",
  },
  {
    q: "How is reading and speaking time calculated?",
    a: "Reading time assumes an average silent reading speed of about 200 words per minute, and speaking time assumes roughly 130 words per minute for comfortable out-loud delivery. They are estimates to help you plan essays, scripts and presentations.",
  },
  {
    q: "How does the counter define sentences and paragraphs?",
    a: "A sentence is a block of text ending in a full stop, question mark or exclamation mark. A paragraph is any block of text separated by one or more line breaks. Empty lines are ignored so the counts stay accurate.",
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
        name: "Word Counter",
        item: `${site.url}/tools/word-counter`,
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
        <span className="text-ink">Word Counter</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Word Counter
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Count words, characters, sentences and paragraphs as you type &mdash;
          with live reading and speaking time, right in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <WordCounter />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A word counter tells you exactly how many words and characters your
            text contains. Paste or type into the box above and every count
            updates instantly &mdash; words, characters (with and without
            spaces), sentences, paragraphs, plus estimated reading and speaking
            time. It runs entirely in your browser, so your writing stays
            private and works even offline.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why word count matters</h2>
        <p>
          Almost every kind of writing comes with a length target. Students have
          essay word limits, journalists write to a brief, and marketers battle
          strict character counts on ads and search snippets. Knowing your
          count in real time means you can shape a piece to fit its purpose
          instead of guessing &mdash; and edit with confidence rather than
          pasting into a document just to check the total. Because this tool
          updates live as you type, you always know where you stand.
        </p>

        <h2>Common word and character limits</h2>
        <p>
          Different platforms measure length in different ways. Academic{" "}
          <strong>essays</strong> are usually set in words &mdash; a typical
          college essay runs 500 to 650 words, while dissertations reach many
          thousands. Social posts are capped in characters:{" "}
          <strong>tweets</strong> allow 280 characters, and a{" "}
          <strong>LinkedIn</strong> headline gives you 220. For SEO, a page{" "}
          <strong>title tag</strong> should stay under about 60 characters and a{" "}
          <strong>meta description</strong> under roughly 160 so Google
          doesn&apos;t truncate it in the results. Keeping an eye on the
          characters-no-spaces figure helps you land inside these limits.
        </p>

        <h2>Reading and speaking time</h2>
        <p>
          The tool also estimates how long your text takes to consume. Reading
          time is based on an average silent reading pace of about 200 words per
          minute, which is handy for gauging whether a blog post or report is a
          quick skim or a long read. Speaking time uses a slower 130 words per
          minute &mdash; a comfortable pace for a speech, presentation or video
          script. If you&apos;re preparing a five-minute talk, aim for roughly
          650 spoken words and let the counter confirm it.
        </p>

        <h2>Tips for writers and SEOs</h2>
        <p>
          Watch the <strong>top keywords</strong> list to spot when a word is
          overused &mdash; repeating the same term too often reads awkwardly and
          can look like keyword stuffing to search engines. Aim for natural
          variety instead. When you&apos;re trimming to a limit, target the
          longest paragraphs first, and remember that tightening sentences
          usually improves clarity as well as hitting the count. Everything here
          is calculated on your own device, so you can safely paste
          confidential drafts, client work or unpublished manuscripts.
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
            href="/tools/compress-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Compress Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Shrink JPG, PNG and WebP files with a quality slider.
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
