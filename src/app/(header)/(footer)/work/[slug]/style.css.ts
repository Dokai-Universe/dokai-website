import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "6rem",
  columnGap: "1rem",
  padding: "2rem",
  marginBottom: "10rem",
});

// Header

export const HeaderGrid = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "2rem",
  columnGap: "1rem",
});

export const HeaderTitle = style({
  gridColumn: "1 / span 7",
  fontSize: vars.fontSize.xl,
  color: vars.color.border,
  fontWeight: "300",
  lineHeight: "1.33",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.lg,
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const HeaderMetaColumn = style({
  gridColumn: "1 / span 3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: "3rem",
  columnGap: "1rem",

  "@media": {
    [media.desktop]: {
      gridColumn: "1 / span 2",
    },
    [media.tablet]: {
      gridRow: "3",
      gridColumn: "1 / -1",
      flexDirection: "row",
    },
    [media.mobile]: {
      flexDirection: "column",
    },
  },
});

export const HeaderPrimaryMeta = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  flexShrink: "0",

  "@media": {
    [media.mobile]: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: "1",
    },
  },
});

export const HeaderDivider = style({
  borderBottom: "1px solid black",
  width: "6rem",
  marginTop: "0.775rem",
});

export const HeaderExtraInfoList = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: vars.fontSize.sm,

  "@media": {
    [media.tablet]: {
      alignItems: "flex-end",
      textAlign: "right",
    },
    [media.mobile]: {
      alignItems: "center",
      textAlign: "center",
    },
  },
});

export const HeaderExtraInfoItem = style({
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
});

export const HeaderExtraInfoTitle = style({
  fontWeight: "600",
});

export const HeaderExtraInfoContent = style({
  fontWeight: "300",
});

export const HeaderMediaContainer = style({
  gridColumn: "4 / span 5",
  aspectRatio: "16 / 9",

  "@media": {
    [media.desktop]: {
      gridColumn: "3 / span 6",
    },
    [media.tablet]: {
      gridRow: "2",
      gridColumn: "1 / -1",
    },
  },
});

// Key Visuals

export const KeyVisualsContainer = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: "2rem",
  columnGap: "3rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
    [media.mobile]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
});

export const KeyVisualsTitle = style({
  gridColumn: "1 / -1",
  fontSize: vars.fontSize.md,
  fontWeight: "500",
});

export const KeyVisualsMediaContainer = style({
  gridColumn: "span 1",
  aspectRatio: "16 / 9",
});

// Credits

export const CreditsContainer = style({
  gridColumn: "3 / -1",
  display: "grid",
  gridTemplateColumns: "2fr 2fr 5fr",
  columnGap: "3rem",

  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",

  "@media": {
    [media.desktop]: {
      gridTemplateColumns: "2fr 2fr 3fr",
    },
    [media.tablet]: {
      gridColumn: "1 / -1",
      fontSize: vars.fontSize.sm,
    },
    [media.mobile]: {
      gridTemplateColumns: "1fr auto",
      // fontSize: vars.fontSize.xs,
      fontSize: "14px",
    },
  },
});

export const CreditsTitle = style({
  color: vars.color.border,
});

export const CreditsTeamCell = style({
  gridColumn: "1 / span 1",
  fontWeight: "500",

  "@media": {
    [media.tablet]: {
      // fontSize: vars.fontSize.md,
      fontSize: "16px",
      gridColumn: "1 / span 2",
    },
  },
});

export const CreditsRoleCell = style({
  gridColumn: "2 / span 1",
  borderRight: "1px solid black",
  fontWeight: "500",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / span 1",
    },
  },
});

export const CreditsNameCell = style({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "1rem",
});

export const CreditsDivider = style({
  gridColumn: "1 / -1",
  height: "2rem",
});
