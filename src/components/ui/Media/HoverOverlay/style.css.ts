import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
});

export const Media = style({
  objectFit: "cover",
  width: "100%",
  height: "100%",
});

export const Overlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  backgroundColor: "var(--hover-bg-color)",
  color: "var(--hover-fg-color)",

  opacity: 0,
  transform: "translateY(20%)",
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
});

globalStyle(`${Container}:hover .${Media}`, {
  opacity: 0.5,
});

globalStyle(`${Container}:hover .${Overlay}`, {
  opacity: 1,
  transform: "translateY(0)",
});
