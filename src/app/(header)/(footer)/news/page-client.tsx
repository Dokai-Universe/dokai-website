"use client";

import React from "react";
import * as Styles from "./style.css";
import ViewSVG from "@assets/icons/view.svg";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import NewsPageSearchBar from "@components/pages/news/SearchBar";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";

const mock = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  slug: `news-${i}`,
  category: "BRANDING",
  title: "News Title",
  date: new Date("2026-04-03"),
  view: 100,
  thumbnail: {
    type: "IMAGE",
    src: "https://pub-c960c01dadf742b6ada2772f5bbebd63.r2.dev/images/asd/asd/2a0ecfe1f610b0d6af91d146a7b0efccaabe75be0d7f68b181d243b3b6fcbb39.png",
    alt: "",
  } as const,
}));

const NewsPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const maxPage = 10;

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
          {mock.map((item) => (
            <React.Fragment key={item.id}>
              <div
                className={Styles.NewsItem}
                onClick={() => handleNewsItemClick(item.slug)}
              >
                <MediaCard
                  media={item.thumbnail}
                  className={Styles.NewsItemMedia}
                />
                <div className={Styles.NewsItemContent}>
                  <div className={Styles.NewsItemHeader}>
                    <p className={Styles.NewsItemCategory}>{item.category}</p>
                    <p className={Styles.NewsItemTitle}>{item.title}</p>
                  </div>

                  <div className={Styles.NewsItemFooter}>
                    <p className={Styles.NewsItemDate}>
                      {item.date.toLocaleDateString()}
                    </p>
                    <div className={Styles.NewsItemView}>
                      <ViewSVG className={Styles.NewsItemViewIcon} />
                      <p>{item.view}</p>
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
    </>
  );
};

export default NewsPageClient;
