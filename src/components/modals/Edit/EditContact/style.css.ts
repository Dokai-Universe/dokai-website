import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  margin: "0.5rem 0 1rem",
  gap: "1rem",
});

export const TabContainer = style({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  padding: "0 1rem 0.5rem",
  borderBottom: "1px solid #ddd",
});

export const Tab = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
  cursor: "pointer",
  opacity: "0.3",

  selectors: {
    [`&:has(input[type="radio"]:checked)`]: {
      opacity: "1",
    },
  },
});

export const TabIcon = style({
  width: "1.5rem",
  height: "1.5rem",
});

export const TabInput = style({
  display: "none",
});

export const Content = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  margin: "0 1rem",
});

export const Title = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
export const TitleIcon = style({
  width: "1.25rem",
  height: "1.25rem",
});

export const Field = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const Label = style({});

export const Input = style({
  width: "100%",
});

export const ButtonContainer = style({
  margin: "0 1rem",
  display: "flex",
  gap: "0.5rem",
  justifyContent: "space-between",
});
