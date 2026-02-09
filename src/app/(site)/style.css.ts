import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "7.5rem",
  columnGap: "1rem",
  padding: "2rem",
  marginBottom: "15rem",
});

export const Title = style({
  gridColumn: "2 / span 4",
  fontSize: vars.fontSize.lg,
  fontWeight: "300",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / span 5",
    },
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
    [media.mobile]: {
      fontSize: vars.fontSize.md,
    },
  },
});

export const ItemContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  cursor: "pointer",
  height: "fit-content",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&[data-first-row='true'][data-is-wide='true']": {
      gridColumn: "1 / span 5",
    },
    "&[data-first-row='true'][data-is-wide='false']": {
      gridColumn: "1 / span 3",
    },
    "&[data-first-row='false'][data-is-wide='true']": {
      gridColumn: "4 / span 5",
    },
    "&[data-first-row='false'][data-is-wide='false']": {
      gridColumn: "6 / span 3",
    },

    "&:hover": {
      opacity: 0.5,
    },
  },

  "@media": {
    [media.tablet]: {
      gridColumn: "span 4 !important",
    },
    [media.mobile]: {
      gridColumn: "1 / -1 !important",
    },
  },
});

export const ItemImageContainer = style({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
});

export const ItemImage = style({
  objectFit: "cover",
});

export const ItemTextContainer = style({
  display: "grid",
  gap: "1rem",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  textAlign: "left",

  selectors: {
    "&[data-is-wide='true']": {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    "&[data-is-wide='false']": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  "@media": {
    [media.tablet]: {
      display: "flex",
      flexDirection: "column",
    },
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const ItemTextContent = style({
  gridColumn: "2 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const ItemTextSummary = style({
  color: vars.color.border,
});
