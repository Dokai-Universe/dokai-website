import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  rowGap: "4rem",
  columnGap: "1rem",
  marginBottom: "10rem",
});

export const HeaderContainer = style({
  gridColumn: "2 / -1",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

export const AboutSectionAddButton = style({
  gridColumn: "2 / -2",
  display: "flex",
  border: "1px solid black",
  borderRadius: "1rem",
  padding: "1rem",
  alignItems: "center",
  justifyContent: "center",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});
