import { calcMeta } from "@/lib/seo";
import { calculators } from "@/lib/data";
import AgeCalculator from "@/components/calc/AgeCalculator";
import CalcPage from "@/components/calc/CalcPage";

const CALC = calculators.find((c) => c.slug === "age-calculator")!;
export const metadata = calcMeta("age-calculator", CALC.title + " - Exact Age in Years, Months & Days", CALC.blurb);

export default function Page() {
  return (
    <CalcPage
      slug="age-calculator"
      title="Age Calculator"
      subtitle="Find your exact age in years, months and days, and count down to your next birthday."
      calculator={<AgeCalculator />}
      intro="An age calculator works out precisely how old someone is from their date of birth to any chosen date. Instead of a rough 'about 30 years', it gives you the exact breakdown (years, months and days) along with the totals that are surprisingly hard to do in your head: how many weeks, days, hours and minutes you've been alive. Use it to fill in forms, check eligibility ages, plan a birthday, or just satisfy your curiosity about how many days old you really are."
      how={{
        heading: "How age is calculated",
        body: (
          <>
            <p>
              Age is the gap between your date of birth and a reference date
              (today, by default). We work it out the way you would by hand:
              subtract the years, then the months, then the days, and
              &quot;borrow&quot; when a subtraction goes negative.
            </p>
            <p>
              If the day of the target date is earlier than the day you were
              born, we borrow days from the previous calendar month and drop the
              month count by one. That matters because months are not all the
              same length: borrowing from February gives 28 days (or 29 in a
              leap year), while borrowing from March gives 31. Doing it this way
              is why the result lines up with how people naturally count age,
              rather than dividing by an &quot;average&quot; month.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              age = years, then months, then days, borrowing where needed
            </p>
            <p>
              The totals (weeks, days, hours, minutes) are counted from the raw
              time difference between the two dates, so leap days and leap years
              are already included, no averaging or rounding tricks. That&apos;s
              why your &quot;total months&quot; and &quot;total days&quot; won&apos;t
              convert neatly into one another: a month can be 28 to 31 days long.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I calculate my exact age?",
          a: "Enter your date of birth and leave the second date set to today. The calculator subtracts the two dates and shows your age as years, months and days, the same way you'd count it by hand, borrowing days from the previous month when needed so the result is exact rather than an average.",
        },
        {
          q: "How many days old am I?",
          a: "The 'Total days' figure is exactly that: the number of full days between your birth date and today, leap days included. The calculator also shows your age in total weeks, hours and minutes if you want an even finer count.",
        },
        {
          q: "Why isn't my age in months just my years multiplied by 12?",
          a: "It is, plus the leftover months. Total months = (years × 12) + months. What doesn't line up neatly is converting months into days, because calendar months range from 28 to 31 days. That's why total days is counted from the actual dates, not by multiplying months by 30.",
        },
        {
          q: "Does the calculator account for leap years?",
          a: "Yes. Because the day, month, week, hour and minute totals are derived from the real number of days between the two dates, every leap day (February 29) you've lived through is automatically counted. Feb 29 birthdays are handled too. In non-leap years the next birthday rolls to March 1.",
        },
        {
          q: "Can I find my age on a past or future date?",
          a: "Yes. Change the 'Age at the date of' field to any date. It's useful for checking how old you were at a past event, or how old you'll be on a future one, for eligibility ages, retirement dates or milestone birthdays.",
        },
        {
          q: "What are the common minimum ages in India?",
          a: "You can vote in India from 18, and 18 is also the minimum for a driving licence for a geared motor vehicle (16 for a gearless two-wheeler within the engine limit set by the rules). The legal marriage age is 21 for men and 18 for women. Most central government jobs set retirement at 60. Set the target date in the calculator to the cut-off date to check whether you qualify.",
        },
        {
          q: "How is age calculated for government job eligibility in India?",
          a: "Recruitment notifications fix a cut-off date, usually 1 January or 1 August of the exam year, and your age is counted in completed years as on that date, not on the exam day. Reserved categories usually get relaxation, commonly 3 years for OBC and 5 years for SC and ST, though this varies by notification. Enter the cut-off date as the second date here, then read your completed years, and always confirm the rule in the official advertisement.",
        },
        {
          q: "What is the difference between completed age and running age?",
          a: "Completed age is the number of full years you have finished, which is what this calculator shows and what most forms and exams ask for. Running age is the year you are currently in, so someone who is 34 years and 5 months has a completed age of 34 but a running age of 35. Life insurers often price on age nearer birthday, which can be higher than completed age, so check which definition a form is asking for.",
        },
      ]}
    />
  );
}
