import * as Styles from "./style.css";
import categories from "@ts/categories";
import { toTitleCase } from "@utils/Text";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { useSearchQuery } from "./query";

const SearchResult = ({ queries }: { queries: string[] }) => {
  const { data: searchResults } = useSearchQuery(queries);

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.name;
    console.log(item);
  };

  if (!queries.length) return;
  if (!searchResults) return;

  return (
    <div className={Styles.ResultContainer}>
      <p className={Styles.FilterTitle}>Filter by</p>
      <div className={Styles.FilterGroup}>
        {categories.map((filter, idx) => {
          const count =
            filter === "EVERYTHING"
              ? searchResults.reduce((acc, r) => acc + r.items.length, 0)
              : searchResults.find((r) => r.filter === filter)?.items.length ||
                0;
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
              />
              <p className={Styles.FilterText}>
                {toTitleCase(filter)} ({count})
              </p>
            </label>
          );
        })}
      </div>
      {searchResults.map((result) => (
        <div
          className={Styles.ResultGroup}
          key={`SEARCH_RESULT_${result.filter}`}
        >
          <p className={Styles.ResultGroupTitle}>{result.filter}</p>
          <div className={Styles.ResultItemGroup}>
            {result.items.map((item) => (
              <button
                key={`SEARCH_RESULT_ITEM_${item.id}`}
                className={Styles.ResultItem}
                name={item.title}
                onClick={handleItemClick}
              >
                <MediaHoverOverlay
                  media={item.media}
                  className={Styles.ResultItemMedia}
                >
                  <div className={Styles.ResultItemMediaOverlay}>
                    <p>{item.summary}</p>
                  </div>
                </MediaHoverOverlay>
                <p className={Styles.ResultItemText}>{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
