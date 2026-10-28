import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import SipCalculator from "@/components/calc/SipCalculator";
import EmiCalculator from "@/components/calc/EmiCalculator";
import FdCalculator from "@/components/calc/FdCalculator";
import IncomeTaxCalculator from "@/components/calc/IncomeTaxCalculator";
import PpfCalculator from "@/components/calc/PpfCalculator";
import NpsCalculator from "@/components/calc/NpsCalculator";
import LumpsumCalculator from "@/components/calc/LumpsumCalculator";
import RetirementCalculator from "@/components/calc/RetirementCalculator";

// Bare, iframe-friendly calculators for embedding on third-party sites. Each
// renders just the tool plus a "by CoinMind" attribution link back to the full
// calculator page — the backlink every embed creates. Site chrome (header,
// footer, ads, cookie banner) is hidden on these routes via ChromeGate, and
// cross-origin framing is allowed for /widgets/* in next.config.ts.

type Widget = {
  title: string;
  Calc: React.ComponentType;
  href: string; // the canonical calculator page the widget links back to
};

const WIDGETS: Record<string, Widget> = {
  sip: { title: "SIP Calculator", Calc: SipCalculator, href: "/calculators/sip" },
  emi: { title: "EMI Calculator", Calc: EmiCalculator, href: "/calculators/emi" },
  fd: { title: "FD Calculator", Calc: FdCalculator, href: "/calculators/fd" },
  "income-tax": { title: "Income Tax Calculator", Calc: IncomeTaxCalculator, href: "/calculators/income-tax" },
  ppf: { title: "PPF Calculator", Calc: PpfCalculator, href: "/calculators/ppf" },
  nps: { title: "NPS Calculator", Calc: NpsCalculator, href: "/calculators/nps" },
  lumpsum: { title: "Lumpsum Calculator", Calc: LumpsumCalculator, href: "/calculators/lumpsum" },
  retirement: { title: "Retirement Calculator", Calc: RetirementCalculator, href: "/calculators/retirement" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(WIDGETS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = WIDGETS[slug];
  if (!w) return {};
  return {
    title: { absolute: `${w.title} — Free Embeddable Widget · ${site.name}` },
    description: `Free embeddable ${w.title} for India. Add it to your website with one line of code.`,
    // The embed is a bare copy of the real calculator page: keep it out of the
    // index and point the canonical at the full page so link signals consolidate.
    robots: { index: false, follow: true },
    alternates: { canonical: `${site.url}${w.href}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = WIDGETS[slug];
  if (!w) notFound();
  const { Calc } = w;

  return (
    <div className="min-h-screen bg-white px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-[680px]">
        <Calc />
        <div className="mt-5 border-t border-line pt-3 text-center">
          <a
            href={`${site.url}${w.href}`}
            target="_blank"
            rel="noopener"
            className="text-xs font-medium text-ink-soft transition-colors hover:text-brand"
          >
            ⚡ Free {w.title} by <span className="font-semibold text-brand">CoinMind</span> →
          </a>
        </div>
      </div>
    </div>
  );
}
