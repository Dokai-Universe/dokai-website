import Header from "@components/layout/Header/Header";
import Script from "next/script";
import { Suspense } from "react";
import GaPageView from "./GaPageView";

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
          <Suspense fallback={null}>
            <GaPageView />
          </Suspense>
        </>
      )}
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </>
  );
};

export default HeaderLayout;
