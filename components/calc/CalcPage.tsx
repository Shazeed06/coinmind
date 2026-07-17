import Link from "next/link";
import { ReactNode } from "react";
import { calculators } from "@/lib/data";
import { site } from "@/lib/site";
import { IconArrow, IconCalculator } from "@/components/icons";

export type Faq = { q: string; a: string };

export default function CalcPage({
  slug,
  title,
  subtitle,
  intro,
  calculator,
  how,
  faqs,
}: {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  calculator: ReactNode;
  how: { heading: string; body: ReactNode };
  faqs: Faq[];
}) {
  const related = calculators.filter((c) => c.live && c.slug !== slug).slice(0, 3);

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
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${site.url}/calculators` },
      { "@type": "ListItem", position: 3, name: title, item: `${site.url}/calculators/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="pt-8 text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-forest">Calculators</Link>
        <span>/</span>
        <span className="text-ink">{title}</span>
      </nav>

      {/* Header */}
      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconCalculator className="h-3.5 w-3.5" /> Free calculator
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          {title}
        </h1>
        <p className="mt-3 text-lg text-ink-soft">{subtitle}</p>
      </header>

      {/* The calculator */}
      <div className="mt-8">{calculator}</div>

      {/* Intro / SEO copy */}
      <section className="mt-14 max-w-3xl">
        <p className="text-ink-soft leading-relaxed">{intro}</p>
      </section>

      {/* How it works */}
      <section className="mt-10 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">{how.heading}</h2>
        <div className="mt-4 text-ink-soft leading-relaxed space-y-4">{how.body}</div>
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

      {/* Related */}
      <section className="mt-16 mb-8">
        <h2 className="font-display text-2xl font-600 text-ink">
          More calculators
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/calculators/${c.slug}`}
              className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
            >
              <h3 className="font-display text-lg font-600 text-ink">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">
                {c.blurb}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                Open <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
