import { darkThemeClass, media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const IntroContainer = style({
  gridColumn: "2 / -2",
  whiteSpace: "pre-line",

  fontWeight: "300",
  fontSize: vars.fontSize.md,
  marginBottom: "4rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "2 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

// Content

export const Content = recipe({
  base: {
    position: "relative",
    gridColumnEnd: "span 5",

    "@media": {
      [media.tablet]: {
        gridColumn: "1 / -1",
      },
    },
  },
  variants: {
    align: {
      LEFT: { gridColumnStart: "1" },
      RIGHT: { gridColumnStart: "2" },
    },
    size: {
      NORMAL: { gridColumnEnd: "span 5" },
      FULL: { gridColumn: "1 / -1" },
    },
  },
  defaultVariants: {
    align: "RIGHT",
    size: "NORMAL",
  },
});

export const ContentContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  rowGap: "3rem",
  columnGap: "1rem",

  alignItems: "flex-start",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  letterSpacing: "-0.03em",

  "@media": {
    [media.mobile]: {
      rowGap: "2rem",
      display: "flex",
      flexDirection: "column",
    },
  },
});

export const ContentName = recipe({
  base: {
    gridRowStart: "1",
    gridColumn: "span 1",
    lineHeight: "1.833",
  },
  variants: {
    align: {
      LEFT: { gridColumnStart: "5" },
      RIGHT: { gridColumnStart: "1" },
    },
  },
  defaultVariants: {
    align: "RIGHT",
  },
});

export const ContentText = style({
  gridColumn: "2 / -1",
  lineHeight: "1.667",
});

// Medias

export const MediasMedia = recipe({
  base: {
    width: "100%",
    height: "100%",
    gridRowStart: "1",
  },
  variants: {
    align: {
      LEFT: { gridColumnStart: "1" },
      RIGHT: { gridColumnStart: "2" },
    },
    size: {
      NORMAL: { gridColumnEnd: "span 4", aspectRatio: "16 / 9" },
      FULL: { gridColumn: "1 / -1", aspectRatio: "21 / 9" },
    },
  },
  defaultVariants: {
    align: "RIGHT",
    size: "NORMAL",
  },
});

// Group

export const GroupContainer = style({
  position: "relative",
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",

  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  lineHeight: "1.54",
  letterSpacing: "-0.03em",

  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const GroupContent = style({
  position: "relative",
  gridColumn: "span 1",
  display: "grid",
  gridTemplateColumns: "2fr 5fr",
  rowGap: "2rem",
  columnGap: "1rem",
  padding: "1rem",
  alignItems: "center",
  fontSize: vars.fontSize.sm,

  selectors: {
    "&:nth-child(odd)": {
      borderRight: `1px solid ${vars.color.fg}`,
    },
    "&:not(:first-child):not(:nth-child(2))": {
      borderTop: `1px solid ${vars.color.fg}`,
    },
  },

  "@media": {
    [media.mobile]: {
      border: "none !important",

      selectors: {
        "&:not(:first-child)": {
          borderTop: `1px solid ${vars.color.fg} !important`,
        },
      },
    },
  },
});

export const GroupTitle = style({
  fontWeight: "400",
  textAlign: "center",
});

export const GroupValues = style({
  listStyle: "none",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
  },
});

// Card

export const CardContainer = style({
  gridColumn: "2 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.mobile]: {
      gap: "2rem",
    },
  },
});

