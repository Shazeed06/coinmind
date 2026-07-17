import type { Metadata } from "next";
import Link from "next/link";
import CropImage from "@/components/tools/CropImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Crop Image — Free Online Photo Cropper Tool" },
  description:
    "Free image cropper: drag the crop box or type X, Y, width and height, use 1:1, 4:3 or 16:9 presets, then download as JPG, PNG or WebP. All in your browser.",
  alternates: { canonical: "/tools/crop-image" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/crop-image",
    title: "Crop Image — Free Online Photo Cropper Tool",
    description:
      "Crop photos with a draggable box or exact pixel values and aspect-ratio presets. 100% private — nothing is uploaded.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Crop Image tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. The cropper works entirely in your browser using the HTML Canvas API. The image is decoded, cut to your selection and re-encoded on your own device — it is never uploaded or seen by anyone.",
  },
  {
    q: "How do I crop to an exact size?",
    a: "Type the crop box's X and Y position and its width and height into the number fields. Every value is in pixels of the original image, so you can crop to an exact region without dragging.",
  },
  {
    q: "How do the aspect-ratio presets work?",
    a: "Pick 1:1, 4:3 or 16:9 and the crop box locks to that shape — perfect for square profile pictures, standard photos or widescreen thumbnails. Choose 'Free' to crop to any proportions you like.",
  },
  {
    q: "Does cropping reduce the image quality?",
    a: "Cropping itself is lossless — it simply keeps the pixels inside your selection. The only quality change comes from the output format: PNG stays pixel-perfect, while JPG and WebP re-encode at high quality.",
  },
  {
    q: "Can I crop on my phone?",
    a: "Yes. The crop box supports touch, so you can drag it and its corners on a phone or tablet, or use the number fields if you prefer precise values. Everything still runs locally on your device.",
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
        name: "Crop Image",
        item: `${site.url}/tools/crop-image`,
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
        <span className="text-ink">Crop Image</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Crop Image
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Trim a photo to just the part you want &mdash; drag the crop box, snap to a
          1:1, 4:3 or 16:9 ratio, or type exact pixel values, all in your browser
          with nothing uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <CropImage />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">Quick answer</h2>
        <p className="mt-3 rounded-2xl border border-line bg-card p-5 text-ink-soft leading-relaxed">
          To crop an image, upload it above, then drag the{" "}
          <strong className="text-ink">crop box</strong> to reposition it and drag a{" "}
          <strong className="text-ink">corner</strong> to resize &mdash; or type
          exact <strong className="text-ink">X, Y, width and height</strong> values.
          Pick an aspect-ratio preset if you need a fixed shape, then download.
          Nothing is uploaded and there are no watermarks.
        </p>
      </section>

      {/* SEO copy */}
      <section className="mt-10 max-w-3xl article">
        <h2>How cropping an image works</h2>
        <p>
          Cropping keeps a rectangular region of your picture and discards the rest.
          This tool reads the pixels inside your selection and draws them onto a
          hidden HTML canvas the size of the crop, then exports a new file. Nothing is
          rescaled or stretched, so the pixels you keep are identical to the original.
          Because everything happens on your device, the tool is fast, works offline
          and never uploads your image.
        </p>

        <h2>Choosing an aspect ratio</h2>
        <p>
          A <strong>1:1</strong> square suits profile pictures and product photos on
          most social platforms. <strong>4:3</strong> matches classic camera and
          presentation shapes, while <strong>16:9</strong> is ideal for video
          thumbnails, banners and widescreen headers. Lock one of these presets and the
          crop box holds that proportion as you drag; switch to <strong>Free</strong>{" "}
          when you want to cut to any shape at all.
        </p>

        <h2>Drag or type &mdash; whichever is faster</h2>
        <p>
          For a quick visual crop, drag the box and its corners over the preview. For a
          pixel-perfect result &mdash; say a 1080&nbsp;&times;&nbsp;1080 square from a
          specific spot &mdash; type the position and size into the number fields
          instead. If after cropping you also need a smaller pixel size, follow up with
          the <Link href="/tools/resize-image">image resizer</Link>.
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
          More free image tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/resize-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">Resize Image</h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Change width and height in pixels or by percentage, with an aspect lock.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools/rotate-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Rotate &amp; Flip Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Rotate 90&deg; left or right and flip horizontally or vertically.
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
