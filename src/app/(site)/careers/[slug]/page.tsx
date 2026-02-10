import CareersDetailPageClient from "./client";
import { fetchCareersDetail } from "./fetch";

const CareersDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const careersDetailInfo = await fetchCareersDetail(slug);

  return <CareersDetailPageClient careersDetailInfo={careersDetailInfo} />;
};

export default CareersDetailPage;
