import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  cursor: "pointer",
});

export const IconContainer = style({
  position: "relative",
  width: "6rem",
  height: "6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Icon = style({
  objectFit: "contain",
});

export const Text = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "500",
  color: "#999",
});
