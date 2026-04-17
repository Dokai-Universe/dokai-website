import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "8rem",
  columnGap: "1rem",

  marginBottom: "10rem",

  "@media": {
    [media.mobile]: {
      rowGap: "4rem",
    },
  },
});

export const Content = style({
  gridColumn: "1 / -1",
});
