import { accentColors } from "@styles/palette";

const RandomColors = Object.values(accentColors);

// Random Color(bg)
export const getRandomColor = () => {
  return RandomColors[Math.floor(Math.random() * RandomColors.length)];
};

// Text Color(fg) from bg
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
  return L < 0.5 ? "white" : "black";
};
