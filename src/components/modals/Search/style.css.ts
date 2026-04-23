import { media, vars } from "@styles/theme.css";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";

export const Overlay = style({
  position: "fixed",
  inset: 0,
  transform: "translateY(25%)",
  opacity: 0,
  pointerEvents: "none",
  zIndex: "102",
  transition: "transform 250ms ease, opacity 250ms ease",
  willChange: "transform",
  background: vars.color.bg,
  overflow: "auto",
  minHeight: "100dvh",
  scrollbarGutter: "stable",

  selectors: {
    '&[data-open="true"]': {
      transform: "translateY(0%)",
      opacity: 1,
      pointerEvents: "auto",
    },
  },

  "@media": {
    [media.mobile]: {
      zIndex: "101",
    },
  },
});

export const Grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  columnGap: "1rem",
  marginBottom: "auto",
});

// Header

export const Header = style({
  gridColumn: "3 / -1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      marginTop: "4rem",
    },
  },
});

export const HeaderTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  letterSpacing: "0.04rem",
});

export const HeaderCloseButton = style({
  width: "2rem",
  height: "auto",
  aspectRatio: "1 / 1",
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const HeaderCloseIcon = style({
  stroke: vars.color.fg,
});

// Input

export const InputContainer = style({
  position: "relative",
  gridColumn: "3 / span 4",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0px, 1fr))",
  marginTop: `max((100dvh - 10rem) / 2 - var(--input-container-height) / 2, 6rem)`,

  selectors: {
    '&[data-has-query="true"]': {
      marginTop: "6rem",
    },
  },

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",

      marginTop: `max((100dvh - 10rem) / 2 - var(--input-container-height) / 2, 2rem)`,
      selectors: {
        '&[data-has-query="true"]': {
          marginTop: "2rem",
        },
      },
    },
  },
});

export const InputForm = style({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  flexWrap: "wrap",
  marginBottom: "2rem",
  background: vars.color.input,
  padding: "0.5rem 1rem",
  paddingLeft: "0.5rem",
  borderRadius: "999px",

  "@media": {
    [media.mobile]: {
      padding: "0",
      background: "transparent",
      rowGap: "0.5rem",
    },
  },
});

export const InputLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  flexGrow: "1",

  "@media": {
    [media.mobile]: {
      background: vars.color.input,
      padding: "0.5rem 1rem",
      borderRadius: "999px",
      width: "100%",
    },
  },
});

export const Input = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  border: "none",
  outline: "none",
  flexShrink: "1",
  width: "7rem",
  flexGrow: "1",
  background: "transparent",
  marginLeft: "0.5rem",

  selectors: {
    "&::placeholder": {
      opacity: "0.75",
    },
  },
});

globalStyle(`${InputContainer}[data-has-query="true"] ${Input}`, {
  marginLeft: "0rem",
});

export const InputSearchIcon = style({
  width: "1.75rem",
  height: "1.75rem",
  stroke: vars.color.fg,
  flexShrink: "0",
  cursor: "pointer",

  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});

// Query

export const Query = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  overflow: "hidden",
  background: vars.color.bgSub,
  borderRadius: vars.radius.full,
  transition: "opacity 0.2s ease-in-out",
  flexShrink: "0",
  padding: "0.25rem 1rem",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});

export const QueryText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const QueryIcon = style({
  width: "0.875em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
  flexShrink: "0",
});

// Tag

export const TagContainer = style({
  gridColumn: "1 / -1",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  transition: "opacity 0.5s ease-in-out",
  margin: "0 1rem",

  selectors: {
    '&[data-has-query="true"]': {
      opacity: "0",
      pointerEvents: "none",
      height: "0",
    },
  },

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -2",
    },
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Tag = style({
  padding: "0.25rem 1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  overflow: "hidden",
  background: vars.color.bg,
  borderRadius: vars.radius.full,
  transition:
    "background 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out, border-color 0.2s ease-in-out",
  border: `1px solid ${vars.color.fg}`,

  selectors: {
    "&:hover": {
      background: "var(--tag-hover-bg)",
      color: "var(--tag-hover-fg)",
      opacity: "0.5",
      borderColor: "var(--tag-hover-bg)",
    },
  },
});

export const TagText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  letterSpacing: "0.04rem",
});

export const TagIcon = style({
  width: "0.875em",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: vars.color.fg,
  flexShrink: "0",
  strokeWidth: "2px",
});

// Result

const up = keyframes({
  from: {
    opacity: "0",
    transform: "translateY(10rem)",
  },
  to: {
    opacity: "1",
    transform: "translateY(0)",
  },
});

export const ResultContainer = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(6, minmax(0px, 1fr))",
  columnGap: "1rem",
  rowGap: "4rem",
  marginTop: "4rem",
  animation: `${up} .5s ease-in-out`,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

// Filter

export const FilterTitle = style({
  gridColumn: "1 / span 2",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  color: vars.color.border,

  "@media": {
    [media.mobile]: {
      // gridColumn: "1 / span 1",
    },
  },
});

export const FilterGroup = style({
  gridColumn: "3 / -1",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "3 / span 2",
    },
    [media.mobile]: {
      gridColumn: "3 / -1",
    },
  },
});

export const Filter = style({
  padding: "0.125rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  transition: "opacity 0.2s ease-in-out",
  borderBottomColor: "transparent",
  borderBottomWidth: "1.5px",
  borderBottomStyle: "solid",

  selectors: {
    "&:hover:not(:has(input:disabled))": {
      opacity: "0.5",
    },

    "&:has(input:checked)": {
      borderBottomColor: vars.color.border,
    },

    "&:not(:has(input:disabled))": {
      cursor: "pointer",
    },

    "&:has(input:disabled)": {
      color: vars.color.border,
    },
  },
});

export const FilterInput = style({
  width: "1rem",
  height: "1rem",
  accentColor: vars.color.fg,
  display: "none",
});

export const FilterText = style({
  whiteSpace: "nowrap",
});

// ResultGroup

export const ResultGroup = style({
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ResultGroupTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "400",
  letterSpacing: "0.04rem",
});

export const ResultItemGroup = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0px, 1fr))",
  columnGap: "1rem",
  rowGap: "3rem",
  marginBottom: "1rem",

  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, minmax(0px, 1fr))",
    },
  },
});

export const ResultItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  cursor: "pointer",
  position: "relative",
});

export const ResultItemMedia = style({
  width: "100%",
  height: "auto",
  aspectRatio: "6 / 7",
  overflow: "hidden",

  fontSize: vars.fontSize.lg,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  textAlign: "left",
  lineHeight: "1.33em",

  "@media": {
    [media.tablet]: {
      aspectRatio: "4 / 3",
    },
  },
});

export const ResultItemMediaOverlay = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "500",
  letterSpacing: "0.04rem",
  textAlign: "left",
  lineHeight: "1.5em",
  padding: "1rem",
  color: "white",
});

export const ResultItemText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  transition: "opacity 0.2s ease-in-out",
  textAlign: "left",
});

globalStyle(`${ResultItem}:hover > p`, {
  opacity: 0.5,
});
