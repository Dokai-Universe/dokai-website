import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "10rem",
});

export const HeaderPrivateMark = style({
  top: "0 !important",
  right: "2rem !important",
});
