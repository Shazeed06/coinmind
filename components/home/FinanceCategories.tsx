import Link from "next/link";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import {
  ArrowRight, TrendingUp, Receipt, Home, PiggyBank, Umbrella, Gauge,
  type LucideIcon,
} from "lucide-react";

const TOPICS: { label: string; href: string; desc: string; Icon: LucideIcon }[] = [
  { label: "Investing", href: "/investing", desc: "Mutual funds, stocks, gold and SIP planning.", Icon: TrendingUp },
  { label: "Income Tax", href: "/income-tax", desc: "New vs old regime, deductions and ITR filing.", Icon: Receipt },
  { label: "Loans", href: "/loans", desc: "Home, car and personal loan EMIs and eligibility.", Icon: Home },
  { label: "Savings", href: "/savings", desc: "FD, PPF, RD and government small-savings schemes.", Icon: PiggyBank },
  { label: "Retirement", href: "/retirement", desc: "NPS, EPF, pension and early-retirement (FIRE).", Icon: Umbrella },
  { label: "Credit Score", href: "/credit-score", desc: "Understand, improve and track your CIBIL score.", Icon: Gauge },
];

export default function FinanceCategories() {
  return (
    <Section variant="alt">
      <SectionIntro
        eyebrow="Browse by topic"
        title="Explore every part of your money"
        subline="Pick an area and find the calculators and guides that fit your goal."
      />
      <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map(({ label, href, desc, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-bg p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-lift"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-base font-bold text-text">
                {label}
                <ArrowRight className="h-4 w-4 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-text-muted">{desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
