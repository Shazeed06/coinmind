import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { ShieldAlert } from "lucide-react";

export function generateStaticParams() {
  return [{ slug: site.author.slug }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== site.author.slug) return {};
  return {
    title: { absolute: `${site.author.fullName} — ${site.author.role} · ${site.name}` },
    description: site.author.bio,
    alternates: { canonical: `/authors/${slug}` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== site.author.slug) notFound();

  const author = site.author;

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-brand text-white flex items-center justify-center text-2xl font-bold shrink-0">
            {author.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="h2 text-text">{author.fullName}</h1>
            <p className="text-lg text-text-muted mt-1">{author.role} at {site.name}</p>
            <p className="text-sm text-text-muted mt-0.5">{author.credential}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="h3 text-text">About</h2>
            <p className="body text-text-muted mt-3">{author.bio}</p>
          </section>

          {author.education && (
            <section>
              <h2 className="h3 text-text">Education</h2>
              <p className="body text-text-muted mt-3">{author.education}</p>
            </section>
          )}

          {author.location && (
            <section>
              <h2 className="h3 text-text">Location</h2>
              <p className="body text-text-muted mt-3">{author.location}</p>
            </section>
          )}

          <section>
            <h2 className="h3 text-text">Editorial approach</h2>
            <p className="body text-text-muted mt-3">
              Every article and calculator on {site.name} is written, edited and fact-checked by a human before publication.
              AI is used for research and drafting support only, never published unedited.
              Content is regularly reviewed and updated — especially after Union Budgets and RBI policy announcements.
            </p>
          </section>

          <div className="p-5 rounded-card bg-bg-alt border border-border flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <p className="text-sm text-text-muted">{author.sebiDisclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
