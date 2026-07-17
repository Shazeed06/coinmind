import type { Metadata } from "next";
import ResumeBuilder from "@/components/tools/ResumeBuilder";
import { IconSparkle } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Free Resume Builder — Make a Professional CV Online",
  },
  description:
    "Free resume builder with live preview and one-click PDF. Create an ATS-friendly, professional CV in minutes — with optional AI help. No sign-up.",
  alternates: { canonical: "/resume-builder" },
  openGraph: {
    title: "Free Resume Builder — Make a Professional CV Online",
    description:
      "Build an ATS-friendly resume with a live preview and free PDF download. Optional AI help to polish your wording. No sign-up.",
    url: `${site.url}/resume-builder`,
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is this resume builder really free?",
    a: "Yes — completely free with no sign-up, no watermark and no limits. You can build, edit and download your resume as a PDF as many times as you like.",
  },
  {
    q: "How do I download my resume as a PDF?",
    a: "Click the “Download PDF” button. Your browser's print dialog opens — choose “Save as PDF” as the destination and save. Only the clean resume is exported, not the form or the rest of the page.",
  },
  {
    q: "Will my resume pass ATS (applicant tracking systems)?",
    a: "The template is built to be ATS-friendly: it uses real, selectable text (no images or icons for content), a clean single-column layout and standard section headings like Experience, Education and Skills that parsers recognise.",
  },
  {
    q: "Is my data private?",
    a: "Everything stays in your own browser. Your details are saved locally so you don't lose your work on refresh, and nothing is uploaded to a server unless you choose to use the optional “Improve with AI” button.",
  },
  {
    q: "What does “Improve with AI” do?",
    a: "It's an optional helper that rewrites your summary or bullet points to be more concise and achievement-focused. It's entirely optional — the builder works fully without it, and you can always edit the wording yourself.",
  },
  {
    q: "Which resume format is best?",
    a: "For most people a reverse-chronological, single-column resume works best: it's easy for recruiters to scan and reliable for ATS parsing. This builder uses exactly that format.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      {/* Hero */}
      <header className="no-print max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-soft px-3 py-1.5 text-xs font-semibold text-forest">
          <IconSparkle className="h-3.5 w-3.5" /> Free tool
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-600 text-ink leading-[1.05]">
          Free Resume Builder
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Fill in your details on the left and watch a clean, professional
          resume build itself on the right. Download it as a PDF in one click —
          no sign-up, no watermark, and an optional AI helper to polish your
          wording.
        </p>
      </header>

      <div className="mt-10">
        <ResumeBuilder />
      </div>

      {/* SEO / helpful content */}
      <section className="no-print mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          How to write a resume that actually gets read
        </h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Recruiters skim. On a first pass, most spend just a few seconds
            deciding whether to keep reading — so the top third of your resume
            has to do the heavy lifting. Lead with a sharp headline (your target
            role), a two-to-three-line summary of the value you bring, and make
            sure your most impressive, most relevant experience is near the top.
          </p>
          <p>
            The single biggest upgrade you can make is turning duties into{" "}
            <strong className="text-ink">achievements</strong>. &ldquo;Responsible
            for social media&rdquo; says little; &ldquo;Grew Instagram from 2k to
            25k followers in 8 months, driving 15% of new sign-ups&rdquo; tells a
            story with a result. Start each bullet with a strong action verb —
            led, built, launched, cut, grew — and add a number wherever you
            honestly can.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-600 text-ink">
          Getting past the ATS
        </h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Many companies run resumes through an Applicant Tracking System
            before a human sees them. To stay readable to both:
          </p>
          <ul className="space-y-2 pl-5 list-disc marker:text-forest">
            <li>
              Keep a simple, single-column layout — no text inside images,
              tables or headers/footers that parsers may drop.
            </li>
            <li>
              Use standard section names: Summary, Experience, Education, Skills.
            </li>
            <li>
              Mirror the language of the job description. If the posting says
              &ldquo;stakeholder management&rdquo;, use that phrase where it
              genuinely applies.
            </li>
            <li>
              Export as a PDF with selectable text (exactly what this tool does)
              rather than a scanned or flattened image.
            </li>
            <li>
              Keep it to one page early in your career, two at most once you have
              a decade of relevant experience.
            </li>
          </ul>
        </div>

        <h2 className="mt-10 font-display text-2xl font-600 text-ink">
          A quick pre-send checklist
        </h2>
        <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
          <p>
            Before you hit apply: proofread twice (typos are the fastest route to
            the reject pile), confirm your email and phone are correct, tailor
            your summary and skills to the specific role, and save the file with
            a clear name like{" "}
            <span className="font-mono text-sm text-ink">
              Firstname-Lastname-Resume.pdf
            </span>
            . Then send it to yourself first to check it opens cleanly.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="no-print mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-600 text-ink">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-ink font-medium list-none">
                {f.q}
                <span className="text-ink-faint transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
