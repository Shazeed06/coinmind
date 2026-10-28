"use client";

import { usePathname } from "next/navigation";

// Hides site chrome (header, footer, cookie banner, ads) on the embeddable
// widget routes under /widgets/<slug>, which are meant to render bare inside a
// third-party iframe. The /widgets index page itself keeps the full chrome.
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/widgets/")) return null;
  return <>{children}</>;
}
