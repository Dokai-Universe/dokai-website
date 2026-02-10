import { media, vars } from "@styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const Layout = style({
  position: "absolute",
  padding: "2rem",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  width: "100%",
  alignItems: "start",

  "@media": {
    [media.desktop]: {
      position: "static",
    },
  },
});

export const LogoContainer = style({
  position: "relative",
  zIndex: "103",
  display: "flex",
  width: "7.5rem",
  height: "auto",
  aspectRatio: "1 / 1",

  "@media": {
    [media.tablet]: {
      width: "6rem",
    },
    [media.mobile]: {
      width: "4rem",
    },
  },
});

export const LogoImage = style({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
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

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const NavContainer = style({
  gridColumn: "7 / -1",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media": {
    [media.desktop]: {
      gridColumn: "6 / -1",
    },
    [media.tablet]: {
      gridColumn: "5 / -1",
    },
    [media.mobile]: {
      gridColumn: "8 / -1",
      justifyContent: "flex-end",
    },
  },
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
  border: "none",
  background: "transparent",
  margin: "0",
  padding: "0",

  transition: "opacity .2s ease-in-out",
  cursor: "pointer",
  zIndex: "102",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },

    '&[data-floating="true"]': {
      position: "fixed",
      margin: "2rem 3rem",
      top: "0",
      right: "0",
      zIndex: "103",
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
