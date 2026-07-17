import type { Metadata } from "next";
import Link from "next/link";
import SplitPdf from "@/components/tools/SplitPdf";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Split PDF — Extract Pages from a PDF Free" },
  description:
    "Free split PDF tool. Extract a page range into a new PDF or split every page into separate files — in your browser. No upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/split-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/split-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Split PDF — Extract Pages from a PDF Free",
    description:
      "Extract a page range or split every page into separate PDFs, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Split PDF tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Splitting happens entirely in your browser with JavaScript. Your PDF never leaves your device — nothing is uploaded, stored or shared, which keeps sensitive documents private.",
  },
  {
    q: "What is the difference between extracting a range and splitting every page?",
    a: "Extracting a range pulls a run of pages — say pages 2 to 5 — into a single new PDF. Splitting every page saves each page as its own one-page PDF, so a 10-page file becomes 10 separate downloads.",
  },
  {
    q: "Why do I get a prompt to allow multiple downloads?",
    a: "When you split every page, the tool downloads one file per page in quick succession. Browsers sometimes ask permission before downloading several files from one page — choose Allow to receive them all.",
  },
  {
    q: "Can I split a password-protected PDF?",
    a: "The tool tries to read encrypted PDFs where possible, but files with strong protection may fail to load. If a file can't be read, remove the password first and try again.",
  },
  {
    q: "Will the extracted pages lose any quality?",
    a: "No. Pages are copied as-is into the new document, so text, images and formatting stay exactly the same. Nothing is re-rendered, re-compressed or downgraded.",
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
        name: "Split PDF",
        item: `${site.url}/tools/split-pdf`,
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
        <span className="text-ink">Split PDF</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free tool · 100% in your browser
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Split PDF
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Extract a page range into a new PDF, or split every page into its own
          file — your document never leaves your device.
        </p>
      </header>

      {/* Tool */}
      <div className="mt-8">
        <SplitPdf />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            To split a PDF, drop your file above and choose how you want it
            divided. Enter a first and last page to pull a range — for example
            pages 2 to 5 — into a single new PDF, or click split into single
            pages to save every page as its own file. Everything runs in your
            browser, so your document stays private and works even offline once
            the page has loaded.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>When splitting a PDF helps</h2>
        <p>
          A single PDF often holds far more than you need to share. A scanned
          bundle might contain one contract, one invoice and three receipts;
          a report might have a confidential appendix you&apos;d rather keep
          back. Splitting lets you send just the pages that matter instead of
          the whole file — cleaner for the recipient and safer for you. Because
          this tool copies pages exactly as they are, the extracted PDF is
          identical to the original in quality and layout.
        </p>

        <h2>Extract a range or split every page</h2>
        <p>
          There are two common jobs, and this tool covers both. Use{" "}
          <strong>extract a page range</strong> when you want a continuous slice
          — chapters 3 to 4, or the middle of a scanned stack — bundled into one
          new document. Use <strong>split into single pages</strong> when you
          need each page on its own, such as separating individually signed
          forms or breaking a merged batch back into its parts. The single-page
          option downloads one file per page, so a ten-page PDF hands you ten
          neat one-page PDFs.
        </p>

        <h2>Private by design</h2>
        <p>
          PDFs frequently carry sensitive information — bank statements, medical
          records, agreements. Uploading them to an online splitter means
          trusting a server with those documents. This tool avoids that
          entirely. Using the <strong>pdf-lib</strong> library running in your
          browser, pages are read and copied locally on your own machine.
          Nothing is uploaded, nothing is stored, and the split works even
          offline once the page has loaded.
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
          More PDF tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/merge-pdf"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Merge PDF
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Join several PDFs back into a single document.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools/organize-pdf"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Organize PDF
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Reorder pages and drop the ones you don&apos;t need.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
