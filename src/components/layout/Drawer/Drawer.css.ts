import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "var(--drawer-bg)",
  color: "black",
  transform: "translateY(100%)",
  opacity: 0,
  pointerEvents: "none",
  transition: "transform 400ms ease, opacity 500ms ease",
  willChange: "transform",

  selectors: {
    '&[data-open="true"]': {
      transform: "translateY(0%)",
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});

export const SectionGrid = style({
  padding: "2rem",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
});

export const MenuColumn = style({
  gridColumn: "5 / span 4",
  marginTop: "4rem",

  fontSize: vars.fontSize.xxl,
  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  overflow: "hidden",
});

export const MenuLink = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  transform: `translateX(calc(-1 * (${vars.fontSize.xxl} + 1rem)))`,
  transition: "opacity .3s ease, transform .2s ease",

  selectors: {
    "&:hover": {
      opacity: 0.5,
      transform: `translateX(0)`,
    },
  },
});

export const MenuArrow = style({
  width: vars.fontSize.xxl,
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "black",
});

export const FooterText = style({
  gridColumn: "span 3",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
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
