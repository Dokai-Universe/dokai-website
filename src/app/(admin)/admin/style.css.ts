import { media } from "@styles/theme.css";
import { style } from "@vanilla-extract/css";

export const Page = style({
  width: "100%",
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const Header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "1rem",
  flexWrap: "wrap",
});

export const Title = style({
  fontSize: "1.6rem",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const Subtitle = style({
  opacity: 0.75,
  fontSize: "0.9rem",
  marginTop: "0.25rem",
});

export const Error = style({
  color: "crimson",
  fontSize: "0.95rem",
});

export const GaLink = style({
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: "0.75rem",
  padding: "0.6rem 0.8rem",
  textDecoration: "none",
  fontSize: "0.9rem",
  selectors: {
    "&:hover": { borderColor: "rgba(0,0,0,0.35)" },
  },
});

export const KpiRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "0.75rem",
  "@media": {
    [media.desktop]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const KpiCard = style({
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "1rem",
  padding: "0.9rem 1rem",
  background: "rgba(0,0,0,0.02)",
});

export const KpiLabel = style({
  fontSize: "0.85rem",
  opacity: 0.75,
});

export const KpiValue = style({
  fontSize: "1.75rem",
  fontWeight: 700,
  marginTop: "0.25rem",
});

export const KpiHint = style({
  fontSize: "0.85rem",
  opacity: 0.65,
  marginTop: "0.1rem",
});

export const Grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.75rem",
  "@media": {
    [media.desktop]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const Card = style({
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "1rem",
  padding: "0.9rem 1rem",
  minHeight: "12rem",
});

export const CardHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "1rem",
  marginBottom: "0.75rem",
});

export const CardTitle = style({
  fontSize: "1.05rem",
  fontWeight: 700,
});

export const CardSub = style({
  fontSize: "0.85rem",
  opacity: 0.65,
});

export const Table = style({
  display: "flex",
  flexDirection: "column",
});

export const TableHead = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "0.75rem",
  fontSize: "0.8rem",
  opacity: 0.7,
  paddingBottom: "0.5rem",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  marginBottom: "0.25rem",
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

export const TableRight = style({
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

export const Empty = style({
  padding: "0.9rem 0",
  opacity: 0.6,
  fontSize: "0.9rem",
});

export const Muted = style({
  opacity: 0.7,
});

export const ChartWrap = style({
  width: "100%",
});

export const ChartSvg = style({
  width: "100%",
  height: "140px",
  display: "block",
});

export const ChartAxis = style({
  stroke: "rgba(0,0,0,0.12)",
  strokeWidth: 1,
});

export const ChartLine = style({
  fill: "none",
  stroke: "rgba(0,0,0,0.7)",
  strokeWidth: 2,
});

export const ChartMeta = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "0.5rem",
  fontSize: "0.85rem",
  opacity: 0.75,
});

export const DeviceList = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
});

export const DeviceRow = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "0.5rem",
});

export const DeviceLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.1rem",
});

export const Bar = style({
  height: "0.55rem",
  borderRadius: "999px",
  background: "rgba(0,0,0,0.08)",
  overflow: "hidden",
});

export const BarFill = style({
  height: "100%",
  borderRadius: "999px",
  background: "rgba(0,0,0,0.7)",
});
