import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
  width: "100%",
});

export const Title = style({
  lineHeight: "1.33",
  fontWeight: "500",
});

export const Label = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

export const Select = style({
  width: "100%",
  appearance: "none",
  display: "flex",
  gap: "1rem",
  padding: "0.25em",
  border: "1px solid #999",
  borderRadius: "0.25rem",
  WebkitAppearance: "none",
  MozAppearance: "none",
});

export const SelectIcon = style({
  position: "absolute",
  right: "0.5rem",
  top: "50%",
  transform: "translateY(-50%) rotate(180deg)",
  transition: "transform 0.2s",
  pointerEvents: "none",

  selectors: {
    [`${Label}:focus-within &`]: {
      transform: "translateY(-50%) rotate(0deg)",
    },
  },
});
