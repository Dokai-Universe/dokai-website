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

export const Content = style({
  gridColumn: "1 / -1",
});

//

export const Header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #9B9B9B",
  padding: "0.5rem 0",
});

export const HeaderCategory = style({
  display: "flex",
  gap: "0.75rem",
});

export const HeaderCategoryItem = style({
  fontSize: vars.fontSize.sm,
  color: "#9B9B9B",

  selectors: {
    "&[data-active='true']": {
      color: "#000000",
      fontWeight: "500",
    },
  },
});

export const HeaderInfo = style({
  display: "flex",
  gap: "0.75rem",
  fontSize: vars.fontSize.xs,
  color: "#9B9B9B",
});

export const HeaderInfoDate = style({});

export const HeaderInfoView = style({
  display: "flex",
  gap: "0.25rem",
  alignItems: "center",
});

export const HeaderInfoViewIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

//

export const Body = style({
  margin: "0 4rem",
});

export const BodyTitle = style({
  width: "100%",
  padding: "3rem 0",
  textAlign: "center",
  fontSize: vars.fontSize.xl,
  fontWeight: "600",
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
  gap: "1.5rem",
});

export const BodyChapterTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "500",
});

export const BodyChapterContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const BodyChapterContentText = style({
  fontSize: vars.fontSize.sm,
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
});

export const BodyChapterContentMediaCaption = style({
  fontSize: vars.fontSize.xs,
  color: "#000000",
});

//

export const LinkOgData = style({
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  gap: "1rem",
  marginTop: "3rem",
  border: "1px solid #000000",
  cursor: "pointer",
  transition: "all 0.2s ease",

  selectors: {
    "&:hover": {
      opacity: "0.75",
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
  fontSize: vars.fontSize.xs,
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
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

export const LinkOgDataContentFooterUrl = style({
  fontSize: vars.fontSize.xxs,
  color: "#9B9B9B",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const LinkOgDataImage = style({
  gridColumn: "span 3",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
});

//

export const Footer = style({
  display: "flex",
  gap: "3rem",
  marginTop: "3rem",
  gridColumn: "1 / -1",
  borderBottom: "1px solid #9B9B9B",
  padding: "1rem 0",
});

export const FooterItem = style({
  display: "flex",
  gap: "1rem",
  color: "#9B9B9B",
});

export const FooterItemTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "500",
  color: "black",
});

export const ListButtonContainer = style({
  display: "flex",
  justifyContent: "center",
  gridColumn: "1 / -1",
});

export const ListButton = style({
  padding: "0.5rem 2rem",
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
