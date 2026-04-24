import { keyframes, style } from "@vanilla-extract/css";

export const ImageWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const LoadingIcon = style({
  animation: `${spin} 3s linear infinite`,
});
