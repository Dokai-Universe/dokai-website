import { darkThemeClass, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
  width: "100%",
});

export const Title = style({
  lineHeight: "1.33",
  fontWeight: "500",
});

export const Content = style({
  position: "relative",
  border: "1px solid #999",
  borderRadius: "0.25rem",
  padding: "0.5rem",
  transition: "border-color 0.1s ease-in-out",
  background: vars.color.input,

  selectors: {
    "&:hover, &:focus-within": {
      borderColor: "#999",
    },

    "&:focus-within": {
      borderTopLeftRadius: "0",
      border: "1px solid",
      borderColor: vars.color.fg,
      outline: "1px solid",
      outlineColor: vars.color.fg,
    },
  },
});

export const ToolbarContainer = style({
  position: "absolute",
  bottom: "calc(100% + 1px)",
  left: "-1px",
  border: "1px solid",
  borderColor: vars.color.fg,
  outline: "1px solid ",
  outlineColor: vars.color.fg,
  zIndex: "100",
  display: "none",
  borderRadius: "0.5rem 0.5rem 0 0",
  borderBottom: "none",

  overflow: "hidden",
  background: vars.color.bg,

  selectors: {
    [`${Content}:focus-within &`]: { display: "flex" },
  },
});

export const ToolbarButton = style({
  all: "unset",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  transition: "background 0.1s ease-in-out",

  selectors: {
    "&:hover": {
      background: vars.color.bgSub,
    },
    "&:focus-visible": {
      outline: "2px solid black",
      outlineOffset: "-2px",
    },
  },
});

export const ToolbarButtonIcon = style({
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",

  selectors: {
    [`${darkThemeClass} &`]: {
      filter: "invert(1)",
    },
  },
});

export const RichText = style({
  outline: "none",
  minHeight: "3rem",
  fontWeight: "400",

  selectors: {
    "&:empty:before": {
      content: "attr(data-placeholder)",
      opacity: 0.5,
      pointerEvents: "none",
    },

    "&:focus:before": {
      content: "",
    },
  },
});

globalStyle(`${RichText} a`, {
  color: "blue",
  position: "relative",
});

globalStyle(`${RichText} a:hover`, {
  textDecoration: "underline",
});

globalStyle(`${RichText} a:hover::after`, {
  content: "attr(href)",
  position: "absolute",
  left: "0",
  bottom: "calc(100% + 0.25rem)",
  whiteSpace: "nowrap",
  padding: "0.25em 0.5em",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "0.75em",
  background: "white",
  boxShadow: "0 0.5em 1em rgba(0,0,0,0.12)",
  fontSize: "0.5em",
  color: "black",
  zIndex: "9999",
});
