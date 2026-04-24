export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";
import "@styles/global.css";
import { lightThemeClass } from "@styles/theme.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import ModalStackRoot from "@components/modals/ModalStackRoot";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
  title: {
    default: "DOKAI",
    template: "%s | DOKAI",
  },
  description: "Image Beyond AI. Create with Humanity",
  icons: {
    icon: "/dokai.svg",
  },
  openGraph: {
    title: "DOKAI",
    description: "Image Beyond AI. Create with Humanity",
    locale: "ko_KR",
    type: "website",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lightThemeClass}>
      <body className={`${dmSans.variable} ${sourceSans3.variable}`}>
        <NextTopLoader
          showSpinner={true}
          height={4}
          crawl={true}
          crawlSpeed={200}
          easing="ease"
          speed={200}
          color="#ed8435"
        />
        <Providers>
          <Suspense fallback={null}>
            <ModalStackRoot />
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
