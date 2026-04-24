import { darkThemeClass, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Layout = style({
  width: "100dvw",
  height: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Container = style({
  padding: "2rem",
  background: vars.color.bgSub,
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "20rem",
});

export const Logo = style({
  width: "8rem",
  height: "auto",
  aspectRatio: "1 /1",

  selectors: {
    [`${darkThemeClass} &`]: {
      filter: "invert(1)",
    },
  },
});

export const Title = style({
  fontSize: vars.fontSize.xl,
  fontWeight: 700,
});

export const ButtonText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  flexGrow: "1",
});

export const Description = style({
  fontSize: "0.75em",
  fontWeight: 400,
  color: "gray",
});

export const Button = style({
  padding: "0.5rem 1rem",
  border: "1px solid #ddd",
  color: "black",
  borderRadius: "0.5rem",
  cursor: "pointer",
  width: "100%",
  background: "white",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
