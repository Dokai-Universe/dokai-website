import { media, vars } from "@styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const Layout = style({
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  width: "100%",
  alignItems: "start",
  position: "relative",
});

// Logo

export const LogoContainer = style({
  position: "relative",
  gridColumn: "1 / span 2",
});

export const LogoImage = style({
  position: "relative",
  zIndex: "103",
  width: "6rem",
  height: "auto",
  aspectRatio: "1 / 1",

  "@media": {
    [media.tablet]: {
      width: "4rem",
    },
    [media.mobile]: {
      width: "3rem",
    },
  },
});

// Nav

export const NavContainer = style({
  gridColumn: "6 / -1",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1.75rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "5 / -1",
      // justifyContent: "space-between",
      // gap: "0",
    },
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      justifyContent: "flex-end",
    },
  },
});

export const NavLabel = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  transition: "opacity .2s ease-in-out",
  boxSizing: "content-box",

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

export const NavIcon = style({
  position: "relative",
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",

  stroke: vars.color.fg,
});

export const NavSearchButton = style({
  transition: "opacity .2s ease-in-out",

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

export const pop = keyframes({
  "0%": { transform: "scale(1)" },
  "33%": { transform: "scale(1.33)" },
  "100%": { transform: "scale(1)" },
});

export const NavDrawerButton = style({
  position: "relative",
  zIndex: "102",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transformOrigin: "center",
  transition: "opacity .2s ease-in-out, transform .2s ease-in-out",

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
      animation: `${pop} .2s ease-out`,
    },
  },

  "@media": {
    [media.mobile]: {
      margin: "0.5rem",
    },
  },
});

export const NavDrawerButtonDeco = style({
  position: "absolute",
  width: "100%",
  aspectRatio: "1 / 1",
  transform: "scale(2)",
});
