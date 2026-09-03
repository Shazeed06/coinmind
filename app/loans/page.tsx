import type { Metadata } from "next";
import HubPage from "@/components/HubPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Loans & EMI Guide - Home, Car, Personal & Education Loans India" },
  description: "Compare loan options, calculate EMIs, check eligibility, and understand interest costs. Free calculators for home, car, personal, and education loans. Updated 2026.",
  alternates: { canonical: `${site.url}/loans` },
};

const LOANS_BODY = `
## The only three numbers that matter on any loan

Lenders advertise the EMI because it is the smallest, friendliest number. The three figures that actually determine whether a loan is a good idea are:

1. **The total interest paid over the full tenure.** A ₹50 lakh home loan at 8.5% over 20 years costs about ₹54 lakh in interest, more than the loan itself.
2. **The effective annual rate including fees.** Processing fees, documentation charges, insurance bundled into the loan and prepayment penalties all raise the true cost above the headline rate.
3. **Your EMI-to-income ratio.** Lenders will approve up to 50-60% of net income going to EMIs. Living comfortably usually requires staying below 40%.

Run any offer through the [EMI calculator](/calculators/emi) before you sign. Seeing the total interest figure next to the EMI changes most borrowing decisions.

## Loan types in India, compared

| Loan type | Typical rate (2026) | Usual tenure | Secured? | Tax benefit |
| --- | --- | --- | --- | --- |
| Home loan | 8.2-9.5% | 15-30 years | Yes, the property | Yes: 80C on principal, Section 24(b) on interest (old regime) |
| Loan against property | 9-12% | 10-15 years | Yes, the property | Only if used for business or house purchase |
| Education loan | 8.5-13% | 10-15 years | Above ₹7.5 lakh, usually | Yes: Section 80E on interest, 8 years, no cap |
| Car loan (new) | 8.5-11% | 3-7 years | Yes, the vehicle | Only if self-employed and used for business |
| Gold loan | 9-16% | 6-36 months | Yes, the gold | No |
| Personal loan | 10.5-24% | 1-5 years | No | No |
| Credit card EMI conversion | 13-20% plus fees | 3-24 months | No | No |
| Credit card revolving balance | 36-46% annualised | Open-ended | No | No |

The spread from top to bottom of that table is enormous. **The same ₹5 lakh borrowed costs about ₹1.1 lakh in interest as a home loan top-up over five years, and about ₹3.5 lakh as a revolving credit card balance.** Matching the right product to the need is worth more than negotiating a quarter-percent off any single rate.

## How lenders decide: eligibility in practice

Four things drive approval and pricing.

**Credit score.** In India, CIBIL, Experian, Equifax and CRIF High Mark all issue scores, and lenders usually pull at least one. Above 750 you get the advertised rate. Between 700 and 750 you are approved but priced higher. Below 650 most mainstream lenders decline unsecured lending entirely. The [credit score hub](/credit-score) covers how to move that number.

**FOIR (Fixed Obligation to Income Ratio).** This is all your existing EMIs plus the proposed one, divided by net monthly income. Most lenders cap it at 50-55%, and some allow 60% for high earners. If your salary is ₹1,00,000 net and you already pay ₹15,000 in EMIs, a lender working to a 50% FOIR will approve a new EMI of roughly ₹35,000.

**Income stability.** Salaried applicants with two or more years at recognised employers get the best terms. Self-employed applicants typically need three years of ITRs and audited financials, and are priced 0.25-1% higher.

**LTV (Loan to Value) on secured loans.** Home loans go up to 75-90% of property value depending on ticket size; the rest is your down payment, plus stamp duty and registration which are never funded. Check what you qualify for with the [home loan eligibility calculator](/calculators/home-loan-eligibility).

## Fixed vs floating rates

Almost all Indian home loans are floating and linked externally to the RBI repo rate, so your rate resets as the repo rate moves, usually every three months. Lenders typically adjust your **tenure rather than your EMI** when rates rise, which hides the cost: your EMI looks unchanged while your loan quietly stretches by years.

**Ask your lender to increase the EMI instead of the tenure when rates rise.** It costs a little more each month and saves a great deal in total interest.

Fixed-rate home loans exist but are priced 1-2% above floating and often convert to floating after a few years, which usually makes them poor value. For short-tenure loans (car and personal) rates are effectively fixed anyway, so the question does not arise.

## Prepayment: the highest-return decision most borrowers can make

Prepaying a loan gives you a guaranteed, tax-free return equal to the loan's interest rate. On a personal loan at 14%, that is a risk-free 14%, better than any investment with comparable certainty.

**How the maths works.** In an amortising loan, the early EMIs are mostly interest. On a 20-year home loan, roughly 60% of what you pay in the first five years is interest. That is exactly why early prepayment is so powerful and late prepayment is nearly pointless.

A concrete example on a ₹50 lakh loan at 8.5% for 20 years, where the EMI is about ₹43,400:

- Paying **one extra EMI per year** cuts the tenure by roughly 4 years and saves around ₹12-13 lakh in interest.
- Increasing the EMI by **5% every year** clears the loan in about 12 years instead of 20.
- A **₹5 lakh lump-sum prepayment in year 3** saves roughly ₹15 lakh over the remaining term.

Rules to know: **floating-rate home loans taken by individuals cannot carry prepayment or foreclosure charges** under RBI rules. Fixed-rate loans and loans to non-individuals may. Personal and car loans often carry 2-5% foreclosure charges and sometimes a lock-in of 6-12 months, so check before you plan around prepayment.

**When not to prepay:** if you have no emergency fund, if you are carrying higher-rate debt elsewhere, or if the loan is a home loan at 8.5% and you are in the old tax regime claiming the full Section 24(b) interest deduction. The effective post-tax cost may drop to around 6%, which is close enough to debt-fund returns that the decision becomes a preference rather than a clear win.

## Which loan to attack first

If you carry several loans, two approaches work:

- **Avalanche (mathematically optimal):** pay minimums on everything and throw all surplus at the highest interest rate first. Always the cheapest path.
- **Snowball (psychologically easier):** clear the smallest balance first for the motivation, then roll that payment into the next.

For most Indians the answer is unambiguous: **clear revolving credit card balances first**, at 36-46% annualised, before anything else. Then personal loans, then car loans, then education and home loans last.

## How loans affect your credit score

- **Payment history is roughly a third of your score.** One EMI bounce can cost 50-80 points and stays on your report for years.
- **Applying to several lenders in a month generates multiple hard enquiries** and lowers your score. Use aggregator soft-check tools for comparison instead.
- **A well-managed loan actively helps.** A mix of secured and unsecured credit, paid on time, builds a stronger profile than having no loans at all.
- **Closing a loan is good; settling one is not.** A settlement is recorded as "settled" rather than "closed", and that flag can block borrowing for years.
- **Get the NOC and check your report after closure.** Lenders sometimes fail to update bureaus, leaving a closed loan showing as active and eating your eligibility.

## Common borrowing mistakes

- **Choosing the longest tenure for the lowest EMI.** A ₹10 lakh personal loan at 14% costs about ₹3.9 lakh in interest over 5 years and ₹1.5 lakh over 2 years.
- **Accepting bundled insurance financed into the loan.** You then pay interest on the premium for the entire tenure.
- **Ignoring processing fees and stamp duty.** These can add 1-2% to the effective cost.
- **Taking a personal loan to invest.** The rate gap makes this a reliable way to lose money.
- **Using a car loan for a depreciating asset over 7 years.** The car is often worth less than the outstanding balance for much of the term.
- **Not comparing the rent alternative before a home loan.** The [rent vs buy calculator](/calculators/rent-vs-buy) frames this honestly.

Before any borrowing decision, model it: [EMI](/calculators/emi) for the payment, [home loan eligibility](/calculators/home-loan-eligibility) for the ceiling, and the [personal loan](/calculators/personal-loan-emi), [car loan](/calculators/car-loan-emi) and [education loan](/calculators/education-loan-emi) calculators for specific products. And make sure the EMI fits a real budget. The [budgeting hub](/budgeting) covers how to build one.
`;

