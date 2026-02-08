import { vars } from "@styles/theme.css";
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
  columnGap: "1rem",
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
});

export const ContentWrapper = style({
  gridColumn: "3 / span 4",
  display: "flex",
  flexDirection: "column",
  gap: "3.25rem",
});

export const ItemContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.875rem",
});

export const ItemTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  lineHeight: "1em",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

export const ItemSub = style({
  fontSize: vars.fontSize.md,
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
});

export const FooterTitle = style({
  gridColumn: "span 3",
});

export const SocialRow = style({
  gridColumn: "4 / span 4",
  display: "flex",
  justifyContent: "space-between",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
});

export const SocialLink = style({
  transition: "opacity .2s ease",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const FooterIconButton = style({
  gridColumn: "8 / span 1",
  position: "relative",
});

export const FooterIcon = style({
  position: "absolute",
  right: "0",
  bottom: "0",
  width: "3.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
