"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui";
import { ChevronDown } from "lucide-react";

const FAQS_ALL = [
  { q: "Are CoinMind calculators really free?", a: "Yes, every calculator is completely free. No subscription, no sign-up, no hidden charges. All calculations run in your browser — we never see your data." },
  { q: "Are the formulas accurate and up to date?", a: "Yes. Our calculators use formulas aligned with RBI, SEBI, and Income Tax Department guidelines. We update them within 48 hours of every Union Budget and regulatory change." },
  { q: "Do you store my financial data?", a: "No. All calculations run in your browser using JavaScript. Your numbers never leave your device — we cannot see, store, or share any data you enter." },
  { q: "Who is CoinMind for?", a: "CoinMind is for anyone in India, the US, or UK who wants to make smarter financial decisions — whether you are calculating an EMI, planning a SIP, comparing tax regimes, or learning about mutual funds." },
  { q: "Do you offer financial advice?", a: "No. CoinMind provides educational tools and information only. Our calculators and guides help you understand your options, but they are not a substitute for qualified financial advice." },
  { q: "How often are calculators updated?", a: "We update every calculator formula within 48 hours of any regulatory change, Union Budget, or RBI policy announcement that affects the calculation." },
  { q: "Does CoinMind work on mobile?", a: "Yes. Every calculator, tool, and guide is fully responsive and works on any device — phone, tablet, or desktop." },
  { q: "Can I trust the numbers?", a: "Every formula is tested against official sources. We cross-check SIP calculations against AMFI data, EMI against standard amortisation, and tax against the Income Tax Act." },
];

export const FAQS = FAQS_ALL;

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FAQS_ALL : FAQS_ALL.slice(0, 5);

  return (
    <Section variant="alt">
      <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
      <div className="max-w-[800px] mx-auto">
        {visible.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex items-center justify-between w-full py-4 text-left body text-text"
                aria-expanded={isOpen}
              >
                {faq.q}
                <ChevronDown className={`h-4 w-4 text-text-muted shrink-0 ml-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[300px] pb-4" : "max-h-0"}`}>
                <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
        {!showAll && FAQS_ALL.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 text-sm font-medium text-brand hover:underline"
          >
            Show all {FAQS_ALL.length} FAQs
          </button>
        )}
      </div>
    </Section>
  );
}
