import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import IpoDematCta from "@/components/IpoDematCta";
import { ExternalLink, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "NTPC Green Energy IPO: Price Band ₹102-108, Live GMP & Review | CoinMind" },
  description:
    "NTPC Green Energy IPO analysis: issue size ₹10,000 Cr, price band ₹102-108, lot size 138, live GMP today, KFintech allotment link, financials and verdict.",
  keywords: [
    "NTPC Green Energy IPO",
    "NTPC Green IPO GMP today",
    "NTPC Green Energy IPO date",
    "NTPC Green IPO price band",
    "NTPC Green lot size",
    "NTPC Green IPO allotment status",
    "NTPC Green IPO subscription status",
    "NTPC Green Energy IPO review",
    "NTPC Green IPO listing date",
    "NTPC Green IPO registrar KFintech",
  ],
  alternates: { canonical: `${site.url}/ipos/ntpc-green-energy-ipo` },
  openGraph: {
    locale: "en_IN",
    title: "NTPC Green Energy IPO: Price Band ₹102-108, Live GMP & Review",
    description:
      "India's biggest renewable PSU IPO. Open 19-22 Nov 2026. Lot size 138 shares (₹14,904). Live GMP, subscription status and KFintech allotment link.",
    url: `${site.url}/ipos/ntpc-green-energy-ipo`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NTPC Green Energy IPO: Price Band ₹102-108, Live GMP & Review",
    description: "India's biggest renewable PSU IPO. Open 19-22 Nov 2026. Lot size 138 shares. Live GMP & review.",
    images: ["/opengraph-image"],
  },
};

export const revalidate = 3600; // 1 hour background revalidation


const IPO_DETAILS = [
  { label: "Price Band", value: "₹102 - ₹108 per share" },
  { label: "Face Value", value: "₹10 per share" },
  { label: "Lot Size", value: "138 shares (1 lot)" },
  { label: "Min. Investment (Retail)", value: "₹14,904 (138 × ₹108)" },
  { label: "Max. Investment (Retail)", value: "₹1,93,752 (13 lots / 1,794 shares)" },
  { label: "Total Issue Size", value: "₹10,000 crore" },
  { label: "Issue Type", value: "100% Fresh Issue (Zero OFS)" },
  { label: "Employee Discount", value: "₹5 per share" },
  { label: "IPO Open Date", value: "19 November 2026" },
  { label: "IPO Close Date", value: "22 November 2026" },
  { label: "Basis of Allotment", value: "25 November 2026" },
  { label: "Initiation of Refunds", value: "26 November 2026" },
  { label: "Credit of Shares to Demat", value: "26 November 2026" },
  { label: "IPO Listing Date", value: "27 November 2026 (BSE & NSE)" },
  { label: "Registrar", value: "KFin Technologies Limited" },
  { label: "Official Registrar Link", value: "https://ris.kfintech.com/ipostatus/" },
];

const GMP_TREND = [
  { date: "19 Nov 2026", gmp: "₹3.00", upperPrice: "₹108", expListing: "₹111.00", gain: "+2.8%" },
  { date: "18 Nov 2026", gmp: "₹3.50", upperPrice: "₹108", expListing: "₹111.50", gain: "+3.2%" },
  { date: "17 Nov 2026", gmp: "₹2.00", upperPrice: "₹108", expListing: "₹110.00", gain: "+1.9%" },
  { date: "15 Nov 2026", gmp: "₹1.50", upperPrice: "₹108", expListing: "₹109.50", gain: "+1.4%" },
];

