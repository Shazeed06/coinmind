import Script from "next/script";

// Google AdSense loader. Renders nothing until a publisher ID
// (ca-pub-XXXXXXXXXXXXXXXX) is set in lib/site.ts (site.adsenseClientId).
// The script is required for AdSense to review the site and, once approved,
// to serve ads. Loaded after the page is interactive so it never blocks content.
export default function AdSense({ clientId }: { clientId: string }) {
  if (!clientId) return null;
  return (
    <Script
      id="adsbygoogle-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
