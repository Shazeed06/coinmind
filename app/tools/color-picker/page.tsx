import type { Metadata } from "next";
import Link from "next/link";
import ColorPicker from "@/components/tools/ColorPicker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Color Picker — HEX, RGB & HSL Converter" },
  description:
    "Free online color picker. Pick a color and get HEX, RGB and HSL values that stay in sync, with one-click copy and instant tints and shades. 100% private.",
  alternates: { canonical: "/tools/color-picker" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/color-picker",
    title: "Color Picker — HEX, RGB & HSL Converter",
    description:
      "Pick a color and convert between HEX, RGB and HSL with one-click copy and instant tints and shades. Runs entirely in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Color picker tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "How do I convert HEX to RGB (or RGB to HEX)?",
    a: "Just type or paste a value into any field. Enter a HEX code like #2563EB and the RGB and HSL fields update instantly; type an RGB value and the HEX code follows. Every format stays in sync, so the tool works as a two-way HEX to RGB and RGB to HEX converter automatically.",
  },
  {
    q: "What is the difference between HEX, RGB and HSL?",
    a: "They describe the same color in different ways. HEX is a six-digit code used in HTML and CSS (#RRGGBB). RGB lists the red, green and blue channels from 0 to 255. HSL uses hue (0–360°), saturation and lightness, which makes it easy to create lighter or darker versions of a color by adjusting one number.",
  },
  {
    q: "What are tints and shades?",
    a: "A tint is your color mixed with white, giving a lighter version; a shade is mixed with black for a darker one. They are handy for building hover states, borders and accessible color scales from a single brand color. Click any swatch to make it the active color.",
  },
  {
    q: "Can I use these colors in CSS?",
    a: "Yes. Copy the HEX, RGB or HSL value and paste it straight into your stylesheet — for example color: #2563EB, or background: rgb(37, 99, 235). All three formats are valid CSS color values.",
  },
  {
    q: "Is the color picker private?",
    a: "Completely. It runs entirely in your browser with JavaScript, so the colors you pick are never uploaded, logged or shared. It also keeps working offline once the page has loaded.",
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
        name: "Color Picker",
        item: `${site.url}/tools/color-picker`,
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
        <span className="text-ink">Color Picker</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Color Picker
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Pick a color and convert between HEX, RGB and HSL in real time &mdash;
          with one-click copy and instant tints and shades, right in your
          browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <ColorPicker />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A color picker lets you choose a color and read its exact code in
            every common format. Click the swatch to open your device&apos;s
            native picker, or type a value into the{" "}
            <strong className="text-ink">HEX</strong>,{" "}
            <strong className="text-ink">RGB</strong> or{" "}
            <strong className="text-ink">HSL</strong> field &mdash; the others
            update instantly, so it doubles as a HEX to RGB and RGB to HEX
            converter. Copy any format with one click and grab ready-made tints
            and shades. It all runs privately in your browser.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>HEX, RGB and HSL explained</h2>
        <p>
          Every color on the web can be written three ways.{" "}
          <strong>HEX</strong> is the six-character code you see most in HTML and
          CSS, like <code>#2563EB</code>, where pairs of digits set the red,
          green and blue channels in base 16. <strong>RGB</strong> writes those
          same channels as numbers from 0 to 255, which is intuitive when you
          think in terms of mixing light. <strong>HSL</strong> &mdash; hue,
          saturation and lightness &mdash; describes color the way designers
          often think, making it simple to keep the same hue while nudging it
          lighter or darker.
        </p>

        <h2>Converting between color formats</h2>
        <p>
          Because all three fields are linked, this tool is also a{" "}
          <strong>HEX to RGB</strong>, <strong>RGB to HEX</strong> and HSL
          converter. Paste a HEX code from a brand guide to read its RGB values
          for a design app, or type an RGB triple to get the HEX for your
          stylesheet. Short three-digit HEX codes like <code>#39F</code> are
          expanded automatically, and any value you copy is always a clean,
          valid CSS color.
        </p>

        <h2>Using tints and shades</h2>
        <p>
          Good interfaces rarely rely on a single flat color. Starting from one
          base, a <strong>tint</strong> (mixed with white) works well for
          backgrounds and subtle hover states, while a <strong>shade</strong>{" "}
          (mixed with black) suits text, borders and pressed buttons. The swatch
          row gives you several lighter and darker steps at a glance &mdash;
          click any one to make it your active color and read its exact code.
          It is a fast way to build a small, consistent palette from a single
          starting point.
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
            href="/tools/qr-code-generator"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              QR Code Generator
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Create custom QR codes for links, text and more.
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
