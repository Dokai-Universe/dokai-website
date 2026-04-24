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

export const HeaderContent = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const Title = style({
  fontSize: "1.6rem",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const Subtitle = style({
  opacity: 0.75,
  fontSize: "0.9rem",
});

export const Error = style({
  color: "crimson",
  fontSize: "0.95rem",
});

export const GaLink = style({
  position: "absolute",
  right: "0",
  top: "0",
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.75rem",
  padding: "0.5rem 0.75rem",
  textDecoration: "none",
  transition: "border-color 0.2s ease-in-out",

  whiteSpace: "nowrap",
  fontSize: vars.fontSize.sm,

  width: "fit-content",

  selectors: {
    "&:hover": {
      borderColor: vars.color.fg,
    },
  },

  "@media": {
    [media.mobile]: {
      position: "static",
    },
  },
});

//

export const KpiRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "0.75rem",
  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const KpiCard = style({
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.5rem",
  padding: "0 1rem",
  background: vars.color.bg100,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.5rem",
  height: "7.5rem",
  overflow: "hidden",
});

export const KpiLabel = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.75,
  animation: `${fadeUpAnimation} 0.5s ease-in-out`,
});

export const KpiValue = style({
  fontSize: vars.fontSize.xl,
  fontWeight: 700,
  lineHeight: "1",
  animation: `${fadeUpAnimation} 0.5s ease-in-out`,
});

export const KpiHint = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.65,
  animation: `${fadeUpAnimation} 0.5s ease-in-out`,
});

//

export const Content = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "0.75rem",

  "@media": {
    [media.tablet]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const ContentColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
});

//

export const Card = style({
  border: "1px solid",
  borderColor: vars.color.lightGray,
  borderRadius: "0.5rem",
  paddingTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  animation: `${fadeUpAnimation} 0.5s ease-in-out`,
});

export const CardHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  margin: "0.5rem 1rem",
});

export const CardTitle = style({
  fontSize: vars.fontSize.md,
  lineHeight: "1.33",
  fontWeight: 600,
});

export const CardSub = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.65,
});

//

export const ChartContainer = style({
  margin: "0rem 1rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const ChartSvg = style({
  width: "100%",
  height: "auto",
  aspectRatio: "4 / 1",
  display: "block",

  fill: "none",
  stroke: vars.color.fg,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  borderBottom: "1px solid",
  borderBottomColor: vars.color.lightGray,
});

export const ChartMeta = style({
  fontSize: vars.fontSize.xs,
  display: "flex",
  justifyContent: "space-between",
  opacity: 0.75,
});

//

export const DeviceContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  margin: "0rem 1rem 1rem",
});

export const DeviceRow = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const DeviceHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  lineHeight: "1.33",
});

export const DeviceTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 600,
});

export const DeviceSub = style({
  fontSize: vars.fontSize.xs,
  opacity: 0.65,
});

const barFillAnimation = keyframes({
  from: {
    width: "0%",
  },
  to: {
    width: "var(--percent)",
  },
});

export const DeviceBar = style({
  position: "relative",
  height: "0.5rem",
  borderRadius: "999px",
  background: vars.color.lightGray,
  overflow: "hidden",

  selectors: {
    "&::before": {
      position: "absolute",
      content: '""',
      height: "100%",
      width: "var(--percent)",
      borderRadius: "999px",
      background: vars.color.fg,
      animation: `${barFillAnimation} 1s ease-in-out`,
      opacity: 0.7,
    },
  },
});

//

export const Table = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
});

export const TableHead = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "0.75rem",
  fontSize: vars.fontSize.xs,
  opacity: 0.7,
  paddingBottom: "0.5rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  margin: "0 1rem",
});

export const TableBody = style({
  position: "relative",
  minHeight: "20rem",
  marginRight: "0.3rem",
});

export const TableScroll = style({
  position: "absolute",
  overflow: "auto",
  height: "100%",
  width: "100%",
  scrollbarGutter: "auto",
  padding: "0 0.3rem 1rem 1rem",

  selectors: {
    "&::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "&::-webkit-scrollbar-track": {
      marginBottom: "1rem",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D9D9D9",
      borderRadius: "999px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.border,
    },
  },
});

export const TableRow = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "0.75rem",
  padding: "0.6rem 0",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
});

export const TableMain = style({
  minWidth: 0,
});

export const TableSub = style({
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

export const RowTitle = style({
  fontSize: "0.95rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const RowSub = style({
  fontSize: "0.82rem",
  opacity: 0.65,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginTop: "0.15rem",
});

//

export const Empty = style({
  padding: "0.9rem 0",
  opacity: 0.6,
  fontSize: "0.9rem",
});

export const Muted = style({
  opacity: 0.7,
});

export const TabContainer = style({
  display: "flex",
  gap: "1.5rem",
  marginTop: "0.5rem",
});

export const TabItem = style({
  background: "none",
  border: "none",
  padding: "0.25rem 0",
  fontSize: "0.95rem",
  fontWeight: 500,

  color: vars.color.fg,
  opacity: "0.5",
  cursor: "pointer",
  position: "relative",
  transition: "opacity 0.2s ease",

  selectors: {
    "&:hover": {
      opacity: "0.8",
    },
  },
});

export const TabItemActive = style({
  fontWeight: 700,
  opacity: "1",

  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-2px",
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "#000",
      borderRadius: "2px",
    },
  },
});
