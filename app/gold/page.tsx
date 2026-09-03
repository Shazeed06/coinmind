import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Gold Investment India - SGB, Gold ETFs, Digital Gold Guide 2026" },
  description: "Complete guide to investing in gold in India. Compare Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold. Returns, tax, safety, and liquidity compared.",
  alternates: { canonical: `${site.url}/gold` },
};

const GOLD_BODY = `
## Why gold still matters in an Indian portfolio

Gold does something no other mainstream Indian asset reliably does: it tends to hold or gain value in exactly the periods when equities are falling and the rupee is weakening. Because gold is priced globally in dollars, a rupee investor earns two things at once: the change in the international gold price, and the change in the USD/INR rate. Over the last two decades the rupee has depreciated at roughly 3-4% a year on average, which has quietly added to domestic gold returns even in years when global gold was flat.

That is the honest case for gold: it is a **portfolio stabiliser and a currency hedge**, not a wealth-compounding engine. Over long horizons Indian equity has beaten gold comfortably. Over specific stretches (2008-2012, 2019-2020, and again during the inflation scare of the early 2020s) gold beat equity badly. Owning both is the point.

## The four ways to own gold in India

| Method | What you actually own | Typical annual cost | Liquidity | Best for |
| --- | --- | --- | --- | --- |
| Sovereign Gold Bond (SGB) | An RBI-issued bond tracking gold price + 2.5% interest | Nil | Exchange sale anytime; RBI buyback from year 5 | Long holders who want the extra 2.5% |
| Gold ETF | Units backed by 99.5%+ purity physical gold in a vault | 0.4-0.9% expense ratio + brokerage | Sell on NSE/BSE any trading day | Anyone with a demat account |
| Gold mutual fund / fund of funds | Units of a fund that buys a gold ETF | 0.5-1.2% (ETF cost + FoF layer) | Redeem in 2-3 working days | SIP investors with no demat account |
| Digital gold | Grams held with a vaulting partner (MMTC-PAMP, Augmont, SafeGold) | 3% GST on purchase + 2-6% buy-sell spread | Instant sell or convert to coins | Very small amounts, gifting |
| Physical gold and jewellery | Metal in your hand | 8-25% making charges + 3% GST + locker/insurance | Depends on buyer; jewellers deduct heavily | Consumption, weddings, tradition |

The pattern is simple. **The more the product looks like jewellery, the more of your money goes to somebody else.** A ₹1 lakh gold purchase in jewellery form can start life worth ₹75,000 as an investment once making charges and GST are stripped out. The same ₹1 lakh in an ETF starts at roughly ₹99,500.

## Sovereign Gold Bonds: the best deal that is no longer being issued

SGBs were issued by the RBI on behalf of the Government of India. They pay **2.5% annual interest on the original investment amount**, on top of tracking the gold price, and, crucially, **capital gains are entirely tax-free if you hold to the 8-year maturity**. Nothing else in Indian finance offers a tax-free, government-backed, gold-linked return.

The catch: fresh tranches have been discontinued, so you can no longer subscribe to a new issue. Existing SGBs still trade on the NSE and BSE. Buying them on the secondary market gets you the interest and the gold exposure, but the tax-free-at-maturity benefit is generally understood to apply to the original subscriber, and exchange volumes are thin. Bonds sometimes trade at a discount to the actual gold value, which can be an opportunity, but you may struggle to buy or sell large quantities at a fair price.

If you already hold SGBs from an earlier tranche, **holding to maturity is almost always the right call**.

## Gold ETFs and gold mutual funds

For most people investing today, a gold ETF is the practical default. Each unit is backed by physical gold of 99.5% or higher purity held with a SEBI-regulated custodian, priced continuously through the trading day, and sellable in seconds. There are no making charges, no storage risk, no purity doubt.

Two things to check before buying an ETF:

- **Expense ratio.** The gap between the cheapest and most expensive gold ETFs is roughly half a percent a year. Over 15 years that compounds into a meaningful difference.
- **Tracking difference and liquidity.** Look at average daily traded volume. A thinly traded ETF can have a wide bid-ask spread that costs you more than the expense ratio saves.

If you do not have a demat account, a **gold fund of funds** achieves the same thing through a regular mutual fund folio, and, unlike an ETF, supports a proper monthly SIP. The trade-off is a small extra layer of cost. You can model what a monthly gold SIP would grow to using our [SIP calculator](/calculators/sip), or a one-time purchase with the [lumpsum calculator](/calculators/lumpsum).

## Digital gold: convenient, but read the fine print

Digital gold lets you buy from ₹10 upward through payment apps and brokers. It is genuinely useful for gifting and for people who want to accumulate in tiny amounts. But it is **not a SEBI-regulated product**. You are relying on the vaulting company's contract. You also pay 3% GST at purchase and face a buy-sell spread that is typically 2-6%. That combined drag means digital gold needs a meaningful price rise just to break even. Use it for small sums and short accumulation, not as your core gold holding.

## Physical gold and jewellery

If you are buying gold to wear, buy jewellery. Just do not call it an investment. Insist on **BIS hallmarking with a six-digit HUID**, get a proper GST invoice, and ask for the making charge as a separate line item so you can negotiate it. Coins and bars from banks and reputable jewellers carry far lower making charges (typically 2-8%) than ornate jewellery, but banks are not permitted to buy gold back, so plan your exit before you buy.

## How gold is taxed in India

| Instrument | Short-term treatment | Long-term treatment |
| --- | --- | --- |
| Physical and digital gold | Held up to 24 months: gains added to income, taxed at slab | Held over 24 months: 12.5% without indexation |
| Gold ETF | Held up to 12 months: slab rate | Held over 12 months: 12.5% without indexation |
| Gold mutual fund (FoF) | Held up to 24 months: slab rate | Held over 24 months: 12.5% without indexation |
| SGB held to maturity | Not applicable | Capital gains exempt; the 2.5% interest is taxed at slab every year |
| SGB sold on exchange | Held up to 12 months: slab rate | Held over 12 months: 12.5% |

Two extra points worth knowing. There is **no wealth tax on gold**, but cash purchases above ₹2 lakh attract reporting requirements and PAN is mandatory. And inherited gold carries the original owner's cost and holding period, so an inheritance does not reset your tax clock. Estimate your bracket first with the [income tax calculator](/calculators/income-tax).

## How much gold should you actually hold?

The evidence-backed answer for a long-term Indian investor is **5-15% of financial assets**, with 10% a sensible middle. Below 5% gold is too small to change your portfolio's behaviour in a crisis. Above 20% you are giving up too much long-run equity growth for stability you do not need.

A practical way to think about it by life stage:

- **In your 20s and 30s:** 5-10%. Your biggest asset is future income; you can absorb equity volatility, so lean into growth.
- **In your 40s and 50s:** 10-15%. Sequence-of-returns risk starts mattering, and gold's low correlation with equity earns its place.
- **At and after retirement:** 10-15%, held in liquid form only. You may need to sell in a hurry; jewellery is a terrible source of emergency cash.

Importantly, **jewellery you intend to keep does not count**. Treat family gold as a consumption asset, not as part of the 10%. If you rebalance annually (selling gold after it spikes and buying equity, or vice versa) you capture most of gold's diversification benefit mechanically, without needing a view on the price.

## How to buy gold: a step-by-step

1. Decide the rupee amount, working backwards from your target allocation, not from a price forecast.
2. Choose the wrapper: ETF if you have a demat account, gold fund of funds if you want a monthly SIP, SGB on the secondary market if you find one at a fair discount.
3. Check the expense ratio and 30-day average volume before picking a specific ETF.
4. Buy in tranches, three or four purchases across a few months, rather than in one go after a price rally.
5. Set a calendar reminder to rebalance once a year, on the same date each year.
6. Record your purchase date and cost so you can compute the holding period and capital gains correctly later.

## Common mistakes

- **Buying gold after a headline.** Gold's biggest inflows always come after it has already risen. Allocation should drive purchases, not news.
- **Confusing jewellery with investment.** Making charges and the jeweller's buyback deduction can eat a decade of returns.
- **Holding gold in a locker and forgetting insurance.** Bank lockers do not insure contents by default.
- **Selling SGBs early.** Giving up the tax-free maturity benefit is usually the single most expensive gold decision an Indian investor can make.
- **Treating gold as an emergency fund.** Emergencies arrive when markets are stressed. Keep an actual cash buffer. See our [savings hub](/savings) and the [FD calculator](/calculators/fd) for safer places to park it.

Gold works best when it is boring: a fixed, modest slice of a diversified portfolio, bought in the cheapest available wrapper, rebalanced on a schedule, and left alone. Pair it with an equity allocation through the [investing hub](/investing) and a solid debt base, and it will do its job quietly for decades.
`;

