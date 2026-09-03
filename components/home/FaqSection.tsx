"use client";

import { useState } from "react";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faqs";

// Number of FAQs shown before the reader clicks "Show all".
const PREVIEW_COUNT = 5;

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  // Every FAQ is rendered into the DOM, always. The homepage emits a FAQPage
  // with all of FAQS in it, and Google requires each declared Q and A to have an
  // on-page counterpart in the served HTML. Collapsing the extras with CSS is
  // fine; slicing them out of the array (which is what this used to do) left
  // three structured-data entries with nothing behind them.
  return (
    <Section variant="alt">
      <SectionIntro eyebrow="FAQ" title="Frequently Asked Questions" />
      <div className="max-w-[760px] mx-auto" role="region" aria-label="Frequently asked questions">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          const id = `faq-${i}`;
          const panelId = `faq-panel-${i}`;
          // Collapsed visually (height and opacity), never unmounted, so the
          // text stays in the served HTML. Collapsed rows are also taken out of
          // the tab order, since an invisible focusable button is a trap.
          const collapsed = i >= PREVIEW_COUNT && !showAll;
          return (
            <div
              key={i}
              className={`border-border first:border-t transition-all duration-200 ${
                collapsed
                  ? "max-h-0 overflow-hidden opacity-0 pointer-events-none"
                  : "border-b"
              }`}
              aria-hidden={collapsed}
            >
              <button
                id={id}
                onClick={() => setOpen(isOpen ? null : i)}
                tabIndex={collapsed ? -1 : undefined}
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

        {!showAll && FAQS.length > PREVIEW_COUNT && (
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
