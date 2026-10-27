import Link from "next/link";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { calculators } from "@/lib/data";
import {
  ArrowRight, LineChart, Receipt, Home, Landmark, PiggyBank, Umbrella,
  type LucideIcon,
} from "lucide-react";

const liveCount = calculators.filter((c) => c.live).length;

// A hand-picked set of the highest-intent calculators, each with a topic-matched
// icon rather than one generic glyph, so the grid reads as distinct tools.
const FEATURED: { slug: string; title: string; blurb: string; Icon: LucideIcon }[] = [
  { slug: "sip", title: "SIP Calculator", blurb: "Project mutual fund SIP returns with step-up and inflation.", Icon: LineChart },
  { slug: "income-tax", title: "Income Tax Calculator", blurb: "Compare the new vs old regime for FY 2026-27.", Icon: Receipt },
  { slug: "emi", title: "EMI Calculator", blurb: "Monthly payment for home, car and personal loans.", Icon: Home },
  { slug: "fd", title: "FD Calculator", blurb: "Fixed deposit maturity and interest, any bank.", Icon: Landmark },
  { slug: "ppf", title: "PPF Calculator", blurb: "Tax-free PPF corpus over the 15-year lock-in.", Icon: PiggyBank },
  { slug: "retirement", title: "Retirement Calculator", blurb: "The corpus you need to retire comfortably.", Icon: Umbrella },
];

export default function FeaturedCalculators() {
  return (
    <Section variant="white">
      <SectionIntro
        eyebrow="Calculators"
        title="Start with the most popular"
        subline="The tools Indians reach for most — accurate, private and instant, with no sign-up."
      />
      <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map(({ slug, title, blurb, Icon }) => (
          <Link
            key={slug}
            href={`/calculators/${slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-bg p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-lift"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-text">{title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5">
              Open calculator <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-brand hover:text-brand"
        >
          Browse all {liveCount} calculators <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
