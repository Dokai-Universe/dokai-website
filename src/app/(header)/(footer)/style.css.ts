import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "auto 1fr auto",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "10rem",
  marginTop: "-10rem",
  flexGrow: "1",

  "@media": {
    [media.desktop]: {
      marginTop: "0",
      marginBottom: "6rem",
    },
    [media.tablet]: {
      rowGap: "4rem",
      marginBottom: "4rem",
    },
  },
});

export const Title = style({
  gridColumn: "2 / span 4",
  fontSize: vars.fontSize.lg,
  fontWeight: "300",
  lineHeight: "1.33",

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

export const WorksContainer = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "auto",

  "@media": {
    [media.tablet]: {
      rowGap: "4rem",
    },
  },
});

export const ItemContainer = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    cursor: "pointer",
    height: "fit-content",
    transition: "opacity 0.2s ease-in-out",

    selectors: {
      "&:hover": { opacity: 0.5 },
    },

    "@media": {
      [media.tablet]: {
        gridColumn: "span 4",
        gap: "0.5rem",
      },
      [media.mobile]: {
        gridColumn: "1 / -1",
      },
    },
  },

  variants: {
    row: {
      odd: {},
      even: {},
    },
    width: {
      narrow: {},
      wide: {},
    },
  },

  compoundVariants: [
    {
      variants: { row: "odd", width: "narrow" },
      style: { gridColumn: "1 / span 3" },
    },
    {
      variants: { row: "odd", width: "wide" },
      style: { gridColumn: "1 / span 5" },
    },
    {
      variants: { row: "even", width: "narrow" },
      style: { gridColumn: "6 / span 3" },
    },
    {
      variants: { row: "even", width: "wide" },
      style: { gridColumn: "4 / span 5" },
    },
  ],
});

export const ItemMedia = style({
  width: "100%",
  aspectRatio: "16 / 9",
});

export const PrivateIcon = style({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  width: "2rem",
  height: "2rem",
  zIndex: 1,
  background: "rgba(255, 255, 255, 0.75)",
  padding: "0.25rem",
  borderRadius: "0.25rem",
});

export const ItemTextContainer = recipe({
  base: {
    display: "grid",
    gap: "1rem",
    fontSize: vars.fontSize.md,
    lineHeight: "1.33",
    fontWeight: "300",
    textAlign: "left",

    "@media": {
      [media.tablet]: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      },
    },
  },
  variants: {
    width: {
      wide: { gridTemplateColumns: "repeat(1, 1fr)" },
      narrow: { gridTemplateColumns: "repeat(2, 1fr)" },
    },
  },
});

export const ItemTextContent = style({
  gridColumn: "2 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
      gap: "0rem",
    },
  },
});

export const ItemTextSummary = style({
  color: vars.color.border,
});
