import { media, vars } from "@styles/theme.css";
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const TransitionDurationVar = createVar();
export const MaxWidthVar = createVar();

export const Overlay = recipe({
  base: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99999,
    transition: `background ${TransitionDurationVar} ease-in-out, backdrop-filter ${TransitionDurationVar} ease-in-out`,
    padding: "30px",

    "@media": {
      [media.tablet]: {
        padding: "24px",
      },
      [media.mobile]: {
        padding: "20px",
      },
    },
  },
  variants: {
    isVisible: {
      true: {
        background: "#33333380",
        backdropFilter: "blur(2px)",
      },
      false: {
        background: "#33333300",
        backdropFilter: "none",
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Layout = recipe({
  base: {
    width: "100%",
    maxWidth: MaxWidthVar,
    background: vars.color.bg,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    borderRadius: "1rem",
    transition: `transform ${TransitionDurationVar} ease-in-out, opacity ${TransitionDurationVar} ease-in-out`,
    overflow: "hidden",
    maxHeight: "calc(100dvh - 60px)",

    "@media": {
      [media.tablet]: {
        maxHeight: "calc(100dvh - 48px)",
      },
      [media.mobile]: {
        maxHeight: "calc(100dvh - 40px)",
      },
    },
  },
  variants: {
    isVisible: {
      true: {
        transform: "translateY(0)",
        opacity: 1,
      },
      false: {
        transform: "translateY(20rem)",
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "1rem",
  marginBottom: "0",
});

export const HeaderTitle = style({
  fontSize: vars.fontSize.md,
});

export const CloseButton = style({});

export const CloseButtonIcon = style({
  width: "1.5rem",
  stroke: vars.color.fg,
  height: "auto",
  aspectRatio: "1 / 1",
});
