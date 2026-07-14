import Script from "next/script";

// Google Tag Manager. Installed as the site's tag container so future tags
// (AdSense, conversions, remarketing, etc.) can be added from the GTM UI with
// no code changes. GA4 runs directly via components/Analytics.tsx, so the GTM
// container is kept free of a GA4 tag to avoid double-counting pageviews.

export function GtmScript({ id }: { id: string }) {
  if (!id) return null;
  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}

export function GtmNoScript({ id }: { id: string }) {
  if (!id) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
