import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
});

export const Button = style({
  display: "flex",
  border: "1.5px solid black",
  borderRadius: "999px",
  padding: "0.5rem 1rem",
  gap: "0.5rem",
  alignItems: "center",

  fontSize: vars.fontSize.sm,
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      background: "#eeeeee",
    },
  },
});

export const ButtonIcon = style({
  stroke: "black",
  width: "1.25em",
  height: "1.25em",
});
