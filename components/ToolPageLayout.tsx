import type { ReactNode } from "react";
import { webApp } from "@/lib/ld";
import { Breadcrumb, Pill } from "@/components/ui";
import { AuthorByline } from "@/components/AuthorByline";
import { FinancialDisclaimer } from "@/components/FinancialDisclaimer";

type ToolPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  howToUse?: { step: string; detail: string }[];
  whenToUse?: { scenario: string; detail: string }[];
  howItWorks?: string;
  tips?: string[];
  faqs?: { q: string; a: string }[];
  relatedTools?: { label: string; href: string }[];
  disclaimerType?: "tax" | "investment" | "general";
};

export function ToolPageLayout({
  title,
  description,
  children,
  howToUse,
  whenToUse,
  howItWorks,
  tips,
  faqs,
  relatedTools,
  disclaimerType = "general",
}: ToolPageLayoutProps) {
  // Tool pages already emit their own BreadcrumbList and FAQPage, so the only
  // node missing once GlobalSeo went away is the entity for the tool itself.
  // The layout does not know its own path (titles do not slugify back to the
  // route reliably: "Rotate & Flip Image" lives at /tools/rotate-image), so the
  // node carries no url and simply describes the page it is embedded in.
  const appJson = webApp(title, null, "Utility", description);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJson) }}
      />
      <section className="section-pad pb-0 bg-white">
        <div className="container-main">
          <div className="max-w-[720px]">
            <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: title }]} />
            <Pill>Free Tool</Pill>
            <h1 className="h1 text-text mt-3 break-words">{title}</h1>
            {/* 16px rather than 12px: this h1 reaches 56px, and the description
                needs to clear its descenders to read as the same unit. */}
            <p className="body text-text-muted mt-4 max-w-[600px]">{description}</p>
            <AuthorByline className="mt-6 pt-6 border-t border-border" />
          </div>
        </div>
      </section>

      {/* The disclaimer carried a full section-pad, so it sat 32px below the
          header but 109px above the tool: the one-line notice looked stranded
          in the middle of the white band. It is a spacer between two blocks of
          the same colour, not its own band, so it now only holds its own gap
          and lets the tool section own the padding below. */}
      <section className="pt-8 bg-white">
        <div className="container-main">
          <div className="max-w-[720px]">
            <FinancialDisclaimer type={disclaimerType} />
          </div>
        </div>
      </section>

      <section className="section-pad pt-8 bg-white">
        <div className="container-main">
          <div className="max-w-[720px]">{children}</div>
        </div>
      </section>

      {howToUse && (
        <section className="section-pad bg-bg-alt">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">How to use this tool</h2>
              <ol className="mt-5 space-y-4">
                {howToUse.map((step, i) => (
                  <li key={i} className="flex gap-3 sm:gap-4">
                    <span className="w-7 h-7 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-text">{step.step}</p>
                      <p className="text-sm text-text-muted mt-1">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {whenToUse && (
        <section className="section-pad bg-white">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">When you&apos;d use this</h2>
              <div className="mt-5 space-y-6">
                {whenToUse.map((scenario, i) => (
                  <div key={i}>
                    <p className="text-base font-semibold text-text">{scenario.scenario}</p>
                    <p className="text-sm text-text-muted mt-1">{scenario.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {howItWorks && (
        <section className="section-pad bg-bg-alt">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">How it works</h2>
              <p className="body text-text-muted mt-5 max-w-[600px]">{howItWorks}</p>
            </div>
          </div>
        </section>
      )}

      {tips && tips.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">Tips & common mistakes</h2>
              <ul className="mt-5 space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="text-brand font-bold shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="section-pad bg-bg-alt">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">Frequently asked questions</h2>
              {/* space-y-1 put a 4px hole between each row and the border-b of
                  the row above it, so the rules floated free of the list rather
                  than dividing it. divide-y draws one rule per boundary with no
                  gap, and border-y closes the list at both ends.

                  py-5 replaces py-4 so questions are 40px apart in the closed
                  state, and the answer moves from 8px to 12px below its
                  question with a prose measure, which is what separates the two
                  now that both are 14px muted-to-dark text. */}
              <div className="mt-5 divide-y divide-border border-y border-border">
                {faqs.map((faq, i) => (
                  <details key={i} className="py-5 group" open={i < 3}>
                    <summary className="flex items-start justify-between gap-4 cursor-pointer text-sm font-medium text-text transition-colors hover:text-brand">
                      <span>{faq.q}</span>
                      <span className="text-text-muted text-lg leading-none mt-0.5 shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-text-muted mt-3 pr-8 max-w-[600px] leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">Related tools</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {relatedTools.map((tool) => (
                  <a key={tool.href} href={tool.href} className="rounded-pill border border-border px-3 py-2 text-sm text-text-muted hover:text-brand hover:border-brand transition-colors">
                    {tool.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
