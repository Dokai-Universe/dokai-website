import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  marginTop: "10rem",
  marginBottom: "9rem",
  padding: "2rem",
  rowGap: "9rem",
  columnGap: "1rem",

  "@media": {
    [media.desktop]: {
      marginTop: "0",
    },
    [media.tablet]: {
      rowGap: "6rem",
    },
  },
});

// Profile

export const ProfileContainer = style({
  gridColumn: "2 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  columnGap: "3rem",
  rowGap: "2rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
      rowGap: "1rem",
    },
  },
});

export const ProfileImage = style({
  gridRow: "1 / span 2",
  gridColumn: "1 / span 3",
  aspectRatio: "1 / 1",

  "@media": {
    [media.mobile]: {
      gridRow: "1",
    },
  },
});

export const ProfileIntroduce = style({
  gridColumn: "4 / -1",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridRow: "1 / span 2",
    },
  },
});

export const ProfileContactGrid = style({
  gridColumn: "4 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: "2rem",
  fontSize: vars.fontSize.sm,

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
    [media.mobile]: {
      gridTemplateColumns: "1fr",
      gridColumn: "1 / span 3",
      gridRow: "2",
    },
  },
});

export const ProfileContactName = style({
  "@media": {
    [media.mobile]: {
      fontWeight: "500",
    },
  },
});

export const ProfileContactValue = style({
  wordBreak: "break-word",

  "@media": {
    [media.mobile]: {
      marginBottom: "0.5rem",
    },
  },
});

// Works

export const WorksContainer = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  columnGap: "3rem",
  rowGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
  },
});

export const WorksTitle = style({
  fontSize: vars.fontSize.md,
  gridColumn: "1 / span 2",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -2",
    },
  },
});

export const WorksGrid = style({
  gridColumn: "3 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "2rem",
  rowGap: "2rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const WorksItem = style({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
});

export const WorksItemImage = style({
  aspectRatio: "1 / 1",
});

export const WorksItemOverlay = style({
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

globalStyle(`${WorksItem}:hover ${WorksItemOverlay}`, {
  opacity: "1",
  transform: "translateY(0)",
});

// Experiences

export const ExperiencesContainer = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  columnGap: "3rem",
  rowGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ExperiencesTitle = style({
  fontSize: vars.fontSize.md,
  gridColumn: "1 / span 2",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ExperiencesList = style({
  gridColumn: "3 / -2",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});
