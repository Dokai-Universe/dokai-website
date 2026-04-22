import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",

  marginBottom: "6rem",
});

export const Content = style({
  gridColumn: "1 / -1",
});

export const Body = style({
  gridColumn: "1 / -1",
  margin: "2rem 4rem",
  marginBottom: "10rem",

  "@media": {
    [media.tablet]: {
      margin: "0 1rem",
    },
    [media.mobile]: {
      margin: "0",
    },
  },
});

export const HeaderContainer = style({
  gridColumn: "1 / -1",
  width: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  top: "0rem",
});

export const HeaderPrivateMark = style({
  top: "0 !important",
});