const LOANS_FAQS = [
  {
    q: "What CIBIL score do I need for a home loan in India?",
    a: "A score of 750 or above generally gets you the advertised rate and smooth approval. Between 700 and 750 you will usually be approved but at a higher rate. Below 650, most mainstream lenders decline or demand a co-applicant and a larger down payment. Because a rate difference of even 0.5% on a ₹50 lakh, 20-year loan is worth roughly ₹3.5 lakh, improving the score before applying is often worth a few months of waiting.",
  },
  {
    q: "Should I prepay my home loan or invest the money instead?",
    a: "Compare the loan's post-tax cost against your realistic after-tax investment return. A home loan at 8.5% with a full Section 24(b) interest deduction in the old regime can have an effective cost near 6%, which is close to debt-fund returns, so it becomes a preference. On personal loans at 12-18% or credit card balances at 36-46%, prepayment is clearly better than investing. Always keep the emergency fund intact before prepaying anything.",
  },
  {
    q: "Is there a penalty for prepaying a home loan in India?",
    a: "No. RBI rules prohibit prepayment and foreclosure charges on floating-rate home loans taken by individual borrowers. Fixed-rate home loans and loans taken by non-individuals may still carry charges. Personal and car loans commonly carry foreclosure charges of 2-5% plus a lock-in period of six to twelve months, so read those terms before planning to prepay.",
  },
  {
    q: "What is FOIR and how does it limit my loan amount?",
    a: "FOIR, or Fixed Obligation to Income Ratio, is the share of your net monthly income already committed to EMIs, including the loan you are applying for. Most lenders cap it around 50-55%, and some allow up to 60% for high earners. If you earn ₹1,00,000 net and already pay ₹15,000 in EMIs, a lender working to a 50% cap will approve a new EMI of roughly ₹35,000.",
  },
  {
    q: "Is it better to reduce EMI or tenure when I prepay?",
    a: "Reducing the tenure saves far more interest. Keeping the EMI the same and shortening the term means the extra money attacks principal for the remainder of the loan. Reducing the EMI feels better month to month but leaves you paying interest for the full original term. The same logic applies when rates rise: ask the lender to raise your EMI rather than extend your tenure.",
  },
  {
    q: "Which loan should I repay first if I have several?",
    a: "Attack the highest interest rate first while paying minimums on the rest. This is the avalanche method and it is always mathematically cheapest. In India that almost always means clearing revolving credit card balances at 36-46% annualised, then personal loans at 12-18%, then car loans, then education and home loans last since those carry the lowest rates and tax benefits.",
  },
  {
    q: "How much home loan can I get on a ₹1 lakh monthly salary?",
    a: "As a rough guide, lenders sanction 55-65 times net monthly income, so roughly ₹55-65 lakh, but this depends on your existing EMIs, age, employer category, credit score and the property's value. A lender applying a 50% FOIR with no existing EMIs would allow an EMI near ₹50,000, which at 8.5% over 20 years supports about ₹58 lakh. Remember stamp duty, registration and the down payment are never funded.",
  },
  {
    q: "Does applying to multiple banks hurt my credit score?",
    a: "Yes, if each bank runs a hard enquiry. Several hard enquiries within a short window signal credit hunger and can lower your score. Use soft-check eligibility tools or aggregator platforms to compare offers first, then formally apply to only one or two lenders. Checking your own score through a bureau is a soft enquiry and never affects it.",
  },
  {
    q: "What tax benefits do loans give in India?",
    a: "Home loans allow up to ₹1.5 lakh of principal under Section 80C and up to ₹2 lakh of interest on a self-occupied property under Section 24(b), both in the old tax regime. Education loan interest is fully deductible under Section 80E for up to eight years with no cap. Personal loans, car loans and gold loans carry no tax benefit unless the borrowing is demonstrably for business use.",
  },
  {
    q: "Is a personal loan or a gold loan cheaper?",
    a: "A gold loan is usually cheaper, at roughly 9-16% versus 10.5-24% for a personal loan, because it is secured against your gold. It is also faster to approve and depends far less on your credit score. The trade-off is real risk: default and the lender auctions your gold. Gold loans also tend to have shorter tenures of six to thirty-six months, so the EMI can be larger.",
  },
];

