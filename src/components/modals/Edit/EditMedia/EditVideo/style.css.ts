import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  overflow: "auto",
});

export const Media = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  flexGrow: "1",
  justifyContent: "space-between",
});

export const Title = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "500",
});

export const SourceContainer = style({
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const DescriptionContainer = style({
  gridColumn: "1 / span 5",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const Input = style({
  fontSize: vars.fontSize.xs,
  padding: "0.25rem 0.5rem",
  flexGrow: "1",
});

export const LoopContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "0.5rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
  width: "100%",
  gap: "0.5rem",
});

export const CheckboxContainer = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const LoopConfigContainer = style({
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  alignItems: "center",
  gap: "0.5rem",
});

export const HelpText = style({
  fontSize: "0.75rem",
  opacity: 0.7,
});
