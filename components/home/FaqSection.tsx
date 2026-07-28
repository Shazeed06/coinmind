import Link from "next/link";

export const FAQS = [
  { q: "What is a SIP and how does it work?", a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund every month. It uses rupee cost averaging — when markets are high, your fixed amount buys fewer units, and when markets are low, it buys more. Over time, this averages your purchase price and removes the need to time the market. You can start a SIP with as little as Rs 500 per month through platforms like Groww, Zerodha Coin, or directly with fund houses." },
  { q: "How is EMI calculated?", a: "EMI (Equated Monthly Installment) is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the number of monthly installments. Our EMI calculator shows your monthly payment, total interest payable, and a complete amortisation schedule breaking down principal vs interest for each payment." },
  { q: "How much should I save every month?", a: "The 50/30/20 rule is a widely recommended starting point: spend 50% of your income on needs (rent, groceries, utilities), 30% on wants (dining, entertainment, travel), and save or invest 20%. The ideal savings rate depends on your age, goals, and expenses — younger investors aiming for early retirement often target 40-50%. Use our budget planning guide to find your optimal rate." },
  { q: "What is CAGR and why does it matter?", a: "CAGR (Compound Annual Growth Rate) measures the average annual return of an investment over a specific period, assuming profits are reinvested. It is calculated as: CAGR = (Ending Value / Beginning Value)^(1/n) - 1. CAGR matters because it gives you a smoothed annual return that accounts for compounding, making it easier to compare different investments regardless of their volatility or time period." },
  { q: "How much emergency fund is enough for an Indian family?", a: "Most experts recommend 3 to 6 months of essential expenses. For a single-income family with children and a home loan in India, aim for 6 to 9 months. If you are self-employed or a freelancer, target 12 months. Keep one month of expenses in a savings account for instant access and the rest in a liquid mutual fund earning 6-7% interest." },
  { q: "How does inflation affect my savings?", a: "Inflation reduces the purchasing power of your money over time. If your savings account earns 3% but inflation is 6%, your real return is -3% — meaning your money buys less each year. This is why it is important to invest in assets that historically beat inflation, such as equity mutual funds (12-15% long-term returns) rather than keeping all your money in savings accounts or FD." },
  { q: "What is the difference between large cap, mid cap, and small cap?", a: "Large cap funds invest in the top 100 companies by market capitalisation (stable, lower risk, moderate returns). Mid cap funds invest in companies ranked 101-250 (moderate risk, higher growth potential). Small cap funds invest in the next 250+ companies (highest risk, highest potential returns). Beginners should start with large cap or flexi cap funds before exploring mid and small cap options." },
  { q: "How is income tax calculated under the new regime?", a: "Under the new regime for FY 2026-27, income up to Rs 4 lakh is tax-free. The next Rs 4 lakh (Rs 4-8 lakh) is taxed at 5%, Rs 8-12 lakh at 10%, Rs 12-16 lakh at 15%, Rs 16-20 lakh at 20%, Rs 20-24 lakh at 25%, and above Rs 24 lakh at 30%. A rebate under Section 87A zeroes tax for taxable income up to Rs 12 lakh. A 4% health and education cess applies on top." },
  { q: "What is the 50/30/20 budget rule?", a: "The 50/30/20 rule is a simple budgeting framework popularised by Senator Elizabeth Warren. Allocate 50% of your after-tax income to needs (housing, food, utilities, transport), 30% to wants (dining, travel, entertainment, subscriptions), and 20% to savings and investments (SIP, PPF, emergency fund, debt repayment). It is a flexible starting point that adapts to your income level and lifestyle." },
  { q: "Should I choose the old or new tax regime?", a: "The old regime has higher tax rates but allows deductions (80C, 80D, HRA, home loan interest). The new regime has lower rates but fewer deductions. Generally, if you claim deductions exceeding Rs 3-4 lakh annually, the old regime may save more. Use our tax regime break-even calculator to compare both regimes for your exact income and deductions." },
  { q: "What is the difference between active and index mutual funds?", a: "Active funds have a fund manager who picks stocks to try to beat the market. They charge higher expense ratios (1-1.5%). Index funds simply track an index like Nifty 50 and charge very low expenses (0.1-0.3%). Research consistently shows that most active fund managers fail to beat their benchmark index over long periods, making index funds the better choice for most investors." },
  { q: "How does PPF work and should I invest?", a: "PPF (Public Provident Fund) is a government-backed savings scheme with a 15-year lock-in period. It offers tax-free interest (currently around 7.1%) with the tax benefit under Section 80C up to Rs 1.5 lakh per year. The interest is compounded annually and both the principal and interest are tax-free at withdrawal. PPF is ideal for conservative investors building their retirement corpus." },
  { q: "What is the difference between FD and RD?", a: "A Fixed Deposit (FD) is a one-time lump sum investment for a fixed tenure at a fixed interest rate. A Recurring Deposit (RD) allows you to invest a fixed amount every month for a fixed tenure. Both offer guaranteed returns, but FD is suitable if you have a lump sum, while RD helps build a corpus through monthly savings. Both are among the safest investment options in India." },
  { q: "How does the Section 87A rebate work?", a: "Section 87A of the Income Tax Act provides a rebate that reduces your tax liability to zero if your total taxable income does not exceed Rs 12 lakh under the new regime (or Rs 7 lakh under the old regime) for FY 2026-27. The rebate is applied after calculating your tax based on the slabs, making income up to these thresholds effectively tax-free for most taxpayers." },
  { q: "What is ELSS and how is it different from other mutual funds?", a: "ELSS (Equity Linked Savings Scheme) is an equity mutual fund that qualifies for tax deduction under Section 80C up to Rs 1.5 lakh per year. It has the shortest lock-in period among all 80C investments — just 3 years. Unlike PPF or tax-saving FD, ELSS invests in equities and offers the potential for higher returns, though with higher risk." },
  { q: "How do I check my CIBIL score for free?", a: "You can check your CIBIL score for free once a year through the official CIBIL website or through platforms like Groww, Paytm, and OneScore that offer free credit score checks. A good CIBIL score (750+) improves your chances of loan approval and helps secure lower interest rates on home loans, personal loans, and credit cards." },
  { q: "What is a good credit score in India?", a: "CIBIL scores range from 300 to 900. A score above 750 is considered excellent and will likely get you loan approval with competitive interest rates. Scores between 650-749 are fair and may result in higher rates or require additional documentation. Below 650 is poor and loans may be difficult to obtain. Your score is based on payment history, credit utilisation, account age, and credit mix." },
  { q: "How much home loan can I afford?", a: "Banks typically allow EMI up to 40-50% of your monthly income. For example, if your monthly take-home salary is Rs 1 lakh, your maximum EMI would be around Rs 40,000-50,000. At 8.5% interest over 20 years, this translates to a loan of approximately Rs 45-55 lakh. Use our home loan eligibility calculator to find your exact loan amount." },
  { q: "Can I retire early in India?", a: "Yes, the FIRE (Financial Independence, Retire Early) approach is achievable in India with disciplined saving. You typically need a corpus of 25-30 times your annual expenses, invested in a mix of equity and debt. At a 40-60% savings rate, early retirement is realistic within 12-20 years. Our FIRE guide shows you exactly how to calculate your target corpus and build a plan." },
  { q: "What is SWP and when should I use it?", a: "SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount from your mutual fund investment at regular intervals — monthly, quarterly, or annually. It is commonly used by retirees to generate a regular income stream from their corpus. SWP is more tax-efficient than FD interest because only the capital gains portion is taxed, not the entire withdrawal." },
];

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">FAQ</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
          Frequently Asked Finance Questions
        </h2>
        <p className="mt-3 text-ink-soft">
          Detailed answers to the most common personal finance questions. Optimised for AI overviews and voice search.
        </p>
      </div>
      <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-card">
        {FAQS.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-ink list-none hover:text-forest transition-colors">
              {f.q}
              <span className="shrink-0 text-ink-faint transition-transform group-open:rotate-45 text-lg leading-none">+</span>
            </summary>
            <p className="px-5 pb-4 text-sm text-ink-soft leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink-faint">
        Browse the <Link href="/glossary" className="text-forest font-semibold hover:underline">full finance glossary</Link> for more terms and definitions.
      </p>
    </section>
  );
}
