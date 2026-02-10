import * as Styles from "./style.css";
import { useEffect, useState } from "react";
import CrossSVG from "@assets/icons/cross.svg";
import PlusSVG from "@assets/icons/plus.svg";
import SearchSVG from "@assets/icons/search.svg";
import useElementRect from "@hooks/useElementRect";
import { normalize } from "@utils/Text";

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

const SearchInput = ({
  queries,
  addQuery,
  removeQuery,
}: {
  queries: string[];
  addQuery: (value: string) => boolean;
  removeQuery: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const { elementRef: inputContainerRef, height: inputContainerHeight } =
    useElementRect<HTMLDivElement>({ preferBorderBox: true, round: true });

  const hasQuery = !!queries.length;

  const handleSubmitValue = (value: string) => {
    if (!value) return;
    if (!addQuery(value)) return;

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
    removeQuery(query);
  };

  useEffect(() => {
    inputContainerRef.current?.style.setProperty(
      "--input-container-height",
      `${inputContainerHeight}px`,
    );
  }, [inputContainerHeight, inputContainerRef]);

  return (
    <div
      ref={inputContainerRef}
      data-has-query={hasQuery}
      className={Styles.InputContainer}
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
      <div className={Styles.TagContainer} data-has-query={hasQuery}>
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
  );
};

export default SearchInput;
