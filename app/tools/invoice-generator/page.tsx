import type { Metadata } from "next";
import InvoiceGenerator from "@/components/tools/InvoiceGenerator";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Free Invoice Generator - Make Invoices Online" },
  description:
    "Free invoice generator with a live preview and one-click PDF. Create professional invoices for your clients in minutes - add tax, pick a currency. No sign-up.",
  alternates: { canonical: "/tools/invoice-generator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: `${site.url}/tools/invoice-generator`,
    title: "Free Invoice Generator - Make Invoices Online",
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
    a: "Yes, completely free with no sign-up, no watermark and no limits. Build, edit and download as many invoices as you like, in whichever currency you need. There is no paid tier, no credit card prompt, and no cap on the number of invoices you can create.",
  },
  {
    q: "How do I download my invoice as a PDF?",
    a: "Click the \"Download PDF\" button and your browser's print dialog opens. Choose \"Save as PDF\" as the destination and save. Only the clean invoice is exported. The form fields, buttons, and navigation are all stripped away by print-specific styles, so what the client receives is a polished, professional document with nothing extraneous.",
  },
  {
    q: "Is my invoice data private?",
    a: "Everything stays in your own browser. Your invoice details are saved locally to your device using the browser's storage so you do not lose your work on refresh, and nothing is ever uploaded to a server. You can even use the tool offline once the page has finished loading, since every calculation happens in JavaScript on your machine.",
  },
  {
    q: "Can I add GST, VAT or sales tax?",
    a: "Yes. Enter your tax rate as a percentage in the \"Tax rate %\" field and the tax amount and grand total are calculated automatically. Leave the field blank or set it to zero if the invoice carries no tax. The tax line appears clearly on the finished invoice so both you and your client have a transparent record.",
  },
  {
    q: "Which currencies are supported?",
    a: "You can invoice in Indian Rupees (₹), US Dollars ($), British Pounds (£) or Euros (€). Pick your currency from the dropdown and every amount on the invoice updates instantly. The currency symbol appears next to every figure and in the total summary at the bottom.",
  },
  {
    q: "What should an invoice number look like?",
    a: "Use a simple, sequential format such as INV-0001, INV-0002 and so on, or include the year like 2026-001. The key is that each invoice number is unique and increases over time, which keeps your records and tax filing tidy. An unbroken sequence also makes it obvious if an invoice goes missing from your books.",
  },
  {
    q: "What payment details should I include?",
    a: "Use the notes field at the bottom of the invoice to include your bank account number, IFSC or sort code, UPI ID, or PayPal address, whichever method you prefer to be paid. Stating payment details directly on the invoice removes a common point of friction: clients who have to email or call to ask how to pay are slower to send money than those who can act immediately.",
  },
  {
    q: "Do I need to create an account or sign up?",
    a: "No. There is no registration, no email address to hand over and no login screen. Open the page, fill in the two columns of fields and download your PDF. Because nothing is tied to an account, there is also nothing to cancel later and no marketing list you get added to just for making one invoice.",
  },
  {
    q: "Where is my invoice data saved, and how do I clear it?",
    a: "Your entries are kept in your browser's local storage on the device you are using, which is why the invoice survives a refresh or an accidentally closed tab. It is not synced to any server or to your other devices. To wipe it, clear site data for this page in your browser settings, or open the tool in a private window.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ToolPageLayout
        title="Free Invoice Generator"
        description="Fill in your business and client details on the left and watch a clean, professional invoice build itself on the right. Add line items, set a tax rate and choose your currency, then download a PDF in one click: no sign-up required, nothing uploaded to a server."
        howToUse={[
          {
            step: "Enter your business details",
            detail: "Start by filling in your company or personal name, address, email, and phone number in the \"From\" section. These details appear in the top-left corner of the invoice and tell your client exactly who the bill came from. If you are a freelancer without a formal business address, your own name and a contact email are perfectly sufficient. Many sole traders invoice this way.",
          },
          {
            step: "Add your client's information",
            detail: "Fill in the \"Bill To\" section with your client's name or company name, their billing address, and a contact email. Getting the client's billing details right is important because many businesses refuse to process an invoice that is addressed incorrectly. Check with your client whether they need a specific company name, department, or attention line on the invoice.",
          },
          {
            step: "List the work you did",
            detail: "Add line items for each product or service you are charging for. Write a clear, specific description, enter the quantity and the unit price, and the line total is calculated automatically. Use descriptions your client will recognise. \"Website redesign - homepage and blog pages\" is far better than \"Design work\" when they review the invoice weeks later. Add as many line items as you need.",
          },
          {
            step: "Set your tax rate and currency",
            detail: "Enter your tax percentage if the invoice is taxable, and choose your currency from the dropdown. The tax amount and grand total update live as you type. You can invoice in four currencies (Indian Rupees, US Dollars, British Pounds, and Euros), and every figure on the invoice displays the correct currency symbol throughout.",
          },
          {
            step: "Add payment instructions and download",
            detail: "Use the notes field at the bottom to include your payment details (bank transfer information, UPI ID, or PayPal address) along with any terms like \"Payment due within 14 days.\" A short thank-you note also goes a long way for repeat business. When everything looks right, click Download PDF and save the file with a clear name like Invoice-INV-0001-ClientName.pdf.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are a freelancer billing a client",
            detail: "Whether you are a designer, developer, writer, consultant, or any other independent professional, you need a clear, professional invoice to get paid on time. This tool gives you a polished invoice in minutes without the overhead of accounting software. Send it as a PDF attachment by email and keep a copy for your own tax records.",
          },
          {
            scenario: "You run a small agency or studio",
            detail: "When you bill multiple clients per month with varying project scopes, consistency matters. Using a standardised invoice format for every client builds trust and makes your bookkeeping cleaner at the end of the quarter. The live preview helps you catch errors before sending, and the sequential numbering keeps your accounts tidy.",
          },
          {
            scenario: "You need a quick invoice without signing up for software",
            detail: "Many invoicing platforms require a subscription, account creation, and onboarding before you can generate a single invoice. This tool requires none of that: open the page, fill in your details, and download. It is ideal for one-off projects, occasional freelance work, or situations where you need an invoice right now and do not want to commit to a monthly SaaS fee.",
          },
        ]}
        howItWorks="This invoice generator processes everything inside your browser. You fill in two columns of fields (your business details on the left and your client's information plus line items on the right), and a live PDF preview renders the finished invoice in real time. The tool stores your data in the browser's local storage so you can close the tab or refresh without losing your work. Tax calculation, currency formatting, and subtotal-to-total arithmetic all happen in JavaScript with no server round-trips. When you click Download PDF, the browser's native print dialog opens with CSS rules that hide every interface element, leaving only the clean invoice, correctly formatted for A4 paper."
        tips={[
          "Number your invoices sequentially and never skip a number. A consistent sequence like INV-0001, INV-0002 makes your bookkeeping audit-proof and helps you spot a missing invoice at a glance. If you prefer to include the year, use a format like 2026-001 and reset the counter each January.",
          "State your payment terms clearly on every invoice. Phrases like \"Payment due within 14 days\" or \"Due on receipt\" remove ambiguity about when you expect to be paid. Vague language leads to late payments; specific deadlines give your client a clear target date to work toward.",
          "Include your payment details directly on the invoice. Add your bank account number, IFSC or sort code, UPI ID, or PayPal address in the notes section. Every extra step between reading the invoice and sending payment increases the chance the client will delay. Make it possible to pay you immediately.",
          "Send the invoice the same day the work is delivered, while the value is fresh in the client's mind. Invoices sent weeks later often land in a different budgeting cycle or are met with confusion about what the bill covers. Prompt invoicing is consistently linked to faster payment.",
          "Double-check every figure before you send. Verify that line-item totals add up correctly, the tax rate matches what you charged, and the client name is spelled properly. A single wrong digit can delay payment by an entire billing cycle while you and the client go back and forth correcting it.",
        ]}
        faqs={faqs}
        relatedTools={[
          { label: "Resume Builder", href: "/resume-builder" },
          { label: "Budget Planner", href: "/tools/budget-planner" },
          { label: "QR Code Generator", href: "/tools/qr-code-generator" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
        ]}
        disclaimerType="general"
      >
        <InvoiceGenerator />
      </ToolPageLayout>
    </>
  );
}
