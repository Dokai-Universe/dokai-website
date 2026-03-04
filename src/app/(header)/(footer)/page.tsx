export const dynamic = "force-dynamic";
export const revalidate = 0;

import MainPageClient from "./page-client";

const MainPage = async () => {
  return <MainPageClient />;
};

export default MainPage;
