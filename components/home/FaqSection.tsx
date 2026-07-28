"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faqs";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <Section variant="alt">
      <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
      <div className="max-w-[760px] mx-auto" role="region" aria-label="Frequently asked questions">
        {visible.map((faq, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          const panelId = `faq-panel-${i}`;
          return (
            <div key={i} className="border-b border-border first:border-t">
              <button
                id={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex items-center justify-between w-full py-5 px-0 text-left text-base font-medium text-text"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="pr-8">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-text-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={id}
                className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-[15px] leading-relaxed text-text-muted pb-5 max-w-[680px]">{faq.a}</p>
              </div>
            </div>
          );
        })}

        {!showAll && FAQS.length > 5 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
            >
              Show all {FAQS.length} FAQs <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
