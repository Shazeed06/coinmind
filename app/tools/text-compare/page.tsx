import type { Metadata } from "next";
import Link from "next/link";
import TextCompare from "@/components/tools/TextCompare";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Text Compare — Free Online Diff Checker" },
  description:
    "Free text compare and diff checker. Paste two versions and see added, removed and unchanged lines highlighted instantly. 100% private — runs in your browser.",
  alternates: { canonical: "/tools/text-compare" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/text-compare`,
    title: "Text Compare — Free Online Diff Checker",
    description:
      "Compare two blocks of text line by line and see exactly what changed. Free, private and instant, right in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Text Compare diff checker tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How does the text comparison work?",
    a: "The tool splits both blocks of text into lines and runs a longest common subsequence (LCS) diff — the same idea behind version-control tools. It then shows each line as unchanged, added or removed, and counts the additions and deletions for you.",
  },
  {
    q: "What do the colours mean?",
    a: "Lines that exist only in the changed text are additions, tinted green and marked with a plus. Lines that exist only in the original are removals, tinted pink and marked with a minus. Lines that appear in both are unchanged and shown in plain text.",
  },
  {
    q: "Does it compare word by word or line by line?",
    a: "It compares line by line, which is ideal for code, lists, configuration files and paragraphs separated by line breaks. If two lines differ by even one character, the tool treats the old line as removed and the new line as added.",
  },
  {
    q: "Is there a size limit?",
    a: "There is no hard limit, but because the diff compares every line against every other line, very large documents of many thousands of lines will take longer. For typical documents, code files and lists it is instant.",
  },
  {
    q: "Is my text kept private?",
    a: "Yes. The comparison happens entirely in your browser with JavaScript. Neither block of text is uploaded or stored, so it is safe for confidential drafts, contracts and source code.",
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
        name: "Text Compare",
        item: `${site.url}/tools/text-compare`,
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
        <span className="text-ink">Text Compare</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Text Compare
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Paste two versions of a document and see exactly what changed &mdash;
          added, removed and unchanged lines highlighted side by side.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <TextCompare />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A text compare tool shows the differences between two blocks of
            text. Paste the original into the first box and the changed version
            into the second, and every line is flagged as{" "}
            <strong>added</strong>, <strong>removed</strong> or{" "}
            <strong>unchanged</strong>, with running totals. It uses a
            line-by-line diff and runs entirely in your browser, so your text
            stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>When to compare text</h2>
        <p>
          Spotting what changed between two versions is a constant need. Writers
          compare <strong>drafts</strong> to see an editor&apos;s revisions,
          developers compare <strong>code</strong> before committing, and teams
          compare <strong>contracts</strong> or <strong>policies</strong> to
          confirm exactly which clauses moved. Reading two documents side by
          side by eye is slow and easy to get wrong; a diff does it in an
          instant and never misses a line.
        </p>

        <h2>How the diff is calculated</h2>
        <p>
          The tool uses a <strong>longest common subsequence</strong> algorithm,
          the same technique that powers version-control systems like Git. It
          finds the largest set of lines that appear, in order, in both
          documents &mdash; those are your unchanged lines. Everything left over
          in the original counts as removed, and everything new in the changed
          version counts as added. The result is a clean, ordered view of the
          edit rather than a jumble of mismatched lines.
        </p>

        <h2>Reading the results</h2>
        <p>
          Added lines are tinted green and prefixed with a plus sign; removed
          lines are tinted pink and prefixed with a minus; unchanged lines stay
          neutral. The counters at the top tell you how many lines were added
          and removed at a glance, which is useful for gauging the size of a
          change. Because the comparison is line based, keeping related content
          on its own line gives you the most precise diff.
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
            href="/tools/remove-duplicate-lines"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Remove Duplicate Lines
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Clean a list by deleting repeated lines, with sorting and trimming.
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
