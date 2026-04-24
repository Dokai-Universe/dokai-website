import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "10rem",
  paddingTop: "0 !important",

  "@media": {
    [media.mobile]: {
      rowGap: "4rem",
    },
  },
});

export const Content = recipe({
  base: {
    position: "relative",
    gridColumnEnd: "span 6",

    "@media": {
      [media.tablet]: {
        gridColumn: "1 / -1",
      },
    },
  },
  variants: {
    align: {
      LEFT: { gridColumnStart: "1" },
      RIGHT: { gridColumnStart: "3" },
    },
  },
  defaultVariants: {
    align: "RIGHT",
  },
});

// Team

export const TeamContainer = style({
  position: "relative",
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: "1.5rem",
  fontSize: vars.fontSize.sm,
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
  marginTop: "1rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.xs,
    },
  },
});

export const TeamRole = style({
  fontWeight: "500",
  paddingRight: "1.5rem",
  paddingBottom: "0.5rem",
  borderRight: `1px solid ${vars.color.fg}`,
});

export const TeamNames = style({
  fontWeight: "300",
  paddingBottom: "0.5rem",
  display: "flex",
  columnGap: "1rem",
  rowGap: "0",
  flexWrap: "wrap",
});

//

export const EditButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const EditContainer = style({
  position: "relative",
  gridColumn: "3 / -1",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const RemoveButton = style({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid black",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const RemoveButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const AddButton = style({
  gridColumn: "1 / -1",
  padding: "1rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid black",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  justifySelf: "center",
});
