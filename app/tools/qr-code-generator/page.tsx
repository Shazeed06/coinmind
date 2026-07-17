import type { Metadata } from "next";
import Link from "next/link";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "QR Code Generator — Free Custom QR Codes" },
  description:
    "Free QR code generator. Create custom QR codes for any URL or text — pick colours, size and error correction, then download as PNG or SVG in your browser.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/qr-code-generator",
    title: "QR Code Generator — Free Custom QR Codes",
    description:
      "Create custom QR codes for any URL or text — choose colours, size and error correction, then download as PNG or SVG. 100% private, made in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "QR Code Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Are my QR codes generated privately?",
    a: "Yes. Everything runs in your browser — the text or URL you enter is turned into a QR code on your own device and is never uploaded, stored or seen by anyone. You can even use the tool offline once the page has loaded.",
  },
  {
    q: "What do the error-correction levels (L, M, Q, H) mean?",
    a: "Error correction lets a QR code still be read when part of it is dirty, damaged or covered by a logo. Level L recovers about 7% of the code, M about 15%, Q about 25% and H about 30%. Higher levels are more robust but pack the data more densely, so the pattern looks busier. M is a good default for screens; choose H if the code will be printed, laminated onto packaging or have a logo placed over it.",
  },
  {
    q: "Should I download the PNG or the SVG?",
    a: "Use the PNG for websites, social posts, slides and messaging apps — it is a ready-to-use image at the exact pixel size you chose. Use the SVG for print and large formats such as posters, banners or business cards: it is a vector file that stays perfectly crisp at any size.",
  },
  {
    q: "Do these QR codes expire or stop working?",
    a: "No. These are static QR codes, meaning the link or text is encoded directly into the pattern. There is no tracking redirect and no account, so the code will keep working forever — but it also cannot be edited later, so double-check the URL before you print it.",
  },
  {
    q: "What can I put in a QR code?",
    a: "Almost anything short enough to fit: a website URL, plain text, an email address, a phone number, an SMS, Wi-Fi login details or a vCard contact. Very long content reduces how reliably the code scans, so keep it concise — for long links, a short URL usually gives a cleaner, easier-to-scan code.",
  },
  {
    q: "Why won't my custom colours scan?",
    a: "Scanners rely on strong contrast between the dark pattern and the light background. Keep the foreground noticeably darker than the background, avoid inverting them (light pattern on a dark background often fails), and leave the quiet-zone margin around the code. If a code won't read, revert to classic black on white.",
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
        name: "QR Code Generator",
        item: `${site.url}/tools/qr-code-generator`,
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
        <span className="text-ink">QR Code Generator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          QR Code Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Turn any link or text into a custom QR code &mdash; pick the size,
          colours and error correction, then download a PNG or SVG. Nothing is
          uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <QrCodeGenerator />
      </div>

      {/* Quick answer intro */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A <strong className="text-ink">QR code generator</strong> converts a
            piece of text &mdash; usually a website link &mdash; into a scannable
            square barcode. Paste your URL or text above, adjust the size and
            colours if you like, then download the code as a{" "}
            <strong className="text-ink">PNG</strong> for screens or an{" "}
            <strong className="text-ink">SVG</strong> for print. It is free, needs
            no sign-up, and the code is built entirely in your browser, so your
            data stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What is a QR code?</h2>
        <p>
          A QR code (short for &ldquo;Quick Response&rdquo; code) is a
          two-dimensional barcode made of black and white squares called
          modules. Unlike a traditional barcode that only stores data in one
          direction, a QR code holds information both horizontally and
          vertically, letting it pack in far more &mdash; a full web address,
          contact details or a chunk of text &mdash; while still scanning in a
          fraction of a second from a phone camera. The three large squares in
          the corners are position markers that tell a scanner how the code is
          oriented, which is why a QR code reads correctly from almost any angle.
        </p>

        <h2>What people use QR codes for</h2>
        <p>
          QR codes bridge the gap between the physical and digital world. Shops
          and restaurants use them to open menus, payment pages and review
          links; marketers add them to flyers, packaging and posters to send
          people straight to a landing page; and businesses put them on
          cards and email signatures to share a website or save a contact
          instantly. Beyond links, a single code can carry Wi-Fi credentials so
          guests join a network without typing a password, a phone number for
          one-tap dialling, or a vCard that adds someone to your contacts. Because
          modern phones scan QR codes with the built-in camera, no separate app
          is needed.
        </p>

        <h2>Error correction, explained</h2>
        <p>
          Every QR code includes built-in <strong>error correction</strong>,
          spare data that lets a scanner rebuild the message even when part of
          the code is scratched, smudged or hidden. You choose how much
          protection to add. <strong>Level L</strong> reserves about 7% of the
          code for recovery and keeps the pattern light and simple.{" "}
          <strong>Level M</strong> (~15%) is the everyday default and works well
          on screens. <strong>Level Q</strong> (~25%) and{" "}
          <strong>Level H</strong> (~30%) add more resilience for printed codes,
          rough environments, or when you want to drop a logo in the middle. The
          trade-off is density: the more recovery you add, the more modules the
          code needs, so it looks busier and benefits from a larger size. When in
          doubt, stick with M for digital use and step up to H for anything
          printed.
        </p>

        <h2>Tips for codes that always scan</h2>
        <p>
          Keep your content short &mdash; a concise URL produces a cleaner, less
          dense code that scans faster from a distance. Preserve strong contrast
          between the foreground and background, and never invert them to a light
          pattern on a dark field, which many scanners reject. Leave the quiet
          margin around the code untouched, and export a large PNG or an SVG when
          the code will be printed so it stays crisp. Finally, always test the
          finished code with a couple of different phones before you publish or
          print it.
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
            href="/tools/compress-image"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Compress Image
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Shrink JPG, PNG and WebP files right in your browser.
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
