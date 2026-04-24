import * as Styles from "./style.css";
import { toTitleCase } from "@utils/Text";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { useMemo, useState } from "react";
import CloseLink from "@components/ui/Link/CloseLink";
import { worksQueriesClient } from "@controllers/works/query.client";
import { useAppInfiniteQuery } from "@controllers/common";
import MoreButton from "@components/ui/Button/More/MoreButton";
import { newsQueriesClient } from "@controllers/news/query.client";
import { careersQueriesClient } from "@controllers/careers/query.client";

type FilterType = "Everything" | "Works" | "News" | "Projects";

const FilterOptions: FilterType[] = ["Everything", "Works", "News", "Projects"];

const SearchResult = ({
  queries,
  handleClose,
}: {
  queries: string[];
  handleClose: () => void;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("Works");

  const {
    data: works,
    fetchNextPage: loadMoreWorks,
    hasNextPage: hasNextWorks,
    isLoading: isLoadingWorks,
  } = useAppInfiniteQuery(worksQueriesClient.workSearch(queries), {
    enabled: Boolean(queries.length),
  });

  const {
    data: news,
    fetchNextPage: loadMoreNews,
    hasNextPage: hasNextNews,
    isLoading: isLoadingNews,
  } = useAppInfiniteQuery(newsQueriesClient.newsSearch(queries), {
    enabled: Boolean(queries.length),
  });

  const {
    data: projects,
    fetchNextPage: loadMoreProjects,
    hasNextPage: hasNextProjects,
    isLoading: isLoadingProjects,
  } = useAppInfiniteQuery(careersQueriesClient.projectSearch(queries), {
    enabled: Boolean(queries.length),
  });

  const [searchedWorks, totalWorksCount] = useMemo(() => {
    if (!works) return [[], 0];

    const totalCount = works.pages[0].totalCount;
    const results = works.pages.flatMap((page) => page.items);
    return [results, totalCount];
  }, [works]);

  const [searchedNews, totalNewsCount] = useMemo(() => {
    if (!news) return [[], 0];

    const totalCount = news.pages[0].totalCount;
    const results = news.pages.flatMap((page) => page.items);
    return [results, totalCount];
  }, [news]);

  const [searchedProjects, totalProjectsCount] = useMemo(() => {
    if (!projects) return [[], 0];

    const totalCount = projects.pages[0].totalCount;
    const results = projects.pages.flatMap((page) => page.items);
    return [results, totalCount];
  }, [projects]);

  if (!queries.length) return;
  if (isLoadingWorks && isLoadingNews && isLoadingProjects) return;

  return (
    <div className={Styles.ResultContainer}>
      <p className={Styles.FilterTitle}>Filter by</p>
      <div className={Styles.FilterGroup}>
        {FilterOptions.map((filter, idx) => {
          const count =
            filter === "Everything"
              ? totalWorksCount + totalNewsCount + totalProjectsCount
              : filter === "Works"
                ? totalWorksCount
                : filter === "News"
                  ? totalNewsCount
                  : filter === "Projects"
                    ? totalProjectsCount
                    : 0;
          const defaultChecked = idx === 0;
          const disabled = count === 0;

          return (
            <label key={`SEARCH_FILTER_${filter}`} className={Styles.Filter}>
              <input
                type="radio"
                name="filter"
                className={Styles.FilterInput}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={() => setSelectedFilter(filter)}
              />
              <p className={Styles.FilterText}>
                {toTitleCase(filter)} ({count})
              </p>
            </label>
          );
        })}
      </div>
      {(selectedFilter === "Everything" || selectedFilter === "Works") &&
        !!searchedWorks.length && (
          <div className={Styles.ResultGroup}>
            <p className={Styles.ResultGroupTitle}>Works</p>
            <div className={Styles.ResultItemGroup}>
              {searchedWorks.map((item, idx) => (
                <CloseLink
                  key={`SEARCH_RESULT_ITEM_${item.slug}_${idx}`}
                  className={Styles.ResultItem}
                  href={`/work/${encodeURIComponent(item.slug)}`}
                  handleClose={handleClose}
                >
                  <MediaHoverOverlay
                    media={item.data.thumbnail}
                    className={Styles.ResultItemMedia}
                  >
                    <div className={Styles.ResultItemMediaOverlay}>
                      <p>{item.data.summary}</p>
                    </div>
                  </MediaHoverOverlay>
                  <p className={Styles.ResultItemText}>{item.data.title}</p>
                </CloseLink>
              ))}
            </div>
            {hasNextWorks && <MoreButton onClick={() => loadMoreWorks()} />}
          </div>
        )}
      {(selectedFilter === "Everything" || selectedFilter === "News") &&
        !!searchedNews.length && (
          <div className={Styles.ResultGroup}>
            <p className={Styles.ResultGroupTitle}>News</p>
            <div className={Styles.ResultItemGroup}>
              {searchedNews.map((item, idx) => (
                <CloseLink
                  key={`SEARCH_RESULT_ITEM_${item.slug}_${idx}`}
                  className={Styles.ResultItem}
                  href={`/news/${encodeURIComponent(item.slug)}`}
                  handleClose={handleClose}
                >
                  <MediaHoverOverlay
                    media={item.data.thumbnail}
                    className={Styles.ResultItemMedia}
                  >
                    <div className={Styles.ResultItemMediaOverlay}>
                      <p>{item.data.summary}</p>
                    </div>
                  </MediaHoverOverlay>
                  <p className={Styles.ResultItemText}>{item.data.title}</p>
                </CloseLink>
              ))}
            </div>
            {hasNextNews && <MoreButton onClick={() => loadMoreNews()} />}
          </div>
        )}
      {(selectedFilter === "Everything" || selectedFilter === "Projects") &&
        !!searchedProjects.length && (
          <div className={Styles.ResultGroup}>
            <p className={Styles.ResultGroupTitle}>Projects</p>
            <div className={Styles.ResultItemGroup}>
              {searchedProjects.map((item, idx) => (
                <CloseLink
                  key={`SEARCH_RESULT_ITEM_${item.id}_${idx}`}
                  className={Styles.ResultItem}
                  href={`/careers/${encodeURIComponent(item.data.ownerEmail)}?project=${encodeURIComponent(item.id)}`}
                  handleClose={handleClose}
                >
                  <MediaHoverOverlay
                    media={item.data.thumbnail}
                    className={Styles.ResultItemMedia}
                  >
                    <div className={Styles.ResultItemMediaOverlay}>
                      <p>{item.data.ownerName}</p>
                    </div>
                  </MediaHoverOverlay>
                  <p className={Styles.ResultItemText}>{item.data.title}</p>
                </CloseLink>
              ))}
            </div>
            {hasNextProjects && (
              <MoreButton onClick={() => loadMoreProjects()} />
            )}
          </div>
        )}
    </div>
  );
};

export default SearchResult;
