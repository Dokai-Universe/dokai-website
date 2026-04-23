import { style } from "@vanilla-extract/css";
import { vars } from "@styles/theme.css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  paddingTop: "0rem",
  overflow: "auto",
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
  backgroundColor: vars.color.input,

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

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
});

export const MembersList = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const RoleContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  border: "1px solid #999",
});

export const MemberDragHandle = style({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: 0,
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
  rotate: "90deg",
  transformOrigin: "center center",
});

export const MemberAddForm = style({
  display: "flex",
  gap: "0.5rem",
  border: "1px solid #999",
  borderRadius: "0.25rem",
  overflow: "hidden",
  outline: "1px solid transparent",
  padding: "0.25rem 0.5rem",
  backgroundColor: vars.color.input,

  selectors: {
    "&:focus-within": {
      border: "1px solid black",
      outlineColor: `black`,
    },
  },
});

export const MemberInput = style({
  width: "100%",
  fontSize: vars.fontSize.sm,
  border: "none",
  outline: "none",
});

export const MemberAddButton = style({
  border: "none !important",
  marginRight: "0.25rem",
  outline: "none !important",
  padding: "0 !important",
  width: "fit-content !important",
  background: "transparent !important",

  selectors: {
    "&:hover": {
      border: "none !important",
      outline: "none !important",
    },
  },
});

export const NameList = style({
  display: "flex",
  gap: "0.25rem",
  rowGap: "0.5rem",
  flexWrap: "wrap",
});

export const NameItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  border: `1px solid #999`,
  borderRadius: "0.75rem",
  padding: "0.25rem 0.5rem",
  outline: "1px solid transparent",
  transition: "border-color 0.2s, outline-color 0.2s",

  selectors: {
    "&:hover": {
      border: "1px solid black",
      outline: `1px solid black`,
    },
  },
});

export const NameText = style({
  fontSize: vars.fontSize.sm,
  lineHeight: "1.33",
});

export const NameRemoveButton = style({
  flexShrink: "0",
  opacity: "0.5",
  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const NameRemoveButtonIcon = style({
  width: "0.75rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});
