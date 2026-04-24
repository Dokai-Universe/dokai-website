import { recipe } from "@vanilla-extract/recipes";

export const Button = recipe({
  base: {
    padding: "0.25em 0.75em",
    borderRadius: "0.5em",
    border: "1px solid #ddd",
    cursor: "pointer",
    color: "#888",
    transition: "all 0.2s ease-in-out",

    selectors: {
      "&:hover": {
        background: "#eeeeee",
        color: "#666",
      },
    },
  },
  variants: {
    isRight: {
      true: {
        marginLeft: "auto",
      },
    },
  },
});
