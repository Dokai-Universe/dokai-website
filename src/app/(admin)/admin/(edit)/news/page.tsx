import AdminWorkPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { worksQueriesServer } from "@controllers/works/query.server";
import { worksQueryKeys } from "@controllers/works/keys";
import { notFound } from "next/navigation";

const AdminNewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const rawSlug = (await searchParams).slug;
  const slug = rawSlug ? decodeURIComponent(rawSlug as string) : undefined;

  const qc = getQueryClient();
  if (slug) {
    await prefetchAppQuery(qc, worksQueriesServer.workDetail(slug));
    const exist = await qc.getQueryData(worksQueryKeys.workDetail(slug));
    if (!exist) notFound();
  }

  return <AdminWorkPageClient slug={slug} />;
};

export default AdminNewsPage;
