import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Shield, BookOpen, Calculator, ExternalLink, CheckCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${site.author.fullName} - Founder & Editor · ${site.name}` },
  description: `${site.author.fullName} is the founder and editor of ${site.name}, pursuing Chartered Accountancy (CA) Final. Learn about the person behind CoinMind's calculators and guides.`,
  alternates: { canonical: `${site.url}/about/author` },
  openGraph: {
    type: "profile",
    url: `${site.url}/about/author`,
    siteName: site.name,
    locale: "en_IN",
    title: `${site.author.fullName} - Founder & Editor · ${site.name}`,
    description: `${site.author.fullName} is the founder and editor of ${site.name}, pursuing CA Final. The person behind CoinMind's calculators, guides and tools.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.author.fullName,
      jobTitle: site.author.role,
      description: site.author.bio,
      url: `${site.url}/about/author`,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: site.author.education,
      },
      worksFor: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      knowsAbout: [
        "Personal Finance",
        "Income Tax (India)",
        "Investment Calculators",
        "Mutual Funds",
        "Chartered Accountancy",
      ],
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — dark gradient */}
      <section className="bg-[#0c1628] text-white">
        <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />
        <div className="container-main py-16 sm:py-20">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-10">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <span>›</span>
            <span className="text-slate-400">Author</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#2f5bea] to-[#16a34a] flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_32px_rgba(47,91,234,0.4)]">
                {site.author.fullName.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#16a34a] border-2 border-[#0c1628] flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {site.author.fullName}
                </span>
              </h1>
              <p className="text-[#6b9cff] font-semibold mt-2 text-lg">{site.author.role}, CoinMind</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e3a5f] bg-[#0f2040] px-3 py-1 text-xs text-slate-400">
                  <Shield className="h-3 w-3 text-[#4ade80]" />
                  CA Final — ICAI
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e3a5f] bg-[#0f2040] px-3 py-1 text-xs text-slate-400">
                  <Calculator className="h-3 w-3 text-[#6b9cff]" />
                  50+ Free Calculators Built
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1e3a5f] bg-[#0f2040] px-3 py-1 text-xs text-slate-400">
                  <BookOpen className="h-3 w-3 text-[#6b9cff]" />
                  100+ Finance Guides
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-slate-300 leading-relaxed max-w-[680px]">
            {site.author.bio}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container-main py-14">
        <div className="max-w-[760px] mx-auto grid gap-6">

          {/* Credentials card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-brand" />
              </div>
              <h2 className="text-lg font-bold text-text">Credentials</h2>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-bg-alt border border-border">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-brand font-bold text-sm">CA</span>
              </div>
              <div>
                <p className="font-semibold text-text">Chartered Accountancy (CA) Final</p>
                <p className="text-xs text-text-muted font-medium mt-0.5">The Institute of Chartered Accountants of India (ICAI)</p>
                <p className="text-sm text-text-muted mt-2 leading-relaxed">
                  One of India's most rigorous professional qualifications — covering financial reporting, taxation, auditing, and financial management. Currently in progress (Final stage).
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Important disclosure:</strong> {site.author.sebiDisclaimer} All content is for educational purposes only and does not constitute financial advice. Credentials are stated accurately and without inflation.
              </p>
            </div>
          </div>

          {/* Editorial responsibility card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-text">Editorial Responsibility</h2>
            </div>

            <p className="text-text-muted leading-relaxed">
              {site.author.fullName} is solely responsible for all content on {site.name} — every calculator formula, every guide, every comparison. AI tools are used as research and drafting aids only. No content is published without human review.
            </p>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { label: "All formulas documented", icon: "✓" },
                { label: "Every source cited", icon: "✓" },
                { label: "Human-reviewed content", icon: "✓" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-accent/5 border border-accent/10">
                  <span className="text-accent font-bold text-sm">{item.icon}</span>
                  <span className="text-xs font-medium text-text">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/editorial-policy" className="inline-flex items-center gap-1 text-brand font-medium hover:underline underline-offset-2">
                Editorial policy <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link href="/financial-review-process" className="inline-flex items-center gap-1 text-brand font-medium hover:underline underline-offset-2">
                Financial review process <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Why CoinMind */}
          <div className="rounded-2xl border border-[#2f5bea]/20 bg-gradient-to-br from-brand/5 to-transparent p-6">
            <h2 className="text-lg font-bold text-text mb-3">Why CoinMind was built</h2>
            <p className="text-text-muted leading-relaxed">
              Most Indian personal finance websites either charge for tools, drown calculators in ads, or use vague "AI-powered" formulas with no transparency. {site.name} was built to fix that: every formula is documented, every source is cited, and every tool runs in the browser — no login required, no data stored.
            </p>
            <Link href="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-2">
              Read the full story <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-brand/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-brand" />
              </div>
              <h2 className="text-lg font-bold text-text">Get in touch</h2>
            </div>
            <p className="text-text-muted text-sm mb-3">For corrections, editorial questions, or partnership enquiries:</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
