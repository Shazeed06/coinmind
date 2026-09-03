import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type FinancialDisclaimerProps = { type?: "tax" | "investment" | "general" };

export function FinancialDisclaimer({ type = "general" }: FinancialDisclaimerProps) {
  const messages: Record<string, string> = {
    tax: "This calculator uses current tax slabs for the financial year. Tax rules change. Confirm the latest rates and consider consulting a qualified tax professional before filing.",
    investment: "Projections are illustrative and use assumed rates of return. Actual returns vary with market conditions. Past performance does not guarantee future results. Not investment advice.",
    general: "This is an educational tool, not financial advice. Consult a qualified professional before making decisions that affect your money.",
  };

  return (
    // Same .panel surface and 12px radius as the author box and the affiliate
    // block, which are the other three asides that appear alongside it. gap-2
    // (8px) was tighter than every other icon-plus-text row on the site; gap-3
    // matches AuthorReviewBox.
    <div className="panel flex items-start gap-3 bg-bg-alt p-4 text-xs leading-relaxed text-text-muted">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
      <span>
        {messages[type]}{" "}
        <Link href="/disclaimer" className="text-brand underline underline-offset-2 decoration-brand/40 transition-colors hover:decoration-brand">Full disclaimer</Link>.
      </span>
    </div>
  );
}
