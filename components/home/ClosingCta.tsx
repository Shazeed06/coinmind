import Link from "next/link";
import { Section } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export default function ClosingCta() {
  return (
    <Section variant="dark">
      <div className="text-center py-8 lg:py-16">
        <h2 className="h2 text-white">Ready to Take Control of Your Finances?</h2>
        <p className="body text-white/60 mt-4 max-w-[640px] mx-auto">
          Free calculators, expert guides, and AI-powered answers — all in one place. No sign-up needed.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-brand hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Explore Calculators <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/ai-assistant"
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Ask Our AI Assistant
          </Link>
        </div>
      </div>
    </Section>
  );
}
