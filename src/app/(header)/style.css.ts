import { style } from "@vanilla-extract/css";

export const Layout = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
});
