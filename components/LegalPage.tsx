import type { ReactNode } from "react";
import Link from "next/link";
import { Prose } from "@/components/ui";

type LegalPageProps = {
  pill: string;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function LegalPage({ pill, title, subtitle, lastUpdated, icon, children }: LegalPageProps) {
  return (
    <div>
      {/* Dark hero — matches header/footer */}
      <section className="bg-[#0c1628] text-white">
        <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />
        <div className="container-main py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-slate-400">{title}</span>
          </nav>

          <div className="flex items-start gap-4 max-w-[760px]">
            {icon && (
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2f5bea]/30 to-[#16a34a]/20 border border-[#1e3a5f] flex items-center justify-center shrink-0 mt-1">
                {icon}
              </div>
            )}
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#4ade80] bg-[#16a34a]/10 border border-[#16a34a]/20 rounded-full px-3 py-1 mb-3">
                {pill}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-slate-400 leading-relaxed max-w-[600px]">{subtitle}</p>
              )}
              {lastUpdated && (
                <p className="mt-3 text-sm text-slate-600">Last updated: {lastUpdated}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f7f9fc]">
        <div className="container-main py-12 sm:py-16">
          <div className="max-w-[760px] mx-auto">
            <div className="rounded-2xl border border-border bg-white shadow-sm p-6 sm:p-10">
              <Prose>{children}</Prose>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
