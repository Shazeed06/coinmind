import type { Metadata } from "next";
import Link from "next/link";
import IpoDematCta from "@/components/IpoDematCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Jio IPO Allotment Status: Check on KFintech, BSE & NSE" },
  description:
    "Jio Platforms IPO allotment is finalised (26 Oct 2026). Check your status on KFin Technologies, BSE or NSE using your PAN or application number.",
  keywords: [
    "Jio IPO allotment status",
    "Jio IPO allotment date",
    "Jio Platforms IPO allotment status",
    "Jio IPO allotment check online",
    "how to check Jio IPO allotment",
    "Jio IPO allotment status BSE",
    "Jio IPO NSE allotment status",
    "Jio IPO allotment status KFintech",
    "Reliance Jio IPO allotment",
    "Jio IPO listing date",
  ],
  alternates: { canonical: `${site.url}/ipos/jio-ipo-allotment-status` },
  openGraph: {
    locale: "en_IN",
    title: "Jio IPO Allotment Status - Check on KFintech, BSE or NSE",
    description:
      "Allotment finalised 26 Oct 2026; Jio Platforms listed on 28 Oct. Check your allotment on KFin Technologies, BSE or NSE with your PAN.",
    url: `${site.url}/ipos/jio-ipo-allotment-status`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jio IPO Allotment Status - Check on KFintech, BSE or NSE",
    description:
      "Allotment finalised 26 Oct 2026; Jio Platforms listed on 28 Oct. Check your allotment on KFin Technologies, BSE or NSE with your PAN.",
  },
};

const LAST_UPDATED = "29 October 2026";

// `done` drives the completed state in the timeline below. The Jio Platforms
// issue has now run its full course: allotment was finalised on 26 Oct 2026 and
// the stock listed on BSE and NSE on 28 Oct 2026.
const TIMELINE = [
  { label: "IPO Opens", date: "21 Oct 2026", done: true },
  { label: "IPO Closes", date: "23 Oct 2026", done: true },
  { label: "Allotment Finalised", date: "26 Oct 2026", done: true },
  { label: "Refunds / Unblock ASBA", date: "27 Oct 2026", done: true },
  { label: "Shares Credited to Demat", date: "27 Oct 2026", done: true },
  { label: "Listing (BSE + NSE)", date: "28 Oct 2026", done: true },
];

const BSE_STEPS = [
  "Go to the BSE allotment page: bseindia.com → Investors → Status of Issue Application (or search \"BSE IPO allotment\").",
  "Under Issue Type, select \"Equity\".",
  "In the Issue Name dropdown, select \"Jio Platforms Limited\" (appears once allotment is finalised).",
  "Enter your Application Number, or PAN.",
  "Verify the captcha and click \"Search\" to see how many shares were allotted.",
];

const REGISTRAR_STEPS = [
  "Open the IPO allotment status page of KFin Technologies, the registrar for the Jio Platforms issue.",
  "Select \"Jio Platforms\" from the Select IPO dropdown.",
  "Choose to search by PAN, Demat Account Number, or Application Number.",
  "Complete the captcha and click Submit to view your allotment status.",
];

const NSE_STEPS = [
  "Go to the NSE website's IPO bid verification / allotment page.",
  "First-time users must register once using the \"Click here to sign up\" link and their PAN.",
  "Sign in, then select the Jio Platforms issue.",
  "Enter your PAN or application number to see the status of applications linked to that PAN.",
];

const FAQS = [
  {
    q: "Is the Jio IPO allotment done yet?",
    a: "Yes. The basis of allotment for the Jio Platforms IPO was finalised on 26 October 2026, after bidding closed on 23 October. Refunds and ASBA unblocking happened on 27 October, shares were credited the same day, and the stock listed on BSE and NSE on 28 October 2026.",
  },
  {
    q: "What is the Jio IPO allotment date?",
    a: "Allotment was finalised on 26 October 2026. The subscription window ran from 21 to 23 October 2026, refunds and share credit followed on 27 October, and listing took place on 28 October 2026 on both BSE and NSE.",
  },
  {
    q: "How can I check my Jio IPO allotment status?",
    a: "There are three official routes: the registrar KFin Technologies, the BSE application-status page, and NSE (which needs a one-time PAN sign-up). All three let you search by PAN or application number; KFin and BSE also accept your demat/client ID. Your broker app shows the result too.",
  },
  {
    q: "Who is the registrar for the Jio Platforms IPO?",
    a: "KFin Technologies is the registrar for the Jio Platforms IPO. The registrar processes applications and runs the basis of allotment, which makes its allotment-status page the most authoritative place to check. Always use the official KFin site rather than a third-party lookup.",
  },
  {
    q: "What happens if I didn't get the Jio IPO allotment?",
    a: "If you were not allotted shares, the blocked amount (ASBA) in your bank account is released automatically, usually within a day of allotment. For UPI applications the mandate is revoked and no money is debited. You can still buy the shares on the open market now that they are listed.",
  },
  {
    q: "How was the Jio IPO subscribed, and how is allotment decided?",
    a: "The issue was subscribed roughly 22 times overall, with the QIB portion around 70.55 times and retail around 2.72 times. When the retail category is oversubscribed, allotment is done by a computerised lottery, so every valid applicant has an equal chance at the minimum one lot regardless of how many lots were applied for.",
  },
];

export default function JioIpoAllotmentStatusPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Jio IPO Allotment Status - Check on KFintech, BSE or NSE",
    description:
      "Jio Platforms IPO allotment was finalised on 26 Oct 2026 and the stock listed on 28 Oct. How to check your status on KFin Technologies, BSE or NSE.",
    url: `${site.url}/ipos/jio-ipo-allotment-status`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-29",
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
            Jio IPO Allotment Status
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            The Jio Platforms IPO allotment was finalised on <strong className="text-text">26 October 2026</strong> and the stock listed on BSE and NSE on <strong className="text-text">28 October</strong>. Here&apos;s exactly how to check your allotment on KFin Technologies, BSE or NSE - and what to do if you weren&apos;t allotted.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Status banner */}
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
            <p className="text-sm text-sky-900">
              <strong>Status:</strong> Allotment is <strong>finalised</strong> (26 Oct 2026) and status is <strong>live now</strong> on KFin Technologies, BSE and NSE. Jio Platforms listed on 28 October 2026. The issue was subscribed roughly 22 times overall.
            </p>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">Jio IPO Allotment &amp; Listing Timeline</h2>
            <ol className="relative border-l border-border ml-2">
              {TIMELINE.map((t) => (
                <li key={t.label} className="ml-4 pb-5 last:pb-0">
                  <span
                    className={`absolute -left-1.5 h-3 w-3 rounded-full border-2 border-white ${t.done ? "bg-brand" : "bg-border"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="text-sm font-medium text-text">
                      {t.label}
                      {t.done && <span className="ml-2 text-xs font-semibold text-brand">Done</span>}
                    </p>
                    <p className="text-sm text-text-muted">{t.date}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-2">Every stage of this issue is complete - allotment was finalised on 26 Oct and the shares listed on 28 Oct 2026.</p>
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
            <h2 className="font-bold text-text mb-3">Method 2: Check on KFin Technologies (the Registrar)</h2>
            <ol className="space-y-2">
              {REGISTRAR_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-3">The registrar processes IPO applications and runs the basis of allotment, which makes KFin Technologies the most authoritative source for the Jio Platforms issue. Always use the official KFin site rather than any third-party lookup.</p>
          </div>

          {/* Method 3: NSE */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 3: Check on the NSE Website</h2>
            <ol className="space-y-2">
              {NSE_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted">
                  <span className="h-5 w-5 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-3">NSE requires a one-time free registration with your PAN before you can look up an application.</p>
          </div>

          {/* Method 4: Broker */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 4: Check in Your Broker App</h2>
            <p className="text-sm text-text-muted">
              Most brokers (Zerodha, Groww, Angel One, Upstox, etc.) show your IPO application and allotment result in their IPO/Orders section once allotment is finalised. You will also receive an SMS/email from CDSL/NSDL when shares are credited to your demat account.
            </p>
          </div>

          {/* What next */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
              <h2 className="font-bold text-sky-800 mb-2">✅ If you were allotted</h2>
              <ul className="space-y-1.5 text-sm text-sky-800">
                <li className="flex gap-2"><span>•</span>Shares were credited to your demat on 27 Oct, a day before listing.</li>
                <li className="flex gap-2"><span>•</span>The blocked amount was debited for the allotted shares only.</li>
                <li className="flex gap-2"><span>•</span>The stock listed on 28 Oct, so you can now hold or sell at the market price.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-bold text-red-800 mb-2">❌ If you were not allotted</h2>
              <ul className="space-y-1.5 text-sm text-red-800">
                <li className="flex gap-2"><span>•</span>Your ASBA blocked amount was released automatically on 27 Oct.</li>
                <li className="flex gap-2"><span>•</span>For UPI applications the mandate was revoked - no money was debited.</li>
                <li className="flex gap-2"><span>•</span>Jio Platforms is now listed, so you can buy it on the open market.</li>
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
