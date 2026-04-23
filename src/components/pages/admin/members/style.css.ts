import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Section = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginTop: "1rem",
});

export const SectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

export const SectionTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
});

export const SectionSub = style({
  fontSize: "0.875rem",
  opacity: 0.7,
});

export const SectionActions = style({
  display: "flex",
  gap: "0.5rem",
});

export const PrimaryButton = style({
  height: "2.5rem",
  padding: "0 1rem",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  border: "1px solid #bbb",
  transition: "opacity 0.3s",

  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:not(:disabled):hover": {
      opacity: 0.5,
    },
  },
});

export const SecondaryButton = style({
  height: "2.5rem",
  padding: "0 1rem",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  border: "1px solid #bbb",
  transition: "opacity 0.3s",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const MemberBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const BlockTitle = style({
  fontSize: "0.95rem",
  fontWeight: 600,
});

export const MemberList = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  width: "100%",
  maxWidth: "42rem",
  alignSelf: "center",
});

export const MemberRow = style({
  display: "grid",
  gridTemplateColumns: "1rem minmax(0,1fr) auto auto auto",
  gap: "0.75rem",
  alignItems: "center",
  fontSize: vars.fontSize.md,
});

export const DragHandle = style({
  cursor: "grab",
  border: "none",
  background: "transparent",
});

export const DragHandlePlaceholder = style({
  width: "1rem",
});

export const MemberInput = style({
  width: "100%",
  minWidth: 0,
  padding: "0.25rem 0.5rem",
  border: "1px solid #bbb",
  borderRadius: "0.25rem",
});

export const MemberSelect = style({
  width: "100%",
  padding: "0.25rem 0.5rem",
  border: "1px solid #bbb",
  borderRadius: "0.25rem",
});

export const FixedToggle = style({
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "0.25rem 0.25rem",
  border: "1px solid #bbb",
  borderRadius: "0.5rem",
  cursor: "pointer",
  width: "fit-content",
  aspectRatio: "1 / 1",

  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",

  backdropFilter: "blur(1rem)",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const FixedIcon = style({
  width: "1.25rem",
  height: "1.25rem",
  stroke: vars.color.fg,
});

export const DeleteButton = style({
  width: "fit-content",
  aspectRatio: "1 / 1",
  // border: "none !important",
  background: "none !important",
});

export const ErrorText = style({
  color: "red",
  fontSize: "0.875rem",
});
