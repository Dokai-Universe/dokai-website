import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const Content = style({
  position: "relative",
  display: "grid",
  gridColumn: "1 / -1",
  gridTemplateColumns: "repeat(9, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.4583",
});

export const ContentTitle = style({
  gridColumn: "2",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / span 2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ContentText = style({
  gridColumn: "3 / -2",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
      marginBottom: "3.5rem",
    },
  },
});

export const EditContentRemoveButton = style({
  position: "absolute",
  top: "0",
  right: "0",
});

//

export const ProfileListContainer = recipe({
  base: {
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
  },
  variants: {
    isReadOnly: {
      true: {
        opacity: "0.5",
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    isReadOnly: false,
  },
});

export const ProfileListItem = style({
  gridColumn: "span 1",
  position: "relative",
  overflow: "hidden",
});

export const ProfileListItemImage = style({
  width: "100%",
  aspectRatio: "5 / 6",
});

export const ProfileListItemOverlay = style({
  padding: "1rem",

  fontSize: vars.fontSize.lg,
});

//

export const ProfileContainer = style({
  gridColumn: "2 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridTemplateRows: "1fr auto",
  rowGap: "1rem",
  columnGap: "2rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
    [media.tablet]: {
      gridTemplateRows: "auto 1fr",
    },
  },
});

export const ProfileMedia = style({
  gridColumn: "1 / span 3",
  gridRow: "1 / span 2",
  width: "100%",
  height: "auto",
  aspectRatio: "5 / 6 !important",

  "@media": {
    [media.tablet]: {
      gridRow: "1 / span 1",
    },
    [media.mobile]: {
      gridColumn: "1 / -3",
    },
  },
});

export const ProfileBio = style({
  gridColumn: "4 / span 4",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.tablet]: {
      gridRow: "1 / span 2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      gridRow: "3 / span 1",
    },
  },
});

export const ProfileContactContainer = style({
  gridColumn: "4 / span 4",
  fontSize: vars.fontSize.sm,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / span 3",
      gridRow: "2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      gridRow: "2",
    },
  },
});

export const ProfileContactItem = style({
  display: "flex",
  overflow: "hidden",
  gap: "0.5rem",
  alignItems: "center",
});

export const ProfileContactLabelContainer = style({
  width: "8rem",
  flexShrink: "0",

  "@media": {
    [media.tablet]: {
      width: "auto",
    },
  },
});

export const ProfileContactLabelIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
  display: "none",

  "@media": {
    [media.tablet]: {
      display: "block",
    },
  },
});

export const ProfileContactLabel = style({
  gridColumn: "1",
  marginRight: "1rem",

  "@media": {
    [media.tablet]: {
      display: "none",
    },
  },
});

export const ProfileContactValue = style({
  opacity: "1",
  transition: "opacity 0.2s",

  "@media": {
    [media.tablet]: {
      wordBreak: "break-word",
    },
  },

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});

// Project

export const ProjectContainer = recipe({
  base: {
    gridColumn: "2 / -1",
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    rowGap: "1rem",
    columnGap: "1rem",

    "@media": {
      [media.desktop]: {
        gridColumn: "1 / -1",
      },
    },
  },
  variants: {
    isReadOnly: {
      true: {
        opacity: "0.5",
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    isReadOnly: false,
  },
});

export const ProjectTitle = style({
  gridColumn: "1 / span 2",
  fontSize: vars.fontSize.md,

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ProjectContent = style({
  gridColumn: "3 / -2",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const ProjectMedia = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const ProjectOverlay = style({
  width: "100%",
  height: "100%",
  display: "flex",
  padding: "1rem",
  cursor: "pointer",
});

export const ProjectOverlayTitle = style({
  fontSize: vars.fontSize.xl,
  lineHeight: "1.33",
});

export const ProjectAddButton = style({
  width: "100%",
  height: "auto",
  aspectRatio: "1 / 1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",
  border: "2px solid #bbb",
  opacity: "0.4",
  borderRadius: "0.5rem",
  cursor: "pointer",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const ProjectAddButtonIcon = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
  width: "2.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});

//

export const ExperienceContainer = style({
  gridColumn: "2 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  rowGap: "1rem",
  columnGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / -1",
    },
    [media.tablet]: {
      gridTemplateColumns: "repeat(6, 1fr)",
    },
    [media.mobile]: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

export const ExperienceTitle = style({
  gridColumn: "1 / span 2",
  fontSize: vars.fontSize.md,
});

export const ExperienceContent = style({
  gridColumn: "3 / -2",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "3 / -1",
    },
  },
});

export const ExperienceItem = style({
  fontSize: vars.fontSize.md,
});

// EditInfo

export const EditInfoContainer = style({
  gridColumn: "2 / span 3",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / span 4",
    },
    [media.tablet]: {
      gridColumn: "1 / span 6",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const EditInfoEmailContainer = style({
  display: "flex",
  gap: "0.5rem",
  alignItems: "flex-start",
  width: "100%",
});

export const EditInfoEmailButton = style({
  marginTop: "calc(1.33em + 0.25em)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",
  border: "1px solid #999",
  borderRadius: "0.5rem",
  padding: "0.25rem 0.5rem",
  lineHeight: "1.33",

  transition: "opacity 0.2s",

  selectors: {
    "&:not(:disabled):hover": {
      opacity: "0.5",
    },
  },
});

// EditProfile

export const EditProfileMediaContainer = style({
  gridColumn: "1 / span 3",
  gridRow: "1 / span 2",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      gridRow: "1 / span 1",
    },
    [media.mobile]: {
      gridColumn: "1 / -3",
    },
  },
});

export const EditProfileMedia = style({
  width: "100%",
  height: "auto",
  aspectRatio: "5 / 6 !important",
});

export const EditProfileBioContainer = style({
  gridColumn: "4 / span 4",
  fontSize: vars.fontSize.md,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.tablet]: {
      gridRow: "1 / span 2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      gridRow: "3 / span 1",
    },
  },
});

export const EditProfileContactContainer = style({
  gridColumn: "4 / span 4",
  fontSize: vars.fontSize.sm,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / span 3",
      gridRow: "2",
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
      gridRow: "2",
    },
  },
});

export const EditProfileContactValueContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
});

// EditExperience

export const EditExperienceItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: vars.fontSize.md,
});
