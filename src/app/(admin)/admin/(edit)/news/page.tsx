import AdminNewsPageClient from "./page-client";
import { getQueryClient } from "@lib/react-query/getQueryClient";
import { prefetchAppQuery } from "@controllers/common";
import { notFound } from "next/navigation";
import { newsQueryKeys } from "@controllers/news/keys";
import { newsQueriesServer } from "@controllers/news/query.server";

const AdminNewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const rawSlug = (await searchParams).slug;
  const slug = rawSlug ? decodeURIComponent(rawSlug as string) : undefined;

  const qc = getQueryClient();
  if (slug) {
    await prefetchAppQuery(qc, newsQueriesServer.newsDetail(slug));
    const exist = await qc.getQueryData(newsQueryKeys.newsDetail(slug));
    if (!exist) notFound();
  }

  return <AdminNewsPageClient slug={slug} />;
};

export default AdminNewsPage;
