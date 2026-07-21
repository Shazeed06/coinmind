import type { Metadata } from "next";
import PregnancyDueDateCalculator from "@/components/calc/PregnancyDueDateCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Pregnancy Due Date Calculator — Weeks & Trimester" },
  description:
    "Free due date calculator. Estimate your due date from your last period (LMP) or conception date, and see how many weeks pregnant you are.",
  alternates: { canonical: "/calculators/pregnancy-due-date" },
  openGraph: { url: "/calculators/pregnancy-due-date" },
};

export default function Page() {
  return (
    <CalcPage
      slug="pregnancy-due-date"
      title="Pregnancy Due Date Calculator"
      subtitle="Estimate your due date and see how many weeks along you are."
      calculator={<PregnancyDueDateCalculator />}
      intro="A pregnancy due date calculator estimates when your baby is likely to arrive. The most common method uses the first day of your last menstrual period (LMP) and Naegele's rule — adding 280 days, or 40 weeks. If you know your conception or ovulation date instead, you can calculate from that. Alongside your estimated due date, this tool shows how many weeks pregnant you are right now, your current trimester, and roughly how long you have to go."
      how={{
        heading: "How your due date is calculated",
        body: (
          <>
            <p>
              The standard method, Naegele&apos;s rule, counts 280 days (40
              weeks) from the first day of your last period:
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              due date = last period + 280 days
            </p>
            <p>
              This assumes a 28-day cycle with ovulation around day 14. If your
              cycle is longer or shorter, the calculator shifts the due date by
              the difference so it stays accurate for you. If you calculate from
              a known conception date instead, it adds 266 days, since conception
              usually happens about two weeks after your period starts.
            </p>
            <p>
              Pregnancy is measured in <strong>gestational weeks</strong>,
              counted from your last period rather than from conception. That&apos;s
              why you&apos;re considered &quot;a few weeks pregnant&quot; even in the
              days right after conception. The first trimester runs through week
              13, the second from weeks 14 to 27, and the third from week 28 to
              birth.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How accurate is a due date calculator?",
          a: "It gives a solid estimate, but a due date is a target, not a deadline. Only about 1 in 20 babies are born on their exact due date, and a full-term birth can happen any time from 37 to 42 weeks. An early ultrasound is often used to confirm or adjust the date.",
        },
        {
          q: "How many weeks pregnant am I?",
          a: "Pregnancy is counted in gestational weeks from the first day of your last period. This calculator works out your current week and day automatically once you enter your last period or conception date, and tells you which trimester you're in.",
        },
        {
          q: "What if my cycle isn't 28 days?",
          a: "The classic rule assumes a 28-day cycle with ovulation on day 14. If your cycle is longer or shorter, enter your average cycle length and the calculator shifts the due date accordingly, since you likely ovulate earlier or later than day 14.",
        },
        {
          q: "Should I use my last period or conception date?",
          a: "Most people use the first day of their last period because it's easier to remember and is the medical standard. If you know your ovulation or conception date — for example from tracking or fertility treatment — switch to the conception method for a more direct estimate.",
        },
        {
          q: "Is this a substitute for a doctor's assessment?",
          a: "No. This calculator is for general information only. Your due date should be confirmed by a doctor or midwife, usually with an ultrasound, and every pregnancy is different. Always follow the guidance of your healthcare provider.",
        },
      ]}
    />
  );
}
