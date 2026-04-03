import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NewsDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();
  // await prefetchAppQuery(qc, worksQueriesServer.workDetail(slug));
  // const exist = await qc.getQueryData(worksQueryKeys.workDetail(slug));
  // if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NewsDetailPageClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NewsDetailPage;
