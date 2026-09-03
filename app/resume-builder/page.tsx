import type { Metadata } from "next";
import ResumeBuilder from "@/components/tools/ResumeBuilder";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";
import { RESUME } from "@/lib/seo";

export const metadata: Metadata = RESUME;

const FAQS = [
  {
    q: "Is this resume builder really free?",
    a: "Yes, completely free with no sign-up, no watermark and no limits. You can build, edit and download your resume as a PDF as many times as you like, for as many versions as you need. Nothing is paywalled and no credit card is ever asked for.",
  },
  {
    q: "How do I download my resume as a PDF?",
    a: "Click the “Download PDF” button and your browser's print dialog opens. Choose “Save as PDF” as the destination and save. Only the clean resume is exported. The form, buttons, and the rest of the page are stripped away automatically using print-specific stylesheets, so what you save is exactly what a recruiter would see.",
  },
  {
    q: "Will my resume pass ATS (applicant tracking systems)?",
    a: "The template is built to be ATS-friendly: it uses real, selectable text with no content rendered as images, a clean single-column layout, and standard section headings like Experience, Education and Skills that parsers recognise reliably. It also avoids headers, footers, tables, and multi-column layouts that confuse older ATS software.",
  },
  {
    q: "Is my data private?",
    a: "Everything stays in your own browser. Your details are saved locally using the browser's localStorage so you don't lose your work on refresh, and nothing is uploaded to a server unless you choose to use the optional “Improve with AI” button, which only sends the specific text you ask it to polish.",
  },
  {
    q: "What does “Improve with AI” do?",
    a: "It's an optional helper that rewrites your summary or bullet points to be more concise and achievement-focused. It is entirely optional. The builder works fully without it, and you can always edit the wording yourself if the suggested version doesn't match your voice. Only the text you highlight is sent, not your entire resume.",
  },
  {
    q: "Which resume format is best?",
    a: "For most people a reverse-chronological, single-column resume works best: it's easy for recruiters to scan and reliable for ATS parsing. This builder uses exactly that format. Functional or skills-based resumes can work for career changers, but they often confuse ATS systems and are viewed less favourably by recruiters who want to see a clear career timeline.",
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

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${site.url}/tools` },
      { "@type": "ListItem", position: 3, name: "Resume Builder", item: `${site.url}/resume-builder` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ToolPageLayout
        title="Free Resume Builder"
        description="Fill in your details on the left and watch a clean, professional resume build itself on the right. Download it as a PDF in one click, no sign-up, no watermark, and an optional AI helper to polish your wording."
        howToUse={[
          {
            step: "Start with the basics",
            detail: "Fill in your name, email address, phone number, and any professional links like LinkedIn or a portfolio site. These sit at the top of your resume and are the first things a recruiter looks for. Double-check that your phone number and email address are correct. A single typo here means you never hear back from an employer who wanted to reach you.",
          },
          {
            step: "Summarise your profile",
            detail: "Write a two-to-three-sentence professional summary that captures your current role or target role, your key strengths, and the kind of opportunity you are looking for next. Avoid generic filler phrases like \"hard worker\" or \"team player.\" Instead, lead with your job title, years of relevant experience, and one concrete achievement that gives the reader a reason to keep going.",
          },
          {
            step: "Add your work experience",
            detail: "List your roles in reverse chronological order so your most recent and relevant position appears first. For each role, include the company name, your job title, the dates you worked there, and bullet points describing your contributions. Start every bullet with a strong action verb (led, built, launched, grew, reduced, designed) and quantify the result wherever you honestly can. A bullet like \"Grew monthly revenue from $12K to $38K in nine months\" tells a far better story than \"Responsible for revenue growth.\"",
          },
          {
            step: "Fill in education and skills",
            detail: "Add your degrees, diplomas, or certifications with the institution name and the year of completion. List skills that are directly relevant to the role you are targeting: technical competencies like programming languages or software tools on one side, and professional skills like project management, data analysis, or stakeholder communication on the other. Keep the skills section honest; you may be asked to demonstrate any claim during an interview.",
          },
          {
            step: "Review, polish, and download",
            detail: "Use the live preview panel on the right to check how your resume looks as you type. Toggle the optional AI helper to rephrase any bullet points that feel weak or wordy. You can accept or reject its suggestions. When you are satisfied, click Download PDF. Your browser's print dialog opens; choose \"Save as PDF\" as the destination, and you will get a clean, ATS-friendly file with no UI elements, watermarks, or branding.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are actively applying for jobs",
            detail: "When you spot a role you want, tailor your resume to match the job description before you submit it. Swap in relevant keywords from the listing, reorder your bullet points so the most relevant experience sits near the top, and tweak your summary to speak directly to what the employer says they need. A customised resume consistently outperforms a generic one, both with ATS screening and with human reviewers.",
          },
          {
            scenario: "You are updating your career history",
            detail: "Even if you are not actively job hunting, keeping your resume current is one of the most valuable professional habits you can build. Record promotions, new responsibilities, and notable achievements as they happen. Details fade from memory faster than you expect, and reconstructing accomplishments six months later is much harder. An up-to-date resume also means you can act immediately when an unexpected opportunity lands in your inbox.",
          },
          {
            scenario: "You are building a master resume",
            detail: "Create a comprehensive version that includes every role you have held and every meaningful achievement, without worrying about page length. This master copy becomes your personal career archive, a single reference document from which you trim and tailor versions for specific applications. When you keep it updated, you never have to start from a blank page or dig through old files to remember dates, metrics, or responsibilities.",
          },
        ]}
        howItWorks="This resume builder splits your screen into an editing panel on the left and a live preview on the right. As you type into the form fields (name, summary, work history, education, skills), the preview updates in real time so you can see exactly how your resume will look without switching tabs. All of your data is saved to your browser's local storage, which means you will not lose your work if you accidentally refresh the page or close the tab. When you are ready to export, the Download PDF button triggers your browser's native print function with CSS rules that hide every UI element (buttons, form fields, instructions, and branding), leaving only the clean resume content. The optional AI helper sends only the text you select to a language model and returns improved phrasing, but the builder is completely functional without it."
        tips={[
          "Lead with achievements, not duties. Recruiters skim for results, not responsibilities. Replace a bullet like \"Responsible for managing a team\" with \"Led a team of six to deliver twelve projects on time, increasing client retention by 20%.\" Concrete numbers make your contributions impossible to ignore.",
          "Tailor your resume for every application. Scan the job description for recurring phrases and technical terms, and mirror that language in your summary and skills sections. Applicant tracking systems score against keyword matches, and human reviewers notice when a resume feels written specifically for their opening.",
          "Aim for a single page if you have fewer than ten years of experience. Studies show recruiters spend an average of six to seven seconds on a first pass. A second page that adds no meaningful new information works against you by burying your strongest content.",
          "Stick to a plain, professional layout with a standard font. Fancy templates with multiple columns, icons, charts, or text boxes confuse ATS parsers and often cause your content to be read out of order or skipped entirely. Clean, simple formatting is the safest route through both software and human review.",
          "Proofread twice, then ask someone else to read it too. Typos and grammatical mistakes are the single fastest route to the reject pile, and your own eyes learn to skip over errors after reading the same text several times. A fresh pair of eyes, or reading the document aloud, catches mistakes yours have stopped noticing.",
        ]}
        faqs={FAQS}
        relatedTools={[
          { label: "Invoice Generator", href: "/tools/invoice-generator" },
          { label: "Budget Planner", href: "/tools/budget-planner" },
          { label: "Password Generator", href: "/tools/password-generator" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
        ]}
        disclaimerType="general"
      >
        <ResumeBuilder />
      </ToolPageLayout>
    </>
  );
}
