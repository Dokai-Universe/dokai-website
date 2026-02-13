import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@styles/global.css";
import { themeClass } from "@styles/theme.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
    <html lang="en">
      <body className={`${dmSans.variable} ${themeClass}`}>
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
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
