import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",

  marginBottom: "10rem",

  "@media": {
    [media.mobile]: {
      rowGap: "4rem",
    },
  },
});

// News

export const Content = style({
  display: "grid",
  gridColumn: "1 / -1",
  gridTemplateColumns: "repeat(3, 1fr)",
  rowGap: "2rem",
  columnGap: "2rem",

  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const NewsItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  cursor: "pointer",
  transition: "opacity 0.3s ease",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});

export const NewsItemMedia = style({
  width: "100%",
  background: "gray",
  aspectRatio: "3 / 2",
});

export const NewsItemContent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
  flexGrow: "1",
});

export const NewsItemHeader = style({
  display: "flex",
  flexDirection: "column",
});

export const NewsItemCategory = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "500",
});

export const NewsItemTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
});

export const NewsItemFooter = style({
  display: "flex",
  justifyContent: "space-between",
  color: "#9B9B9B",
});

export const NewsItemDate = style({
  fontSize: vars.fontSize.xs,
});

export const NewsItemView = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: vars.fontSize.xs,
});

export const NewsItemViewIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

export const Divider = style({
  width: "100%",
  height: "1px",
  background: "#9B9B9B",
  display: "none",
  gridColumn: "1 / -1",

  selectors: {
    "&:nth-child(6n)": {
      display: "block",
    },
  },

  "@media": {
    [media.tablet]: {
      selectors: {
        "&:nth-child(6n)": {
          display: "none",
        },
        "&:nth-child(4n)": {
          display: "block",
        },
      },
    },
    [media.mobile]: {
      selectors: {
        "&:nth-child(4n)": {
          display: "none",
        },
      },
    },
  },
});

//

export const Rect = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "2rem",
  height: "2rem",
  border: "1px solid #646363",
  color: "#646363",
  transition: "background 0.3s ease, color 0.3s ease",
  cursor: "pointer",

  selectors: {
    "&:not(:first-child)": {
      borderLeft: "none",
    },

    "&:first-child:hover, &:last-child:hover": {
      background: "#E9E9E9",
    },

    "&:hover": {
      color: "#000000",
    },

    "&[data-active='true']": {
      background: "#E9E9E9",
      color: "#000000",
    },
  },
});
