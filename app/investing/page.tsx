import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Investing in India - Mutual Funds, Stocks, Gold & ETFs Guide" },
  description: "Learn how to invest in India. Compare mutual funds, stocks, gold, ETFs, and fixed-income options. Free calculators for SIP, lumpsum, SWP, CAGR, and more.",
  alternates: { canonical: `${site.url}/investing` },
};

const INVESTING_BODY = `
## Saving is not investing

Money in a savings account earning 3% while inflation runs at 6% loses about 3% of its purchasing power every year. Over 20 years, ₹10 lakh sitting in a savings account buys roughly what ₹5.5 lakh buys today. **Saving protects the rupee amount; investing protects what the rupees can buy.** That is the whole reason to take any risk at all.

Before investing a single rupee, though, two things must be in place: a **fully funded emergency fund** of three to six months of essential expenses, and **no high-interest debt**. No investment reliably beats a 40% credit card rate, and no portfolio survives being liquidated in a panic because the car broke down.

## The asset classes available to an Indian investor

| Asset class | Long-run return expectation | Volatility | Liquidity | Realistic minimum horizon |
| --- | --- | --- | --- | --- |
| Equity mutual funds / index funds | 11-13% | High | 1-3 working days | 7+ years |
| Direct stocks | Wide range, often below index | Very high | Same day (T+1 settlement) | 7+ years |
| Debt mutual funds | 6-8% | Low to moderate | 1-2 working days | 1-3 years |
| Fixed deposits | 6.5-7.5% | None | Premature exit with penalty | Any |
| PPF | 7-7.5% | None | 15-year lock-in | 15 years |
| NPS | 8-12% depending on mix | Moderate | Locked until 60 | Until retirement |
| Gold (ETF / SGB) | 8-10% | Moderate | 1-2 days | 5+ years |
| Real estate | 5-9% plus 2-3% rental yield | Low visible, high real | Months | 10+ years |
| REITs | 7-10% total return | Moderate | Same day | 5+ years |

Notice that the top of the return column and the top of the volatility column are the same asset. **Return is compensation for enduring volatility, not a reward for cleverness.** The investor who accepts a 40% drawdown without selling earns the equity premium; the one who sells at the bottom pays for it.

## Risk and return, in plain terms

Indian equity, measured by broad indices, has delivered roughly 11-13% annualised over multi-decade periods. That average conceals brutal individual years: falls of 40-50% happened in 2008 and again briefly in early 2020. Debt funds and FDs deliver 6-8% with almost none of that drama.

The right way to choose is **by time horizon, not by appetite**:

- **Money needed within 1 year:** savings account, liquid fund, or short FD. No equity, ever.
- **1-3 years:** short-duration debt funds, FDs, arbitrage funds.
- **3-7 years:** hybrid funds, or a 40-60% equity mix.
- **7+ years:** predominantly equity. This is the only horizon where equity's volatility becomes acceptable and its returns become reliable.

The most common serious mistake in Indian investing is putting a two-year down payment goal into an equity fund. The second most common is putting a twenty-year retirement goal into an FD.

## Mutual funds: where most people should start

For the overwhelming majority of investors, a small number of diversified mutual funds beats a portfolio of individual stocks. You get professional management or index-tracking, instant diversification across dozens of companies, SEBI regulation, and the ability to start with ₹500 a month.

Categories worth understanding:

- **Index funds** track the Nifty 50 or a broader index at expense ratios of 0.1-0.3%. Over long periods, the majority of active large-cap funds fail to beat their index after costs, which makes an index fund the sensible default core.
- **Flexicap funds** let the manager move across large, mid and small caps. A reasonable single-fund solution.
- **Mid and small-cap funds** offer higher long-run returns with much deeper drawdowns. Suitable as a satellite holding, not a core one, and only with a 10-year horizon.
- **ELSS funds** are equity funds with a three-year lock-in that qualify for the ₹1.5 lakh 80C deduction under the old tax regime, the shortest lock-in of any 80C option.
- **Debt funds** for the fixed-income portion, chosen by duration rather than by past returns.
- **Hybrid and balanced advantage funds** manage the equity-debt split for you, useful for first-time investors.

Always choose the **direct plan** over the regular plan. The difference in expense ratio is typically 0.5-1% a year, which over 25 years can consume 15-20% of the final corpus.

## SIP vs lumpsum: the honest answer

A SIP invests a fixed amount monthly; a lumpsum invests everything at once. Purely mathematically, since markets rise more often than they fall, a lumpsum invested at a random point beats a SIP roughly two times out of three.

But that comparison is usually irrelevant, because **most people do not have a lumpsum; they have a monthly salary**. For them the SIP is not a strategy choice, it is the only mechanism available, and it happens to be an excellent one: it removes timing decisions, buys more units when prices fall, and turns investing into a habit rather than a series of judgements.

If you genuinely do have a large sum (a bonus, a maturity, an inheritance) a reasonable middle path is to deploy it over **6 to 12 months** through an STP from a liquid fund into an equity fund. You capture most of the time-in-market advantage while avoiding the regret of investing everything the week before a correction.

Compare both with the [SIP calculator](/calculators/sip) and the [lumpsum calculator](/calculators/lumpsum), and consider a [step-up SIP](/calculators/step-up-sip) that rises with your salary. Increasing the SIP 10% a year can roughly double a 20-year corpus.

## Portfolio allocation by age

A commonly cited starting point is to hold **(100 minus your age) percent in equity**, adjusted for your actual horizon and temperament:

| Age | Equity | Debt (incl. EPF/PPF) | Gold | Notes |
| --- | --- | --- | --- | --- |
| 25-35 | 75-85% | 10-20% | 5-10% | Long horizon; volatility is noise |
| 35-45 | 65-75% | 20-30% | 5-10% | Peak earning years; step up SIPs annually |
| 45-55 | 55-65% | 30-40% | 10% | Start directing new money to debt |
| 55-60 | 45-55% | 40-50% | 10% | Build a three-year cash buffer |
| 60+ | 40-50% | 45-55% | 10% | Still needs equity for a 25-year retirement |

Remember that **EPF and PPF are debt**. Many salaried Indians think they are 100% in equity because their mutual funds are equity funds, while a large EPF balance quietly makes their real allocation far more conservative.

Rebalance once a year on a fixed date. If equity has run ahead of target, move the excess to debt; if it has fallen behind, top it up. This mechanically enforces selling high and buying low without requiring any view on the market.

## Costs and taxes, which you can control

You cannot control returns. You can control costs and taxes, and over decades they matter as much.

- **Expense ratio:** 0.2% vs 1.2% on a ₹50 lakh portfolio is ₹5 lakh over ten years.
- **Equity LTCG:** gains above the annual exemption on units held over 12 months are taxed at 12.5%. Short-term gains are taxed at 20%.
- **Debt funds bought after 1 April 2023:** gains are taxed at your slab rate regardless of holding period.
- **Dividends** are taxed at your slab rate, which is why the growth option beats the dividend option for most investors.
- **Churn is a tax.** Every switch realises a gain and triggers tax. A portfolio left alone compounds pre-tax.

Estimate your position with the [income tax calculator](/calculators/income-tax) and measure real performance with the [CAGR calculator](/calculators/cagr) rather than absolute returns.

## Getting started: a six-step checklist

1. Fund the emergency fund and clear high-interest debt. Non-negotiable.
2. Buy term life insurance if anyone depends on your income, and health insurance regardless. Insurance is protection, never investment.
3. Complete KYC once: PAN, Aadhaar, bank account, video verification. It works across all fund houses.
4. Write down each goal, its horizon and its target amount. Size the monthly contribution with the [goal SIP calculator](/calculators/goal-sip).
5. Start with one index fund or one flexicap fund. Two or three funds is a complete portfolio; ten is not diversification, it is duplication.
6. Automate the SIP for the day after salary credit, increase it every year, and check the portfolio quarterly at most.

## Mistakes that cost the most

- **Stopping SIPs during a crash.** The units bought at the bottom generate the most future return. Falls are when a SIP earns its keep.
- **Chasing last year's top performer.** Category leadership rotates; buying the previous winner is buying high.
- **Holding fifteen funds.** Overlapping holdings means you own the index at active-fund fees.
- **Confusing insurance with investing.** ULIPs and endowment plans typically return 4-6% with poor transparency. Term insurance plus mutual funds does both jobs better.
- **Trading intraday or in options.** SEBI's own studies have repeatedly found that the large majority of individual traders in equity derivatives lose money.
- **Ignoring inflation on goals.** A ₹25 lakh education cost today is roughly ₹45 lakh in 10 years at 6%. Use the [inflation calculator](/calculators/inflation) when setting targets.

Long-term investing is deliberately boring. Pick a sensible allocation, use cheap direct funds, automate the contribution, increase it yearly, rebalance annually, and do nothing else. Explore the [SIP hub](/sip) to start, the [gold hub](/gold) for diversification, and the [retirement hub](/retirement) for the goal that most of this is ultimately for.
`;

