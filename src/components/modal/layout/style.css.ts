import { media, vars } from "@styles/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const showDelayVar = createVar();

export const Layout = recipe({
  base: {
    position: "fixed",
    width: "100%",
    height: "100%",
    right: 0,
    bottom: 0,
    zIndex: 105,
    overflow: "hidden",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",

    transition: `background ${showDelayVar} ease-in-out, backdropFilter ${showDelayVar} ease-in-out`,

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
    isShowModal: {
      true: {
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      },
      false: {
        background: "rgba(0, 0, 0, 0)",
        backdropFilter: "none",
      },
    },
  },
  defaultVariants: {
    isShowModal: false,
  },
});

export const Container = recipe({
  base: {
    background: "white",
    borderRadius: "16px",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",

    transition: `transform ${showDelayVar} ease-in-out, opacity ${showDelayVar} ease-in-out`,

    paddingRight: "0.75rem",

    "@media": {
      [media.tablet]: {
        paddingRight: "8px",
      },
      [media.mobile]: {
        paddingRight: "6px",
      },
    },
  },
  variants: {
    isShowModal: {
      true: { transform: "translateY(0)", opacity: 1 },
      false: { transform: "translateY(100%)", opacity: 0 },
    },
  },
  defaultVariants: {
    isShowModal: false,
  },
});

export const Content = style({
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  overscrollBehavior: "contain",

  padding: "2rem",
  paddingRight: "0.75rem",

  "@media": {
    [media.tablet]: {
      padding: "24px",
      paddingRight: "8px",
    },
    [media.mobile]: {
      padding: "20px",
      paddingRight: "6px",
    },
  },
});

export const CloseButton = style({
  position: "relative",
  marginLeft: "auto",
});

export const CloseButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

globalStyle(`${Content}::-webkit-scrollbar`, {
  width: "0.5rem",

  "@media": {
    [media.tablet]: {
      width: "8px",
    },
  },
});

globalStyle(`${Content}::-webkit-scrollbar-track`, {
  background: "transparent",
  margin: "2rem 0",

  "@media": {
    [media.tablet]: {
      margin: "24px 0",
    },
    [media.mobile]: {
      margin: "20px 0",
    },
  },
});

globalStyle(`${Content}::-webkit-scrollbar-thumb`, {
  background: "#D9D9D9",
  borderRadius: "999px",
});

globalStyle(`${Content}::-webkit-scrollbar-thumb:hover`, {
  background: vars.color.border,
});
