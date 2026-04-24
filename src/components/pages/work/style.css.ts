import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// Header

export const HeaderContainer = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "2rem",
  columnGap: "3rem",

  "@media": {
    [media.tablet]: {
      rowGap: "1rem",
      columnGap: "1rem",
    },
  },
});

export const HeaderTitle = style({
  gridColumn: "1 / span 7",
  fontSize: vars.fontSize.xxl,
  fontWeight: "400",
  lineHeight: "1.33",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.xl,
    },
    [media.mobile]: {
      fontSize: vars.fontSize.lg,
      gridColumn: "1 / -1",
    },
  },
});

export const HeaderBody = recipe({
  base: {
    gridColumn: "1 / span 3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: "3rem",
    columnGap: "1rem",

    "@media": {
      [media.mobile]: {
        flexDirection: "column",
        rowGap: "2rem",
      },
    },
  },
  variants: {
    isShortForm: {
      true: {
        "@media": {
          [media.tablet]: {
            gridRow: "2",
            gridColumn: "1 / span 4",
            flexDirection: "column",
          },
          [media.mobile]: {
            gridRow: "3",
            gridColumn: "1 / -1",
          },
        },
      },
      false: {
        "@media": {
          [media.tablet]: {
            gridColumn: "1 / -1",
            flexDirection: "row",
          },
        },
      },
    },
  },
  defaultVariants: {
    isShortForm: false,
  },
});

export const HeaderInfo = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.md,
  fontWeight: "500",

  "@media": {
    [media.mobile]: {
      justifyContent: "center",
      alignItems: "center",
      flexGrow: "1",
      textAlign: "center",
    },
  },

  selectors: {
    "&::after": {
      content: '""',
      height: "1px",
      width: "6rem",
      background: vars.color.fg,
      marginTop: "0.75rem",
    },
  },
});

export const HeaderMetaList = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: vars.fontSize.sm,

    "@media": {
      [media.mobile]: {
        gap: "0.5rem",
        alignItems: "center",
        textAlign: "center",
      },
    },
  },
  variants: {
    isShortForm: {
      true: {},
      false: {
        "@media": {
          [media.tablet]: {
            alignItems: "flex-end",
            textAlign: "right",
          },
        },
      },
    },
  },
  defaultVariants: {
    isShortForm: false,
  },
});

export const HeaderMetaItem = style({
  position: "relative",
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
});

export const HeaderMetaName = style({
  fontWeight: "600",
});

export const HeaderMetaValue = style({
  fontWeight: "300",
});

export const HeaderMediaContainer = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  variants: {
    isShortForm: {
      true: {
        gridColumn: "5 / -2",
        "@media": {
          [media.tablet]: {
            gridColumn: "5 / -1",
          },
          [media.mobile]: {
            gridColumn: "1 / -1",
            gridRow: "2",
          },
        },
      },
      false: {
        gridColumn: "4 / -1",
        "@media": {
          [media.tablet]: {
            gridRow: "2",
            gridColumn: "1 / -1",
          },
        },
      },
    },
  },
  defaultVariants: {
    isShortForm: false,
  },
});

export const HeaderMedia = recipe({
  base: {
    width: "100%",
    height: "auto",
    aspectRatio: "16 / 9",
  },
  variants: {
    isShortForm: {
      true: {
        aspectRatio: "9 / 16",
      },
    },
  },
  defaultVariants: {
    isShortForm: false,
  },
});

// export const HeaderMedia = style({
//   width: "100%",
//   height: "auto",
//   aspectRatio: "16 / 9",

//   // width: "100%",
//   // // width: "fit-content",
//   // aspectRatio: "9 / 16",
//   // justifySelf: "flex-end",
// });

// KeyVisuals

export const KeyVisualsContainer = style({
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const KeyVisualsTitle = style({
  fontSize: vars.fontSize.md,
  color: "#424242",
  fontWeight: "500",
  lineHeight: "1.5",
});

export const KeyVisualsMediaContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: "1rem",
  columnGap: "1.5rem",

  "@media": {
    [media.tablet]: {
      columnGap: "1rem",
    },
  },
});

export const KeyVisualsMedia = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.lg,
    },
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

// Credits

export const CreditsContainer = style({
  gridColumn: "3 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",

  "@media": {
    [media.tablet]: {
      gridColumn: "1 / -1",
    },
  },
});

export const CreditsTitle = style({
  fontSize: vars.fontSize.md,
  color: "#9D9D9D",
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
});

export const CreditsContent = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto auto 1px auto",
  columnGap: "2rem",
  fontSize: vars.fontSize.md,
  fontWeight: "300",
  lineHeight: "1.83",
  letterSpacing: "-0.03em",
  alignItems: "flex-start",

  "@media": {
    [media.tablet]: {
      columnGap: "1.5rem",
    },
    [media.mobile]: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      fontSize: vars.fontSize.sm,
    },
  },
});

export const CreditsTeam = style({
  gridColumn: "1",
  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.md,
      lineHeight: "2.0",
    },
  },

  selectors: {
    "&:not(:first-child)": {
      marginTop: "1.5rem",
      "@media": {
        [media.mobile]: {
          marginTop: "1rem",
        },
      },
    },
  },
});

export const CreditsRole = style({
  gridColumn: "2",
  fontWeight: "500",
});

export const CreditDivider = style({
  gridColumn: "3",
  width: "100%",
  height: "100%",
  background: "#666",
  minHeight: "1rem",

  "@media": {
    [media.mobile]: {
      display: "none",
    },
  },
});

export const CreditsNames = style({
  gridColumn: "4",
  display: "flex",
  flexWrap: "wrap",
  columnGap: "1rem",
  lineHeight: "1.667",
  marginTop: "0.25rem",
});

// EditInfo

export const EditInfoContainer = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
});

export const EditInfoMediaContainer = style({
  gridColumn: "1 / span 4",
});

export const EditInfoMedia = style({
  aspectRatio: "16 / 9",
});

export const EditInfoContent = style({
  gridColumn: "5 / -2",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const EditInfoTextArea = style({
  flexGrow: "1",
});

export const EditInfoPublished = style({
  gridColumn: "1 / -2",
});

//

export const EditHeaderMetaTitle = style({
  fontSize: "1.25rem",
  lineHeight: "1.2",
  letterSpacing: "0.04em",
});

export const EditHeaderMetaEditButton = style({
  position: "absolute",

  top: "0",
  right: "0",
});

export const EditHeaderMetaItemContainer = style({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const EditHeaderMetaAddButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  width: "100%",
  minWidth: "10rem",
});

export const EditCreditEditButton = style({
  position: "absolute",

  right: "0",
});

export const EditCreditAddButton = style({
  marginTop: "1rem",
  gridColumn: "1 / -1",
});
