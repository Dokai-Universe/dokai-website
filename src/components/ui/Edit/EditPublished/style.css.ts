import { vars } from "@styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 0.75rem",
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.5rem",
  cursor: "pointer",
});

export const TextContainer = style({
  display: "flex",
  flexDirection: "column",
  fontSize: vars.fontSize.sm,
});

export const Title = style({
  fontWeight: 600,
});

export const Desc = style({
  fontSize: "0.75em",
  opacity: 0.7,
});

export const Input = style({ display: "none" });

export const Toggle = style({
  position: "relative",
  width: "2.5rem",
  height: "auto",
  aspectRatio: "2 / 1",
  margin: "0 0.5rem",

  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      width: "auto",
      height: "100%",
      aspectRatio: "1 / 1",
      borderRadius: 999,
      background: vars.color.bg,
      boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
      transform: "translateX(0px)",
      transition: "transform 160ms ease",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "10%",
      boxSizing: "content-box",
      transformOrigin: "center",
      borderRadius: 999,
      background: vars.color.lightGray,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      transition: "background 160ms ease",
    },
  },
});

globalStyle(`${Input}:checked + ${Toggle}::after`, {
  transform: "translateX(100%)",
});

globalStyle(`${Input}:checked + ${Toggle}::before`, {
  background: vars.color.fg,
});

// export const ToggleWrapper = style({
//   padding: "0.25rem",

//   background: "#e5e5e5",
//   border: "1px solid rgba(0,0,0,0.12)",
//   borderRadius: 999,
//   display: "flex",
//   flexDirection: "column",
//   transition: "background 160ms ease, border-color 160ms ease",

//   selectors: {
//     '&[data-on="true"]': {
//       background: "#262626",
//       borderColor: "rgba(0,0,0,0.85)",
//     },
//   },
// });

// export const Toggle = style({
//   height: "1.5rem",
//   width: "3rem",
//   borderRadius: 999,
//   background: "#e5e5e5",
//   position: "relative",
//   cursor: "pointer",
//   transition: "background 160ms ease",
//   outline: "none",
//   selectors: {
//     '&[data-on="true"]': {
//       background: "rgba(0,0,0,0.85)",
//       borderColor: "rgba(0,0,0,0.85)",
//     },
//     "&:disabled": {
//       opacity: 0.5,
//       cursor: "not-allowed",
//     },
//   },
// });

// export const Knob = style({
//   position: "absolute",
//   left: "0",
//   top: "0",
//   width: "1.5rem",
//   height: "1.5rem",
//   borderRadius: 999,
//   background: "#fff",
//   boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
//   transform: "translateX(0px)",
//   transition: "transform 160ms ease",
// });

// globalStyle(`${ToggleWrapper}[data-on="true"] ${Toggle}`, {
//   background: "#262626",
// });

// globalStyle(`${ToggleWrapper}[data-on="true"] ${Knob}`, {
//   transform: "translateX(1.5rem)",
// });
