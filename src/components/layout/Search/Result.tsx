import * as Styles from "./style.css";
import categories from "@ts/categories";
import { toTitleCase } from "@utils/Text";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { useWorksInfiniteQuery } from "@controllers/work/query";
import { useMemo, useState } from "react";
import { WorkCard, WorkCategory } from "@domain/work";
import Link from "next/link";

const CATEGORY_ORDER: (WorkCategory | "EVERYTHING")[] = [
  "EVERYTHING",
  "ANIMATE",
  "BRANDING",
  "CHARACTER",
  "AWARD",
  "FILM",
  "COMMERCIAL",
  "SOCIAL_CONTENTS",
];

const SearchResult = ({ queries }: { queries: string[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategory | "EVERYTHING"
  >("EVERYTHING");
  const { data: works, isLoading } = useWorksInfiniteQuery({
    mode: "main",
    category: selectedCategory,
    q: queries,
  });

  const searchResults = works?.pages.flatMap((page) => page.items);

  const categorizedSearchResult = useMemo(() => {
    if (!searchResults?.length) return [];

    const map = new Map<WorkCategory | "EVERYTHING", WorkCard[]>();
    for (const item of searchResults) {
      const key = item.category as WorkCategory | "EVERYTHING";
      (map.get(key) ?? map.set(key, []).get(key)!).push(item);
    }

    return CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
      category,
      items: map.get(category)!,
    }));
  }, [searchResults]);

  if (!queries.length) return;
  if (!works || isLoading) return;

  return (
    <div className={Styles.ResultContainer}>
      <p className={Styles.FilterTitle}>Filter by</p>
      <div className={Styles.FilterGroup}>
        {(categories as (WorkCategory | "EVERYTHING")[]).map((filter, idx) => {
          const count =
            filter === "EVERYTHING"
              ? searchResults?.length
              : searchResults?.filter((r) => r.category === filter).length || 0;
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
                onChange={() => setSelectedCategory(filter)}
              />
              <p className={Styles.FilterText}>
                {toTitleCase(filter)} ({count})
              </p>
            </label>
          );
        })}
      </div>
      {categorizedSearchResult?.map((result) => (
        <div
          className={Styles.ResultGroup}
          key={`SEARCH_RESULT_${result.category}`}
        >
          <p className={Styles.ResultGroupTitle}>{result.category}</p>
          <div className={Styles.ResultItemGroup}>
            {result.items.map((item) => (
              <Link
                key={`SEARCH_RESULT_ITEM_${item.slug}`}
                className={Styles.ResultItem}
                href={`/work/${item.slug}`}
              >
                <MediaHoverOverlay
                  media={item.thumbnail}
                  className={Styles.ResultItemMedia}
                >
                  <div className={Styles.ResultItemMediaOverlay}>
                    <p>{item.summary}</p>
                  </div>
                </MediaHoverOverlay>
                <p className={Styles.ResultItemText}>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
