"use client";

import React from "react";
import * as Styles from "./style.css";
import ViewSVG from "@assets/icons/view.svg";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import NewsPageSearchBar from "@components/pages/news/SearchBar";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { useAppQuery } from "@controllers/common";
import { newsQueriesClient } from "@controllers/news/query.client";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";

const NewsPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const { data: newsList } = useAppQuery(
    newsQueriesClient.newsList(currentPage),
  );
  console.log(newsList);

  const maxPage = newsList?.totalPages ?? 1;

  const pageList = React.useMemo(() => {
    if (maxPage <= 5) {
      return Array.from({ length: maxPage }, (_, i) => i + 1);
    }

    const start = Math.max(1, Math.min(currentPage - 2, maxPage - 4));
    const end = Math.min(maxPage, start + 4);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, maxPage]);

  const showLeftDots = pageList[0] > 1;
  const showRightDots = pageList[pageList.length - 1] < maxPage;

  const handlePageClick = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(p));
    if (p < 1 || p > maxPage) return;
    router.replace(`/news?${params.toString()}`);
  };

  const handlePagePrevClick = () => {
    handlePageClick(currentPage - 1);
  };

  const handlePageNextClick = () => {
    handlePageClick(currentPage + 1);
  };

  const handlePageStartClick = () => {
    handlePageClick(1);
  };

  const handlePageEndClick = () => {
    handlePageClick(maxPage);
  };

  const handleNewsItemClick = (slug: string) => {
    router.push(`/news/${slug}`);
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <NewsPageSearchBar />
        <div className={Styles.Content}>
          {newsList?.items.map((item) => (
            <React.Fragment key={item.id}>
              <div
                className={Styles.NewsItem}
                onClick={() => handleNewsItemClick(item.slug)}
              >
                <MediaCard
                  media={item.data.thumbnail}
                  className={Styles.NewsItemMedia}
                />
                <div className={Styles.NewsItemContent}>
                  <div className={Styles.NewsItemHeader}>
                    <p className={Styles.NewsItemCategory}>
                      {item.data.category}
                    </p>
                    <p className={Styles.NewsItemTitle}>{item.data.title}</p>
                  </div>

                  <div className={Styles.NewsItemFooter}>
                    <p className={Styles.NewsItemDate}>
                      {new Date(item.data.publishedAt).toLocaleDateString()}
                    </p>
                    <div className={Styles.NewsItemView}>
                      <ViewSVG className={Styles.NewsItemViewIcon} />
                      <p>{item.viewCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              <span className={Styles.Divider} />
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <span className={Styles.Rect} onClick={handlePagePrevClick}>
            {"<"}
          </span>
          {showLeftDots && (
            <span className={Styles.Rect} onClick={handlePageStartClick}>
              ...
            </span>
          )}
          {pageList.map((item) => (
            <span
              key={item}
              onClick={() => handlePageClick(item)}
              className={Styles.Rect}
              aria-current={item === currentPage ? "page" : undefined}
              data-active={item === currentPage}
            >
              {item}
            </span>
          ))}

          {showRightDots && (
            <span className={Styles.Rect} onClick={handlePageEndClick}>
              ...
            </span>
          )}
          <span className={Styles.Rect} onClick={handlePageNextClick}>
            {">"}
          </span>
        </div>
      </div>
      <FloatingButtonContainer role={["admin"]}>
        <FloatingButton
          type="ADD"
          onClick={() => router.push("/admin/news")}
          text="Create New News"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default NewsPageClient;
