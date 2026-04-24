import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "pointer",
});

export const Title = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const Input = style({ display: "none" });

export const Toggle = style({
  position: "relative",
  width: "2rem",
  height: "auto",
  aspectRatio: "2 / 1",

  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      width: "auto",
      height: "100%",
      aspectRatio: "1 / 1",
      borderRadius: 999,
      background: vars.color.bg,
      boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
      transform: "translateX(0px)",
      transition: "transform 160ms ease",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "10%",
      boxSizing: "content-box",
      transformOrigin: "center",
      borderRadius: 999,
      background: vars.color.lightGray,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      transition: "background 160ms ease",
    },
  },
});

globalStyle(`${Input}:checked + ${Toggle}::after`, {
  transform: "translateX(100%)",
});

globalStyle(`${Input}:checked + ${Toggle}::before`, {
  background: vars.color.fg,
});
