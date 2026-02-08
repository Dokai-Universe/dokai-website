import Link from "next/link";
import LogoSVG from "@assets/dokai.svg";
import { accentColors } from "@styles/palette";
import { vars } from "@styles/theme.css";
import * as Styles from "./Footer.css";

const RandomColors = Object.values(accentColors);

const getRandomColor = () => {
  return RandomColors[Math.floor(Math.random() * RandomColors.length)];
};

const hexToRgb = (hex: string): [number, number, number] => {
  const raw = hex.replace("#", "").trim();

  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;

  if (full.length !== 6) throw new Error(`Invalid hex color: ${hex}`);

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return [r, g, b];
};

// WCAG relative luminance (0~1)
const relativeLuminance = (hex: string): number => {
  const [r8, g8, b8] = hexToRgb(hex);

  const srgb = [r8, g8, b8].map((v) => v / 255);
  const lin = srgb.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );

  const [r, g, b] = lin;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// 배경이 어두우면 흰색 글씨, 밝으면 검정 글씨
export const getReadableTextColor = (bgHex: string) => {
  const L = relativeLuminance(bgHex);
  // 임계치: 0.5는 무난, 조금 더 “흰색을 더 자주” 쓰고 싶으면 0.6~0.7로 올려
  return L < 0.5 ? "#FFFFFF" : "#000000";
};

const Footer = () => {
  const bg = getRandomColor();
  const fg = getReadableTextColor(bg);

  return (
    <footer
      className={Styles.Layout}
      style={
        {
          "--footer-bg": bg,
          "--footer-fg": fg,
        } as React.CSSProperties
      }
    >
      <div className={Styles.Content}>
        <p className={Styles.ContentTitle}>Contact</p>
        <div className={Styles.ContentWrapper}>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>email</p>
            <p className={`${Styles.ItemSub} underline`}>
              dokaiuniverse@gmail.com (KOR/ENG/JPN)
            </p>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>tel</p>
            <p className={Styles.ItemSub}>+82)010-1234-5678</p>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>address</p>
            <p className={`${Styles.ItemSub} ${Styles.ItemSubAddress}`}>
              {
                "13thFL, Nagang Tower , 306 Bongeunsa-\nro, Gangnam-gu, Seoul, ROK"
              }
            </p>
            <div className={Styles.ItemMapContainer}></div>
          </div>
        </div>
      </div>
      <span />
      <div
        style={{
          columnGap: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
        }}
      >
        <p
          style={{
            gridColumn: "span 3",
            fontSize: vars.fontSize.md,
            fontWeight: "300",
            lineHeight: "1.4em",
            letterSpacing: "-0.03em",
          }}
        >
          © 2026 DOKAI. All Rights Reserved.
        </p>
        <nav
          style={{
            gridColumn: "4 / span 4",
            display: "flex",
            justifyContent: "space-between",
            fontSize: vars.fontSize.md,
            fontWeight: "300",
            lineHeight: "1.4em",
            letterSpacing: "-0.03em",
          }}
        >
          <Link href={""}>Vimeo</Link>
          <Link href={""}>Youtube</Link>
          <Link href={""}>Instagram</Link>
          <Link href={""}>Behance</Link>
        </nav>
        <Link
          href="/"
          style={{
            gridColumn: "8 / span 1",
            position: "relative",
          }}
        >
          <LogoSVG
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              width: "3.25rem",
            }}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
