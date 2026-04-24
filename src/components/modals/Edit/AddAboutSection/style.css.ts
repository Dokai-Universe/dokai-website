import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "1rem",
  marginTop: "0",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const ItemContainer = style({
  border: "1px solid #eee",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  cursor: "pointer",
});

export const ItemHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ItemTitle = style({
  fontSize: "1rem",
});

export const ItemToggle = recipe({
  base: {
    transition: "transform 200ms",
  },
  variants: {
    isOpen: {
      true: {
        transform: "rotate(0deg)",
      },
      false: {
        transform: "rotate(180deg)",
      },
    },
  },
});

export const ItemToggleIcon = style({
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const ItemContent = recipe({
  base: {
    overflow: "hidden",
    transition: "max-height 250ms ease, margin-top 200ms ease",
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: "10rem",
        marginTop: 10,
      },
      false: {
        maxHeight: 0,
        marginTop: 0,
      },
    },
  },
});

export const ItemContentWrapper = style({
  height: "10rem",
  borderRadius: "0.5rem",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const AddButton = style({
  width: "100%",
  border: "1px solid gray",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  opacity: 1,
  transition: "opacity 200ms ease-in-out, background 200ms ease-in-out",

  selectors: {
    "&:disabled": {
      opacity: 0.3,
    },

    "&:not(:disabled):hover": {
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
});

export const AddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});
