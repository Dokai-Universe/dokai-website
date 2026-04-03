import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
});

export const SearchBar = style({
  background: "#E8E8E8",
  padding: "0.75rem 1.5rem",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  maxWidth: "560px",
  width: "100%",
});

export const SearchBarInput = style({
  fontSize: vars.fontSize.md,
  border: "none",
  outline: "none",
  background: "transparent",
  flexGrow: "1",
  minWidth: "0",
  padding: "0 0.5rem",
});

export const SearchBarIcon = style({
  stroke: "#646363",
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
  cursor: "pointer",
});
