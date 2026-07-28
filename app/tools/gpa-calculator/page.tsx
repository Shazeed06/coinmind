import type { Metadata } from "next";
import GpaCalculator from "@/components/tools/GpaCalculator";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "GPA & CGPA Calculator — Free Online" },
  description:
    "Free GPA and CGPA calculator. Add courses, credits and grades for a live weighted GPA (4.0) or CGPA (10-point), plus CGPA to percentage. 100% private.",
  alternates: { canonical: "/tools/gpa-calculator" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/gpa-calculator",
    title: "GPA & CGPA Calculator — Free Online",
    description:
      "Add courses, credits and grades for a live weighted GPA (4.0) or CGPA (10-point), with a CGPA to percentage helper. Runs privately in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GPA and CGPA calculator",
      },
    ],
  },
};

const faqData = [
  {
    q: "How is GPA calculated?",
    a: "Your GPA is a credit-weighted average of your grade points. Each course's grade point is multiplied by its number of credits, those products are added up, and the total is divided by the total credits. Courses worth more credits therefore influence the result more than lighter ones.",
  },
  {
    q: "What is the difference between GPA and CGPA?",
    a: "GPA usually refers to a single term or semester on a 4.0 scale, common in the US. CGPA (Cumulative Grade Point Average) is the average across all terms, and in India it is normally reported on a 10-point scale. This tool supports both scales with a single toggle.",
  },
  {
    q: "How do I convert CGPA to a percentage?",
    a: "The most widely used approximation in India is percentage = CGPA × 9.5. For example, a CGPA of 8.0 works out to 76%. It is only an estimate — universities such as different state and central boards may publish their own conversion formula, so always check your institution's official method.",
  },
  {
    q: "Which letter grades map to which grade points?",
    a: "On the 4.0 scale this tool uses the common unweighted mapping: A and A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, and so on down to F = 0.0. On the 10-point scale you enter the grade point (0 to 10) your university awarded for each subject.",
  },
  {
    q: "Is my data saved or uploaded anywhere?",
    a: "No. Every calculation happens in your browser with JavaScript. Your courses, credits and grades are never sent to a server, stored or seen by anyone, so it is safe to use for real transcripts.",
  },
  {
    q: "Can I calculate SGPA separately from CGPA?",
    a: "This calculator gives you the cumulative GPA or CGPA for all courses you enter. To calculate a single semester's SGPA, enter only that semester's courses, note the result, and then clear before entering the next semester.",
  },
  {
    q: "What if my university uses a different grade-to-point mapping?",
    a: "On the 10-point CGPA scale, you enter the numerical grade point directly — any value from 0 to 10 — so you can match your university's exact grading scheme. On the 4.0 scale, the tool uses the standard unweighted letter-grade mapping, which works for most institutions.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: "GPA & CGPA Calculator",
        item: `${site.url}/tools/gpa-calculator`,
      },
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
        title="GPA & CGPA Calculator"
        description="Add your courses, credits and grades to get a live weighted GPA (4.0 scale) or CGPA (10-point) — with a built-in CGPA to percentage converter, right in your browser."
        howToUse={[
          {
            step: "Choose your grading scale",
            detail:
              "Toggle between GPA (4.0 scale, used across US colleges and universities) and CGPA (10-point scale, common in Indian universities and technical boards). The grade options and input fields change automatically to match.",
          },
          {
            step: "Add a course",
            detail:
              "Enter a course name for your reference, type the number of credits (or credit hours) the course carries, and select the grade you received. Courses with more credits carry proportionally more weight in the final average.",
          },
          {
            step: "Add all your courses",
            detail:
              "Click Add course to include every subject from your semester or entire programme. Your cumulative GPA or CGPA updates live at the top as you add, edit or remove entries.",
          },
          {
            step: "Review your weighted average",
            detail:
              "The calculator displays your overall GPA or CGPA prominently. It is a credit-weighted average, not a simple mean — so a five-credit core subject moves your score five times more than a one-credit elective.",
          },
          {
            step: "Use the CGPA to percentage converter",
            detail:
              "When using the CGPA (10-point) scale, type your CGPA into the converter box to see the approximate percentage using the widely-used CBSE formula: percentage = CGPA × 9.5.",
          },
          {
            step: "Start over or edit as needed",
            detail:
              "Clear all courses to calculate a fresh set, modify individual entries to see hypothetical what-if scenarios, or adjust a grade to find out what you need in remaining courses to hit a target CGPA.",
          },
        ]}
        whenToUse={[
          {
            scenario: "Planning your semester or academic year",
            detail:
              "Add your expected or target grades to forecast what GPA you will land if you score certain marks in each subject. It takes the uncertainty out of academic planning.",
          },
          {
            scenario: "Verifying your transcript or mark sheet",
            detail:
              "Enter your actual grades from an official transcript to double-check your university's calculation. Spotting an error early can save weeks of administrative back-and-forth later.",
          },
          {
            scenario: "Setting targets for remaining courses",
            detail:
              "Enter the grades you already have, then experiment with different grades for your remaining subjects to see exactly what you need to reach a target CGPA — useful before final exams or placement season.",
          },
        ]}
        howItWorks="GPA and CGPA are credit-weighted averages, not simple arithmetic means. For each course, the grade point (for example, A = 4.0, B = 3.0 on the 4.0 scale, or a numerical value on the 10-point scale) is multiplied by the number of credits the course carries. All these products are summed across every course you enter, then the total is divided by the sum of all credits. A 5-credit course therefore has five times the influence on your average compared to a 1-credit elective. This tool performs all calculations locally in your browser using JavaScript, with no data sent to any server."
        tips={[
          "Double-check every credit value — entering a wrong credit count for even one course can noticeably shift your overall GPA, especially if you are calculating across a small number of courses.",
          "Use the correct scale for your institution — GPA (4.0) and CGPA (10-point) are fundamentally different systems. Toggling between them mid-calculation will reset your entries.",
          "Remember that A and A+ both map to 4.0 on the unweighted 4.0 scale — some schools award 4.3 or higher for A+, so confirm your institution's specific mapping if precision matters.",
          "The CGPA to percentage conversion is an estimate — while CGPA × 9.5 is the most widely recognised formula in India, your specific university or board may publish a different official conversion. Always check for applications.",
          "This tool works offline — once the page has loaded, all calculations happen locally in your browser without any internet connection, so you can use it in a classroom, library or anywhere.",
        ]}
        faqs={faqData}
        relatedTools={[
          { label: "Scientific Calculator", href: "/tools/scientific-calculator" },
          { label: "Percentage Calculator", href: "/tools/percentage-calculator" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
          { label: "All tools", href: "/tools" },
        ]}
      >
        <GpaCalculator />
      </ToolPageLayout>
    </>
  );
}
