import type { Metadata } from "next";
import Link from "next/link";
import ImageToPdf from "@/components/tools/ImageToPdf";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Image to PDF — Convert JPG & PNG to PDF Free" },
  description:
    "Free image to PDF converter. Combine JPG and PNG images into one PDF right in your browser — no upload, no sign-up, your files stay private.",
  alternates: { canonical: "/tools/image-to-pdf" },
  openGraph: {
    type: "website",
    url: "https://www.coinmind.in/tools/image-to-pdf",
    siteName: site.name,
    locale: "en_US",
    title: "Image to PDF — Convert JPG & PNG to PDF Free",
    description:
      "Combine JPG and PNG images into a single PDF, entirely in your browser. No upload, no sign-up.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Image to PDF converter",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. This tool runs entirely in your browser using JavaScript. Your images never leave your device, which makes it private and fast — nothing is uploaded, stored, or shared.",
  },
  {
    q: "Which image formats are supported?",
    a: "JPG (JPEG) and PNG are supported. WebP, HEIC and other formats aren't supported for direct embedding — convert them to JPG or PNG first, then add them here.",
  },
  {
    q: "Can I control the order of pages?",
    a: "Yes. After adding images you can reorder them with the up and down buttons, or remove any you don't want. The PDF is built in the exact order shown.",
  },
  {
    q: "Can I choose the page size?",
    a: "Yes. Pick 'Fit to image' for a page that matches each image exactly, or A4 / Letter to place each image on a standard page. You can also set orientation and add a margin.",
  },
  {
    q: "Is there a limit on how many images I can add?",
    a: "There's no fixed limit. Because everything runs locally, very large batches depend on your device's memory — but typical documents of dozens of images work fine.",
  },
  {
    q: "Is it really free?",
    a: "Yes, completely free with no sign-up and no watermark. Create as many PDFs as you like.",
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
        name: "Image to PDF",
        item: `${site.url}/tools/image-to-pdf`,
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
        <span className="text-ink">Image to PDF</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free tool · 100% in your browser
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Image to PDF
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Combine JPG and PNG images into a single PDF. Reorder, choose a page
          size, and download — your files never leave your device.
        </p>
      </header>

      {/* Tool */}
      <div className="mt-8">
        <ImageToPdf />
      </div>

      {/* SEO copy */}
      <section className="mt-14 max-w-3xl">
        <p className="text-ink-soft leading-relaxed">
          Turning photos and scanned images into a single PDF is one of the most
          common everyday document tasks — bundling receipts for an expense
          claim, sending a set of ID photos, or packaging screenshots into one
          shareable file. This free image to PDF converter does it instantly in
          your browser. Add your JPG or PNG images, drag them into the right
          order, pick whether each page should fit the image or sit on a clean
          A4 / Letter sheet, and download a polished PDF in seconds.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          Why convert in the browser?
        </h2>
        <div className="mt-4 text-ink-soft leading-relaxed space-y-4">
          <p>
            Most online converters upload your files to a server, process them
            there, and send back a download. That means your images — which
            might be receipts, contracts, or personal photos — leave your
            computer and sit on someone else&apos;s machine.
          </p>
          <p>
            This tool is different. It uses the{" "}
            <strong className="text-ink">pdf-lib</strong> library running
            directly in your browser, so every image is embedded locally.
            Nothing is uploaded, nothing is stored, and it works even if your
            connection drops after the page loads. That&apos;s faster and far
            more private.
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
