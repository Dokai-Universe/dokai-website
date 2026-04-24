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

export const TextArea = style({
  width: "100%",
  padding: "0.25rem 0.5rem",
  lineHeight: "1.33",
  fontWeight: "400",
  borderRadius: "0.25rem",
  border: "1px solid #999",
  flexGrow: "1",
  resize: "none",
});
