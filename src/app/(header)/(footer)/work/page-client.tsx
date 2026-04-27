"use client";

import Link from "next/link";
import * as Styles from "./style.css";
import { useEffect, useMemo, useRef, useState } from "react";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import { useAppInfiniteQuery, useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";

const WorkPageClient = () => {
  const router = useRouter();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Everything");

  const {
    data: works,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useAppInfiniteQuery(worksQueriesClient.workList(selectedCategory));

  const { data: workCategories } = useAppQuery(
    worksQueriesClient.workCategories(),
  );

  const categoryGroups = useMemo(() => {
    const workCategoriesList = ["Everything", ...(workCategories?.list ?? [])];

    return Array.from(
      { length: Math.ceil(workCategoriesList.length / 4) },
      (_, i) => workCategoriesList.slice(i * 4, i * 4 + 4),
    );
  }, [workCategories?.list]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;

        fetchNextPage();
      },
      {
        root: null,
        rootMargin: "-100px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <div className={Styles.CategoryContainer}>
          {categoryGroups.map((group, idx) => (
            <div
              key={`WORK_CATEGORY_GROUP_${idx}`}
              className={Styles.CategoryGroup}
            >
              {group.map((category) => (
                <label
                  key={`WORK_CATEGORY_${category}`}
                  className={Styles.Category}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className={Styles.CategoryInput}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <p>{category}</p>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className={Styles.WorkItemsContainer}>
          {isLoading
            ? Array.from({ length: 16 }).map((_, idx) => (
                <div key={`WORK_ITEM_${idx}`} className={Styles.WorkItem}>
                  <MediaCard className={Styles.WorkItemMedia} />
                  <p className={Styles.WorkItemText}>
                    <br />
                  </p>
                </div>
              ))
            : works?.pages
                ?.flatMap((page) => page.items)
                .map((item) => (
                  <Link
                    key={`WORK_ITEM_${item.slug}`}
                    className={Styles.WorkItem}
                    href={`/work/${item.slug}`}
                  >
                    <MediaHoverOverlay
                      media={item.data.thumbnail!}
                      className={Styles.WorkItemMedia}
                      priority
                    >
                      <div className={Styles.WorkItemMediaOverlay}>
                        <p>{item.data.summary}</p>
                      </div>
                    </MediaHoverOverlay>
                    <p className={Styles.WorkItemText}>{item.data.title}</p>
                  </Link>
                ))}

          {hasNextPage && (
            <>
              <div ref={observerRef} className={Styles.WorkItem}>
                <MediaCard className={Styles.WorkItemMedia} />
                <p className={Styles.WorkItemText}>
                  <br />
                </p>
              </div>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`WORK_NEXT_LOADING_${idx}`}
                  className={Styles.WorkItem}
                >
                  <MediaCard className={Styles.WorkItemMedia} />
                  <p className={Styles.WorkItemText}>
                    <br />
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <FloatingButtonContainer role={["admin"]}>
        <FloatingButton
          type="ADD"
          onClick={() => router.push("/admin/work")}
          text="Create New Work"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default WorkPageClient;
