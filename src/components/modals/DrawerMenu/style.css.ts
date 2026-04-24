import { darkThemeClass, media, vars } from "@styles/theme.css";
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const TransitionDurationVar = createVar();

export const Overlay = recipe({
  base: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 101,
    transition: `background ${TransitionDurationVar} ease-in-out, backdrop-filter ${TransitionDurationVar} ease-in-out`,
    willChange: "transform, opacity",
    contain: "layout paint style",
  },
  variants: {
    isVisible: {
      true: {
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      },
      false: {
        background: "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(0px)",
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
    backgroundColor: "var(--drawer-bg)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    transition: `transform ${TransitionDurationVar} ease-in-out, opacity ${TransitionDurationVar} ease-in-out, border-radius ${TransitionDurationVar} ease-in-out, background-color 0.2s ease-in-out`,
    overflow: "auto",
    height: "100%",
    justifyContent: "space-between",
    willChange: "transform, opacity",
    contain: "layout paint style",
  },
  variants: {
    isVisible: {
      true: {
        borderRadius: "0",
        transform: "translateX(0)",
        opacity: 1,
      },
      false: {
        borderRadius: "1rem 0 0 1rem",
        transform: "translateX(75%)",
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

// Nav

export const NavGrid = style({
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",

  marginTop: "4rem",
  transition: "margin-top 250ms ease",

  "@media": {
    [media.tablet]: {
      marginTop: "6rem",
    },
    [media.mobile]: {
      marginTop: "4rem",
    },
  },
});

export const NavAuth = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
});

export const NavEmail = style({
  overflow: "hidden",
  display: "flex",

  fontSize: vars.fontSize.md,
  fontWeight: "400",
  lineHeight: "1.4",
  letterSpacing: "0.03em",
  gap: "0.5rem",
  textTransform: "none",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const NavColumn = style({
  gridColumn: "2 / -1",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",

  fontSize: vars.fontSize.xxl,
  fontWeight: "300",
  lineHeight: "1.33",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xl,
      fontWeight: "400",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.lg,
      marginLeft: "1rem",
    },
  },
});

export const NavSearchButton = style({
  transition: "opacity .2s ease",
  display: "none",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },

  "@media": {
    [media.mobile]: {
      display: "block",
    },
  },
});

export const NavSearchIcon = style({
  width: "1.25em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

export const NavLink = style({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  transform: `translateX(calc(-1 * (1em + 1rem)))`,
  transition: "opacity .3s ease, transform .2s ease",
  color: vars.color.fg,

  selectors: {
    "&:hover": {
      opacity: 0.5,
      transform: `translateX(0)`,
    },
  },
});

export const NavArrowIcon = style({
  width: "1em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
});

// Footer

export const Footer = style({
  position: "relative",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.33em",
  letterSpacing: "-0.03em",
  alignItems: "flex-end",
  rowGap: "0.775rem",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const FooterTitle = style({
  gridColumn: "span 3",
  textIndent: "-1rem",
  marginLeft: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / span 4",
    },
    [media.mobile]: {
      gridColumn: "1 / span 6",
    },
  },
});

export const SocialRow = style({
  gridColumn: "4 / -2",
  display: "flex",
  justifyContent: "space-between",

  fontWeight: "300",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
  height: "fit-content",
  alignItems: "flex-end",

  "@media": {
    [media.tablet]: {
      gridColumn: "5 / span 2",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "0.5rem",
    },
    [media.mobile]: {
      gridRow: "1",
      gridColumn: "1 / -1",
      marginLeft: "1rem",
    },
  },
});

export const SocialLink = style({
  transition: "opacity .2s ease",
  height: "fit-content",

  selectors: {
    "&:hover": {
      opacity: 0.5,
    },
  },
});

export const FooterIconButton = style({
  position: "absolute",
  right: "0rem",
  bottom: "0rem",
});

export const FooterIcon = style({
  width: "3.25rem",
  height: "auto",
  aspectRatio: "1 / 1",

  selectors: {
    [`${darkThemeClass} &`]: {
      filter: "invert(1)",
    },
  },
});

//

export const ThemeToggleButtonContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",

  "@media": {
    [media.tablet]: {
      position: "absolute",
      display: "block",
      bottom: "calc(24px + 3.25rem)",
      left: "24px",
      zIndex: "1",
    },
    [media.mobile]: {
      bottom: "calc(20px + 3.75rem)",
      left: "auto",
      right: "20px",
      zIndex: "1",
    },
  },
});

export const ThemeToggleButton = style({
  gridColumn: "2 / -1",
  border: "1px solid",
  borderColor: vars.color.fg,
  borderRadius: "999px",
  height: "3rem",

  position: "relative",
  width: "11rem",
  textAlign: "right",
  padding: "0 1rem",
  textTransform: "uppercase",
  fontSize: vars.fontSize.lg,
  letterSpacing: "-0.03em",
  marginRight: "50%",

  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      margin: "0.2rem",
      height: "calc(100% - 0.4rem)",
      aspectRatio: "1 / 1",
      background: vars.color.fg,
      borderRadius: "999px",

      transition: "transform 0.2s ease",
    },

    '&[data-is-dark="true"]': {
      textAlign: "left",
    },

    '&[data-is-dark="true"]::before': {
      transform: "translateX(8rem)",
    },
  },

  "@media": {
    [media.tablet]: {
      marginRight: "0",
      width: "9.25rem",
      height: "2.5rem",
      fontSize: vars.fontSize.md,

      selectors: {
        '&[data-is-dark="true"]::before': {
          transform: "translateX(6.75rem)",
        },
      },
    },
    [media.mobile]: {
      width: "7.25rem",
      height: "2rem",
      fontSize: vars.fontSize.sm,
      padding: "0 0.75rem",

      selectors: {
        '&[data-is-dark="true"]::before': {
          transform: "translateX(5.25rem)",
        },
      },
    },
  },
});
