import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import CryptoTaxCalculator from "@/components/calc/CryptoTaxCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "crypto-tax")!;
export const metadata = calcMeta(
  "crypto-tax",
  "Crypto Tax Calculator India 2026 - 30% VDA Tax, TDS & Net Returns",
  "Free crypto tax calculator for India. Calculate cryptocurrency tax at 30% flat rate under Section 115BBH, 1% TDS credit under Section 194S, cess, effective tax rate, and net proceeds. Supports buy/sell, swaps, and gifts/airdrops.",
  "Tax",
);

export default function Page() {
  return (
    <CalcPage
      slug="crypto-tax"
      title="Crypto Tax Calculator"
      subtitle="Calculate your cryptocurrency tax liability under India's 30% flat tax on VDA gains (Section 115BBH). Enter buy and sell prices to see profit, tax, TDS credit, and net return."
      calculator={<CryptoTaxCalculator />}
      intro="India taxes cryptocurrency gains at a flat 30% with no deductions or loss set-off allowed. Whether you trade Bitcoin, Ethereum, or any other virtual digital asset (VDA), every profitable transaction triggers this tax. On top of the 30% tax, a 4% health and education cess applies, bringing the effective rate to 31.2%. Exchanges also deduct 1% TDS on transfers above the threshold under Section 194S, which you can claim as a credit when you file your return. This crypto tax calculator applies these rules to your trade, showing the exact tax, cess, TDS adjustment, and net proceeds."
      how={{
        heading: "How crypto tax is calculated in India",
        body: (
          <>
            <p>
              The tax on cryptocurrency in India is straightforward but strict.
              Under Section 115BBH of the Income Tax Act (introduced by the
              Finance Act 2022), any income from the transfer of a Virtual
              Digital Asset is taxed at a flat 30%, regardless of your income
              slab. No deduction is allowed except the cost of acquisition.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              Tax = (Sell value &minus; Cost of acquisition) &times; 30%
              <br />
              Cess = Tax &times; 4%
              <br />
              Total tax = Tax + Cess
            </p>
            <p>
              <strong>No loss set-off:</strong> If you sell at a loss, you
              cannot set it off against any other income, including gains from
              other crypto trades. Each transaction is taxed independently.
            </p>
            <p>
              <strong>1% TDS (Section 194S):</strong> Crypto exchanges deduct
              1% TDS on transfers above specified thresholds. This TDS is not
              an additional tax but a prepaid credit you claim against your
              total tax liability when filing your ITR.
            </p>
            <p>
              <strong>Gifts and airdrops:</strong> If you receive crypto as a
              gift or airdrop, the cost of acquisition is zero. The entire
              fair market value at the time of transfer is taxable at 30%.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "What is the tax rate on cryptocurrency in India?",
          a: "Cryptocurrency gains are taxed at a flat 30% under Section 115BBH of the Income Tax Act, irrespective of your income slab. An additional 4% health and education cess applies on the tax amount, making the effective rate 31.2%. No deduction is allowed except the cost of acquisition (what you paid to buy the crypto).",
        },
        {
          q: "Can I set off crypto losses against other income?",
          a: "No. Under Section 115BBH, losses from the transfer of virtual digital assets (VDAs) cannot be set off against any other income, including gains from other crypto transactions. Each profitable crypto transaction is taxed independently. Unlike capital gains on shares, there is no carry-forward of crypto losses either.",
        },
        {
          q: "What is the 1% TDS on crypto under Section 194S?",
          a: "Section 194S requires buyers or exchanges to deduct 1% TDS on the transfer of virtual digital assets above specified thresholds (Rs 50,000 per year for specified persons, Rs 10,000 for others). This TDS is not an additional tax. It is a prepaid credit that reduces your final tax liability when you file your income tax return.",
        },
        {
          q: "How is crypto-to-crypto swap taxed?",
          a: "Swapping one cryptocurrency for another (for example, exchanging Bitcoin for Ethereum) is treated as a transfer and is a taxable event. The profit on the outgoing crypto (its fair market value at the time of swap minus your purchase cost) is taxed at 30% plus cess. Both sides of the swap are effectively taxable events.",
        },
        {
          q: "Are crypto gifts and airdrops taxable?",
          a: "Yes. When you receive crypto as a gift or airdrop, the cost of acquisition is treated as zero. If the aggregate value of all gifts (including crypto) exceeds Rs 50,000 in a financial year, the entire amount is taxable under income from other sources. When you later sell the gifted crypto, the full sale value is taxable at 30% since your cost is zero.",
        },
        {
          q: "Which ITR form should I use to report crypto income?",
          a: "Crypto gains should be reported in ITR-2 or ITR-3 under 'Income from Virtual Digital Assets' (Schedule VDA). If you have salary income and crypto gains, use ITR-2. If you have business income along with crypto gains, use ITR-3. Report each transaction separately in Schedule VDA with the date, type, quantity, sale value, and cost of acquisition.",
        },
        {
          q: "Is mining crypto taxable in India?",
          a: "Yes. Income from mining cryptocurrency is taxable. The income is treated as business income or income from other sources depending on the scale and nature of operations. The cost of mining (electricity, hardware) may be deductible as business expenses. When you later sell the mined crypto, the 30% tax under Section 115BBH applies on the profit.",
        },
        {
          q: "How do I calculate the cost of acquisition for crypto?",
          a: "The cost of acquisition is the price you originally paid to buy the cryptocurrency, including any transaction fees or brokerage paid at the time of purchase. For crypto received through mining, it is the fair market value on the date of receipt. For gifted crypto, the cost is treated as zero. No indexation benefit is available for crypto assets.",
        },
        {
          q: "What is the effective tax rate on crypto in India?",
          a: "The effective rate is 31.2%: 30% flat tax under Section 115BBH plus 4% health and education cess on the tax amount. If surcharge applies to your total income (income above Rs 50 lakh), the effective rate can be even higher. For most individual traders, 31.2% is the practical rate.",
        },
        {
          q: "Do I need to pay tax on crypto if I only hold and do not sell?",
          a: "No. If you buy and hold cryptocurrency without selling or transferring it, there is no tax event. Tax under Section 115BBH applies only on the transfer of a virtual digital asset. However, if you earn staking rewards or interest on crypto, that income may be taxable when received.",
        },
      ]}
      extra={
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="font-display text-2xl text-ink">30% Flat Tax on VDA Gains</h2>
            <div className="mt-5 max-w-[600px] text-ink-soft leading-relaxed space-y-4">
              <p>
                The Finance Act 2022 introduced Section 115BBH, which taxes
                any income from the transfer of Virtual Digital Assets (VDAs)
                at a flat rate of 30%. This covers all cryptocurrencies,
                NFTs, and any other digital assets defined under Section 2(47A)
                of the Income Tax Act.
              </p>
              <p>
                The 30% rate applies regardless of your income tax slab. Even
                if your total income falls in the 5% or 20% slab, crypto gains
                are always taxed at 30%. The only deduction allowed is the cost
                of acquisition: what you paid to buy the crypto. No deduction
                for transaction fees, infrastructure costs, or any other
                expense is permitted.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">1% TDS (Section 194S)</h2>
            <div className="mt-5 max-w-[600px] text-ink-soft leading-relaxed space-y-4">
              <p>
                Section 194S mandates a 1% Tax Deducted at Source on the
                transfer of virtual digital assets. The buyer (or exchange
                acting on behalf of the buyer) must deduct this TDS before
                crediting the sale proceeds to the seller.
              </p>
              <p>
                The TDS threshold is Rs 50,000 per financial year for
                specified persons (individuals and HUFs whose turnover or
                gross receipts do not exceed the specified limit) and
                Rs 10,000 for all others. The deducted TDS appears in your
                Form 26AS and AIS, and you claim it as a credit against your
                total tax liability when filing your ITR.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">No Loss Set-Off Allowed</h2>
            <div className="mt-5 max-w-[600px] text-ink-soft leading-relaxed space-y-4">
              <p>
                One of the strictest aspects of India's crypto tax regime is
                the prohibition on loss set-off. If you sell Bitcoin at a
                loss and Ethereum at a profit in the same year, you cannot
                offset the Bitcoin loss against the Ethereum profit. Each
                profitable transaction is taxed at 30% independently.
              </p>
              <p>
                Furthermore, crypto losses cannot be set off against any
                other head of income, including salary, business income, or
                capital gains from shares or property. There is also no
                provision to carry forward crypto losses to future years.
                This makes India's crypto tax treatment significantly stricter
                than the capital gains rules for traditional assets.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-ink">How to File Crypto Tax in ITR</h2>
            <div className="mt-5 max-w-[600px] text-ink-soft leading-relaxed space-y-4">
              <p>
                Since FY 2022-23, the ITR forms include Schedule VDA
                specifically for reporting income from virtual digital
                assets. You must report each crypto transaction separately
                with the following details:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Date of transfer</li>
                <li>Type of VDA (e.g., Bitcoin, Ethereum)</li>
                <li>Head of income (115BBH or other)</li>
                <li>Total sale consideration (sell value)</li>
                <li>Cost of acquisition (buy value)</li>
                <li>Net gain or loss on each transaction</li>
              </ul>
              <p>
                Use ITR-2 if you have salary and crypto income. Use ITR-3
                if you also have business income. Ensure your TDS credits
                from Form 26AS match the TDS deducted by exchanges. File
                before the due date (usually 31 July for non-audit cases)
                to avoid interest and penalties.
              </p>
            </div>
          </section>
        </div>
      }
      sources={[
        { label: "Income Tax Department - Section 115BBH", href: "https://www.incometax.gov.in" },
        { label: "Finance Act 2022 - VDA Taxation", href: "https://incometaxindia.gov.in/Pages/acts/finance-acts.aspx" },
        { label: "CBDT - TDS on VDA (Section 194S)", href: "https://www.incometax.gov.in" },
      ]}
    />
  );
}
