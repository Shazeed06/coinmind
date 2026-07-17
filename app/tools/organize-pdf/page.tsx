import type { Metadata } from "next";
import Link from "next/link";
import OrganizePdf from "@/components/tools/OrganizePdf";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Organize PDF — Reorder & Delete PDF Pages Free" },
  description:
    "Free organize PDF tool. Reorder pages, remove the ones you don't need and rebuild a clean PDF, in your browser. No upload, no sign-up, private.",
  alternates: { canonical: "/tools/organize-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/organize-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Organize PDF — Reorder & Delete PDF Pages Free",
    description:
      "Reorder pages and remove the ones you don't need, then rebuild a clean PDF — entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Organize PDF tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is my PDF uploaded anywhere?",
    a: "No. Reordering and removing pages happens entirely in your browser with JavaScript. Your PDF never leaves your device — nothing is uploaded, stored or shared, which keeps sensitive documents private.",
  },
  {
    q: "How do I reorder the pages?",
    a: "Each page appears as a row in a list. Use the up and down buttons to move a page earlier or later. The new PDF is built in exactly the order shown, top to bottom.",
  },
  {
    q: "Can I get a removed page back?",
    a: "Yes. Removing a page only marks it to be left out — it isn't deleted from your original. Click Undo on that row to restore it any time before you build the new PDF.",
  },
  {
    q: "Do I have to keep at least one page?",
    a: "Yes. A PDF needs at least one page, so the build button stays disabled until at least one page is kept. Restore a page if you've removed them all.",
  },
  {
    q: "Will reordering change the page quality?",
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
        name: "Organize PDF",
        item: `${site.url}/tools/organize-pdf`,
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
        <span className="text-ink">Organize PDF</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free tool · 100% in your browser
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Organize PDF
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Reorder pages, remove the ones you don&apos;t need, and rebuild a clean
          PDF — your document never leaves your device.
        </p>
      </header>

      {/* Tool */}
      <div className="mt-8">
        <OrganizePdf />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            To organize a PDF, drop your file above to see every page as a row.
            Use the up and down buttons to reorder pages and the remove button to
            drop the ones you don&apos;t want — changes are easy to undo. When the
            order looks right, click build new PDF to download the rebuilt file.
            It all runs in your browser, so your document stays private and works
            even offline once the page has loaded.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>Get pages into the right order</h2>
        <p>
          Merged and scanned PDFs rarely arrive in perfect shape. A cover page
          lands at the back, two sections are swapped, or a blank scan and a
          duplicate sneak in. Organizing lets you set the running order and drop
          the clutter so the finished document reads exactly as intended —
          without opening heavy desktop software or paying for a subscription.
        </p>

        <h2>Reorder and remove in one place</h2>
        <p>
          Every page shows up as a numbered row. Move a page with the{" "}
          <strong>up and down</strong> buttons to slot it where it belongs, and
          use <strong>remove</strong> to leave a page out of the final file. A
          removed page is only marked, never deleted from your original, so a
          single click restores it if you change your mind. When you build the
          new PDF, the tool copies just the pages you kept, in the order you set.
        </p>

        <h2>Private by design</h2>
        <p>
          The documents worth tidying are often the private ones — contracts,
          reports, records. Uploading them to an online editor means trusting a
          server with those files. This tool avoids that entirely. Using the{" "}
          <strong>pdf-lib</strong> library in your browser, pages are copied and
          reassembled locally on your own machine. Nothing is uploaded, nothing
          is stored, and the rebuild works even offline once the page has loaded.
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
          <Link
            href="/tools/rotate-pdf"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Rotate PDF
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Turn every page or a single page 90, 180 or 270 degrees.
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
