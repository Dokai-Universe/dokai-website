import WorkDetailPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { worksQueriesServer } from "@controllers/works/query.server";
import { worksQueryKeys } from "@controllers/works/keys";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const WorkDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = decodeURIComponent((await params).slug);

  const qc = getQueryClient();
  await prefetchAppQuery(qc, worksQueriesServer.workDetail(slug));
  const exist = await qc.getQueryData(worksQueryKeys.workDetail(slug));
  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <WorkDetailPageClient slug={slug} />
    </HydrationBoundary>
  );
};

export default WorkDetailPage;
