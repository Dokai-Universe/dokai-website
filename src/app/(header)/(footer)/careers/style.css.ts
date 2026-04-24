import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",

  marginBottom: "10rem",

  "@media": {
    [media.mobile]: {
      rowGap: "1rem",
    },
  },
});
