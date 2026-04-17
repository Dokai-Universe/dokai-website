"use client";

import NewsPageSearchBar from "@components/pages/news/SearchBar";
import * as Styles from "./style.css";
import NewsHeader from "@components/pages/news/Header";
import NewsBody from "@components/pages/news/Body";
import NewsFooter from "@components/pages/news/Footer";
import NewsListButton from "@components/pages/news/ListButton";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import { useAppQuery } from "@controllers/common";
import { newsQueriesClient } from "@controllers/news/query.client";

const NewsDetailPageClient = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleEditNews = () => {
    router.push(`/admin/news?slug=${slug}`);
  };

  const { data: newsDetail } = useAppQuery(newsQueriesClient.newsDetail(slug));

  if (!newsDetail) return null;

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <NewsPageSearchBar inDetail />
        <div className={Styles.Content}>
          <NewsHeader news={newsDetail.data} viewCount={newsDetail.viewCount} />
          <NewsBody news={newsDetail.data} />
          <NewsFooter news={newsDetail.data} />
        </div>
        <NewsListButton />
      </div>

      <FloatingButtonContainer role={["admin", "staff"]}>
        <FloatingButton type="EDIT" onClick={handleEditNews} text="Edit News" />
      </FloatingButtonContainer>
    </>
  );
};

export default NewsDetailPageClient;
