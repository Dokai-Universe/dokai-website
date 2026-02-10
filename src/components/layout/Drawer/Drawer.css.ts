import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 101,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "var(--drawer-bg)",
  color: "black",
  transform: "translateY(75%)",
  opacity: 0,
  pointerEvents: "none",
  transition: "transform 250ms ease, opacity 250ms ease",
  willChange: "transform",
  overflowY: "auto",

  selectors: {
    '&[data-open="true"]': {
      transform: "translateY(0%)",
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});

// Nav

export const NavGrid = style({
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",

  marginTop: "5rem",
  transition: "margin-top 250ms ease",

  "@media": {
    [media.tablet]: {
      marginTop: "8rem",
    },
  },
});

export const NavColumn = style({
  gridColumn: "2 / -1",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  fontSize: vars.fontSize.xxl,
  fontWeight: "300",
  lineHeight: "1.4",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xl,
      fontWeight: "400",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.lg,
      marginLeft: "1rem",
    },
  },
});

export const NavSearchButton = style({
  transition: "opacity .2s ease",
  display: "none",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },

  "@media": {
    [media.mobile]: {
      display: "block",
    },
  },
});

export const NavSearchIcon = style({
  width: "1.25em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "black",
});

export const NavLink = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  transform: `translateX(calc(-1 * (1em + 1rem)))`,
  transition: "opacity .3s ease, transform .2s ease",

  selectors: {
    "&:hover": {
      opacity: 0.5,
      transform: `translateX(0)`,
    },
  },
});

export const NavArrowIcon = style({
  width: "1em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "black",
});

// Footer

export const Footer = style({
  position: "relative",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.33em",
  letterSpacing: "-0.03em",
  alignItems: "flex-end",
  rowGap: "0.775rem",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const FooterTitle = style({
  gridColumn: "span 3",
  textIndent: "-1rem",
  marginLeft: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / span 4",
    },
    [media.mobile]: {
      gridColumn: "1 / span 6",
    },
  },
});

export const SocialRow = style({
  gridColumn: "4 / -2",
  display: "flex",
  justifyContent: "space-between",

  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
  height: "fit-content",
  alignItems: "flex-end",

  "@media": {
    [media.tablet]: {
      gridColumn: "5 / span 2",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.5rem",
    },
    [media.mobile]: {
      gridRow: "1",
      gridColumn: "1 / -1",
      marginLeft: "1rem",
    },
  },
});

export const SocialLink = style({
  transition: "opacity .2s ease",
  height: "fit-content",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const FooterIconButton = style({
  gridColumn: "8",
  position: "relative",
  marginLeft: "auto",
  marginTop: "auto",

  "@media": {
    [media.tablet]: {
      gridColumn: "7 / -1",
    },
    [media.mobile]: {
      gridRow: "1 / span 2",
    },
  },
});

export const FooterIcon = style({
  width: "3.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
