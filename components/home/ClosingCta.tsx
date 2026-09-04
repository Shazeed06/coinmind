import Link from "next/link";
import { Section } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export default function ClosingCta() {
  return (
    <Section variant="dark">
      {/* Section already supplies section-pad (up to 76.8px top and bottom).
          The extra lg:py-16 stacked on top of that put ~141px of dead space
          above two lines of text. */}
      <div className="text-center">
        <h2 className="h2 text-white">Ready to Take Control of Your Finances?</h2>
        <p className="body text-white/60 mt-4 max-w-[640px] mx-auto">
          Free calculators, expert guides, and AI-powered answers. All in one place. No sign-up needed.
        </p>
        <p className="body text-white/60 mt-3 max-w-[640px] mx-auto">
          Join thousands of Indians who use CoinMind every month to plan their investments, compare financial products, and make confident money decisions backed by accurate, up-to-date data.
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
