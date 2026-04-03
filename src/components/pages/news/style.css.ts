import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const SearchBar = style({
  gridColumn: "3 / -3",
  background: "#E8E8E8",
  padding: "0.75rem 1rem",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",

  "@media": {
    [media.tablet]: {
      gridColumn: "2 / -2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const SearchBarInput = style({
  fontSize: vars.fontSize.sm,
  border: "none",
  outline: "none",
  background: "transparent",
  flexGrow: "1",
  minWidth: "0",
  padding: "0 0.5rem",
});

export const SearchBarIcon = style({
  stroke: "black",
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
  cursor: "pointer",
});
