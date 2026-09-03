import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Retirement Planning India - NPS, PPF, EPF & SWP Guide 2026" },
  description: "Plan a comfortable retirement in India. Calculate your retirement corpus, compare NPS vs PPF vs EPF, plan SWP income, and build a pension that lasts 30+ years.",
  alternates: { canonical: `${site.url}/retirement` },
};

const RETIREMENT_BODY = `
## India has no safety net, so the corpus has to do everything

Outside of government service, India has no meaningful state pension. There is no equivalent of social security that pays a living income for life. EPF gives most salaried people a pension under EPS, but it is capped at a level that will not cover a household's groceries. Which means for the vast majority of Indians, **retirement income is entirely a function of the corpus you accumulate before you stop working**.

That corpus has to survive something Indians underestimate: length. A 60-year-old Indian today has a reasonable chance of living into their mid-80s, and a couple has a good chance that at least one partner reaches 90. Planning for 25-30 years of retirement is realistic, not conservative.

## Working out the number you actually need

The honest starting point is your **current annual expenses, not your income**. Retirement removes some costs (commuting, work clothes, children's education, home loan EMI if it is paid off, and your own retirement contributions) and adds others, mainly healthcare.

A workable three-step method:

1. Take your current annual essential expenses. Subtract costs that end at retirement, add roughly ₹1-2 lakh a year in additional healthcare and insurance.
2. Inflate that figure to your retirement age at 6% a year. Use the [inflation calculator](/calculators/inflation) rather than guessing.
3. Multiply the inflated annual expense by 25 to 30. That multiple corresponds to a 3.3-4% initial withdrawal rate.

Here is what that looks like in practice for someone retiring at 60, assuming 6% inflation:

| Current annual expenses | Years to retirement | Expense at retirement | Corpus needed (x25) |
| --- | --- | --- | --- |
| ₹6,00,000 | 30 | ₹34,46,000 | ₹8.6 crore |
| ₹6,00,000 | 20 | ₹19,24,000 | ₹4.8 crore |
| ₹6,00,000 | 10 | ₹10,75,000 | ₹2.7 crore |
| ₹12,00,000 | 25 | ₹51,50,000 | ₹12.9 crore |
| ₹12,00,000 | 15 | ₹28,76,000 | ₹7.2 crore |

Those numbers look alarming, and they should, but remember the corpus is also built with compounding and rising contributions, not with today's salary alone. Run your own figures in the [retirement calculator](/calculators/retirement); it is far more useful than any rule of thumb.

The **4% rule** (withdraw 4% of the corpus in year one, then raise that rupee amount by inflation each year) was derived from US market history. For India, with higher inflation and shorter reliable data, a **3-3.5% initial withdrawal rate is safer**, which implies a corpus of 28-33 times your first-year expenses.

## The Indian retirement toolkit

| Vehicle | Who it suits | Lock-in | Typical long-run return | Tax on maturity |
| --- | --- | --- | --- | --- |
| EPF | Salaried employees | Until retirement or job exit | 8-8.25% declared annually | Tax-free after 5 years of continuous service |
| PPF | Everyone, especially the self-employed | 15 years, extendable in 5-year blocks | 7-7.5%, revised quarterly | Fully tax-free (EEE) |
| NPS | Everyone; strongest for high earners | Until 60, partial withdrawal allowed | 9-12% equity-heavy, 8-9% balanced | 60% lump sum tax-free; 40% must buy an annuity |
| Equity mutual funds via SIP | Anyone with 10+ years to go | None | 11-13% long-run expectation | 12.5% LTCG above the annual exemption |
| Senior Citizen Savings Scheme | Only after 60 | 5 years | Set quarterly, historically 8%+ | Interest taxable at slab |
| Annuity | Converting corpus to guaranteed income | Permanent | 6-7% | Annuity income taxed at slab |

**EPF** is the base for salaried people. At 12% of basic from you and a matching employer contribution, it compounds quietly for decades. The most valuable habit here is simple: when you change jobs, **transfer the EPF rather than withdrawing it**. Every withdrawal resets the compounding that makes EPF work. Check where yours is heading with the [EPF calculator](/calculators/epf).

**PPF** is the most reliable tax-free instrument available to Indians, and the only one that is EEE: contribution deductible, interest exempt, maturity exempt. The ₹1.5 lakh annual cap limits how much wealth it can build on its own, but as the safe, debt portion of a retirement portfolio it is close to unbeatable. See the [PPF calculator](/calculators/ppf) for what a 15-year run produces.

**NPS** is the most misunderstood. It offers an extra ₹50,000 deduction under section 80CCD(1B) over and above the 80C limit, plus employer contributions up to 14% of basic that are deductible under 80CCD(2), and that employer route survives in the new tax regime, which makes it genuinely valuable for high earners. The cost is flexibility: at 60, at least 40% of the corpus must buy an annuity, and annuity rates in India are modest and fully taxable. Model both halves with the [NPS calculator](/calculators/nps).

**Equity mutual funds** are what actually beat inflation over 20-30 years. No fixed-income product in India has a track record of delivering meaningfully positive real returns after tax. A monthly SIP into a diversified index or flexicap fund, increased annually, is the workhorse of most modern Indian retirement plans. See the [SIP calculator](/calculators/sip) and the [step-up SIP calculator](/calculators/step-up-sip).

## How much to invest each month

Starting early is worth more than investing more. A monthly SIP of ₹10,000 at an assumed 11% return produces roughly:

- **After 15 years:** about ₹50 lakh
- **After 20 years:** about ₹96 lakh
- **After 25 years:** about ₹1.8 crore
- **After 30 years:** about ₹3.3 crore

The jump from 25 to 30 years adds more than the entire first fifteen years produced. That is compounding doing the work, and it is why a 25-year-old investing ₹8,000 a month usually ends up ahead of a 35-year-old investing ₹20,000.

If you are starting late, the levers are: **increase the contribution aggressively each year**, delay retirement by two or three years, keep a higher equity allocation for longer, and reduce the target expense figure. All four help; the first two help most.

## Asset allocation as retirement approaches

A workable glide path for an Indian investor:

- **Age 25-40:** 75-85% equity, 10-20% debt (EPF and PPF count), 5-10% gold. Volatility is irrelevant at this horizon.
- **Age 40-50:** 65-75% equity. Start directing new money toward debt rather than selling equity.
- **Age 50-58:** 50-60% equity. Begin building a cash and short-duration debt bucket.
- **At retirement (60):** 40-50% equity, the rest in debt and cash. A retiree with 30 years ahead still needs equity. An all-debt portfolio guarantees a loss to inflation.

The critical risk in the five years either side of retirement is **sequence of returns**: a 35% market fall in your first retirement year, while you are also withdrawing, does permanent damage that the same fall at 45 would not. The defence is a **bucket structure**: keep three years of expenses in cash and short-duration debt so you never have to sell equity into a crash.

## Turning the corpus into monthly income

Four sources, usually combined:

1. **SWP from mutual funds.** Set a fixed monthly withdrawal from a debt or hybrid fund. Tax-efficient because only the gain portion of each redemption is taxed. Plan it with the [SWP calculator](/calculators/swp).
2. **SCSS and Post Office MIS.** Guaranteed quarterly or monthly payouts for those over 60, with investment limits per person. Safe, but interest is fully taxable. See the [SCSS calculator](/calculators/scss).
3. **Annuity from NPS.** Mandatory for at least 40% of the NPS corpus. Provides a guaranteed income for life, which is genuinely valuable protection against living longer than planned, even though the rate is modest.
4. **Interest from FDs and bonds.** Simple and predictable. Senior citizens get a higher rate and a larger interest exemption. The [FD calculator](/calculators/fd) helps compare ladders.

A practical structure many Indian retirees use: annuity and SCSS cover essential expenses, an SWP from a hybrid fund covers discretionary expenses, and a growing equity allocation quietly protects purchasing power for the second half of retirement.

## What inflation does over 25 years

At 6% inflation, ₹1 lakh of monthly expenses today becomes about ₹4.3 lakh in 25 years. Healthcare inflation in India runs higher, commonly estimated at 10-14%, which is why a health insurance policy bought young and maintained continuously is a core part of retirement planning rather than an afterthought. A single uninsured hospitalisation can remove several years of corpus.

## Common retirement planning mistakes

- **Withdrawing EPF at every job change.** The most expensive habit in Indian retirement planning.
- **Counting on the property you live in.** You cannot eat a house, and selling the home you live in creates a rent expense.
- **Relying on children.** Longer lifespans and their own costs make this an unreliable plan, not a rude one.
- **Buying endowment or money-back insurance as retirement savings.** Returns typically land at 4-6%, below inflation. Buy term insurance for protection and invest the difference.
- **Going fully into FDs at 60.** With a 30-year horizon, an all-debt portfolio loses to inflation with near certainty.
- **No health cover of your own.** Employer cover ends the day you retire, and buying a fresh policy at 60 is expensive and comes with waiting periods.
- **Planning to 75.** Plan to 90, or to 95 for a couple.

Start with the [retirement calculator](/calculators/retirement) to find your number, then use the [savings hub](/savings) to pick the vehicles and the [investing hub](/investing) to build the equity engine that gets you there.
`;

