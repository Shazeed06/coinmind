import Script from "next/script";

// Google Analytics 4. Renders nothing until a measurement ID (G-XXXXXXXXXX)
// is set in lib/site.ts (site.gaId).
//
// strategy="lazyOnload": gtag loads during browser idle time AFTER the page has
// fully loaded, so it stays off the critical path (better FCP/LCP/TBT) while
// still firing on EVERY visit — traffic counting stays accurate (unlike the
// interaction-gated ad loader, GA must not miss bounce pageviews).
export default function Analytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
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