const INVESTING_FAQS = [
  {
    q: "How should a beginner start investing in India?",
    a: "First build an emergency fund of three to six months of essential expenses and clear any high-interest debt. Then complete KYC once with PAN, Aadhaar and a bank account. Start a monthly SIP in a single low-cost Nifty 50 index fund or a flexicap fund through the direct plan, automate it for the day after salary credit, and increase the amount every year. Two or three funds is a complete portfolio.",
  },
  {
    q: "Is SIP better than lumpsum investing?",
    a: "Mathematically a lumpsum wins roughly two times out of three because markets rise more often than they fall. But most people invest from monthly salary, so a SIP is the only practical option, and a very good one, because it removes timing decisions and buys more units when prices fall. If you genuinely have a large sum, deploying it over six to twelve months through an STP is a sensible middle path.",
  },
  {
    q: "How much should I invest every month in India?",
    a: "At least 20% of take-home pay, rising toward 30-40% as your income grows. More usefully, work backwards from your goals: use a goal SIP calculator to find the monthly amount needed for each target, inflated to its future cost. Increasing your SIP by about 10% every year can roughly double the corpus over 20 years compared with a flat amount.",
  },
  {
    q: "Are index funds better than actively managed funds in India?",
    a: "For large-cap exposure, index funds are usually the better default because the majority of active large-cap funds fail to beat their benchmark after fees over long periods, and index funds cost 0.1-0.3% versus 1-1.5%. In mid and small-cap segments, skilled active managers have historically had more room to add value, though with far higher variability of outcomes.",
  },
  {
    q: "What is the ideal asset allocation by age in India?",
    a: "A common starting point is holding (100 minus your age) percent in equity. In practice that means roughly 75-85% equity in your late twenties and thirties, 55-65% in your late forties, and 40-50% at retirement, with 5-10% in gold throughout and the rest in debt. Crucially, count EPF and PPF as debt. Many salaried Indians are far more conservatively allocated than they realise.",
  },
  {
    q: "What returns can I realistically expect from equity mutual funds?",
    a: "Around 11-13% annualised over periods of ten years or longer, based on long-run Indian index performance. Any individual year can be very different, including falls of 40-50% as happened in 2008 and briefly in early 2020. Anyone promising consistent 20%+ returns is either extrapolating a bull market or selling something.",
  },
  {
    q: "How are mutual funds taxed in India?",
    a: "For equity funds, gains above the annual exemption on units held over 12 months are taxed at 12.5%, and short-term gains at 20%. Debt funds purchased after 1 April 2023 are taxed at your income slab rate regardless of holding period. Dividends are taxed at slab rates in all cases, which is why the growth option is generally preferable to the dividend option.",
  },
  {
    q: "Should I choose a direct or regular mutual fund plan?",
    a: "Direct, in nearly every case. Direct plans exclude distributor commission, so their expense ratio is typically 0.5-1% lower each year for an identical portfolio. Over 25 years that gap can consume 15-20% of your final corpus. The only reason to pay for a regular plan is if you are genuinely receiving valuable ongoing advice.",
  },
  {
    q: "How many mutual funds should I hold?",
    a: "Two to four is enough for almost everyone. One broad index or flexicap fund as the core, optionally one mid or small-cap fund as a satellite, and one debt fund. Holding ten or more equity funds usually means heavily overlapping portfolios. You end up owning something close to the index while paying active management fees.",
  },
  {
    q: "Should I stop my SIP when the market falls?",
    a: "No. Falling markets are when a SIP works hardest, because your fixed monthly amount buys more units at lower prices, and those units generate the largest future returns when the market recovers. Stopping a SIP during a crash converts a temporary paper loss into a permanent one. If anything, a market fall is the right time to increase the SIP.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Investing in India"
      description="Build wealth that lasts. Whether you are a beginner picking your first mutual fund or an experienced investor diversifying into gold and ETFs, find the tools and guides you need."
      badge="Investing Hub"
      sections={[
        {
          title: "By Investment Type",
          columns: 4,
          links: [
            { title: "SIP Investing", href: "/sip", desc: "Systematic Investment Plans" },
            { title: "Mutual Funds", href: "/glossary/mutual-fund", desc: "Equity, debt, hybrid funds" },
            { title: "Stock Market", href: "/blog/stock-market-beginners-india", desc: "Direct equity investing" },
            { title: "Gold", href: "/gold", desc: "SGB, gold ETFs, digital gold" },
            { title: "ETF Investing", href: "/glossary/etf", desc: "Exchange Traded Funds" },
            { title: "Index Funds", href: "/blog/index-funds-india-guide", desc: "Passive Nifty 50 investing" },
            { title: "ELSS Funds", href: "/blog/elss-vs-ppf-vs-nps-tax-saving-2026", desc: "Tax-saving equity funds" },
            { title: "Fixed Income", href: "/savings", desc: "FD, bonds, debt funds" },
          ],
        },
        {
          title: "Investment Calculators",
          columns: 3,
          links: [
            { title: "SIP Calculator", href: "/calculators/sip", desc: "Monthly SIP returns with step-up and tax" },
            { title: "Lumpsum Calculator", href: "/calculators/lumpsum", desc: "One-time investment growth" },
            { title: "CAGR Calculator", href: "/calculators/cagr", desc: "Compound annual growth rate" },
            { title: "SWP Calculator", href: "/calculators/swp", desc: "Monthly withdrawals from corpus" },
            { title: "Goal SIP Calculator", href: "/calculators/goal-sip", desc: "SIP needed for any financial goal" },
            { title: "Mutual Fund Returns", href: "/calculators/mutual-fund-returns", desc: "MF lumpsum returns with CAGR" },
            { title: "Compound Interest", href: "/calculators/compound-interest", desc: "Compounding across any frequency" },
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Corpus and SIP for retirement" },
            { title: "Inflation Calculator", href: "/calculators/inflation", desc: "Future value adjusted for inflation" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 4,
          links: [
            { title: "SIP", href: "/glossary/sip", desc: "Systematic Investment Plan" },
            { title: "Mutual Fund", href: "/glossary/mutual-fund", desc: "Pooled investment vehicle" },
            { title: "NAV", href: "/glossary/nav", desc: "Net Asset Value" },
            { title: "CAGR", href: "/glossary/cagr", desc: "Compound Annual Growth Rate" },
            { title: "Diversification", href: "/glossary/diversification", desc: "Spreading risk across assets" },
            { title: "Expense Ratio", href: "/glossary/expense-ratio", desc: "What funds charge you" },
            { title: "Asset Allocation", href: "/glossary/asset-allocation", desc: "Split across equity, debt, gold" },
            { title: "Capital Gains", href: "/glossary/capital-gains", desc: "How long-term and short-term gains are taxed" },
          ],
        },
      ]}
      intro="Money in a savings account at 3% while inflation runs at 6% loses purchasing power every single year. Saving protects the rupee amount, investing protects what those rupees can buy. This hub covers the asset classes available in India, how to match each goal to the right one by time horizon, how much to hold in equity at each age, and the costs and taxes you can actually control."
      bodyMarkdown={INVESTING_BODY}
      faqs={INVESTING_FAQS}
      relatedHubs={[
        { title: "SIP", href: "/sip" },
        { title: "Mutual Funds", href: "/blog/best-mutual-funds-2026-india" },
        { title: "Retirement", href: "/retirement" },
        { title: "Savings", href: "/savings" },
      ]}
    />
  );
}
