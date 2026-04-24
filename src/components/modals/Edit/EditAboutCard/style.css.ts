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

export const IconContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const IconTitle = style({
  lineHeight: "1.33",
  fontWeight: "500",
});

export const IconContent = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  height: "auto",
  aspectRatio: "2 / 1",
  cursor: "pointer",
});

export const IconInput = style({
  display: "none",
});

export const IconPreview = style({
  width: "100%",
  height: "auto",
  aspectRatio: "2 / 1",
  objectFit: "cover",
});

export const IconUploadButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  height: "auto",
  aspectRatio: "2 / 1",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "0.75rem",
  padding: "0.75rem",
  transition: "border-color 0.2s",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      borderColor: "black",
    },
  },
});

export const IconUploadButtonIcon = style({
  width: "2rem",
  height: "2rem",
});

export const IconUploadButtonText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
});

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
});
