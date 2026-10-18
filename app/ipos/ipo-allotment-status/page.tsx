import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "IPO Allotment Status: How to Check Online | CoinMind" },
  description:
    "How to check IPO allotment status online in India - step-by-step via BSE, the registrars (MUFG Intime/Link Intime, KFintech) and your broker app. Check by PAN, and when ASBA money is unblocked.",
  keywords: [
    "IPO allotment status",
    "how to check IPO allotment status",
    "IPO allotment status check online",
    "BSE IPO allotment status",
    "link intime IPO allotment",
    "KFintech IPO allotment",
    "IPO allotment by PAN",
    "IPO allotment registrar",
  ],
  alternates: { canonical: `${site.url}/ipos/ipo-allotment-status` },
  openGraph: {
    title: "IPO Allotment Status: How to Check Online in India",
    description:
      "Step-by-step guide to check IPO allotment status via BSE, the registrars (MUFG Intime, KFintech) and your broker app, plus the T+ timeline and ASBA unblock process.",
    url: `${site.url}/ipos/ipo-allotment-status`,
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO Allotment Status: How to Check Online in India",
    description:
      "Step-by-step guide to check IPO allotment status via BSE, the registrars (MUFG Intime, KFintech) and your broker app, plus the T+ timeline and ASBA unblock process.",
  },
};

const LAST_UPDATED = "18 October 2026";

const BSE_STEPS = [
  "Go to the BSE allotment page: bseindia.com → Investors → Status of Issue Application (or search \"BSE IPO allotment\").",
  "Under Issue Type, select \"Equity\" (or \"Equity SME\" for an SME IPO).",
  "In the Issue Name dropdown, select the company's IPO (it appears only after the basis of allotment is finalised).",
  "Enter your Application Number, or your PAN.",
  "Verify the captcha and click \"Search\" to see how many shares, if any, were allotted to you.",
];

const REGISTRAR_STEPS = [
  "Identify the IPO's registrar - it is named in the RHP and on the BSE issue page (common ones are MUFG Intime/Link Intime and KFintech).",
  "Open that registrar's official IPO allotment page directly (type the known URL or reach it from the BSE issue page - avoid search-ad links).",
  "Select the specific IPO from the company dropdown.",
  "Choose to search by PAN, Application Number, or Demat/Client ID.",
  "Enter your details, complete the captcha and submit to view your allotment status.",
];

const TIMELINE = [
  { label: "IPO Closes (T day)", desc: "The subscription window shuts; your application money stays blocked (ASBA/UPI)." },
  { label: "Basis of allotment finalised (around T+1)", desc: "The registrar, with the exchange, finalises who gets how many shares. Status goes live on BSE and the registrar site." },
  { label: "Refunds / ASBA unblock (around T+1 to T+2)", desc: "For non-allottees, the blocked amount is released; for partial allotment, only the allotted value is debited." },
  { label: "Shares credited to demat (around T+1, before listing)", desc: "Allotted shares are credited to your demat account, usually a day before listing." },
  { label: "Listing day (around T+2 to T+3)", desc: "The stock debuts on the exchange; you can hold or sell." },
];

const REGISTRARS = [
  { name: "MUFG Intime India (formerly Link Intime)", note: "One of the most widely used IPO registrars in India." },
  { name: "KFin Technologies (KFintech)", note: "Handles a large share of mainboard and SME issues." },
  { name: "Bigshare Services", note: "Common registrar for mid-size and SME IPOs." },
  { name: "Cameo Corporate Services", note: "Registrar for a range of issues, including SME." },
];

