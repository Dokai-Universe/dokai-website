import { NextRequest, NextResponse } from "next/server";
import { getGaClient, getGaPropertyName } from "@lib/ga4/server";
import { getOptionalRole } from "@lib/auth/optionalRole";

export async function GET(req: NextRequest) {
  const { role, isPrivileged } = await getOptionalRole(req);
  if (!isPrivileged || role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const client = getGaClient();
  const property = getGaPropertyName();
  // requests (총 5개)
  const requests = [
    // 0) totals: dateRanges 3개로 한번에
    {
      dateRanges: [
        { startDate: "today", endDate: "today", name: "today" },
        { startDate: "yesterday", endDate: "yesterday", name: "yesterday" },
        { startDate: "7daysAgo", endDate: "today", name: "last7days" },
      ],
      metrics: [{ name: "screenPageViews" }],
    },

    // 1) 페이지 TOP N (최근 7일)
    {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    },

    // 2) 일별 트렌드 (최근 30일)
    {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    },

    // 3) Referrer (최근 7일)
    {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    },

    // 4) Device (최근 7일)
    {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    },
  ] as const;

  const [resp] = await client.batchRunReports({
    property,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requests: requests as any,
  });

  // totals 파싱 (row[0]의 metricValues가 dateRanges 순서대로)
  const totalsRow = resp.reports?.[0]?.rows?.[0];
  const mv = totalsRow?.metricValues ?? [];

  const totals = {
    today: Number(mv[0]?.value ?? 0),
    yesterday: Number(mv[1]?.value ?? 0),
    last7days: Number(mv[2]?.value ?? 0),
  };

  const topPages =
    resp.reports?.[1]?.rows?.map((row) => ({
      pagePath: row.dimensionValues?.[0]?.value ?? "",
      pageTitle: row.dimensionValues?.[1]?.value ?? "",
      views: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  const trend =
    resp.reports?.[2]?.rows?.map((row) => ({
      date: row.dimensionValues?.[0]?.value ?? "", // YYYYMMDD
      views: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  const topReferrers =
    resp.reports?.[3]?.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "",
      medium: row.dimensionValues?.[1]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  const device =
    resp.reports?.[4]?.rows?.map((row) => ({
      deviceCategory: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? [];

  return NextResponse.json({ totals, topPages, trend, topReferrers, device });
}
