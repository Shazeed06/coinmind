import { Section, SectionHeader, Grid, Card, CardBody } from "@/components/ui";
import { ShieldCheck, UserCheck, FileText, Eye, TrendingUp, Zap, Globe } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "RBI-Aligned", desc: "Formulas follow official guidelines" },
  { icon: UserCheck, title: "Expert-Reviewed", desc: "Checked by CA (Final) candidate" },
  { icon: FileText, title: "Post-Budget Updates", desc: "Updated within 48 hours of every Budget" },
  { icon: Eye, title: "Privacy-First", desc: "All calculations run in your browser" },
  { icon: TrendingUp, title: "No Login", desc: "No sign-up, no account, no email" },
  { icon: Zap, title: "100% Free", desc: "Every tool is completely free, forever" },
];

export default function WhatIsCoinMind() {
  return (
    <Section variant="alt">
      <SectionHeader
        eyebrow="More Than a Calculator Website"
        title="More Than a Calculator Website"
        subline="Built for India, used worldwide — with accuracy and transparency at our core."
      />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 text-center lg:text-left">
          <p className="body text-text-muted leading-relaxed max-w-[680px] mx-auto lg:mx-0">
            CoinMind is a free, privacy-first personal finance platform with 46 calculators, 44 tools, and expert guides.
            Every formula is verified against official sources and updated after every Union Budget.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardBody>
                  <div className="flex items-start gap-3">
                    <f.icon className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-text">{f.title}</p>
                      <p className="text-sm text-text-muted">{f.desc}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <Card>
            <CardBody>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-brand">
                <Globe className="h-5 w-5" />
                <span className="eyebrow">Built for India</span>
              </div>
              <p className="text-sm text-text-muted mb-4 text-center lg:text-left">
                Designed for Indian investors, taxpayers and savers — with support for INR, Indian tax regimes, and local financial products.
              </p>
              <div className="space-y-4">
                {[
                  { country: "India", desc: "Primary audience — 46 calculators with Indian tax, SIP, PPF, NPS support" },
                  { country: "United States", desc: "Mortgage, retirement, currency — USD support throughout" },
                  { country: "United Kingdom", desc: "GBP support, mortgage and VAT calculators" },
                ].map(({ country, desc }) => (
                  <div key={country} className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-center sm:text-left">
                    <span className="text-sm font-semibold text-text shrink-0">{country}</span>
                    <p className="text-sm text-text-muted">{desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Section>
  );
}
