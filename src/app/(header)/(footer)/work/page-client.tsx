"use client";

import categories from "@ts/categories";
import { toTitleCase } from "@utils/Text";
import Link from "next/link";
import * as Styles from "./style.css";
import { useMemo, useState } from "react";
import MoreButton from "@components/ui/Button/More/MoreButton";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { WorkCategory } from "@domain/work";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import { useAppInfiniteQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";

const WorkPageClient = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategory | "EVERYTHING"
  >("EVERYTHING");

  const {
    data: works,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useAppInfiniteQuery(worksQueriesClient.workList(selectedCategory));

  const categoryGroups = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(categories.length / 4) },
        (_, i) =>
          categories.slice(i * 4, i * 4 + 4) as (WorkCategory | "EVERYTHING")[],
      ),
    [],
  );

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
                  <p>{toTitleCase(category)}</p>
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
                    >
                      <div className={Styles.WorkItemMediaOverlay}>
                        <p>{item.data.summary}</p>
                      </div>
                    </MediaHoverOverlay>
                    <p className={Styles.WorkItemText}>{item.data.title}</p>
                  </Link>
                ))}
        </div>
        {hasNextPage && <MoreButton onClick={() => fetchNextPage()} />}
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
