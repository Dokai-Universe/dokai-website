import { darkThemeClass, vars } from "@styles/theme.css";
import { style, globalStyle } from "@vanilla-extract/css";

// List

export const ListContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "1rem",
  margin: "1rem",
  marginTop: "0",
  marginRight: "calc(1rem - 16px)",
  height: "36rem",
});

export const ListContent = style({
  position: "relative",
  gridColumn: "1 / span 6",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",
  border: "1px solid #999",
  borderRadius: "0.5rem",
  padding: "1rem",
});

export const ListSideBar = style({
  gridColumn: "7 / span 2",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",
});

export const ListButtonContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.5rem",
  marginRight: "16px",
});

// Single

export const SingleContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "1rem",
  marginTop: "0",
  height: "36rem",
  overflow: "hidden",
});

export const SingleContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflow: "hidden",
  flexGrow: "1",
});

export const SingleButtonContainer = style({
  display: "flex",
  gap: "0.75rem",
});

//

export const BackButton = style({
  padding: "0.25em",
  height: "100%",
  aspectRatio: "1 / 1",
  flexShrink: "0",
  borderRadius: "0.5em",
  border: "1px solid #ddd",
  cursor: "pointer",
  color: "#888",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&:hover": {
      background: vars.color.bgSub,
      color: "#666",
    },
  },
});

export const BackButtonIcon = style({
  width: "1.25rem",
  height: "auto",
  aspectRatio: "1 / 1",

  selectors: {
    [`${darkThemeClass} &`]: {
      filter: "invert(1)",
    },
  },
});

export const CancelButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #ddd",
  cursor: "pointer",
  color: "#888",
  transition: "all 0.2s ease-in-out",
  flexGrow: "1",

  selectors: {
    "&:hover": {
      background: "#eeeeee",
      color: "#666",
    },
  },
});

export const ApplyButton = style({
  padding: "0.25em 0.75em",
  borderRadius: "0.5em",
  border: "1px solid #296bc0",
  cursor: "pointer",
  color: "white",
  background: "#296bc0",
  transition: "all 0.2s ease-in-out",
  flexGrow: "1",

  selectors: {
    "&:not(:disabled):hover": {
      background: "#3989f1ff",
    },

    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});
