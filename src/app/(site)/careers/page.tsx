import CareersPageClient from "./client";
import { fetchCareers } from "./fetch";

const CareersPage = async () => {
  const careers = await fetchCareers();

  return <CareersPageClient careers={careers} />;
};

export default CareersPage;
