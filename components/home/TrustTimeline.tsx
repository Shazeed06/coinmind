import { IconShield, IconCheck, IconBolt, IconGlobe, IconChart, IconSparkle } from "@/components/icons";

const ITEMS = [
  { year: "Verified", icon: IconShield, title: "RBI & SEBI-aligned Formulas", body: "Every calculation follows the latest guidelines from the Reserve Bank of India, SEBI, and the Income Tax Department." },
  { year: "Updated", icon: IconBolt, title: "Updated After Every Budget", body: "All calculators and guides are updated within 48 hours of every Union Budget and regulatory change." },
  { year: "Reviewed", icon: IconCheck, title: "Expert-Reviewed Content", body: "Every guide is researched, fact-checked, and reviewed by our editorial team before publication." },
  { year: "Transparent", icon: IconChart, title: "Formulas Shown Openly", body: "Every calculator displays its formula so you can verify the math. No black boxes, no hidden assumptions." },
  { year: "Private", icon: IconGlobe, title: "Privacy-First Architecture", body: "All calculations run in your browser. We never see, store, or share your financial data with anyone." },
  { year: "Free", icon: IconSparkle, title: "100% Free — No Signup", body: "No subscription, no upsell, no account required. Every calculator and guide is genuinely free." },
];

export default function TrustTimeline() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">Trust</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Built on Transparency and Accuracy
        </h2>
        <p className="mt-3 text-ink-soft">Six principles that make CoinMind a platform you can rely on for financial decisions.</p>
      </div>

      <div className="mt-12 relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-line hidden sm:block" />
        <div className="space-y-8">
          {ITEMS.map((item, i) => (
            <div key={item.title} className={`relative pl-0 sm:pl-16 ${i % 2 === 0 ? "lg:pr-12" : "lg:pl-20"}`}>
              <div className="hidden sm:flex absolute left-4 top-1 w-5 h-5 rounded-full bg-forest border-4 border-paper-2 items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-forest" />
              </div>
              <div className="flex items-start gap-4">
                <span className="shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-forest-soft text-forest">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-forest">{item.year}</span>
                  <h3 className="mt-1 font-display text-lg font-600 text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
