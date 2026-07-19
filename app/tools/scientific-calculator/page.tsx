import type { Metadata } from "next";
import Link from "next/link";
import ScientificCalculator from "@/components/tools/ScientificCalculator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Scientific Calculator — Free Online" },
  description:
    "Free online scientific calculator with sin, cos, tan, log, ln, powers, roots, factorial, π and e. Keyboard support, runs 100% in your browser.",
  alternates: { canonical: "/tools/scientific-calculator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/scientific-calculator",
    title: "Scientific Calculator — Free Online",
    description:
      "Online scientific calculator with trig, logs, powers, roots and factorial. Keyboard support and Deg/Rad toggle — runs entirely in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scientific Calculator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this scientific calculator free to use?",
    a: "Yes. This online scientific calculator is completely free with no sign-up, no ads in the way and no limits. It runs entirely in your browser, so you can use it as often as you like on your phone, tablet or computer.",
  },
  {
    q: "Does it work on a phone and with a keyboard?",
    a: "Both. The button grid is sized for touch on phones and tablets, and on a desktop you can type directly: digits, + − * / ^ ( ) ! and % all work, Enter evaluates the expression and Escape clears it.",
  },
  {
    q: "What is the difference between Deg and Rad?",
    a: "The Deg/Rad toggle controls how the trigonometry functions read angles. In Deg mode sin, cos and tan treat your input as degrees (so sin(30) = 0.5); in Rad mode they treat it as radians (so sin(π/6) = 0.5). Tap the toggle in the top-left of the display to switch.",
  },
  {
    q: "How do powers, roots and factorial work?",
    a: "Use xʸ (the ^ key) for any power, for example 2^10. The x² key squares the current value, √ takes a square root, and n! calculates the factorial of a non-negative whole number, such as 5! = 120. Percent (%) divides a value by 100, so 50% becomes 0.5.",
  },
  {
    q: "Is my calculation private?",
    a: "Yes. Everything is computed on your own device with JavaScript — no expression is uploaded, stored or sent to a server. The calculator even keeps working offline once the page has loaded.",
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
        name: "Scientific Calculator",
        item: `${site.url}/tools/scientific-calculator`,
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
        <span className="text-ink">Scientific Calculator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Scientific Calculator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          A full online scientific calculator &mdash; trig, logarithms, powers,
          roots and factorial, with keyboard support and a Deg/Rad toggle, right
          in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <ScientificCalculator />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">Quick answer</h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A scientific calculator handles far more than basic arithmetic:
            trigonometry (sin, cos, tan), logarithms (ln and log), powers and
            roots, parentheses and factorials. Type an expression with the
            buttons or your keyboard, press <strong>=</strong>, and the answer
            appears instantly. Everything runs in your browser, so it is free,
            private and works offline once loaded.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>What a scientific calculator can do</h2>
        <p>
          Where a basic calculator stops at add, subtract, multiply and divide,
          an <strong>online scientific calculator</strong> adds the functions
          you need for algebra, trigonometry, statistics and science homework.
          This one covers the trigonometric functions{" "}
          <strong>sin, cos and tan</strong>, natural and base-10 logarithms
          (<strong>ln</strong> and <strong>log</strong>), square roots, any
          power through the <strong>xʸ</strong> key, factorials, the constants{" "}
          <strong>π</strong> and <strong>e</strong>, and full parentheses so you
          can build multi-step expressions and let the calculator respect the
          correct order of operations.
        </p>

        <h2>Order of operations and precedence</h2>
        <p>
          The calculator follows standard mathematical precedence, so you can
          type a whole expression in one go. Powers are evaluated before
          multiplication and division, which come before addition and
          subtraction, and anything inside parentheses is worked out first.
          Because the parser is right-associative for exponents,{" "}
          <strong>2^3^2</strong> is read as 2^(3^2) = 512, exactly as it would be
          on paper. If you ever mistype and the expression cannot be parsed, the
          display simply shows <strong>Error</strong> so you can correct it.
        </p>

        <h2>Degrees, radians and privacy</h2>
        <p>
          Use the <strong>Deg/Rad toggle</strong> in the corner of the display
          to tell the trig functions whether your angles are in degrees or
          radians &mdash; a common source of wrong answers in homework. On a
          computer you can skip the buttons entirely and type with your keyboard:
          Enter evaluates and Escape clears. Every calculation is performed
          locally with JavaScript using a safe expression parser (no{" "}
          <code>eval</code>), so nothing you enter is uploaded or stored, and the
          tool keeps working even without an internet connection.
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
        <h2 className="font-display text-2xl font-600 text-ink">More free tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/tools/unit-converter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Unit Converter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Convert length, weight, temperature and more, instantly.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">All tools</h3>
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
