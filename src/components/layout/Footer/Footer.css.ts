import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Layout = style({
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "80dvh",
  background: "var(--footer-bg)",
  color: "var(--footer-fg)",
  gap: "2rem",

  selectors: {
    "&::before": {
      content: '""',
    },
  },
});

export const Content = style({
  columnGap: "2rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
});

export const ContentTitle = style({
  gridColumn: "span 2",
  fontSize: vars.fontSize.xl,
  fontWeight: "500",
  lineHeight: "1em",
  letterSpacing: "0em",
  textTransform: "uppercase",

  "@media": {
    [media.desktop]: {
      gridColumn: "2 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentWrapper = style({
  gridColumn: "3 / span 4",
  display: "flex",
  flexDirection: "column",
  gap: "3.25rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "2 / -2",
      marginTop: "2rem",
      gap: "2.25rem",
    },
    [media.tablet]: {
      gridColumn: "1 / -2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ItemContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.875rem",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const ItemTitle = style({
  fontWeight: "500",
  lineHeight: "1em",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

export const ItemSub = style({
  fontWeight: "300",
  lineHeight: "1.166667em",
  whiteSpace: "pre-line",
  transition: "opacity .2s ease",

  selectors: {
    "&.email": {
      textDecoration: "underline",
    },
    "&.address": {
      letterSpacing: "0.04em",
    },

    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const ItemSubAddress = style({
  letterSpacing: "0.04em",
});

export const ItemMapContainer = style({
  marginTop: "1rem",
  width: "100%",
  aspectRatio: "8 / 3",
  background: "gray",

  "@media": {
    [media.tablet]: {
      aspectRatio: "9 / 4",
    },
    [media.mobile]: {
      aspectRatio: "2 / 1",
    },
  },
});

export const Footer = style({
  position: "relative",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
  alignItems: "flex-end",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const FooterTitle = style({
  gridColumn: "span 3",
  textIndent: "-1.5rem",
  marginLeft: "1.5rem",

  "@media": {
    [media.tablet]: {
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
      gridColumn: "1 / span 6",
    },
    [media.mobile]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.5rem",
      marginTop: "1rem",
      marginLeft: "1.5rem",
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

  "@media": {
    [media.tablet]: {
      gridColumn: "7 / -1",
    },
  },
});

export const FooterIcon = style({
  width: "3.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
