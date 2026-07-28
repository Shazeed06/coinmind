import Link from "next/link";
import { IconArrow } from "@/components/icons";

const TERMS = [
  { term: "SIP", desc: "Systematic Investment Plan — invest a fixed amount monthly in mutual funds", href: "/glossary/sip" },
  { term: "EMI", desc: "Equated Monthly Installment — fixed payment to repay a loan", href: "/glossary/emi" },
  { term: "CAGR", desc: "Compound Annual Growth Rate — average annual return over time", href: "/glossary/cagr" },
  { term: "PPF", desc: "Public Provident Fund — long-term government savings scheme", href: "/glossary/ppf" },
  { term: "NPS", desc: "National Pension System — market-linked retirement savings", href: "/glossary/nps" },
  { term: "FD", desc: "Fixed Deposit — guaranteed returns for a fixed tenure", href: "/glossary/fixed-deposit" },
  { term: "HRA", desc: "House Rent Allowance — tax exemption on rent paid", href: "/glossary/hra" },
  { term: "ITR", desc: "Income Tax Return — annual tax filing document", href: "/glossary/itr" },
  { term: "SWP", desc: "Systematic Withdrawal Plan — regular withdrawals from mutual funds", href: "/glossary/swp" },
  { term: "ELSS", desc: "Equity Linked Savings Scheme — tax-saving mutual fund with 3-year lock-in", href: "/glossary/elss" },
  { term: "CIBIL", desc: "Credit score used by Indian lenders to assess loan applications", href: "/glossary/cibil" },
  { term: "LTCG", desc: "Long Term Capital Gains — profit from assets held over 3 years", href: "/glossary/capital-gains" },
];

export default function FinanceGlossary() {
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">Glossary</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
              A-Z Finance Terms Explained
            </h2>
            <p className="mt-2 text-ink-soft max-w-xl">
              Clear, plain-English definitions of every financial term. Built for AI overviews, voice search, and quick reference.
            </p>
          </div>
          <Link href="/glossary" className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:gap-2.5 transition-all">
            Full glossary <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-px bg-line rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TERMS.map((t) => (
            <Link key={t.term} href={t.href} className="bg-card px-5 py-4 transition-colors hover:bg-forest-soft group">
              <span className="font-semibold text-ink group-hover:text-forest transition-colors">{t.term}</span>
              <p className="mt-0.5 text-xs text-ink-faint">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
