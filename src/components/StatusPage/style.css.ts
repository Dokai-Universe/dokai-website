import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  padding: "10rem",
  alignItems: "center",

  "@media": {
    [media.tablet]: {
      padding: "5rem",
    },
    [media.mobile]: {
      padding: "3rem",
    },
  },
});

export const CodeContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const CodeImageContainer = style({
  position: "relative",
  width: "12rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const CodeImage = style({
  objectFit: "contain",
});

export const Code = style({
  fontSize: vars.fontSize.xl,
  fontWeight: "600",
});

export const TextContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
  width: "100%",
});

export const Title = style({
  fontSize: vars.fontSize.md,
  fontWeight: "600",
});

export const Description = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const ButtonContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  marginTop: "2rem",
  whiteSpace: "nowrap",
});

export const Button = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
  color: "#999",
});
