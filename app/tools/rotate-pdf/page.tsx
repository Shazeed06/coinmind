import type { Metadata } from "next";
import Link from "next/link";
import RotatePdf from "@/components/tools/RotatePdf";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Rotate PDF — Turn PDF Pages 90°, 180° Free" },
  description:
    "Free rotate PDF tool. Turn every page or a single page 90, 180 or 270 degrees, entirely in your browser. No upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/rotate-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/rotate-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Rotate PDF — Turn PDF Pages 90°, 180° Free",
    description:
      "Rotate every page or just one by 90, 180 or 270 degrees, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rotate PDF tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Rotation happens entirely in your browser with JavaScript. Your PDF never leaves your device — nothing is uploaded, stored or shared, which keeps sensitive documents private.",
  },
  {
    q: "Can I rotate just one page instead of the whole file?",
    a: "Yes. Choose One page and enter the page number to turn a single page — handy when one scan came in sideways. Choose All pages to rotate the entire document at once.",
  },
  {
    q: "Which way do the pages turn?",
    a: "Rotation is clockwise. 90 degrees turns a portrait page to landscape, 180 degrees flips it upside down, and 270 degrees is the same as turning it 90 degrees anti-clockwise.",
  },
  {
    q: "Does rotating reduce quality or change the text?",
    a: "No. The tool only updates each page's rotation setting, so text stays selectable and images stay sharp. Nothing is re-rendered or re-compressed — the content is untouched.",
  },
  {
    q: "Can I rotate a password-protected PDF?",
    a: "The tool tries to read encrypted PDFs where possible, but files with strong protection may fail to load. If a file can't be read, remove the password first and try again.",
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
        name: "Rotate PDF",
        item: `${site.url}/tools/rotate-pdf`,
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
        <span className="text-ink">Rotate PDF</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free tool · 100% in your browser
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Rotate PDF
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Turn every page or a single page 90, 180 or 270 degrees and download
          the fixed file — your document never leaves your device.
        </p>
      </header>

      {/* Tool */}
      <div className="mt-8">
        <RotatePdf />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            To rotate a PDF, drop your file above, pick a turn of 90, 180 or 270
            degrees, and choose whether to apply it to every page or just one.
            The preview shows the new orientation before you commit. Click rotate
            and download to save the corrected PDF. It all runs in your browser,
            so your document stays private and works even offline once the page
            has loaded.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Why pages end up sideways</h2>
        <p>
          Rotated PDF pages are one of the most common scanning and export
          annoyances. A document fed into a scanner the wrong way, a phone photo
          saved in landscape, or a page merged in from another file can all leave
          you tilting your head to read the result. Rotating fixes the page so it
          displays and prints the right way up, without you having to re-scan or
          rebuild anything.
        </p>

        <h2>Rotate everything or a single page</h2>
        <p>
          Sometimes the whole file is turned the wrong way; sometimes it&apos;s
          just page seven. This tool handles both. Choose{" "}
          <strong>all pages</strong> to spin the entire document in one step, or{" "}
          <strong>one page</strong> and type the page number to correct a single
          stray page while leaving the rest alone. Rotation is clockwise, so 90
          degrees swings a portrait page into landscape and 180 degrees flips an
          upside-down scan back over.
        </p>

        <h2>Private by design</h2>
        <p>
          The pages you need to straighten are often the sensitive ones —
          signed agreements, scanned IDs, statements. Uploading them to an online
          rotator means handing those documents to a server. This tool avoids
          that entirely. Using the <strong>pdf-lib</strong> library in your
          browser, only each page&apos;s rotation flag is changed, locally on
          your machine. Nothing is uploaded, nothing is stored, and the text
          stays fully intact.
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
            href="/tools/organize-pdf"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Organize PDF
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Reorder pages and remove the ones you don&apos;t need.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools/split-pdf"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Split PDF
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Extract a page range or split every page into its own file.
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
