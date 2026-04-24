import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  margin: "0.5rem 0 1rem",
});

export const TitleContainer = style({
  fontSize: vars.fontSize.md,
  padding: "0 1rem",
});

export const TabList = style({
  position: "relative",
  display: "flex",
  gap: "0.5rem",
  padding: "0.5rem 1rem 0.25rem",

  borderBottom: "1px solid #ddd",
});

export const TabItem = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "3rem",
  cursor: "pointer",
});

export const TabItemLabel = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const TabItemInput = style({
  display: "none",
});

export const TabIndicator = style({
  position: "absolute",
  bottom: 0,
  left: "1rem",
  width: "3rem",
  height: "2px",
  backgroundColor: "#666",
  transform: "translateX(3.5rem)",
  transition: "transform 0.3s ease",
});

globalStyle(
  `${TabItem}:first-child:has(${TabItemInput}:checked) ~ ${TabIndicator}`,
  {
    transform: "translateX(0)",
  },
);

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
});

// Text

export const TextContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const TextInput = style({
  width: "100%",
  resize: "none",
  padding: "0.5rem",
});

// List

export const ListContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const ListItem = style({
  display: "flex",
  flexDirection: "column",
});

export const ListItemLabel = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  border: "1px solid #ccc",
  width: "100%",
  overflow: "hidden",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
});

export const ListItemInput = style({
  width: "100%",
  border: "none",
  outline: "none",
});

export const ListItemRemoveButton = style({
  border: "none !important",
});

globalStyle(`${ListItemLabel}:has(${ListItemInput}:focus-within)`, {
  border: "1px solid #666",
});

//

export const ButtonContainer = style({
  display: "flex",
  gap: "0.5rem",
  margin: "0 1rem",
});

export const CancelButton = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const ApplyButton = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});
