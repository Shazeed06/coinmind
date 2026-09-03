import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Savings Guide India - FD, PPF, NPS, NSC, SSY & Post Office Schemes" },
  description: "Compare India's best savings schemes: FD, PPF, NPS, NSC, Sukanya Samriddhi, SCSS, and Post Office MIS. Calculate returns, compare tax benefits, and find the right savings plan.",
  alternates: { canonical: `${site.url}/savings` },
};

const SAVINGS_BODY = `
## What "savings" should actually do for you

Savings instruments are not there to make you rich. They are there to do three specific jobs: hold money you might need next week, hold money you will definitely need in one to three years, and hold the safe portion of a long-term portfolio so the risky portion can be left alone during a crash.

Judge every savings product against four things: **safety, liquidity, return after tax, and lock-in**. No product wins on all four, which is why most households need two or three, not one.

## The core comparison

| Instrument | Typical return | Lock-in | Liquidity | Tax on returns | Best job |
| --- | --- | --- | --- | --- | --- |
| Savings account | 2.7-4% (some small banks 6-7%) | None | Instant | Slab; ₹10,000 exempt under 80TTA (old regime) | Day-to-day float |
| Sweep-in FD | 6-7% | None in practice | Instant auto-break | Slab | Emergency fund |
| Fixed deposit | 6.5-7.5% | 7 days to 10 years | Premature exit with 0.5-1% penalty | Slab, TDS above ₹50,000 interest | 1-5 year goals |
| Recurring deposit | 6.5-7.5% | Chosen tenure | Premature exit with penalty | Slab | Building a lump sum monthly |
| Liquid mutual fund | 6-7% | None | T+1, instant redemption up to ₹50,000 | Slab (post-Apr 2023 purchases) | Emergency fund, parking |
| PPF | 7-7.5%, set quarterly | 15 years | Partial from year 7, loan from year 3 | Fully exempt (EEE) | Long-term tax-free debt |
| NSC | ~7.7% | 5 years | None | Interest taxable but reinvested interest qualifies for 80C | 5-year 80C goal |
| SCSS (60+) | ~8.2%, set quarterly | 5 years | Premature with penalty | Slab, TDS applies | Retiree income |
| Sukanya Samriddhi | ~8.2% | Until girl turns 21 | Partial at 18 | Fully exempt (EEE) | Daughter's education |
| Post Office MIS | ~7.4% | 5 years | Premature after 1 year with penalty | Slab | Monthly income |

Rates on small savings schemes are revised quarterly by the government, and bank FD rates change constantly. Treat the figures above as a guide and confirm the current rate before committing. The [FD calculator](/calculators/fd), [PPF calculator](/calculators/ppf) and [RD calculator](/calculators/rd) let you plug in today's numbers.

## FD vs RD vs savings account vs liquid fund

These four are constantly confused, and each has one job it does best.

**Savings account** is for money in motion: this month's bills and spending. Large balances sitting here are a slow leak: at 3% against 6% inflation you lose about 3% of purchasing power a year. Some small finance banks offer 6-7% on savings balances; deposits up to ₹5 lakh per bank per depositor are insured by DICGC, which makes those rates reasonable within that limit.

**Fixed deposit** locks a lump sum for a chosen tenure at a rate fixed on day one. Best when you know the date you need the money: a school fee in 18 months, a down payment in three years. The rate certainty is the product. The penalty for breaking early is usually 0.5-1% off the applicable rate.

**Recurring deposit** is the monthly-contribution version of an FD. Useful for building a target amount from salary when you want zero market risk. The effective return is slightly below an equivalent FD because each instalment earns for a shorter period.

**Liquid fund** invests in very short-maturity debt instruments. Returns are usually a little better than a savings account, redemption is next-day (with instant redemption up to ₹50,000 per scheme per day), and there is no penalty for withdrawing whenever you like. It is not guaranteed, but liquid funds are among the lowest-risk mutual fund categories.

**The practical setup for most households:** one savings account for spending, a sweep-in FD or liquid fund for the emergency fund, and FDs or RDs for dated goals within three years.

## Sizing the emergency fund

This is the first savings goal, before any investment. Count only **essential** monthly expenses (rent or EMI, food, utilities, insurance premiums, school fees, transport), not your full spending.

- **Dual-income salaried household:** 3 months
- **Single earner, salaried, stable sector:** 6 months
- **Sole earner with dependants and a home loan:** 9 months
- **Freelance, commission or business income:** 9-12 months

For a household with ₹50,000 of essential monthly costs, that is ₹1.5 lakh to ₹4.5 lakh. Split it: about one month in a savings account for instant access, the rest in a sweep-in FD or liquid fund. Do not put it in equity, and do not put it in a five-year lock-in.

## Tax on savings interest - the part that changes the ranking

Post-tax return is what you actually keep, and it can completely reorder the table above.

- **Savings account interest:** up to ₹10,000 a year is deductible under Section 80TTA in the old regime. Senior citizens get ₹50,000 across savings and FD interest under 80TTB.
- **FD, RD and post office interest:** fully taxable at your slab rate. Banks deduct TDS once interest crosses ₹50,000 in a year for regular depositors and ₹1,00,000 for senior citizens. **TDS is not the final tax**. If your slab is 30%, you still owe the balance.
- **Form 15G/15H** stops TDS if your total income is below the taxable limit. It does not make the income tax-free, it just avoids a refund cycle.
- **PPF and Sukanya Samriddhi are EEE**: deductible going in, tax-free interest, tax-free maturity. Nothing else in Indian fixed income matches that.
- **Debt and liquid funds bought after 1 April 2023** are taxed at slab rate regardless of holding period, so their old indexation advantage no longer applies.

What this means in practice: an FD at 7% in the 30% bracket returns about **4.9% after tax**, which is below inflation. The same 30%-bracket investor gets the full 7.3% from PPF. **For anyone in the 20% or 30% bracket, filling the PPF limit before opening large FDs is usually the better decision.**

## Choosing between the government schemes

- **PPF** suits everyone, and is especially valuable for the self-employed who have no EPF. The ₹1.5 lakh annual cap and 15-year lock-in are the constraints. Deposit before the 5th of the month. Interest is calculated on the lowest balance between the 5th and month-end.
- **Sukanya Samriddhi** pays the highest rate among small savings schemes and is fully tax-free, but is available only for a girl child under 10 and locks money until she is 21. If it fits your family, it is one of the best fixed-income deals in India. See the [SSY calculator](/calculators/sukanya-samriddhi).
- **NSC** gives a five-year lock-in with 80C eligibility, and its annual accrued interest also counts toward 80C in the years before maturity. A neat option if you have used up other 80C avenues. The [NSC calculator](/calculators/nsc) shows the maturity.
- **SCSS** is for people over 60 (or 55 in some early-retirement cases) and pays quarterly, at a rate typically above bank FDs. The [SCSS calculator](/calculators/scss) works out the payout.
- **Post Office MIS** pays monthly and suits retirees who want predictable cash flow. The [POMIS calculator](/calculators/post-office-mis) shows the monthly amount.
- **EPF** is not optional for most salaried employees, and voluntary contributions above the mandatory 12% are one of the highest-return safe options available. See the [EPF calculator](/calculators/epf).

## Practical tactics that raise your return without raising risk

1. **Ladder your FDs.** Instead of one ₹5 lakh FD for five years, open five ₹1 lakh FDs maturing one year apart. You get access to money every year and average out rate changes.
2. **Compare small finance banks.** They often pay 1-1.5% more than large banks. Keep within the ₹5 lakh DICGC insurance limit per bank per depositor.
3. **Use senior citizen rates.** Banks typically add 0.25-0.5% for those over 60. If a parent is in a lower tax bracket, an FD in their name is legitimate and more tax-efficient.
4. **Choose cumulative FDs for goals, non-cumulative for income.** Cumulative compounds quarterly; non-cumulative pays out.
5. **Never break a long FD for a short need.** Take a loan against the FD instead, typically at 1-2% above the FD rate, and only for the period you need it.
6. **Fill PPF early in the financial year.** A lump sum deposited in April earns a full year of interest versus one deposited in March.

## Common savings mistakes

- **Keeping six figures idle in a savings account** because it feels safe. It is a guaranteed real loss.
- **Ignoring post-tax return.** A 7% FD and a 7.1% PPF are not remotely the same product for a 30% taxpayer.
- **Assuming TDS settles the tax.** TDS is 10%; your liability may be 30%.
- **Buying a five-year tax-saver FD for an emergency fund.** It cannot be broken at all before maturity.
- **Using savings products for 15-year goals.** Even PPF at 7.3% barely beats long-run inflation. Long-horizon money needs equity. See the [investing hub](/investing).
- **Forgetting to nominate.** Every deposit, PPF account and mutual fund folio should have a nominee. Its absence creates real pain for a family later.

Get the safe layer right and everything else becomes easier: the emergency fund lets you invest without fear, and dated goals stay off the stock market where they belong. Then move surplus to the [investing hub](/investing) and the [retirement hub](/retirement), and build the monthly plan in the [budgeting hub](/budgeting).
`;

