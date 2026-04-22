import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const SearchBarContainer = style({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
  marginBottom: "8rem",

  selectors: {
    "&[data-disabled='true']": {
      pointerEvents: "none",
      opacity: "0.5",
    },
  },

  "@media": {
    [media.mobile]: {
      marginBottom: "4rem",
    },
  },
});

export const SearchBarLabel = style({
  background: "#E8E8E8",
  padding: "0.75rem 1.25rem",
  borderRadius: "999px",
  display: "flex",
  alignItems: "center",
  maxWidth: "560px",
  width: "100%",

  "@media": {
    [media.mobile]: {
      padding: "0.5rem 1rem",
    },
  },
});

export const SearchBarInput = style({
  fontSize: vars.fontSize.md,
  border: "none",
  outline: "none",
  background: "transparent",
  flexGrow: "1",
  minWidth: "0",
  padding: "0 0.5rem",
});

export const SearchBarIcon = style({
  stroke: "#646363",
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
  cursor: "pointer",
});

//

export const Header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #9B9B9B",
  paddingBottom: "0.75rem",
  fontWeight: "500",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const HeaderCategory = style({
  display: "flex",
  gap: "0.75rem",
});

export const HeaderCategoryItem = style({
  color: "#9B9B9B",

  selectors: {
    "&[data-active='true']": {
      color: "#000000",
      fontWeight: "600",
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
  gap: "1rem",
  color: "#9B9B9B",
});

export const HeaderInfoDate = style({});

export const HeaderInfoView = style({
  display: "flex",
  gap: "0.25rem",
  alignItems: "center",
});

export const HeaderInfoViewIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",

  "@media": {
    [media.mobile]: {
      width: "1rem",
    },
  },
});

//

export const Body = style({
  margin: "0 4rem",
  marginBottom: "10rem",

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
      fontSize: vars.fontSize.xl,
    },
    [media.mobile]: {
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
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const BodyChapterTitle = style({
  fontSize: vars.fontSize.xl,
  fontWeight: "500",

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.md,
    },
  },
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
  width: "60% !important",
  aspectRatio: "16 / 9",

  "@media": {
    [media.tablet]: {
      width: "80% !important",
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

export const ExternalLinkContainer = style({
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

export const ExternalLinkContent = style({
  gridColumn: "1 / -4",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1rem",
});

export const ExternalLinkContentTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: "500",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const ExternalLinkContentDescription = style({
  fontSize: vars.fontSize.sm,
  color: "#9B9B9B",
  fontWeight: "300",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export const ExternalLinkContentFooter = style({
  marginTop: "auto",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
});

export const ExternalLinkContentFooterIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  flexShrink: "0",
});

export const ExternalLinkContentFooterUrl = style({
  fontSize: vars.fontSize.sm,
  color: "#9B9B9B",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const ExternalLinkImage = style({
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

  "@media": {
    [media.mobile]: {
      fontSize: vars.fontSize.sm,
    },
  },
});

export const FooterItem = style({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  color: "#9B9B9B",
});

export const FooterItemTitle = style({
  fontWeight: "500",
  color: "black",
});

//

export const ListButtonContainer = style({
  display: "flex",
  justifyContent: "center",
  gridColumn: "1 / -1",
  marginTop: "6rem",
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

export const EditHeaderContainer = style({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
  marginTop: "2rem",
});

export const EditHeaderInput = style({
  gridColumn: "1 / -2",
  fontSize: vars.fontSize.xl,
  fontWeight: "600",
});

export const EditBodyChapterContentMedia = style({
  width: "100%",
  aspectRatio: "16 / 9",
});

//

export const EditContentButton = style({
  position: "absolute",
  top: "-0.25rem",
  right: "0",
  width: "fit-content",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  flexShrink: "0",

  transition: "all 0.2s ease-in-out",
  opacity: "0.5",
  outline: `1px solid transparent`,
  border: "1px solid #999",

  selectors: {
    "&:hover": {
      opacity: "1",
      outlineColor: "#999",
    },
  },
});

export const EditChapterButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const EditContentButtonIcon = style({
  width: "1rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const DragHandle = style({
  position: "absolute",
  left: "-36px",
  top: "12px",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  cursor: "grab",
  zIndex: 2,
});

export const DragHandleActive = style({
  cursor: "grabbing",
});

export const ChapterWrapper = style({
  position: "relative",
});

export const ContentWrapper = style({
  position: "relative",
});
