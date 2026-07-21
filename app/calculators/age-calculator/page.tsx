import type { Metadata } from "next";
import AgeCalculator from "@/components/calc/AgeCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Age Calculator — Exact Age in Years, Months & Days" },
  description:
    "Free age calculator. Find your exact age in years, months and days — plus total weeks, days, hours and your next birthday countdown. No sign-up.",
  alternates: { canonical: "/calculators/age-calculator" },
  openGraph: { url: "/calculators/age-calculator" },
};

export default function Page() {
  return (
    <CalcPage
      slug="age-calculator"
      title="Age Calculator"
      subtitle="Find your exact age in years, months and days — and count down to your next birthday."
      calculator={<AgeCalculator />}
      intro="An age calculator works out precisely how old someone is from their date of birth to any chosen date. Instead of a rough 'about 30 years', it gives you the exact breakdown — years, months and days — along with the totals that are surprisingly hard to do in your head: how many weeks, days, hours and minutes you've been alive. Use it to fill in forms, check eligibility ages, plan a birthday, or just satisfy your curiosity about how many days old you really are."
      how={{
        heading: "How age is calculated",
        body: (
          <>
            <p>
              Age is the gap between your date of birth and a reference date
              (today, by default). We work it out the way you would by hand:
              subtract the years, then the months, then the days — and
              &quot;borrow&quot; when a subtraction goes negative.
            </p>
            <p>
              If the day of the target date is earlier than the day you were
              born, we borrow days from the previous calendar month and drop the
              month count by one. That matters because months are not all the
              same length — borrowing from February gives 28 days (or 29 in a
              leap year), while borrowing from March gives 31. Doing it this way
              is why the result lines up with how people naturally count age,
              rather than dividing by an &quot;average&quot; month.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              age = years, then months, then days — borrowing where needed
            </p>
            <p>
              The totals (weeks, days, hours, minutes) are counted from the raw
              time difference between the two dates, so leap days and leap years
              are already included — no averaging or rounding tricks. That&apos;s
              why your &quot;total months&quot; and &quot;total days&quot; won&apos;t
              convert neatly into one another: a month can be 28 to 31 days long.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How do I calculate my exact age?",
          a: "Enter your date of birth and leave the second date set to today. The calculator subtracts the two dates and shows your age as years, months and days — the same way you'd count it by hand, borrowing days from the previous month when needed so the result is exact rather than an average.",
        },
        {
          q: "How many days old am I?",
          a: "The 'Total days' figure is exactly that — the number of full days between your birth date and today, leap days included. The calculator also shows your age in total weeks, hours and minutes if you want an even finer count.",
        },
        {
          q: "Why isn't my age in months just my years multiplied by 12?",
          a: "It is — plus the leftover months. Total months = (years × 12) + months. What doesn't line up neatly is converting months into days, because calendar months range from 28 to 31 days. That's why total days is counted from the actual dates, not by multiplying months by 30.",
        },
        {
          q: "Does the calculator account for leap years?",
          a: "Yes. Because the day, month, week, hour and minute totals are derived from the real number of days between the two dates, every leap day (February 29) you've lived through is automatically counted. Feb 29 birthdays are handled too — in non-leap years the next birthday rolls to March 1.",
        },
        {
          q: "Can I find my age on a past or future date?",
          a: "Yes. Change the 'Age at the date of' field to any date. It's useful for checking how old you were at a past event, or how old you'll be on a future one — for eligibility ages, retirement dates or milestone birthdays.",
        },
      ]}
    />
  );
}
