import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
});

export const ButtonContainer = style({
  display: "flex",
  gap: "0.5rem",
});