const FAQS = [
  {
    q: "How do I check my IPO allotment status?",
    a: "You can check in three ways: on the BSE website (Investors → Status of Issue Application), on the IPO's registrar website (such as MUFG Intime/Link Intime or KFintech), or inside your broker app. On BSE and the registrar you search using your PAN, application number, or demat/client ID. The status only appears once the basis of allotment is finalised, usually a day or two after the IPO closes.",
  },
  {
    q: "What are the IPO registrars in India?",
    a: "A registrar (RTA) processes IPO applications and finalises the allotment. The most common ones are MUFG Intime India (formerly Link Intime) and KFin Technologies (KFintech), along with others such as Bigshare and Cameo. Each IPO names its registrar in the RHP and on the BSE issue page - always use that official registrar's site to check your status.",
  },
  {
    q: "Why didn't I get an IPO allotment?",
    a: "When an IPO is oversubscribed in the retail category, allotment is decided by a computerised lottery, so not every valid applicant receives shares. The more a category is oversubscribed, the lower the chance of getting even one lot. A technical rejection - such as multiple applications on the same PAN, a wrong demat ID, or an insufficient bank balance to block - can also mean no allotment.",
  },
  {
    q: "When is IPO money refunded if I'm not allotted?",
    a: "Because IPO applications use ASBA (Application Supported by Blocked Amount) or UPI, your money is only blocked, never actually debited, unless you are allotted shares. If you get no allotment, the block is released automatically - typically within a day or two of the basis of allotment being finalised. For UPI applications, the mandate is simply revoked.",
  },
  {
    q: "How is allotment decided in oversubscription?",
    a: "In the retail category, every valid applicant is treated equally: allotment is done by a computerised lottery for the minimum lot, so applying for more lots does not raise your odds of getting that first lot. Applying from different PANs (for example, family members with their own demat accounts) is the only legitimate way to increase overall chances. Larger categories like HNI and QIB follow a proportionate allotment method.",
  },
  {
    q: "Can I check IPO allotment status by PAN?",
    a: "Yes. Both the BSE allotment page and the registrar websites let you search by PAN, which is the easiest option if you do not have your application number handy. Enter your PAN, select the correct IPO from the dropdown, complete the captcha and submit. Only enter your PAN on the official BSE or registrar site - never on a third-party page that asks for it.",
  },
];

