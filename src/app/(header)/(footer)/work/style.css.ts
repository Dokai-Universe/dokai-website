import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "5rem",
  columnGap: "1rem",
  paddingBottom: "6rem",
  marginBottom: "2rem",
  position: "relative",

  "@media": {
    [media.tablet]: {
      rowGap: "4rem",
    },
  },
});

export const CategoryContainer = style({
  gridColumn: "1 / span 4",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / span 5",
    },

    [media.tablet]: {
      gridColumn: "1 / span 6",
    },

    [media.mobile]: {
      gridColumn: "1 / -1",
      flexDirection: "row",
      gap: "2rem",
    },
  },
});

export const CategoryGroup = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "@media": {
    [media.mobile]: {
      flexDirection: "column",
      gap: "1rem",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  },
});

export const Category = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  borderBottomColor: "transparent",
  borderBottomStyle: "solid",
  borderBottomWidth: "1px",
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out",
  lineHeight: "1.25em",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",

  selectors: {
    "&:has(input:checked)": {
      borderBottomColor: "black",
    },
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const CategoryInput = style({
  display: "none",
});

export const WorkItemsContainer = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "1rem",
  rowGap: "4.5rem",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      rowGap: "3rem",
    },
  },
});

export const WorkItem = style({
  position: "relative",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const WorkItemMedia = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  overflow: "hidden",

  fontSize: vars.fontSize.xl,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  textAlign: "left",
  lineHeight: "1.33em",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.lg,
    },
  },
});

export const WorkItemMediaOverlay = style({
  fontSize: vars.fontSize.xl,
  fontWeight: "500",
  letterSpacing: "0.04rem",
  textAlign: "left",
  lineHeight: "1.33em",
  padding: "1rem",
  color: "white",
  paddingRight: "3rem",
});

export const WorkItemText = style({
  fontSize: vars.fontSize.md,
  fontWeight: "400",
  letterSpacing: "0.04rem",
  transition: "opacity 0.2s ease-in-out",
  textAlign: "left",
});

globalStyle(`${WorkItem}:hover ${WorkItemText}`, {
  opacity: 0.5,
});
