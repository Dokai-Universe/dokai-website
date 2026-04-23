import { media, vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  overflow: "auto",
});

export const DragOverlay = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  background: vars.color.bgSub,
  opacity: "0",
  transition: "opacity 0.2s ease-in-out",
  pointerEvents: "none",
  zIndex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  selectors: {
    "&[data-dragging='true']": {
      opacity: "0.5",
    },
  },
});

export const DragOverlayIcon = style({
  width: "5rem",
  height: "auto",
  aspectRatio: "1 / 1",
  background: vars.color.bg,
  padding: "1rem",
  borderRadius: "999px",
  stroke: vars.color.fg,
  strokeWidth: "2px",
});

export const MediaContainer = style({
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  borderRadius: "0.5rem",
  overflow: "hidden",
  cursor: "pointer",
  flexShrink: "0",
});

export const Media = style({
  position: "relative",
  width: "100%",
  height: "100%",
  opacity: "1",
  background: vars.color.bgSub,
  transition: "background 0.2s ease-in-out, opacity 0.2s ease-in-out",
});

globalStyle(`${Media}[data-dragging="true"]`, {
  background: "#ccc",
  opacity: "0.5",
});

export const Content = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "auto 1fr",
  columnGap: "1rem",
  rowGap: "1rem",
  flexGrow: "1",
});

export const Title = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "500",
});

export const SourceContainer = style({
  gridColumn: "1 / -1",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const DescriptionContainer = style({
  gridColumn: "1 / span 5",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

export const InputContainer = style({
  display: "flex",
  gap: "0.5rem",
  width: "100%",
});

export const Input = style({
  fontSize: vars.fontSize.xs,
  padding: "0.25rem 0.5rem",
  flexGrow: "1",
  outline: "none",
  border: "1px solid",
  borderColor: vars.color.lightGray,
});

export const ClearButton = style({
  fontSize: vars.fontSize.xs,
  padding: "0.25rem 0.75rem",
  border: "1px solid #999",
  borderRadius: "0.25rem",
});

export const TextArea = style({
  width: "100%",
  height: "100%",
  resize: "none",
  padding: "0.25rem 0.5rem",
});

export const UploadContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gridColumn: "span 3",
  border: "3px dashed",
  borderColor: vars.color.lightGray,
  borderRadius: "0.5rem",
  background: vars.color.bgSub,
  transition: "border 0.2s ease-in-out, background 0.2s ease-in-out",
  textAlign: "center",
  lineHeight: "1.25",
  gap: "0.25rem",
  cursor: "pointer",

  "@media": {
    [media.mobile]: {
      gridColumn: "1 / -1",
    },
  },
});

globalStyle(`${UploadContainer}[data-dragging="true"]`, {
  border: "3px dashed #aaa",
  background: "#ccc",
});

export const UploadInput = style({
  display: "none",
});

export const UploadIcon = style({
  width: "4rem",
  height: "auto",
  aspectRatio: "1 / 1",
});

export const UploadText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: "400",
});

export const UploadSubText = style({
  fontSize: vars.fontSize.xs,
});

globalStyle(`${UploadSubText} > span`, {
  color: "#296bc0",
  cursor: "pointer",
});
