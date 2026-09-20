import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Disclaimer · ${site.name}` },
  description: `${site.name} is an educational finance tool site. Calculators provide estimates, not financial advice. Not SEBI registered.`,
  alternates: { canonical: `${site.url}/disclaimer` },
};

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Disclaimer",
    url: `${site.url}/disclaimer`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <h1 className="h1 text-text">Disclaimer</h1>
        <p className="body text-text-muted mt-4">
          Please read this disclaimer carefully before using {site.name}.
        </p>

        <div className="mt-8 p-5 rounded-card bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            {site.name} is not a SEBI-registered investment adviser, broker, bank or regulated financial services provider.
          </p>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
            Nothing on this website constitutes financial, investment, tax, legal or professional advice.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="h3 text-text">Educational purpose</h2>
            <p className="body text-text-muted mt-3">
              All calculators, guides, articles and tools on {site.name} are provided for <strong>educational and informational purposes only</strong>. They are designed to help you understand financial concepts, not to replace professional advice.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Calculator outputs are estimates</h2>
            <p className="body text-text-muted mt-3">
              Calculator results are mathematical estimates based on the formula, assumptions and inputs shown. They are not forecasts, guarantees or predictions of actual financial outcomes. Real-world results will differ due to market volatility, changing interest rates, regulatory changes, fees, taxes and individual circumstances.
            </p>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> SIP projections assume constant returns. Actual mutual fund returns vary and are not guaranteed.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Tax calculations are illustrative. Your actual tax depends on your full income, all deductions, and may require professional computation.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Interest rate-based calculators use publicly available rates that may change.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> Retirement and inflation projections depend on long-term assumptions that will not hold exactly.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">No investment advice</h2>
            <p className="body text-text-muted mt-3">
              Nothing on {site.name} should be interpreted as a recommendation to buy, sell or hold any specific financial product, security, mutual fund, insurance policy or investment. We do not recommend specific funds, stocks or financial products.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Past performance is not indicative of future results</h2>
            <p className="body text-text-muted mt-3">
              Any historical returns, rates or figures used in illustrations are informational only. Past performance of any investment is not a reliable indicator of future results.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Consult a professional</h2>
            <p className="body text-text-muted mt-3">
              For decisions that materially affect your finances — tax filing, investment allocation, insurance selection, retirement planning or loan structuring — consult a qualified professional: a SEBI-registered investment adviser, a Chartered Accountant, or another licensed financial professional.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">No liability</h2>
            <p className="body text-text-muted mt-3">
              {site.name} and its operators are not liable for any financial loss, missed opportunity or other consequences arising from reliance on the information or tools on this site. Use the site at your own risk.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Accuracy</h2>
            <p className="body text-text-muted mt-3">
              We work hard to keep our calculators and guides accurate. However, financial rules change frequently. While we update after every relevant regulatory change, there may be brief periods where a rate or rule is not yet updated. Always verify current rates and rules with the official source before making financial decisions. See our <Link href="/sources" className="text-brand underline underline-offset-2">official sources</Link> page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
