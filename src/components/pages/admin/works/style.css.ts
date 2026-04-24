import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  marginTop: "1rem",
});

export const Contents = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const ContentsHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ContentsTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "600",
});

export const ContentsActions = style({
  display: "flex",
  gap: "1rem",
});

export const Divider = style({
  width: "100%",
  height: "1px",
  background: vars.color.border,
});

// Category

export const CategoryAddForm = style({
  display: "flex",
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.25rem",
  padding: "0.25rem 0.5rem",
  background: vars.color.input,
});

export const CategoryInput = style({
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
});

export const CategoryAddButton = style({
  border: "none !important",
  background: "none !important",
  width: "auto !important",
});

export const CategoryList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const CategoryItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.5rem",
  border: "1px solid",
  borderColor: vars.color.border,
  borderRadius: "0.25rem",

  selectors: {
    "&:has(input:focus)": {
      background: vars.color.input,
    },
  },
});

export const CategoryDragHandle = style({
  cursor: "grab",
  userSelect: "none",
  border: "none",
  background: "transparent",
  paddingLeft: "0.25rem",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.3,
  },
});

export const CategoryName = style({
  flex: 1,
  paddingRight: "1rem",
});

export const CategoryEditLabel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CategoryEditInput = style({
  flex: 1,
  padding: "0",
  border: "none",
  outline: "none",
  background: "transparent",
});

export const CategoryItemButton = style({
  border: "none !important",
  background: "transparent !important",
  width: "1.5rem !important",
  padding: "0rem !important",
  outline: "none !important",
  height: "auto",
  aspectRatio: "1 / 1",
  opacity: "0.5",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const CategoryItemButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

//

export const WorkSearch = style({
  display: "flex",
  alignItems: "center",
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.25rem",
  padding: "0.25rem 0.5rem",
  background: vars.color.input,
});

export const WorkSearchInput = style({
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
});

export const WorkSearchButton = style({
  border: "none !important",
  background: "transparent !important",
  width: "auto !important",
});

export const WorkSearchIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

export const WorkList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
  gap: "1rem",
});

export const WorkListItem = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  transition: "opacity 0.2s",

  selectors: {
    "&[data-fixed=true]": {
      opacity: "0.3",
    },
  },
});

export const WorkListItemMedia = style({
  width: "100%",
  aspectRatio: "16 / 9",
});

export const WorkListItemTitle = style({
  fontSize: vars.fontSize.md,
});

export const FixedWorkItemDragHandle = style({
  cursor: "grab",
  userSelect: "none",
  border: "none",
  background: "transparent",
  paddingLeft: "0.25rem",
  rotate: "90deg",

  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.3,
  },
});

export const FixedWorkItemRemoveButton = style({
  position: "absolute",
  border: "none !important",
  background: "transparent !important",
  width: "1.5rem !important",
  padding: "0rem !important",
  outline: "none !important",
  height: "auto",
  aspectRatio: "1 / 1",
  opacity: "0.5",
  right: "0",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});
