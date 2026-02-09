import WorkDetailPageClient from "./client";
import { fetchWorkDetail } from "./fetch";

const WorkDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const workDetailInfo = await fetchWorkDetail(slug);

  return <WorkDetailPageClient workInfo={workDetailInfo} />;
};

export default WorkDetailPage;
