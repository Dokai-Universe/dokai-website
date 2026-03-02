import { vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  height: "24rem",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  paddingTop: "0rem",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: "1",
});

export const Donut = style({
  width: "12rem",
  aspectRatio: "1 / 1",
  display: "grid",
  placeItems: "center",
  color: "#111",
});

export const DonutSvg = style({
  width: "100%",
  height: "100%",
  transform: "rotate(-90deg)",
});

export const DonutTrack = style({
  fill: "none",
  stroke: "rgba(0,0,0,0.12)",
  cx: 12,
  cy: 12,
  r: 10,
  strokeWidth: 1,
});

export const DonutProgress = style({
  fill: "none",
  stroke: "#296bc0",
  strokeLinecap: "round",
  transition: "stroke-dashoffset 200ms ease",
  cx: 12,
  cy: 12,
  r: 10,
  strokeWidth: 1,
});

export const DonutLabel = style({
  fontSize: vars.fontSize.md,
  position: "absolute",
  fontWeight: 600,
});

export const Title = style({
  fontSize: vars.fontSize.md,
  fontWeight: 500,
});

export const ButtonContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.5rem",
});
