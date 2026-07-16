// Google AdSense loader. Renders nothing until a publisher ID
// (ca-pub-XXXXXXXXXXXXXXXX) is set in lib/site.ts (site.adsenseClientId).
//
// We render a PLAIN <script> (not next/script) so the tag is server-rendered
// directly into the initial HTML <head>. AdSense's verification crawler and
// the "AdSense code" site check look for the script in the raw HTML — a
// client-injected (afterInteractive) script isn't visible to it. React 19
// hoists this async script to <head> and de-dupes it by src.
export default function AdSense({ clientId }: { clientId: string }) {
  if (!clientId) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
