import Script from "next/script";

// Google Analytics 4. Renders nothing until a measurement ID (G-XXXXXXXXXX)
// is set in lib/site.ts (site.gaId). Loaded after the page is interactive so
// it never blocks content or hurts Core Web Vitals.
export default function Analytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
