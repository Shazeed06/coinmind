import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { posts } from "@/lib/data";
import { ShieldAlert } from "lucide-react";

export function generateStaticParams() {
  return [{ slug: site.author.slug }];
}

const TOPICS = [
  "Personal finance in India",
  "Indian income tax and the new vs old regime",
  "Mutual funds and SIP investing",
  "Fixed deposits and small savings schemes",
  "PPF, EPF and NPS",
  "Loans, EMI and home loan eligibility",
  "GST and indirect tax basics",
  "Budgeting, saving and financial planning",
  "AI tools and how to use them well",
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== site.author.slug) return {};

  const author = site.author;
  const title = `${author.fullName} - ${author.role} at ${site.name}`;
  const description = `${author.fullName} is the ${author.role.toLowerCase()} of ${site.name} and a ${author.credential}. Read about his background, editorial approach and the finance guides and calculators he writes.`;
  const canonical = `${site.url}/authors/${slug}`;

  return {
    title: { absolute: `${title} · ${site.name}` },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== site.author.slug) notFound();

  const author = site.author;
  const profileUrl = `${site.url}/authors/${slug}`;
  const recentPosts = posts.slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.fullName} - ${author.role} at ${site.name}`,
    url: profileUrl,
    description: author.bio,
    mainEntity: {
      "@type": "Person",
      name: author.fullName,
      jobTitle: author.role,
      description: author.bio,
      url: profileUrl,
      knowsAbout: TOPICS,
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
      publishingPrinciples: `${site.url}/editorial-standards`,
    },
  };

  return (
    <div className="container-main py-24">
      <div className="max-w-[720px] mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
            <h2 className="h3 text-text">About {author.fullName}</h2>
            <p className="body text-text-muted mt-3">{author.bio}</p>
            <p className="body text-text-muted mt-3">
              {site.name} started as a simple frustration. Most Indian finance content is either an advertisement in
              disguise or a wall of jargon that assumes you already know what a rebate, a rolling return or a reducing
              balance is. {author.fullName} built {site.name} to be the opposite: free calculators that show their
              working, and guides that explain a concept once, properly, in plain English. There is no sign-up wall, no
              paywall and no gated PDF anywhere on the site.
            </p>
            <p className="body text-text-muted mt-3">
              {site.name} is a self-funded independent project. It does not take investment, sponsorship or paid
              placement from any financial product or company, and no bank, broker, fund house or lender pays for
              coverage, ratings or placement here. The site is funded through advertising and occasional affiliate
              links, which are explained in full on the{" "}
              <Link href="/affiliate-disclosure" className="text-brand underline underline-offset-2">
                affiliate disclosure
              </Link>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Background and credentials</h2>
            <p className="body text-text-muted mt-3">
              {author.fullName} is {author.education.charAt(0).toLowerCase() + author.education.slice(1)}, which is
              where the tax, accounting and financial-reporting grounding behind the site comes from. He is based in{" "}
              {author.location}.
            </p>
            <p className="body text-text-muted mt-3">
              To be explicit about what that does and does not mean: he is not a SEBI-registered investment adviser,
              and nothing on {site.name} is personalised financial advice. He does not recommend specific funds,
              stocks, insurance policies or loan products, and he does not manage anyone else&apos;s money. What he
              does is explain how the maths and the rules actually work, so you can make your own decision or ask a
              licensed professional a much sharper question.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">What he covers</h2>
            <p className="body text-text-muted mt-3">
              His work on {site.name} spans four areas: the{" "}
              <Link href="/calculators" className="text-brand underline underline-offset-2">calculators</Link>{" "}
              (SIP, EMI, income tax, FD, PPF, EPF, NPS, gratuity, HRA, capital gains and more), the{" "}
              <Link href="/blog" className="text-brand underline underline-offset-2">guides and how-tos</Link>{" "}
              covering investing, tax filing, credit, loans and side income, the{" "}
              <Link href="/glossary" className="text-brand underline underline-offset-2">finance glossary</Link>, and
              reviews of{" "}
              <Link href="/ai-tools" className="text-brand underline underline-offset-2">AI tools</Link>{" "}
              for people who want to use them for real work rather than novelty.
            </p>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-text-muted">
              {TOPICS.map((t) => (
                <li key={t} className="rounded-card bg-bg-alt border border-border px-3 py-2">{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="h3 text-text">Editorial approach</h2>
            <p className="body text-text-muted mt-3">
              Every article and calculator on {site.name} is written, edited and fact-checked by a human before
              publication. AI is used for research and drafting support only, and nothing is published unedited.
              Content is regularly reviewed and updated, especially after Union Budgets and RBI policy announcements.
            </p>
            <p className="body text-text-muted mt-3">
              Figures are verified against primary sources rather than second-hand blogs: the RBI, SEBI, the Income
              Tax Department, AMFI, EPFO and the National Savings Institute. Each calculator&apos;s formula, source
              and exclusions are documented publicly on the{" "}
              <Link href="/methodology" className="text-brand underline underline-offset-2">methodology</Link>{" "}
              page, and the wider process is set out in the{" "}
              <Link href="/editorial-standards" className="text-brand underline underline-offset-2">editorial standards</Link>.
              If a page does not add something genuinely useful, it does not get published.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Corrections and contact</h2>
            <p className="body text-text-muted mt-3">
              Mistakes get fixed in public. When an error is found, it is logged with a date and an explanation on the{" "}
              <Link href="/corrections" className="text-brand underline underline-offset-2">corrections</Link>{" "}
              page rather than quietly edited away. If you spot a wrong number, an outdated tax slab or a formula that
              looks off, please say so.
            </p>
            <p className="body text-text-muted mt-3">
              Email{" "}
              <a href={`mailto:${site.email}`} className="text-brand underline underline-offset-2">{site.email}</a>{" "}
              or use the{" "}
              <Link href="/contact" className="text-brand underline underline-offset-2">contact form</Link>. Every
              genuine report is checked and answered.
            </p>
          </section>

          <section>
            <h2 className="h3 text-text">Recent articles by {author.fullName}</h2>
            <ul className="mt-3 space-y-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block rounded-card border border-border bg-bg-alt p-4 hover:border-brand transition-colors"
                  >
                    <span className="block text-sm font-semibold text-text">{p.title}</span>
                    <span className="block text-xs text-text-muted mt-1">
                      {p.category} | {p.date} | {p.readMinutes} min read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="body text-text-muted mt-4">
              Browse everything on the{" "}
              <Link href="/blog" className="text-brand underline underline-offset-2">guides index</Link>.
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