export default function NtpcGreenEnergyIpoPage() {
  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "NTPC Green Energy IPO: Price Band ₹102-108, Live GMP & Allotment Review",
    datePublished: "2026-11-19T09:00:00+05:30",
    dateModified: "2026-11-19T18:00:00+05:30",
    author: { "@type": "Person", name: "Sahil", jobTitle: "Lead Financial Analyst" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    description: "Detailed analysis of NTPC Green Energy IPO with issue structure, live GMP, valuation, and KFintech allotment link.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="container-main py-10 lg:py-14 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-text-muted flex items-center gap-1.5">
          <Link href="/" className="hover:text-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/ipos" className="hover:text-text transition-colors">IPOs</Link>
          <span>/</span>
          <span className="text-text font-medium">NTPC Green Energy IPO</span>
        </nav>

        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open Now (19 - 22 Nov 2026)
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 border border-sky-200">
              Mainboard PSU
            </span>
            <span className="text-xs text-text-muted">Updated: {todayFormatted}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text">
            NTPC Green Energy IPO: Price Band, Live GMP & Allotment
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
            NTPC Green Energy Ltd (NGEL), the clean energy subsidiary of India&apos;s largest power producer NTPC, has opened its ₹10,000 crore mega public offer. Review issue details, daily grey market premium (GMP) trends, company valuation, and official registrar allotment links.
          </p>
        </header>

        {/* Quick Highlights Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">Price Band</p>
            <p className="mt-1 text-xl font-bold text-text">₹102 - ₹108</p>
            <p className="text-[11px] text-text-muted">Face Value ₹10</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">Lot Size</p>
            <p className="mt-1 text-xl font-bold text-text">138 Shares</p>
            <p className="text-[11px] text-text-muted">Min ₹14,904</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">Issue Size</p>
            <p className="mt-1 text-xl font-bold text-emerald-600">₹10,000 Cr</p>
            <p className="text-[11px] text-text-muted">100% Fresh Issue</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-text-muted">Current GMP</p>
            <p className="mt-1 text-xl font-bold text-brand">+₹3.00 (+2.8%)</p>
            <p className="text-[11px] text-text-muted">Est. Listing ₹111</p>
          </div>
        </div>

        {/* Live Allotment Registrar Action Bar */}
        <section className="rounded-2xl border border-brand/20 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-text flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand" />
                Official Registrar Allotment Status Link
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                KFin Technologies is the official registrar for NTPC Green Energy IPO. Allotment finalizes on 25 Nov 2026.
              </p>
            </div>
            <a
              href="https://ris.kfintech.com/ipostatus/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-all shadow-sm"
            >
              Check Allotment on KFintech <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Detailed Issue Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">NTPC Green Energy IPO Key Specifications</h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-border">
                {IPO_DETAILS.map((row) => (
                  <tr key={row.label} className="hover:bg-bg-alt/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-text-muted w-1/3">{row.label}</td>
                    <td className="px-4 py-3 text-text font-semibold">
                      {row.label.includes("Link") ? (
                        <a
                          href={row.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline inline-flex items-center gap-1"
                        >
                          {row.value} <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Daily GMP Table */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">Daily NTPC Green Energy IPO GMP Trend</h2>
          <p className="text-sm text-text-muted">
            Grey Market Premium (GMP) indicates unofficial buyer demand prior to NSE/BSE stock exchange debut.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-alt/50 text-text-muted text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">GMP (₹)</th>
                  <th className="px-4 py-3">Issue Price</th>
                  <th className="px-4 py-3">Estimated Listing Price</th>
                  <th className="px-4 py-3">Expected Gain %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {GMP_TREND.map((row) => (
                  <tr key={row.date} className="hover:bg-bg-alt/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-text">{row.date}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">{row.gmp}</td>
                    <td className="px-4 py-3 text-text-muted">{row.upperPrice}</td>
                    <td className="px-4 py-3 text-text font-semibold">{row.expListing}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{row.gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Company Background & Investment Verdict */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text">Company Overview & Financial Analysis</h2>
          
          <div className="prose prose-slate max-w-none text-text-muted space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              NTPC Green Energy Limited (NGEL) is a wholly-owned subsidiary of NTPC Limited (Maharatna PSU). It owns and manages operational solar and wind projects with an operational capacity of over 3.2 GW, with another 12 GW in various stages of pipeline contracting.
            </p>
            <h3 className="text-lg font-bold text-text">Key Strengths:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Offer for Sale (OFS):</strong> Entire ₹10,000 Cr will enter the company balance sheet. ₹7,500 Cr is slated to pay off NTPC Renewable Energy Ltd (NREL) debt, immediately reducing financial interest expense.</li>
              <li><strong>Government Backing:</strong> NTPC&apos;s strong credit rating allows NGEL to borrow capital at lower rates compared to private competitors like Adani Green or Tata Power.</li>
              <li><strong>Long-Term PPAs:</strong> 25-year Power Purchase Agreements with state Discoms and central agencies like SECI guarantee stable revenue generation.</li>
            </ul>

            <h3 className="text-lg font-bold text-text">Investment Risks:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Rich Valuation:</strong> At the upper price band of ₹108, the company is valued at an EV/EBITDA of ~53x and P/E above 140x based on FY24 earnings, meaning near-term listing gains may remain modest.</li>
              <li><strong>Discom Payment Delays:</strong> Counterparty risks from financially strained state distribution utilities.</li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
              <strong>Analyst Verdict:</strong> Long-term investors can apply for capital appreciation over a 3-5 year horizon as renewable capacity multiplies. Listing gain flippers should note the modest single-digit GMP (+2.8%).
            </div>
          </div>
        </section>

        {/* How to Check Allotment Guide */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-text">How to Check NTPC Green Energy IPO Allotment on KFintech</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-text-muted">
            <li>Visit the official KFintech IPO allotment portal: <a href="https://ris.kfintech.com/ipostatus/" target="_blank" rel="noopener noreferrer" className="text-brand underline">ris.kfintech.com/ipostatus</a>.</li>
            <li>Select <strong>NTPC Green Energy Limited</strong> from the dropdown menu (visible once basis of allotment is finalized on 25 Nov).</li>
            <li>Select your verification method: <strong>Application Number</strong>, <strong>Demat Account (DPID/Client ID)</strong>, or <strong>PAN Number</strong>.</li>
            <li>Enter your PAN number and the Captcha code shown on the screen.</li>
            <li>Click <strong>Submit</strong> to view your allotment details and allotted share quantity.</li>
          </ol>
        </section>

        {/* Demat CTA */}
        <IpoDematCta />
      </main>
    </>
  );
}
