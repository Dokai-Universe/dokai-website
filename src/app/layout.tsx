import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@styles/global.css";
import { themeClass } from "@styles/theme.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOKAI",
  description: "Image Beyond AI. Create with Humanity",
  icons: {
    icon: "/dokai.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${themeClass}`}>{children}</body>
    </html>
  );
}
