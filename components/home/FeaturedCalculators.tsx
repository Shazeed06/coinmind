import Link from "next/link";
import { Section, SectionHeader, Card, CardBody, CardFooter, CardBadge } from "@/components/ui";
import { calculators } from "@/lib/data";
import { Calculator, ArrowRight, TrendingUp, Landmark, Sun, LineChart, Wallet, Bitcoin, BarChart3, ClipboardList } from "lucide-react";

const ICONS: Record<string, typeof Calculator> = {
  SIP: TrendingUp, EMI: Landmark, FD: Sun, PPF: Wallet,
  Lumpsum: LineChart, Retirement: Bitcoin, NPS: BarChart3, EPF: ClipboardList,
};

const liveCalcs = calculators.filter((c) => c.live);
const featured = liveCalcs.slice(0, 8);

export default function FeaturedCalculators() {
  return (
    <Section variant="white">
      <SectionHeader
        eyebrow="Calculators"
        title={`${liveCalcs.length} Free Financial Calculators`}
        subline="Plan investments, size a loan, or estimate your tax — instantly and privately."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((c) => {
          const Icon = ICONS[c.short.split(" ")[0]] || Calculator;
          return (
            <Card key={c.slug} href={`/calculators/${c.slug}`}>
              <CardBadge>{c.region === "IN" ? "India" : "Global"}</CardBadge>
              <div className="mt-2">
                <Icon className="h-10 w-10 text-brand" />
              </div>
              <CardBody>
                <h3 className="h3 mt-4 text-text">{c.title}</h3>
                <p className="text-sm text-text-muted line-clamp-2 mt-1">{c.blurb}</p>
              </CardBody>
              <CardFooter>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Calculate <ArrowRight className="h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
        >
          Browse All {liveCalcs.length} Calculators <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
