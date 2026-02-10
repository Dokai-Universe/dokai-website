import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const MoreButton = style({
  display: "flex",
  border: "1.5px solid black",
  borderRadius: "999px",
  padding: "0.5rem 1rem",
  gap: "0.5rem",
  alignItems: "center",

  fontSize: vars.fontSize.sm,
});

export const MoreButtonIcon = style({
  stroke: "black",
  width: "1.25em",
  height: "1.25em",
});
