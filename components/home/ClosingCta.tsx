import Link from "next/link";
import { IconArrow, IconCalculator, IconSparkle } from "@/components/icons";

export default function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="rounded-3xl bg-gradient-to-br from-forest-deep via-forest to-emerald-700 px-8 py-16 sm:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_20%_30%,#fff,transparent_50%),radial-gradient(circle_at_80%_70%,#fff,transparent_40%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm mb-4">
            <IconSparkle className="h-3.5 w-3.5" /> Start Building Wealth Today
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-600 max-w-3xl mx-auto leading-tight">
            Your Financial Future Starts Here
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            One calculation can change how you think about money. One guide can show you a path you did not know existed. Start exploring — it is all free, always.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/calculators" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-forest-deep hover:bg-white/90 transition-all shadow-xl">
              <IconCalculator className="h-4 w-4" /> Explore All Calculators <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all">
              Read the Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
