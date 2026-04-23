import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  right: "0",
  top: "-2rem",
  gap: "0.25rem",
});

export const Icon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

export const Text = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 500,
});