export const CardContent = style({
  gridColumn: "span 1",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  columnGap: "1rem",
  rowGap: "0.5rem",
  alignItems: "center",
  fontSize: vars.fontSize.sm,

  "@media": {
    [media.mobile]: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

export const CardIconContainer = style({
  gridColumn: "1 / span 1",
  position: "relative",
  width: "100%",
  height: "auto",
  aspectRatio: "5 / 3",
  overflow: "hidden",

  "@media": {
    [media.mobile]: {
      height: "4rem",
    },
  },
});

export const CardIcon = style({
  objectFit: "contain",

  selectors: {
    [`${darkThemeClass} &`]: {
      filter: "invert(1)",
    },
  },
});

export const CardTextContainer = style({
  position: "relative",
  gridColumn: "2 / -1",
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  gap: "0.5rem",
  justifyContent: "center",
  alignSelf: "center",
  height: "100%",

  "@media": {
    [media.mobile]: {
      textAlign: "center",
    },
  },
});

export const CardTitle = style({
  lineHeight: "1.25",
  fontWeight: "500",
});

export const CardText = style({
  lineHeight: "1.33",
  fontWeight: "300",
});

// Team

export const TeamContainer = style({
  position: "relative",
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1px auto",
  columnGap: "2rem",
  lineHeight: "2",
  letterSpacing: "-0.03em",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      display: "flex",
      flexDirection: "column",
      lineHeight: "1.5",
      paddingLeft: "0.5rem",
      borderLeft: "2px solid black",
    },
  },
});

export const TeamRole = style({
  gridColumn: "1",
  fontWeight: "500",
});

export const TeamDivider = style({
  gridColumn: "2",
  width: "100%",
  height: "100%",
  background: "#666",
  minHeight: "1rem",

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const TeamNames = style({
  display: "flex",
  flexWrap: "wrap",
  gridColumn: "3",
  fontWeight: "300",
  columnGap: "1rem",
  lineHeight: "1.667",
  marginTop: "0.25rem",

  "@media": {
    [media.mobile]: {
      marginBottom: "1rem",
    },
  },
});

// Edit

export const EditContentButtonContainer = recipe({
  base: {
    position: "absolute",
    display: "inline-flex",
    flexDirection: "column",
    top: "0",
    padding: "0.5rem",
    height: "100%",
    width: "5rem",
    alignItems: "center",
    gap: "1rem",

    "@media": {
      [media.tablet]: {
        position: "relative",
        left: "0",
        right: "0",
        flexDirection: "row",
        width: "100%",
        height: "auto",
      },
    },
  },
  variants: {
    align: {
      LEFT: { left: "100%" },
      RIGHT: { right: "100%" },
    },
  },
});

export const EditContentButton = style({
  width: "fit-content",
  padding: "0.25rem",
  borderRadius: "999px",
  flexShrink: "0",

  transition: "all 0.2s ease-in-out",
  opacity: "0.5",
  outline: `1px solid transparent`,
  border: "1px solid #999",

  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const EditContentButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const GroupEditButton = style({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
});

export const GroupAddButtonContainer = style({
  marginTop: "1rem",
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
});

export const EditMediasContainer = recipe({
  base: {
    position: "relative",
    gridRowStart: "1",
  },
  variants: {
    size: {
      NORMAL: { gridColumn: "span 4", aspectRatio: "16 / 9" },
      FULL: { gridColumn: "1 / -1", aspectRatio: "21 / 9" },
    },
  },
  defaultVariants: {
    size: "NORMAL",
  },
});

export const EditMediasAddMediaButton = style({
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "0.5rem",
  transition: "all 0.2s ease-in-out",
  opacity: "0.5",
  outline: `1px solid transparent`,
  border: "1px solid #999",

  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const EditMediasAddMediaButtonIcon = style({
  padding: "0.5rem",
  background: "#bbb",
  borderRadius: "999px",
  width: "3rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});

export const EditMediasButtonContainer = recipe({
  base: {
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
    right: "0.5rem",
    display: "flex",
    gap: "0.5rem",
    justifyContent: "space-between",
  },
  variants: {
    align: {
      LEFT: { flexDirection: "row" },
      RIGHT: { flexDirection: "row-reverse" },
    },
  },
  defaultVariants: {
    align: "RIGHT",
  },
});

export const EditMediasTopButton = style({
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out, outline-color 0.2s ease-in-out",
  border: "1px solid #999",
  outline: `1px solid transparent`,
  backdropFilter: "blur(1rem)",
  top: "0.5rem",
  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const EditMediasTopButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const EditMediasEditButton = style({
  position: "absolute",
  bottom: "0.5rem",
  right: "0.5rem",
});

export const TeamEditButton = style({
  position: "absolute",
  right: "0.5rem",
});
