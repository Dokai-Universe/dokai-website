import { media, vars } from "@styles/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const TransitionDurationVar = createVar();

export const Overlay = recipe({
  base: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 99999,
    overflow: "hidden",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "30px",

    transition: `background ${TransitionDurationVar} ease-in-out, backdropFilter ${TransitionDurationVar} ease-in-out`,

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
    isVisible: false,
  },
});

export const Layout = recipe({
  base: {
    background: vars.color.bg,
    borderRadius: "1rem",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: "24rem",

    transition: `transform ${TransitionDurationVar} ease-in-out, opacity ${TransitionDurationVar} ease-in-out`,

    padding: "1.5rem",
    paddingRight: "1.25rem",
    paddingBottom: "0",

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
    isVisible: {
      true: { transform: "translateY(0)", opacity: 1 },
      false: { transform: "translateY(100%)", opacity: 0 },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

export const Header = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    [media.tablet]: {
      paddingRight: "16px",
    },
    [media.mobile]: {
      paddingRight: "14px",
    },
  },
});

export const PrivateMark = style({
  top: "0 !important",
  right: "2rem !important",

  "@media": {
    [media.mobile]: {
      top: "-1.5rem !important",
      right: "0 !important",
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

export const Container = style({
  position: "sticky",
  gridColumn: "1 / span 3",
  fontSize: vars.fontSize.md,
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",
  height: "fit-content",
  top: `calc(2rem + var(--title-height))`,
  maxHeight: `calc(100dvh - 60px - 2rem - 1.5rem - var(--title-height) - 2rem)`,
  overflowX: "hidden",
  overflowY: "auto",
  paddingRight: "0.5rem",
  paddingBottom: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      rowGap: "1.5rem",
    },
  },

  selectors: {
    "&::-webkit-scrollbar": {
      width: "0.5rem",

      "@media": {
        [media.tablet]: {
          width: "8px",
        },
      },
    },
    "&::-webkit-scrollbar-track": {
      margin: "1rem 0 2rem",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
      borderRadius: "999px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.border,
    },
  },
});

export const Title = style({
  gridColumn: "1 / -1",
  zIndex: 10,
  fontSize: vars.fontSize.xl,

  selectors: {
    "&[data-stuck='true']": {
      opacity: "0",
    },
  },
});

export const Content = style({
  gridColumn: "1 / span 3",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentItem = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
});

export const ContentItemName = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.border,
  lineHeight: "1.83",
});

export const ContentItemText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "300",
});

export const ContentItemList = style({
  display: "flex",
  listStyle: "none",
  padding: "0",
  margin: "0",
  gap: "0.5rem",
});

export const ContentItemListItem = style({
  margin: "0",
  padding: "0.25em 0.5em",
  fontSize: vars.fontSize.sm,
  background: vars.color.bgSub,
  borderRadius: "0.25em",
  lineHeight: "1",
});

export const MediaContainer = style({
  position: "relative",
  gridColumn: "4 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      gap: "1rem",
    },
  },
});

export const Media = style({
  width: "100%",
  aspectRatio: "16 / 9",
});

// Edit

export const ThumbnailEditContainer = style({
  gridColumn: "1 / span 4",
  marginTop: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const InfoEditContainer = style({
  gridColumn: "5 / -2",
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      marginTop: "0",
    },
  },
});

export const TitleEditContainer = style({
  width: "100%",
});

export const PublishedEditContainer = style({
  width: "100%",
});

export const ContentEditButton = style({
  position: "absolute",
  right: "0",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  background: "white",
  margin: "0.5rem",
  opacity: "0.5",
  transition: "opacity 0.2s ease-in-out",
  border: "1px solid #999",
  backdropFilter: "blur(1rem)",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const EditMediaContainer = style({
  position: "relative",
  gridColumn: "4 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
      gap: "0.5rem",
    },
  },
});
