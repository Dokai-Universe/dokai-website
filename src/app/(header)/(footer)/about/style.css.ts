import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "3rem",
  columnGap: "1rem",
  padding: "2rem",
  marginBottom: "10rem",
});

export const ContentContainer = style({
  gridColumn: "3 / span 6",
  whiteSpace: "pre-line",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "2rem",
  columnGap: "1rem",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentTitle = style({
  gridColumn: "1 / span 2",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentText = style({
  gridColumn: "3 / -1",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

// Intro

export const IntroContainer = style({
  gridColumn: "3 / span 4",
  whiteSpace: "pre-line",

  fontSize: vars.fontSize.md,
  marginBottom: "6rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "3 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -2",
    },
  },
});

// Services

export const ServicesQuadrant = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",

  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  lineHeight: "1.54",
  letterSpacing: "-0.03em",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const ServicesQuadrantItem = style({
  gridColumn: "span 1",
  display: "grid",
  gridTemplateColumns: "2fr 5fr",
  rowGap: "2rem",
  columnGap: "1rem",
  padding: "1rem",
  alignItems: "center",
  fontSize: vars.fontSize.sm,

  selectors: {
    "&:nth-child(odd)": {
      borderRight: `1px solid ${vars.color.fg}`,
    },
    "&:nth-child(1), &:nth-child(2)": {
      borderBottom: `1px solid ${vars.color.fg}`,
    },
  },

  "@media": {
    [media.mobile]: {
      border: "none !important",

      selectors: {
        "&:not(:first-child)": {
          borderTop: `1px solid ${vars.color.fg} !important`,
        },
      },
    },
  },
});

export const ServicesQuadrantTitle = style({
  fontWeight: "400",
  textAlign: "center",
});

export const ServicesQuadrantList = style({
  listStyle: "none",
  padding: "0",
  margin: "0",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
  },
});

// Workflow

export const WorkflowToolIconContainer = style({
  gridColumn: "1 / span 2",
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      display: "flex",
      alignItems: "center",
      height: "4rem",
    },
  },
});

export const WorkflowToolIcon = style({
  objectFit: "contain",
});

export const WorkflowToolTextContainer = style({
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  gap: "0.5rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      alignItems: "center",
      textAlign: "center",
    },
  },
});

export const WorkflowToolTitle = style({
  lineHeight: "1.25",
  fontWeight: "500",
});

export const WorkflowToolText = style({
  lineHeight: "1.33",
  fontWeight: "300",
});

// Team

export const TeamContainer = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: "2rem",
  fontSize: vars.fontSize.sm,
  lineHeight: "1.83",
  letterSpacing: "-0.03em",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.xs,
    },
  },
});

export const TeamRole = style({
  fontWeight: "500",
  paddingRight: "2rem",
  borderRight: `1px solid ${vars.color.fg}`,
});

export const TeamNames = style({
  fontWeight: "300",
  display: "flex",
  columnGap: "1rem",
  rowGap: "0",
  flexWrap: "wrap",
});

// Image

export const ImageRight = style({
  gridColumn: "3 / -1",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ImageLeft = style({
  gridColumn: "1 / span 6",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});
