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
  display: "flex",
  gap: "0.5rem",
});

export const Input = style({
  width: "100%",
  padding: "0.25rem 0.5rem",
  lineHeight: "1.33",
  fontWeight: "400",
  borderRadius: "0.25rem",
  border: "1px solid #999",
});

export const Button = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #999",
  borderRadius: "0.25rem",
  padding: "0.25rem 0.5rem",
  lineHeight: "1.33",
  fontWeight: "400",

  transition: "opacity 0.2s",

  selectors: {
    "&:not(:disabled):hover": {
      opacity: "0.5",
    },
  },
});
