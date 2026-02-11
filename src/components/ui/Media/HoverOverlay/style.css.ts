import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
});

export const Media = style({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  transition: "opacity 0.2s ease-in-out",
});

export const Overlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  userSelect: "none",
});

export const OverlayBackground = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  backgroundColor: "var(--hover-bg-color)",
  color: "var(--hover-fg-color)",

  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
});

export const OverlayContent = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: "0",
  transform: "translateY(-2rem)",
  transition: "transform 0.3s ease, opacity 0.3s ease",
});

globalStyle(`${Container}:hover .${Media}`, {
  opacity: 0.5,
});

globalStyle(`${Container}:hover .${OverlayBackground}`, {
  opacity: 1,
});

globalStyle(`${Container}:hover .${OverlayContent}`, {
  transform: "translateY(0)",
  opacity: "1",
});
