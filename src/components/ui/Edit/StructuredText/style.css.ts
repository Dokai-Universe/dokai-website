import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Button = style({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  margin: "0.5rem",
  marginRight: "1rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, background 0.2s ease-in-out",
  border: "1px solid black",

  selectors: {
    "&:hover": {
      opacity: "1",
      background: "rgba(0, 0, 0, 0.1)",
    },
  },
});

export const ButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

// Editor

export const Container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #999",
  padding: "0.5rem",
  borderRadius: "0.5rem",
});

export const Content = style({
  position: "relative",
  border: "none",
  outline: "none",
  resize: "none",
  overflow: "auto",
  width: "100%",
  height: "100dvh",
  maxHeight: "32rem",
  fontSize: vars.fontSize.sm,
  lineHeight: "1.5",
  padding: "0",
  margin: "0",
});

export const EmptyContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "2 / 1",
  overflow: "hidden",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #bbb",
  opacity: "0.4",
  cursor: "pointer",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButton = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
});

export const AddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});
