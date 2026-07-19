import type { Metadata } from "next";
import Link from "next/link";
import GpaCalculator from "@/components/tools/GpaCalculator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "GPA & CGPA Calculator — Free Online" },
  description:
    "Free GPA and CGPA calculator. Add courses, credits and grades for a live weighted GPA (4.0) or CGPA (10-point), plus CGPA to percentage. 100% private.",
  alternates: { canonical: "/tools/gpa-calculator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/gpa-calculator",
    title: "GPA & CGPA Calculator — Free Online",
    description:
      "Add courses, credits and grades for a live weighted GPA (4.0) or CGPA (10-point), with a CGPA to percentage helper. Runs privately in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GPA and CGPA calculator",
      },
    ],
  },
};

const faqs = [
  {
    q: "How is GPA calculated?",
    a: "Your GPA is a credit-weighted average of your grade points. Each course's grade point is multiplied by its number of credits, those products are added up, and the total is divided by the total credits. Courses worth more credits therefore influence the result more than lighter ones.",
  },
  {
    q: "What is the difference between GPA and CGPA?",
    a: "GPA usually refers to a single term or semester on a 4.0 scale, common in the US. CGPA (Cumulative Grade Point Average) is the average across all terms, and in India it is normally reported on a 10-point scale. This tool supports both scales with a single toggle.",
  },
  {
    q: "How do I convert CGPA to a percentage?",
    a: "The most widely used approximation in India is percentage = CGPA × 9.5. For example, a CGPA of 8.0 works out to 76%. It is only an estimate — universities such as different state and central boards may publish their own conversion formula, so always check your institution's official method.",
  },
  {
    q: "Which letter grades map to which grade points?",
    a: "On the 4.0 scale this tool uses the common unweighted mapping: A and A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, and so on down to F = 0.0. On the 10-point scale you enter the grade point (0 to 10) your university awarded for each subject.",
  },
  {
    q: "Is my data saved or uploaded anywhere?",
    a: "No. Every calculation happens in your browser with JavaScript. Your courses, credits and grades are never sent to a server, stored or seen by anyone, so it is safe to use for real transcripts.",
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
        name: "GPA & CGPA Calculator",
        item: `${site.url}/tools/gpa-calculator`,
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
        <span className="text-ink">GPA &amp; CGPA Calculator</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          GPA &amp; CGPA Calculator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Add your courses, credits and grades to get a live weighted GPA (4.0
          scale) or CGPA (10-point) &mdash; with a built-in CGPA to percentage
          converter, right in your browser.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <GpaCalculator />
      </div>

      {/* Quick answer */}
      <section className="mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-forest-soft/50 p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Quick answer
          </h2>
          <p className="mt-2 text-ink-soft leading-relaxed">
            A GPA calculator turns your individual course grades into one
            overall score. Pick a grading scale &mdash;{" "}
            <strong className="text-ink">GPA (4.0)</strong> used across US
            colleges, or the Indian{" "}
            <strong className="text-ink">CGPA (10-point)</strong> scale &mdash;
            then add each course with its credits and grade. Your weighted
            average updates instantly, and the CGPA to percentage helper applies
            the popular &times;9.5 formula. Everything runs in your browser, so
            your marks stay private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="mt-12 max-w-3xl article">
        <h2>How GPA and CGPA are calculated</h2>
        <p>
          Both GPA and CGPA are <strong>credit-weighted averages</strong>, not a
          simple mean of your grades. For each course you multiply its grade
          point by the number of credits it carries, add up those figures across
          all courses, and divide by the total credits. This is why a five-credit
          core subject moves your average far more than a one-credit elective.
          The formula is the same whether you work on a 4.0 or a 10-point scale
          &mdash; only the grade points differ.
        </p>

        <h2>GPA (4.0 scale) vs CGPA (10-point scale)</h2>
        <p>
          The <strong>4.0 scale</strong> is standard in the United States, where
          letter grades map to grade points: an A is 4.0, a B is 3.0, a C is 2.0
          and so on, with plus and minus grades adding or subtracting roughly
          0.3. The <strong>10-point CGPA scale</strong> is the norm at most
          Indian universities and technical boards, where each subject is graded
          from 0 to 10. Use the toggle at the top to switch between them; the
          calculator handles the weighting for you either way.
        </p>

        <h2>Converting CGPA to percentage</h2>
        <p>
          Employers and application forms often ask for a percentage rather than
          a CGPA. The most common conversion, popularised by CBSE and used widely
          across India, is <strong>percentage = CGPA &times; 9.5</strong>. So a
          CGPA of 9.2 becomes 87.4%. Keep in mind this is an approximation:
          several universities publish their own official formula, and some
          simply multiply by 10 or apply a subject-wise method. When accuracy
          matters &mdash; for a job application or further study &mdash; confirm
          the exact rule your institution uses.
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
            href="/tools/unit-converter"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Unit Converter
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Convert length, weight, temperature and more instantly.
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
