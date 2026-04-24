import { keyframes, style } from "@vanilla-extract/css";

export const Container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

export const ImageContainer = style({
  height: "75%",
  width: "75%",
  position: "relative",
});

export const Image = style({
  objectFit: "contain",
});

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export const Spin = style({
  animation: `${spin} 1.5s linear infinite`,
});

export const Text = style({});
