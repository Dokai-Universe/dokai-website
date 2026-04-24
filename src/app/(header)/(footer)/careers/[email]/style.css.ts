import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "9rem",
  columnGap: "1rem",
  marginBottom: "10rem",

  "@media": {
    [media.tablet]: {
      rowGap: "6rem",
    },
  },
});

export const HeaderPrivateMark = style({
  right: "2rem !important",
});
