import type { ReactNode } from "react";
import { Breadcrumb, Pill, Prose, StickyTOC } from "@/components/ui";

type LegalPageProps = {
  pill: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
};

export function LegalPage({ pill, title, lastUpdated, children }: LegalPageProps) {
  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Breadcrumb items={[{ label: title }]} />
          <Pill>{pill}</Pill>
          <h1 className="h1 text-text mt-3">{title}</h1>
          {lastUpdated && <p className="text-sm text-text-muted mt-2">Last updated: {lastUpdated}</p>}
        </div>
      </section>

      <section className="section-pad pt-0 bg-white">
        <div className="container-main grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24">
              <p className="eyebrow text-text-muted mb-3">On this page</p>
            </div>
          </div>
          <div className="lg:col-span-9">
            <Prose>{children}</Prose>
          </div>
        </div>
      </section>
    </div>
  );
}
