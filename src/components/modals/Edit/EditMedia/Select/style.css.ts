import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const SelectMediaContainer = style({
  width: "100%",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

export const SelectMediaButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "1rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      background: vars.color.bgSub,
      color: "#666",
    },
  },
});

export const SelectMediaButtonIcon = style({
  width: "3rem",
  height: "auto",
  aspectRatio: "1 / 1",
  objectFit: "contain",
  fill: "#555",
});

export const SelectMediaButtonText = style({
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  color: "#555",
});

export const EditMediaContainer = style({
  border: "1px solid #999",
  height: "auto",
  aspectRatio: "16 / 9",
  borderRadius: "0.5rem",
  overflow: "hidden",
});
