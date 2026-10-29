import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Embeddable Financial Widgets for India - SIP, EMI, FD Calculators",
  description: "Embed free financial calculators on your website. SIP calculator widget, EMI calculator widget, FD calculator widget - free for bloggers, advisors and publishers.",
  alternates: { canonical: `${site.url}/widgets` },
  openGraph: {
    locale: "en_IN",
    title: "Free Financial Calculator Widgets | CoinMind",
    description: "Embed India's best free financial calculators on your website. No login, no API key, just paste the code.",
    url: `${site.url}/widgets`,
  },
};

type WidgetDef = { slug: string; title: string; desc: string; href: string; height: number };

const WIDGETS: WidgetDef[] = [
  { slug: "sip", title: "SIP Calculator Widget", desc: "Let your readers calculate SIP returns without leaving your page.", href: "/calculators/sip", height: 500 },
  { slug: "emi", title: "EMI Calculator Widget", desc: "Home loan, car loan and personal loan EMI - all in one embeddable widget.", href: "/calculators/emi", height: 500 },
  { slug: "fd", title: "FD Calculator Widget", desc: "Fixed deposit maturity and interest calculator for your readers.", href: "/calculators/fd", height: 460 },
  { slug: "income-tax", title: "Income Tax Calculator Widget", desc: "New vs old regime comparison - the most-searched finance tool in India.", href: "/calculators/income-tax", height: 560 },
  { slug: "ppf", title: "PPF Calculator Widget", desc: "Public Provident Fund maturity and tax-free interest for your readers.", href: "/calculators/ppf", height: 500 },
  { slug: "nps", title: "NPS Calculator Widget", desc: "National Pension System corpus and annuity projection.", href: "/calculators/nps", height: 520 },
  { slug: "lumpsum", title: "Lumpsum Calculator Widget", desc: "One-time mutual fund investment growth with compounding.", href: "/calculators/lumpsum", height: 480 },
  { slug: "retirement", title: "Retirement Calculator Widget", desc: "How much to invest now for the retirement corpus your readers need.", href: "/calculators/retirement", height: 540 },
];

// The embed snippet is an iframe PLUS a real <a> link that lands in the host
// page's own HTML. The iframe alone is not a backlink — Google doesn't count an
// iframe src as a link — so the attribution anchor below the iframe is what
// actually earns the backlink when a publisher pastes this code.
function buildEmbed(w: WidgetDef) {
  const name = w.title.replace(/ Widget$/, "");
  return `<iframe src="${site.url}/widgets/${w.slug}" width="100%" height="${w.height}" frameborder="0" loading="lazy" style="border:0;border-radius:12px;max-width:680px;"></iframe>
<p style="font:13px/1.5 system-ui,sans-serif;text-align:center;margin:6px 0;">Free <a href="${site.url}${w.href}" target="_blank" rel="noopener">${name}</a> by CoinMind</p>`;
}

export default function WidgetsPage() {
  return (
    <main className="container-main py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass mb-2">Free Widgets</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Embed Financial Calculators Free</h1>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Add accurate, mobile-friendly financial calculators to your blog, website or landing page. Free forever - just copy and paste the iframe code below.
        </p>
      </div>

      {/* Use cases */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "✍️", title: "Finance bloggers", desc: "Keep readers on your page longer with interactive tools." },
          { icon: "🏢", title: "Financial advisors", desc: "Offer calculators on your website without building them." },
          { icon: "📰", title: "Publishers", desc: "Enhance articles with real-time calculations." },
        ].map((uc) => (
          <div key={uc.title} className="rounded-xl border border-line bg-card p-4">
            <div className="text-2xl mb-2">{uc.icon}</div>
            <h3 className="font-semibold text-ink text-sm">{uc.title}</h3>
            <p className="text-xs text-ink-faint mt-1">{uc.desc}</p>
          </div>
        ))}
      </div>

      {/* Widget listings */}
      <div className="space-y-8">
        {WIDGETS.map((w) => (
          <section key={w.slug} className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-display text-xl text-ink">{w.title}</h2>
            <p className="text-sm text-ink-faint mt-1 mb-4">{w.desc}</p>
            <div className="rounded-xl bg-paper-2 border border-line p-4">
              <p className="text-xs font-semibold text-ink-faint uppercase tracking-wider mb-2">Embed code</p>
              <code className="block text-xs text-ink font-mono break-all whitespace-pre-wrap bg-bg rounded-lg p-3">
                {buildEmbed(w)}
              </code>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Paste the whole snippet — the small credit line below the calculator is a normal link that keeps the widget free. The calculator updates automatically when rates change.
            </p>
          </section>
        ))}
      </div>

      {/* Terms */}
      <div className="mt-10 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-6 text-sm text-amber-900 dark:text-amber-200">
        <h2 className="font-semibold mb-2">Widget terms of use</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li>Free to use on any website - personal, commercial, or nonprofit.</li>
          <li>Do not modify the widget source or remove the CoinMind attribution.</li>
          <li>Do not embed on pages that mislead users about the widget&apos;s origin.</li>
          <li>Widgets are provided as-is; CoinMind is not liable for downstream use.</li>
        </ul>
        <p className="mt-3">
          For custom widgets or white-label licensing, contact us at{" "}
          <a href="mailto:coinmindofficial@gmail.com" className="underline">
            coinmindofficial@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
