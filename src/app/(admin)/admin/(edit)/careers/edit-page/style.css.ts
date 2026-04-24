import { media, vars } from "@styles/theme.css";
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

export const HeaderContainer = style({
  gridColumn: "2 / -2",
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -3",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const AddButton = style({
  gridColumn: "2 / -2",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});
