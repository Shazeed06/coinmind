import type { Metadata } from "next";
import Link from "next/link";
import AiGrammarChecker from "@/components/tools/AiGrammarChecker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "AI Grammar Checker — Fix Grammar Free" },
  description:
    "Free AI grammar checker. Fix grammar, spelling and punctuation instantly and keep your original meaning and tone. A fast, free Grammarly alternative.",
  alternates: { canonical: "/tools/ai-grammar-checker" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/ai-grammar-checker",
    title: "AI Grammar Checker — Fix Grammar Free",
    description:
      "Fix grammar, spelling and punctuation instantly with AI. A fast, free Grammarly alternative that keeps your meaning and tone.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AI Grammar Checker tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this AI grammar checker really free?",
    a: "Yes. You can check as much text as you like, with no sign-up, no account and no watermark. It is a genuinely free alternative to paid proofreading tools like Grammarly.",
  },
  {
    q: "Will it change the meaning or tone of my writing?",
    a: "No. The checker is instructed to fix only grammar, spelling and punctuation while preserving your original meaning, voice and tone. It corrects mistakes rather than rewriting your ideas.",
  },
  {
    q: "What kinds of mistakes can it fix?",
    a: "It catches spelling slips, subject-verb agreement, verb tenses, missing or misused punctuation, capitalisation, run-on sentences and common typos — the everyday errors that make writing look careless.",
  },
  {
    q: "Is my text private?",
    a: "Your text is sent securely to an AI model only to generate the correction and is not stored or shown to anyone else. For highly confidential documents, avoid pasting sensitive personal or financial details into any online tool.",
  },
  {
    q: "Can I use it for essays, emails and work documents?",
    a: "Absolutely. It works well for emails, essays, resumes, cover letters, social posts, product descriptions and business messages. Always give the corrected text a final read before you send or publish it.",
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
        name: "AI Grammar Checker",
        item: `${site.url}/tools/ai-grammar-checker`,
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
        <span className="text-ink">AI Grammar Checker</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free AI tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          AI Grammar Checker
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Fix grammar, spelling and punctuation in seconds &mdash; a fast, free
          Grammarly alternative that keeps your meaning and tone intact.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <AiGrammarChecker />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            Paste your writing into the box above and press{" "}
            <strong className="text-ink">Check grammar</strong>. The AI reads
            your text, corrects every grammar, spelling and punctuation error it
            finds, and returns a clean version &mdash; without changing your
            meaning or tone. Then hit <strong className="text-ink">Copy</strong>{" "}
            to use it anywhere. It is free, needs no sign-up, and works for
            emails, essays, resumes, posts and more.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What an AI grammar checker does</h2>
        <p>
          A grammar checker scans your writing for mistakes a rushed draft
          usually hides: misspellings, missing commas, the wrong verb tense,
          subject&ndash;verb disagreements, doubled words and run-on sentences.
          Traditional checkers rely on fixed rules, so they miss anything that
          does not fit a pattern. An <strong>AI grammar checker</strong> reads
          your sentence the way a human proofreader would &mdash; understanding
          context &mdash; so it catches subtler errors and awkward phrasing
          while leaving your intended meaning untouched.
        </p>

        <h2>How to use it</h2>
        <p>
          Type or paste your text into the box, then click{" "}
          <strong>Check grammar</strong>. Within a moment you will see a
          corrected version below, ready to copy. If your text is already clean,
          the tool tells you that no errors were found. Because it corrects
          rather than rewrites, the result still sounds like you &mdash; only
          more polished. It is ideal for a quick proofread before you send an
          important email, submit an assignment or publish a post.
        </p>

        <h2>A free Grammarly alternative</h2>
        <p>
          Paid writing assistants lock their best fixes behind a subscription.
          This tool is <strong>completely free</strong> with no account, no
          install and no per-check limit, making it a practical everyday
          alternative for students, job seekers, freelancers and small business
          owners. It will not fix facts or judge your ideas, so treat it as a
          proofreader: run your draft through it, then read the corrected text
          once more before you use it &mdash; especially for anything important
          or public.
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
              Count words, characters, sentences and reading time instantly.
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
              Browse every free tool on CoinMind &mdash; AI, PDF, image and text.
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
