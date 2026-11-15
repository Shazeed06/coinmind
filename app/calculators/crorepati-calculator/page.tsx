import { calcMeta } from "@/lib/seo";
import CrorepatiCalculator from "@/components/calc/CrorepatiCalculator";
import CalcPage from "@/components/calc/CalcPage";
import Link from "next/link";

export const metadata = calcMeta(
  "crorepati-calculator",
  "Crorepati SIP Calculator: How to Make ₹1 Crore in 10 Years",
  "Calculate how much monthly SIP is required to make ₹1 Crore in 5, 10, 15, or 20 years in India. Step-up SIP formulas, portfolio allocation, and compounding milestones.",
  "Investing"
);

export default function Page() {
  return (
    <CalcPage
      slug="crorepati-calculator"
      title="Crorepati SIP Calculator"
      subtitle="Find out exactly how much monthly SIP you need to accumulate ₹1 Crore in 5, 10, 15, or 20 years."
      calculator={<CrorepatiCalculator />}
      intro="Becoming a 'Crorepati' (accumulating ₹1 Crore / 10 Million INR) is the definitive financial milestone for millions of Indians. You do not need an inheritance or an executive salary to get there — systematic mutual fund investing turns mathematics into wealth. At an average 12% equity CAGR, investing ₹43,000 per month reaches ₹1 Crore in 10 years. With a 10% annual step-up SIP, your starting requirement drops to just ₹28,600 per month. Use this calculator to simulate your personalized roadmap."
      how={{
        heading: "How Much Monthly SIP is Needed to Make ₹1 Crore in India?",
        body: (
          <>
            <p>
              The monthly investment required to reach ₹1 Crore depends on two variables: your <strong>investment tenure</strong> and your <strong>expected rate of return</strong>:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs border border-line rounded-xl overflow-hidden">
                <thead className="bg-paper-2 text-ink uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Time Horizon</th>
                    <th className="p-3">At 12% Return (Nifty 50)</th>
                    <th className="p-3">At 14% Return (Flexi-Cap)</th>
                    <th className="p-3">At 16% Return (Mid/Small Cap)</th>
                    <th className="p-3">With 10% Step-Up (12%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">5 Years</td>
                    <td className="p-3">₹1,21,500 / mo</td>
                    <td className="p-3">₹1,14,500 / mo</td>
                    <td className="p-3">₹1,08,000 / mo</td>
                    <td className="p-3">₹95,000 / mo</td>
                  </tr>
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">7 Years</td>
                    <td className="p-3">₹74,000 / mo</td>
                    <td className="p-3">₹68,000 / mo</td>
                    <td className="p-3">₹62,500 / mo</td>
                    <td className="p-3">₹53,000 / mo</td>
                  </tr>
                  <tr className="hover:bg-paper-2 bg-forest/5 font-semibold text-forest">
                    <td className="p-3 text-ink font-bold">10 Years (The Golden Target)</td>
                    <td className="p-3 font-bold text-forest">₹43,040 / mo</td>
                    <td className="p-3 font-bold text-forest">₹38,000 / mo</td>
                    <td className="p-3 font-bold text-forest">₹33,500 / mo</td>
                    <td className="p-3 font-bold text-forest">₹28,600 / mo</td>
                  </tr>
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">15 Years</td>
                    <td className="p-3">₹20,020 / mo</td>
                    <td className="p-3">₹16,500 / mo</td>
                    <td className="p-3">₹13,500 / mo</td>
                    <td className="p-3">₹11,500 / mo</td>
                  </tr>
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">20 Years</td>
                    <td className="p-3">₹10,010 / mo</td>
                    <td className="p-3">₹7,600 / mo</td>
                    <td className="p-3">₹5,750 / mo</td>
                    <td className="p-3">₹4,800 / mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              The 4 Compounding Milestones of a ₹1 Crore Portfolio
            </h3>
            <p>
              Compounding does not work in a straight line. It accelerates exponentially over time:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink-soft">
              <li>
                <strong>0 to ₹25 Lakhs (Years 1 to 5):</strong> The hardest phase. Almost 75% of your corpus comes from your own pocket savings, and gains appear sluggish.
              </li>
              <li>
                <strong>₹25 Lakhs to ₹50 Lakhs (Years 5 to 7.5):</strong> Takes only about 2.5 years. Your annual returns start matching your annual fresh investments.
              </li>
              <li>
                <strong>₹50 Lakhs to ₹75 Lakhs (Years 7.5 to 9):</strong> Takes just 1.5 years. Market compounding does the heavy lifting.
              </li>
              <li>
                <strong>₹75 Lakhs to ₹1 Crore (Year 9 to 10):</strong> Takes only 12 to 14 months! A single 12% market year on an ₹85 Lakh corpus generates over ₹10 Lakh in returns alone.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              Recommended Mutual Fund Asset Allocation for a 10-Year Goal
            </h3>
            <p>
              To maintain an expected portfolio return of 12% to 14% without taking reckless risks, seasoned financial advisors recommend a diversified equity portfolio:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="rounded-xl border border-line bg-paper-2 p-3.5">
                <span className="font-bold text-forest block text-sm">50% Large & Flexi-Cap</span>
                <span className="text-xs text-ink-faint mt-1 block">
                  Nifty 50 Index Fund or top Flexi-cap funds (e.g. Parag Parikh, HDFC Flexi Cap) for steady stability.
                </span>
              </div>
              <div className="rounded-xl border border-line bg-paper-2 p-3.5">
                <span className="font-bold text-forest block text-sm">30% Mid-Cap Funds</span>
                <span className="text-xs text-ink-faint mt-1 block">
                  Nifty Midcap 150 Index or active funds (e.g. Motilal Oswal Midcap) for outperformance.
                </span>
              </div>
              <div className="rounded-xl border border-line bg-paper-2 p-3.5">
                <span className="font-bold text-forest block text-sm">20% Small-Cap / Gold</span>
                <span className="text-xs text-ink-faint mt-1 block">
                  Small-cap funds (e.g. Nippon India Small Cap) to generate alpha over full 10-year market cycles.
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-line bg-paper p-4">
              <p className="text-sm text-ink-soft">
                Ready to dive deeper into investing? Compare your options in our comprehensive guide:{" "}
                <Link
                  href="/blog/sip-vs-lumpsum"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  SIP vs Lumpsum: Which Delivers Higher Long-Term Returns in India?
                </Link>
                , or test custom annual increments with our{" "}
                <Link
                  href="/calculators/step-up-sip"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  Step-Up SIP Calculator
                </Link>
                .
              </p>
            </div>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much monthly SIP is required to make 1 crore in 10 years?",
          a: "At an expected return rate of 12% per annum, you need a flat monthly SIP of ₹43,040 to accumulate ₹1 Crore in 10 years. If your mutual fund portfolio delivers 14% CAGR, the required monthly SIP reduces to ₹38,000. If you use a 10% annual Step-Up SIP (increasing your SIP amount each year), you can start with just ₹28,600 per month.",
        },
        {
          q: "Can I make 1 crore in 5 years through SIP?",
          a: "Yes, but it requires an aggressive monthly commitment. At 12% annual return, you need an SIP of approximately ₹1,21,500 per month for 5 years. Over 5 years, you will invest ₹72.9 Lakhs and earn ₹27.1 Lakhs in returns to reach ₹1 Crore.",
        },
        {
          q: "What is the famous 15x15x15 rule in mutual funds?",
          a: "The 15x15x15 rule states that an SIP of ₹15,000 per month invested for 15 years at an expected annual return of 15% compounds into a corpus of ₹1 Crore! Out of this, you only invest ₹27 Lakhs from your pocket, while ₹73 Lakhs is pure compounding wealth.",
        },
        {
          q: "How does a Step-Up SIP help in reaching 1 crore faster?",
          a: "A Step-Up SIP increases your monthly investment by a fixed percentage (typically 10%, in line with annual salary increments) once every year. For a 10-year goal at 12%, a flat SIP requires ₹43,040/month from Day 1. With a 10% annual step-up, you start at only ₹28,600/month in Year 1, rising to ₹31,460 in Year 2, and so on, making the target much easier to start.",
        },
        {
          q: "How much income tax will I pay when I withdraw 1 crore?",
          a: "Under the revised Budget capital gains rules, Long-Term Capital Gains (LTCG) on equity mutual funds held for more than 12 months are tax-exempt up to ₹1,25,000 per financial year. Any LTCG above ₹1.25 Lakh is taxed at 12.5%. You do not pay tax on your invested principal, only on net profit.",
        },
        {
          q: "Which mutual funds are best for a 10-year 1 crore goal?",
          a: "For a 10-year horizon, a balanced equity basket works best: 50% in Large & Flexi-Cap funds (such as Parag Parikh Flexi Cap or Nifty 50 Index), 30% in Mid-Cap funds (like Motilal Oswal or Kotak Emerging Equity), and 20% in Small-Cap funds (like Nippon India Small Cap). This combination historically achieves 12% to 15% CAGR across complete economic cycles.",
        },
        {
          q: "What happens if the stock market crashes during my 10-year SIP?",
          a: "A market crash during the early and middle years of an SIP is actually an advantage, because your fixed monthly SIP buys more mutual fund units at lower NAVs (rupee cost averaging). As the market recovers, those cheap units boost your final corpus. As you near Year 9 and 10, you can use a Systematic Transfer Plan (STP) to gradually shift profits into safe liquid or debt funds to protect your ₹1 Crore.",
        },
        {
          q: "Is PPF or FD better than SIP for a 1 crore target?",
          a: "No. At current FD rates of 6.5%-7.0% or PPF rate of 7.1%, inflation and income tax erode real returns. Reaching ₹1 Crore in 10 years at 7% FD interest requires an astronomical monthly investment of ~₹57,500, and PPF has a strict statutory investment ceiling of only ₹1.5 Lakh per year (max ₹12,500/month). Equity SIP is the only instrument mathematically capable of generating inflation-beating 12%-14% wealth for a 10-year ₹1 Crore goal.",
        },
      ]}
    />
  );
}
