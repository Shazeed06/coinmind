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
    <div className="flex items-start gap-2 p-4 rounded-card bg-bg-alt border border-border text-xs text-text-muted">
      <AlertTriangle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
      <span>
        {messages[type]}{" "}
        <Link href="/disclaimer" className="text-brand underline underline-offset-2">Full disclaimer</Link>.
      </span>
    </div>
  );
}
