import { style } from "@vanilla-extract/css";
import { vars } from "@styles/theme.css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  paddingTop: "0rem",
  overflowY: "auto",
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
  marginRight: "0.25rem",
  background: "transparent !important",
});

export const AddValueButton = style({
  marginTop: "0.25rem",
  height: "2rem",
});

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
});

export const MetaList = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const MetaCard = style({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  alignItems: "flex-start",
  position: "relative",
});

export const MetaDragHandle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem 0",
  cursor: "grab",
  background: "none",
  border: "none",
  color: "#94a3b8",
  fontSize: "1.25rem",
  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export const MetaCardBody = style({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.5rem",
  flex: 1,
  gap: "1rem",
  minWidth: 0,
});

export const MetaRemoveButton = style({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  width: "1.5rem",
  height: "1.5rem",
  background: "transparent !important",
});

export const MetaAddButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  marginTop: "1rem",
});
