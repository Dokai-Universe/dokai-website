import { style } from "@vanilla-extract/css";

export const Button = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #296bc0",
  cursor: "pointer",
  color: "white",
  background: "#296bc0",
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:not(:disabled):hover": {
      background: "#3989f1ff",
    },

    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});
