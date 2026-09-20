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
      <section className="bg-[#0c1628] text-white">
        <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />
        <div className="container-main py-14 sm:py-18">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#4ade80] bg-[#16a34a]/10 border border-[#16a34a]/20 rounded-full px-3 py-1 mb-4">
            About CoinMind
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-[640px]">
            We build tools that help you understand your money — without the jargon, sales pitch, or paywall.
          </h1>
          <p className="mt-4 text-slate-400 max-w-[560px] leading-relaxed">
            Free calculators, guides and tools for every Indian financial decision. Every formula is documented, every source is cited, no login required.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/about/author" className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e3a5f] bg-[#0f2040] px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-all">
              <Users className="h-3.5 w-3.5" /> Meet the author
            </Link>
            <Link href="/calculators" className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2f5bea] to-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white">
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
                <Link href={`/about/author`} className="text-brand font-medium hover:underline underline-offset-2">
                  {site.author.fullName}
                </Link>
                , who is pursuing the Chartered Accountancy (CA) Final. Every calculator, guide and comparison is researched, written and fact-checked by a human — AI is a research and drafting aid only and never publishes content unedited.
              </p>
              <p className="text-text-muted leading-relaxed mt-3">
                Based in {site.author.location}. Self-funded, independent. We take no investment, sponsorship or paid placement from any financial product or company.
              </p>
              <Link href="/about/author" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-2">
                Full author profile <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* How we make money */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-lg font-bold text-text">How we make money</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                {site.name} is free to use and will always remain free. We fund the site through Google AdSense and occasional affiliate links. If you click an affiliate link and make a purchase, we may earn a small commission at no extra cost to you. This never influences what we recommend or how we rate tools.
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
                <h2 className="text-lg font-bold text-text">How we ensure accuracy</h2>
              </div>
              <p className="text-text-muted leading-relaxed">
                Every calculator uses published, standard formulas verified against official sources: RBI, SEBI, the Income Tax Department, AMFI, EPFO and the National Savings Institute. When we find an error, we log it publicly on our corrections page.
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
