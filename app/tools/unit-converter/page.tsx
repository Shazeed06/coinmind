import type { Metadata } from "next";
import UnitConverter from "@/components/tools/UnitConverter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Unit Converter - Length, Weight, Temperature" },
  description:
    "Free online unit converter for length, weight, temperature, area, volume, speed, time and digital storage. Instant, accurate and 100% private in your browser.",
  alternates: { canonical: "/tools/unit-converter" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "https://www.coinmind.in/tools/unit-converter",
    title: "Unit Converter - Length, Weight, Temperature",
    description:
      "Convert length, weight, temperature, area, volume, speed, time and data units instantly - free and private in your browser.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Unit Converter tool",
      },
    ],
  },
};

const faqs = [
  {
    q: "Is this unit converter free and private?",
    a: "Yes. It is completely free with no sign-up requirement, and every calculation runs inside your browser using plain JavaScript. Nothing you type is uploaded, tracked, or stored on any server. The tool also works offline once the page has finished loading, since all conversion logic is client-side and requires no network calls.",
  },
  {
    q: "How do you convert Celsius to Fahrenheit?",
    a: "Multiply the Celsius value by 9/5 (which is 1.8) and add 32. So 20°C becomes 20 × 1.8 + 32 = 68°F. To go the other direction, subtract 32 first, then divide by 1.8. The temperature tab in this converter applies the exact formula automatically, and it also handles Kelvin conversions using the K = °C + 273.15 relationship.",
  },
  {
    q: "Is a US gallon the same as a UK gallon?",
    a: "No. They are different sizes, which is a common source of confusion. A US liquid gallon equals approximately 3.785 litres, while a UK imperial gallon equals about 4.546 litres, making the UK gallon roughly 20% larger. The volume tab in this converter includes both US and UK gallons as separate options so you can select the correct one for your context.",
  },
  {
    q: "Does 1 KB equal 1000 or 1024 bytes?",
    a: "This converter uses the binary (1024-based) definition, where 1 KB = 1024 bytes, 1 MB = 1024 KB and so on. That matches how operating systems such as Windows and Linux report file and drive sizes. Storage manufacturers typically use the decimal (1000-based) definition instead, which is why a drive labelled 1 TB on the box shows roughly 931 GB when you plug it into a computer. Both numbers describe the same amount of storage, just using different units.",
  },
  {
    q: "How many feet are in a metre?",
    a: "One metre equals approximately 3.28084 feet, and one foot is defined as exactly 0.3048 metres by international agreement. For a quick mental estimate you can multiply metres by 3.28 or divide feet by 3.28. The length tab in this converter uses the exact international definition, so results are precise rather than approximate.",
  },
  {
    q: "Why does the converter use a base-unit system?",
    a: "For most categories except temperature, the converter stores each unit as a scaling factor relative to a single base unit: the metre for length, the kilogram for weight, the litre for volume, and so on. A conversion from any unit to any other is then a single multiplication and division: value × from-factor ÷ to-factor. This approach avoids chaining multiple conversions together, which would accumulate rounding errors, and keeps every result accurate to the limits of JavaScript's floating-point arithmetic.",
  },
  {
    q: "What categories does the converter support?",
    a: "Eight categories are available: length (metres, feet, inches, kilometres, miles, centimetres, millimetres, yards), weight (kilograms, pounds, grams, ounces, tonnes), temperature (Celsius, Fahrenheit, Kelvin), area (square metres, square feet, acres, hectares), volume (litres, US gallons, UK gallons, millilitres, cubic metres), speed (km/h, mph, m/s, knots), time (seconds, minutes, hours, days, weeks, years), and digital storage (bytes, KB, MB, GB, TB). Each category includes the most commonly used units for that measurement type.",
  },
  {
    q: "Can I convert currencies with this tool?",
    a: "No. Currency is deliberately left out because exchange rates change by the minute and would need a live data feed, which would break the promise that everything runs on your device with no network calls. The eight categories here all use fixed, internationally defined conversion factors, so an answer is just as correct a year from now.",
  },
  {
    q: "Does it work offline and on a phone?",
    a: "Yes to both. Every conversion factor and formula ships with the page, so once it has loaded there are no further network requests and the converter keeps working with no signal, which is handy when travelling. The category tabs, dropdowns and swap button are all sized for touch, so it behaves the same on a phone as on a desktop.",
  },
];

