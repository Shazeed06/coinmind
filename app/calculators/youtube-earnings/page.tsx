import { calcMeta } from "@/lib/seo";
import YouTubeEarningsCalculator from "@/components/calc/YouTubeEarningsCalculator";
import CalcPage from "@/components/calc/CalcPage";
import Link from "next/link";

export const metadata = calcMeta(
  "youtube-earnings",
  "YouTube Earnings Calculator India (2026): Views to Rupees & RPM",
  "Calculate how much YouTube pays per 1,000, 100,000, and 1 Million views in India. Accurate 2026 AdSense RPM and sponsorship rates by niche.",
  "Utility"
);

export default function Page() {
  return (
    <CalcPage
      slug="youtube-earnings"
      title="YouTube Earnings Calculator India"
      subtitle="Calculate how much money YouTube pays in India for 1,000 to 10 Million views across Long-form and Shorts."
      calculator={<YouTubeEarningsCalculator />}
      intro="Ever wondered how much Indian YouTubers actually earn from 1 Million views or 100,000 views? YouTube earnings in India depend heavily on your RPM (Revenue Per Mille - earnings per 1,000 views), your channel's niche, video duration, and viewer location. While entertainment and vlog channels make between ₹40 and ₹80 per 1,000 views, high-intent niches like personal finance and enterprise tech can make ₹250 to ₹500+ per 1,000 views. This calculator estimates your potential earnings from both Google AdSense and brand sponsorships."
      how={{
        heading: "How YouTube Earnings in India are Calculated",
        body: (
          <>
            <p>
              YouTube pays creators through the <strong>YouTube Partner Program (YPP)</strong> via Google AdSense. The standard creator revenue calculation uses <strong>RPM (Revenue Per Mille)</strong>:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink my-3">
              Total Earnings = (Total Monetised Views ÷ 1,000) × RPM
            </p>
            <p>
              Under Google&apos;s monetization policy, creators receive <strong>55% of net ad revenue</strong> on long-form videos (YouTube retains 45%), and <strong>45% on YouTube Shorts</strong> (YouTube retains 55% to cover music licensing and creator pool costs).
            </p>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              YouTube Earnings by View Count in India (2026 Benchmark)
            </h3>
            <p>
              Here is how much money YouTube AdSense pays Indian creators across popular tiers:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-xs border border-line rounded-xl overflow-hidden">
                <thead className="bg-paper-2 text-ink uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Views Count</th>
                    <th className="p-3">Entertainment / Vlogs</th>
                    <th className="p-3">Tech & Gadgets</th>
                    <th className="p-3">Finance & Stocks</th>
                    <th className="p-3">YouTube Shorts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink-soft">
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">10,000 Views</td>
                    <td className="p-3">₹400 – ₹700</td>
                    <td className="p-3">₹1,500 – ₹2,500</td>
                    <td className="p-3">₹2,500 – ₹4,500</td>
                    <td className="p-3">₹15 – ₹35</td>
                  </tr>
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">100,000 Views</td>
                    <td className="p-3">₹4,000 – ₹7,000</td>
                    <td className="p-3">₹15,000 – ₹25,000</td>
                    <td className="p-3">₹25,000 – ₹45,000</td>
                    <td className="p-3">₹150 – ₹350</td>
                  </tr>
                  <tr className="hover:bg-paper-2 bg-forest/5 font-medium">
                    <td className="p-3 font-bold text-forest">1 Million Views (10 Lakh)</td>
                    <td className="p-3">₹40,000 – ₹70,000</td>
                    <td className="p-3">₹1,50,000 – ₹2,50,000</td>
                    <td className="p-3">₹2,50,000 – ₹4,50,000</td>
                    <td className="p-3">₹1,500 – ₹3,500</td>
                  </tr>
                  <tr className="hover:bg-paper-2">
                    <td className="p-3 font-semibold text-ink">5 Million Views</td>
                    <td className="p-3">₹2,00,000 – ₹3,50,000</td>
                    <td className="p-3">₹7,50,000 – ₹12,50,000</td>
                    <td className="p-3">₹12,50,000 – ₹22,50,000</td>
                    <td className="p-3">₹7,500 – ₹17,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-ink mt-6 mb-2">
              4 Factors That Maximize Your YouTube RPM in India
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-ink-soft">
              <li>
                <strong>Video Length &gt; 8 Minutes:</strong> YouTube allows manual mid-roll ads only on videos longer than 8 minutes. Adding 2 to 3 well-placed mid-rolls can increase your revenue by 30% to 50% without annoying viewers.
              </li>
              <li>
                <strong>Target High-Paying Keywords:</strong> Advertisers in BFSI (Banking, Financial Services, Insurance), Real Estate, SaaS, and Crypto pay significantly higher CPMs because the customer lifetime value is high.
              </li>
              <li>
                <strong>Global Audience Reach:</strong> If 10% to 20% of your audience comes from the United States, United Kingdom, Canada, or Gulf countries (UAE/Saudi), your RPM can skyrocket 2x to 4x compared to an audience exclusively in India.
              </li>
              <li>
                <strong>Quarterly Seasonality (Q4 Diwali Peak):</strong> Ad rates peak in October to December (Diwali, Big Billion Days, New Year) due to aggressive festive brand marketing budgets, and drop in January (Q1).
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-line bg-paper p-4">
              <p className="text-sm text-ink-soft">
                Want a complete breakdown of actual RPM screenshots and creator earnings reports? Check out our detailed guide:{" "}
                <Link
                  href="/blog/youtube-earnings-per-million-views-india"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  YouTube Earnings for 1 Million Views in India (2026 RPM Reality)
                </Link>
                . For tracking freelance and creator tax deductions, use our{" "}
                <Link
                  href="/calculators/take-home-salary"
                  className="font-semibold text-forest underline hover:text-forest-dark"
                >
                  Take-Home Salary & Tax Calculator
                </Link>
                .
              </p>
            </div>
          </>
        ),
      }}
      faqs={[
        {
          q: "How much does YouTube pay for 1 million views in India?",
          a: "In India, YouTube AdSense pays between ₹40,000 and ₹70,000 for 1 million views on entertainment, vlogs, and comedy channels (RPM of ₹40 to ₹70). On tech and tutorial channels, 1 million views generate ₹1,50,000 to ₹2,50,000. In high-paying niches like stock market, investing, and crypto, 1 million views can earn ₹2,50,000 to ₹4,50,000. For YouTube Shorts, 1 million views pay only ₹1,500 to ₹3,500.",
        },
        {
          q: "What is the difference between CPM and RPM?",
          a: "CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions before YouTube takes its 45% revenue cut. RPM (Revenue Per Mille) is the exact amount you actually earn per 1,000 total video views after YouTube's share and including channel memberships, Super Chats, and YouTube Premium revenue. RPM is your true take-home metric.",
        },
        {
          q: "How much does YouTube pay for 1,000 views in India?",
          a: "For 1,000 views in India, long-form videos pay between ₹35 and ₹350 depending on the niche. Tech and finance pay around ₹150 to ₹350 per 1k views, whereas entertainment, music, and vlogs pay around ₹35 to ₹70. YouTube Shorts pay roughly ₹1.50 to ₹3.50 per 1,000 views.",
        },
        {
          q: "Which YouTube niches have the highest RPM in India?",
          a: "The highest paying niches in India are Personal Finance, Stock Trading, Mutual Funds, Cryptocurrencies, Enterprise SaaS, Web Development, and Digital Marketing, with RPMs ranging from ₹200 to over ₹500 per 1,000 views. Educational courses and smartphone reviews follow closely with ₹120 to ₹250 RPM.",
        },
        {
          q: "Why do YouTube Shorts pay so much less than long-form videos?",
          a: "Shorts ads appear between videos in the swipe feed rather than directly on individual videos. Ad revenue from all Shorts is pooled together, and 55% goes to YouTube for music licensing and platform operations, leaving 45% distributed to creators based on their share of total pool views. As a result, Shorts RPM in India averages between ₹1.5 and ₹4 per 1,000 views.",
        },
        {
          q: "When does Google AdSense pay Indian creators?",
          a: "Google AdSense pays creators monthly between the 21st and 26th of the month via Wire Transfer (SWIFT) directly into your Indian bank account, provided your balance has reached the $100 (approx. ₹8,500) minimum payment threshold.",
        },
        {
          q: "Do Indian YouTubers have to pay income tax on YouTube earnings?",
          a: "Yes. YouTube earnings, sponsorships, and affiliate commissions are treated as 'Profits and Gains of Business or Profession' (PGBP) under the Income Tax Act. Indian creators with annual turnover up to ₹75 Lakhs can opt for presumptive taxation under Section 44ADA (declaring 50% of revenue as taxable profit) or deduct genuine business expenses like camera gear, editing software, and internet bills.",
        },
        {
          q: "How much can Indian YouTubers earn from brand sponsorships?",
          a: "For channels with 100k to 500k monthly views, dedicated sponsored integrations in India typically pay ₹25,000 to ₹1,50,000 per video, while 60-second shoutouts pay ₹10,000 to ₹50,000. In finance and tech niches, sponsorship revenue often exceeds Google AdSense by 2x to 3x.",
        },
      ]}
    />
  );
}
