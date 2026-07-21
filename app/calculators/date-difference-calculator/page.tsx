import type { Metadata } from "next";
import DateDifferenceCalculator from "@/components/calc/DateDifferenceCalculator";
import CalcPage from "@/components/calc/CalcPage";

export const metadata: Metadata = {
  title: { absolute: "Date Difference Calculator — Days Between Dates" },
  description:
    "Free date difference calculator. Find days, weeks, months and years between two dates, or add and subtract days from any date. No sign-up.",
  alternates: { canonical: "/calculators/date-difference-calculator" },
  openGraph: { url: "/calculators/date-difference-calculator" },
};

export default function Page() {
  return (
    <CalcPage
      slug="date-difference-calculator"
      title="Date Difference Calculator"
      subtitle="Count the days, weeks, months and years between any two dates — or add and subtract time from a date."
      calculator={<DateDifferenceCalculator />}
      intro="A date difference calculator tells you exactly how much time separates two dates. Whether you're counting down to a deadline, working out someone's age in days, tracking a project timeline, or figuring out a due date, this free tool does the calendar maths for you — leap years, uneven month lengths and all. Switch modes to instead add or subtract days, weeks, months or years from a starting date and see precisely where you land, including the day of the week."
      how={{
        heading: "How the calculation works",
        body: (
          <>
            <p>
              To find the gap between two dates, the calculator counts the whole
              days that have elapsed from the earlier date to the later one. It
              works in a fixed time reference internally so daylight-saving
              changes never add or drop an hour and skew the count.
            </p>
            <p>
              The years / months / days breakdown uses proper calendar
              arithmetic with borrowing: when the end day is earlier in the
              month than the start day, it borrows a full month&apos;s worth of
              days from the previous month — which is why the same number of
              days can be &ldquo;1 month and 2 days&rdquo; in a short month and
              &ldquo;1 month and 4 days&rdquo; in a long one.
            </p>
            <p className="rounded-xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              total days = (later date − earlier date)
            </p>
            <p>
              Weekday and weekend totals are found by walking each elapsed day
              and checking whether it falls on a Saturday or Sunday, giving you a
              quick business-day estimate before public holidays.
            </p>
          </>
        ),
      }}
      faqs={[
        {
          q: "How many days between two dates?",
          a: "Enter your start and end dates and the calculator instantly shows the total number of days between them, along with the equivalent in weeks, months and years. The count is the number of days that have elapsed; if you want to include both the first and last day, add one to the total.",
        },
        {
          q: "How do I count business days (weekdays) between dates?",
          a: "The results panel breaks the span into weekdays (Monday to Friday) and weekend days automatically. The weekday figure is your working-day count — just remember to subtract any public holidays that fall within the range, since those vary by country.",
        },
        {
          q: "Does the calculator handle leap years correctly?",
          a: "Yes. All maths is done on real calendar dates, so 29 February in a leap year is counted like any other day and February's length is handled correctly. Spans that cross one or more 29 Februarys include those extra days automatically.",
        },
        {
          q: "How do I add or subtract days from a date?",
          a: "Switch to the 'Add / subtract from a date' mode, pick a starting date, and enter a number of days, weeks, months or years. Use a minus sign to go backwards in time. The tool returns the resulting date in full, including which day of the week it falls on.",
        },
        {
          q: "What happens if my end date is before my start date?",
          a: "The calculator automatically swaps the two dates so the result stays a positive number of days, and shows a small note letting you know it did. You'll never get a negative or confusing result.",
        },
      ]}
    />
  );
}
