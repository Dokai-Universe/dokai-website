import * as Styles from "./Search.css";
import { useState } from "react";
import CrossSVG from "@assets/icons/cross.svg";
import SearchSVG from "@assets/icons/search.svg";
import PlusSVG from "@assets/icons/plus.svg";
import useElementRect from "@hooks/useElementRect";
import SearchResult from "./SearchResult";

const MockTags = [
  "Branding",
  "2D",
  "3D",
  "Character",
  "Event",
  "Experience",
  "Featured",
  "Live Action",
  "Social Good",
  "Systems",
];

const normalize = (s: string) => s.trim();

const Search = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const { elementRef: inputContainerRef, height: inputContainerHeight } =
    useElementRect<HTMLDivElement>({ preferBorderBox: true, round: true });
  const [queries, setQueries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmitValue = (value: string) => {
    if (!value) return;
    if (queries.includes(value)) return;
    setQueries((prev) => [...prev, value]);
    setInputValue("");
  };

  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.name;
    handleSubmitValue(normalize(tag));
  };

  const handleSearchIconClick = () => {
    handleSubmitValue(normalize(inputValue));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitValue(normalize(inputValue));
  };

  const handleQueryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const query = e.currentTarget.name;
    setQueries((prev) => prev.filter((q) => q !== query));
  };

  return (
    <div className={Styles.Overlay} data-open={isOpen} aria-hidden={!isOpen}>
      <div className={Styles.Header}>
        <p className={Styles.HeaderTitle}>Search</p>
        <button
          type="button"
          className={Styles.HeaderCloseButton}
          onClick={handleClose}
        >
          <CrossSVG className={Styles.HeaderCloseIcon} />
        </button>
      </div>
      <div
        ref={inputContainerRef}
        className={Styles.InputContainer}
        style={
          {
            "--input-container-height": `${inputContainerHeight}px`,
          } as React.CSSProperties
        }
        data-has-query={queries.length > 0}
      >
        <form onSubmit={handleFormSubmit} className={Styles.InputForm}>
          {queries.map((query) => (
            <button
              type="button"
              key={`SEARCH_QUERY_${query}`}
              className={Styles.Query}
              name={query}
              onClick={handleQueryClick}
            >
              <p className={Styles.QueryText}>{query}</p>
              <CrossSVG className={Styles.QueryIcon} />
            </button>
          ))}
          <label className={Styles.InputLabel}>
            <input
              className={Styles.Input}
              type="text"
              placeholder="Search for..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <SearchSVG
              className={Styles.InputSearchIcon}
              onClick={handleSearchIconClick}
            />
          </label>
        </form>
        <div className={Styles.TagContainer}>
          {MockTags.map((tag) => (
            <button
              key={`SEARCH_TAG_${tag}`}
              className={Styles.Tag}
              name={tag}
              onClick={handleTagClick}
            >
              <p className={Styles.TagText}>{tag}</p>
              <PlusSVG className={Styles.TagIcon} />
            </button>
          ))}
        </div>
      </div>
      <SearchResult queries={queries} />
    </div>
  );
};

export default Search;
