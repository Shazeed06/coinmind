import type { Metadata } from "next";
import Link from "next/link";
import MergePdf from "@/components/tools/MergePdf";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Merge PDF — Combine PDF Files Online Free" },
  description:
    "Free merge PDF tool. Combine multiple PDF files into one, reorder and remove pages, entirely in your browser — no upload, no sign-up, fully private.",
  alternates: { canonical: "/tools/merge-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/merge-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Merge PDF — Combine PDF Files Online Free",
    description:
      "Free online tool to combine multiple PDF files into one document, entirely in your browser — reorder pages, then download. No upload, no sign-up, 100% private.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Merge PDF tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my PDFs uploaded anywhere?",
    a: "No. Merging happens entirely in your browser with JavaScript. Your PDFs never leave your device — nothing is uploaded, stored, or shared, which keeps sensitive documents private.",
  },
  {
    q: "Can I reorder the files before merging?",
    a: "Yes. Each PDF appears in a list with its page count. Use the up and down buttons to set the order, or remove any file you don't want. The merged PDF follows the order shown.",
  },
  {
    q: "What about password-protected PDFs?",
    a: "The tool tries to read encrypted PDFs where possible, but files with strong protection or unusual encoding may fail to load. If a file can't be read, remove the protection first and try again.",
  },
  {
    q: "Is there a limit on the number or size of PDFs?",
    a: "There's no fixed limit. Since everything runs locally, very large files depend on your device's available memory, but merging several ordinary documents is quick and reliable.",
  },
  {
    q: "Will the quality change after merging?",
    a: "No. Pages are copied as-is into the new document, so text, images, and formatting stay exactly the same. Nothing is re-compressed or downgraded.",
  },
  {
    q: "Is it free to use?",
    a: "Yes, completely free with no sign-up and no watermark. Merge as many PDFs as you need.",
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
        name: "Merge PDF",
        item: `${site.url}/tools/merge-pdf`,
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
        <span className="text-ink">Merge PDF</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free tool · 100% in your browser
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Merge PDF
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Combine multiple PDF files into one. Reorder, remove, and download —
          your files never leave your device.
        </p>
      </header>

      {/* Tool */}
      <div className="mt-8">
        <MergePdf />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl">
        <p className="text-ink-soft leading-relaxed">
          Combining several PDFs into one file makes them far easier to send,
          print, and archive — whether you&apos;re stitching together a contract
          and its annexes, joining scanned pages, or bundling invoices for the
          month. This free merge PDF tool does it instantly in your browser. Add
          your files, arrange them in the order you want, and download a single,
          clean PDF in seconds.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          Private by design
        </h2>
        <div className="mt-4 text-ink-soft leading-relaxed space-y-4">
          <p>
            PDFs often carry sensitive information — statements, agreements, IDs.
            Uploading them to an online converter means trusting a server with
            those documents. This tool avoids that entirely.
          </p>
          <p>
            Using the <strong className="text-ink">pdf-lib</strong> library
            running in your browser, every page is copied and combined locally on
            your own machine. Nothing is uploaded, nothing is stored, and the
            merge works even offline once the page has loaded — private, fast,
            and free.
          </p>
        </div>
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
    </div>
  );
}
