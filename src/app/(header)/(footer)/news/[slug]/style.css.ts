import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",

  marginBottom: "6rem",
});

export const Content = style({
  gridColumn: "1 / -1",
});
