import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  marginBottom: "10rem",

  "@media": {
    [media.tablet]: {
      rowGap: "6rem",
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

export const HeaderPrivateMark = style({
  top: "0 !important",
});

export const ButtonContainer = style({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