export default function Page() {
  return (
    <HubPage
      title="Loans & EMI"
      description="Make smart borrowing decisions. Calculate EMIs, compare loan options, check your eligibility, and understand the true cost of borrowing. Free calculators designed for India."
      badge="Loans Hub"
      sections={[
        {
          title: "Loan Calculators",
          columns: 2,
          links: [
            { title: "EMI Calculator", href: "/calculators/emi", desc: "Monthly payment, total interest, and full amortisation for any loan" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "How much home loan you qualify for based on salary and FOIR" },
            { title: "Car Loan EMI Calculator", href: "/calculators/car-loan-emi", desc: "Monthly auto loan payment and total interest" },
            { title: "Personal Loan EMI Calculator", href: "/calculators/personal-loan-emi", desc: "Monthly EMI for unsecured loans at 11-18% over 1-5 years" },
            { title: "Education Loan EMI Calculator", href: "/calculators/education-loan-emi", desc: "Student loan repayment with moratorium period" },
            { title: "Mortgage Calculator", href: "/calculators/mortgage", desc: "Monthly payment and amortisation for any mortgage" },
          ],
        },
        {
          title: "Rent vs Buy Analysis",
          columns: 2,
          links: [
            { title: "Rent vs Buy Calculator", href: "/calculators/rent-vs-buy", desc: "Compare buying a home against renting and investing the difference" },
            { title: "Home Loan vs Rent", href: "/blog/home-loan-vs-rent", desc: "An honest, numbers-first look at buying vs renting in India" },
            { title: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility", desc: "Check your home loan eligibility before applying" },
          ],
        },
        {
          title: "Key Glossary Terms",
          columns: 3,
          links: [
            { title: "EMI", href: "/glossary/emi", desc: "Equated Monthly Installment explained" },
            { title: "FOIR", href: "/glossary/foir", desc: "Fixed Obligation to Income Ratio for loan eligibility" },
            { title: "CIBIL Score", href: "/glossary/cibil-score", desc: "How your credit score affects loan approval" },
            { title: "Amortisation", href: "/glossary/amortisation", desc: "How loan payments are split over time" },
            { title: "Simple Interest", href: "/glossary/simple-interest", desc: "Interest calculated on the principal only" },
            { title: "Compound Interest", href: "/glossary/compound-interest", desc: "Interest on interest - how debt can grow" },
          ],
        },
      ]}
      intro="A ₹50 lakh home loan at 8.5% over 20 years costs more in interest than the amount you borrowed. Lenders advertise the EMI because it is the friendliest number, but the total interest, the effective rate including fees, and your EMI-to-income ratio are what decide whether a loan helps or hurts. This hub covers all three, plus how prepayment can cut years off a loan."
      bodyMarkdown={LOANS_BODY}
      faqs={LOANS_FAQS}
      relatedHubs={[
        { title: "Credit Score", href: "/credit-score" },
        { title: "Real Estate", href: "/blog/real-estate-vs-mutual-funds" },
        { title: "Budgeting", href: "/budgeting" },
        { title: "Tax", href: "/income-tax" },
      ]}
    />
  );
}
