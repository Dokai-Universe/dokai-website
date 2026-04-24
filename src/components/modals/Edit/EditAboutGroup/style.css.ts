import { style } from "@vanilla-extract/css";
import { vars } from "@styles/theme.css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  paddingTop: "0rem",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const ValuesContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const ValuesTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
});

export const ValuesList = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const ValueRow = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const ValueLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  border: `1px solid #999`,
  borderRadius: "0.25rem",
  overflow: "hidden",
  background: vars.color.input,

  selectors: {
    "&:focus-within": {
      border: "1px solid black",
      outline: `1px solid black`,
    },
  },
});

export const ValueInput = style({
  width: "100%",
  fontSize: vars.fontSize.sm,
  border: "none",
  outline: "none",
  padding: "0.25rem 0.5rem",
});

export const ValueRemoveButton = style({
  border: "none !important",
  background: "transparent !important",
  marginRight: "0.25rem",
});

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
});
