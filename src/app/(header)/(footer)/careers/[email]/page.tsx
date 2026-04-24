import { getQueryClient } from "@lib/react-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { notFound } from "next/navigation";
import CareersDetailPageClient from "./page-client";
import { careersQueryKeys } from "@controllers/careers/keys";
const CareersDetailPage = async ({
  params,
}: {
  params: Promise<{ email: string }>;
}) => {
  const email = decodeURIComponent((await params).email);

  const qc = getQueryClient();
  await prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));
  const exist = await qc.getQueryData(careersQueryKeys.profileDetail(email));
  if (!exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CareersDetailPageClient email={email} />;
    </HydrationBoundary>
  );
};

export default CareersDetailPage;
