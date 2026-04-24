import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  padding: "1rem",
  paddingTop: "0rem",
  gap: "1rem",

  "@media": {
    [media.mobile]: {
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
  },
});

//

export const CalendarContainer = style({
  gridColumn: "span 5",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const CalendarHeader = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

export const CalendarHeaderButton = style({
  transition: "opacity 0.2s ease-in-out",
  opacity: 0.5,

  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const CalendarHeaderButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "black",
});

export const CalendarHeaderTitle = style({
  display: "flex",
  flexDirection: "column",
  width: "8rem",
});

export const CalendarHeaderTitleYear = style({
  fontSize: vars.fontSize.sm,
  textAlign: "center",
  border: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  lineHeight: "1.33",
  background: "transparent",
});

export const CalendarHeaderTitleMonth = style({
  fontSize: vars.fontSize.md,
  textAlign: "center",
  border: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  lineHeight: "1.33",
  background: "transparent",
});

export const CalendarBody = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const CalendarGridHeader = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.25rem",
});

export const CalendarGridHeaderItem = style({
  textAlign: "center",
  fontSize: vars.fontSize.xs,
  color: "#999",
});

export const CalendarGridBody = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  columnGap: "0.25rem",
  rowGap: "0.5rem",
});

export const CalendarGridBodyItem = style({
  opacity: 0.3,
  borderRadius: "999px",
  cursor: "pointer",
  width: "2rem",
  height: "2rem",
  fontSize: vars.fontSize.xs,
  justifySelf: "center",
  fontWeight: "normal",
  background: "transparent",
  border: "none",

  selectors: {
    "&[data-selected='true']": {
      color: "white",
      fontWeight: "bold",
      background: "#1976d2",
    },
    "&[data-in-month='true']": {
      opacity: 1,
    },
    "&[data-is-today='true']": {
      border: "2px dashed #1976d2",
    },
  },
});

// Option

export const OptionContainer = style({
  gridColumn: "span 3",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  lineHeight: "1.33",
  paddingLeft: "1rem",
  borderLeft: "1px solid #ddd",

  "@media": {
    [media.mobile]: {
      borderLeft: "none",
      paddingLeft: "0",
    },
  },
});

export const OptionTitle = style({
  fontSize: vars.fontSize.sm,
});

export const OptionSubTitle = style({
  fontSize: vars.fontSize.xs,
});

export const OptionPreviewContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const OptionPreview = style({
  fontSize: vars.fontSize.xs,
  border: "1px solid #999",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
});

export const OptionFormatContainer = style({
  height: "0",
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "auto",

  "@media": {
    [media.mobile]: {
      height: "auto",
      overflow: "unset",
    },
  },
});

export const OptionFormatItemContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const OptionFormatItemLabel = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid",
  borderColor: vars.color.lightGray,

  cursor: "pointer",
  fontSize: vars.fontSize.xs,

  selectors: {
    "&:has(input:checked)": {
      background: vars.color.bgSub,
    },
  },
});

export const OptionFormatItemInput = style({
  display: "none",
});

export const OptionFormatItemHint = style({
  fontSize: "0.625em",
  color: "#999",
});

export const OptionFormatZeroPadLabel = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.25rem",
  width: "fit-content",
});

export const OptionFormatPrecisionContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const OptionFormatSeparatorContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const OptionFormatItemDotSpaceLabel = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.25rem",
  width: "fit-content",
  fontSize: "0.75em",
});

export const ButtonContainer = style({
  display: "flex",
  gap: 8,
  justifyContent: "flex-end",
});
