import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `Privacy Policy · ${site.name}` },
  description: `${site.name}'s privacy policy: what data we collect, how we use it, and your rights. CoinMind calculators run in your browser and never upload your financial data.`,
  alternates: { canonical: `${site.url}/privacy` },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: `${site.url}/privacy`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LegalPage
        pill="Privacy Policy"
        title="Privacy Policy"
        subtitle="Your calculator inputs stay in your browser — we never upload the numbers you enter. Here's exactly what we do and don't collect."
        lastUpdated="September 2026"
        icon={<Shield className="h-6 w-6 text-[#4ade80]" />}
      >
        <div className="space-y-10">
          <section>
            <h2 className="h3 text-text">The short version</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> <strong>Your calculator inputs stay in your browser.</strong> We never collect the numbers you enter into any calculator.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We use Google Analytics 4 to understand aggregate traffic. It is anonymised.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We use Google AdSense to serve ads. Google sets cookies for this.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> We do not sell your data to anyone.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> You can opt out of analytics cookies at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">1. What we collect</h2>

            <h3 className="font-semibold text-text mt-6">Calculator inputs</h3>
            <p className="body text-text-muted mt-2">
              All calculations run in your browser using JavaScript. The numbers you enter into calculators are <strong>never sent to our servers</strong>. We have no visibility into what you calculate.
            </p>

            <h3 className="font-semibold text-text mt-6">Analytics data</h3>
            <p className="body text-text-muted mt-2">
              We use Google Analytics 4 (GA4) to collect aggregate, anonymised data about how the site is used: pages visited, approximate location (country/city), device type, referral source and session duration. IP addresses are anonymised. We do not enable user-level tracking.
            </p>

            <h3 className="font-semibold text-text mt-6">Contact form</h3>
            <p className="body text-text-muted mt-2">
              If you contact us via the contact form or email, we collect only the information you provide (name, email address, message). We use this solely to respond to your enquiry.
            </p>

            <h3 className="font-semibold text-text mt-6">Advertising</h3>
            <p className="body text-text-muted mt-2">
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out via Google's ad settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">adssettings.google.com</a>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">2. How we use data</h2>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> To understand which pages and tools are used most, so we can improve them.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> To diagnose technical errors (via server logs).</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">▸</span> To respond to your messages if you contact us.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not use data for targeted advertising beyond what Google AdSense does automatically.</li>
              <li className="flex items-start gap-2"><span className="text-brand shrink-0">✗</span> We do not sell or share your data with third parties for marketing.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">3. Cookies</h2>
            <p className="body text-text-muted mt-3">
              We use the following cookies:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-text font-semibold">Cookie</th>
                    <th className="text-left py-2 pr-4 text-text font-semibold">Provider</th>
                    <th className="text-left py-2 text-text font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted divide-y divide-border">
                  <tr>
                    <td className="py-2 pr-4">_ga, _ga_*</td>
                    <td className="py-2 pr-4">Google Analytics</td>
                    <td className="py-2">Aggregate, anonymised usage analytics</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">IDE, DSID</td>
                    <td className="py-2 pr-4">Google Ads</td>
                    <td className="py-2">Ad targeting and measurement (AdSense)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">cm_cookie_consent</td>
                    <td className="py-2 pr-4">{site.name}</td>
                    <td className="py-2">Remembers your cookie preference</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="h3 text-text">4. Third-party services</h2>
            <p className="body text-text-muted mt-3">
              {site.name} uses the following third-party services, each governed by their own privacy policies:
            </p>
            <ul className="mt-3 space-y-2 text-text-muted body">
              <li><strong>Google Analytics 4</strong> — <a href="https://policies.google.com/privacy" className="text-brand underline underline-offset-2" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><strong>Google AdSense</strong> — <a href="https://policies.google.com/privacy" className="text-brand underline underline-offset-2" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><strong>Vercel</strong> (hosting) — <a href="https://vercel.com/legal/privacy-policy" className="text-brand underline underline-offset-2" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">5. Your rights</h2>
            <p className="body text-text-muted mt-3">
              You can opt out of analytics cookies using our cookie consent banner. You can also opt out of personalised ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">adssettings.google.com</a>.
            </p>
            <p className="body text-text-muted mt-3">
              For any privacy-related enquiry, email us at{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">6. Data retention</h2>
            <p className="body text-text-muted mt-3">
              Google Analytics data is retained for 14 months by default. Contact form messages are retained for up to 1 year unless you request deletion.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">7. Changes to this policy</h2>
            <p className="body text-text-muted mt-3">
              Material changes will be noted at the top of this page with a new effective date. We will not reduce your rights without notice.
            </p>
          </section>
        </div>
      </LegalPage>
    </>
  );
}
