export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://dokaiuniverse.ai",
  ),
  title: {
    default: "DOKAI UNIVERSE",
    template: "%s | DOKAI UNIVERSE",
  },
  description:
    "Image Beyond AI. Create with Humanity\n도카이(DOKAI)는 AI를 매개로 예술적 가치와 시각 문화를 확장하는 크리에이티브 스튜디오입니다.",
  icons: {
    icon: "/dokai.svg",
  },
  openGraph: {
    title: "DOKAI UNIVERSE",
    description:
      "Image Beyond AI. Create with Humanity\n도카이(DOKAI)는 AI를 매개로 예술적 가치와 시각 문화를 확장하는 크리에이티브 스튜디오입니다.",
    url: "https://dokaiuniverse.ai",
    siteName: "DOKAI UNIVERSE",
    type: "website",
    locale: "ko_KR",
    images: "/dokai-og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOKAI UNIVERSE",
    description:
      "Image Beyond AI. Create with Humanity\n도카이(DOKAI)는 AI를 매개로 예술적 가치와 시각 문화를 확장하는 크리에이티브 스튜디오입니다.",
    images: "/dokai-og-image.png",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DOKAI UNIVERSE",
    alternateName: [
      "도카이",
      "도카이 유니버스",
      "DOKAI",
      "DOKAI Universe",
      "DOKAI UNIVERSE",
    ],
    url: "https://dokaiuniverse.ai",
    logo: "https://dokaiuniverse.ai/dokai.svg",
    description:
      "Image Beyond AI. Create with Humanity\n도카이(DOKAI)는 AI를 매개로 예술적 가치와 시각 문화를 확장하는 크리에이티브 스튜디오입니다.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DOKAI UNIVERSE",
    alternateName: [
      "도카이",
      "도카이 유니버스",
      "DOKAI",
      "DOKAI Universe",
      "DOKAI UNIVERSE",
    ],
    url: "https://dokaiuniverse.ai",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lightThemeClass}>
      <body className={`${dmSans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
