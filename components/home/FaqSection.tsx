"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faqs";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FAQS : FAQS.slice(0, 5);

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
        {!showAll && FAQS.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 text-sm font-medium text-brand hover:underline"
          >
            Show all {FAQS.length} FAQs
          </button>
        )}
      </div>
    </Section>
  );
}
