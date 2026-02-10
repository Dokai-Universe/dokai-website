import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  padding: "2rem",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.4583",
  marginBottom: "10rem",

  "@media": {
    [media.mobile]: {
      rowGap: "1rem",
    },
  },
});

export const Title = style({
  gridColumn: "2",

  "@media": {
    [media.tablet]: {
      gridColumn: "1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const Copy = style({
  gridColumn: "3 / -2",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      marginBottom: "3.5rem",
    },
  },
});

export const ProfileContainer = style({
  gridColumn: "3 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const ProfileItem = style({
  gridColumn: "span 1",
  position: "relative",
  overflow: "hidden",
});

export const ProfileItemImage = style({
  width: "100%",
  aspectRatio: "1 / 1",
});

export const ProfileItemOverlay = style({
  position: "absolute",
  inset: "0",
  padding: "1rem",

  backgroundColor: "var(--bg-color)",
  color: "var(--fg-color)",
  opacity: "0",
  transform: "translateY(30%)",
  backdropFilter: "blur(10px)",
  fontSize: vars.fontSize.lg,
  textAlign: "left",

  transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
});

globalStyle(`${ProfileItem}:hover ${ProfileItemOverlay}`, {
  opacity: "1",
  transform: "translateY(0)",
});
