import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
});

export const Media = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

export const Button = style({
  position: "absolute",
  top: 0,
  right: 0,
  margin: "1rem",
});

export const AddMedia = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: vars.color.bg,
  border: "2px solid",
  borderColor: vars.color.border,
  opacity: "0.4",
  borderRadius: "0.5rem",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddMediaIcon = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});
