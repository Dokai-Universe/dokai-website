import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "var(--drawer-bg)",
  color: "black",
  transform: "translateY(25%)",
  opacity: 0,
  pointerEvents: "none",
  zIndex: "2",
  transition: "transform 250ms ease, opacity 250ms ease",
  willChange: "transform",
  background: "white",
  overflow: "auto",
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",

  selectors: {
    '&[data-open="true"]': {
      transform: "translateY(0%)",
      opacity: 1,
      pointerEvents: "auto",
    },
  },

  "@media": {
    [media.mobile]: {
      zIndex: "1",
    },
  },
});

export const Header = style({
  padding: "2rem",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",

  "@media": {
    [media.mobile]: {
      marginTop: "8rem",
    },
  },
});

export const HeaderTitle = style({
  gridColumn: "3",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1",
    },
  },
});

export const HeaderCloseButton = style({
  gridColumn: "8",
  marginLeft: "auto",
  height: "2rem",
  width: "auto",
  aspectRatio: "1 / 1",
  cursor: "pointer",
  background: "transparent",
  border: "none",
});

export const HeaderCloseIcon = style({
  stroke: vars.color.fg,
});

export const InputContainer = style({
  padding: "2rem",
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  transition: "margin 0.3s ease-in-out",
  marginTop: `calc((100dvh - 7rem) / 2 - var(--input-container-height) / 2)`,

  selectors: {
    '&[data-has-query="true"]': {
      marginTop: "0",
    },
  },
});

// Input

export const InputForm = style({
  gridColumn: "3 / span 4",
  display: "flex",
  alignItems: "center",
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: "0.75rem",
  gap: "0.75rem",
  flexWrap: "wrap",

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const InputLabel = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  flexGrow: "1",
});

export const Input = style({
  width: "100%",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  border: "none",
  outline: "none",
  flexGrow: "1",
});

export const InputSearchIcon = style({
  width: "2rem",
  height: "2rem",
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
  background: vars.color.lightGray,
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
  gridColumn: "3 / span 4",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  padding: "2rem 0",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Tag = style({
  padding: "0.25rem 1rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",
  overflow: "hidden",
  background: vars.color.lightGray,
  borderRadius: vars.radius.full,
  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});

export const TagText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

export const Result = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, minmax(0px, 1fr))",
  padding: "2rem",
  columnGap: "1rem",
  rowGap: "4rem",
});

export const FilterTitle = style({
  gridColumn: "3",
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
  letterSpacing: "0.04rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / span 2",
    },
  },
});

export const FilterGroup = style({
  gridColumn: "4 / -1",
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "5 / span 2",
    },
    [media.tablet]: {
      gridColumn: "5 / -1",
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
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

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

export const ResultItemImageContainer = style({
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
