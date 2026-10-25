"use client";

import { useEffect } from "react";

// Google AdSense loader — loaded eagerly on mount so the AdSense review crawler
// and the ad-serving renderer reliably find adsbygoogle.js on every page. The
// script is async, so it does not block HTML parsing or the LCP of the page's
// own content; the only Core Web Vitals cost is the layout shift from auto-ad
// slots, which is unavoidable if we want ads to serve.
//
// An earlier version deferred this until the first user interaction (or a 3s
// timeout) to squeeze out a better Lighthouse score. That risked the AdSense
// review bot rendering the page before the loader appeared and concluding no
// ads were present. Approval and ad serving take priority; once the account is
// approved this can be revisited (e.g. defer again on non-interacting renders).
//
// AdSense verification itself relies on the <meta name="google-adsense-account">
// tag (rendered in <head> from layout metadata) and public/ads.txt — both
// present in the raw HTML regardless of this loader.
export default function AdSense({ clientId }: { clientId: string }) {
  useEffect(() => {
    if (!clientId) return;
    // Already injected (e.g. client-side nav re-mount). Do nothing.
    if (document.querySelector("script[data-adsense]")) return;

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-adsense", "1");
    document.head.appendChild(s);
  }, [clientId]);

  return null;
}
