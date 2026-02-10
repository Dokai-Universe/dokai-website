import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "9rem",
  columnGap: "1rem",
  marginBottom: "10rem",

  "@media": {
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
  gridTemplateRows: "auto 1fr",
  columnGap: "2rem",
  rowGap: "2rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
      rowGap: "1rem",
    },
    [media.tablet]: {
      columnGap: "1rem",
    },
  },
});

export const ProfileImage = style({
  gridRow: "1 / span 2",
  gridColumn: "1 / span 3",
  aspectRatio: "4 / 5",

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
  lineHeight: "1.33",
  alignSelf: "flex-end",
  rowGap: "0.5rem",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xs,
    },
    [media.mobile]: {
      gridTemplateColumns: "1fr",
      gridColumn: "1 / span 3",
      gridRow: "2",
      rowGap: "0",
      alignSelf: "flex-start",
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
  width: "fit-content",

  transition: "opacity 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },

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
  columnGap: "1rem",
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
      gridColumn: "1 / -1",
    },
  },
});

export const WorksGrid = style({
  gridColumn: "3 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",

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
  padding: "1rem",
  textAlign: "left",

  fontSize: vars.fontSize.lg,
});

// Experiences

export const ExperiencesContainer = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ExperiencesTitle = style({
  fontSize: vars.fontSize.md,
  gridColumn: "1 / span 1",

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
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.sm,
      gap: "1rem",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});
