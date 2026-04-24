import { style } from "@vanilla-extract/css";

export const Container = style({
  margin: "1rem",
  marginTop: "0",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const Content = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
  padding: "4rem",
});

export const ButtonContainer = style({
  display: "flex",
  gap: "0.75rem",
});

export const CancelButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #ddd",
  cursor: "pointer",
  color: "#888",
  transition: "all 0.2s ease-in-out",
  flexGrow: "1",

  selectors: {
    "&:hover": {
      background: "#eeeeee",
      color: "#666",
    },
  },
});

export const ConfirmButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #296bc0",
  cursor: "pointer",
  color: "white",
  background: "#296bc0",
  transition: "all 0.2s ease-in-out",
  flexGrow: "1",

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
