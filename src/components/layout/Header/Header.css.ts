import { vars } from "@styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const Layout = style({
  position: "absolute",
  padding: "2rem",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  width: "100%",
  alignItems: "start",
});

export const LogoContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
  position: "relative",
  zIndex: "2",
});

export const LogoImage = style({
  width: "60%",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const Clickable = style({
  transition: "opacity .2s ease-in-out",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const NavContainer = style({
  gridColumn: "7 / span 2",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const NavLabel = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83em",
  letterSpacing: "-0.03em",
});

export const NavIcon = style({
  position: "relative",
  height: "1.6875rem",
  width: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
  boxSizing: "content-box",
  padding: "0 0.8125rem",
});

export const MenuButton = style({
  height: "3.375rem",
  width: "auto",
  aspectRatio: "1 / 1",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "2",
  border: "none",
  background: "transparent",
  margin: "0",
  padding: "0",

  selectors: {
    '&[data-floating="true"]': {
      position: "fixed",
      margin: "2rem 3rem",
      top: "0",
      right: "0",
    },
  },
});

export const pop = keyframes({
  "0%": { transform: "scale(1)" },
  "33%": { transform: "scale(1.33)" },
  "100%": { transform: "scale(1)" },
});

export const MenuDeco = style({
  position: "absolute",
  width: "100%",
  height: "100%",

  selectors: {
    '&[data-floating="true"]': {
      animation: `${pop} .2s ease-out`,
    },
  },
});
