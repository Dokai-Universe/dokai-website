import { useQuery } from "@tanstack/react-query";

type AnalyticsResponse = {
  totals: { today: number; yesterday: number; last7days: number };
  topPages: { pagePath: string; pageTitle: string; views: number }[];
  trend: { date: string; views: number }[];
  topReferrers: { source: string; medium: string; sessions: number }[];
  device: { deviceCategory: string; sessions: number }[];
};

export function useAdminAnalytics() {
  return useQuery<AnalyticsResponse>({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await fetch("/api/admin/analytics");
      if (!res.ok) throw new Error("Failed to load analytics");
      return res.json();
    },
    staleTime: 60_000, // 1분 캐시
  });
}
