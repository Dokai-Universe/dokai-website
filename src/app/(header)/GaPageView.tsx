"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!isProd) return;
    if (!GA_ID) return;
    if (!window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: url,
      page_title: document.title,
    });
  }, [pathname, searchParams, GA_ID]);

  return null;
}
