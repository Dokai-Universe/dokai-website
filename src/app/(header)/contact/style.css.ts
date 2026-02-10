import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flexGrow: "1",
  gap: "3rem",
  justifyContent: "space-between",
});

export const Content = style({
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  rowGap: "3rem",

  "@media": {
    [media.desktop]: {
      margin: "0 0 auto",
    },
  },
});
