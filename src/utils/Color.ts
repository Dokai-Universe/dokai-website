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

const relativeLuminance = (hex: string): number => {
  const [r8, g8, b8] = hexToRgb(hex);

  const srgb = [r8, g8, b8].map((v) => v / 255);
  const lin = srgb.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );

  const [r, g, b] = lin;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getReadableTextColor = (bgHex: string) => {
  const L = relativeLuminance(bgHex);

  return L < 0.5 ? "white" : "black";
};

// Random Light Color(bg)
const RandomLightColors = RandomColors.filter(
  (e) => getReadableTextColor(e) === "black",
);

export const getRandomLightColor = () => {
  return RandomLightColors[
    Math.floor(Math.random() * RandomLightColors.length)
  ];
};
