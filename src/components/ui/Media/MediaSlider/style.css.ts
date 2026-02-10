import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  width: "100%",
});

export const Viewport = style({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  touchAction: "pan-y", // 좌우 스와이프만 우리가 처리
  userSelect: "none",
});

export const Track = style({
  display: "flex",
  width: "100%",
  transition: "transform 300ms ease",
  willChange: "transform",
});

export const Slide = style({
  flex: "0 0 100%",
  width: "100%",
  height: "100%",
});

export const Controls = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  justifyContent: "space-between",
  pointerEvents: "none",

  "@media": {
    [media.mobile]: {
      position: "relative",
      alignItems: "center",
    },
  },
});

export const ButtonContainer = style({
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 150ms ease",
  opacity: "0",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },

  "@media": {
    [media.mobile]: {
      opacity: "1",
    },
  },
});

export const Button = style({
  pointerEvents: "auto",
  transition: "opacity 150ms ease",

  selectors: {
    "&:disabled": {
      opacity: 0.3,
      cursor: "default",
    },
  },
});

export const ButtonIcon = style({
  width: "1.75rem",
  padding: "0.25rem",
  boxSizing: "content-box",
  height: "auto",
  aspectRatio: "1 / 1",
  borderRadius: "999px",
  border: "1px solid rgba(0,0,0,0.15)",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(10px)",
  stroke: "black",
  margin: "1rem",

  "@media": {
    [media.mobile]: {
      background: "transparent",
      border: "none",
      width: "auto",
      height: "auto",
      margin: "0",
    },
  },
});

export const Dots = style({
  pointerEvents: "auto",
  position: "absolute",
  left: "50%",
  bottom: "0.75rem",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "0.5rem",
  opacity: "0",
  transition: "opacity 150ms ease",

  "@media": {
    [media.mobile]: {
      opacity: "1",
    },
  },
});

export const Dot = style({
  width: "0.5rem",
  height: "auto",
  aspectRatio: "1/1",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.7)",
  background: "rgba(255,255,255,0.4)",
  cursor: "pointer",
  transition: "background 150ms ease",

  "@media": {
    [media.mobile]: {
      background: "rgba(0, 0, 0, 0.3)",
      border: "none",
    },
  },

  selectors: {
    '&[data-active="true"]': {
      background: "rgba(255,255,255,0.95)",

      "@media": {
        [media.mobile]: {
          background: "rgb(0, 0, 0) ",
        },
      },
    },
  },
});

globalStyle(`${Container}:hover ${Dots}`, {
  opacity: 1,
});
