import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css"; // (테마 쓰는 경우)

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  fontSize: "1.111111vw",
});

globalStyle("body", {
  fontFamily:
    'var(--font-dm-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  textRendering: "optimizeLegibility",
  background: vars.color.bg, // theme vars 사용 가능
  color: vars.color.text,
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("p", {
  margin: "0",
});

globalStyle(".underline", {
  textDecoration: "underline",
});
