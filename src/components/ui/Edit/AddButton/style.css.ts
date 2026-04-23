import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.5em",
  borderRadius: "0.5em",
  background: vars.color.bg,
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, outline-color 0.2s ease-in-out",
  outline: `1px solid transparent`,
  border: "1px solid #999",
  backdropFilter: "blur(1rem)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const ButtonIcon = style({
  width: "1.25em",
  height: "auto",
  aspectRatio: "1 / 1",
});
