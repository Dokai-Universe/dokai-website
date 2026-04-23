import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  zIndex: "100",
});

export const Button = style({
  position: "relative",
  opacity: "0.7",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      inset: 0,
      borderRadius: "999px",
      background: vars.color.fg,
      backdropFilter: "blur(1rem)",
      WebkitBackdropFilter: "blur(10px)",
      zIndex: 0,
      opacity: "0.3",
    },
  },
});

export const ButtonIcon = style({
  position: "relative",
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
  strokeWidth: "2px",
  padding: "0.5rem",
  boxSizing: "content-box",
});

export const ButtonText = style({
  position: "absolute",
  color: "white",
  top: "0",
  right: "100%",
  padding: "0.25rem 0.5rem",
  marginRight: "0.5rem",
  fontSize: vars.fontSize.sm,
  width: "auto",
  overflow: "hidden",
  opacity: "0",
  maxWidth: "0",
  transition: "max-width 0.2s ease-in-out, opacity 0.2s ease-in-out",
  whiteSpace: "nowrap",

  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      inset: 0,
      borderRadius: "0.5rem",
      background: vars.color.fg,
      backdropFilter: "blur(1rem)",
      WebkitBackdropFilter: "blur(10px)",
      zIndex: 0,
      opacity: "0.1",
    },
  },
});

globalStyle(`.${Button}:hover .${ButtonText}`, {
  maxWidth: "10rem",
  opacity: "1",
});
