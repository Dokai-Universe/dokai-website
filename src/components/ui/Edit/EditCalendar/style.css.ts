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

export const InputContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #999",
});

export const Input = style({
  width: "100%",
  lineHeight: "1.33",
  fontWeight: "400",
  border: "none",
  pointerEvents: "none",
});
