import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ABOUT } from "@/lib/seo";
import { Shield, BookOpen, Calculator, Users, ExternalLink } from "lucide-react";

export const metadata: Metadata = ABOUT;

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about`,
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Dark hero */}
      <section className="relative bg-[#0c1628] overflow-hidden">
        <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#2aa7de] to-[#2f5bea]" />
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 h-[400px] w-[400px] rounded-full bg-[#2f5bea]/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[250px] w-[350px] rounded-full bg-[#2aa7de]/6 blur-3xl" />
        </div>
        <div className="relative container-main py-14 sm:py-18">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#5bbce8] bg-[#2aa7de]/10 border border-[#2aa7de]/30 rounded-full px-3 py-1 mb-5">
            About CoinMind • Powered by Cloudflare
          </span>
          {/* inline color: global h1 { color: var(--color-text) } overrides text-white utility */}
          <h1
            style={{ color: "#ffffff" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight max-w-[640px] leading-[1.15]"
          >
            We build tools that help you understand your money - without the jargon, sales pitch, or paywall.
          </h1>
          <p className="mt-4 text-slate-400 max-w-[560px] leading-relaxed">
            Free calculators, guides and tools for every Indian financial decision. Every formula is documented, every source is cited, no login required.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/authors/sahil" className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e3a5f] bg-[#0f2040] px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-all">
              <Users className="h-3.5 w-3.5" /> Meet the author
            </Link>
            <Link href="/calculators" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2f5bea] to-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,91,234,0.4)]">
              <Calculator className="h-3.5 w-3.5" /> Free Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="bg-[#f7f9fc]">
        <div className="container-main py-14">
          <div className="max-w-[800px] mx-auto grid gap-6">

            {/* Who runs CoinMind */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-brand" />
                </div>
                <h2 className="text-lg font-bold text-text">Who runs CoinMind</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                {site.name} is founded and edited by{" "}
                <Link href={`/authors/sahil`} className="text-brand font-medium hover:underline underline-offset-2">
                  {site.author.fullName}
                </Link>
                , who is pursuing the Chartered Accountancy (CA) Final. Every calculator, guide and comparison is researched, written and fact-checked by a human - AI is a research and drafting aid only and never publishes content unedited.
              </p>
              <p className="text-text-muted leading-relaxed mt-3">
                Based in {site.author.location}. Self-funded, independent. We take no investment, sponsorship or paid placement from any financial product or company.
              </p>
              <Link href="/authors/sahil" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-2">
                Full author profile <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* The Origin Story */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-text">Why We Built CoinMind: The Problem with Indian Finance Portals</h2>
              <p className="text-text-muted leading-relaxed">
                Personal finance in India has historically been surrounded by two extremes: aggressive sales pitches disguised as educational articles, and dense statutory jargon that leaves everyday taxpayers confused. Most commercial portals require phone numbers, email addresses, and OTPs before revealing an EMI projection or tax breakdown, subsequently passing user leads to loan distributors or insurance brokers.
              </p>
              <p className="text-text-muted leading-relaxed">
                CoinMind was built to provide a clean, unbiased alternative. We believe every salaried individual, small business owner, and investor in India deserves access to accurate, transparent financial mathematics without paying with their privacy or dealing with sales spam.
              </p>
            </div>

            {/* Privacy by Design */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-text">Privacy by Design: Zero Gated Tools & Client-Side Execution</h2>
              <p className="text-text-muted leading-relaxed">
                Our calculators—including our SIP, EMI, Income Tax, HRA, and PPF calculators—run directly inside your web browser using modern client-side JavaScript. When you enter your salary, rent, loan balance, or monthly SIP amount, that information stays strictly inside your browser. We do not store, log, or transmit your confidential financial inputs to any remote server or marketing database.
              </p>
              <p className="text-text-muted leading-relaxed">
                There are no mandatory accounts, no credit card requirements, no paywalls, and no locked PDF downloads on CoinMind. Every feature is accessible to all visitors free of charge.
              </p>
            </div>

            {/* How we test calculators */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-brand" />
                </div>
                <h2 className="text-lg font-bold text-text">How Our Calculators Are Built and Verified</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                Accuracy in financial computation is non-negotiable. An incorrect tax slab or an improperly compounded annuity formula can lead to real-world planning mistakes. To guarantee absolute precision, our engineering and editorial team follows a rigorous 3-step validation framework:
              </p>
              <div className="grid gap-4 sm:grid-cols-3 text-sm text-text-muted">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-text mb-1">1. Statutory Sourcing</h3>
                  <p>Formulas are taken directly from legislative acts (Income Tax Act 1961, RBI Master Directions, AMFI Guidelines, and Central Board of Direct Taxes notifications).</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-text mb-1">2. Dual Implementation</h3>
                  <p>Calculations are independently verified using automated unit test suites in TypeScript and cross-checked against official government calculators.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-text mb-1">3. Annual Budget Audits</h3>
                  <p>Following every Union Budget and RBI Monetary Policy announcement, our team reviews tax slabs, surcharge rates, standard deduction caps, and repo rate linkages.</p>
                </div>
              </div>
            </div>

            {/* How we make money */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-lg font-bold text-text">How We Fund CoinMind</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                {site.name} is free to use and will always remain free. We fund server hosting, continuous development, and research through Google AdSense and occasional affiliate links. If you click an affiliate link and make a purchase, we may earn a small referral commission at no additional cost to you.
              </p>
              <p className="text-text-muted leading-relaxed mt-3">
                Crucially, commercial relationships never influence our editorial stance, calculator outcomes, or ratings. We do not accept sponsored reviews, pay-to-play rankings, or promotional articles from financial institutions.
              </p>
              <Link href="/affiliate-disclosure" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-2">
                Full affiliate disclosure <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* How we ensure accuracy */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-brand" />
                </div>
                <h2 className="text-lg font-bold text-text">Open Transparency & Corrections</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                We believe in full transparency. When statutory regulations change or if a minor calculation bug is identified, we document the update openly on our public corrections log.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {[
                  { label: "Formulas documented", href: "/methodology" },
                  { label: "Sources cited", href: "/sources" },
                  { label: "Errors logged publicly", href: "/corrections" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-2 p-3 rounded-xl bg-brand/5 border border-brand/10 text-xs font-medium text-brand hover:bg-brand/10 transition-colors">
                    ✓ {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">{site.author.sebiDisclaimer}</p>
                  <p className="mt-1 text-sm text-amber-800">
                    Everything on {site.name} is educational information to help you understand your options. For decisions that materially affect your money, consider speaking to a qualified professional.{" "}
                    <Link href="/disclaimer" className="underline underline-offset-2">Full disclaimer →</Link>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
