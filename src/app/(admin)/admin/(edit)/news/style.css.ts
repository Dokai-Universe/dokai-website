import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "10rem",
  paddingTop: "3rem",
});

export const HeaderContainer = style({
  gridColumn: "1 / -1",
  width: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
});

export const HeaderPrivateMark = style({
  top: "0 !important",
});
