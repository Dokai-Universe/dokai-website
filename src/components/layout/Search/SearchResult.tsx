import * as Styles from "./Search.css";
import Image from "next/image";
import { getRandomColor, getReadableTextColor } from "@utils/Color";

const MockFilter = ["All", "Work", "Research", "Posts", "Feed", "Jobs"];

const MockResult = [
  {
    filter: "Work",
    items: [
      {
        id: 0,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 1,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 2,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 3,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 4,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 5,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 6,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 7,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 8,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
    ],
  },
  {
    filter: "Feed",
    items: [
      {
        id: 9,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 10,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
    ],
  },
  {
    filter: "Jobs",
    items: [
      {
        id: 11,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 12,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
      {
        id: 13,
        title: "LGU+ ixi-O Brand Film",
        summary: "LGU+ ixi-O Brand Film Summary",
        uri: "",
        image:
          "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
      },
    ],
  },
];

const SearchResult = ({ queries }: { queries: string[] }) => {
  const searchResults = MockResult;

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.name;
    console.log(item);
  };

  if (!queries.length) return;

  return (
    <div className={Styles.Result}>
      <p className={Styles.FilterTitle}>Filter</p>
      <div className={Styles.FilterGroup}>
        {MockFilter.map((filter, idx) => {
          const count =
            filter === "All"
              ? searchResults.reduce((acc, r) => acc + r.items.length, 0)
              : searchResults.find((r) => r.filter === filter)?.items.length ||
                0;
          return (
            <label key={`SEARCH_FILTER_${filter}`} className={Styles.Filter}>
              <input
                type="radio"
                name="filter"
                className={Styles.FilterInput}
                defaultChecked={idx === 0}
                disabled={count === 0}
              />
              <p className={Styles.FilterText}>
                {filter} ({count})
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
            {result.items.map((item) => {
              const bg = getRandomColor();
              const fg = getReadableTextColor(bg);

              return (
                <button
                  key={`SEARCH_RESULT_ITEM_${item.id}`}
                  className={Styles.ResultItem}
                  name={item.title}
                  onClick={handleItemClick}
                >
                  <div className={Styles.ResultItemImageContainer}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={Styles.ResultItemImage}
                    />
                    <div
                      className={Styles.ResultItemHoverOverlay}
                      style={
                        {
                          "--hover-bg-color": bg,
                          "--hover-fg-color": fg,
                        } as React.CSSProperties
                      }
                    >
                      <p>{item.summary}</p>
                    </div>
                  </div>
                  <p className={Styles.ResultItemText}>{item.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
