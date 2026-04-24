"use client";

import { useMemo } from "react";
import Link from "next/link";
import * as Styles from "./style.css";
import { useAdminAnalytics } from "@hooks/useAdminAnalytics";

function formatDateYYYYMMDD(s: string) {
  if (!/^\d{8}$/.test(s)) return s;
  const y = s.slice(0, 4);
  const m = s.slice(4, 6);
  const d = s.slice(6, 8);
  return `${y}-${m}-${d}`;
}

function formatK(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function LineChart({
  points,
  height = 120,
  padding = 10,
}: {
  points: { xLabel: string; y: number }[];
  height?: number;
  padding?: number;
}) {
  const width = 560;
  const max = Math.max(1, ...points.map((p) => p.y));
  const min = Math.min(0, ...points.map((p) => p.y));
  const range = Math.max(1, max - min);

  const path = useMemo(() => {
    if (points.length === 0) return "";

    const stepX =
      points.length === 1 ? 0 : (width - padding * 2) / (points.length - 1);

    return points
      .map((p, i) => {
        const x = padding + stepX * i;
        const y = padding + (height - padding * 2) * (1 - (p.y - min) / range);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [points, width, height, padding, min, range]);

  const last = points[points.length - 1];

  return (
    <div className={Styles.ChartContainer}>
      <svg
        className={Styles.ChartSvg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-label="Daily trend chart"
      >
        <path d={path} />
      </svg>

      {last && (
        <div className={Styles.ChartMeta}>
          <span>{formatDateYYYYMMDD(last.xLabel)}</span>
          <span>{formatK(last.y)} views</span>
        </div>
      )}
    </div>
  );
}

const DashboardSection = () => {
  const { data, isLoading, error } = useAdminAnalytics();

  const trendPoints = useMemo(() => {
    const raw = data?.trend ?? [];
    return raw.map((r) => ({ xLabel: r.date, y: r.views }));
  }, [data?.trend]);

  const deviceTotal = useMemo(
    () => (data?.device ?? []).reduce((acc, cur) => acc + cur.sessions, 0),
    [data?.device],
  );

  const kpiList = data
    ? [
        {
          label: "Today",
          value: formatK(data.totals.today),
          hint: "page views",
        },
        {
          label: "Yesterday",
          value: formatK(data.totals.yesterday),
          hint: "page views",
        },
        {
          label: "Last 7 days",
          value: formatK(data.totals.last7days),
          hint: "page views",
        },
      ]
    : [];

  if (isLoading) {
    return (
      <>
        <div
          className={Styles.HeaderContent}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <p className={Styles.Subtitle}>Loading analytics…</p>
        </div>
        <div className={Styles.KpiRow}>
          <div className={Styles.KpiCard} />
          <div className={Styles.KpiCard} />
          <div className={Styles.KpiCard} />
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <div className={Styles.HeaderContent} style={{ marginTop: "1rem" }}>
        <p className={Styles.Error}>
          {error ? error.message : "Failed to load analytics"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={Styles.HeaderContent}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <p className={Styles.Title}>Dashboard</p>
        <p className={Styles.Subtitle}>
          Today / Yesterday / Last 7 days, Top pages, Trend, Referrers, Device
        </p>
        <Link
          className={Styles.GaLink}
          href="https://analytics.google.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open GA
        </Link>
      </div>

      <div className={Styles.KpiRow}>
        {kpiList.map((kpi) => (
          <div key={`KPI_CARD_${kpi.label}`} className={Styles.KpiCard}>
            <p className={Styles.KpiLabel}>{kpi.label}</p>
            <p className={Styles.KpiValue}>{kpi.value}</p>
            <p className={Styles.KpiHint}>{kpi.hint}</p>
          </div>
        ))}
      </div>

      <div className={Styles.Content}>
        <div className={Styles.ContentColumn}>
          <div className={Styles.Card}>
            <div className={Styles.CardHeader}>
              <p className={Styles.CardTitle}>Daily Trend</p>
              <p className={Styles.CardSub}>last 30 days</p>
            </div>
            <LineChart points={trendPoints} />
          </div>

          <div
            className={Styles.Card}
            style={{
              flexGrow: "1",
            }}
          >
            <div className={Styles.CardHeader}>
              <p className={Styles.CardTitle}>Top Pages</p>
              <p className={Styles.CardSub}>last 7 days</p>
            </div>
            <div className={Styles.Table}>
              <div className={Styles.TableHead}>
                <span>Page</span>
                <span>Views</span>
              </div>
              <div className={Styles.TableBody}>
                <div className={Styles.TableScroll}>
                  {data.topPages.length === 0 ? (
                    <div className={Styles.Empty}>No data yet</div>
                  ) : (
                    data.topPages.map((p) => (
                      <div
                        key={`${p.pagePath}-${p.pageTitle}`}
                        className={Styles.TableRow}
                      >
                        <div className={Styles.TableMain}>
                          <p className={Styles.RowTitle}>
                            {p.pageTitle || p.pagePath}
                          </p>
                          <p className={Styles.RowSub}>{p.pagePath}</p>
                        </div>
                        <div className={Styles.TableSub}>
                          {formatK(p.views)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Styles.ContentColumn}>
          <div
            className={Styles.Card}
            style={{
              flexGrow: "1",
            }}
          >
            <div className={Styles.CardHeader}>
              <p className={Styles.CardTitle}>Top Referrers</p>
              <p className={Styles.CardSub}>last 7 days</p>
            </div>

            <div className={Styles.Table}>
              <div className={Styles.TableHead}>
                <span>Source</span>
                <span>Sessions</span>
              </div>
              <div className={Styles.TableBody}>
                <div className={Styles.TableScroll}>
                  {data.topReferrers.length === 0 ? (
                    <div className={Styles.Empty}>No data yet</div>
                  ) : (
                    data.topReferrers.map((r, i) => (
                      <div
                        key={`${r.source}-${r.medium}-${i}`}
                        className={Styles.TableRow}
                      >
                        <div className={Styles.TableMain}>
                          <p className={Styles.RowTitle}>
                            {r.source}{" "}
                            <span className={Styles.Muted}>/ {r.medium}</span>
                          </p>
                        </div>
                        <div className={Styles.TableSub}>
                          {formatK(r.sessions)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={Styles.Card}>
            <div className={Styles.CardHeader}>
              <p className={Styles.CardTitle}>Devices</p>
              <p className={Styles.CardSub}>last 7 days</p>
            </div>

            <div className={Styles.DeviceContainer}>
              {(data.device ?? []).map((d) => {
                const percent =
                  deviceTotal > 0
                    ? Math.round((d.sessions / deviceTotal) * 100)
                    : 0;

                return (
                  <div key={d.deviceCategory} className={Styles.DeviceRow}>
                    <div className={Styles.DeviceHeader}>
                      <p className={Styles.DeviceTitle}>{d.deviceCategory}</p>
                      <p className={Styles.DeviceSub}>
                        {formatK(d.sessions)} sessions · {percent}%
                      </p>
                    </div>
                    <span
                      className={Styles.DeviceBar}
                      style={
                        {
                          "--percent": `${percent}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                );
              })}

              {(data.device ?? []).length === 0 && (
                <div className={Styles.Empty}>No data yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSection;
