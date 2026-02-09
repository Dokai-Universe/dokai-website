import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
});

export const Image = style({
  objectFit: "cover",
});

export const Overlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  backgroundColor: "var(--hover-bg-color)",
  color: "var(--hover-fg-color)",

  display: "flex",
  padding: "2rem",

  opacity: 0,
  transform: "translateY(-50%)",
  transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",

  paddingRight: "6rem",

  "@media": {
    [media.tablet]: {
      padding: "1.5rem",
      paddingRight: "3rem",
    },
  },
});

globalStyle(`${Container}:hover image`, {
  opacity: 0.5,
});

globalStyle(`${Container}:hover .${Overlay}`, {
  opacity: 1,
  transform: "translateY(0)",
});
