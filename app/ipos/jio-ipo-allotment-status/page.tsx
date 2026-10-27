import type { Metadata } from "next";
import Link from "next/link";
import IpoDematCta from "@/components/IpoDematCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Jio IPO Allotment Status 2026: How to Check | CoinMind" },
  description:
    "Check Jio Platforms IPO allotment status online. Allotment expected 26 Oct 2026. Step-by-step guide via BSE and the registrar using PAN, application number or demat - plus listing on 28 Oct.",
  keywords: [
    "Jio IPO allotment status",
    "Jio IPO allotment date",
    "Jio Platforms IPO allotment",
    "Jio IPO allotment check online",
    "how to check Jio IPO allotment",
    "Jio IPO allotment status BSE",
    "Reliance Jio IPO allotment",
    "Jio IPO listing date",
  ],
  alternates: { canonical: `${site.url}/ipos/jio-ipo-allotment-status` },
  openGraph: {
    locale: "en_IN",
    title: "Jio IPO Allotment Status 2026: How to Check Online (26 Oct)",
    description:
      "Step-by-step guide to check Jio Platforms IPO allotment status on BSE and the registrar. Allotment 26 Oct, listing 28 Oct 2026.",
    url: `${site.url}/ipos/jio-ipo-allotment-status`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jio IPO Allotment Status 2026: How to Check Online (26 Oct)",
    description:
      "Step-by-step guide to check Jio Platforms IPO allotment status on BSE and the registrar. Allotment 26 Oct, listing 28 Oct 2026.",
  },
};

const LAST_UPDATED = "18 October 2026";

const TIMELINE = [
  { label: "IPO Opens", date: "21 Oct 2026", done: false },
  { label: "IPO Closes", date: "23 Oct 2026", done: false },
  { label: "Allotment Finalised", date: "26 Oct 2026", done: false },
  { label: "Refunds / Unblock ASBA", date: "27 Oct 2026", done: false },
  { label: "Shares Credited to Demat", date: "27 Oct 2026", done: false },
  { label: "Listing (BSE + NSE)", date: "28 Oct 2026", done: false },
];

const BSE_STEPS = [
  "Go to the BSE allotment page: bseindia.com → Investors → Status of Issue Application (or search \"BSE IPO allotment\").",
  "Under Issue Type, select \"Equity\".",
  "In the Issue Name dropdown, select \"Jio Platforms Limited\" (appears once allotment is finalised).",
  "Enter your Application Number, or PAN.",
  "Verify the captcha and click \"Search\" to see how many shares were allotted.",
];

const REGISTRAR_STEPS = [
  "Open the official registrar's IPO allotment page (the registrar is named in the Jio RHP and on the BSE issue page).",
  "Select the Jio Platforms IPO from the company dropdown.",
  "Choose to search by PAN, Application Number, or Demat/Client ID.",
  "Enter your details and submit to view your allotment status.",
];

const FAQS = [
  {
    q: "What is the Jio IPO allotment date?",
    a: "The Jio Platforms IPO allotment is expected to be finalised on 26 October 2026, after the subscription window closes on 23 October. Shares are credited to demat accounts around 27 October and the stock lists on 28 October 2026.",
  },
  {
    q: "How can I check my Jio IPO allotment status?",
    a: "You can check on the BSE website (Investors → Status of Issue Application) or on the official registrar's IPO page, using your PAN, application number, or demat/client ID. The Jio issue appears in the dropdown only after allotment is finalised on 26 Oct.",
  },
  {
    q: "What happens if I don't get the Jio IPO allotment?",
    a: "If you are not allotted shares, the blocked amount (ASBA) in your bank account is released/unblocked automatically, usually within a day of allotment. For UPI applications, the mandate is revoked.",
  },
  {
    q: "When will Jio IPO shares be credited and listed?",
    a: "Allotted shares are typically credited to your demat account one day before listing (around 27 October 2026). Jio Platforms is expected to list on both BSE and NSE on 28 October 2026.",
  },
  {
    q: "How is Jio IPO allotment decided if oversubscribed?",
    a: "For an oversubscribed retail category, allotment is done by a computerised lottery - every valid applicant has an equal chance of getting the minimum one lot, regardless of how many lots were applied for. Applying from multiple different PANs (e.g. family members) increases overall chances.",
  },
];

export default function JioIpoAllotmentStatusPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jio IPO Allotment Status 2026 - How to Check Online",
    description:
      "Step-by-step guide to check Jio Platforms IPO allotment status on BSE and the registrar. Allotment 26 Oct 2026, listing 28 Oct 2026.",
    url: `${site.url}/ipos/jio-ipo-allotment-status`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/jio-ipo-allotment-status`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to check Jio IPO allotment status on BSE",
    step: BSE_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s,
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <Link href="/ipos/reliance-jio-ipo" className="hover:text-brand">Jio IPO</Link>
            <span>›</span>
            <span>Allotment Status</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            Jio IPO Allotment Status 2026
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            The Reliance Jio Platforms IPO allotment is expected to be finalised on <strong className="text-text">26 October 2026</strong>. Here&apos;s exactly how to check your allotment online via BSE and the registrar, plus the full timeline to listing on 28 Oct.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Status banner */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm text-amber-800">
              <strong>Status:</strong> The IPO opens on 21 Oct and closes 23 Oct 2026. Allotment status is <strong>not available yet</strong> - it goes live after the basis of allotment is finalised on <strong>26 October 2026</strong>. Bookmark this page and check back then.
            </p>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Jio IPO Allotment &amp; Listing Timeline</h2>
            <ol className="relative border-l border-border ml-2">
              {TIMELINE.map((t) => (
                <li key={t.label} className="ml-4 pb-5 last:pb-0">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-brand border-2 border-white" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="text-sm font-medium text-text">{t.label}</p>
                    <p className="text-sm text-text-muted">{t.date}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-2">Dates are tentative and may change per the final RHP / exchange schedule.</p>
          </div>

          {/* Method 1: BSE */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 1: Check on the BSE Website</h2>
            <ol className="space-y-2">
              {BSE_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Method 2: Registrar */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 2: Check on the Registrar&apos;s Website</h2>
            <ol className="space-y-2">
              {REGISTRAR_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-3">The registrar handles IPO applications and allotment. The official registrar for the Jio IPO is named in the RHP and on the BSE issue page - always use that official link rather than any third-party site.</p>
          </div>

          {/* Method 3: Broker */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 3: Check in Your Broker App</h2>
            <p className="text-sm text-text-muted">
              Most brokers (Zerodha, Groww, Angel One, Upstox, etc.) show your IPO application and allotment result in their IPO/Orders section once allotment is finalised. You will also receive an SMS/email from CDSL/NSDL when shares are credited to your demat account.
            </p>
          </div>

          {/* What next */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <h2 className="font-bold text-sky-800 mb-2">✅ If you are allotted</h2>
              <ul className="space-y-1.5 text-sm text-sky-800">
                <li className="flex gap-2"><span>•</span>Shares are credited to your demat ~27 Oct (one day before listing).</li>
                <li className="flex gap-2"><span>•</span>The blocked amount is debited for the allotted shares only.</li>
                <li className="flex gap-2"><span>•</span>You can hold or sell on listing day (28 Oct) based on the listing price.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-bold text-red-800 mb-2">❌ If you are not allotted</h2>
              <ul className="space-y-1.5 text-sm text-red-800">
                <li className="flex gap-2"><span>•</span>Your ASBA blocked amount is released/unblocked automatically.</li>
                <li className="flex gap-2"><span>•</span>For UPI applications, the mandate is revoked - no money is debited.</li>
                <li className="flex gap-2"><span>•</span>You can still buy Jio shares from the open market after listing.</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Jio IPO Allotment - FAQs</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-text text-sm">{q}</p>
                  <p className="text-sm text-text-muted mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related links */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">More on the Jio IPO</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/reliance-jio-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Full Jio IPO Review</Link>
              <Link href="/ipos/jio-ipo-gmp-today" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Jio IPO GMP Today</Link>
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">All IPOs →</Link>
            </div>
          </div>

          <IpoDematCta />

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This page is for educational purposes only and is not investment advice. Allotment and listing dates are tentative and subject to the final RHP and exchange schedule. Always check your allotment on the official BSE or registrar website, and never share your PAN, demat or banking details on unofficial sites.
            </p>
          </div>

          <div className="text-center">
            <Link href="/ipos" className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline underline-offset-2">
              ← View all IPOs on the CoinMind IPO Calendar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
