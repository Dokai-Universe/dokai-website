"use client";

import { useMemo } from "react";
import { useAdminAnalytics } from "@hooks/useAdminAnalytics";
import * as Styles from "./style.css";

function formatDateYYYYMMDD(s: string) {
  // GA: YYYYMMDD
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
  const width = 520; // responsive는 css로 scale
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
    <div className={Styles.ChartWrap}>
      <svg
        className={Styles.ChartSvg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-label="Daily trend chart"
      >
        {/* baseline */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className={Styles.ChartAxis}
        />
        {/* line */}
        <path d={path} className={Styles.ChartLine} />
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

const AdminPageClient = () => {
  const { data, isLoading, error } = useAdminAnalytics();

  const trendPoints = useMemo(() => {
    const raw = data?.trend ?? [];
    // 최근 30일 중 "마지막 14일"만 보고 싶으면 slice(-14)
    return raw.map((r) => ({ xLabel: r.date, y: r.views }));
  }, [data?.trend]);

  const deviceTotal = useMemo(
    () => (data?.device ?? []).reduce((acc, cur) => acc + cur.sessions, 0),
    [data?.device],
  );

  if (isLoading) {
    return (
      <div className={Styles.Page}>
        <div className={Styles.Header}>
          <h1 className={Styles.Title}>Dashboard</h1>
          <p className={Styles.Subtitle}>Loading analytics…</p>
        </div>
        <div className={Styles.Grid}>
          <div className={Styles.Card} />
          <div className={Styles.Card} />
          <div className={Styles.Card} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={Styles.Page}>
        <div className={Styles.Header}>
          <h1 className={Styles.Title}>Dashboard</h1>
          <p className={Styles.Error}>
            {error ? error.message : "Failed to load analytics"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.Page}>
      <div className={Styles.Header}>
        <div>
          <h1 className={Styles.Title}>Dashboard</h1>
          <p className={Styles.Subtitle}>
            Today / Yesterday / Last 7 days, Top pages, Trend, Referrers, Device
          </p>
        </div>
        <a
          className={Styles.GaLink}
          href="https://analytics.google.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open GA
        </a>
      </div>

      {/* KPI cards */}
      <div className={Styles.KpiRow}>
        <div className={Styles.KpiCard}>
          <p className={Styles.KpiLabel}>Today</p>
          <p className={Styles.KpiValue}>{formatK(data.totals.today)}</p>
          <p className={Styles.KpiHint}>page views</p>
        </div>
        <div className={Styles.KpiCard}>
          <p className={Styles.KpiLabel}>Yesterday</p>
          <p className={Styles.KpiValue}>{formatK(data.totals.yesterday)}</p>
          <p className={Styles.KpiHint}>page views</p>
        </div>
        <div className={Styles.KpiCard}>
          <p className={Styles.KpiLabel}>Last 7 days</p>
          <p className={Styles.KpiValue}>{formatK(data.totals.last7days)}</p>
          <p className={Styles.KpiHint}>page views</p>
        </div>
      </div>

      {/* Main grid */}
      <div className={Styles.Grid}>
        {/* Trend */}
        <section className={Styles.Card}>
          <div className={Styles.CardHeader}>
            <h2 className={Styles.CardTitle}>Daily Trend</h2>
            <span className={Styles.CardSub}>last 30 days</span>
          </div>
          <LineChart points={trendPoints} />
        </section>

        {/* Top pages */}
        <section className={Styles.Card}>
          <div className={Styles.CardHeader}>
            <h2 className={Styles.CardTitle}>Top Pages</h2>
            <span className={Styles.CardSub}>last 7 days</span>
          </div>

          <div className={Styles.Table}>
            <div className={Styles.TableHead}>
              <span>Page</span>
              <span className={Styles.TableRight}>Views</span>
            </div>

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
                  <div className={Styles.TableRight}>{formatK(p.views)}</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Referrers */}
        <section className={Styles.Card}>
          <div className={Styles.CardHeader}>
            <h2 className={Styles.CardTitle}>Top Referrers</h2>
            <span className={Styles.CardSub}>last 7 days</span>
          </div>

          <div className={Styles.Table}>
            <div className={Styles.TableHead}>
              <span>Source / Medium</span>
              <span className={Styles.TableRight}>Sessions</span>
            </div>

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
                  <div className={Styles.TableRight}>{formatK(r.sessions)}</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Device */}
        <section className={Styles.Card}>
          <div className={Styles.CardHeader}>
            <h2 className={Styles.CardTitle}>Device</h2>
            <span className={Styles.CardSub}>last 7 days</span>
          </div>

          <div className={Styles.DeviceList}>
            {(data.device ?? []).map((d) => {
              const pct =
                deviceTotal > 0
                  ? Math.round((d.sessions / deviceTotal) * 100)
                  : 0;
              return (
                <div key={d.deviceCategory} className={Styles.DeviceRow}>
                  <div className={Styles.DeviceLeft}>
                    <p className={Styles.RowTitle}>{d.deviceCategory}</p>
                    <p className={Styles.RowSub}>
                      {formatK(d.sessions)} sessions · {pct}%
                    </p>
                  </div>
                  <div className={Styles.Bar}>
                    <div
                      className={Styles.BarFill}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {(data.device ?? []).length === 0 && (
              <div className={Styles.Empty}>No data yet</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPageClient;
