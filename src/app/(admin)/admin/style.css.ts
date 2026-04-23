import { media, vars } from "@styles/theme.css";
import { keyframes, style } from "@vanilla-extract/css";

const fadeUpAnimation = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(1rem)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const Container = style({
  margin: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  animation: `${fadeUpAnimation} 0.5s ease-in-out`,

  "@media": {
    [media.tablet]: {
      margin: "1rem",
    },
  },
});

export const Header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "1rem",

  "@media": {
    [media.mobile]: {
      flexWrap: "wrap",
    },
  },
});

export const HeaderContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const Title = style({
  fontSize: "1.6rem",
  fontWeight: 700,
  lineHeight: 1.2,
});