const GOLD_FAQS = [
  {
    q: "Which is better: Sovereign Gold Bonds or Gold ETFs?",
    a: "For an original subscriber holding to maturity, SGBs are better. They add 2.5% annual interest on top of the gold price and capital gains at the 8-year maturity are tax-free. However, fresh SGB tranches have been discontinued, so new buyers can only purchase them on the secondary market, where liquidity is thin. For most people investing today, a low-expense-ratio gold ETF is the practical choice because it is liquid, cheap and easy to sell.",
  },
  {
    q: "How much gold should I have in my portfolio in India?",
    a: "Most evidence supports 5-15% of your financial assets in gold, with around 10% a reasonable default. Below 5% it is too small to meaningfully cushion an equity fall; above 20% you sacrifice too much long-term equity growth. Jewellery you intend to keep and wear should be treated as a consumption asset and excluded from this allocation.",
  },
  {
    q: "Is digital gold safe in India?",
    a: "Digital gold is backed by physical metal held with a vaulting partner, but it is not regulated by SEBI or the RBI, so you are relying on the provider's contractual promise rather than a regulated framework. It also carries 3% GST at purchase and a 2-6% buy-sell spread. It is fine for very small amounts and gifting, but a gold ETF or gold mutual fund is a safer home for your core gold allocation.",
  },
  {
    q: "What is the tax on selling gold in India?",
    a: "Physical and digital gold sold within 24 months is taxed at your income slab rate; beyond 24 months, long-term gains are taxed at 12.5% without indexation. Gold ETFs get long-term treatment after 12 months at 12.5%, while gold fund of funds need 24 months. Sovereign Gold Bonds held to their 8-year maturity have their capital gains fully exempt, though the 2.5% annual interest is taxable at slab rates each year.",
  },
  {
    q: "Is it better to buy gold jewellery or gold coins?",
    a: "Gold coins and bars from banks or reputable jewellers carry making charges of roughly 2-8%, compared with 8-25% for ornate jewellery, so coins retain far more of your money as gold. But note that banks are not permitted to buy gold back, so identify your exit route before buying physical gold at all. If the purpose is investment rather than wearing, an ETF avoids making charges entirely.",
  },
  {
    q: "Does gold give better returns than mutual funds in India?",
    a: "Over long horizons of 15 years or more, diversified Indian equity mutual funds have historically outperformed gold. But gold has beaten equity decisively during specific stress periods such as 2008-2012 and 2019-2020, precisely when equity was falling. The two are complements, not substitutes. A 10% gold allocation reduces portfolio volatility without giving up much long-run return.",
  },
  {
    q: "How do I check if my gold is real?",
    a: "Look for the BIS hallmark, which since 2021 includes a six-digit alphanumeric HUID (Hallmark Unique Identification) number that you can verify in the BIS Care app. The mark also shows purity in carats and fineness, such as 22K916 for 22-carat gold. Always insist on a GST invoice that separately lists the metal value, making charges and GST.",
  },
  {
    q: "Can I take a loan against my gold, and is it a good idea?",
    a: "Yes. Banks and NBFCs lend against gold jewellery and coins, typically up to 75% of the value, at interest rates well below personal loans. It can make sense for a short, genuine cash need because it is quick and does not depend heavily on your credit score. The risk is real, though: if you default, the lender auctions your gold. Compare the cost against other options using our EMI calculator before committing.",
  },
  {
    q: "Should I buy gold now or wait for prices to fall?",
    a: "Timing gold is as difficult as timing equity, and most retail buying happens after a price rally rather than before one. A better approach is allocation-driven: decide what percentage of your portfolio should be gold, then buy in three or four tranches over a few months to average your entry price, and rebalance once a year on a fixed date.",
  },
  {
    q: "Do Sovereign Gold Bonds still pay interest if I buy them on the exchange?",
    a: "Yes. The 2.5% annual interest is paid to whoever holds the bond on the record date, so a secondary-market buyer receives it. That interest is taxable at your slab rate. The tax exemption on capital gains at maturity, however, is generally understood to apply to the original subscriber, so a secondary buyer should not assume tax-free redemption.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Gold Investment in India"
      description="Gold has never been more accessible. Compare Sovereign Gold Bonds, Gold ETFs, digital gold, and physical gold across returns, tax, safety, and liquidity. Find the right gold investment for you."
      badge="Gold Hub"
      sections={[
        {
          title: "Gold Investment Guides",
          columns: 2,
          links: [
            { title: "Gold Investment Guide 2026", href: "/blog/gold-investment-guide-india", desc: "SGB vs Gold ETFs vs Digital Gold vs Physical - full comparison" },
            { title: "What are Sovereign Gold Bonds?", href: "/glossary/sovereign-gold-bond", desc: "SGB features, interest, tax benefits, and maturity" },
            { title: "Gold ETFs Explained", href: "/glossary/gold-etf", desc: "How gold exchange-traded funds work" },
            { title: "Digital Gold Guide", href: "/glossary/digital-gold", desc: "Buying and selling gold online" },
            { title: "Gold vs Silver", href: "/blog/gold-vs-silver-investment-india", desc: "How the two metals compare for Indian investors" },
            { title: "Gold Rate: Digital vs Physical", href: "/blog/gold-rate-digital-vs-physical-2026", desc: "How gold is priced and where the extra costs sit" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "Sovereign Gold Bond", href: "/glossary/sovereign-gold-bond", desc: "Government gold bonds explained" },
            { title: "Gold ETF", href: "/glossary/gold-etf", desc: "Gold exchange-traded funds" },
            { title: "Digital Gold", href: "/glossary/digital-gold", desc: "Online gold investment" },
            { title: "Hallmark", href: "/glossary/hallmark", desc: "Gold purity certification" },
            { title: "Capital Gains on Gold", href: "/glossary/capital-gains", desc: "How gains on gold are taxed" },
            { title: "Diversification", href: "/glossary/diversification", desc: "Why gold belongs in your portfolio" },
          ],
        },
      ]}
      intro="Indian households hold an estimated 25,000 tonnes of gold, more than the reserves of the top five central banks combined. But most of it sits as jewellery, earning nothing and costing 8-25% in making charges. This hub covers the four ways to own gold in India, how each is taxed, and how much of your portfolio gold actually deserves."
      bodyMarkdown={GOLD_BODY}
      faqs={GOLD_FAQS}
      relatedHubs={[
        { title: "Investing", href: "/investing" },
        { title: "ETF & Index Funds", href: "/glossary/etf" },
        { title: "Savings", href: "/savings" },
        { title: "Tax", href: "/income-tax" },
      ]}
    />
  );
}
