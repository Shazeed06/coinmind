import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "CoinMind provides educational information and free tools only — not financial, investment, tax or legal advice. Read our full disclaimer.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { url: "/disclaimer" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-8">
      <header className="pt-14">
        <h1 className="font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Disclaimer
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 14 July 2026</p>
      </header>

      <div className="article mt-10">
        <h2>Educational information only</h2>
        <p>
          The content, calculators and tools on {site.name} are provided for
          general information and educational purposes only. Nothing on this
          website constitutes financial, investment, tax, legal or professional
          advice, and it should not be relied upon as such.
        </p>

        <h2>Not a financial adviser</h2>
        <p>
          {site.name} is not a registered investment adviser, broker, tax
          consultant or financial institution, and we are not registered with or
          regulated by SEBI, RBI, IRDAI, the SEC, the FCA or any other financial
          authority. We do not recommend specific investments, securities, loans
          or products. Before making any financial decision, please consult a
          qualified, licensed professional who can consider your personal
          circumstances.
        </p>

        <h2>Calculators are estimates</h2>
        <p>
          Our calculators use standard formulas and the assumptions you enter.
          Results are illustrative estimates, not guarantees or promises of any
          outcome. Real returns, interest, taxes and charges depend on factors
          outside our control and may differ significantly. Tax rules and
          government rates change; always verify current figures with official
          sources before acting.
        </p>

        <h2>Investments carry risk</h2>
        <p>
          Investments in mutual funds, stocks, crypto and other market
          instruments are subject to market risk. Past performance is not
          indicative of future results, and you may get back less than you
          invested. You are solely responsible for your own financial decisions.
        </p>

        <h2>Third-party tools and links</h2>
        <p>
          Reviews of AI tools and any third-party links, including affiliate
          links, are based on our own opinion and research. We do not control and
          are not responsible for third-party products, pricing or content.
          Pricing shown is indicative and may change — always confirm on the
          official website.
        </p>

        <h2>Accuracy and liability</h2>
        <p>
          While we work hard to keep information accurate and up to date, we make
          no warranties about its completeness, reliability or accuracy. To the
          fullest extent permitted by law, {site.name} accepts no liability for
          any loss or damage arising from your use of, or reliance on, this
          website or its tools.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, contact us at{" "}
          <strong>{site.email}</strong>.
        </p>
      </div>
    </div>
  );
}
