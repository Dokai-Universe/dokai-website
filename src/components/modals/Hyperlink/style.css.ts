import { vars } from "@styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "1rem",
  marginTop: "0",
  height: "18rem",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flexGrow: "1",
});

// URL

export const URLInputContainer = style({
  display: "flex",
  gap: "0.5rem",
});

export const URLInput = style({
  flexGrow: "1",
  padding: "0.25rem 0.5rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
});

export const URLButton = style({
  padding: "0.25rem 0.75rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
  cursor: "pointer",

  transition: "all 0.2s ease-in-out",
  selectors: {
    "&:hover": {
      background: "#eee",
    },
  },
});

// Wrapper

export const Wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "1px solid #ddd",
  borderRadius: "0.5rem",
  flexGrow: "1",
  alignItems: "center",
  justifyContent: "center",
  color: "#888",
  padding: "1rem",
});

export const OgViewContainer = style({
  display: "flex",
  gap: "1rem",
  height: "100%",
  alignItems: "center",
  width: "100%",
  overflow: "hidden",
});

export const OgViewImageContainer = style({
  position: "relative",
  height: "100%",
  width: "auto",
  aspectRatio: "4 / 3",
});

export const OgViewImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

export const OgViewTextContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  flexGrow: 1,
  overflow: "hidden",
  color: "black",
  height: "100%",
});

export const OgViewTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: 600,
});

export const OgViewDescription = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.75,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export const OgViewUrl = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.6,
  textOverflow: "ellipsis",
  overflow: "hidden",
  marginTop: "auto",
});

// Status

export const StatusContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StatusText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const StatusSubText = style({
  fontSize: vars.fontSize.xs,
});

export const StatusIconContainer = style({
  position: "relative",
  width: "4rem",
  height: "auto",
  aspectRatio: "1 / 1",
  marginBottom: "0.5rem",
});

export const StatusIcon = style({
  width: "100%",
  height: "100%",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const LoadingIcon = style({
  animation: `${spin} 3s linear infinite`,
});

// Button

export const ButtonContainer = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

export const CancelButton = style({
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
});

export const AddButton = style({
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
