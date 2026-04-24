import { style } from "@vanilla-extract/css";

export const FakeLayout = style({
  opacity: "0.5",
  pointerEvents: "none",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
});
