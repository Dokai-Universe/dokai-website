import * as Styles from "./style.css";
import { useState } from "react";
import SearchResult from "./Result";
import SearchHeader from "./Header";
import SearchInput from "./Input";

const Search = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [queries, setQueries] = useState<string[]>([]);

  const handleAddQuery = (value: string) => {
    if (!value) return false;
    if (queries.includes(value)) return false;
    setQueries((prev) => [...prev, value]);

    return true;
  };

  const handleRemoveQuery = (value: string) => {
    setQueries((prev) => prev.filter((q) => q !== value));
  };

  return (
    <div
      className={`${Styles.Overlay} layout-wrapper`}
      data-open={isOpen}
      aria-hidden={!isOpen}
    >
      <div className={Styles.Grid}>
        <SearchHeader handleClose={handleClose} />
        <SearchInput
          queries={queries}
          addQuery={handleAddQuery}
          removeQuery={handleRemoveQuery}
        />
        <SearchResult queries={queries} />
      </div>
    </div>
  );
};

export default Search;
