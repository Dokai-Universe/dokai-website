import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { careersQueriesServer } from "@controllers/careers/query.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { careersQueryKeys } from "@controllers/careers/keys";
import AdminCareersPageClient from "./page-client";
import { notFound } from "next/navigation";
import { decodeEmailParam } from "@utils/Email";

const AdminCareersPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const rawEmail = (await searchParams).email as string;
  const email = decodeEmailParam(rawEmail);

  const qc = getQueryClient();
  await prefetchAppQuery(qc, careersQueriesServer.profileDetail(email));
  const exist = await qc.getQueryData(careersQueryKeys.profileDetail(email));
  if (rawEmail && !exist) notFound();

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <AdminCareersPageClient email={email} />
    </HydrationBoundary>
  );
};

export default AdminCareersPage;