export default function IpoAllotmentStatusPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IPO Allotment Status - How to Check Online in India",
    description:
      "Step-by-step guide to check IPO allotment status via BSE, the registrars and your broker app, plus the T+ timeline and ASBA unblock process.",
    url: `${site.url}/ipos/ipo-allotment-status`,
    author: { "@type": "Person", name: site.author.fullName },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: "2026-10-18",
    dateModified: "2026-10-18",
    mainEntityOfPage: `${site.url}/ipos/ipo-allotment-status`,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "IPO Tracker", item: `${site.url}/ipos` },
      { "@type": "ListItem", position: 3, name: "IPO Allotment Status", item: `${site.url}/ipos/ipo-allotment-status` },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to check IPO allotment status on BSE",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-white border-b border-border">
        <div className="container-main max-w-[900px]">
          <nav className="flex items-center gap-1.5 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>›</span>
            <Link href="/ipos" className="hover:text-brand">IPO Tracker</Link>
            <span>›</span>
            <span>IPO Allotment Status</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">
            IPO Allotment Status: How to Check
          </h1>
          <p className="mt-3 text-text-muted max-w-[680px] leading-relaxed">
            After you apply for any IPO in India, you can check whether shares were allotted to you online - for free - on the <strong className="text-text">BSE website</strong>, the IPO&apos;s <strong className="text-text">registrar</strong>, or your <strong className="text-text">broker app</strong>. This is the generic, step-by-step guide that works for every IPO.
          </p>
          <p className="mt-2 text-xs text-text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="bg-bg-alt">
        <div className="container-main max-w-[900px] py-10 sm:py-14 space-y-8">

          {/* Quick answer */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-text font-bold leading-relaxed">
              To check IPO allotment status: go to the BSE allotment page (Investors → Status of Issue Application), pick the IPO and enter your PAN or application number. You can also check on the registrar&apos;s site (MUFG Intime/Link Intime or KFintech) or inside your broker app. The status goes live only after the basis of allotment is finalised, usually a day or two after the IPO closes.
            </p>
          </div>

          {/* Jio-specific pointer */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <p className="text-sm text-blue-700">
              Looking for a specific IPO? See our dedicated <Link href="/ipos/jio-ipo-allotment-status" className="font-semibold underline hover:no-underline">Jio IPO allotment status guide</Link> with its exact dates and timeline. This page covers the generic process for any Indian IPO.
            </p>
          </div>

          {/* Method 1: BSE */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 1: Check on the BSE Website</h2>
            <p className="text-sm text-text-muted mb-3">BSE lets you check allotment for any IPO (mainboard or SME) regardless of which registrar handled it - the simplest universal option.</p>
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
            <p className="text-xs text-text-muted mt-3">
              <strong>Caution:</strong> Always reach the registrar through its official site or the BSE issue page. Fake &quot;allotment&quot; pages that ask for your PAN, demat, OTP or bank details are a common scam around popular IPOs - a genuine allotment check never needs your banking password or OTP.
            </p>
          </div>

          {/* Method 3: Broker */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Method 3: Check in Your Broker App</h2>
            <p className="text-sm text-text-muted">
              Most brokers (Zerodha, Groww, Angel One, Upstox, etc.) show your IPO application and allotment result in their IPO/Orders section once allotment is finalised. You will also get an SMS/email from CDSL or NSDL when shares are credited to your demat account - a reliable confirmation that you were allotted.
            </p>
          </div>

          {/* Which registrar */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-3">Which Registrar Handles Which IPO?</h2>
            <p className="text-sm text-text-muted mb-4">Every IPO appoints one registrar (also called an RTA - Registrar and Transfer Agent) to process applications and finalise allotment. You do not choose it - it is fixed for each issue and named in the RHP and on the BSE issue page. The common ones:</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-alt text-text-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Registrar</th>
                    <th className="text-left px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {REGISTRARS.map((r) => (
                    <tr key={r.name} className="border-b border-border last:border-0 align-top">
                      <td className="px-4 py-3 font-medium text-text">{r.name}</td>
                      <td className="px-4 py-3 text-text-muted">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">Check the specific IPO&apos;s RHP or BSE issue page to confirm its registrar before visiting any registrar site.</p>
          </div>

          {/* When is allotment out */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">When is Allotment Usually Out? (T+ Timeline)</h2>
            <ol className="relative border-l border-border ml-2">
              {TIMELINE.map((t) => (
                <li key={t.label} className="ml-4 pb-5 last:pb-0">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-brand border-2 border-white" />
                  <p className="text-sm font-medium text-text">{t.label}</p>
                  <p className="text-sm text-text-muted mt-0.5">{t.desc}</p>
                </li>
              ))}
            </ol>
            <p className="text-xs text-text-muted mt-2">&quot;T&quot; is the day the IPO closes. Indian IPOs now follow a compressed timeline (often T+3 to listing), but the exact days vary per issue - always confirm from the RHP or exchange schedule.</p>
          </div>

          {/* Allotted vs not */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="font-bold text-emerald-800 mb-2">✅ If you are allotted</h2>
              <ul className="space-y-1.5 text-sm text-emerald-800">
                <li className="flex gap-2"><span>•</span>The blocked amount is debited only for the shares allotted to you.</li>
                <li className="flex gap-2"><span>•</span>Shares are credited to your demat a day before listing.</li>
                <li className="flex gap-2"><span>•</span>On listing day you can hold for the long term or sell at the listing price.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-bold text-red-800 mb-2">❌ If you are not allotted</h2>
              <ul className="space-y-1.5 text-sm text-red-800">
                <li className="flex gap-2"><span>•</span>Your ASBA blocked amount is released/unblocked automatically.</li>
                <li className="flex gap-2"><span>•</span>For UPI applications, the mandate is revoked - no money is debited.</li>
                <li className="flex gap-2"><span>•</span>You can still buy the shares from the open market after listing.</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="font-bold text-text mb-4">IPO Allotment Status - FAQs</h2>
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
            <h2 className="font-bold text-text mb-3">More IPO Resources</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/ipos/jio-ipo-allotment-status" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Jio IPO Allotment Status</Link>
              <Link href="/ipos/upcoming-ipo" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">Upcoming IPOs</Link>
              <Link href="/ipos" className="rounded-full bg-brand/10 text-brand px-3 py-1 font-medium hover:underline">All IPOs →</Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This page is for educational purposes only and is not investment advice. Allotment and listing timelines are tentative and vary per issue. Always check your allotment on the official BSE or registrar website, and never enter your PAN, demat, OTP or banking details on any unofficial or search-ad page.
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
