import { globalStyle, style } from "@vanilla-extract/css";

export const Scroll = style({
  overflow: "auto",
  scrollbarGutter: "stable",
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0.5rem 0",
});

export const MediaContainer = style({
  position: "relative",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: "0.5rem",
  flexShrink: "0",
  outlineOffset: "-2px",
  outline: "2px solid transparent",
  transition: "outline .2s ease-in-out",

  selectors: {
    '&[data-selected="true"]': {
      outline: "2px solid #999",
    },
    "&:hover": {
      outline: "2px solid #999",
    },
  },
});

export const Media = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 0.2s",
});

export const DeleteButton = style({
  position: "absolute",
  top: "0",
  right: "0",
  background: "white",
  borderRadius: "0.5rem",
  padding: "0.25rem",
  margin: "0.5rem",
  opacity: "0",
  transition: "opacity 0.2s",
});

export const DeleteButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "#666",
});

globalStyle(`${MediaContainer}:hover ${Media}`, {
  opacity: "0.7",
});

globalStyle(`${MediaContainer}[data-selected="true"] ${Media}`, {
  opacity: "0.7",
});

globalStyle(`${MediaContainer}:hover ${DeleteButton}`, {
  opacity: "0.7",
});

globalStyle(`${MediaContainer}:hover ${DeleteButton}:hover`, {
  opacity: "1",
});

export const AddButonContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #bbb",
  opacity: "0.4",
  cursor: "pointer",
  flexShrink: "0",

  transition: "opacity 0.2s",

  selectors: {
    "&:hover": {
      opacity: "1",
    },
  },
});

export const AddButton = style({
  padding: "0.25rem",
  background: "#bbb",
  borderRadius: "999px",
});

export const AddButtonIcon = style({
  width: "1.5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  stroke: "white",
});
