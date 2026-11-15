import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

const OG_TITLE = "Contact CoinMind - Feedback, Corrections & Tool Ideas";
const OG_DESC =
  "Get in touch with the CoinMind team: feedback, corrections, partnership enquiries or a tool you'd like us to build. We read and answer every genuine message.";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CoinMind team: feedback, corrections, partnership enquiries or a tool you'd like us to build.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: "/contact",
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: OG_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: ["/opengraph-image"],
  },
};

export default function Page() {
  return (
    <LegalPage pill="Contact" title="Get in touch with CoinMind">
      <div className="space-y-8">
        <p className="text-base text-text-muted leading-relaxed">
          We welcome feedback, suggestions, error reports, and partnership inquiries. Because CoinMind is dedicated to mathematical accuracy and editorial transparency, every message sent to us is reviewed directly by our editorial and development team.
        </p>

        <ContactForm />

        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
            <h3 className="text-base font-bold text-text mb-2">Direct Email</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              For direct communication, media inquiries, or formal correspondence, reach our editorial desk at:
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block font-semibold text-brand hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-2 text-xs text-text-muted">Expected response time: Within 24–48 business hours.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
            <h3 className="text-base font-bold text-text mb-2">Location & Editorial Base</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              CoinMind is operated from New Delhi, India. Our editorial operations adhere to Indian Standard Time (IST, UTC+5:30) for research and correspondence.
            </p>
            <p className="mt-3 text-xs font-medium text-text">New Delhi, India</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-text">How We Handle Inquiries</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm text-text-muted">
            <div>
              <h4 className="font-semibold text-text mb-1">1. Mathematical & Formula Corrections</h4>
              <p className="leading-relaxed">
                If you believe a calculator formula differs from statutory guidelines (e.g., Section 10(13A) HRA rules, Section 87A tax rebate, or AMFI SIP compounding), please include the calculation steps. We investigate and resolve verified issues promptly on our public corrections log.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-1">2. Regulatory & Budget Updates</h4>
              <p className="leading-relaxed">
                Following Union Budget announcements or RBI Monetary Policy Committee (MPC) rate revisions, our team updates relevant calculators and guides. Tip-offs on circular releases are welcomed and prioritized.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-1">3. Educational & Content Partnerships</h4>
              <p className="leading-relaxed">
                We collaborate with academic institutions, certified financial educators, and independent analysts who share our mission of jargon-free, objective financial literacy in India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-1">4. Privacy & Data Handling</h4>
              <p className="leading-relaxed">
                Any contact information or email address submitted through this form is used solely to respond to your specific inquiry. CoinMind will never sell, rent, or distribute your email address to marketing third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalPage>
  );
}
