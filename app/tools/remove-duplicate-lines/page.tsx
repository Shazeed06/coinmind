import type { Metadata } from "next";
import Link from "next/link";
import RemoveDuplicateLines from "@/components/tools/RemoveDuplicateLines";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Remove Duplicate Lines — Free Online Tool" },
  description:
    "Free tool to remove duplicate lines from a list. Options for case-insensitive matching, trimming, sorting and dropping blank lines. Private — runs in browser.",
  alternates: { canonical: "/tools/remove-duplicate-lines" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/remove-duplicate-lines`,
    title: "Remove Duplicate Lines — Free Online Tool",
    description:
      "Delete repeated lines from any list, with case-insensitive matching, trimming, sorting and blank-line removal. Free, private and instant.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Remove Duplicate Lines tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How does it decide which lines are duplicates?",
    a: "The tool keeps the first time a line appears and removes every later line that matches it exactly. By default the match is exact, but you can turn on case-insensitive matching and whitespace trimming to treat near-identical lines as the same.",
  },
  {
    q: "What does case-insensitive matching do?",
    a: "With it on, lines that differ only in capitalisation are treated as duplicates — so Apple, apple and APPLE collapse to a single entry. The first occurrence is kept with its original capitalisation.",
  },
  {
    q: "What is the difference between trim and remove empty lines?",
    a: "Trim whitespace strips leading and trailing spaces and tabs from each line before comparing, so a line with a stray trailing space is seen as a duplicate of the clean one. Remove empty lines deletes blank lines entirely from the output.",
  },
  {
    q: "Can I sort the results?",
    a: "Yes. Turn on Sort output and the remaining unique lines are ordered alphabetically (A to Z). Leave it off to keep the lines in their original order with duplicates removed.",
  },
  {
    q: "Is my list uploaded anywhere?",
    a: "No. All processing happens in your browser with JavaScript. Nothing you paste is uploaded or stored, so it is safe for private lists such as emails, keywords or customer data.",
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
        name: "Remove Duplicate Lines",
        item: `${site.url}/tools/remove-duplicate-lines`,
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
        <span className="text-ink">Remove Duplicate Lines</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Remove Duplicate Lines
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Clean up any list by deleting repeated lines &mdash; with optional
          case-insensitive matching, trimming, sorting and blank-line removal.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <RemoveDuplicateLines />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            This tool removes duplicate lines from a list while keeping the
            first occurrence of each. Paste your lines, and it instantly shows a
            cleaned version plus a count of how many duplicates were removed. Add
            options to <strong>ignore case</strong>, <strong>trim spaces</strong>
            , <strong>sort A&ndash;Z</strong> or drop blank lines. It all runs in
            your browser, so your list stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>When duplicate lines creep in</h2>
        <p>
          Repeated lines sneak into all sorts of lists. Exporting and merging{" "}
          <strong>email lists</strong> often creates duplicates, combining{" "}
          <strong>keyword</strong> research from several sources leaves overlap,
          and copy-pasting <strong>data</strong> from multiple pages piles up
          repeats. Duplicates inflate counts, skew analysis and waste time. This
          tool strips them out in one step, so what you are left with is a clean
          set of unique entries.
        </p>

        <h2>Matching options explained</h2>
        <p>
          Sometimes lines are not identical but should still count as the same.{" "}
          <strong>Case-insensitive</strong> matching treats Gmail and gmail as
          one entry, which is essential for emails and URLs.{" "}
          <strong>Trim whitespace</strong> ignores stray leading or trailing
          spaces that would otherwise make two visually identical lines look
          different to the computer. Combining both catches the maximum number
          of true duplicates while still preserving genuinely distinct lines.
        </p>

        <h2>Sorting and cleaning up</h2>
        <p>
          Turn on <strong>Sort output</strong> to arrange the unique lines
          alphabetically &mdash; handy when you want a tidy, scannable list or
          plan to compare it against another. <strong>Remove empty lines</strong>{" "}
          clears out the blank rows that often separate pasted sections, giving
          you a compact result. Leave every option off and the tool simply
          removes exact duplicates while keeping your original order intact, then
          the Copy button hands the finished list straight back to you.
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
            href="/tools/text-compare"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Text Compare
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              See added, removed and unchanged lines between two versions.
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
