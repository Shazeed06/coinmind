import type { ReactNode } from "react";
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
  return (
    <div>
      <section className="section-pad pb-0 bg-white">
        <div className="container-main">
          <div className="max-w-[720px]">
            <Breadcrumb items={[{ label: "Tools", href: "/tools" }, { label: title }]} />
            <Pill>Free Tool</Pill>
            <h1 className="h1 text-text mt-3 break-words">{title}</h1>
            <p className="body text-text-muted mt-3">{description}</p>
            <AuthorByline className="mt-5 pt-5 border-t border-border" />
          </div>
        </div>
      </section>

      <section className="section-pad pt-8 bg-white">
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
              <ol className="mt-6 space-y-4">
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
              <div className="mt-6 space-y-5">
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
              <p className="body text-text-muted mt-4">{howItWorks}</p>
            </div>
          </div>
        </section>
      )}

      {tips && tips.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-main">
            <div className="max-w-[720px]">
              <h2 className="h3 text-text">Tips & common mistakes</h2>
              <ul className="mt-6 space-y-3">
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
              <div className="mt-6 space-y-1">
                {faqs.map((faq, i) => (
                  <details key={i} className="border-b border-border py-4 group" open={i < 3}>
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-text">
                      {faq.q}
                      <span className="text-text-muted text-lg ml-4 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-text-muted mt-2">{faq.a}</p>
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
              <div className="mt-4 flex flex-wrap gap-2">
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
