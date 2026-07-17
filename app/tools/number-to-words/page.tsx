import type { Metadata } from "next";
import Link from "next/link";
import NumberToWords from "@/components/tools/NumberToWords";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Number to Words Converter — Rupees, Lakh & Crore" },
  description:
    "Free number to words converter for the Indian (Lakh, Crore) and International (Million, Billion) systems. Spell amounts as Rupees or Dollars. 100% private.",
  alternates: { canonical: "/tools/number-to-words" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/number-to-words`,
    title: "Number to Words Converter — Rupees, Lakh & Crore",
    description:
      "Convert any number into words in the Indian or International system, with optional Rupees and Dollars currency wording. Runs entirely in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Number to Words converter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "What is the difference between the Indian and International systems?",
    a: "The Indian system groups digits as Thousand, Lakh and Crore (for example 1,23,000 reads as One Lakh Twenty-Three Thousand). The International system groups in threes as Thousand, Million and Billion (123,000 reads as One Hundred Twenty-Three Thousand). Use the toggle to switch between them instantly.",
  },
  {
    q: "Can I write cheque and invoice amounts in Rupees?",
    a: "Yes. Turn on the Rupees currency mode and the tool spells the amount in the classic cheque format, such as Rupees One Lakh Twenty-Three Thousand and Forty-Five Paise Only. It reads the first two decimal places as paise, which is exactly what banks and accountants expect.",
  },
  {
    q: "How are decimals and paise handled?",
    a: "In plain number mode, digits after the decimal point are read one by one, so 12.05 becomes Twelve point Zero Five. In currency mode the first two decimal places become paise (Rupees) or cents (Dollars), so 99.50 becomes Ninety-Nine and Fifty Paise or Cents.",
  },
  {
    q: "Does it work for very large numbers and zero?",
    a: "Yes. The converter uses exact big-integer maths, so large numbers such as crores and billions stay precise with no rounding errors. Zero simply reads as Zero, and invalid input shows a friendly message rather than an error.",
  },
  {
    q: "Is my data private?",
    a: "Completely. Every conversion happens in your browser with JavaScript. No number you type is uploaded, logged or stored anywhere, so it is safe for confidential financial figures.",
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
        name: "Number to Words",
        item: `${site.url}/tools/number-to-words`,
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
        <span className="text-ink">Number to Words</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Number to Words
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Convert any number into words in the Indian (Lakh, Crore) or
          International (Million, Billion) system &mdash; with optional Rupees
          and Dollars wording for cheques and invoices.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <NumberToWords />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A number-to-words converter spells out a figure in plain English.
            Type a number above, choose the Indian or International system, and
            the words appear instantly. Switch on currency mode to write an
            amount the way it appears on a cheque &mdash; for example{" "}
            <strong>Rupees One Lakh Twenty-Three Thousand Only</strong>. It runs
            entirely in your browser, so confidential figures never leave your
            device.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why write numbers in words?</h2>
        <p>
          Writing an amount in words removes any doubt about what a figure
          means. On <strong>cheques</strong>, the amount in words is the legally
          binding value &mdash; if the digits and the words disagree, banks
          honour the words. The same is true on <strong>invoices</strong>,{" "}
          <strong>contracts</strong> and <strong>legal documents</strong>, where
          spelling out the total prevents a stray comma or an added zero from
          changing the sum. This tool does the conversion for you so you never
          have to second-guess a large amount.
        </p>

        <h2>Indian vs International numbering</h2>
        <p>
          India groups large numbers differently from most of the English-
          speaking world. In the <strong>Indian system</strong>, digits are
          grouped as thousand, lakh (one hundred thousand) and crore (ten
          million), so 12,34,567 reads as Twelve Lakh Thirty-Four Thousand Five
          Hundred Sixty-Seven. The <strong>International system</strong> groups
          in threes &mdash; thousand, million, billion &mdash; so the same
          digits, written 1,234,567, read as One Million Two Hundred
          Thirty-Four Thousand Five Hundred Sixty-Seven. The toggle lets you
          produce either wording from the same number.
        </p>

        <h2>Currency mode for cheques and invoices</h2>
        <p>
          Switch to Rupees and the converter follows the bank-friendly cheque
          format, ending with the word <strong>Only</strong> and reading the
          decimals as paise. Switch to Dollars and it spells the whole units
          followed by <strong>Cents</strong>. Because the decimal handling reads
          exactly two places, an amount like 4999.75 becomes Rupees Four Thousand
          Nine Hundred Ninety-Nine and Seventy-Five Paise Only &mdash; ready to
          copy straight onto a cheque or into accounting software.
        </p>

        <h2>Accurate with large numbers</h2>
        <p>
          Ordinary JavaScript numbers lose precision beyond about fifteen
          digits, which is why some converters mangle very large amounts. This
          tool uses exact big-integer arithmetic, so crores, billions and beyond
          convert without rounding drift. Enter zero and you get Zero; enter
          something that is not a number and you get a clear prompt rather than a
          confusing NaN.
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
              Count words, characters, sentences and reading time as you type.
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