const SAVINGS_FAQS = [
  {
    q: "Which is better: FD or RD?",
    a: "An FD suits a lump sum you already have and want to lock at a fixed rate; an RD suits building a target amount from monthly salary with zero market risk. For the same headline rate, an FD produces a slightly higher effective return because the entire amount earns interest from day one, while each RD instalment earns for a shorter period. Both are taxed at your slab rate.",
  },
  {
    q: "How much should I keep in my savings account?",
    a: "Roughly one month of expenses plus a small buffer. Anything more is losing purchasing power, since savings accounts pay about 2.7-4% while inflation runs near 6%. Move the rest of your emergency fund to a sweep-in fixed deposit or a liquid fund, which earn 6-7% while remaining accessible within a day.",
  },
  {
    q: "Is PPF better than FD?",
    a: "For anyone in the 20% or 30% tax bracket, usually yes. PPF interest and maturity are entirely tax-free, so a 7.3% PPF return is a true 7.3%. An FD at 7% in the 30% bracket returns only about 4.9% after tax, below inflation. The trade-offs are PPF's 15-year lock-in and its ₹1.5 lakh annual contribution cap.",
  },
  {
    q: "How is FD interest taxed in India?",
    a: "Fixed deposit interest is fully taxable at your income slab rate and must be declared in the year it accrues, not only when the FD matures. Banks deduct TDS at 10% once interest crosses ₹50,000 in a financial year for regular depositors and ₹1,00,000 for senior citizens. TDS is not the final tax. A 30% bracket taxpayer still owes the remaining 20%.",
  },
  {
    q: "Are liquid funds safer than fixed deposits?",
    a: "Fixed deposits are safer in the strict sense because bank deposits up to ₹5 lakh per bank per depositor are insured by DICGC, while liquid funds carry a small amount of market and credit risk. In practice liquid funds invest in very short-maturity, high-quality instruments and are among the lowest-risk mutual fund categories, with the advantage of no premature withdrawal penalty.",
  },
  {
    q: "How much emergency fund should I keep in India?",
    a: "Three months of essential expenses for a dual-income salaried household, six months for a single salaried earner, and nine to twelve months if your income comes from freelancing, commission or business. Count only essentials: rent or EMI, food, utilities, insurance and school fees. Keep about one month in a savings account and the rest in a sweep-in FD or liquid fund.",
  },
  {
    q: "What is Section 80TTA and 80TTB?",
    a: "Section 80TTA allows a deduction of up to ₹10,000 a year on savings account interest for individuals under 60, in the old tax regime. Section 80TTB replaces it for senior citizens with a larger ₹50,000 deduction that also covers fixed deposit and recurring deposit interest. Neither is available under the new tax regime.",
  },
  {
    q: "Which savings scheme gives the highest return in India?",
    a: "Among government schemes, Sukanya Samriddhi and the Senior Citizen Savings Scheme typically carry the highest rates, at around 8.2%, though each is restricted to a specific eligible group. For a general saver, PPF at roughly 7-7.5% usually wins on a post-tax basis because it is entirely tax-free, while a comparable fixed deposit is taxed at your slab rate.",
  },
  {
    q: "What is FD laddering and why should I use it?",
    a: "Laddering means splitting one large deposit into several smaller FDs maturing a year apart: for example five ₹1 lakh FDs instead of one ₹5 lakh FD for five years. You then have money maturing every year for access or reinvestment, and you average out interest rate changes instead of locking everything at one point in the rate cycle.",
  },
  {
    q: "Should I break my FD early if I need money?",
    a: "Usually not. Premature withdrawal costs a penalty of about 0.5-1% off the applicable rate and resets the rate to the shorter tenure actually completed. A loan against the FD, typically available at 1-2% above the deposit rate for up to 90% of its value, is often cheaper if you only need funds for a few months.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Savings & Investment Schemes"
      description="Choose the right savings scheme for your goals. Compare returns, tax benefits, lock-in periods, and risk across all major Indian savings instruments."
      badge="Savings Hub"
      sections={[
        {
          title: "Savings Calculators",
          columns: 3,
          links: [
            { title: "FD Calculator", href: "/calculators/fd", desc: "Fixed deposit maturity with quarterly compounding" },
            { title: "PPF Calculator", href: "/calculators/ppf", desc: "15-year Public Provident Fund maturity" },
            { title: "NPS Calculator", href: "/calculators/nps", desc: "Pension corpus and monthly annuity estimate" },
            { title: "EPF Calculator", href: "/calculators/epf", desc: "Employee Provident Fund maturity at retirement" },
            { title: "NSC Calculator", href: "/calculators/nsc", desc: "National Savings Certificate maturity" },
            { title: "SCSS Calculator", href: "/calculators/scss", desc: "Senior Citizen Savings Scheme quarterly payout" },
            { title: "Sukanya Samriddhi Calculator", href: "/calculators/sukanya-samriddhi", desc: "SSY tax-free corpus for girl child" },
            { title: "Post Office MIS Calculator", href: "/calculators/post-office-mis", desc: "Monthly Income Scheme fixed payout" },
            { title: "Recurring Deposit Calculator", href: "/calculators/rd", desc: "RD maturity with monthly deposits" },
          ],
        },
        {
          title: "FD by Bank",
          columns: 4,
          links: [
            { title: "SBI FD Calculator", href: "/calculators/fd/sbi-fd-rates", desc: "SBI fixed deposit rates and maturity" },
            { title: "HDFC FD Calculator", href: "/calculators/fd/hdfc-fd-rates", desc: "HDFC fixed deposit rates and maturity" },
            { title: "ICICI FD Calculator", href: "/calculators/fd/icici-fd-rates", desc: "ICICI fixed deposit rates and maturity" },
            { title: "Post Office FD Calculator", href: "/calculators/fd/post-office-fd-rates", desc: "Post Office time deposit rates" },
          ],
        },
        {
          title: "Comparisons",
          columns: 2,
          links: [
            { title: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps", desc: "Returns, tax, lock-in, and who each suits best" },
            { title: "FD vs RD", href: "/blog/fd-vs-rd", desc: "Fixed deposit vs recurring deposit comparison" },
            { title: "PPF vs EPF", href: "/blog/ppf-vs-epf", desc: "Public Provident Fund vs Employee Provident Fund" },
            { title: "Savings Account vs FD", href: "/blog/savings-vs-fd", desc: "Savings account interest vs fixed deposit returns" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "Fixed Deposit", href: "/glossary/fixed-deposit", desc: "What is an FD and how it works" },
            { title: "PPF", href: "/glossary/ppf", desc: "Public Provident Fund explained" },
            { title: "NPS", href: "/glossary/nps", desc: "National Pension System" },
            { title: "EPF", href: "/glossary/epf", desc: "Employee Provident Fund" },
            { title: "Compound Interest", href: "/glossary/compound-interest", desc: "How compounding grows your savings" },
            { title: "Section 80C", href: "/glossary/section-80c", desc: "Tax deductions for savings" },
          ],
        },
      ]}
      intro="A 7% fixed deposit returns about 4.9% after tax in the 30% bracket, below inflation, while PPF at 7.3% is entirely tax-free. Post-tax return, not the advertised rate, decides which savings product actually wins. This hub compares FDs, RDs, savings accounts, liquid funds and every major government scheme on safety, liquidity, lock-in and tax."
      bodyMarkdown={SAVINGS_BODY}
      faqs={SAVINGS_FAQS}
      relatedHubs={[
        { title: "Retirement", href: "/retirement" },
        { title: "Investing", href: "/investing" },
        { title: "Tax", href: "/income-tax" },
        { title: "Budgeting", href: "/budgeting" },
      ]}
    />
  );
}
