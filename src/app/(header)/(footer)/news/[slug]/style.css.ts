import { media, vars } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  rowGap: "8rem",
  columnGap: "1rem",

  marginBottom: "10rem",

  "@media": {
    [media.mobile]: {
      rowGap: "4rem",
    },
  },
});

export const Content = style({
  gridColumn: "1 / -1",
});

//

export const Header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #9B9B9B",
  paddingBottom: "0.75rem",
});

export const HeaderCategory = style({
  display: "flex",
  gap: "0.75rem",
});

export const HeaderCategoryItem = style({
  fontSize: vars.fontSize.md,
  color: "#9B9B9B",

  selectors: {
    "&[data-active='true']": {
      color: "#000000",
      fontWeight: "500",
    },
  },

  "@media": {
    [media.mobile]: {
      selectors: {
        "&[data-active='false']": {
          display: "none",
        },
      },
    },
  },
});

export const HeaderInfo = style({
  display: "flex",
  gap: "0.75rem",
  fontSize: vars.fontSize.md,
  color: "#9B9B9B",
});

export const HeaderInfoDate = style({});

export const HeaderInfoView = style({
  display: "flex",
  gap: "0.25rem",
  alignItems: "center",
});

export const HeaderInfoViewIcon = style({
  width: "1.75rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

//

export const Body = style({
  margin: "0 4rem",

  "@media": {
    [media.tablet]: {
      margin: "0 1rem",
    },
    [media.mobile]: {
      margin: "0",
    },
  },
});

export const BodyTitle = style({
  width: "100%",
  padding: "3rem 0",
  textAlign: "center",
  fontSize: vars.fontSize.xxl,
  fontWeight: "600",

  "@media": {
    [media.tablet]: {
      fontSize: vars.fontSize.lg,
    },
  },
});

export const BodyContent = style({
  padding: "4rem 0",
  display: "flex",
  flexDirection: "column",
  gap: "4.5rem",
  borderTop: "1px solid #9B9B9B",
  borderBottom: "1px solid #9B9B9B",
});

export const BodyChapter = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const BodyChapterTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: "500",
});

export const BodyChapterContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

export const BodyChapterContentText = style({
  fontSize: vars.fontSize.md,
  fontWeight: "300",
});

export const BodyChapterContentMediaContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
});

export const BodyChapterContentMedia = style({
  width: "60%",
  height: "auto",
  aspectRatio: "16 / 9",

  "@media": {
    [media.tablet]: {
      width: "80%",
    },
    [media.mobile]: {
      width: "100%",
    },
  },
});

export const BodyChapterContentMediaCaption = style({
  fontSize: vars.fontSize.sm,
  color: "#000000",
});

//

export const LinkOgData = style({
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  marginTop: "3rem",
  border: "1px solid #000000",
  cursor: "pointer",
  transition: "all 0.2s ease",

  selectors: {
    "&:hover": {
      opacity: "0.75",
    },
  },

  "@media": {
    [media.desktop]: {
      gridTemplateColumns: "repeat(8, 1fr)",
    },
    [media.tablet]: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },
    [media.mobile]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
});

export const LinkOgDataContent = style({
  gridColumn: "1 / -4",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1rem",
});

export const LinkOgDataContentTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const LinkOgDataContentDescription = style({
  fontSize: vars.fontSize.sm,
  color: "#9B9B9B",
  fontWeight: "300",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export const LinkOgDataContentFooter = style({
  marginTop: "auto",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const LinkOgDataContentFooterIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

export const LinkOgDataContentFooterUrl = style({
  fontSize: vars.fontSize.sm,
  color: "#9B9B9B",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const LinkOgDataImage = style({
  gridColumn: "span 3",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  aspectRatio: "16 / 9",
});

//

export const Footer = style({
  display: "flex",
  columnGap: "4.5rem",
  marginTop: "1rem",
  gridColumn: "1 / -1",
  borderBottom: "1px solid #9B9B9B",
  padding: "1rem 0",
  flexWrap: "wrap",
});

export const FooterItem = style({
  fontSize: vars.fontSize.md,
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  color: "#9B9B9B",
});

export const FooterItemTitle = style({
  fontWeight: "500",
  color: "black",
});

export const ListButtonContainer = style({
  display: "flex",
  justifyContent: "center",
  gridColumn: "1 / -1",
});

export const ListButton = style({
  fontSize: vars.fontSize.md,
  padding: "0.5rem 2rem",
  width: "200px",
  border: "1px solid #646363",
  cursor: "pointer",
  transition: "all 0.2s ease",
  background: "#E9E9E9",

  selectors: {
    "&:hover": {
      opacity: "0.5",
    },
  },
});
