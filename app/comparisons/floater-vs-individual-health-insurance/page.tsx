import type { Metadata } from "next";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Family Floater vs Individual Health Insurance – Which is Better? | CoinMind",
  description: "Family floater vs individual health insurance: premium comparison, coverage gaps and which to buy for yourself, parents and kids in India.",
  alternates: { canonical: `${site.url}/comparisons/floater-vs-individual-health-insurance` },
};

const TABLE = [
  { param: "Cover type", floater: "One shared pool for the whole family", individual: "Separate cover per person" },
  { param: "Typical sum insured", floater: "₹5–25 lakh shared across family", individual: "₹5–25 lakh per person" },
  { param: "Premium (example: ₹10L cover)", floater: "~₹12,000–18,000/year (family of 4)", individual: "~₹6,000–10,000/year per adult" },
  { param: "Risk of exhaustion", floater: "High if multiple family members claim in same year", individual: "Zero — each person's cover is independent" },
  { param: "Adding members", floater: "Easy — spouse, children added at renewal", individual: "Separate policy per member" },
  { param: "Parents inclusion", floater: "Many insurers exclude parents (or heavily load premium)", individual: "Separate senior citizen policy recommended" },
  { param: "Pre-existing disease waiting", floater: "Applies to each member individually", individual: "Same" },
  { param: "No-claim bonus (NCB)", floater: "Bonus applies to shared pool; one claim can reset it", individual: "Each person's NCB is independent" },
  { param: "Best for", floater: "Young family, healthy members, budget-conscious", individual: "High-risk individuals, senior parents, top-up planning" },
];

export default function FloaterVsIndividualHealthPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-2">
        <Link href="/comparisons" className="text-xs text-ink-faint hover:text-forest">← Comparison Engine</Link>
      </div>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mt-4">Family Floater vs Individual Health Insurance</h1>
      <p className="mt-3 text-ink-soft">Should you buy one family floater for everyone, or separate individual policies? The answer depends heavily on your family's age and health history.</p>

      {/* Quick verdict */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-forest bg-forest-soft p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-forest-deep mb-2">Choose Family Floater when…</p>
          <ul className="text-sm text-forest-deep space-y-1.5">
            <li>✓ Young couple with children (under 45)</li>
            <li>✓ All members are healthy with no pre-existing conditions</li>
            <li>✓ Budget is the primary concern</li>
            <li>✓ Members unlikely to all fall ill in the same year</li>
            <li>✓ Looking for a simple, single-policy solution</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-brass bg-brass/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-2">Choose Individual when…</p>
          <ul className="text-sm text-ink-soft space-y-1.5">
            <li>✓ Any member is 50+ (floater premium spikes)</li>
            <li>✓ Covering parents (always individual/senior plan)</li>
            <li>✓ Any member has a chronic condition (diabetes, BP)</li>
            <li>✓ You want higher individual sum insured</li>
            <li>✓ You want independent no-claim bonuses</li>
          </ul>
        </div>
      </div>

      {/* Premium example */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-3">Premium comparison: ₹10 lakh cover (non-metro)</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft">Scenario</th>
              <th className="text-right px-4 py-3 text-ink">Annual Premium</th>
              <th className="text-right px-4 py-3 text-ink">Effective cover</th>
            </tr></thead>
            <tbody>
              {[
                { s: "Floater (35+33 yr couple + 2 kids)", p: "~₹14,000–18,000", c: "₹10L shared" },
                { s: "Individual (35 yr adult)", p: "~₹6,000–8,000", c: "₹10L each" },
                { s: "Individual (55 yr parent)", p: "~₹18,000–30,000", c: "₹10L — separate" },
                { s: "Family floater incl. 55yr parent", p: "~₹35,000–55,000", c: "₹10L shared — not recommended" },
                { s: "Super top-up (₹45L above ₹5L deductible)", p: "~₹5,000–7,000/year", c: "₹45L top-up (excellent value)" },
              ].map((r, i) => (
                <tr key={r.s} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft">{r.s}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-ink">{r.p}</td>
                  <td className="px-4 py-2.5 text-right text-ink-soft text-xs">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint mt-2">Premiums are indicative (2026). Actual premiums depend on age, city, insurer and pre-existing conditions. Get quotes from at least 3 insurers.</p>
      </section>

      {/* Full comparison */}
      <section className="mt-10">
        <h2 className="font-display text-xl text-ink mb-4">Full comparison</h2>
        <div className="rounded-xl border border-line overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-paper-2">
              <th className="text-left px-4 py-3 text-ink-soft w-1/3">Parameter</th>
              <th className="text-left px-4 py-3 text-forest font-semibold w-1/3">Family Floater</th>
              <th className="text-left px-4 py-3 text-brass font-semibold w-1/3">Individual</th>
            </tr></thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.param} className={i % 2 === 0 ? "bg-card" : "bg-paper-2"}>
                  <td className="px-4 py-2.5 text-ink-soft font-medium">{r.param}</td>
                  <td className="px-4 py-2.5 text-ink">{r.floater}</td>
                  <td className="px-4 py-2.5 text-ink">{r.individual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-xl bg-paper-2 border border-line p-5">
        <p className="font-semibold text-ink mb-2">The optimal structure for most Indian families</p>
        <p className="text-sm text-ink-soft">
          <strong>Core:</strong> Family floater (₹10–15L) for self + spouse + children. <strong>Add:</strong> Super top-up (₹45–50L over ₹5L deductible) at very low premium. <strong>Separately:</strong> Individual senior citizen policies for parents — never include them in a family floater.
        </p>
      </section>

      <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
        {[
          { label: "Term vs ULIP vs Endowment", href: "/comparisons/term-vs-ulip-vs-endowment" },
          { label: "Financial Health Score", href: "/calculators/financial-health" },
          { label: "All Comparisons", href: "/comparisons" },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft hover:border-forest hover:text-forest transition-colors">{l.label}</Link>
        ))}
      </div>
    </main>
  );
}
