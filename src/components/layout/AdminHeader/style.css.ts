import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  height: "4rem",
  maxHeight: "4rem",
  justifyContent: "space-between",
  transition: "max-height 0.3s ease-in-out",
  borderBottom: "1px solid",
  borderColor: vars.color.border,
  overflow: "hidden",

  selectors: {
    '&[data-is-show-nav="false"]': {
      maxHeight: "0",
    },
  },
});

export const Content = style({
  display: "flex",
  width: "100%",
  height: "4rem",
  padding: "1rem 2rem",
  alignItems: "center",
  gap: "1rem",

  "@media": {
    [media.mobile]: {
      paddingLeft: "1rem",
    },
  },
});

export const BackButton = style({
  transition: "opacity 0.2s ease-in-out",
  flexShrink: "0",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const BackButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

export const Email = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const Nav = style({
  marginLeft: "auto",
  marginRight: "2rem",
  display: "flex",
  gap: "1rem",
});

export const NavItem = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 300,
});

export const ToggleButton = style({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  padding: "0.25rem",
  border: "1px solid",
  borderColor: vars.color.border,
  borderRadius: "999px",
  transition: "transform 0.3s ease-in-out",

  selectors: {
    '&[data-is-show-nav="false"]': {
      transform: "rotate(-180deg)",
    },
  },
});

export const ToggleButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  fill: vars.color.fg,
});
