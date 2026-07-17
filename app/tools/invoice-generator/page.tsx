import type { Metadata } from "next";
import Link from "next/link";
import InvoiceGenerator from "@/components/tools/InvoiceGenerator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Free Invoice Generator — Make Invoices Online" },
  description:
    "Free invoice generator with a live preview and one-click PDF. Create professional invoices for your clients in minutes — add tax, pick a currency. No sign-up.",
  alternates: { canonical: "/tools/invoice-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/invoice-generator`,
    title: "Free Invoice Generator — Make Invoices Online",
    description:
      "Create professional invoices with a live preview and free PDF download. Add line items, tax and your currency of choice. 100% private, made in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Invoice Generator tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this invoice generator really free?",
    a: "Yes — completely free with no sign-up, no watermark and no limits. Build, edit and download as many invoices as you like, in whichever currency you need.",
  },
  {
    q: "How do I download my invoice as a PDF?",
    a: "Click the “Download PDF” button. Your browser's print dialog opens — choose “Save as PDF” as the destination and save. Only the clean invoice is exported, not the form or the rest of the page.",
  },
  {
    q: "Is my invoice data private?",
    a: "Everything stays in your own browser. Your invoice details are saved locally so you don't lose your work on refresh, and nothing is ever uploaded to a server. You can even use the tool offline once the page has loaded.",
  },
  {
    q: "Can I add GST, VAT or sales tax?",
    a: "Yes. Enter your tax rate in the “Tax rate %” field and the tax amount and grand total are calculated automatically. Leave it blank if the invoice has no tax.",
  },
  {
    q: "Which currencies are supported?",
    a: "You can invoice in Indian Rupees (₹), US Dollars ($), British Pounds (£) or Euros (€). Pick your currency from the dropdown and every amount on the invoice updates instantly.",
  },
  {
    q: "What should an invoice number look like?",
    a: "Use a simple, sequential format such as INV-0001, INV-0002 and so on, or include the year like 2026-001. The key is that each invoice number is unique and increases over time, which keeps your records and tax filing tidy.",
  },
];

export default function Page() {
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${site.url}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Invoice Generator",
        item: `${site.url}/tools/invoice-generator`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Breadcrumb */}
      <nav className="no-print text-sm text-ink-faint flex items-center gap-2">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-forest">
          Tools
        </Link>
        <span>/</span>
        <span className="text-ink">Invoice Generator</span>
      </nav>

      {/* Header */}
      <header className="no-print mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          Free browser tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Free Invoice Generator
        </h1>
        <p className="mt-3 text-lg text-ink-soft">
          Fill in your details on the left and watch a clean, professional
          invoice build itself on the right. Add line items, tax and your
          currency, then download a PDF in one click — no sign-up, nothing
          uploaded.
        </p>
      </header>

      {/* The tool */}
      <div className="mt-8">
        <InvoiceGenerator />
      </div>

      {/* Quick answer intro */}
      <section className="no-print mt-14 max-w-3xl">
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">
            Quick answer
          </p>
          <p className="mt-2 text-ink-soft leading-relaxed">
            An <strong className="text-ink">invoice generator</strong> turns your
            business details, client and list of work into a polished, printable
            invoice. Enter your line items above, set a tax rate and currency if
            you need them, then download the invoice as a{" "}
            <strong className="text-ink">PDF</strong> to email to your client.
            It is free, needs no sign-up, and every calculation happens in your
            browser, so your data stays private.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section className="no-print mt-12 max-w-3xl article">
        <h2>What to include on an invoice</h2>
        <p>
          A professional invoice does more than ask for money — it makes you easy
          to pay and keeps both sides organised for tax time. Every invoice
          should carry the word &ldquo;Invoice&rdquo; clearly, a unique invoice
          number, and the date it was issued. Add your business name, address and
          email so the client knows exactly who to pay, and a{" "}
          <strong>bill-to</strong> block with your client&apos;s name and address.
          Then list the work: a clear description of each item, the quantity, the
          unit price and the line total. Finish with a subtotal, any tax, and the
          grand total due — plus a due date so there is no ambiguity about when
          payment is expected.
        </p>

        <h2>Set clear payment terms</h2>
        <p>
          The fastest way to get paid is to remove friction. State your payment
          terms plainly — &ldquo;due within 14 days&rdquo; or &ldquo;due on
          receipt&rdquo; — and include your bank transfer or UPI details right on
          the invoice so the client does not have to ask. A short thank-you note
          also goes a long way for repeat business. Use the notes field in this
          tool for all of the above; it appears neatly at the foot of the
          finished invoice.
        </p>

        <h2>Number your invoices consistently</h2>
        <p>
          Sequential invoice numbers (INV-0001, INV-0002, and so on) keep your
          bookkeeping clean and make it obvious if one goes missing. Some
          businesses prefix the year, like 2026-001, and reset the counter each
          January. Whichever style you choose, keep it consistent — accountants
          and tax authorities expect an unbroken, uniquely numbered trail.
        </p>

        <h2>Tips for getting paid faster</h2>
        <p>
          Send the invoice promptly, ideally the same day the work is delivered,
          while it is fresh in the client&apos;s mind. Double-check the client
          name, amounts and totals before you send — a single wrong figure can
          delay payment by a whole cycle. Save the file with a clear name such as{" "}
          <span className="font-mono text-sm text-ink">
            Invoice-INV-0001-ClientName.pdf
          </span>{" "}
          so it is easy to find later, and keep a copy for your own records. A
          polite reminder a few days before the due date does more to speed
          payment than chasing after it has passed.
        </p>
      </section>

      {/* FAQ */}
      <section className="no-print mt-12 max-w-3xl">
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

      {/* Cross-link */}
      <section className="no-print mt-14">
        <h2 className="font-display text-2xl font-600 text-ink">
          More free tools
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/resume-builder"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              Resume Builder
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Build a clean, professional CV with a live preview and one-click
              PDF.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Open &rarr;
            </span>
          </Link>
          <Link
            href="/tools"
            className="group rounded-2xl border border-line bg-card p-5 hover:border-forest transition-colors"
          >
            <h3 className="font-display text-lg font-600 text-ink">
              All tools
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Browse every free, private, browser-based tool on CoinMind.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              Browse &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
