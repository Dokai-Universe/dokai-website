import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NewsDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { newsQueriesClient } from "@controllers/news/query.client";
import { prefetchAppQuery } from "@controllers/common";
import { newsQueryKeys } from "@controllers/news/keys";
import { notFound } from "next/navigation";

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();
  await prefetchAppQuery(qc, newsQueriesClient.newsDetail(slug));
  const exist = await qc.getQueryData(newsQueryKeys.newsDetail(slug));
  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NewsDetailPageClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NewsDetailPage;