export default function Page() {
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
        name: "Unit Converter",
        item: `${site.url}/tools/unit-converter`,
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
        title="Unit Converter"
        description="Convert measurements across eight categories (length, weight, temperature, area, volume, speed, time, and digital storage) with instant, accurate results. Pick your starting unit and target unit, type a value, and see the answer update live as you type. Every conversion runs locally in your browser with exact factors and formulas, never rounded until display."
        howToUse={[
          {
            step: "Pick a measurement category",
            detail: "Use the category tabs at the top of the converter to choose the type of measurement you need: length, weight, temperature, area, volume, speed, time, or digital storage. Each category loads its own set of relevant units, so you only see the options that make sense for what you are converting. Switching categories resets the unit dropdowns to sensible defaults for that measurement type.",
          },
          {
            step: "Select your 'from' and 'to' units",
            detail: "Choose the unit you are converting from in the first dropdown and the unit you want the answer in from the second. The converter supports common metric and imperial units within each category. For example, in the length tab you can go from metres to feet, kilometres to miles, or inches to centimetres. Any pair within the category works in both directions.",
          },
          {
            step: "Type or paste your value",
            detail: "Enter the number you want to convert in the input field. The converted result appears live as you type. There is no submit button to press. Decimals are supported, and the converter handles both integer and fractional inputs. The input field also shows a quick reference line like \"1 metre = 3.28084 feet\" so you can sanity-check the scale of the result before relying on it.",
          },
          {
            step: "Read the converted result",
            detail: "The result displays below the input in a clean, highlighted format with the target-unit abbreviation. Underneath, a second readout shows the reverse conversion, how many of the target unit equal one of the source unit, which is useful when you need to think in both directions. Clear the input and the result area shows a dash, never an error or a misleading \"0.\"",
          },
          {
            step: "Swap units or change categories as needed",
            detail: "Click the swap button between the two unit dropdowns to reverse the direction of your conversion instantly. This is handy when you realise you need the opposite of what you first selected. Switch to a different category tab at any time to start a new conversion; the previous result stays visible until you type a new value, so you can refer back to it while working through a multi-step calculation.",
          },
        ]}
        whenToUse={[
          {
            scenario: "You are cooking or baking with a recipe from another country",
            detail: "Recipes written in cups, fluid ounces, and Fahrenheit need to be converted to millilitres, grams, and Celsius, or vice versa. A single wrong conversion can ruin a dish, especially in baking where precision matters. Use the volume and weight tabs for ingredient quantities and the temperature tab for oven settings to follow any international recipe accurately.",
          },
          {
            scenario: "You are travelling or moving between countries",
            detail: "When you are comparing apartment sizes in square feet versus square metres, checking whether a 70 mph speed limit is fast or slow in km/h, or trying to understand a weather forecast given in a temperature scale you are not used to, a unit converter bridges the gap instantly. Keep the page bookmarked on your phone for quick checks while abroad or during travel planning.",
          },
          {
            scenario: "You are working on a DIY, engineering, or academic project",
            detail: "Whether you are buying lumber measured in feet for a project planned in metres, converting laboratory measurements between metric and imperial, or calculating data transfer sizes for a technical specification, precise unit conversion matters. This tool uses internationally defined conversion factors, such as 1 inch = exactly 0.0254 metres, so your answers are standards-accurate rather than based on rough rules of thumb.",
          },
        ]}
        howItWorks="This converter stores every unit as a scaling factor relative to a single base unit within each category. For length, the base is the metre; for weight, the kilogram; for volume, the litre. A conversion from any unit to any other is a straightforward operation: multiply the input value by the source unit's factor to reach the base unit, then divide by the target unit's factor. Temperature is the exception. Because Celsius, Fahrenheit, and Kelvin have different zero points, simple ratios do not work. The temperature tab uses the exact linear conversion formulas instead (°F = °C × 9/5 + 32, K = °C + 273.15). All arithmetic runs in JavaScript inside your browser, so there is zero network latency and your numbers stay private."
        tips={[
          "Use the reference line to verify the scale of your result. The converter shows \"1 unit A = X unit B\" below the input field, which lets you quickly check that the conversion factor looks right before you rely on the calculated number. If the reference line seems off, you may have selected the wrong unit in either dropdown.",
          "For temperature, remember that the scales do not share a common zero point. A common mistake is multiplying or dividing temperature values as though they were lengths or weights. This tool applies the correct formula automatically, but if you are doing mental arithmetic, always apply the full formula (add or subtract the offset, then multiply) rather than treating degrees as interchangeable ratios.",
          "For digital storage, note the difference between binary (1024-based) and decimal (1000-based) units. This converter uses binary definitions matching how operating systems report sizes. If you are comparing against a storage device's labelled capacity, expect a discrepancy because manufacturers use decimal units. The converter is giving you the OS-reported size, not the marketing number.",
          "Bookmark the specific conversion you use most often. The URL does not change as you switch categories, but keeping the page in your browser bookmarks or phone home screen gives you one-tap access whenever you need a quick conversion, without searching or downloading an app.",
          "If you clear the input completely, the result area shows a dash rather than a zero. This is intentional. It prevents confusion between \"the answer is zero\" and \"no value has been entered yet.\" The converter only produces a result when you have typed a valid number.",
        ]}
        faqs={faqs}
        relatedTools={[
          { label: "Budget Planner", href: "/tools/budget-planner" },
          { label: "QR Code Generator", href: "/tools/qr-code-generator" },
          { label: "Password Generator", href: "/tools/password-generator" },
          { label: "Invoice Generator", href: "/tools/invoice-generator" },
        ]}
        disclaimerType="general"
      >
        <UnitConverter />
      </ToolPageLayout>
    </>
  );
}
