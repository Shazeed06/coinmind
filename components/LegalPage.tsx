import type { ReactNode } from "react";
import { Breadcrumb, Pill, Prose } from "@/components/ui";

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
          <h1 className="h1 text-text mt-3 max-w-3xl">{title}</h1>
          {lastUpdated && <p className="text-sm text-text-muted mt-2">Last updated: {lastUpdated}</p>}
        </div>
      </section>

      <section className="section-pad pt-0 bg-white">
        <div className="container-main">
          <div className="mx-auto max-w-3xl">
            <Prose>{children}</Prose>
          </div>
        </div>
      </section>
    </div>
  );
}