const RETIREMENT_FAQS = [
  {
    q: "How much money do I need to retire in India?",
    a: "Take your current annual essential expenses, inflate them to your retirement age at about 6% a year, and multiply by 25 to 30. For someone spending ₹6 lakh a year today and retiring in 20 years, that works out to roughly ₹4.8 crore. The multiple of 25-30 corresponds to a safe initial withdrawal rate of 3.3-4% and assumes a retirement lasting 25-30 years.",
  },
  {
    q: "Is NPS better than PPF for retirement?",
    a: "They do different jobs. NPS offers an extra ₹50,000 deduction under 80CCD(1B) plus employer contributions deductible under 80CCD(2), and holds equity so it can return 9-12% over the long run, but at least 40% of the corpus must buy an annuity at 60. PPF returns 7-7.5%, is fully tax-free at every stage, and pays out as a lump sum with no annuity requirement. Most people benefit from holding both.",
  },
  {
    q: "Does the 4% withdrawal rule work in India?",
    a: "Not without adjustment. The 4% rule was derived from US market history with lower inflation. Given India's higher inflation and shorter reliable market data, a 3-3.5% initial withdrawal rate is safer, which means a corpus of about 28-33 times your first-year retirement expenses rather than 25 times.",
  },
  {
    q: "What is the best age to start retirement planning in India?",
    a: "The moment you start earning. A monthly SIP of ₹10,000 at 11% grows to roughly ₹96 lakh over 20 years but about ₹3.3 crore over 30 years. The last decade adds more than the first fifteen years produced. Starting at 25 with ₹8,000 a month typically beats starting at 35 with ₹20,000 a month.",
  },
  {
    q: "Should I withdraw my EPF when changing jobs?",
    a: "No. Transfer it instead using your UAN. EPF compounds at 8% or more tax-free, and every withdrawal resets that compounding. Withdrawing before five years of continuous service also makes the amount taxable. For most salaried Indians, repeated EPF withdrawals are the single most expensive retirement mistake.",
  },
  {
    q: "How much equity should I hold after retiring at 60?",
    a: "Around 40-50% at retirement, tapering slowly afterwards. A 60-year-old may have 25-30 years ahead, and an all-debt portfolio loses purchasing power to inflation with near certainty over that period. The key protection is keeping about three years of expenses in cash and short-duration debt so you never have to sell equity during a market fall.",
  },
  {
    q: "What is SWP and is it better than an annuity?",
    a: "A Systematic Withdrawal Plan takes a fixed monthly amount out of your mutual fund holdings. It is more flexible and usually more tax-efficient than an annuity because only the gain portion of each redemption is taxed, and the remaining corpus keeps growing. An annuity, by contrast, guarantees income for life regardless of how long you live. Many retirees use an annuity for essential expenses and an SWP for everything else.",
  },
  {
    q: "How does inflation affect retirement planning in India?",
    a: "At 6% general inflation, ₹1 lakh of monthly expenses today becomes about ₹4.3 lakh in 25 years. Healthcare inflation runs higher still, commonly estimated at 10-14%. This is why a retirement plan built only on fixed deposits fails, and why maintaining continuous health insurance from a young age is a core part of the plan rather than an optional extra.",
  },
  {
    q: "Can I retire early in India, and what does FIRE require?",
    a: "It is possible but demanding. Early retirement means a longer withdrawal period, so the safe withdrawal rate drops further, often to 3% or below, implying a corpus of 33 times annual expenses or more. It also means funding your own health insurance for decades and losing employer cover. A savings rate of 50-60% of income for 12-15 years is the usual requirement.",
  },
  {
    q: "Is my own house part of my retirement corpus?",
    a: "Generally no. The home you live in produces no income and selling it creates a rent expense, so it cannot fund your retirement. A second property that is genuinely rented out can contribute, but rental yields in most Indian cities are only 2-3% of property value, which is low relative to the capital tied up and the maintenance and vacancy risk involved.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Retirement Planning"
      description="Retire with confidence. Calculate the corpus you need, choose the right retirement vehicles, and plan a sustainable withdrawal strategy for your post-work life."
      badge="Retirement Hub"
      sections={[
        {
          title: "Retirement Calculators",
          columns: 2,
          links: [
            { title: "Retirement Calculator", href: "/calculators/retirement", desc: "Corpus needed and monthly SIP to get there" },
            { title: "NPS Calculator", href: "/calculators/nps", desc: "Pension corpus, tax-free lump sum, and monthly annuity" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "15-year tax-free retirement savings vehicle" },
            { title: "EPF Calculator", href: "/calculators/epf", desc: "Employee Provident Fund corpus at retirement" },
            { title: "SWP Calculator", href: "/calculators/swp", desc: "Plan monthly withdrawals from retirement corpus" },
            { title: "Step-Up SIP Calculator", href: "/calculators/step-up-sip", desc: "Top-up SIP strategy for retirement goals" },
          ],
        },
        {
          title: "Retirement Strategies",
          columns: 2,
          links: [
            { title: "FIRE in India", href: "/blog/fire-retire-early-india", desc: "The real corpus you need for financial independence in India" },
            { title: "NPS Explained", href: "/blog/nps-explained", desc: "Complete guide to NPS tiers, tax benefits, and returns" },
            { title: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "Where should you save for retirement?" },
            { title: "Senior Citizen Savings Scheme", href: "/blog/senior-citizen-savings-scheme-2026", desc: "Guaranteed quarterly income for retirees, and its limits" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "NPS", href: "/glossary/nps", desc: "National Pension System" },
            { title: "PPF", href: "/glossary/ppf", desc: "Public Provident Fund" },
            { title: "EPF", href: "/glossary/epf", desc: "Employee Provident Fund" },
            { title: "Annuity", href: "/glossary/annuity", desc: "Regular pension payments explained" },
            { title: "SWP", href: "/glossary/swp", desc: "Systematic Withdrawal Plan" },
            { title: "4% Rule", href: "/glossary/4-percent-rule", desc: "Safe withdrawal rate for retirement" },
          ],
        },
      ]}
      intro="India has no state pension worth planning around, so for most people the corpus you build before you stop working has to fund 25 to 30 years of life afterwards. This hub covers how to calculate that number honestly, which of EPF, PPF, NPS and equity funds to use for each part of it, and how to turn the corpus into a monthly income that survives inflation."
      bodyMarkdown={RETIREMENT_BODY}
      faqs={RETIREMENT_FAQS}
      relatedHubs={[
        { title: "Investing", href: "/investing" },
        { title: "Savings", href: "/savings" },
        { title: "Tax", href: "/income-tax" },
        { title: "Budgeting", href: "/budgeting" },
      ]}
    />
  );
}
